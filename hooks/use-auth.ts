/**
 * Auth Hooks - Convenient hooks for accessing auth state
 * 
 * These hooks provide easy access to auth store with automatic re-renders
 * when state changes. Use these instead of directly accessing the store.
 * 
 * All hooks are hydration-safe and prevent SSR/client mismatches.
 */

import { useAuthStore, useAuthActions } from '@/stores/auth-store';
import { useHydration } from './use-hydration';

/**
 * Get the current user (hydration-safe)
 * Component will re-render when user changes
 */
export const useUser = () => {
  const hydrated = useHydration();
  const user = useAuthStore((state) => state.user);
  return hydrated ? user : null;
};

/**
 * Get authentication status (hydration-safe)
 * Component will re-render when auth status changes
 */
export const useIsAuthenticated = () => {
  const hydrated = useHydration();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return hydrated ? isAuthenticated : false;
};

/**
 * Get loading state (hydration-safe)
 * Component will re-render when loading state changes
 */
export const useIsLoading = () => {
  const hydrated = useHydration();
  const isLoading = useAuthStore((state) => state.isLoading);
  return hydrated ? isLoading : true;
};

/**
 * Get auth actions (login, logout, refreshAuth)
 * These actions don't cause re-renders
 */
export { useAuthActions };

/**
 * Get access token (hydration-safe)
 * Component will re-render when token changes
 */
export const useAccessToken = () => {
  const hydrated = useHydration();
  const token = useAuthStore((state) => state.accessToken);
  return hydrated ? token : null;
};

/**
 * Check if user has a specific role (if you implement roles)
 * Example implementation - customize based on your needs
 */
export const useHasRole = (role: string) => {
  const user = useUser();
  // Implement role checking logic based on your user structure
  // return user?.roles?.includes(role) ?? false;
  return false; // Placeholder
};

/**
 * Get user email (hydration-safe)
 */
export const useUserEmail = () => {
  const hydrated = useHydration();
  const email = useAuthStore((state) => state.user?.email);
  return hydrated ? email : undefined;
};

/**
 * Get user full name (hydration-safe)
 */
export const useUserFullName = () => {
  const hydrated = useHydration();
  const fullName = useAuthStore((state) => state.user?.fullName);
  return hydrated ? fullName : undefined;
};

/**
 * Get user picture URL (hydration-safe)
 */
export const useUserPicture = () => {
  const hydrated = useHydration();
  const pictureUrl = useAuthStore((state) => state.user?.pictureUrl);
  return hydrated ? pictureUrl : undefined;
};
