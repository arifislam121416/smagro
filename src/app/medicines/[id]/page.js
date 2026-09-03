import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ShoppingCart } from "lucide-react";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export default async function MedicineDetailsPage({ params }) {
  const { id } = await params;

  const medicine = products.find(
    (product) => product.id === id
  );

  if (!medicine) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center px-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Product Not Found
            </h1>

            <p className="mt-3 text-gray-600">
              The product you are looking for does not exist.
            </p>

            <Link
              href="/medicines"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Products
            </Link>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* Breadcrumb */}
        <div className="mx-auto max-w-7xl px-6 pt-8">
          <Link
            href="/medicines"
            className="inline-flex items-center gap-2 text-sm font-medium text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>
        </div>

        {/* Product */}
        <section className="mx-auto max-w-7xl px-6 py-10">
          <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-sm md:p-10 lg:grid-cols-2">

            {/* Image */}
            <div className="flex min-h-[450px] items-center justify-center rounded-2xl bg-gray-50 p-8">
              <div className="relative h-[400px] w-full">
                <Image
                  src={medicine.image}
                  alt={medicine.name}
                  fill
                  priority
                  className="object-contain"
                />
              </div>
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center">

              <span className="w-fit rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
                {medicine.category}
              </span>

              <h1 className="mt-5 text-4xl font-bold text-gray-900">
                {medicine.name}
              </h1>

              <p className="mt-2 text-lg text-gray-500">
                {medicine.banglaName}
              </p>

              <p className="mt-6 leading-8 text-gray-600">
                {medicine.description}
              </p>

              {/* Price */}
              <div className="mt-6">
                <span className="text-3xl font-bold text-green-700">
                  {medicine.price > 450
                    ? `৳ ${medicine.price}`
                    : "Price : 700 ৳"}
                </span>
              </div>

              {/* Supply */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900">
                  Available Supply
                </h3>

                <div className="mt-3 flex flex-wrap gap-3">
                  {medicine.supply.map((size) => (
                    <span
                      key={size}
                      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <button
                  disabled={medicine.stock <= 50}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-green-600 px-6 py-4 font-semibold text-green-700 hover:bg-green-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Add to Cart
                </button>

                <Link
                  href={`/order/${medicine.id}`}
                  className="flex flex-1 items-center justify-center rounded-xl bg-green-600 px-6 py-4 font-semibold text-white hover:bg-green-700"
                >
                  Order Now
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="mx-auto max-w-7xl px-6 pb-12">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Product Benefits
            </h2>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {medicine.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex gap-3 rounded-xl bg-green-50 p-4"
                >
                  <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-green-600" />

                  <p className="leading-7 text-gray-700">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* Usage */}
        <section className="mx-auto max-w-7xl px-6 pb-16">
          <div className="rounded-3xl bg-white p-8 shadow-sm md:p-10">

            <h2 className="text-2xl font-bold text-gray-900">
              Usage & Dosage
            </h2>

            <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200">
              <div className="grid grid-cols-2 bg-gray-100 p-4 font-semibold text-gray-800">
                <span>Animal</span>
                <span>Recommended Dose</span>
              </div>

              {medicine.usage.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-2 border-t border-gray-200 p-4 text-gray-700"
                >
                  <span className="font-medium">
                    {item.animal}
                  </span>

                  <span>{item.dose}</span>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}