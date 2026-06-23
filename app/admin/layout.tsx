// app/admin/layout.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  XCircle,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Gift,
  BarChart3,
  ShoppingBag,
} from "lucide-react";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: LayoutDashboard,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    href: "/admin/orders",
    label: "All Orders",
    icon: Package,
    color: "text-gray-600",
    bgColor: "bg-gray-50",
  },
  {
    href: "/admin/orders?status=pending",
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    href: "/admin/orders?status=processing",
    label: "Processing",
    icon: Truck,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    href: "/admin/orders?status=out_for_delivery",
    label: "Out for Delivery",
    icon: Truck,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
  },
  {
    href: "/admin/orders?status=delivered",
    label: "Delivered",
    icon: CheckCircle2,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    href: "/admin/orders?status=cancelled",
    label: "Cancelled",
    icon: XCircle,
    color: "text-red-600",
    bgColor: "bg-red-50",
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href.includes("?")) {
      return pathname + "?" + href.split("?")[1] === href;
    }
    return pathname === href;
  };

  return (
    <div className="flex min-h-screen bg-[#f6f1eb]">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-xl shadow-lg border border-[#eadfd4]"
      >
        {isSidebarOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 z-40 h-screen w-72 bg-white border-r border-[#eadfd4] shadow-sm transition-transform duration-300",
          isSidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand */}
        <div className="p-6 border-b border-[#eadfd4]">
          <div className="flex items-center gap-3">
            <div className="bg-[#fde8d7] p-2 rounded-xl">
              <Gift className="w-6 h-6 text-[#d96c28]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#2d1b12]">Admin Panel</h1>
              <p className="text-sm text-[#6f5a4d]">Order Management</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-180px)]">
          {navItems.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                  active
                    ? "bg-[#fde8d7] text-[#d96c28] shadow-sm"
                    : "text-[#5e4739] hover:bg-[#f6f1eb] hover:text-[#2d1b12]",
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-colors",
                    active
                      ? "text-[#d96c28]"
                      : "text-[#9c8779] group-hover:text-[#d96c28]",
                  )}
                />
                <span>{item.label}</span>
                {active && (
                  <span className="ml-auto w-1.5 h-8 bg-[#d96c28] rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#eadfd4] bg-white/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-[#f6f1eb] transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-[#fde8d7] flex items-center justify-center">
              <Users className="w-5 h-5 text-[#d96c28]" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-[#2d1b12]">Admin User</p>
              <p className="text-xs text-[#9c8779]">admin@worldwish.com</p>
            </div>
            <LogOut className="w-4 h-4 text-[#9c8779] hover:text-red-500 transition-colors" />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-8 overflow-x-hidden">
        <div className="max-w-7xl mx-auto">{children}</div>
      </main>
    </div>
  );
}
