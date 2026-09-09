"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { uploadImage } from "@/utils/uploadImage";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);
const [profileImageFile, setProfileImageFile] = useState(null);
const [profileImagePreview, setProfileImagePreview] =
  useState("");
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

    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = formData;

    // Frontend validation
    if (!name || !email || !phone || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (name.trim().length < 2) {
      setError("Name must be at least 2 characters long.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      let profileImageUrl = "";

if (profileImageFile) {
  profileImageUrl = await uploadImage(profileImageFile);
}
      

      const response = await fetch(
        `${API_URL}/api/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            phone: phone.trim(),
            password,
            profileImage: profileImageUrl,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed."
        );
      }

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      // Clear form
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);

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

          {/* Left Side */}
          <div className="relative hidden overflow-hidden bg-green-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-500/40" />
            <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-emerald-900/30" />

            <div className="relative z-10">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-2xl shadow-lg">
                  🌱
                </div>

                <div>
                  <h1 className="text-2xl font-extrabold">
                    SMA<span className="text-green-200">GRO</span>
                  </h1>

                  <p className="text-[10px] font-medium tracking-[0.2em] text-green-100">
                    SMART AGRICULTURE
                  </p>
                </div>
              </Link>

              <div className="mt-20 max-w-md">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                  🌱 Welcome to SMAGRO
                </span>

                <h2 className="mt-6 text-4xl font-extrabold leading-tight">
                  Grow better.
                  <br />
                  Farm smarter.
                </h2>

                <p className="mt-5 leading-7 text-green-100">
                  Create your SMAGRO account and get access to
                  quality agricultural, livestock, poultry and
                  farming products.
                </p>
              </div>
            </div>

            <div className="relative z-10 space-y-4">
              <Feature
                icon={<CheckCircle2 className="h-5 w-5" />}
                text="Quality agricultural products"
              />

              <Feature
                icon={<CheckCircle2 className="h-5 w-5" />}
                text="Easy and secure ordering"
              />

              <Feature
                icon={<CheckCircle2 className="h-5 w-5" />}
                text="Reliable customer support"
              />
            </div>
          </div>

          {/* Right Side */}
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
                      SMA<span className="text-green-600">GRO</span>
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
                  <UserPlus className="h-7 w-7 text-green-700" />
                </div>

                <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">
                  Create Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Join SMAGRO today and start shopping for
                  quality agricultural products.
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
                {/* Name */}
                <InputField
                  label="Full Name"
                  name="name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  icon={<User className="h-5 w-5" />}
                />

                {/* Email */}
                <InputField
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  icon={<Mail className="h-5 w-5" />}
                />

                {/* Phone */}
                <InputField
                  label="Phone Number"
                  name="phone"
                  type="tel"
                  placeholder="01712345678"
                  value={formData.phone}
                  onChange={handleChange}
                  icon={<Phone className="h-5 w-5" />}
                />

                {/* Password */}
                <PasswordField
                  label="Password"
                  name="password"
                  placeholder="Minimum 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                {/* Confirm Password */}
                <PasswordField
                  label="Confirm Password"
                  name="confirmPassword"
                  placeholder="Re-enter your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />

                {/* Profile Image */}
<div>
  <label
    htmlFor="profileImage"
    className="mb-2 block text-sm font-semibold text-gray-700"
  >
    Profile Image
  </label>

  <input
    id="profileImage"
    name="profileImage"
    type="file"
    accept="image/*"
    onChange={(event) => {
      const file = event.target.files?.[0];

      if (!file) return;

      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        setError("Profile image must be less than 5MB.");
        return;
      }

      setProfileImageFile(file);
      setProfileImagePreview(URL.createObjectURL(file));
      setError("");
    }}
    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-green-100 file:px-4 file:py-2 file:font-semibold file:text-green-700 hover:file:bg-green-200"
  />

  <p className="mt-2 text-xs text-gray-400">
    JPG, PNG or WEBP. Maximum 5MB.
  </p>

  {profileImagePreview && (
    <div className="mt-4">
      <p className="mb-2 text-xs font-medium text-gray-500">
        Profile Image Preview
      </p>

      <img
        src={profileImagePreview}
        alt="Profile preview"
        className="h-24 w-24 rounded-full border-4 border-green-100 object-cover"
      />
    </div>
  )}
</div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    id="terms"
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
                  />

                  <label
                    htmlFor="terms"
                    className="text-xs leading-5 text-gray-500"
                  >
                    I agree to the SMAGRO{" "}
                    <Link
                      href="/terms"
                      className="font-semibold text-green-700 hover:underline"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="font-semibold text-green-700 hover:underline"
                    >
                      Privacy Policy
                    </Link>
                    .
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
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </form>

              {/* Security */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                Your account information is securely protected.
              </div>

              {/* Login */}
              <div className="mt-7 border-t border-gray-100 pt-6 text-center">
                <p className="text-sm text-gray-500">
                  Already have an account?{" "}
                  <Link
                    href="/login"
                    className="font-bold text-green-700 hover:text-green-800 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

/* Input Component */
function InputField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </div>

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={name}
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />
      </div>
    </div>
  );
}

/* Password Component */
function PasswordField({
  label,
  name,
  placeholder,
  value,
  onChange,
  showPassword,
  setShowPassword,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-semibold text-gray-700"
      >
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
          <Lock className="h-5 w-5" />
        </div>

        <input
          id={name}
          name={name}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="new-password"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-12 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
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
  );
}

/* Feature Component */
function Feature({ icon, text }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10">
        {icon}
      </div>

      <span className="text-sm font-medium text-green-50">
        {text}
      </span>
    </div>
  );
}