"use client";

export default function LoginPage() {
   const handleGoogleLogin = () => {
      window.location.href = "https://localhost:5001/auth/google-login";
   };

   return (
      <div className="flex items-center justify-center h-screen">
         <button
            onClick={handleGoogleLogin}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
         >
            Login with Google
         </button>
      </div>
   );
}
