"use client";

import { Check, Gift, Globe, Plane, Truck } from "lucide-react";

const OrderTrackingPage = () => {
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
          it arrives at your loved one's doorstep in Australia.
        </p>
      </header>

      {/* Search Section */}
      <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-10 border border-gray-100 shadow-sm mb-10 text-center">
        <span className="text-[10px] font-bold text-[#D36B31] uppercase tracking-[0.2em] block mb-4">
          Order Tracking
        </span>
        <h2 className="text-2xl font-bold mb-6">Enter Your Tracking Number</h2>
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Example: LTA-20458-AU"
            className="flex-1 bg-[#FFFBF5] border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#D36B31]/20"
          />
          <button className="bg-[#D36B31] text-white px-8 py-3 rounded-xl font-bold hover:bg-[#b85a28] transition shadow-md shadow-orange-200">
            Track Order
          </button>
        </div>
        <p className="text-[10px] text-gray-400 mt-4 italic">
          You can find your tracking number in your order confirmation email.
        </p>
      </section>

      {/* Main Timeline Card */}
      <section className="max-w-2xl mx-auto bg-white rounded-[2.5rem] p-8 md:p-12 border border-gray-100 shadow-sm mb-12 relative overflow-hidden">
        {/* Order Info Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <span className="bg-[#FEF3C7] text-[#D97706] text-[10px] font-bold px-3 py-1 rounded-lg uppercase mb-3 inline-block">
              In Transit
            </span>
            <h3 className="text-2xl font-bold">
              Order{" "}
              <span className="text-gray-400 font-medium">#LTA-20458-AU</span>
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              Birthday Gift Hamper • Sydney, Australia
            </p>
          </div>
          <div className="bg-[#FFFBF5] border border-gray-100 p-4 rounded-2xl text-center min-w-[120px]">
            <p className="text-[10px] text-gray-400 uppercase font-bold mb-1">
              Estimated Delivery
            </p>
            <p className="text-[#D36B31] font-serif font-bold text-xl">
              Tomorrow
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-0 relative">
          {/* Vertical Line Connector */}
          <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-orange-100" />

          {/* Step 1 */}
          <div className="relative pl-14 pb-12">
            <div className="absolute left-0 top-0 w-10 h-10 bg-[#D36B31] rounded-full flex items-center justify-center text-white z-10">
              <Check size={20} />
            </div>
            <h4 className="font-bold text-lg">Order Confirmed</h4>
            <p className="text-xs text-gray-500 mt-1">
              Your order has been successfully placed and confirmed.
            </p>
            <p className="text-[10px] text-gray-400 mt-1">May 06 • 9:45 AM</p>
          </div>

          {/* Step 2 */}
          <div className="relative pl-14 pb-12">
            <div className="absolute left-0 top-0 w-10 h-10 bg-[#D36B31] rounded-full flex items-center justify-center text-white z-10">
              <Gift size={20} />
            </div>
            <h4 className="font-bold text-lg">Gift Prepared</h4>
            <p className="text-xs text-gray-500 mt-1">
              Your gift has been beautifully wrapped and prepared for dispatch.
            </p>
            <p className="text-[10px] text-gray-400 mt-1">May 06 • 2:20 PM</p>
          </div>

          {/* Step 3 */}
          <div className="relative pl-14 pb-12">
            <div className="absolute left-0 top-0 w-10 h-10 bg-[#D36B31] rounded-full flex items-center justify-center text-white z-10">
              <Plane size={20} />
            </div>
            <h4 className="font-bold text-lg">In Transit</h4>
            <p className="text-xs text-gray-500 mt-1">
              Your order is currently on the way to Australia.
            </p>
            <p className="text-[10px] text-gray-400 mt-1 font-semibold">
              May 07 • 8:15 AM
            </p>
          </div>

          {/* Step 4 (Current) */}
          <div className="relative pl-14">
            <div className="absolute left-0 top-0 w-10 h-10 bg-white border-2 border-[#D36B31] rounded-full flex items-center justify-center text-[#D36B31] z-10">
              <Truck size={20} />
            </div>
            <h4 className="font-bold text-lg text-[#D36B31]">
              Out for Delivery
            </h4>
            <p className="text-xs text-gray-500 mt-1">
              Your gift is currently with our local delivery partner in Sydney.
            </p>
            <p className="text-[10px] text-[#D36B31] font-bold mt-2 uppercase">
              Expected Today • 3:00 PM - 6:00 PM
            </p>
          </div>
        </div>
      </section>

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
            desc: "Fast and secure logistics ensuring timely delivery across Australia.",
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
