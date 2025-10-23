"use client";
import { setupApiClientAuth } from "@/lib/setup-api-client";
import React, { FC, ReactNode } from "react";

setupApiClientAuth();

interface AppProviderProps {
   children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = (props) => {
   return <>{props.children}</>;
};

export default AppProvider;
