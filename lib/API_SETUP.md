# API Setup Guide

## Overview

This project uses multiple microservices APIs:
- **Auth Service**: User authentication and authorization
- **Content Service**: Learning content management
- **Progress Service**: User progress tracking

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and update with your API URLs:

```bash
cp .env.example .env.local
```

Required environment variables:
```env
NEXT_PUBLIC_API_AUTH_URL=http://localhost:5000
NEXT_PUBLIC_API_CONTENT_URL=http://localhost:5001
NEXT_PUBLIC_API_PROGRESS_URL=http://localhost:5002
```

## Usage

### Client-Side (Browser)

Use in Client Components (`'use client'`):

```typescript
import { setupApiClient } from '@/lib/api-setup';

// In a component effect or event handler
useEffect(() => {
  setupApiClient(token);
}, [token]);
```

### Server-Side (SSR, API Routes)

Use in Server Components, API Routes, or Server Actions:

```typescript
import { setupApiServer } from '@/lib/api-setup';

// In a Server Component
export default async function Page() {
  await setupApiServer(token);
  // Make API calls...
}

// In an API Route
export async function GET(request: Request) {
  await setupApiServer(token);
  // Make API calls...
}
```

### Auto-Detection

If you want automatic environment detection:

```typescript
import { setupApi } from '@/lib/api-setup';

// Automatically uses setupApiClient or setupApiServer based on environment
await setupApi(token);
```

## API Services

### Using Generated API Clients

```typescript
import { AuthService } from '@/api/genzy-auth';
import { TopicsService, LessonsService } from '@/api/enspace-content';
import { StudyService, MeService } from '@/api/enspace-progress';

// Make sure to setup API first
await setupApiClient();

// Then use the services
const topics = await TopicsService.getAll();
const lessons = await LessonsService.getByTopicId(topicId);
const stats = await MeService.getStats();
```

### Direct OpenAPI Access

If you need direct access to OpenAPI configuration:

```typescript
import { AuthOpenAPI, ContentOpenAPI, ProgressOpenAPI } from '@/lib/api-setup';

// Modify configuration
AuthOpenAPI.TOKEN = 'custom-token';
ContentOpenAPI.BASE = 'https://custom-url.com';
```

## Utilities

### Get Current Token

```typescript
import { getToken } from '@/lib/api-setup';

const token = getToken(); // Gets token from cookie
```

### Custom Axios Request

For custom API calls not covered by generated clients:

```typescript
import { clientGet } from '@/lib/api-setup';

const response = await clientGet('/custom-endpoint', {
  params: { id: 123 }
});
```

### Reset API Configuration

Useful for logout or testing:

```typescript
import { resetApiClient, resetApiServer } from '@/lib/api-setup';

// Client-side
resetApiClient();

// Server-side
resetApiServer();
```

### Validate Configuration

Check if all required environment variables are set:

```typescript
import { validateApiConfig } from '@/lib/api-setup';

const { isValid, missing } = validateApiConfig();
if (!isValid) {
  console.error('Missing environment variables:', missing);
}
```

## Architecture

```
lib/
├── api-config.ts        # Centralized configuration
├── setup-api-client.ts  # Client-side setup
├── setup-api-server.ts  # Server-side setup
└── api-setup.ts         # Main export file
```

### Key Features

1. **Centralized Configuration**: All API URLs managed in `api-config.ts`
2. **Environment Detection**: Auto-detect client vs server environment
3. **Type Safety**: Full TypeScript support
4. **Token Management**: Automatic token handling from cookies
5. **Development Support**: SSL bypass for self-signed certificates
6. **Multiple Services**: Support for multiple microservices

## Best Practices

1. **Always setup before API calls**: Call `setupApiClient()` or `setupApiServer()` before making any API requests
2. **Use appropriate setup function**: Use client setup for client components, server setup for server components
3. **Token refresh**: Re-run setup when token changes
4. **Error handling**: Wrap API calls in try-catch blocks
5. **Type imports**: Import types from generated API packages

## Troubleshooting

### API calls failing

1. Check if setup function was called
2. Verify environment variables are set
3. Check if token is valid
4. Verify API base URLs are correct

### SSL errors in development

The setup automatically bypasses SSL verification in development mode for self-signed certificates.

### Token not being sent

Make sure `WITH_CREDENTIALS` is set to `true` (default in client setup).

## Migration Guide

If you're updating from old API setup:

```typescript
// Old way
import { setupApiClient } from '@/lib/setup-api-client';

// New way (recommended)
import { setupApiClient } from '@/lib/api-setup';

// Same usage
await setupApiClient(token);
```

Both old and new imports still work, but new import is recommended for better organization.
