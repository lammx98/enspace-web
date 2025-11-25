/**
 * Centralized API configuration
 * Define all API base URLs and endpoints here
 */

export const API_CONFIG = {
   auth: {
      baseUrl: process.env.API_AUTH_URL || process.env.NEXT_PUBLIC_API_AUTH_URL || 'http://localhost:5001',
      name: 'Auth Service',
   },
   content: {
      baseUrl: process.env.API_CONTENT_URL || process.env.NEXT_PUBLIC_API_CONTENT_URL || 'http://localhost:5002',
      name: 'Content Service',
   },
   progress: {
      baseUrl: process.env.API_PROGRESS_URL || process.env.NEXT_PUBLIC_API_PROGRESS_URL || 'http://localhost:5003',
      name: 'Progress Service',
   },
} as const;

export const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Get the appropriate base URL for a service
 */
export function getServiceBaseUrl(service: keyof typeof API_CONFIG): string {
   return API_CONFIG[service].baseUrl;
}

/**
 * Check if all required environment variables are set
 */
export function validateApiConfig(): { isValid: boolean; missing: string[] } {
   const missing: string[] = [];

   if (!process.env.NEXT_PUBLIC_API_AUTH_URL && process.env.NODE_ENV === 'production') {
      missing.push('NEXT_PUBLIC_API_AUTH_URL');
   }
   if (!process.env.NEXT_PUBLIC_API_CONTENT_URL && process.env.NODE_ENV === 'production') {
      missing.push('NEXT_PUBLIC_API_CONTENT_URL');
   }
   if (!process.env.NEXT_PUBLIC_API_PROGRESS_URL && process.env.NODE_ENV === 'production') {
      missing.push('NEXT_PUBLIC_API_PROGRESS_URL');
   }

   return {
      isValid: missing.length === 0,
      missing,
   };
}
