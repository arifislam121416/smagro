import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-green-700 py-20">
      {/* Decorations */}
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-2xl" />
      <div className="absolute -bottom-32 -right-20 h-80 w-80 rounded-full bg-emerald-300/10 blur-2xl" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-green-100">
          <CheckCircle2 className="h-4 w-4" />
          Smart choices for better farming
        </span>

        <h2 className="mt-6 text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
          Give Your Farm the Care
          <span className="block text-green-200">
            It Deserves
          </span>
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-green-100 sm:text-lg">
          Explore quality products for poultry, livestock, fish and
          agricultural care—all in one convenient place.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/medicines"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-green-700 shadow-lg transition hover:-translate-y-0.5 hover:bg-green-50"
          >
            Explore Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}