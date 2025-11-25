import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthService, AuthResponse, AccountDTO } from '@/api/genzy-auth';
import { setupApiClient } from '@/lib/api-setup';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
import { setupApiClientToken } from '@/lib/setup-api-client';

interface AuthState {
   // State
   user: AccountDTO | null;
   accessToken: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;

   // Actions
   setUser: (user: AccountDTO | null) => void;
   setAccessToken: (token: string | null) => void;
   setLoading: (loading: boolean) => void;

   // Auth operations
   setRefreshToken: (refreshToken: string, expiresAt: number) => Promise<void>;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   refreshAuth: () => Promise<void>;
   initializeAuth: (userInfo?: AccountDTO) => void;

   // Helper
   reset: () => void;
}

const AUTH_COOKIE_NAME = 'auth_token';
const REFRESH_TOKEN_COOKIE_NAME = 'refresh_token';

const initialState = {
   user: null,
   accessToken: null,
   isAuthenticated: false,
   isLoading: true,
};

// Helper để lấy expiresAt từ token
function getTokenExpiresAt(token: string): number {
   try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000; // Convert to milliseconds
   } catch {
      return 0;
   }
}

export const useAuthStore = create<AuthState>()(
   persist(
      (set, get) => ({
         ...initialState,

         setUser: (user) => set({ user, isAuthenticated: !!user }),

         setAccessToken: (token) => set({ accessToken: token }),

         setLoading: (loading) => set({ isLoading: loading }),

         initializeAuth: (userInfo) => {
            if (userInfo) {
               set({
                  user: userInfo,
                  isAuthenticated: true,
                  isLoading: false,
               });
            } else {
               set({ isLoading: false });
            }
         },

         setRefreshToken: async (refreshToken: string, expiresAt: number) => {
            // Save refresh token và expires_at to HTTP-only cookie via API
            await fetch('/api/auth/set-refresh', {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify({ refreshToken, expiresAt }),
            });
         },

         login: async (email: string, password: string) => {
            try {
               set({ isLoading: true });

               const response = await AuthService.postLogin({
                  requestBody: { email, password },
               });

               // Lấy expires_at từ token
               const expiresAt = getTokenExpiresAt(response.token);

               // Save refresh token và expires_at to HTTP-only cookie via API
               await get().setRefreshToken(response.refreshToken, expiresAt);

               // Setup API clients with new token
               setupApiClientToken(response.token);

               // Get user profile
               const me = (await AuthService.getMe()).result;

               // Update store
               set({
                  user: me,
                  accessToken: response.token,
                  isAuthenticated: true,
                  isLoading: false,
               });
            } catch (error) {
               set({ isLoading: false });
               console.error('Login failed:', error);
               throw error;
            }
         },

         logout: async () => {
            try {
               // Call logout API to clear server-side session
               await fetch('/api/auth/logout', { method: 'POST' });
            } catch (error) {
               console.error('Logout API failed:', error);
            } finally {
               // Clear cookies
               deleteCookie(AUTH_COOKIE_NAME);
               deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
               deleteCookie('token_expires_at');

               // Reset store
               set({
                  user: null,
                  accessToken: null,
                  isAuthenticated: false,
                  isLoading: false,
               });
            }
         },

         refreshAuth: async () => {
            try {
               set({ isLoading: true });

               const response = await fetch('/api/auth/refresh', { method: 'POST' });

               if (!response.ok) {
                  throw new Error('Token refresh failed');
               }

               const data = await response.json();

               // Setup API clients with new token
               setupApiClientToken(data.accessToken);

               // Get user profile
               const me = (await AuthService.getMe()).result;

               // Update store
               set({
                  user: me,
                  accessToken: data.accessToken,
                  isAuthenticated: true,
                  isLoading: false,
               });
            } catch (error) {
               console.error('Token refresh failed:', error);
               // If refresh fails, logout
               get().logout();
            }
         },

         reset: () => set(initialState),
      }),
      {
         name: 'auth-storage', // localStorage key
         storage: createJSONStorage(() => {
            // Only use localStorage on client-side
            if (typeof window !== 'undefined') {
               return localStorage;
            }
            // Return a no-op storage for server-side
            return {
               getItem: () => null,
               setItem: () => {},
               removeItem: () => {},
            };
         }),
         // Only persist user info, not tokens (tokens should be in HTTP-only cookies)
         partialize: (state) => ({
            user: state.user,
         }),
         // Skip hydration on server
         skipHydration: typeof window === 'undefined',
      },
   ),
);
