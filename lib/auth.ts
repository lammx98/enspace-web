import { AuthResponse } from "@/api/genzy-auth";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

export const AUTH_COOKIE_NAME = "auth_token";
export const REFRESH_TOKEN_COOKIE_NAME = "refresh_token";
export const USER_INFO_COOKIE_NAME = "user_info";

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds

const cookieOptions = {
  maxAge: COOKIE_MAX_AGE,
  path: "/",
  sameSite: "lax" as const,
};

/**
 * Save complete auth data from login/register response
 * @deprecated Use Zustand store instead. This is kept for backward compatibility.
 */
export function saveAuthData(authResponse: AuthResponse) {
  setCookie(AUTH_COOKIE_NAME, authResponse.token, cookieOptions);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, cookieOptions);
  
  if (authResponse.email && authResponse.fullName) {
    setCookie(
      USER_INFO_COOKIE_NAME,
      JSON.stringify({
        email: authResponse.email,
        fullName: authResponse.fullName,
        avatarUrl: authResponse.avatarUrl,
      }),
      cookieOptions
    );
  }
}

/**
 * Save tokens to cookies
 */
export function saveTokens({ token, refreshToken }: { token: string; refreshToken: string }) {
  setCookie(AUTH_COOKIE_NAME, token, cookieOptions);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);
}

/**
 * Save user info to cookie
 * @deprecated Use Zustand store instead
 */
export function saveUserInfo(user: { email: string; fullName: string; avatarUrl?: string | null }) {
  setCookie(USER_INFO_COOKIE_NAME, JSON.stringify(user), cookieOptions);
}

/**
 * Clear all auth-related cookies
 */
export function clearAuthData() {
  deleteCookie(AUTH_COOKIE_NAME);
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  deleteCookie(USER_INFO_COOKIE_NAME);
}

/**
 * Get auth token from cookie
 */
export function getAuthToken(): string | undefined {
  const token = getCookie(AUTH_COOKIE_NAME);
  return typeof token === 'string' ? token : undefined;
}

/**
 * Get refresh token from cookie
 */
export function getRefreshToken(): string | undefined {
  const token = getCookie(REFRESH_TOKEN_COOKIE_NAME);
  return typeof token === 'string' ? token : undefined;
}

/**
 * Get user info from cookie
 * @deprecated Use Zustand store instead
 */
export function getUserInfoFromCookie(): { email: string; fullName: string; avatarUrl?: string | null } | undefined {
  const userInfo = getCookie(USER_INFO_COOKIE_NAME);
  if (!userInfo || typeof userInfo !== 'string') return undefined;
  
  try {
    return JSON.parse(userInfo);
  } catch {
    return undefined;
  }
}

/**
 * Check if a JWT token is expired
 */
export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

/**
 * Decode JWT token to get payload
 */
export function decodeToken(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token);
  } catch {
    return null;
  }
}

// ============================================================
// DEPRECATED: These functions are kept for backward compatibility
// Use Zustand store from @/stores/auth-store instead
// ============================================================

/**
 * @deprecated Use useAuthStore().setAccessToken() instead
 */
export function setAccessToken(token: string) {
  console.warn('setAccessToken is deprecated. Use Zustand store instead.');
}

/**
 * @deprecated Use useAuthStore().accessToken instead
 */
export function getAccessToken(): string | undefined {
  console.warn('getAccessToken is deprecated. Use Zustand store instead.');
  return undefined;
}

/**
 * @deprecated Use useAuthStore().reset() instead
 */
export function clearAccessToken() {
  console.warn('clearAccessToken is deprecated. Use Zustand store instead.');
}

/**
 * @deprecated Use useAuthStore().setUser() instead
 */
export function setUserInfo(user: { email: string; fullName: string; avatarUrl?: string | null }) {
  console.warn('setUserInfo is deprecated. Use Zustand store instead.');
}

/**
 * @deprecated Use useAuthStore().user instead
 */
export function getUserInfo(): { email: string; fullName: string; avatarUrl?: string | null } | undefined {
  console.warn('getUserInfo is deprecated. Use Zustand store instead.');
  return undefined;
}

/**
 * @deprecated Use useAuthStore().reset() instead
 */
export function clearUserInfo() {
  console.warn('clearUserInfo is deprecated. Use Zustand store instead.');
}

/**
 * @deprecated Use useAuthStore().isAuthenticated instead
 */
export function isAuthenticated(): boolean {
  console.warn('isAuthenticated is deprecated. Use Zustand store instead.');
  return false;
}
