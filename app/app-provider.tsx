"use client";
import { setupApiClient } from "@/lib/setup-api-client";
import React, { FC, ReactNode } from "react";
import { AuthProvider } from "@/contexts/auth-context";

setupApiClient();

interface AppProviderProps {
   children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = (props) => {
   return <AuthProvider>{props.children}</AuthProvider>;
};

export default AppProvider;
