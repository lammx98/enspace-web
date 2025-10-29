"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function GoogleCallback() {
   const router = useRouter();
   const searchParams = useSearchParams();

   useEffect(() => {
      const token = searchParams.get("token");
      if (token) {
         localStorage.setItem("token", token);
         router.push("/");
      } else {
         router.push("/login");
      }
   }, [searchParams, router]);

   return <p>Đang xử lý đăng nhập...</p>;
}
