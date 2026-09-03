"use client";

import Link from "next/link";
import { Users, ArrowRight } from "lucide-react";

export default function RecentUsers({
  users = [],
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 p-5">
        <div>
          <h3 className="font-bold text-gray-900">
            Recent Users
          </h3>

          <p className="mt-1 text-xs text-gray-500">
            Latest registered customers
          </p>
        </div>

        <Link
          href="/admin/users"
          className="flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700"
        >
          View All
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="divide-y divide-gray-100">
        {users.length === 0 ? (
          <div className="p-8 text-center">
            <Users
              size={35}
              className="mx-auto text-gray-300"
            />

            <p className="mt-3 text-sm text-gray-500">
              No users found.
            </p>
          </div>
        ) : (
          users
            .slice(0, 5)
            .map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between gap-3 p-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
                    {user.name
                      ?.charAt(0)
                      ?.toUpperCase() || "U"}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-900">
                      {user.name}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold ${
                    user.status === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}