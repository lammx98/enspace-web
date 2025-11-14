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

export function saveAuthData(authResponse: AuthResponse) {
  const expiresIn = 7; // 7 days
  const cookieOptions = {
    maxAge: expiresIn * 24 * 60 * 60,
    path: "/",
    sameSite: "lax" as const,
  };

  setCookie(AUTH_COOKIE_NAME, authResponse.token, cookieOptions);
  setCookie(REFRESH_TOKEN_COOKIE_NAME, authResponse.refreshToken, cookieOptions);
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

export function clearAuthData() {
  deleteCookie(AUTH_COOKIE_NAME);
  deleteCookie(REFRESH_TOKEN_COOKIE_NAME);
  deleteCookie(USER_INFO_COOKIE_NAME);
}

export function getAuthToken(): string | undefined {
  const token = getCookie(AUTH_COOKIE_NAME);
  return typeof token === 'string' ? token : undefined;
}

export function getRefreshToken(): string | undefined {
  const token = getCookie(REFRESH_TOKEN_COOKIE_NAME);
  return typeof token === 'string' ? token : undefined;
}

export function getUserInfo(): {
  email: string;
  fullName: string;
  pictureUrl?: string | null;
} | null {
  const userInfo = getCookie(USER_INFO_COOKIE_NAME);
  if (!userInfo || typeof userInfo !== 'string') return null;
  try {
    return JSON.parse(userInfo);
  } catch {
    return null;
  }
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

export function isAuthenticated(): boolean {
  const token = getAuthToken();
  if (!token) return false;
  return !isTokenExpired(token);
}
