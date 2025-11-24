/**
 * Stores - Centralized state management
 * 
 * Export all stores and their hooks from this file
 */

// Auth store
export {
  useAuthStore,
  useAuthActions,
  type User,
} from './auth-store';

// Note: For hydration-safe auth hooks (useUser, useIsAuthenticated, etc.),
// import from '@/hooks/use-auth' instead

// Add more stores here as your app grows
// export { useSettingsStore } from './settings-store';
// export { useNotificationStore } from './notification-store';
// etc.
