import "./polyfills.server";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { setupApiServer } from "@/lib/setup-api-server";
import AppProvider from "./app-provider";
import { cookies } from "next/headers";
import { AuthService } from "@/api/genzy-auth";

const geistSans = Geist({
   variable: "--font-geist-sans",
   subsets: ["latin"],
});

const geistMono = Geist_Mono({
   variable: "--font-geist-mono",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "EnSpace - Learn English",
   description: "Your English learning journey starts here",
};

async function getUserInfo(accessToken: string) {
   try {
      await setupApiServer(accessToken);
      const me = await AuthService.getAuthMe();
      return {
         email: me?.email ?? '',
         fullName: me?.name ?? '',
         pictureUrl: me?.pictureUrl ?? null,
      };
   } catch (error) {
      console.error('Failed to fetch user info:', error);
      return null;
   }
}

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   const cookieStore = await cookies();
   const refreshToken = cookieStore.get('refresh_token')?.value;
   
   let userInfo = null;
   let accessToken = null;

   if (refreshToken) {
      try {
         await setupApiServer();
         const tokenResponse = await AuthService.postAuthRefreshToken({
            requestBody: refreshToken,
         });
         accessToken = tokenResponse.token;
         
         // Fetch user info with new access token
         userInfo = await getUserInfo(accessToken);
         
         // DO NOT delete cookie here - layout cannot modify cookies
         // Cookie deletion should happen in Route Handler or Server Action
      } catch (error) {
         console.error('Token refresh failed:', error);
         // DO NOT delete cookie here
      }
   }

   return (
      <html lang="en">
         <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
         >
            <AppProvider userInfo={userInfo} accessToken={accessToken}>
               {children}
            </AppProvider>
         </body>
      </html>
   );
}
