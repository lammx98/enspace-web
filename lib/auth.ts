import { AuthResponse } from "@/api/genzy-auth";
import { COOKIE_NAMES, COOKIE_OPTIONS } from "@/contants";
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface JWTPayload {
  sub: string;
  email: string;
  exp: number;
  iat: number;
}

/**
 * Save complete auth data from login/register response
 * @deprecated Use Zustand store instead. This is kept for backward compatibility.
 */
export function saveAuthData(authResponse: AuthResponse) {
  setCookie(COOKIE_NAMES.TOKEN, authResponse.token, COOKIE_OPTIONS);
  setCookie(COOKIE_NAMES.REFRESH_TOKEN, authResponse.refreshToken, COOKIE_OPTIONS);
  
  if (authResponse.email && authResponse.fullName) {
    setCookie(
      COOKIE_NAMES.USER_INFO,
      JSON.stringify({
        email: authResponse.email,
        fullName: authResponse.fullName,
        avatarUrl: authResponse.avatarUrl,
      }),
      COOKIE_OPTIONS
    );
  }
}

/**
 * Save tokens to cookies
 */
export function saveTokens({ token, refreshToken }: { token: string; refreshToken: string }) {
  setCookie(COOKIE_NAMES.TOKEN, token, COOKIE_OPTIONS);
  setCookie(COOKIE_NAMES.REFRESH_TOKEN, refreshToken, COOKIE_OPTIONS);
}

/**
 * Save user info to cookie
 * @deprecated Use Zustand store instead
 */
export function saveUserInfo(user: { email: string; fullName: string; avatarUrl?: string | null }) {
  setCookie(COOKIE_NAMES.USER_INFO, JSON.stringify(user), COOKIE_OPTIONS);
}

/**
 * Clear all auth-related cookies
 */
export function clearAuthData() {
  deleteCookie(COOKIE_NAMES.TOKEN);
  deleteCookie(COOKIE_NAMES.REFRESH_TOKEN);
  deleteCookie(COOKIE_NAMES.USER_INFO);
}

/**
 * Get auth token from cookie
 */
export function getAuthToken(): string | undefined {
  const token = getCookie(COOKIE_NAMES.TOKEN);
  return typeof token === 'string' ? token : undefined;
}

/**
 * Get refresh token from cookie
 */
export function getRefreshToken(): string | undefined {
  const token = getCookie(COOKIE_NAMES.REFRESH_TOKEN);
  return typeof token === 'string' ? token : undefined;
}

/**
 * Get user info from cookie
 * @deprecated Use Zustand store instead
 */
export function getUserInfoFromCookie(): { email: string; fullName: string; avatarUrl?: string | null } | undefined {
  const userInfo = getCookie(COOKIE_NAMES.USER_INFO);
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
