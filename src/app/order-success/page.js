import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function OrderSuccessPage() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6">

        <div className="w-full max-w-xl rounded-3xl bg-white p-8 text-center shadow-sm">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle2 className="h-12 w-12 text-green-600" />
          </div>

          <h1 className="mt-6 text-3xl font-bold text-gray-900">
            Order Placed Successfully!
          </h1>

          <p className="mt-4 leading-7 text-gray-600">
            Thank you for choosing SMAGRO. We have received your
            order and our team will contact you shortly to confirm
            the order.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">

            <Link
              href="/medicines"
              className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700"
            >
              Continue Shopping
            </Link>

            <Link
              href="/"
              className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back to Home
            </Link>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}