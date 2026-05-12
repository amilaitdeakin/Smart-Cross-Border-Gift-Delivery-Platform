"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  Gift,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/store/cartStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const {
    products,
    removeProduct,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [discount, setDiscount] = useState(0);

  const cartItemCount = getTotalItems();
  const subtotal = getTotalPrice();
  const shipping = subtotal > 50 ? 0 : 8.99;
  const tax = subtotal * 0.1; // 10% tax
  const discountAmount = promoApplied ? subtotal * 0.1 : discount; // 10% discount with promo
  const total = subtotal + shipping + tax - discountAmount;

  const handleApplyPromo = () => {
    if (
      promoCode.toLowerCase() === "gift10" ||
      promoCode.toLowerCase() === "welcome10"
    ) {
      setPromoApplied(true);
      setDiscount(subtotal * 0.1);
    } else if (promoCode.toLowerCase() === "freeship") {
      setPromoApplied(true);
      setDiscount(0);
    } else {
      alert("Invalid promo code. Try GIFT10 or WELCOME10 for 10% off!");
    }
  };

  const handleRemovePromo = () => {
    setPromoApplied(false);
    setPromoCode("");
    setDiscount(0);
  };

  if (products.length === 0) {
    return (
      <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="mx-auto mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-[#fde8d7]">
            <ShoppingCart className="h-16 w-16 text-[#d96c28]" />
          </div>
          <h1 className="text-4xl font-bold">Your Cart is Empty</h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-[#6f5a4d]">
            Looks like you haven't added any gifts to your cart yet.
          </p>
          <Link href="/explore">
            <Button className="mt-8 rounded-full bg-[#d96c28] px-8 py-6 text-lg hover:bg-[#c85f20]">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
      {/* Header */}
      <div className="border-b border-[#ebe1d7] bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link
              href="/explore"
              className="flex items-center gap-2 text-[#6f5a4d] transition-colors hover:text-[#d96c28]"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Continue Shopping</span>
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#d96c28]" />
              <span className="font-semibold">Shopping Cart</span>
              <Badge className="ml-2 rounded-full bg-[#fde8d7] text-[#d96c28]">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items - Left Column */}
          <div className="lg:col-span-2">
            <Card className="rounded-[28px] border border-[#eadfd4] bg-white shadow-sm">
              <CardContent className="p-6">
                {/* Cart Header */}
                <div className="mb-4 hidden grid-cols-12 gap-4 pb-3 text-sm font-medium text-[#9c8779] md:grid">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Total</div>
                </div>

                <Separator className="mb-6 hidden md:block" />

                {/* Cart Items */}
                <div className="space-y-6">
                  {products.map((product, index) => (
                    <div
                      key={index}
                      className="flex flex-col gap-4 border-b border-[#eadfd4] pb-6 last:border-0 md:grid md:grid-cols-12 md:gap-4"
                    >
                      {/* Product Info */}
                      <div className="flex gap-4 md:col-span-6">
                        <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl">
                          <Image
                            src={product.image}
                            alt={product.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-[#2d1b12]">
                            {product.title}
                          </h3>
                          <p className="mt-1 text-sm text-[#9c8779]">
                            {product.category || "Gift"}
                          </p>
                          <button
                            onClick={() => removeProduct(index)}
                            className="mt-2 flex items-center gap-1 text-sm text-red-500 transition-colors hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between md:col-span-2 md:justify-center">
                        <span className="text-sm text-[#9c8779] md:hidden">
                          Price:
                        </span>
                        <span className="font-semibold text-[#d96c28]">
                          ${product.price}
                        </span>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center justify-between md:col-span-2 md:justify-center">
                        <span className="text-sm text-[#9c8779] md:hidden">
                          Quantity:
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(index, (product.quantity || 1) - 1)
                            }
                            className="rounded-full border border-[#eadfd4] p-1.5 transition-colors hover:bg-[#f6f1eb] hover:border-[#d96c28]"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-8 text-center font-medium">
                            {product.quantity || 1}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(index, (product.quantity || 1) + 1)
                            }
                            className="rounded-full border border-[#eadfd4] p-1.5 transition-colors hover:bg-[#f6f1eb] hover:border-[#d96c28]"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                      </div>

                      {/* Total */}
                      <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                        <span className="text-sm text-[#9c8779] md:hidden">
                          Total:
                        </span>
                        <span className="text-lg font-bold text-[#d96c28]">
                          $
                          {(
                            (product.price || 0) * (product.quantity || 1)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                {products.length > 0 && (
                  <div className="mt-6 flex justify-end">
                    <Button
                      onClick={clearCart}
                      variant="outline"
                      className="rounded-full border-red-300 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Clear Cart
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary - Right Column */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 rounded-[28px] border border-[#eadfd4] bg-white shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold">Order Summary</h2>

                {/* Promo Code */}
                <div className="mt-6">
                  <label className="text-sm font-medium text-[#6f5a4d]">
                    Promo Code
                  </label>
                  {promoApplied ? (
                    <div className="mt-2 flex items-center justify-between rounded-xl bg-green-50 p-3">
                      <span className="text-sm font-medium text-green-700">
                        {promoCode.toUpperCase()} applied!
                      </span>
                      <button
                        onClick={handleRemovePromo}
                        className="rounded-full p-1 hover:bg-green-100"
                      >
                        <X className="h-4 w-4 text-green-700" />
                      </button>
                    </div>
                  ) : (
                    <div className="mt-2 flex gap-2">
                      <Input
                        type="text"
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="rounded-full border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]"
                      />
                      <Button
                        onClick={handleApplyPromo}
                        className="rounded-full bg-[#d96c28] px-6 hover:bg-[#c85f20]"
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                  <p className="mt-2 text-xs text-[#9c8779]">
                    Try GIFT10 or WELCOME10 for 10% off!
                  </p>
                </div>

                <Separator className="my-6" />

                {/* Totals */}
                <div className="space-y-3">
                  <div className="flex justify-between text-[#6f5a4d]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#6f5a4d]">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-[#6f5a4d]">
                    <span>Estimated Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  {promoApplied && discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount (10%)</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                  )}
                  <Separator className="my-2" />
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-[#d96c28]">${total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Button
                  className="mt-8 w-full rounded-full bg-[#d96c28] py-6 text-base font-semibold hover:bg-[#c85f20]"
                  onClick={() => router.push("/checkout")}
                >
                  <CreditCard className="mr-2 h-5 w-5" />
                  Proceed to Checkout
                </Button>

                {/* Shipping Info */}
                <div className="mt-6 space-y-3 rounded-xl bg-[#fde8d7] p-4">
                  <div className="flex items-center gap-2 text-sm text-[#5e4739]">
                    <Truck className="h-4 w-4 text-[#d96c28]" />
                    <span>Free shipping on orders over $50</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5e4739]">
                    <Shield className="h-4 w-4 text-[#d96c28]" />
                    <span>Secure checkout with encryption</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#5e4739]">
                    <Gift className="h-4 w-4 text-[#d96c28]" />
                    <span>Gift wrapping available at checkout</span>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="text-xs text-[#9c8779]">We accept:</span>
                  <div className="flex gap-2">
                    <Badge className="bg-gray-100 text-gray-700">Visa</Badge>
                    <Badge className="bg-gray-100 text-gray-700">MC</Badge>
                    <Badge className="bg-gray-100 text-gray-700">Amex</Badge>
                    <Badge className="bg-gray-100 text-gray-700">PayPal</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recommended Products */}
            <Card className="mt-6 rounded-[28px] border border-[#eadfd4] bg-white shadow-sm">
              <CardContent className="p-6">
                <h3 className="font-semibold text-[#2d1b12]">
                  You might also like
                </h3>
                <div className="mt-4 space-y-3">
                  {recommendedProducts.map((product, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{product.title}</p>
                        <p className="text-sm font-bold text-[#d96c28]">
                          ${product.price}
                        </p>
                      </div>
                      <Link href="/explore">
                        <Button
                          size="sm"
                          className="rounded-full bg-[#d96c28] px-3 text-xs hover:bg-[#c85f20]"
                        >
                          View
                        </Button>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

const recommendedProducts = [
  {
    title: "Red Roses Bouquet",
    price: 39,
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=200&auto=format&fit=crop",
  },
  {
    title: "Luxury Chocolate Box",
    price: 52,
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=200&auto=format&fit=crop",
  },
  {
    title: "Birthday Cake",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=200&auto=format&fit=crop",
  },
];
