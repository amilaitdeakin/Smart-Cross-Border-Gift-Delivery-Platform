"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Clock,
  MapPin,
  Package,
  Phone,
  Mail,
} from "lucide-react";

export default function OrderDetailPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;
  const trpc = useTRPC();

  const [orderStatus, setOrderStatus] = React.useState<string>("");
  const [paymentStatus, setPaymentStatus] = React.useState<string>("");
  const [deliveryStatus, setDeliveryStatus] = React.useState<string>("");
  const [notes, setNotes] = React.useState<string>("");
  const [isUpdating, setIsUpdating] = React.useState(false);

  const { data: order, isLoading, isError, refetch } = useQuery({
    ...trpc.order.getOrderById.queryOptions({ orderId }),
    enabled: !!orderId,
  });

  const updateOrderStatusMutation = useMutation({
    ...trpc.order.updateOrderStatus.mutationOptions(),
    onSuccess: async () => {
      toast.success("Order status updated successfully");
      await refetch();
      setNotes("");
      setIsUpdating(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update order status");
      setIsUpdating(false);
    },
  });

  const updatePaymentStatusMutation = useMutation({
    ...trpc.order.updatePaymentStatus.mutationOptions(),
    onSuccess: async () => {
      toast.success("Payment status updated successfully");
      await refetch();
      setIsUpdating(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update payment status");
      setIsUpdating(false);
    },
  });

  const updateDeliveryStatusMutation = useMutation({
    ...trpc.order.updateDeliveryStatus.mutationOptions(),
    onSuccess: async () => {
      toast.success("Delivery status updated successfully");
      await refetch();
      setNotes("");
      setIsUpdating(false);
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to update delivery status");
      setIsUpdating(false);
    },
  });

  React.useEffect(() => {
    if (order) {
      setOrderStatus(order.status);
      setPaymentStatus(order.paymentStatus);
      setDeliveryStatus(order.delivery?.status || "assigned");
    }
  }, [order]);

  const handleUpdateOrderStatus = async () => {
    if (!order || !orderStatus) return;
    setIsUpdating(true);
    updateOrderStatusMutation.mutate({
      orderId: order.id,
      status: orderStatus as any,
      notes: notes || undefined,
    });
  };

  const handleUpdatePaymentStatus = async () => {
    if (!order || !paymentStatus) return;
    setIsUpdating(true);
    updatePaymentStatusMutation.mutate({
      orderId: order.id,
      paymentStatus: paymentStatus as any,
    });
  };

  const handleUpdateDeliveryStatus = async () => {
    if (!order || !deliveryStatus) return;
    setIsUpdating(true);
    updateDeliveryStatusMutation.mutate({
      orderId: order.id,
      deliveryStatus: deliveryStatus as any,
      notes: notes || undefined,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "out_for_delivery":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800";
      case "picked_up":
        return "bg-indigo-100 text-indigo-800";
      case "in_transit":
        return "bg-purple-100 text-purple-800";
      case "out_for_delivery":
        return "bg-cyan-100 text-cyan-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-8">
      {/* Back Button */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </Link>

      {isLoading ? (
        <div className="flex items-center justify-center p-12">
          <LoadingSpinner />
        </div>
      ) : isError || !order ? (
        <div className="p-8 text-center bg-white rounded-lg border border-gray-200">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
          <p className="text-gray-600">Failed to load order details</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Order Header */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {order.orderNumber}
                </h1>
                <p className="text-gray-600 mt-1">
                  Created {new Date(order.createdAt).toLocaleDateString()} at{" "}
                  {new Date(order.createdAt).toLocaleTimeString()}
                </p>
              </div>
              <div className="space-y-2">
                <Badge className={getStatusColor(order.status)}>
                  {order.status.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Sender & Receiver Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Sender */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Sender Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-gray-500 mt-1">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {order.senderName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-gray-500 mt-1">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Email</p>
                      <p className="font-medium text-gray-900">
                        {order.senderEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-gray-500 mt-1">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">
                        {order.senderPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Recipient Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="text-gray-500 mt-1">
                      <Package className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Name</p>
                      <p className="font-medium text-gray-900">
                        {order.receiverName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-gray-500 mt-1">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Phone</p>
                      <p className="font-medium text-gray-900">
                        {order.receiverPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Delivery Address
                </h2>
                {order.deliveryAddress ? (
                  <div className="space-y-2 text-gray-900">
                    <p className="font-medium">
                      {order.deliveryAddress.addressLine1}
                    </p>
                    {order.deliveryAddress.addressLine2 && (
                      <p>{order.deliveryAddress.addressLine2}</p>
                    )}
                    <p>
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state}
                    </p>
                    <p>{order.deliveryAddress.postalCode}</p>
                    <p>{order.deliveryAddress.country}</p>
                  </div>
                ) : (
                  <p className="text-gray-600">No address information</p>
                )}
              </div>

              {/* Order Items */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Items
                </h2>
                <div className="space-y-3">
                  {order.items && order.items.length > 0 ? (
                    order.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between items-center p-3 bg-gray-50 rounded border border-gray-100"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {item.giftId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="font-medium text-gray-900">
                          ${Number(item.priceAud).toFixed(2)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-600">No items</p>
                  )}
                </div>
              </div>
            </div>

            {/* Status Update Panel */}
            <div className="space-y-6">
              {/* Order Status */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Update Order Status
                </h3>
                <select
                  value={orderStatus}
                  onChange={(e) => setOrderStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white mb-4"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="refunded">Refunded</option>
                </select>
                <textarea
                  placeholder="Add notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3 text-sm"
                  rows={2}
                />
                <Button
                  onClick={handleUpdateOrderStatus}
                  disabled={isUpdating || orderStatus === order.status}
                  className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Status"}
                </Button>
              </div>

              {/* Payment Status */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Update Payment Status
                </h3>
                <div className="mb-4">
                  <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                    Current: {order.paymentStatus}
                  </Badge>
                </div>
                <select
                  value={paymentStatus}
                  onChange={(e) => setPaymentStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white mb-4"
                >
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                </select>
                <Button
                  onClick={handleUpdatePaymentStatus}
                  disabled={isUpdating || paymentStatus === order.paymentStatus}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
                >
                  {isUpdating ? "Updating..." : "Update Payment"}
                </Button>
              </div>

              {/* Delivery Status */}
              {order.delivery && (
                <div className="bg-white p-6 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Update Delivery Status
                  </h3>
                  <div className="mb-4">
                    <Badge
                      className={getDeliveryStatusColor(
                        order.delivery.status
                      )}
                    >
                      Current: {order.delivery.status.replace("_", " ")}
                    </Badge>
                  </div>
                  <select
                    value={deliveryStatus}
                    onChange={(e) => setDeliveryStatus(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white mb-4"
                  >
                    <option value="assigned">Assigned</option>
                    <option value="picked_up">Picked Up</option>
                    <option value="in_transit">In Transit</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="failed">Failed</option>
                  </select>
                  <textarea
                    placeholder="Add delivery notes (optional)"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none mb-3 text-sm"
                    rows={2}
                  />
                  <Button
                    onClick={handleUpdateDeliveryStatus}
                    disabled={
                      isUpdating ||
                      deliveryStatus === order.delivery.status
                    }
                    className="w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition disabled:opacity-50"
                  >
                    {isUpdating ? "Updating..." : "Update Delivery"}
                  </Button>
                </div>
              )}

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium text-gray-900">
                      ${Number(order.subtotalAud).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium text-gray-900">
                      ${Number(order.deliveryFeeAud).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium text-gray-900">
                      ${Number(order.taxAud).toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t pt-2 flex justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg text-gray-900">
                      ${Number(order.totalAud).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
