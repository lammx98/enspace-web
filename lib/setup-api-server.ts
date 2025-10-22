import { OpenAPI } from '@/api';
import { cookies } from 'next/headers';

export function setupApiServerAuth(token?: string) {
   OpenAPI.BASE = process.env.API_DOMAIN ?? '';
   OpenAPI.TOKEN = async () => token ?? (await cookies()).get('token')?.value ?? '';
}
