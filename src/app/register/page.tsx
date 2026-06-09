"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { register } from "@/services/register";

export default function RegisterPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
  useState("");

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      await register(
        username,
        email,
        password
      );

      showToast(
        "Account created successfully"
      );

      router.push("/login");
      } catch (error: any) {

        setError(error.message);

      }
    };
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white border rounded-xl p-8">

        <h1 className="text-2xl font-bold mb-6">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Username"
            className="w-full border rounded-md p-3"
            value={username}
            onChange={(e) =>
              setUsername(
                e.target.value
              )
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-md p-3"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-md p-3"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
          />

          {error && (
            <p className="text-red-500 text-sm">
              {error}
            </p>
          )}


          <button
            type="submit"
            className="w-full bg-black text-white rounded-md p-3"
          >
            Create Account
          </button>

          <div className="mt-4 text-center">
            <p>
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-blue-600"
              >
                Login
              </Link>
            </p>
          </div>

        </form>

      </div>
    </div>
  );
} 
