"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Plus,
  Trash2,
  Save,
  Loader2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:4000";

const categories = [
  "Poultry & Livestock",
  "Animal Medicine",
  "Poultry Medicine",
  "Cattle Medicine",
  "Fish Medicine",
  "Feed Supplement",
  "Vitamins & Minerals",
  "Agricultural Products",
];

export default function EditProductPage({ params }) {
  const [productId, setProductId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    banglaName: "",
    category: "",
    description: "",
    price: "",
    stock: "",
    image: "",
    badge: "",
    status: "active",
  });

  const [benefits, setBenefits] = useState([""]);
  const [usage, setUsage] = useState([""]);
  const [supply, setSupply] = useState([""]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // ========================================
  // GET PRODUCT ID
  // ========================================
  useEffect(() => {
    async function getParams() {
      const resolvedParams = await params;
      setProductId(resolvedParams.id);
    }

    getParams();
  }, [params]);

  // ========================================
  // FETCH PRODUCT
  // ========================================
  useEffect(() => {
    if (!productId) return;

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/products/${productId}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch product."
          );
        }

        const product = data.product;

        setFormData({
          name: product.name || "",
          banglaName: product.banglaName || "",
          category: product.category || "",
          description: product.description || "",
          price: product.price ?? "",
          stock: product.stock ?? "",
          image: product.image || "",
          badge: product.badge || "",
          status: product.status || "active",
        });

        setBenefits(
          product.benefits?.length
            ? product.benefits
            : [""]
        );

        setUsage(
          product.usage?.length
            ? product.usage
            : [""]
        );

        setSupply(
          product.supply?.length
            ? product.supply
            : [""]
        );
      } catch (err) {
        console.error("Fetch product error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId]);

  // ========================================
  // INPUT CHANGE
  // ========================================
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ========================================
  // ARRAY FIELD HANDLERS
  // ========================================
  const updateArrayItem = (
    setter,
    index,
    value
  ) => {
    setter((previous) =>
      previous.map((item, itemIndex) =>
        itemIndex === index ? value : item
      )
    );
  };

  const addArrayItem = (setter) => {
    setter((previous) => [...previous, ""]);
  };

  const removeArrayItem = (setter, index) => {
    setter((previous) => {
      if (previous.length === 1) {
        return [""];
      }

      return previous.filter(
        (_, itemIndex) => itemIndex !== index
      );
    });
  };

  // ========================================
  // UPDATE PRODUCT
  // ========================================
  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!formData.category) {
      setError("Please select a category.");
      return;
    }

    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {
      setError("Please enter a valid price.");
      return;
    }

    if (
      formData.stock === "" ||
      Number(formData.stock) < 0
    ) {
      setError("Please enter a valid stock quantity.");
      return;
    }

    try {
      setSaving(true);

      const productData = {
        name: formData.name.trim(),

        banglaName: formData.banglaName.trim(),

        category: formData.category,

        description: formData.description.trim(),

        benefits: benefits
          .map((item) => item.trim())
          .filter(Boolean),

        usage: usage
          .map((item) => item.trim())
          .filter(Boolean),

        supply: supply
          .map((item) => item.trim())
          .filter(Boolean),

        price: Number(formData.price),

        stock: Number(formData.stock),

        image: formData.image.trim(),

        badge: formData.badge.trim(),

        status: formData.status,
      };

      const response = await fetch(
        `${API_URL}/api/products/${productId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(productData),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product."
        );
      }

      setSuccess(
        "Product updated successfully!"
      );
    } catch (err) {
      console.error("Update product error:", err);

      setError(
        err.message ||
          "Something went wrong while updating product."
      );
    } finally {
      setSaving(false);
    }
  };

  // ========================================
  // LOADING
  // ========================================
  if (loading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center">
        <div className="flex items-center gap-3 text-gray-600">
          <Loader2 className="h-6 w-6 animate-spin" />
          Loading product...
        </div>
      </div>
    );
  }

  // ========================================
  // ERROR WITHOUT PRODUCT
  // ========================================
  if (error && !formData.name) {
    return (
      <div className="p-6">
        <Link
          href="/admin/products"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Products
        </Link>

        <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}
        <div className="mb-6">
          <Link
            href="/admin/products"
            className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-green-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Products
          </Link>

          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Edit Product
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Update your product information.
          </p>
        </div>

        {/* SUCCESS */}
        {success && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {success}
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* BASIC INFORMATION */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Basic Information
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Product Name *
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="AMINO MIX"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Bangla Name
                </label>

                <input
                  type="text"
                  name="banglaName"
                  value={formData.banglaName}
                  onChange={handleChange}
                  placeholder="অ্যামাইনো এসিডের সুষম মিশ্রণ"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Category *
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                >
                  <option value="active">
                    Active
                  </option>

                  <option value="inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>

            <div className="mt-5">
              <label className="mb-2 block text-sm font-semibold text-gray-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Write product description..."
                className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
              />
            </div>
          </section>

          {/* PRICE & STOCK */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Price & Stock
            </h2>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Price (৳) *
                </label>

                <input
                  type="number"
                  name="price"
                  min="0"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Stock *
                </label>

                <input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                />
              </div>
            </div>
          </section>

          {/* IMAGE */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Product Image
            </h2>

            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Image URL / Path
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="/products/amino-mix.jpg"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />

            {formData.image && (
              <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 p-3">
                <img
                  src={formData.image}
                  alt={formData.name}
                  className="h-48 w-full object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display =
                      "none";
                  }}
                />
              </div>
            )}
          </section>

          {/* BENEFITS */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                Benefits
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem(setBenefits)
                }
                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {benefits.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      updateArrayItem(
                        setBenefits,
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Benefit ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        setBenefits,
                        index
                      )
                    }
                    className="rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* USAGE */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                Usage
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem(setUsage)
                }
                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {usage.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      updateArrayItem(
                        setUsage,
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Usage ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        setUsage,
                        index
                      )
                    }
                    className="rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* SUPPLY */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-lg font-bold text-gray-900">
                Supply / Pack Size
              </h2>

              <button
                type="button"
                onClick={() =>
                  addArrayItem(setSupply)
                }
                className="inline-flex items-center gap-2 rounded-lg bg-green-50 px-3 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
              >
                <Plus className="h-4 w-4" />
                Add
              </button>
            </div>

            <div className="space-y-3">
              {supply.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={item}
                    onChange={(event) =>
                      updateArrayItem(
                        setSupply,
                        index,
                        event.target.value
                      )
                    }
                    placeholder={`Pack size ${index + 1}`}
                    className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeArrayItem(
                        setSupply,
                        index
                      )
                    }
                    className="rounded-xl border border-red-200 px-3 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* BADGE */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm md:p-6">
            <h2 className="mb-5 text-lg font-bold text-gray-900">
              Badge
            </h2>

            <input
              type="text"
              name="badge"
              value={formData.badge}
              onChange={handleChange}
              placeholder="Featured"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </section>

          {/* ACTIONS */}
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              href="/admin/products"
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Update Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}