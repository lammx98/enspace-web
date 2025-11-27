'use client';

import React, { useEffect, ReactNode, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/auth-store';
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
   const initialized = useRef(false);
   const { initializeAuth } = useAuthStore();

   useEffect(() => {
      if (initialized.current) return;
      initialized.current = true;

      // Initialize auth state with server-side user info
      if (userInfo) {
         initializeAuth(userInfo);
      }
   }, [userInfo, initializeAuth]);

   useEffect(() => {
      if (initialized.current) return;
      initialized.current = true;

      // Set access token and user info in memory if available
      if (accessToken) {
         setupApiClientToken(accessToken);
      }

      // Check authentication for protected routes
      const isPublicRoute = PUBLIC_ROUTES.some((route) => pathname.startsWith(route));

      if (!isPublicRoute && !accessToken) {
         // Clear invalid refresh token cookie
         fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
         // redirect('/login'); // TODO: uncomment this
      }
   }, []);

   return <>{children}</>;
}
