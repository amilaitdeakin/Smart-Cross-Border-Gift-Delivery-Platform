/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  CheckCircle2,
  Clock,
  Package,
  Truck,
  Search,
  Filter,
  X,
  Eye,
  Calendar,
  User,
  Phone,
} from "lucide-react";

export default function AdminOrdersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const trpc = useTRPC();

  const [search, setSearch] = React.useState(searchParams.get("search") || "");
  const [status, setStatus] = React.useState(
    (searchParams.get("status") as any) || undefined,
  );
  const [limit] = React.useState(50);
  const [offset, setOffset] = React.useState(0);

  // Sync state with URL search params (e.g. when clicking sidebar tabs)
  React.useEffect(() => {
    setStatus((searchParams.get("status") as any) || undefined);
    setSearch(searchParams.get("search") || "");
    setOffset(0);
  }, [searchParams]);

  const {
    data: ordersData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    ...trpc.order.getAllOrders.queryOptions({
      status,
      limit,
      offset,
      search: search || undefined,
    }),
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (status) params.set("status", status);
    router.push(`/admin/orders?${params.toString()}`);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus(undefined);
    router.push("/admin/orders");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "processing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3" />;
      case "processing":
        return <Package className="w-3 h-3" />;
      case "out_for_delivery":
        return <Truck className="w-3 h-3" />;
      case "delivered":
        return <CheckCircle2 className="w-3 h-3" />;
      case "cancelled":
        return <X className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const stats = React.useMemo(() => {
    if (!ordersData?.orders) {
      return { total: 0, pending: 0, inTransit: 0, delivered: 0 };
    }
    const orders = ordersData.orders;
    return {
      total: ordersData.total || 0,
      pending: orders.filter((o) => o.status === "pending").length,
      inTransit: orders.filter(
        (o) => o.status === "processing" || o.status === "out_for_delivery",
      ).length,
      delivered: orders.filter((o) => o.status === "delivered").length,
    };
  }, [ordersData]);

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2d1b12]">Orders</h1>
            <p className="text-[#6f5a4d] mt-1">
              Manage all orders and update their tracking status
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-[#eadfd4] shadow-sm">
              <Calendar className="w-4 h-4 text-[#9c8779]" />
              <span className="text-sm text-[#5e4739]">
                {new Date().toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <Button
              onClick={() => refetch()}
              className="bg-[#d96c28] hover:bg-[#c85f20] rounded-xl"
            >
              <Package className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6f5a4d] text-sm font-medium">Total Orders</p>
              <p className="text-3xl font-bold text-[#2d1b12] mt-2">
                {stats.total}
              </p>
              <p className="text-xs text-[#9c8779] mt-1">All time</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-xl">
              <Package className="w-8 h-8 text-blue-500" />
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
              <p className="text-xs text-[#9c8779] mt-1">Awaiting processing</p>
            </div>
            <div className="bg-yellow-50 p-3 rounded-xl">
              <Clock className="w-8 h-8 text-yellow-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6f5a4d] text-sm font-medium">In Transit</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {stats.inTransit}
              </p>
              <p className="text-xs text-[#9c8779] mt-1">On the way</p>
            </div>
            <div className="bg-purple-50 p-3 rounded-xl">
              <Truck className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6f5a4d] text-sm font-medium">Delivered</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {stats.delivered}
              </p>
              <p className="text-xs text-[#9c8779] mt-1">Completed</p>
            </div>
            <div className="bg-green-50 p-3 rounded-xl">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm mb-6">
        <form onSubmit={handleSearch}>
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9c8779]" />
              <input
                type="text"
                placeholder="Search by order number, customer name, or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none bg-[#f6f1eb]/30"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9c8779]" />
                <select
                  value={status || ""}
                  onChange={(e) => setStatus(e.target.value || undefined)}
                  className="pl-10 pr-8 py-3 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none bg-white appearance-none min-w-[160px]"
                >
                  <option value="">All Statuses</option>
                  <option value="pending">🟡 Pending</option>
                  <option value="processing">🔵 Processing</option>
                  <option value="out_for_delivery">🟣 Out for Delivery</option>
                  <option value="delivered">🟢 Delivered</option>
                  <option value="cancelled">🔴 Cancelled</option>
                  <option value="refunded">⚪ Refunded</option>
                </select>
              </div>

              <Button
                type="submit"
                className="bg-[#d96c28] hover:bg-[#c85f20] rounded-xl px-6"
              >
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>

              {(search || status) && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={clearFilters}
                  className="rounded-xl border-[#eadfd4] hover:bg-[#f6f1eb]"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear
                </Button>
              )}
            </div>
          </div>
        </form>

        {/* Active Filters */}
        {(search || status) && (
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-[#eadfd4]">
            {status && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fde8d7] text-[#d96c28] rounded-full text-xs font-medium">
                Status: {status.replace("_", " ")}
                <button
                  onClick={() => setStatus(undefined)}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {search && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#fde8d7] text-[#d96c28] rounded-full text-xs font-medium">
                Search: {search}
                <button
                  onClick={() => setSearch("")}
                  className="hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-16">
            <LoadingSpinner />
          </div>
        ) : isError ? (
          <div className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
            <p className="text-[#6f5a4d]">Failed to load orders</p>
            <Button
              onClick={() => refetch()}
              className="mt-4 bg-[#d96c28] hover:bg-[#c85f20]"
            >
              Try Again
            </Button>
          </div>
        ) : ordersData?.orders.length === 0 ? (
          <div className="p-12 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f1eb]">
              <Package className="w-8 h-8 text-[#9c8779]" />
            </div>
            <p className="text-lg font-semibold text-[#2d1b12]">
              No orders found
            </p>
            <p className="text-[#6f5a4d] text-sm mt-1">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-[#f6f1eb] border-b border-[#eadfd4]">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider rounded-tl-xl">
                    Order #
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#6f5a4d] uppercase tracking-wider rounded-tr-xl">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#eadfd4]">
                {ordersData?.orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-[#f6f1eb]/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="text-[#d96c28] hover:text-[#c85f20] hover:underline"
                      >
                        {order.orderNumber}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#fde8d7]">
                          <User className="w-4 h-4 text-[#d96c28]" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#2d1b12]">
                            {order.receiverName || "Guest"}
                          </div>
                          <div className="text-xs text-[#9c8779] flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {order.receiverPhone || "N/A"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-semibold text-[#d96c28]">
                        $ {Number(order.totalLkr).toLocaleString()}
                      </div>
                      <div className="text-xs text-[#9c8779]">
                        {order.items?.length || 0} items
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${getStatusColor(
                          order.status,
                        )} border px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 w-fit`}
                      >
                        {getStatusIcon(order.status)}
                        {order.status.replace("_", " ")}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className={`${getPaymentStatusColor(
                          order.paymentStatus,
                        )} px-3 py-1.5 rounded-full text-xs font-medium`}
                      >
                        {order.paymentStatus}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#6f5a4d]">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#9c8779]" />
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/orders/${order.id}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#fde8d7] text-[#d96c28] rounded-xl text-sm font-medium hover:bg-[#d96c28] hover:text-white transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
