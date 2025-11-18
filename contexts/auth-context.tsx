'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from 'react';
import { AuthService } from '@/api/genzy-auth';
import { setAccessToken, clearAccessToken, setUserInfo as saveUserInfo, clearUserInfo } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { setupApiClient } from '@/lib/setup-api-client';

interface User {
   email: string;
   fullName: string;
   pictureUrl?: string | null;
}

interface AuthContextType {
   user: User | null;
   isAuthenticated: boolean;
   isLoading: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => void;
   refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface AuthProviderProps {
   children: ReactNode;
   userInfo: any;
}

export function AuthProvider({ children, userInfo }: AuthProviderProps) {
   const [user, setUser] = useState<User | null>(userInfo);
   const [isAuthenticated, setIsAuthenticated] = useState(!!userInfo);
   const [isLoading, setIsLoading] = useState(false);
   const router = useRouter();
   const initialized = useRef(false);

   useEffect(() => {
      if (initialized.current) return;
      initialized.current = true;

      if (userInfo) {
         setUser(userInfo);
         setIsAuthenticated(true);
      }
      setIsLoading(false);
   }, []);

   const login = async (email: string, password: string) => {
      try {
         const response = await AuthService.postAuthLogin({
            requestBody: { email, password },
         });

         await fetch('/api/auth/set-refresh', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: response.refreshToken }),
         });

         setAccessToken(response.token);
         await setupApiClient(response.token);

         const me = await AuthService.getAuthMe();
         const profile = {
            email: me?.email ?? '',
            fullName: me?.name ?? '',
            pictureUrl: me?.pictureUrl ?? undefined,
         };
         setUser(profile);
         saveUserInfo(profile);
         setIsAuthenticated(true);

         router.push('/');
      } catch (error) {
         console.error('Login failed:', error);
         throw error;
      }
   };

   const logout = async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      
      clearAccessToken();
      clearUserInfo();
      setUser(null);
      setIsAuthenticated(false);
      router.push('/login');
   };

   const refreshAuth = async () => {
      try {
         const response = await fetch('/api/auth/refresh', { method: 'POST' });
         
         if (!response.ok) {
            logout();
            return;
         }

         const data = await response.json();
         setAccessToken(data.accessToken);
         await setupApiClient(data.accessToken);

         const me = await AuthService.getAuthMe();
         const profile = {
            email: me?.email ?? '',
            fullName: me?.name ?? '',
            pictureUrl: me?.pictureUrl ?? undefined,
         };
         setUser(profile);
         saveUserInfo(profile);
         setIsAuthenticated(true);
      } catch (error) {
         console.error('Token refresh failed:', error);
         logout();
      }
   };

   return (
      <AuthContext.Provider
         value={{
            user,
            isAuthenticated,
            isLoading,
            login,
            logout,
            refreshAuth,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
}
