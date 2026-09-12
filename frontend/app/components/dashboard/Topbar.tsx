"use client";

import { Search, Bell, Menu } from "lucide-react";

interface TopbarProps {
  greeting: string;
  subtitle?: string;
  onMenuToggle: () => void;
  notificationCount?: number;
}

export default function Topbar({
  greeting,
  subtitle,
  onMenuToggle,
  notificationCount = 0,
}: TopbarProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuToggle}
          className="rounded-xl p-2.5 text-gray-500 hover:bg-gray-100 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{greeting}</h1>
          {subtitle && (
            <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative flex-1 sm:flex-none">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-700 outline-none transition-all focus:border-primary/40 focus:ring-2 focus:ring-primary/10 sm:w-64"
          />
        </div>

        {/* Notification Bell */}
        <button className="relative rounded-xl border border-gray-200 bg-white p-2.5 text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-700">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1 text-[10px] font-bold text-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* Avatar */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white shadow-md shadow-primary/20 cursor-pointer">
          PS
        </div>
      </div>
    </header>
  );
}
