"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Users,
  ShieldCheck,
  UserCheck,
  UserX,
} from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/auth/users`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load users."
        );
      }

      setUsers(data.users || []);
    } catch (error) {
      console.error("Fetch users error:", error);
      setError(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (user) => {
  const newRole = user.role === "admin" ? "user" : "admin";

  const confirmed = window.confirm(
    `Are you sure you want to change ${user.name || user.email}'s role to ${newRole}?`
  );

  if (!confirmed) return;

  try {
    const response = await fetch(
      `${API_URL}/api/auth/users/${user._id}/role`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          role: newRole,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Failed to update user role."
      );
    }

    setUsers((previousUsers) =>
      previousUsers.map((item) =>
        item._id === user._id
          ? {
              ...item,
              role: newRole,
            }
          : item
      )
    );
  } catch (error) {
    console.error("Role update error:", error);

    setError(
      error.message || "Failed to update user role."
    );
  }
};

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) => {
    const searchText = search.toLowerCase();

    return (
      user.name?.toLowerCase().includes(searchText) ||
      user.email?.toLowerCase().includes(searchText) ||
      user.phone?.toLowerCase().includes(searchText) ||
      user.role?.toLowerCase().includes(searchText)
    );
  });

  const totalUsers = users.length;

  const adminUsers = users.filter(
    (user) => user.role === "admin"
  ).length;

  const activeUsers = users.filter(
    (user) => user.status === "active"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status !== "active"
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <Link
                  href="/admin"
                  className="flex items-center gap-1 text-sm font-medium text-gray-500 transition hover:text-green-700"
                >
                  <ArrowLeft size={16} />
                  Dashboard
                </Link>
              </div>

              <h1 className="text-2xl font-bold text-gray-900">
                User Management
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Manage all registered SMAGRO users.
              </p>
            </div>

            <button
              onClick={fetchUsers}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            icon={<Users size={21} />}
            title="Total Users"
            value={totalUsers}
          />

          <StatCard
            icon={<ShieldCheck size={21} />}
            title="Admins"
            value={adminUsers}
          />

          <StatCard
            icon={<UserCheck size={21} />}
            title="Active Users"
            value={activeUsers}
          />

          <StatCard
            icon={<UserX size={21} />}
            title="Inactive Users"
            value={inactiveUsers}
          />
        </div>

        {/* Search */}
        <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="relative">
            <Search
              size={19}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by name, email, phone or role..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:ring-2 focus:ring-green-100"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <RefreshCw
              size={28}
              className="mx-auto animate-spin text-green-600"
            />

            <p className="mt-3 text-sm text-gray-500">
              Loading users...
            </p>
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-sm">
            <Users
              size={40}
              className="mx-auto text-gray-300"
            />

            <h3 className="mt-4 text-lg font-semibold text-gray-800">
              No users found
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Try changing your search keyword.
            </p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[850px] text-left">
                <thead className="border-b border-gray-200 bg-gray-50">
                  <tr>
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      User
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Phone
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Role
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Status
                    </th>

                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-gray-500">
                      Created
                    </th>

                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map((user, index) => (
                    <tr
                       key={user._id?.toString() || user.email || `user-${index}`}
                      className="transition hover:bg-gray-50"
                    >
                      {/* User */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {user.name || "Unnamed User"}
                          </p>

                          <p className="mt-1 text-sm text-gray-500">
                            {user.email}
                          </p>
                        </div>
                      </td>

                      {/* Phone */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {user.phone || "N/A"}
                      </td>

                      {/* Role */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.role === "admin"
                              ? "bg-purple-100 text-purple-700"
                              : "bg-blue-100 text-blue-700"
                          }`}
                        >
                          {user.role || "user"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                            user.status === "active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {user.status || "inactive"}
                        </span>
                      </td>

                      {/* Created */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "N/A"}
                      </td>

                      {/* Action */}
                      <td className="px-5 py-4 text-right">
                        <button
  onClick={() => handleRoleChange(user)}
  className="rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 transition hover:border-green-300 hover:bg-green-100"
>
  {user.role === "admin"
    ? "Make User"
    : "Make Admin"}
</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <p className="text-sm text-gray-500">
                Showing{" "}
                <span className="font-semibold text-gray-800">
                  {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-800">
                  {totalUsers}
                </span>{" "}
                users
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
          {icon}
        </div>

        <span className="text-2xl font-bold text-gray-900">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-medium text-gray-500">
        {title}
      </p>
    </div>
  );
}