// app/admin/page.tsx
"use client";

import React from "react";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import {
  Package,
  Clock,
  CheckCircle2,
  Truck,
  DollarSign,
  Calendar,
  ArrowUp,
  ArrowDown,
  ShoppingBag,
} from "lucide-react";

export default function AdminDashboard() {
  const trpc = useTRPC();
  const { data: ordersData, isLoading } = useQuery({
    ...trpc.order.getAllOrders.queryOptions({
      limit: 1000,
    }),
  });

  // Calculate statistics
  const stats = React.useMemo(() => {
    if (!ordersData?.orders) {
      return {
        total: 0,
        pending: 0,
        processing: 0,
        outForDelivery: 0,
        delivered: 0,
        cancelled: 0,
        refunded: 0,
        totalRevenue: 0,
        averageOrderValue: 0,
      };
    }

    const orders = ordersData.orders;
    const totalRevenue = orders.reduce((sum, o) => sum + Number(o.totalAud), 0);

    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) => o.status === "processing").length,
      outForDelivery: orders.filter((o) => o.status === "out_for_delivery")
        .length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      cancelled: orders.filter((o) => o.status === "cancelled").length,
      refunded: orders.filter((o) => o.status === "refunded").length,
      totalRevenue,
      averageOrderValue: orders.length > 0 ? totalRevenue / orders.length : 0,
    };
  }, [ordersData?.orders]);

  // Chart data
  const statusChartData = [
    { name: "Pending", value: stats.pending, color: "#F59E0B" },
    { name: "Processing", value: stats.processing, color: "#8B5CF6" },
    { name: "Out for Delivery", value: stats.outForDelivery, color: "#6366F1" },
    { name: "Delivered", value: stats.delivered, color: "#10B981" },
    { name: "Cancelled", value: stats.cancelled, color: "#EF4444" },
    { name: "Refunded", value: stats.refunded, color: "#F472B6" },
  ];

  const recentOrders = ordersData?.orders?.slice(0, 5) || [];

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    processing: "bg-purple-100 text-purple-800",
    out_for_delivery: "bg-indigo-100 text-indigo-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    refunded: "bg-pink-100 text-pink-800",
  };

  const statusLabels: Record<string, string> = {
    pending: "Pending",
    processing: "Processing",
    out_for_delivery: "Out for Delivery",
    delivered: "Delivered",
    cancelled: "Cancelled",
    refunded: "Refunded",
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#2d1b12]">Dashboard</h1>
            <p className="text-[#6f5a4d] mt-1">
              {`Welcome back! Here's your order overview.`}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#eadfd4] shadow-sm">
              <Calendar className="w-4 h-4 text-[#9c8779]" />
              <span className="text-sm text-[#5e4739]">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6f5a4d] text-sm font-medium">
                    Total Orders
                  </p>
                  <p className="text-3xl font-bold text-[#2d1b12] mt-2">
                    {stats.total}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                    <ArrowUp className="w-3 h-3" />
                    <span>12% increase</span>
                  </div>
                </div>
                <div className="bg-blue-50 p-3 rounded-xl">
                  <Package className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6f5a4d] text-sm font-medium">Revenue</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    ${stats.totalRevenue.toFixed(0)}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-green-600">
                    <ArrowUp className="w-3 h-3" />
                    <span>8% increase</span>
                  </div>
                </div>
                <div className="bg-green-50 p-3 rounded-xl">
                  <DollarSign className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6f5a4d] text-sm font-medium">
                    Avg Order Value
                  </p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    ${stats.averageOrderValue.toFixed(2)}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-purple-600">
                    <ArrowUp className="w-3 h-3" />
                    <span>5% increase</span>
                  </div>
                </div>
                <div className="bg-purple-50 p-3 rounded-xl">
                  <ShoppingBag className="w-8 h-8 text-purple-500" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#6f5a4d] text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {stats.pending}
                  </p>
                  <div className="flex items-center gap-1 mt-1 text-xs text-red-600">
                    <ArrowDown className="w-3 h-3" />
                    <span>3 orders waiting</span>
                  </div>
                </div>
                <div className="bg-yellow-50 p-3 rounded-xl">
                  <Clock className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Status Distribution */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <h2 className="text-lg font-semibold text-[#2d1b12] mb-4">
                Order Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData.filter((d) => d.value > 0)}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={90}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusChartData
                      .filter((d) => d.value > 0)
                      .map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #eadfd4",
                      borderRadius: "12px",
                      padding: "8px 12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <h2 className="text-lg font-semibold text-[#2d1b12] mb-4">
                Key Metrics
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-xl">
                  <span className="text-[#5e4739] font-medium">
                    Completion Rate
                  </span>
                  <span className="text-2xl font-bold text-blue-600">
                    {stats.total > 0
                      ? Math.round(
                          ((stats.delivered + stats.outForDelivery) /
                            stats.total) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-50 rounded-xl">
                  <span className="text-[#5e4739] font-medium">
                    Delivery Success Rate
                  </span>
                  <span className="text-2xl font-bold text-green-600">
                    {stats.total > 0
                      ? Math.round((stats.delivered / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-xl">
                  <span className="text-[#5e4739] font-medium">
                    Processing Rate
                  </span>
                  <span className="text-2xl font-bold text-yellow-600">
                    {stats.total > 0
                      ? Math.round(
                          ((stats.processing + stats.outForDelivery) /
                            stats.total) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-xl">
                  <span className="text-[#5e4739] font-medium">
                    Failure Rate
                  </span>
                  <span className="text-2xl font-bold text-red-600">
                    {stats.total > 0
                      ? Math.round(
                          ((stats.cancelled + stats.refunded) / stats.total) *
                            100,
                        )
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-[#2d1b12]">
                Recent Orders
              </h2>
              <Link
                href="/admin/orders"
                className="text-sm text-[#d96c28] hover:text-[#c85f20] font-medium"
              >
                View All →
              </Link>
            </div>
            {recentOrders.length === 0 ? (
              <p className="text-center text-[#9c8779] py-8">No orders found</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-xs font-medium text-[#9c8779] uppercase tracking-wider">
                      <th className="px-4 py-3 bg-[#f6f1eb] rounded-l-xl">
                        Order ID
                      </th>
                      <th className="px-4 py-3 bg-[#f6f1eb]">Customer</th>
                      <th className="px-4 py-3 bg-[#f6f1eb]">Date</th>
                      <th className="px-4 py-3 bg-[#f6f1eb]">Total</th>
                      <th className="px-4 py-3 bg-[#f6f1eb] rounded-r-xl">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#eadfd4]">
                    {recentOrders.map((order) => (
                      <tr
                        key={order.id}
                        className="hover:bg-[#f6f1eb] transition"
                      >
                        <td className="px-4 py-3 text-sm font-medium text-[#2d1b12]">
                          #{order.id.slice(0, 8).toUpperCase()}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#5e4739]">
                          {order.senderName || "Guest"}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#5e4739]">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm font-semibold text-[#d96c28]">
                          ${Number(order.totalAud).toFixed(2)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              statusColors[order.status] ||
                              "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {statusLabels[order.status] || order.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
            <h2 className="text-lg font-semibold text-[#2d1b12] mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link
                href="/admin/orders"
                className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-xl transition border border-blue-200 group"
              >
                <Package className="w-8 h-8 mx-auto text-blue-600 mb-2 group-hover:scale-110 transition" />
                <p className="font-medium text-blue-900">All Orders</p>
                <p className="text-sm text-blue-700 mt-1">
                  {stats.total} total
                </p>
              </Link>
              <Link
                href="/admin/orders?status=pending"
                className="p-4 text-center bg-yellow-50 hover:bg-yellow-100 rounded-xl transition border border-yellow-200 group"
              >
                <Clock className="w-8 h-8 mx-auto text-yellow-600 mb-2 group-hover:scale-110 transition" />
                <p className="font-medium text-yellow-900">Pending</p>
                <p className="text-sm text-yellow-700 mt-1">
                  {stats.pending} orders
                </p>
              </Link>
              <Link
                href="/admin/orders?status=out_for_delivery"
                className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-xl transition border border-purple-200 group"
              >
                <Truck className="w-8 h-8 mx-auto text-purple-600 mb-2 group-hover:scale-110 transition" />
                <p className="font-medium text-purple-900">In Transit</p>
                <p className="text-sm text-purple-700 mt-1">
                  {stats.outForDelivery} orders
                </p>
              </Link>
              <Link
                href="/admin/orders?status=delivered"
                className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-xl transition border border-green-200 group"
              >
                <CheckCircle2 className="w-8 h-8 mx-auto text-green-600 mb-2 group-hover:scale-110 transition" />
                <p className="font-medium text-green-900">Delivered</p>
                <p className="text-sm text-green-700 mt-1">
                  {stats.delivered} orders
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
