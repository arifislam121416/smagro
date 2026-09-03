"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ShoppingCart,
  Star,
  Check,
} from "lucide-react";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";

export default function FeaturedProducts() {
  const { addToCart } = useCart();

  const featuredProducts = products
    .filter((product) => product.status !== "inactive")
    .slice(0, 4);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-green-600">
              Featured Collection
            </span>

            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Popular Products
            </h2>

            <p className="mt-3 max-w-2xl text-gray-500">
              Explore our carefully selected agricultural and
              livestock-care products.
            </p>
          </div>

          <Link
            href="/medicines"
            className="group inline-flex items-center gap-2 text-sm font-bold text-green-600 transition hover:text-green-700"
          >
            View All Products
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Products */}
        {featuredProducts.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-dashed border-gray-200 py-16 text-center">
            <p className="font-semibold text-gray-500">
              Products coming soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, addToCart }) {
  const isAvailable = Number(product.stock || 0) > 0;

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-xl">
      {/* Image */}
      <Link
        href={`/medicines/${product.id}`}
        className="relative block aspect-square overflow-hidden bg-gray-50"
      >
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-7xl">
            💊
          </div>
        )}

        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
            {product.badge}
          </span>
        )}

        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            isAvailable
              ? "bg-white text-green-700 shadow-sm"
              : "bg-red-50 text-red-600"
          }`}
        >
          {isAvailable ? "In Stock" : "Out of Stock"}
        </span>
      </Link>

      {/* Content */}
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-green-600">
          {product.category}
        </p>

        <Link href={`/medicines/${product.id}`}>
          <h3 className="mt-2 line-clamp-1 text-lg font-bold text-gray-900 transition hover:text-green-600">
            {product.name}
          </h3>
        </Link>

        {product.banglaName && (
          <p className="mt-1 line-clamp-1 text-sm text-gray-500">
            {product.banglaName}
          </p>
        )}

        {/* Rating */}
        <div className="mt-3 flex items-center gap-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((item) => (
              <Star
                key={item}
                className="h-3.5 w-3.5 fill-current text-amber-400"
              />
            ))}
          </div>

          <span className="text-xs text-gray-400">
            5.0
          </span>
        </div>

        {/* Price + Cart */}
        <div className="mt-5 flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-gray-400">Price</p>
            <p className="text-xl font-extrabold text-gray-900">
              ৳{Number(product.price || 0).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            disabled={!isAvailable}
            onClick={() => addToCart(product, 1)}
            className="flex h-11 items-center gap-2 rounded-xl bg-green-600 px-4 text-sm font-bold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400"
          >
            {isAvailable ? (
              <>
                <ShoppingCart className="h-4 w-4" />
                Add
              </>
            ) : (
              <>
                <Check className="h-4 w-4" />
                Sold Out
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}