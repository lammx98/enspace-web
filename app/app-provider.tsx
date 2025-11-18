'use client';
import { setupApiClient } from '@/lib/setup-api-client';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { AuthProvider } from '@/contexts/auth-context';
import { setAccessToken, setUserInfo } from '@/lib/auth';
import { usePathname, useRouter } from 'next/navigation';

interface AppProviderProps {
   children: ReactNode;
   userInfo: any;
   accessToken: string | null;
}

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/auth/callback'];

const AppProvider: FC<AppProviderProps> = ({ children, userInfo, accessToken }) => {
   const pathname = usePathname();
   const router = useRouter();
   const initialized = useRef(false);

   useEffect(() => {
      if (initialized.current) return;
      initialized.current = true;

      // Set access token and user info in memory if available
      if (accessToken) {
         setAccessToken(accessToken);
         setupApiClient(accessToken);
      }
      
      if (userInfo) {
         setUserInfo(userInfo);
      }

      // Check authentication for protected routes
      const isPublicRoute = PUBLIC_ROUTES.some(route => pathname.startsWith(route));
      
      if (!isPublicRoute && !accessToken) {
         // Clear invalid refresh token cookie
         fetch('/api/auth/logout', { method: 'POST' }).catch(console.error);
         router.push('/login');
      }
   }, []);

   return (
      <AuthProvider userInfo={userInfo}>
         {children}
      </AuthProvider>
   );
};

export default AppProvider;
