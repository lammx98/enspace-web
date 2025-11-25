'use client';
import { setupApiClient, setupApiClientToken } from '@/lib/setup-api-client';
import React, { FC, ReactNode, useEffect, useRef } from 'react';
import { AuthProvider } from '@/app/(authorized)/auth-context';
import { usePathname, useRouter } from 'next/navigation';

interface AppProviderProps {
   children: ReactNode;
}

setupApiClient();

const AppProvider: FC<AppProviderProps> = ({ children }) => {
   return <>{children}</>;
};

export default AppProvider;
