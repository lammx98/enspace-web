import { NextRequest, NextResponse } from 'next/server';
import { COOKIE_NAMES } from './contants';

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/login', '/auth/callback'];

// Buffer time before token expiration (1 minute in milliseconds)
const TOKEN_EXPIRY_BUFFER = 60 * 1000;

/**
 * Decode JWT token to get expiration time
 * Returns expiration timestamp in milliseconds, or null if invalid
 */
function getTokenExpiration(token: string): number | null {
   try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;

      const payload = JSON.parse(atob(parts[1]));
      if (!payload.exp) return null;

      // Convert from seconds to milliseconds
      return payload.exp * 1000;
   } catch {
      return null;
   }
}

/**
 * Check if token is expired (with buffer)
 */
function isTokenExpired(token: string, expiresAt: string | undefined): boolean {
   // If we have expiresAt cookie, use it (more reliable)
   if (expiresAt) {
      const expiresAtMs = parseInt(expiresAt, 10);
      if (!isNaN(expiresAtMs)) {
         return Date.now() >= expiresAtMs - TOKEN_EXPIRY_BUFFER;
      }
   }

   // Fallback to decoding token
   const tokenExpiration = getTokenExpiration(token);
   if (tokenExpiration === null) return true;

   return Date.now() >= tokenExpiration - TOKEN_EXPIRY_BUFFER;
}

/**
 * Refresh token by calling the refresh API endpoint
 * Returns a response with updated cookies, or null if refresh failed
 */
async function fetchToken(refreshToken: string, request: NextRequest): Promise<NextResponse | null> {
   try {
      // Get the origin URL for the API call
      const origin = request.nextUrl.origin;
      const refreshUrl = `${origin}/api/auth/refresh`;

      // Call refresh API with cookies from the original request
      const response = await fetch(refreshUrl, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Cookie: request.headers.get('cookie') || '',
         },
      });

      if (!response.ok) {
         return null;
      }

      const data = await response.json();
      console.log(data)
      const newToken = data.accessToken;
      const newRefreshToken = data.refreshToken;
      const newExpiresAt = data.expiresAt;

      if (!newToken) {
         return null;
      }

      // Create a new response that forwards the request
      const nextResponse = NextResponse.next({
         request: {
            headers: request.headers,
         },
      });

      // Set cookies manually since API route sets them via cookies() API
      // which doesn't expose Set-Cookie headers directly
      const isProduction = process.env.NODE_ENV === 'production';

      // Set token cookie
      nextResponse.cookies.set(COOKIE_NAMES.TOKEN, newToken, {
         httpOnly: true,
         secure: isProduction,
         sameSite: 'strict',
         maxAge: 7 * 24 * 60 * 60,
      });

      // Set refresh_token cookie if provided
      if (newRefreshToken) {
         nextResponse.cookies.set(COOKIE_NAMES.REFRESH_TOKEN, newRefreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
         });
      }

      // Set expires_at cookie
      if (newExpiresAt) {
         nextResponse.cookies.set(COOKIE_NAMES.TOKEN_EXPIRES_AT, newExpiresAt.toString(), {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60,
         });
      }

      return nextResponse;
   } catch (error) {
      console.error('Token refresh failed in middleware:', error);
      return null;
   }
}

export async function middleware(request: NextRequest) {
   const { pathname } = request.nextUrl;

   // Skip middleware for public routes
   if (PUBLIC_ROUTES.some((route) => pathname.startsWith(route))) {
      return NextResponse.next();
   }

   // Skip middleware for API routes (let API routes handle their own auth)
   if (pathname.startsWith('/api/')) {
      return NextResponse.next();
   }

   // Skip middleware for static files and Next.js internals
   if (
      pathname.startsWith('/_next/') ||
      pathname.startsWith('/favicon.ico') ||
      pathname.startsWith('/public/') ||
      pathname.match(/\.(ico|png|jpg|jpeg|gif|svg|css|js|woff|woff2|ttf|eot)$/)
   ) {
      return NextResponse.next();
   }

   // Get tokens from cookies
   const accessToken = request.cookies.get(COOKIE_NAMES.TOKEN)?.value;
   const refreshToken = request.cookies.get(COOKIE_NAMES.REFRESH_TOKEN)?.value;
   const tokenExpiresAt = request.cookies.get(COOKIE_NAMES.TOKEN_EXPIRES_AT)?.value;

   // Case 1: No access token and no refresh token => redirect to login
   if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
   }

   // Case 2: No access token but have refresh token => try to refresh
   if (!accessToken && refreshToken) {
      const refreshResponse = await fetchToken(refreshToken, request);
      if (refreshResponse) {
         return refreshResponse;
      }
      // Refresh failed => redirect to login
      return NextResponse.redirect(new URL('/login', request.url));
   }

   // Case 3: Have access token
   if (accessToken) {
      // Check if token is expired
      if (isTokenExpired(accessToken, tokenExpiresAt)) {
         // Token expired, try to refresh if we have refresh token
         if (refreshToken) {
            const refreshResponse = await fetchToken(refreshToken, request);
            if (refreshResponse) {
               return refreshResponse;
            }
         }
         // Refresh failed or no refresh token => redirect to login
         return NextResponse.redirect(new URL('/login', request.url));
      }

      // Token is valid => pass through
      return NextResponse.next();
   }

   // Fallback: redirect to login
   return NextResponse.redirect(new URL('/login', request.url));
}

// Configure which routes the middleware should run on
export const config = {
   matcher: [
      /*
       * Match all request paths except for the ones starting with:
       * - api (API routes)
       * - _next/static (static files)
       * - _next/image (image optimization files)
       * - favicon.ico (favicon file)
       */
      '/((?!api|_next/static|_next/image|favicon.ico).*)',
   ],
};
