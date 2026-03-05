'use client';

import React, { useEffect, ReactNode, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/hooks/use-auth';
import { setupApiClientToken } from '@/lib/setup-api-client';

export interface AuthProviderProps {
   children: ReactNode;
   userInfo?: any;
   accessToken: string | null | undefined;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/auth/callback'];
/**
 * AuthProvider - Initializes auth state from server-side data
 *
 * This component is kept for backward compatibility and to handle
 * initial server-side user data injection. The actual state management
 * is now handled by Zustand store in @/stores/auth-store
 */
export function AuthProvider({ children, userInfo, accessToken }: AuthProviderProps) {
   const router = useRouter();
   const pathname = usePathname();
   const tokenInitialized = useRef(false);
   const authInitialized = useRef(false);
   const { initializeAuth } = useAuthStore();

   // Set up API token synchronously before any API calls can happen
   // This must run synchronously, not in useEffect, to ensure token is available immediately
   if (accessToken) {
      if (!tokenInitialized.current) {
         tokenInitialized.current = true;
      }
      // Always update token if it's provided (handles token refresh scenarios)
      setupApiClientToken(accessToken);
   }

   useEffect(() => {
      if (authInitialized.current) return;
      authInitialized.current = true;

      // Initialize auth state with server-side user info
      if (userInfo) {
         initializeAuth(userInfo);
      }
   }, [userInfo, initializeAuth]);

   useEffect(() => {
      // Check authentication for protected routes
      const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

      if (!isPublicRoute && !accessToken) {
         // Clear invalid refresh token cookie
         fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
         // redirect('/login'); // TODO: uncomment this
      }
   }, [accessToken, pathname]);

   return <>{children}</>;
}
