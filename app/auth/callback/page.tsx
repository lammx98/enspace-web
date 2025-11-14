"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { saveAuthData } from "@/lib/auth";
import { setupApiClient } from "@/lib/setup-api-client";

export default function GoogleCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get auth data from URL params
        const token = searchParams.get("token");
        const refreshToken = searchParams.get("refreshToken");
        const email = searchParams.get("email");
        const fullName = searchParams.get("fullName");
        const pictureUrl = searchParams.get("pictureUrl");

        if (token && refreshToken && email && fullName) {
          const authResponse = {
            token,
            refreshToken,
            email,
            fullName,
            pictureUrl,
          };

          saveAuthData(authResponse);
          await setupApiClient(token);

          // Redirect to home page
          router.push("/");
        } else {
          // If no auth data, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [router, searchParams]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400">
      <div className="text-white text-2xl font-bold">Authenticating...</div>
    </div>
  );
}
