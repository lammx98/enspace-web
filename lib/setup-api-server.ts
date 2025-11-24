import { OpenAPI as AuthOpenAPI } from '@/api/genzy-auth';
import { OpenAPI as ContentOpenAPI } from '@/api/enspace-content';
import { OpenAPI as ProgressOpenAPI } from '@/api/enspace-progress';
import { API_CONFIG, isDevelopment } from './api-config';
import https from 'https';
import type { OpenAPIConfig } from '@/api/genzy-auth/core/OpenAPI';

/**
 * Setup API configuration for server-side requests
 * This should be called in Server Components, API Routes, and Server Actions
 * 
 * @param token - Optional authentication token
 */
export async function setupApiServer(token?: string) {
   // Create HTTPS agent for development with self-signed certificates
   const httpsAgent = isDevelopment ? new https.Agent({ rejectUnauthorized: false }) : undefined;

   // Common configuration
   const commonConfig: Partial<OpenAPIConfig> = {
      ...(token && { TOKEN: token }),
      ...(httpsAgent && { HEADERS: async () => ({ httpsAgent } as any) }),
   };

   // Setup Auth API
   AuthOpenAPI.BASE = API_CONFIG.auth.baseUrl;
   Object.assign(AuthOpenAPI, commonConfig);

   // Setup Content API
   ContentOpenAPI.BASE = API_CONFIG.content.baseUrl;
   Object.assign(ContentOpenAPI, commonConfig);

   // Setup Progress API
   ProgressOpenAPI.BASE = API_CONFIG.progress.baseUrl;
   Object.assign(ProgressOpenAPI, commonConfig);
}

/**
 * Reset all API configurations
 * Useful for testing or cleaning up
 */
export function resetApiServer() {
   [AuthOpenAPI, ContentOpenAPI, ProgressOpenAPI].forEach(api => {
      api.TOKEN = undefined;
      api.HEADERS = undefined;
   });
}
