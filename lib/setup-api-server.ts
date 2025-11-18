import { OpenAPI } from '@/api/genzy-auth';
import https from 'https';

export async function setupApiServer(token?: string) {
  OpenAPI.BASE = process.env.NEXT_PUBLIC_API_URL || 'https://localhost:7777';
  
  if (token) {
    OpenAPI.TOKEN = token;
  }

  // Bypass SSL verification for development with self-signed certificates
  if (process.env.NODE_ENV === 'development') {
    const agent = new https.Agent({
      rejectUnauthorized: false
    });
    OpenAPI.HEADERS = async () => ({
      httpsAgent: agent
    } as any);
  }
}
