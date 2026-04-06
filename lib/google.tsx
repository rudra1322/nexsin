"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

const API = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function GoogleAuthButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          if (!credentialResponse.credential) {
            console.error("No credential received");
            return;
          }

          const res = await axios.post(
            `${API}/api/users/google`, // ✅ match backend route
            {
              token: credentialResponse.credential,
            },
            {
              withCredentials: true, // 🔥 CRITICAL FIX
            }
          );

          // ✅ If request success → cookie already set
          if (res.status === 200) {
            router.replace("/home");
          }

        } catch (error) {
          console.error("Login failed:", error);
        }
      }}
      onError={() => console.log("Google Login Failed")}
    />
  );
}