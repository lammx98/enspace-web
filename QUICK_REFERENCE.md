# 🚀 Quick Reference - Zustand Auth Store

## Import
```typescript
// Hooks (recommended)
import { useUser, useIsAuthenticated, useAuthActions } from '@/hooks/use-auth';

// Store (for advanced usage)
import { useAuthStore } from '@/stores/auth-store';

// Legacy (still works)
import { useAuth } from '@/contexts/auth-context';
```

## Common Patterns

### Get current user
```typescript
const user = useUser();
```

### Check if authenticated
```typescript
const isAuthenticated = useIsAuthenticated();
```

### Login/Logout
```typescript
const { login, logout } = useAuthActions();

await login(email, password);
await logout();
```

### Display user info
```typescript
function UserBadge() {
  const user = useUser();
  return <div>{user?.fullName}</div>;
}
```

### Protected content
```typescript
function ProtectedPage() {
  const isAuthenticated = useIsAuthenticated();
  
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }
  
  return <Content />;
}
```

### Access outside React
```typescript
import { useAuthStore } from '@/stores/auth-store';

const token = useAuthStore.getState().accessToken;
const user = useAuthStore.getState().user;
```

### Subscribe to changes
```typescript
useAuthStore.subscribe((state) => {
  console.log('Auth changed:', state);
});
```

## Migration

### Old → New

```typescript
// Old
import { setAccessToken } from '@/lib/auth';
setAccessToken(token);

// New
import { useAuthStore } from '@/stores/auth-store';
useAuthStore.getState().setAccessToken(token);
```

```typescript
// Old
import { useAuth } from '@/contexts/auth-context';
const { user, login, logout } = useAuth();

// New (option 1 - recommended)
import { useUser, useAuthActions } from '@/hooks/use-auth';
const user = useUser();
const { login, logout } = useAuthActions();

// New (option 2 - still works)
import { useAuth } from '@/contexts/auth-context';
const { user, login, logout } = useAuth();
```

## Performance Tips

```typescript
// ❌ Bad - re-renders on any state change
const auth = useAuthStore();

// ✅ Good - only re-renders when user changes
const user = useUser();

// ✅ Good - only re-renders when specific field changes
const email = useAuthStore((state) => state.user?.email);
```

## Server-Side

```typescript
// Server Components / API Routes
import { getAuthToken, getUserInfoFromCookie } from '@/lib/auth';

const token = getAuthToken();
const userInfo = getUserInfoFromCookie();
```

## Common Issues

| Problem | Solution |
|---------|----------|
| State not persisting | Check localStorage key: `auth-storage` |
| Token undefined | Call `refreshAuth()` on mount |
| Re-renders too much | Use selective selectors |
| Server component error | Use cookie utilities, not Zustand hooks |

## Files

- 📁 `stores/auth-store.ts` - Main store
- 📁 `hooks/use-auth.ts` - Convenient hooks
- 📁 `contexts/auth-context.tsx` - Backward compatible wrapper
- 📁 `lib/auth.ts` - Cookie utilities
- 📄 `stores/AUTH_STORE.md` - Full documentation
- 📄 `examples/auth-store-examples.tsx` - More examples
