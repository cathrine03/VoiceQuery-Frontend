"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth";
import Link from "next/link";
import { showToast } from "@/lib/toast";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] =
    useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      const data = await login(email, password);

      console.log("LOGIN RESPONSE:", data);

      localStorage.setItem(
        "token",
        data.access_token
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      const payload = JSON.parse(
        atob(data.access_token.split(".")[1])
      );

      console.log("PAYLOAD:", payload);

      if (payload.role === "admin") {
        router.push("/analytics");
      } else {
        router.push("/query");
      }

    } catch (error) {
      console.error("LOGIN ERROR:", error);
      showToast("Login failed");
    }
  };



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl p-8">
        <h1 className="text-2xl font-bold mb-6">
          Sign In
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-3"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-3"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button
            type="submit"
            className="w-full bg-black text-white rounded-md p-3"
          >
            Sign In
          </button>


          <div className="mt-4 text-center">
            <p>
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-blue-600"
              >
                Register
              </Link>
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}
