"use client";
import { setupApiClient } from "@/lib/setup-api-client";
import React, { FC, ReactNode } from "react";

setupApiClient();

interface AppProviderProps {
   children?: ReactNode;
}

const AppProvider: FC<AppProviderProps> = (props) => {
   return <>{props.children}</>;
};

export default AppProvider;
