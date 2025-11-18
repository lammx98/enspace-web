import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const { refreshToken } = await req.json();
    if (!refreshToken) return new Response('Missing refreshToken', { status: 400 });

    (await cookies()).set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return new Response(null, { status: 204 });
  } catch {
    return new Response('Bad Request', { status: 400 });
  }
}