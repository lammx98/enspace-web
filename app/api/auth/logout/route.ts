import { cookies } from 'next/headers';
import { COOKIE_NAMES } from '@/contants';

export async function POST() {
  (await cookies()).delete(COOKIE_NAMES.REFRESH_TOKEN);
  (await cookies()).delete(COOKIE_NAMES.TOKEN_EXPIRES_AT);
  (await cookies()).delete(COOKIE_NAMES.TOKEN);
  return new Response(null, { status: 204 });
}