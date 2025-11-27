import { cookies } from 'next/headers';
import { AuthService } from '@/api/genzy-auth';
import { setupApiServerToken } from '@/lib/setup-api-server';
import { AuthProvider } from './auth-context';
import { redirect } from 'next/navigation';

async function getUserInfo() {
   try {
      const me = (await AuthService.getMe()).result;
      return {
         email: me?.email ?? '',
         fullName: me?.fullName ?? '',
         avatarUrl: me?.avatarUrl ?? null,
      };
   } catch (error) {
      console.error('Failed to fetch user info:', error);
      return null;
   }
}

export default async function AuthorizedLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const cookieStore = await cookies();
   const refreshToken = cookieStore.get('refresh_token')?.value;
   const tokenExpiresAt = cookieStore.get('token_expires_at')?.value;

   let userInfo = null;
   let accessToken = null;

   if (!refreshToken) {
      redirect('/login');
   }

   // Kiểm tra xem token có hết hạn không (thêm buffer 1 phút)
   const now = Date.now();
   const expiresAt = tokenExpiresAt ? parseInt(tokenExpiresAt) : 0;
   const isExpired = expiresAt === 0 || now >= expiresAt - 60000; // 1 minute buffer

   if (isExpired) {
      try {
         const tokenResponse = await AuthService.postRefreshToken({
            requestBody: refreshToken,
         });
         accessToken = tokenResponse.token;

         // Lấy expires_at mới từ token
         const payload = JSON.parse(atob(accessToken.split('.')[1]));
         const newExpiresAt = payload.exp * 1000;

         // Update cookies
         cookieStore.set('refresh_token', tokenResponse.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
         });
         cookieStore.set('token_expires_at', newExpiresAt.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
         });

         await setupApiServerToken(accessToken);
         userInfo = await getUserInfo();
      } catch (error) {
         console.error('Token refresh failed:', error);
         // redirect('/login'); // TODO: uncomment this
      }
   }

   return (
      <AuthProvider userInfo={userInfo} accessToken={accessToken}>
         {children}
      </AuthProvider>
   );
}
