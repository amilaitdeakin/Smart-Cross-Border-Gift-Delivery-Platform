// app/admin/orders/[id]/page.tsx
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
  User,
  Truck,
  CreditCard,
  Calendar,
  DollarSign,
  Edit,
  Save,
  X,
  ShoppingBag,
  Heart,
  Gift,
  Send,
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

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    ...trpc.order.getOrderById.queryOptions({ orderId }),
    enabled: !!orderId,
  });

  const updateOrderStatusMutation = useMutation({
    ...trpc.order.updateOrderStatus.mutationOptions(),
    onSuccess: async () => {
      toast.success("✅ Order status updated successfully");
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
      toast.success("✅ Payment status updated successfully");
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
      toast.success("✅ Delivery status updated successfully");
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
      case "refunded":
        return <ArrowLeft className="w-3 h-3" />;
      default:
        return null;
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      case "refunded":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDeliveryStatusColor = (status: string) => {
    switch (status) {
      case "assigned":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "picked_up":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "in_transit":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "out_for_delivery":
        return "bg-cyan-100 text-cyan-800 border-cyan-200";
      case "delivered":
        return "bg-green-100 text-green-800 border-green-200";
      case "failed":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-16">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !order) {
    return (
      <div className="p-8">
        <Link
          href="/admin/orders"
          className="inline-flex items-center text-[#d96c28] hover:text-[#c85f20] mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Orders
        </Link>
        <div className="p-12 text-center bg-white rounded-2xl border border-[#eadfd4]">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4 opacity-50" />
          <p className="text-[#6f5a4d]">Failed to load order details</p>
          <Button
            onClick={() => refetch()}
            className="mt-4 bg-[#d96c28] hover:bg-[#c85f20]"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Back Button */}
      <Link
        href="/admin/orders"
        className="inline-flex items-center text-[#d96c28] hover:text-[#c85f20] mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Orders
      </Link>

      <div className="space-y-6">
        {/* Order Header */}
        <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="bg-[#fde8d7] p-2 rounded-xl">
                  <ShoppingBag className="w-6 h-6 text-[#d96c28]" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#2d1b12]">
                    {order.orderNumber}
                  </h1>
                  <p className="text-[#6f5a4d] mt-0.5 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(order.createdAt).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                    at{" "}
                    {new Date(order.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                className={`${getStatusColor(
                  order.status,
                )} border px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5`}
              >
                {getStatusIcon(order.status)}
                {order.status.replace("_", " ")}
              </Badge>
              <Badge
                className={`${getPaymentStatusColor(
                  order.paymentStatus,
                )} border px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5`}
              >
                <CreditCard className="w-3 h-3" />
                {order.paymentStatus}
              </Badge>
              {order.delivery && (
                <Badge
                  className={`${getDeliveryStatusColor(
                    order.delivery.status,
                  )} border px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5`}
                >
                  <Truck className="w-3 h-3" />
                  {order.delivery.status.replace("_", " ")}
                </Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Sender & Receiver Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sender */}
              <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-blue-50 p-2 rounded-xl">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#2d1b12]">
                    Sender Information
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[#9c8779] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9c8779]">Name</p>
                      <p className="font-medium text-[#2d1b12]">
                        {order.senderName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-[#9c8779] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9c8779]">Email</p>
                      <p className="font-medium text-[#2d1b12]">
                        {order.senderEmail}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#9c8779] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9c8779]">Phone</p>
                      <p className="font-medium text-[#2d1b12]">
                        {order.senderPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Receiver */}
              <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-green-50 p-2 rounded-xl">
                    <Heart className="w-5 h-5 text-green-600" />
                  </div>
                  <h2 className="text-lg font-semibold text-[#2d1b12]">
                    Recipient Information
                  </h2>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-[#9c8779] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9c8779]">Name</p>
                      <p className="font-medium text-[#2d1b12]">
                        {order.receiverName}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-[#9c8779] mt-0.5" />
                    <div>
                      <p className="text-xs text-[#9c8779]">Phone</p>
                      <p className="font-medium text-[#2d1b12]">
                        {order.receiverPhone}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-purple-50 p-2 rounded-xl">
                  <MapPin className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-[#2d1b12]">
                  Delivery Address
                </h2>
              </div>
              {order.deliveryAddress ? (
                <div className="space-y-1 text-[#2d1b12]">
                  <p className="font-medium">
                    {order.deliveryAddress.addressLine1}
                  </p>
                  {order.deliveryAddress.addressLine2 && (
                    <p>{order.deliveryAddress.addressLine2}</p>
                  )}
                  <p>
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}{" "}
                    {order.deliveryAddress.postalCode}
                  </p>
                  <p>{order.deliveryAddress.country}</p>
                </div>
              ) : (
                <p className="text-[#9c8779]">No address information</p>
              )}
            </div>

            {/* Gift Message */}
            {order.giftMessage && (
              <div className="bg-[#fde8d7] p-6 rounded-2xl border border-[#eadfd4]">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="w-5 h-5 text-[#d96c28]" />
                  <h2 className="text-lg font-semibold text-[#2d1b12]">
                    Gift Message
                  </h2>
                </div>
                <p className="text-[#2d1b12] italic leading-relaxed">
                  {order.giftMessage}
                </p>
              </div>
            )}

            {/* Order Items */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-orange-50 p-2 rounded-xl">
                  <Package className="w-5 h-5 text-[#d96c28]" />
                </div>
                <h2 className="text-lg font-semibold text-[#2d1b12]">
                  Order Items
                </h2>
              </div>
              <div className="space-y-3">
                {order.items && order.items.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center p-4 bg-[#f6f1eb] rounded-xl border border-[#eadfd4]"
                    >
                      <div>
                        <p className="font-medium text-[#2d1b12]">
                          {item.giftId}
                        </p>
                        <p className="text-sm text-[#6f5a4d]">
                          Quantity: {item.quantity}
                        </p>
                      </div>
                      <p className="font-semibold text-[#d96c28]">
                        ${Number(item.priceAud).toFixed(2)}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-[#9c8779]">No items</p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Status Updates */}
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-yellow-50 p-2 rounded-xl">
                  <Edit className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#2d1b12]">
                  Update Order Status
                </h3>
              </div>
              <select
                value={orderStatus}
                onChange={(e) => setOrderStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none bg-white mb-3"
              >
                <option value="pending">🟡 Pending</option>
                <option value="processing">🔵 Processing</option>
                <option value="out_for_delivery">🟣 Out for Delivery</option>
                <option value="delivered">🟢 Delivered</option>
                <option value="cancelled">🔴 Cancelled</option>
                <option value="refunded">⚪ Refunded</option>
              </select>
              <textarea
                placeholder="Add notes (optional)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none mb-3 text-sm bg-[#f6f1eb]/30"
                rows={2}
              />
              <Button
                onClick={handleUpdateOrderStatus}
                disabled={isUpdating || orderStatus === order.status}
                className="w-full bg-[#d96c28] hover:bg-[#c85f20] text-white py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {isUpdating ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Status
                  </>
                )}
              </Button>
            </div>

            {/* Payment Status */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-green-50 p-2 rounded-xl">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-[#2d1b12]">
                  Payment Status
                </h3>
              </div>
              <div className="mb-3">
                <Badge
                  className={`${getPaymentStatusColor(
                    order.paymentStatus,
                  )} border px-3 py-1.5 rounded-full text-sm font-medium`}
                >
                  Current: {order.paymentStatus}
                </Badge>
              </div>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none bg-white mb-3"
              >
                <option value="pending">🟡 Pending</option>
                <option value="completed">🟢 Completed</option>
                <option value="failed">🔴 Failed</option>
                <option value="refunded">⚪ Refunded</option>
              </select>
              <Button
                onClick={handleUpdatePaymentStatus}
                disabled={isUpdating || paymentStatus === order.paymentStatus}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-xl transition disabled:opacity-50"
              >
                {isUpdating ? (
                  <>
                    <LoadingSpinner className="w-4 h-4 mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Update Payment
                  </>
                )}
              </Button>
            </div>

            {/* Delivery Status */}
            {order.delivery && (
              <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="bg-purple-50 p-2 rounded-xl">
                    <Truck className="w-5 h-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2d1b12]">
                    Delivery Status
                  </h3>
                </div>
                <div className="mb-3">
                  <Badge
                    className={`${getDeliveryStatusColor(
                      order.delivery.status,
                    )} border px-3 py-1.5 rounded-full text-sm font-medium`}
                  >
                    Current: {order.delivery.status.replace("_", " ")}
                  </Badge>
                </div>
                <select
                  value={deliveryStatus}
                  onChange={(e) => setDeliveryStatus(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none bg-white mb-3"
                >
                  <option value="assigned">📋 Assigned</option>
                  <option value="picked_up">📦 Picked Up</option>
                  <option value="in_transit">🚚 In Transit</option>
                  <option value="out_for_delivery">🚛 Out for Delivery</option>
                  <option value="delivered">✅ Delivered</option>
                  <option value="failed">❌ Failed</option>
                </select>
                <textarea
                  placeholder="Add delivery notes (optional)"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 border border-[#eadfd4] rounded-xl focus:ring-2 focus:ring-[#d96c28] focus:border-transparent outline-none mb-3 text-sm bg-[#f6f1eb]/30"
                  rows={2}
                />
                <Button
                  onClick={handleUpdateDeliveryStatus}
                  disabled={
                    isUpdating || deliveryStatus === order.delivery.status
                  }
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2.5 rounded-xl transition disabled:opacity-50"
                >
                  {isUpdating ? (
                    <>
                      <LoadingSpinner className="w-4 h-4 mr-2" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Update Delivery
                    </>
                  )}
                </Button>
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white p-6 rounded-2xl border border-[#eadfd4] shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#fde8d7] p-2 rounded-xl">
                  <DollarSign className="w-5 h-5 text-[#d96c28]" />
                </div>
                <h3 className="text-lg font-semibold text-[#2d1b12]">
                  Order Summary
                </h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f5a4d]">Subtotal</span>
                  <span className="font-medium text-[#2d1b12]">
                    ${Number(order.subtotalAud).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f5a4d]">Delivery Fee</span>
                  <span className="font-medium text-[#2d1b12]">
                    ${Number(order.deliveryFeeAud).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f5a4d]">Tax</span>
                  <span className="font-medium text-[#2d1b12]">
                    ${Number(order.taxAud).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-[#eadfd4] pt-3 flex justify-between">
                  <span className="font-semibold text-[#2d1b12]">Total</span>
                  <span className="text-xl font-bold text-[#d96c28]">
                    ${Number(order.totalAud).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
