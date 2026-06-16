"use client";

import React from "react";
import Link from "next/link";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
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
        delivered: 0,
        failed: 0,
        totalRevenue: 0,
      };
    }

    const orders = ordersData.orders;
    return {
      total: orders.length,
      pending: orders.filter((o) => o.status === "pending").length,
      processing: orders.filter((o) =>
        ["processing", "out_for_delivery"].includes(o.status)
      ).length,
      delivered: orders.filter((o) => o.status === "delivered").length,
      failed: orders.filter((o) =>
        ["cancelled", "refunded"].includes(o.status)
      ).length,
      totalRevenue: orders.reduce(
        (sum, o) => sum + Number(o.totalAud),
        0
      ),
    };
  }, [ordersData?.orders]);

  // Chart data
  const statusChartData = [
    { name: "Pending", value: stats.pending, fill: "#FCD34D" },
    { name: "Processing", value: stats.processing, fill: "#A78BFA" },
    { name: "Delivered", value: stats.delivered, fill: "#10B981" },
    { name: "Failed/Cancelled", value: stats.failed, fill: "#EF4444" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your order overview.</p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.total}
                  </p>
                </div>
                <Package className="w-12 h-12 text-blue-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600 mt-2">
                    {stats.pending}
                  </p>
                </div>
                <Clock className="w-12 h-12 text-yellow-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">In Progress</p>
                  <p className="text-3xl font-bold text-purple-600 mt-2">
                    {stats.processing}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-purple-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Delivered</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.delivered}
                  </p>
                </div>
                <CheckCircle2 className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Revenue</p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    ${stats.totalRevenue.toFixed(0)}
                  </p>
                </div>
                <TrendingUp className="w-12 h-12 text-green-500 opacity-20" />
              </div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Status Distribution */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Status Distribution
              </h2>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Key Metrics */}
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Key Metrics
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Completion Rate</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {stats.total > 0
                      ? Math.round((stats.delivered / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-yellow-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Average Order Value</span>
                  <span className="text-2xl font-bold text-yellow-600">
                    $
                    {stats.total > 0
                      ? (stats.totalRevenue / stats.total).toFixed(2)
                      : 0}
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-purple-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Processing Rate</span>
                  <span className="text-2xl font-bold text-purple-600">
                    {stats.total > 0
                      ? Math.round((stats.processing / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-red-50 rounded-lg">
                  <span className="text-gray-700 font-medium">Failure Rate</span>
                  <span className="text-2xl font-bold text-red-600">
                    {stats.total > 0
                      ? Math.round((stats.failed / stats.total) * 100)
                      : 0}
                    %
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Link
                href="/admin/orders"
                className="p-4 text-center bg-blue-50 hover:bg-blue-100 rounded-lg transition border border-blue-200"
              >
                <p className="font-medium text-blue-900">View All Orders</p>
                <p className="text-sm text-blue-700 mt-1">
                  {stats.total} total orders
                </p>
              </Link>
              <Link
                href="/admin/orders?status=pending"
                className="p-4 text-center bg-yellow-50 hover:bg-yellow-100 rounded-lg transition border border-yellow-200"
              >
                <p className="font-medium text-yellow-900">Pending Orders</p>
                <p className="text-sm text-yellow-700 mt-1">
                  {stats.pending} pending
                </p>
              </Link>
              <Link
                href="/admin/orders?status=out_for_delivery"
                className="p-4 text-center bg-purple-50 hover:bg-purple-100 rounded-lg transition border border-purple-200"
              >
                <p className="font-medium text-purple-900">In Transit</p>
                <p className="text-sm text-purple-700 mt-1">
                  {stats.processing} orders
                </p>
              </Link>
              <Link
                href="/admin/orders?status=delivered"
                className="p-4 text-center bg-green-50 hover:bg-green-100 rounded-lg transition border border-green-200"
              >
                <p className="font-medium text-green-900">Delivered Orders</p>
                <p className="text-sm text-green-700 mt-1">
                  {stats.delivered} delivered
                </p>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
