import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { AuthService } from '@/api/genzy-auth';
import { COOKIE_NAMES } from '@/contants';
import { setupApiServer } from '@/lib/setup-api-server';

export async function POST() {
   try {
      // Setup API server configuration before making API calls
      await setupApiServer();

      const cookieStore = await cookies();
      const refreshToken = cookieStore.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;

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
      cookieStore.set(COOKIE_NAMES.TOKEN, tokenResponse.token, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });
      cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, tokenResponse.refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });
      cookieStore.set(COOKIE_NAMES.TOKEN_EXPIRES_AT, expiresAt.toString(), {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });

      return NextResponse.json({
         accessToken: tokenResponse.token,
         refreshToken: tokenResponse.refreshToken,
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