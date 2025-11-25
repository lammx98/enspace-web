'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { setupApiClientToken } from '@/lib/setup-api-client';
import { AuthService } from '@/api/genzy-auth';

export default function GoogleCallback() {
   const router = useRouter();
   const searchParams = useSearchParams();

   useEffect(() => {
      const handleCallback = async () => {
         try {
            const token = searchParams.get('token');
            const refreshToken = searchParams.get('refreshToken');

            if (token && refreshToken) {
               // Set refresh token cookie via secure server route
               const resp = await fetch('/api/auth/set-refresh', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ refreshToken }),
               });
               if (!resp.ok) {
                  router.push('/login');
                  return;
               }

               // Store access token in memory
               setupApiClientToken(token);

               // Fetch user profile
               try {
                  const me = await AuthService.getMe();
               } catch (err) {
                  console.error('Failed to fetch user profile:', err);
                  router.push('/login');
                  return;
               }

               router.push('/');
            } else {
               router.push('/login');
            }
         } catch (error) {
            console.error('Auth callback error:', error);
            router.push('/login');
         }
      };

      handleCallback();
   }, [router, searchParams]);

   return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
         <div className="text-white text-2xl font-bold">Authenticating...</div>
      </div>
   );
}
