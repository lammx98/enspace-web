import { cookies } from 'next/headers';
import { setupApiServer } from '@/lib/setup-api-server';
import { AuthService } from '@/api/genzy-auth';

export async function POST() {
  try {
    const cookieStore = cookies();
    const refreshToken = (await cookieStore).get('refresh_token')?.value;

    if (!refreshToken) {
      return Response.json({ error: 'No refresh token' }, { status: 401 });
    }

    await setupApiServer();
    const response = await AuthService.postAuthRefreshToken({
      requestBody: refreshToken,
    });

    // Update refresh token cookie
    (await cookieStore).set('refresh_token', response.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    return Response.json({ accessToken: response.token });
  } catch (error) {
    return Response.json({ error: 'Refresh failed' }, { status: 401 });
  }
}