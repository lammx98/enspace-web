import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthService, AuthResponse } from '@/api/genzy-auth';
import { setupApiClient } from '@/lib/api-setup';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

export interface User {
   email: string;
   fullName: string;
   pictureUrl?: string | null;
}

interface AuthState {
   // State
   user: User | null;
   accessToken: string | null;
   isAuthenticated: boolean;
   isLoading: boolean;

   // Actions
   setUser: (user: User | null) => void;
   setAccessToken: (token: string | null) => void;
   setLoading: (loading: boolean) => void;

   // Auth operations
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   refreshAuth: () => Promise<void>;
   initializeAuth: (userInfo?: User) => void;

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

         login: async (email: string, password: string) => {
            try {
               set({ isLoading: true });

               const response = await AuthService.postLogin({
                  requestBody: { email, password },
               });

               // Save refresh token to HTTP-only cookie via API
               await fetch('/api/auth/set-refresh', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken: response.refreshToken }),
               });

               // Setup API clients with new token
               await setupApiClient(response.token);

               // Get user profile
               const me = await AuthService.getMe();
               const profile: User = {
                  email: me?.email ?? '',
                  fullName: me?.name ?? '',
                  pictureUrl: me?.pictureUrl ?? undefined,
               };

               // Update store
               set({
                  user: profile,
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
               await setupApiClient(data.accessToken);

               // Get user profile
               const me = await AuthService.getMe();
               const profile: User = {
                  email: me?.email ?? '',
                  fullName: me?.name ?? '',
                  pictureUrl: me?.pictureUrl ?? undefined,
               };

               // Update store
               set({
                  user: profile,
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

// Action selectors (safe to use directly as they don't cause hydration issues)
export const useAuthActions = () =>
   useAuthStore((state) => ({
      login: state.login,
      logout: state.logout,
      refreshAuth: state.refreshAuth,
      initializeAuth: state.initializeAuth,
   }));

// Note: For state selectors (user, isAuthenticated, etc.), 
// use hydration-safe hooks from '@/hooks/use-auth' instead of accessing store directly
