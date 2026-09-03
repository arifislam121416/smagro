import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MedicineCard from "@/components/MedicineCard";
import CategoryCard from "@/components/CategoryCard";

import { products } from "@/data/products";

const categories = [
  {
    name: "Poultry",
    count: 1,
    icon: "🐔",
  },
  {
    name: "Livestock",
    count: 1,
    icon: "🐄",
  },
  {
    name: "Fish",
    count: 1,
    icon: "🐟",
  },
  {
    name: "Supplements",
    count: 1,
    icon: "💊",
  },
];

export default function MedicinesPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-50">

        {/* Header */}
        <section className="bg-green-700 px-6 py-16 text-white">
          <div className="mx-auto max-w-7xl">
            <p className="mb-3 font-semibold text-green-200">
              SMAGRO PRODUCTS
            </p>

            <h1 className="text-4xl font-bold md:text-5xl">
              Poultry & Livestock Medicines
            </h1>

            <p className="mt-4 max-w-2xl text-lg leading-8 text-green-100">
              Quality products and supplements for better animal health,
              growth and farm productivity.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="px-6 py-12">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                Shop by Category
              </h2>

              <p className="mt-2 text-gray-600">
                Find the right products for your farm.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {categories.map((category) => (
                <CategoryCard
                  key={category.name}
                  category={category}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Products */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl">

            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="font-semibold text-green-600">
                  OUR PRODUCTS
                </p>

                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  Featured Products
                </h2>
              </div>

              <span className="text-sm text-gray-500">
                {products.length} Product Available
              </span>
            </div>

            {products.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((medicine) => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-2xl bg-white py-20 text-center shadow-sm">
                <h3 className="text-xl font-semibold text-gray-800">
                  No products found
                </h3>
              </div>
            )}

          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-800 px-8 py-12 text-center text-white">
            <h2 className="text-3xl font-bold">
              Need Help Choosing a Product?
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-green-100">
              Contact our support team for product information and ordering
              assistance.
            </p>

            <Link
              href="/contact"
              className="mt-6 inline-block rounded-xl bg-white px-6 py-3 font-semibold text-green-700 transition hover:bg-green-50"
            >
              Contact Us
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}