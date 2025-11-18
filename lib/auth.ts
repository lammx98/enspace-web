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

// In-memory stores (lost on full page reload; rely on refresh flow)
let accessTokenMem: string | undefined;
let userInfoMem:
  | { email: string; fullName: string; pictureUrl?: string | null }
  | undefined;

export function saveAuthData(authResponse: AuthResponse) {
  const expiresIn = 7; // 7 days
  const cookieOptions = {
    maxAge: expiresIn * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
  };

  setCookie(AUTH_COOKIE_NAME, authResponse.token, cookieOptions);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, cookieOptions);
  // Backward-compatible: save user info if present in response
  if (authResponse.email && authResponse.fullName) {
    setCookie(
      USER_INFO_COOKIE_NAME,
      JSON.stringify({
        email: authResponse.email,
        fullName: authResponse.fullName,
        pictureUrl: authResponse.pictureUrl,
      }),
      cookieOptions
    );
  }
}

export function saveTokens({ token, refreshToken }: { token: string; refreshToken: string }) {
  const expiresIn = 7; // 7 days
  const cookieOptions = {
    maxAge: expiresIn * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
  };
  setCookie(AUTH_COOKIE_NAME, token, cookieOptions);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, cookieOptions);
}

export function saveUserInfo(user: { email: string; fullName: string; pictureUrl?: string | null }) {
  const expiresIn = 7; // 7 days
  const cookieOptions = {
    maxAge: expiresIn * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
  };
  setCookie(USER_INFO_COOKIE_NAME, JSON.stringify(user), cookieOptions);
}

export function clearAuthData() {
  deleteCookie(AUTH_COOKIE_NAME);
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  deleteCookie(USER_INFO_COOKIE_NAME);
  clearAccessToken();
  clearUserInfo();
}

export function getAuthToken(): string | undefined {
  const token = getCookie(AUTH_COOKIE_NAME);
  return typeof token === 'string' ? token : undefined;
}

// Set access token in memory only
export function setAccessToken(token: string) {
  accessTokenMem = token;
}

// Get access token (memory)
export function getAccessToken(): string | undefined {
  return accessTokenMem;
}

// Clear access token
export function clearAccessToken() {
  accessTokenMem = undefined;
}

// Set user info in memory
export function setUserInfo(user: {
  email: string;
  fullName: string;
  pictureUrl?: string | null;
}) {
  userInfoMem = user;
}

// Get user info from memory
export function getUserInfo():
  | { email: string; fullName: string; pictureUrl?: string | null }
  | undefined {
  return userInfoMem;
}

// Clear user info
export function clearUserInfo() {
  userInfoMem = undefined;
}

export function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwtDecode<JWTPayload>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch {
    return true;
  }
}

// Auth status (memory token only)
export function isAuthenticated(): boolean {
  return !!accessTokenMem;
}
