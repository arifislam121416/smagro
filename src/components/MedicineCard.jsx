"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  ArrowRight,
  Package,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function MedicineCard({ medicine }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (medicine.stock <= 0) return;

    addToCart(medicine, 1);

    alert(`${medicine.name} added to cart!`);
  };

  return (
    <div className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative h-64 overflow-hidden bg-gray-50">

        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Package className="h-16 w-16 text-gray-300" />
          </div>
        )}

        {medicine.badge && (
          <span className="absolute left-4 top-4 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white">
            {medicine.badge}
          </span>
        )}

        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
            medicine.stock > 0
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {medicine.stock > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        <p className="mb-2 text-sm font-medium text-green-600">
          {medicine.category}
        </p>

        <h3 className="text-xl font-bold text-gray-900">
          {medicine.name}
        </h3>

        {medicine.banglaName && (
          <p className="mt-1 text-sm text-gray-500">
            {medicine.banglaName}
          </p>
        )}

        <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-600">
          {medicine.description}
        </p>

        {/* Price */}
        <div className="mt-4">
          <span className="text-2xl font-bold text-green-700">
            {medicine.price > 0
              ? `৳${medicine.price}`
              : "Price on Request"}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-5 grid grid-cols-2 gap-3">

          <button
            onClick={handleAddToCart}
            disabled={medicine.stock <= 0}
            className="flex items-center justify-center gap-2 rounded-xl border border-green-600 px-4 py-3 text-sm font-semibold text-green-700 transition hover:bg-green-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400"
          >
            <ShoppingCart className="h-4 w-4" />

            Cart
          </button>

          <Link
            href={`/medicines/${medicine.id}`}
            className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
          >
            Details

            <ArrowRight className="h-4 w-4" />
          </Link>

        </div>
      </div>
    </div>
  );
}