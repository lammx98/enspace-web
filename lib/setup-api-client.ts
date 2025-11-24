import { OpenAPI as AuthOpenAPI } from '@/api/genzy-auth';
import { OpenAPI as ContentOpenAPI } from '@/api/enspace-content';
import { OpenAPI as ProgressOpenAPI } from '@/api/enspace-progress';
import { API_CONFIG } from './api-config';
import axios, { AxiosRequestConfig } from 'axios';
import { getCookie } from 'cookies-next';
import type { OpenAPIConfig } from '@/api/genzy-auth/core/OpenAPI';

/**
 * Setup API configuration for client-side requests
 * This should be called in Client Components and browser context
 *
 * @param token - Optional authentication token (if not provided, will get from cookie)
 */
export async function setupApiClient(token?: string) {
   const authToken: any = token ?? getCookie('auth_token') ?? '';

   // Common configuration for all APIs
   const commonConfig: Partial<OpenAPIConfig> = {
      TOKEN: async () => authToken,
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
 * Reset all API configurations
 * Useful for logout or cleaning up
 */
export function resetApiClient() {
   [AuthOpenAPI, ContentOpenAPI, ProgressOpenAPI].forEach((api) => {
      api.TOKEN = undefined;
   });
}

export const getToken = () => getCookie('auth_token');

export const clientGet = (url: string, config?: AxiosRequestConfig<any> | undefined) => {
   const token = getCookie('auth_token');
   const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL || 'http://localhost:5001';

   return axios.get(baseUrl + url, {
      ...config,
      headers: {
         Authorization: `Bearer ${token}`,
         ...(config?.headers || {}),
      },
   });
};
