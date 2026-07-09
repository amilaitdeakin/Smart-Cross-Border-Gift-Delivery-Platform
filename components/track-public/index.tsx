"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { useSearchParams } from "next/navigation";
import { useTRPC } from "@/trpc/client";
import { AlertCircle, Check, Gift, Globe, Loader2, Plane, Truck } from "lucide-react";
import Image from "next/image";

const OrderTrackingPage = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchCode, setSearchCode] = useState("");
  
  const trpc = useTRPC();
  const { data: order, isLoading, error } = useQuery({
    ...trpc.order.trackOrder.queryOptions({ code: searchCode }),
    enabled: !!searchCode,
  });


  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams?.get("code");
    if (code) {
      setSearchInput(code);
      setSearchCode(code);
    }
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchCode(searchInput.trim());
    }
  };

  // Status badge styling helper
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return { text: "Pending", bg: "bg-blue-50 text-blue-600 border-blue-200" };
      case "processing":
        return { text: "Processing", bg: "bg-amber-50 text-amber-600 border-amber-200" };
      case "out_for_delivery":
        return { text: "Out for Delivery", bg: "bg-purple-50 text-purple-600 border-purple-200" };
      case "delivered":
        return { text: "Delivered", bg: "bg-green-50 text-green-600 border-green-200" };
      case "cancelled":
        return { text: "Cancelled", bg: "bg-red-50 text-red-600 border-red-200" };
      case "refunded":
        return { text: "Refunded", bg: "bg-gray-50 text-gray-600 border-gray-200" };
      default:
        return { text: status, bg: "bg-gray-50 text-gray-600 border-gray-200" };
    }
  };

  // Formats date strings to readable local formats
  const formatDate = (dateVal: string | Date | null, includeTime = false) => {
    if (!dateVal) return "";
    try {
      const date = new Date(dateVal);
      if (isNaN(date.getTime())) return "";
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        ...(includeTime && { hour: "2-digit", minute: "2-digit" }),
      });
    } catch {
      return "";
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFBF5] text-[#3D2C1F] font-sans p-4 md:p-8 lg:p-12">
      {/* Header Section */}
      <header className="max-w-4xl mx-auto text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-[#FDF2E9] px-3 py-1 rounded-full text-[10px] font-bold text-[#D36B31] uppercase tracking-wider mb-4 border border-[#FADCC8]">
          📦 Real-Time Updates
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
          Track Your Order
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed">
          Stay updated from the moment your gift is prepared in Sri Lanka until
          it arrives at your loved one's doorstep in Worldwide.
        </p>
      </header>

      {/* Search Section */}
      <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm mb-10 text-center">
        <span className="text-[10px] font-bold text-[#D36B31] uppercase tracking-[0.2em] block mb-4">
          Order Tracking
        </span>
        <h2 className="text-2xl font-bold mb-6">Enter Your Tracking or Order Number</h2>
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Example: GIFT-869606"
            className="flex-1 bg-[#FFFBF5] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D36B31]/20"
          />
          <button type="submit" className="bg-[#D36B31] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b85a28] transition shadow-md shadow-orange-200 flex items-center justify-center gap-2">
            Track Order
          </button>
        </form>
        <p className="text-[10px] text-gray-400 mt-4 italic">
          You can find your order number in your order confirmation screen or confirmation email.
        </p>
      </section>

      {/* Results Section */}
      {isLoading && (
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm text-center mb-12 flex flex-col items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-[#D36B31] mb-4" />
          <p className="text-gray-500 font-medium">Fetching order updates...</p>
        </div>
      )}

      {!isLoading && searchCode && !order && (
        <div className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-12 border border-red-100 shadow-sm text-center mb-12 flex flex-col items-center justify-center">
          <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Order Not Found</h3>
          <p className="text-gray-500 text-sm max-w-md">
            We couldn't find an order with reference number <span className="font-semibold text-black">"{searchCode}"</span>. 
            Please check the spelling and try again.
          </p>
        </div>
      )}

      {!isLoading && !searchCode && (
        <div className="max-w-2xl mx-auto bg-white/60 rounded-[2.5rem] p-12 border border-dashed border-gray-200 text-center mb-12 flex flex-col items-center justify-center">
          <span className="text-4xl mb-4 text-gray-300">📦</span>
          <h3 className="text-lg font-bold mb-1">Awaiting Search Input</h3>
          <p className="text-gray-400 text-xs max-w-sm">
            Enter your order reference above to retrieve real-time delivery estimates and transit logs.
          </p>
        </div>
      )}

      {!isLoading && order && (
        <>
          {/* Main Timeline Card */}
          <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-12 relative overflow-hidden">
            {/* Order Info Header */}
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12">
              <div>
                <span className={`inline-block border text-[10px] font-bold px-3 py-1 rounded-lg uppercase mb-3 ${getStatusBadge(order.status).bg}`}>
                  {getStatusBadge(order.status).text}
                </span>
                <h3 className="text-2xl font-bold">
                  Order{" "}
                  <span className="text-gray-400 font-medium">#{order.orderNumber}</span>
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  {order.items?.map((item: any) => `${item.quantity}x ${item.gift?.name || 'Gift'}`).join(", ")}
                  {order.deliveryAddress?.city && ` • ${order.deliveryAddress.city}, Worldwide`}
                </p>
              </div>
              <div className="bg-[#FFFBF5] border border-gray-100 p-4 rounded-2xl text-center min-w-[140px] w-full md:w-auto">
                <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
                  Estimated Delivery
                </p>
                <p className="text-[#D36B31] font-serif font-bold text-lg">
                  {formatDate(order.deliveryDate) || "Pending schedule"}
                </p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-0 relative">
              {/* Vertical Line Connector */}
              <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-orange-100" />

              {/* Step 1: Order Confirmed (always completed) */}
              <div className="relative pl-14 pb-12">
                <div className="absolute left-0 top-0 w-10 h-10 bg-[#D36B31] rounded-full flex items-center justify-center text-white z-10">
                  <Check size={20} />
                </div>
                <h4 className="font-bold text-lg">Order Confirmed</h4>
                <p className="text-xs text-gray-500 mt-1">
                  Your order has been successfully placed and confirmed.
                </p>
                <p className="text-[10px] text-gray-400 mt-1">
                  {formatDate(order.createdAt, true)}
                </p>
              </div>

              {/* Step 2: Gift Prepared */}
              {(() => {
                const isCompleted = ["processing", "out_for_delivery", "delivered", "in_transit"].includes(order.status);
                return (
                  <div className="relative pl-14 pb-12">
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? "bg-[#D36B31] text-white" : "bg-white border-2 border-gray-200 text-gray-400"
                    }`}>
                      <Gift size={20} />
                    </div>
                    <h4 className={`font-bold text-lg ${isCompleted ? "text-gray-900" : "text-gray-400"}`}>Gift Prepared</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Your gift has been beautifully wrapped and prepared for dispatch.
                    </p>
                    {isCompleted && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatDate(order.updatedAt || order.createdAt, true)}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Step 3: In Transit */}
              {(() => {
                const isCompleted = ["out_for_delivery", "delivered"].includes(order.status) || 
                  (order.delivery && ["in_transit", "out_for_delivery", "delivered"].includes(order.delivery.status as string));
                const isActive = (order.status as string) === "in_transit" || 
                  (order.delivery && order.delivery.status === "in_transit");
                return (
                  <div className="relative pl-14 pb-12">
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isCompleted ? "bg-[#D36B31] text-white" : isActive ? "bg-white border-2 border-[#D36B31] text-[#D36B31]" : "bg-white border-2 border-gray-200 text-gray-400"
                    }`}>
                      <Plane size={20} />
                    </div>
                    <h4 className={`font-bold text-lg ${isCompleted || isActive ? "text-gray-900" : "text-gray-400"}`}>In Transit</h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Your order is currently on the way to Worldwide.
                    </p>
                    {isCompleted && (
                      <p className="text-[10px] text-gray-400 mt-1">
                        {formatDate(order.updatedAt, true)}
                      </p>
                    )}
                  </div>
                );
              })()}

              {/* Step 4: Out for Delivery / Delivered */}
              {(() => {
                const isDelivered = order.status === "delivered";
                const isOutForDelivery = order.status === "out_for_delivery";
                const isActiveOrDelivered = isDelivered || isOutForDelivery;
                return (
                  <div className="relative pl-14">
                    <div className={`absolute left-0 top-0 w-10 h-10 rounded-full flex items-center justify-center z-10 ${
                      isDelivered ? "bg-[#D36B31] text-white" : isOutForDelivery ? "bg-white border-2 border-[#D36B31] text-[#D36B31]" : "bg-white border-2 border-gray-200 text-gray-400"
                    }`}>
                      <Truck size={20} />
                    </div>
                    <h4 className={`font-bold text-lg ${isActiveOrDelivered ? "text-[#D36B31]" : "text-gray-400"}`}>
                      {isDelivered ? "Delivered" : "Out for Delivery"}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {isDelivered 
                        ? "Your gift has been successfully delivered and signed for. Thank you for choosing WorldWish!" 
                        : "Your gift is with our local delivery partner for doorstep handoff."
                      }
                    </p>
                    {isActiveOrDelivered && (
                      <p className="text-[10px] text-[#D36B31] font-bold mt-2 uppercase">
                        {isDelivered ? `Delivered: ${formatDate(order.updatedAt, true)}` : `Expected: Today • ${order.deliveryTimeSlot || "9:00 AM - 6:00 PM"}`}
                      </p>
                    )}
                  </div>
                );
              })()}
            </div>
          </section>

          {/* Detailed Items Card */}
          <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm mb-12">
            <h4 className="font-serif font-bold text-xl mb-6">Gift Order Summary</h4>
            <div className="space-y-4">
              {order.items?.map((item: any) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-[#FFFBF5] border border-gray-100 rounded-xl overflow-hidden relative flex-shrink-0">
                    {item.gift?.imageUrl ? (
                      <Image
                        src={item.gift.imageUrl}
                        alt={item.gift.name || "Gift"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl bg-[#FFFBF5]">🎁</div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-sm text-[#3D2C1F]">{item.gift?.name || "Premium Gift Item"}</h5>
                    <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm text-[#D36B31]">Rs. {parseFloat(item.priceLkr || "0").toLocaleString()}</p>
                  </div>
                </div>
              ))}
              <hr className="border-gray-100 my-4" />
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-black">Rs. {parseFloat(order.subtotalLkr || "0").toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-black">
                    {parseFloat(order.deliveryFeeLkr || "0") === 0 ? "Free" : `Rs. ${parseFloat(order.deliveryFeeLkr || "0").toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#3D2C1F] pt-2">
                  <span>Total Amount</span>
                  <span className="text-[#D36B31]">Rs. {parseFloat(order.totalLkr || "0").toLocaleString()}</span>
                </div>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Feature Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          {
            icon: "🇱🇰",
            title: "Sri Lanka",
            desc: "Carefully sourced and packed with premium presentation standards.",
          },
          {
            icon: <Plane className="text-blue-400" />,
            title: "International Transit",
            desc: "Fast and secure logistics ensuring timely delivery across Worldwide.",
          },
          {
            icon: <Globe className="text-blue-500" />,
            title: "Doorstep Delivery",
            desc: "Delivered safely to your loved ones with real-time tracking updates.",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-8 rounded-[2rem] text-center border border-gray-100 shadow-sm"
          >
            <div className="w-14 h-14 bg-[#FFFBF5] rounded-2xl flex items-center justify-center mx-auto mb-6 text-2xl shadow-inner border border-gray-50">
              {item.icon}
            </div>
            <h5 className="font-bold text-lg mb-2">{item.title}</h5>
            <p className="text-[11px] text-gray-500 leading-relaxed px-4">
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Call to Action Footer */}
      <section
        className="max-w-5xl mx-auto rounded-[3rem] p-12 text-center text-white relative overflow-hidden shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, #C25A24 0%, #D36B31 50%, #A8491D 100%)",
        }}
      >
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          Need Help With Your Order?
        </h2>
        <p className="text-white/80 text-sm mb-10 max-w-xl mx-auto">
          Our support team is ready to assist you with delivery updates, order
          changes and special requests.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-[#D36B31] px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-50 transition">
            Contact Support
          </button>
          <button className="bg-black/10 border border-white/20 text-white px-8 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-black/20 transition backdrop-blur-sm">
            Live Chat
          </button>
        </div>
      </section>
    </div>
  );
};

export default OrderTrackingPage;

