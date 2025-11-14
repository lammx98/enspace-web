"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthService, AuthResponse } from "@/api/genzy-auth";
import {
  saveAuthData,
  clearAuthData,
  getUserInfo,
  isAuthenticated as checkIsAuthenticated,
  getAuthToken,
  getRefreshToken,
} from "@/lib/auth";
import { useRouter } from "next/navigation";
import { setupApiClient } from "@/lib/setup-api-client";

interface User {
  email: string;
  fullName: string;
  pictureUrl?: string | null;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  refreshAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check authentication on mount
    const checkAuth = async () => {
      const authenticated = checkIsAuthenticated();
      setIsAuthenticated(authenticated);
      
      if (authenticated) {
        const userInfo = getUserInfo();
        setUser(userInfo);
        
        // Setup API client with token
        const token = getAuthToken();
        if (token) {
          await setupApiClient(token);
        }
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await AuthService.postAuthLogin({
        requestBody: { email, password },
      });

      saveAuthData(response);
      setUser({
        email: response.email,
        fullName: response.fullName,
        pictureUrl: response.pictureUrl,
      });
      setIsAuthenticated(true);

      // Setup API client with new token
      await setupApiClient(response.token);

      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    clearAuthData();
    setUser(null);
    setIsAuthenticated(false);
    router.push("/login");
  };

  const refreshAuth = async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        logout();
        return;
      }

      const response = await AuthService.postAuthRefreshToken({
        requestBody: refreshToken,
      });

      saveAuthData(response);
      setUser({
        email: response.email,
        fullName: response.fullName,
        pictureUrl: response.pictureUrl,
      });
      setIsAuthenticated(true);

      // Setup API client with new token
      await setupApiClient(response.token);
    } catch (error) {
      console.error("Token refresh failed:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
