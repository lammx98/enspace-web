'use client';

import React, { useEffect, ReactNode, useRef } from 'react';
import { useAuthActions } from '@/stores/auth-store';
import { useUser, useIsAuthenticated, useIsLoading } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';

export interface AuthProviderProps {
   children: ReactNode;
   userInfo?: any;
}

/**
 * AuthProvider - Initializes auth state from server-side data
 * 
 * This component is kept for backward compatibility and to handle
 * initial server-side user data injection. The actual state management
 * is now handled by Zustand store in @/stores/auth-store
 */
export function AuthProvider({ children, userInfo }: AuthProviderProps) {
   const initialized = useRef(false);
   const { initializeAuth } = useAuthActions();

   useEffect(() => {
      if (initialized.current) return;
      initialized.current = true;

      // Initialize auth state with server-side user info
      if (userInfo) {
         initializeAuth(userInfo);
      }
   }, [userInfo, initializeAuth]);

   return <>{children}</>;
}

/**
 * useAuth hook - Access auth state and actions
 * 
 * This hook provides the same interface as before but now uses Zustand store.
 * All components using useAuth will automatically re-render when auth state changes.
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, login, logout } = useAuth();
 * ```
 */
export function useAuth() {
   const router = useRouter();
   const user = useUser();
   const isAuthenticated = useIsAuthenticated();
   const isLoading = useIsLoading();
   const { login: storeLogin, logout: storeLogout, refreshAuth } = useAuthActions();

   // Wrap login to navigate after successful login
   const login = async (email: string, password: string) => {
      await storeLogin(email, password);
      router.push('/');
   };

   // Wrap logout to navigate to login page
   const logout = async () => {
      await storeLogout();
      router.push('/login');
   };

   return {
      user,
      isAuthenticated,
      isLoading,
      login,
      logout,
      refreshAuth,
   };
}
