"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    cartTotal,
    clearCart,
  } = useCart();

  const [paymentMethod, setPaymentMethod] =
    useState("Cash on Delivery");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    const order = {
      customer: formData,
      products: cart,
      total: cartTotal,
      paymentMethod,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "smagro-last-order",
      JSON.stringify(order)
    );

    clearCart();

    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[60vh] items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold">
              Your cart is empty
            </h1>

            <Link
              href="/medicines"
              className="mt-5 inline-block rounded-xl bg-green-600 px-6 py-3 text-white"
            >
              Browse Products
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

      <main className="min-h-screen bg-gray-50 px-6 py-10">

        <div className="mx-auto max-w-6xl">

          <h1 className="text-3xl font-bold text-gray-900">
            Checkout
          </h1>

          <div className="mt-8 grid gap-8 lg:grid-cols-3">

            {/* Customer Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 rounded-2xl bg-white p-6 shadow-sm lg:col-span-2"
            >

              <div>
                <h2 className="text-xl font-bold">
                  Customer Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Please provide your delivery information.
                </p>
              </div>

              {/* Name */}
              <div>
                <label className="mb-2 block font-medium">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block font-medium">
                  Mobile Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="01XXXXXXXXX"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block font-medium">
                  Delivery Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="House, Road, Area..."
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* City */}
              <div>
                <label className="mb-2 block font-medium">
                  City / District
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  placeholder="Dhaka"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Notes */}
              <div>
                <label className="mb-2 block font-medium">
                  Order Notes
                </label>

                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Optional notes"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:border-green-500"
                />
              </div>

              {/* Payment */}
              <div>
                <h2 className="mb-4 text-xl font-bold">
                  Payment Method
                </h2>

                <div className="space-y-3">

                  {[
                    "Cash on Delivery",
                    "bKash",
                    "Rocket",
                    "Bank Transfer",
                  ].map((method) => (
                    <label
                      key={method}
                      className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 ${
                        paymentMethod === method
                          ? "border-green-500 bg-green-50"
                          : "border-gray-200"
                      }`}
                    >

                      <input
                        type="radio"
                        name="payment"
                        value={method}
                        checked={
                          paymentMethod === method
                        }
                        onChange={(e) =>
                          setPaymentMethod(
                            e.target.value
                          )
                        }
                      />

                      <span className="font-medium">
                        {method}
                      </span>

                    </label>
                  ))}

                </div>

                {paymentMethod !== "Cash on Delivery" && (
                  <div className="mt-4 rounded-xl bg-yellow-50 p-4 text-sm text-yellow-800">
                    Payment instructions will be shown
                    after the order is submitted.
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-green-600 px-6 py-4 font-bold text-white transition hover:bg-green-700"
              >
                Place Order
              </button>

            </form>

            {/* Order Summary */}
            <div className="h-fit rounded-2xl bg-white p-6 shadow-sm">

              <h2 className="text-xl font-bold">
                Your Order
              </h2>

              <div className="mt-5 space-y-4">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between gap-4 text-sm"
                  >
                    <div>
                      <p className="font-semibold">
                        {item.name}
                      </p>

                      <p className="text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <span className="font-semibold">
                      ৳{item.price * item.quantity}
                    </span>
                  </div>
                ))}

              </div>

              <div className="mt-6 border-t pt-5">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>

                  <span className="text-green-700">
                    ৳{cartTotal}
                  </span>
                </div>
              </div>

            </div>

          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}