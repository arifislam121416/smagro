"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Package,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  // ========================================
  // FETCH PRODUCTS
  // ========================================
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/products`
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message || "Failed to load products."
        );
      }

      setProducts(
        Array.isArray(data.products)
          ? data.products
          : []
      );
    } catch (error) {
      console.error(
        "Products fetch error:",
        error
      );

      setError(
        error.message ||
          "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // INITIAL LOAD
  // ========================================
  useEffect(() => {
    fetchProducts();
  }, []);

  // ========================================
  // FILTER PRODUCTS
  // ========================================
  const filteredProducts = products.filter(
    (product) => {
      const searchText =
        search.toLowerCase();

      return (
        String(product.name || "")
          .toLowerCase()
          .includes(searchText) ||
        String(product.category || "")
          .toLowerCase()
          .includes(searchText)
      );
    }
  );

  // ========================================
  // DELETE PRODUCT
  // ========================================
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Failed to delete product."
        );
      }

      // Remove deleted product from list
      setProducts((previousProducts) =>
        previousProducts.filter(
          (product) =>
            product._id !== id
        )
      );

      // Success toast
      setToast({
        show: true,
        message:
          "Product deleted successfully.",
        type: "success",
      });

      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "success",
        });
      }, 3000);
    } catch (error) {
      console.error(
        "Delete product error:",
        error
      );

      // Error toast
      setToast({
        show: true,
        message:
          error.message ||
          "Something went wrong while deleting product.",
        type: "error",
      });

      setTimeout(() => {
        setToast({
          show: false,
          message: "",
          type: "success",
        });
      }, 3000);
    }
  };

  return (
    <>
      {/* ========================================
          TOAST NOTIFICATION
      ======================================== */}
      {toast.show && (
        <div className="fixed right-4 top-4 z-50">
          <div
            className={`rounded-xl border px-5 py-4 shadow-lg ${
              toast.type === "success"
                ? "border-green-200 bg-green-50 text-green-700"
                : "border-red-200 bg-red-50 text-red-700"
            }`}
          >
            <p className="text-sm font-semibold">
              {toast.message}
            </p>
          </div>
        </div>
      )}

      {/* ========================================
          MAIN PAGE
      ======================================== */}
      <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">

          {/* ========================================
              HEADER
          ======================================== */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-green-600"
                >
                  <ArrowLeft size={16} />
                  Dashboard
                </Link>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Products
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage your SMAGRO products
              </p>
            </div>

            <Link
              href="/admin/products/add"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
            >
              <Plus size={18} />
              Add Product
            </Link>
          </div>

          {/* ========================================
              SEARCH + REFRESH
          ======================================== */}
          <div className="mb-6 flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>

            <button
              type="button"
              onClick={fetchProducts}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={
                  loading
                    ? "animate-spin"
                    : ""
                }
              />
              Refresh
            </button>
          </div>

          {/* ========================================
              ERROR
          ======================================== */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          )}

          {/* ========================================
              PRODUCT COUNT
          ======================================== */}
          {!loading && !error && (
            <div className="mb-4 flex items-center gap-2 text-sm text-gray-500">
              <Package size={17} />

              <span>
                {filteredProducts.length} product
                {filteredProducts.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>
          )}

          {/* ========================================
              LOADING
          ======================================== */}
          {loading && (
            <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
              <RefreshCw
                size={30}
                className="mx-auto animate-spin text-green-600"
              />

              <p className="mt-3 text-sm text-gray-500">
                Loading products...
              </p>
            </div>
          )}

          {/* ========================================
              EMPTY
          ======================================== */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                  <Package
                    size={30}
                    className="text-green-600"
                  />
                </div>

                <h2 className="mt-4 text-lg font-bold text-gray-900">
                  No Products Found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm text-gray-500">
                  There are no products in your database yet.
                </p>

                <Link
                  href="/admin/products/add"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  <Plus size={18} />
                  Add Your First Product
                </Link>
              </div>
            )}

          {/* ========================================
              PRODUCTS TABLE
          ======================================== */}
          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[900px] text-left">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Product
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Category
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Price
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Stock
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Status
                        </th>

                        <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                          Action
                        </th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map(
                        (product) => (
                          <tr
                            key={product._id}
                            className="transition hover:bg-gray-50"
                          >
                            {/* PRODUCT */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-3">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                                  {product.image ? (
                                    <img
                                      src={
                                        product.image
                                      }
                                      alt={
                                        product.name ||
                                        "Product"
                                      }
                                      className="h-full w-full object-cover"
                                    />
                                  ) : (
                                    <Package
                                      size={22}
                                      className="text-gray-400"
                                    />
                                  )}
                                </div>

                                <div>
                                  <p className="font-semibold text-gray-900">
                                    {product.name ||
                                      "Unnamed Product"}
                                  </p>

                                  {product.banglaName && (
                                    <p className="mt-1 text-xs text-gray-500">
                                      {
                                        product.banglaName
                                      }
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* CATEGORY */}
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {product.category ||
                                "—"}
                            </td>

                            {/* PRICE */}
                            <td className="px-5 py-4 text-sm font-semibold text-gray-900">
                              ৳
                              {Number(
                                product.price || 0
                              ).toLocaleString()}
                            </td>

                            {/* STOCK */}
                            <td className="px-5 py-4 text-sm text-gray-600">
                              {product.stock ?? 0}
                            </td>

                            {/* STATUS */}
                            <td className="px-5 py-4">
                              <span
                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                                  product.status ===
                                  "active"
                                    ? "bg-green-100 text-green-700"
                                    : "bg-gray-100 text-gray-600"
                                }`}
                              >
                                {product.status ||
                                  "inactive"}
                              </span>
                            </td>

                            {/* ACTION */}
                            <td className="px-5 py-4">
                              <div className="flex items-center gap-2">
                                {/* EDIT */}
                                <Link
                                  href={`/admin/products/edit/${product._id}`}
                                  className="inline-flex items-center rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 transition hover:bg-green-100"
                                >
                                  Edit
                                </Link>

                                {/* DELETE */}
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      product._id
                                    )
                                  }
                                  className="inline-flex items-center rounded-lg bg-red-50 px-3 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
        </div>
      </div>
    </>
  );
}