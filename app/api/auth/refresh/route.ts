import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AuthService } from '@/api/genzy-auth';

export async function POST() {
   try {
      const cookieStore = await cookies();
      const refreshToken = cookieStore.get('refresh_token')?.value;

      if (!refreshToken) {
         return NextResponse.json(
            { error: 'No refresh token found' },
            { status: 401 }
         );
      }

      const tokenResponse = await AuthService.postRefreshToken({
         requestBody: refreshToken,
      });

      // Lấy expires_at từ token
      const payload = JSON.parse(atob(tokenResponse.token.split('.')[1]));
      const expiresAt = payload.exp * 1000;

      // Update cookies
      cookieStore.set('refresh_token', tokenResponse.refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });
      cookieStore.set('token_expires_at', expiresAt.toString(), {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });

      return NextResponse.json({
         accessToken: tokenResponse.token,
         expiresAt,
      });
   } catch (error) {
      console.error('Token refresh failed:', error);
      return NextResponse.json(
         { error: 'Token refresh failed' },
         { status: 401 }
      );
   }
}