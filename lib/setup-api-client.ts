import { OpenAPI as AuthOpenAPI } from '@/api/genzy-auth';
import { OpenAPI as ContentOpenAPI } from '@/api/enspace-content';
import { OpenAPI as ProgressOpenAPI } from '@/api/enspace-progress';
import { API_CONFIG } from './api-config';
import type { OpenAPIConfig } from '@/api/genzy-auth/core/OpenAPI';

/**
 * Setup API configuration for client-side requests
 * This should be called in Client Components and browser context
 *
 * @param token - Optional authentication token (if not provided, will get from cookie)
 */
export function setupApiClient() {
   // Common configuration for all APIs
   const commonConfig: Partial<OpenAPIConfig> = {
      WITH_CREDENTIALS: true,
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
 * Setup API configuration for client-side requests
 * This should be called in Client Components and browser context
 *
 * @param token - Optional authentication token (if not provided, will get from cookie)
 */
export function setupApiClientToken(token: string) {
   // Setup Auth API
   AuthOpenAPI.TOKEN = token;

   // Setup Content API
   ContentOpenAPI.TOKEN = token;

   // Setup Progress API
   ProgressOpenAPI.TOKEN = token;
}

/**
 * Reset all API configurations
 * Useful for logout or cleaning up
 */
export function resetApiClient() {
   [AuthOpenAPI, ContentOpenAPI, ProgressOpenAPI].forEach((api) => {
      api.TOKEN = undefined;
   });
}
