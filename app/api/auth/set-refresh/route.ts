import { COOKIE_NAMES } from '@/contants';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   try {
      const { refreshToken, accessToken, expiresAt } = await request.json();
      const cookieStore = await cookies();

      // Lưu refresh token
      if (refreshToken) {
         cookieStore.set(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
         });
      }

      // Lưu access token
      if (accessToken) {
         cookieStore.set(COOKIE_NAMES.TOKEN, accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
         });
      }

      // Lưu expires_at của access token
      if (expiresAt) {
         cookieStore.set(COOKIE_NAMES.TOKEN_EXPIRES_AT, expiresAt.toString(), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60, // 7 days
         });
      }

      return NextResponse.json({ success: true });
   } catch (error) {
      return NextResponse.json({ error: 'Failed to set refresh token' }, { status: 500 });
   }
}