import { OpenAPI } from "@/api";
import axios, { AxiosRequestConfig } from "axios";
import { getCookie } from "cookies-next";

export async function setupApiClient(token?: string) {
   OpenAPI.BASE = process.env.NEXT_PUBLIC_API_DOMAIN ?? "";
   OpenAPI.TOKEN = async () => token ?? (await getCookie("token")) ?? "";
}

export const getToken = async () => await getCookie("token");

export const clientGet = (
   url: string,
   config?: AxiosRequestConfig<any> | undefined
) => {
   const token = getCookie("token");

   return axios.get(OpenAPI.BASE + url, {
      ...config,
      headers: {
         Authorization: `Bearer ${token}`,
         ...(config?.headers || {}),
      },
   });
};
