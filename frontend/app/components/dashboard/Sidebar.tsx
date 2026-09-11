"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sparkles,
  LogOut,
  X,
} from "lucide-react";

export interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: number;
}

interface SidebarProps {
  navItems: NavItem[];
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({
  navItems,
  mobileOpen,
  onMobileClose,
}: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 flex h-full w-64 flex-col bg-sidebar text-white transition-transform duration-300 lg:relative lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex shrink-0 items-center justify-between px-6 py-6">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-bg shadow-lg shadow-primary/30">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <span className="text-lg font-bold">
                <span className="text-white">Aura</span>
                <span className="text-primary-light">Gen</span>
              </span>
              <p className="text-[10px] text-gray-500 leading-tight">
                Self-Healing UI
              </p>
            </div>
          </Link>
          <button
            onClick={onMobileClose}
            className="rounded-lg p-1.5 text-gray-500 hover:bg-sidebar-hover hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav Items — flex-1 + overflow for independent scrolling */}
        <nav className="mt-2 flex-1 space-y-1 overflow-y-auto px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/dashboard"
                ? pathname === "/dashboard"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/30"
                    : "text-gray-400 hover:bg-sidebar-hover hover:text-white"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 flex-shrink-0 ${
                    isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-gray-300"
                  }`}
                />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-danger px-1.5 text-[10px] font-bold text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* User Profile — fixed to bottom */}
        <div className="shrink-0 border-t border-white/5 px-4 py-4">
          <div className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition hover:bg-sidebar-hover">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-light text-sm font-bold text-white">
              PS
            </div>
            <div className="flex-1 min-w-0">
              <p className="truncate text-sm font-medium text-white">
                Pratham S.
              </p>
              <p className="truncate text-xs text-gray-500">
                pratham@auragen.io
              </p>
            </div>
            <LogOut className="h-4 w-4 flex-shrink-0 text-gray-600 hover:text-gray-400 cursor-pointer" />
          </div>
        </div>
      </aside>
    </>
  );
}
