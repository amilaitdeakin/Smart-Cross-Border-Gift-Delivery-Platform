"use client";

import {
  Check,
  CreditCard,
  Lock,
  ShoppingCart,
  Sparkles,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useCartStore } from "@/store/cartStore";

// Form validation schema
const checkoutSchema = z
  .object({
    // Delivery Information
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    apartment: z.string().optional(),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    phone: z.string().min(1, "Phone number is required"),
    deliveryDate: z.string().min(1, "Delivery date is required"),
    deliveryInstruction: z.string().optional(),

    // Gift Message
    giftMessage: z.string().optional(),
    messageTitle: z.string().optional(),

    // Payment
    paymentMethod: z.enum(["card", "paypal"]),

    // Card details (conditional)
    cardNumber: z.string().optional(),
    cardholderName: z.string().optional(),
    expiryDate: z.string().optional(),
    cvv: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "card") {
        return (
          data.cardNumber && data.cardholderName && data.expiryDate && data.cvv
        );
      }
      return true;
    },
    {
      message: "Card details are required for card payment",
      path: ["cardNumber"],
    },
  );

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const CheckoutPage = () => {
  const router = useRouter();
  const { products, getTotalItems, getTotalPrice, clearCart } = useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [showAiMessage, setShowAiMessage] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      apartment: "",
      city: "",
      postalCode: "",
      phone: "",
      deliveryDate: "",
      deliveryInstruction: "",
      giftMessage: "",
      messageTitle: "",
      paymentMethod: "card",
      cardNumber: "",
      cardholderName: "",
      expiryDate: "",
      cvv: "",
    },
    mode: "onChange",
  });

  const paymentMethod = watch("paymentMethod");
  const giftMessage = watch("giftMessage");
  const deliveryDate = watch("deliveryDate");

  const subtotal = getTotalPrice();
  const cartItemCount = getTotalItems();
  const delivery = subtotal > 50 ? 0 : 12;
  const serviceFee = 5;
  const total = subtotal + delivery + serviceFee;

  // AI Message Suggestions
  const aiMessages = [
    "Thinking of you today and always. Hope this gift brings a smile to your face! ✨",
    "You mean the world to me. Sending love and warm wishes your way! 💝",
    "Happy Birthday! May your day be as wonderful as you are. 🎂🎉",
    "Congratulations on your special day! So proud of you! 🌟",
    "Wishing you all the best on your journey. You've got this! 💪",
    "Missing you extra today. Sending a little surprise to brighten your week! ☀️",
    "Thank you for being amazing. Enjoy this small token of my appreciation! 🙏",
    "Get well soon! Thinking of you and wishing you a speedy recovery! 🍀",
  ];

  const generateAIMessage = () => {
    const randomIndex = Math.floor(Math.random() * aiMessages.length);
    setValue("giftMessage", aiMessages[randomIndex], { shouldValidate: true });
    setShowAiMessage(true);
    setTimeout(() => setShowAiMessage(false), 3000);
  };

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate order number
    const newOrderNumber = `GIFT-${Math.floor(Math.random() * 1000000)}`;
    setOrderNumber(newOrderNumber);
    setOrderComplete(true);
    clearCart();
    setIsProcessing(false);
  };

  if (products.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] p-4 md:p-8 lg:p-12 font-sans text-[#3D2C1F]">
        <div className="max-w-6xl mx-auto text-center py-20">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-6 py-3 rounded-full text-orange-800 mb-6">
            <ShoppingCart size={20} /> Empty Cart
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            No Items to Checkout
          </h1>
          <p className="text-gray-600 mb-8">
            Your cart is empty. Add some gifts to complete your order.
          </p>
          <Link href="/explore">
            <button className="bg-[#D36B31] text-white px-8 py-3 rounded-full font-bold hover:bg-[#b85a28] transition">
              Start Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#FFFBF5] p-4 md:p-8 lg:p-12 font-sans text-[#3D2C1F]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Order Confirmed! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <div className="bg-orange-50 rounded-2xl p-6 mb-8">
              <p className="text-sm text-gray-500 mb-1">Order Number</p>
              <p className="text-2xl font-bold text-[#D36B31]">{orderNumber}</p>
            </div>
            <div className="space-y-3 text-left text-sm text-gray-600 mb-8">
              <p>📧 Confirmation email sent to your inbox</p>
              <p>🚚 We'll notify you when your order is on its way</p>
              <p>🎁 Your gift will be beautifully packaged</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/explore" className="flex-1">
                <button className="w-full bg-[#D36B31] text-white py-3 rounded-full font-bold hover:bg-[#b85a28] transition">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/" className="flex-1">
                <button className="w-full border border-gray-300 py-3 rounded-full font-bold hover:bg-gray-50 transition">
                  Go to Home
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBF5] p-4 md:p-8 lg:p-12 font-sans text-[#3D2C1F]">
      {/* Header */}
      <header className="max-w-6xl mx-auto text-center mb-12">
        <nav className="text-sm text-gray-500 mb-4 flex justify-center gap-2">
          <Link href="/" className="hover:text-orange-700">
            Home
          </Link>
          <span>&rsaquo;</span>
          <Link href="/cart" className="hover:text-orange-700">
            Cart
          </Link>
          <span>&rsaquo;</span>
          <span className="text-orange-700">Checkout</span>
        </nav>
        <div className="inline-flex items-center gap-2 bg-orange-100 px-3 py-1 rounded-full text-xs font-semibold text-orange-800 mb-4">
          <Lock size={12} /> Secure Checkout
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-2">
          Complete Your Order
        </h1>
        <p className="text-gray-600">
          Send love across borders with secure payments and fast delivery across
          Worldwide.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Forms */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="lg:col-span-2 space-y-6"
        >
          {/* Delivery Information Section */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-orange-100 p-3 rounded-xl">
                <Truck className="text-orange-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Delivery Information</h2>
                <p className="text-sm text-gray-500">
                  Enter recipient details for delivery
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Recipient First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="John"
                  className={`w-full p-3 rounded-xl border ${
                    errors.firstName ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Recipient Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Doe"
                  className={`w-full p-3 rounded-xl border ${
                    errors.lastName ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("address")}
                  placeholder="Street address"
                  className={`w-full p-3 rounded-xl border ${
                    errors.address ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold">
                  Apartment / Suite (Optional)
                </label>
                <input
                  type="text"
                  {...register("apartment")}
                  placeholder="Apt 4B"
                  className="w-full p-3 rounded-xl border border-gray-200 bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("city")}
                  placeholder="Sydney"
                  className={`w-full p-3 rounded-xl border ${
                    errors.city ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.city && (
                  <p className="text-red-500 text-xs">{errors.city.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Postal Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("postalCode")}
                  placeholder="2000"
                  className={`w-full p-3 rounded-xl border ${
                    errors.postalCode ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.postalCode && (
                  <p className="text-red-500 text-xs">
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Contact Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  placeholder="+61 4XX XXX XXX"
                  className={`w-full p-3 rounded-xl border ${
                    errors.phone ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs">{errors.phone.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold">
                  Delivery Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("deliveryDate")}
                  className={`w-full p-3 rounded-xl border ${
                    errors.deliveryDate ? "border-red-500" : "border-gray-200"
                  } bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200`}
                />
                {errors.deliveryDate && (
                  <p className="text-red-500 text-xs">
                    {errors.deliveryDate.message}
                  </p>
                )}
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-semibold">
                  Delivery Instructions (Optional)
                </label>
                <input
                  type="text"
                  {...register("deliveryInstruction")}
                  placeholder="Leave at front door, call upon arrival, etc."
                  className="w-full p-3 rounded-xl border border-gray-200 bg-orange-50/30 focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
              </div>
            </div>
          </section>

          {/* Personalized Message Section */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-red-100 p-3 rounded-xl text-red-600 italic">
                💌
              </div>
              <div>
                <h2 className="text-2xl font-bold">Personalized Message</h2>
                <p className="text-sm text-gray-500">
                  Add a heartfelt note for your loved one
                </p>
              </div>
            </div>
            <textarea
              {...register("giftMessage")}
              rows={4}
              placeholder="Write your personalized message here..."
              className="w-full p-4 rounded-2xl border border-gray-200 bg-orange-50/30 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
            {showAiMessage && (
              <div className="mb-4 p-3 bg-green-50 rounded-xl text-sm text-green-700 animate-in fade-in slide-in-from-top-2">
                ✨ AI message added! Edit it to make it more personal.
              </div>
            )}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                {...register("messageTitle")}
                placeholder="Example: Birthday message for wife"
                className="flex-1 p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-200"
              />
              <button
                type="button"
                onClick={generateAIMessage}
                className="bg-[#D36B31] text-white px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-[#b85a28] transition"
              >
                <Sparkles size={16} /> Generate AI Message
              </button>
            </div>
          </section>

          {/* Payment Method Section */}
          <section className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-gray-100 p-3 rounded-xl">
                <CreditCard className="text-gray-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Payment Method</h2>
                <p className="text-sm text-gray-500">
                  Secure encrypted payment processing
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <Controller
                name="paymentMethod"
                control={control}
                render={({ field }) => (
                  <>
                    <div
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl transition cursor-pointer ${
                        field.value === "card"
                          ? "border-orange-500 bg-orange-50/20"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("card")}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={field.value === "card"}
                          onChange={() => {}}
                          className="w-4 h-4 accent-orange-600"
                        />
                        <div>
                          <p className="font-bold">Credit / Debit Card</p>
                          <p className="text-xs text-gray-500">
                            Visa, Mastercard, American Express
                          </p>
                        </div>
                      </div>
                      <CreditCard size={20} className="text-gray-400" />
                    </div>

                    <div
                      className={`flex items-center justify-between p-4 border-2 rounded-2xl transition cursor-pointer ${
                        field.value === "paypal"
                          ? "border-orange-500 bg-orange-50/20"
                          : "border-gray-200"
                      }`}
                      onClick={() => field.onChange("paypal")}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          checked={field.value === "paypal"}
                          onChange={() => {}}
                          className="w-4 h-4"
                        />
                        <div>
                          <p className="font-bold">PayPal</p>
                          <p className="text-xs text-gray-500">
                            Fast and secure online payment
                          </p>
                        </div>
                      </div>
                      <span className="text-blue-600 font-bold italic">
                        PayPal
                      </span>
                    </div>
                  </>
                )}
              />
            </div>

            {paymentMethod === "card" && (
              <div className="mt-4 animate-in fade-in slide-in-from-top-2 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Card Number</label>
                    <input
                      type="text"
                      {...register("cardNumber")}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full p-3 rounded-xl border ${
                        errors.cardNumber ? "border-red-500" : "border-gray-200"
                      } bg-gray-50`}
                    />
                    {errors.cardNumber && (
                      <p className="text-red-500 text-xs">
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      {...register("cardholderName")}
                      placeholder="John Doe"
                      className={`w-full p-3 rounded-xl border ${
                        errors.cardholderName
                          ? "border-red-500"
                          : "border-gray-200"
                      } bg-gray-50`}
                    />
                    {errors.cardholderName && (
                      <p className="text-red-500 text-xs">
                        {errors.cardholderName.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">Expiry Date</label>
                    <input
                      type="text"
                      {...register("expiryDate")}
                      placeholder="MM/YY"
                      className={`w-full p-3 rounded-xl border ${
                        errors.expiryDate ? "border-red-500" : "border-gray-200"
                      } bg-gray-50`}
                    />
                    {errors.expiryDate && (
                      <p className="text-red-500 text-xs">
                        {errors.expiryDate.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold">CVV</label>
                    <input
                      type="password"
                      {...register("cvv")}
                      placeholder="123"
                      className={`w-full p-3 rounded-xl border ${
                        errors.cvv ? "border-red-500" : "border-gray-200"
                      } bg-gray-50`}
                    />
                    {errors.cvv && (
                      <p className="text-red-500 text-xs">
                        {errors.cvv.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        </form>

        {/* Right Column: Order Summary */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm sticky top-8">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
              {products.map((product, index) => (
                <div key={index} className="flex gap-4">
                  <div className="w-16 h-16 bg-pink-100 rounded-xl overflow-hidden flex-shrink-0 relative">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-sm">{product.title}</p>
                    <p className="text-xs text-gray-500">
                      Qty: {product.quantity || 1}
                    </p>
                    <p className="text-orange-700 font-bold">
                      $
                      {((product.price || 0) * (product.quantity || 1)).toFixed(
                        2,
                      )}{" "}
                      AUD
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <hr className="mb-4" />

            {/* Totals */}
            <div className="space-y-2 text-sm text-gray-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-black">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-black">
                  {delivery === 0 ? "Free" : `$${delivery}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Service Fee</span>
                <span className="font-bold text-black">${serviceFee}</span>
              </div>
            </div>

            <div className="flex justify-between items-center mb-6">
              <span className="text-xl font-bold">Total</span>
              <span className="text-3xl font-bold text-[#D36B31]">
                ${total.toFixed(2)} AUD
              </span>
            </div>

            <button
              type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={isProcessing || !isValid}
              className="w-full bg-[#D36B31] text-white py-4 rounded-2xl font-bold text-lg hover:bg-[#b85a28] transition shadow-lg mb-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </span>
              ) : (
                "Complete Payment"
              )}
            </button>

            <Link href="/cart">
              <button className="w-full text-orange-700 py-3 rounded-2xl font-semibold hover:bg-orange-50 transition border border-transparent">
                Return to Cart
              </button>
            </Link>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Lock size={16} />
                </div>
                <div>
                  <p className="font-bold text-black">Secure SSL Checkout</p>
                  <p>Your payment information is encrypted</p>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <div className="bg-orange-100 p-2 rounded-lg text-orange-600">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="font-bold text-black">Fast Delivery</p>
                  <p>Across Worldwide</p>
                </div>
              </div>
            </div>

            {/* Delivery Estimate Preview */}
            {deliveryDate && (
              <div className="mt-4 p-3 bg-orange-50 rounded-xl">
                <p className="text-xs text-gray-500">Estimated Delivery</p>
                <p className="text-sm font-semibold text-[#D36B31]">
                  {new Date(deliveryDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            )}

            {/* Gift Message Preview */}
            {giftMessage && (
              <div className="mt-4 p-3 bg-red-50 rounded-xl">
                <p className="text-xs text-gray-500 mb-1">
                  Gift Message Preview
                </p>
                <p className="text-sm italic">"{giftMessage}"</p>
              </div>
            )}
          </div>
        </aside>
      </main>
    </div>
  );
};

export default CheckoutPage;
