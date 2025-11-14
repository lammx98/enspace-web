import { OpenAPI as AuthOpenAPI } from "@/api/genzy-auth";
import { OpenAPI as ContentOpenAPI } from "@/api/enspace-content";
import { OpenAPI as ProgressOpenAPI } from "@/api/enspace-progress";
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

export async function setupApiClient(token?: string) {
   const authToken: any = token ?? getCookie("auth_token") ?? "";
   
   // Setup Auth API
   AuthOpenAPI.BASE = process.env.NEXT_PUBLIC_API_AUTH_URL || "http://localhost:5000";
   AuthOpenAPI.TOKEN = async () => authToken;
   
   // Setup Content API
   ContentOpenAPI.BASE = process.env.NEXT_PUBLIC_API_CONTENT_URL || "http://localhost:5001";
   ContentOpenAPI.TOKEN = async () => authToken;
   
   // Setup Progress API
   ProgressOpenAPI.BASE = process.env.NEXT_PUBLIC_API_PROGRESS_URL || "http://localhost:5002";
   ProgressOpenAPI.TOKEN = async () => authToken;
}

export const getToken = () => getCookie("auth_token");

export const clientGet = (
   url: string,
   config?: AxiosRequestConfig<any> | undefined
) => {
   const token = getCookie("auth_token");
   const baseUrl = process.env.NEXT_PUBLIC_API_CONTENT_URL || "http://localhost:5001";

   return axios.get(baseUrl + url, {
      ...config,
      headers: {
         Authorization: `Bearer ${token}`,
         ...(config?.headers || {}),
      },
   });
};
