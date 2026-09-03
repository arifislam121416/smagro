"use client";

import {
  Menu,
  Bell,
  Search,
} from "lucide-react";

export default function AdminHeader({
  onMenuClick,
  user,
}) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-4 backdrop-blur md:px-8">
      {/* Left */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="rounded-xl p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
        >
          <Menu size={24} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-gray-900 md:text-xl">
            Admin Dashboard
          </h2>

          <p className="hidden text-sm text-gray-500 sm:block">
            Manage your SMAGRO store
          </p>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 md:gap-4">
        <button className="hidden rounded-xl border border-gray-200 p-2.5 text-gray-500 transition hover:bg-gray-50 md:block">
          <Search size={19} />
        </button>

        <button className="relative rounded-xl border border-gray-200 p-2.5 text-gray-500 transition hover:bg-gray-50">
          <Bell size={19} />

          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="hidden h-8 w-px bg-gray-200 md:block" />

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 text-sm font-bold text-green-700">
            {user?.name?.charAt(0)?.toUpperCase() || "A"}
          </div>

          <div className="hidden lg:block">
            <p className="max-w-32 truncate text-sm font-bold text-gray-900">
              {user?.name || "Admin"}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}