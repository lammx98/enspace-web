// Cookie names
export const COOKIE_NAMES = {
   TOKEN: 'JWT_TOKEN' as const,
   REFRESH_TOKEN: 'REF_TOKEN' as const,
   TOKEN_EXPIRES_AT: 'EXP_TOKEN' as const,
   USER_INFO: 'USER_INFO' as const,
};

export const COOKIE_MAX_AGE = 7 * 24 * 60 * 60; // 7 days in seconds
export const COOKIE_OPTIONS = {
   maxAge: COOKIE_MAX_AGE,
   path: '/',
   sameSite: 'lax' as const,
};
