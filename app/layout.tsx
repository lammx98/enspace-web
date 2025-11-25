import './polyfills.server';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { setupApiServer } from '@/lib/setup-api-server';
import AppProvider from './app-provider';

const geistSans = Geist({
   variable: '--font-geist-sans',
   subsets: ['latin'],
});

const geistMono = Geist_Mono({
   variable: '--font-geist-mono',
   subsets: ['latin'],
});

export const metadata: Metadata = {
   title: 'EnSpace - Learn English',
   description: 'Your English learning journey starts here',
};

await setupApiServer();

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
            <AppProvider>{children}</AppProvider>
         </body>
      </html>
   );
}
