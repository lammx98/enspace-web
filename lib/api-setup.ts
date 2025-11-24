/**
 * API Setup Utilities
 * 
 * This module provides utilities for setting up API clients for different environments:
 * - Client-side (browser): Use setupApiClient
 * - Server-side (SSR, API routes): Use setupApiServer
 * 
 * Usage examples:
 * 
 * // In a Client Component
 * import { setupApiClient } from '@/lib/api-setup';
 * await setupApiClient(token);
 * 
 * // In a Server Component or API Route
 * import { setupApiServer } from '@/lib/api-setup';
 * await setupApiServer(token);
 * 
 * // Get token
 * import { getToken } from '@/lib/api-setup';
 * const token = getToken();
 */

// Re-export client setup
export { setupApiClient, resetApiClient, getToken, clientGet } from './setup-api-client';

// Re-export server setup
export { setupApiServer, resetApiServer } from './setup-api-server';

// Re-export configuration
export { API_CONFIG, getServiceBaseUrl, validateApiConfig, isDevelopment } from './api-config';

// Re-export OpenAPI instances for direct access if needed
export { OpenAPI as AuthOpenAPI } from '@/api/genzy-auth';
export { OpenAPI as ContentOpenAPI } from '@/api/enspace-content';
export { OpenAPI as ProgressOpenAPI } from '@/api/enspace-progress';

/**
 * Initialize API based on environment
 * Automatically detects if running on client or server
 */
export async function setupApi(token?: string) {
   if (typeof window !== 'undefined') {
      // Client-side
      const { setupApiClient } = await import('./setup-api-client');
      return setupApiClient(token);
   } else {
      // Server-side
      const { setupApiServer } = await import('./setup-api-server');
      return setupApiServer(token);
   }
}
