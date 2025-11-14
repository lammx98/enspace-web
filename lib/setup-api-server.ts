import { OpenAPI as AuthOpenAPI } from "@/api/genzy-auth";
import { OpenAPI as ContentOpenAPI } from "@/api/enspace-content";
import { OpenAPI as ProgressOpenAPI } from "@/api/enspace-progress";
import { cookies } from 'next/headers';

export async function setupApiServer(token?: string) {
   const authToken = token ?? (await cookies()).get('auth_token')?.value ?? '';
   
   // Setup Auth API
   AuthOpenAPI.BASE = process.env.API_AUTH_URL || 'http://localhost:5000';
   AuthOpenAPI.TOKEN = async () => authToken;
   
   // Setup Content API
   ContentOpenAPI.BASE = process.env.API_CONTENT_URL || 'http://localhost:5001';
   ContentOpenAPI.TOKEN = async () => authToken;
   
   // Setup Progress API
   ProgressOpenAPI.BASE = process.env.API_PROGRESS_URL || 'http://localhost:5002';
   ProgressOpenAPI.TOKEN = async () => authToken;
}
