"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const { email, password } = formData;

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Login failed."
        );
      }

      setSuccess(
        "Login successful! Redirecting..."
      );

      /*
       * JWT is stored inside HTTP-only cookie
       * by the backend.
       */

      // Admin and user can later have separate dashboards.
      if (data.user?.role === "admin") {
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      } else {
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (error) {
      console.error("Login error:", error);

      setError(
        error.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-2xl lg:grid-cols-2">

          {/* =========================
              LEFT SIDE
          ========================= */}

          <div className="relative hidden overflow-hidden bg-green-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/40" />

            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-900/30" />

            <div className="relative z-10">
              {/* Logo */}
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">
                  🌱
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold">
                    SMA
                    <span className="text-green-200">
                      GRO
                    </span>
                  </h1>

                  <p className="text-[10px] font-medium tracking-[0.2em] text-green-100">
                    SMART AGRICULTURE
                  </p>
                </div>
              </Link>

              {/* Content */}
              <div className="mt-20 max-w-md">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                  🌱 Welcome Back
                </span>

                <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                  Your farm.
                  <br />
                  Your growth.
                  <br />
                  Your SMAGRO.
                </h2>

                <p className="mt-5 leading-7 text-green-100">
                  Login to manage your orders and access
                  quality agricultural, livestock, poultry
                  and farming products.
                </p>
              </div>
            </div>

            {/* Features */}
            <div className="relative z-10 space-y-4">
              <Feature
                text="Quality agricultural products"
              />

              <Feature
                text="Fast and easy ordering"
              />

              <Feature
                text="Secure account protection"
              />
            </div>
          </div>

          {/* =========================
              RIGHT SIDE
          ========================= */}

          <div className="p-6 sm:p-10 lg:p-12">
            <div className="mx-auto max-w-md">

              {/* Mobile Logo */}
              <div className="mb-8 flex justify-center lg:hidden">
                <Link
                  href="/"
                  className="flex items-center gap-2"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-600 text-xl shadow-md">
                    🌱
                  </div>

                  <div>
                    <h1 className="text-2xl font-extrabold text-gray-900">
                      SMA
                      <span className="text-green-600">
                        GRO
                      </span>
                    </h1>

                    <p className="-mt-1 text-[9px] tracking-[0.2em] text-gray-500">
                      SMART AGRICULTURE
                    </p>
                  </div>
                </Link>
              </div>

              {/* Header */}
              <div className="mb-8">
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                  <LogIn className="h-7 w-7 text-green-700" />
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Login to your SMAGRO account to continue.
                </p>
              </div>

              {/* Error */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              {/* Success */}
              {success && (
                <div className="mb-5 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  {success}
                </div>
              )}

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>

                    <Link
                      href="/forgot-password"
                      className="text-xs font-semibold text-green-700 hover:text-green-800 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="relative">
                    <Lock className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

                    <input
                      id="password"
                      name="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center gap-3">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />

                  <label
                    htmlFor="remember"
                    className="text-sm text-gray-500"
                  >
                    Remember me
                  </label>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3.5 font-bold text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      Login to SMAGRO
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Secure login protected by SMAGRO
              </div>

              {/* Register */}
              <div className="mt-7 border-t border-gray-100 pt-6">
                <div className="text-center">
                  <p className="text-sm text-gray-500">
                    Don't have an account?
                  </p>

                  <Link
                    href="/register"
                    className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm font-bold text-green-700 transition hover:border-green-600 hover:bg-green-100"
                  >
                    <UserPlus className="h-4 w-4" />
                    Create New Account
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* =========================
   FEATURE
========================= */

function Feature({ text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        <CheckCircle2 className="h-5 w-5" />
      </div>

      <span className="text-sm font-medium text-green-50">
        {text}
      </span>
    </div>
  );
}