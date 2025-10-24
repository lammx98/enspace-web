import { OpenAPI } from '@/api';
import { cookies } from 'next/headers';

export function setupApiServer(token?: string) {
   console.log(process.env.API_DOMAIN)
   OpenAPI.BASE = 'http://api.genzy.vn';
   OpenAPI.TOKEN = async () => token ?? (await cookies()).get('token')?.value ?? '';
}
