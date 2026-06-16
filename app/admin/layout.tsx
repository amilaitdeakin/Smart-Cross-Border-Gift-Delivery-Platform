import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">Order Management</p>
        </div>

        <nav className="space-y-1 px-4">
          <Link
            href="/admin"
            className="block px-4 py-2 text-sm font-medium text-gray-700 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            All Orders
          </Link>
          <Link
            href="/admin/orders?status=pending"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            Pending Orders
          </Link>
          <Link
            href="/admin/orders?status=processing"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            Processing
          </Link>
          <Link
            href="/admin/orders?status=out_for_delivery"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            Out for Delivery
          </Link>
          <Link
            href="/admin/orders?status=delivered"
            className="block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition"
          >
            Delivered
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
