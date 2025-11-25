import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
   try {
      const { refreshToken, expiresAt } = await request.json();
      const cookieStore = await cookies();

      cookieStore.set('refresh_token', refreshToken, {
         httpOnly: true,
         secure: process.env.NODE_ENV === 'production',
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60, // 7 days
      });

      // Lưu expires_at của access token
      if (expiresAt) {
         cookieStore.set('token_expires_at', expiresAt.toString(), {
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