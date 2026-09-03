import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <h2 className="text-3xl font-extrabold text-white">
                SMAGRO
              </h2>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-7 text-gray-400">
              Your trusted online healthcare and medicine platform.
              We make quality healthcare products accessible,
              convenient and reliable.
            </p>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white transition hover:bg-green-600"
              >
                f
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-800 text-sm font-bold text-white transition hover:bg-green-600"
              >
                ig
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/"
                  className="transition hover:text-green-400"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/medicines"
                  className="transition hover:text-green-400"
                >
                  Medicines
                </Link>
              </li>

              <li>
                <Link
                  href="/categories"
                  className="transition hover:text-green-400"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="transition hover:text-green-400"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="transition hover:text-green-400"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Customer Service
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link
                  href="/shipping"
                  className="transition hover:text-green-400"
                >
                  Shipping & Delivery
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="transition hover:text-green-400"
                >
                  Returns & Refunds
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="transition hover:text-green-400"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="transition hover:text-green-400"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-white">
              Contact Us
            </h3>

            <div className="mt-5 space-y-4 text-sm">

              <div className="flex gap-3">
                <MapPin
                  size={20}
                  className="mt-0.5 shrink-0 text-green-500"
                />

                <span>
                  Dhaka, Bangladesh
                </span>
              </div>

              <div className="flex gap-3">
                <Phone
                  size={20}
                  className="shrink-0 text-green-500"
                />

                <span>
                  +880 1XXXXXXXXX
                </span>
              </div>

              <div className="flex gap-3">
                <Mail
                  size={20}
                  className="shrink-0 text-green-500"
                />

                <span>
                  support@smagro.com
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-gray-800">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-gray-500 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} SMAGRO. All rights reserved.
        </div>
      </div>

    </footer>
  );
}