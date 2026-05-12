"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Gem,
  Gift,
  Truck,
  Search,
  X,
  Filter,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useCartStore, type Product } from "@/store/cartStore";

export default function ExploreAllGiftsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(8);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Zustand store
  const {
    products,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
  } = useCartStore();
  const cartItemCount = getTotalItems();
  const cartTotal = getTotalPrice();

  // Show temporary toast notification
  const showNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  // Add to cart function using Zustand
  const handleAddToCart = (giftProduct: (typeof productsData)[0]) => {
    const cartProduct: Product = {
      id: giftProduct.id,
      name: giftProduct.title,
      title: giftProduct.title,
      price: giftProduct.price,
      oldPrice: giftProduct.oldPrice,
      image: giftProduct.image,
      retailer: "GiftShop",
      category: giftProduct.category,
      badge: giftProduct.badge,
      description: giftProduct.description,
      rating: giftProduct.rating,
      isNew: giftProduct.isNew,
      quantity: 1,
    };

    addProduct(cartProduct);
    showNotification(`${giftProduct.title} added to cart`);
  };

  // Filter products based on category and search query
  const filteredProducts = productsData.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const displayedProducts = filteredProducts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProducts.length;

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 8, filteredProducts.length));
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setVisibleCount(8);
  };

  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="flex items-center gap-2 rounded-full bg-[#2d1b12] px-5 py-3 text-white shadow-lg">
            <Gift className="h-4 w-4" />
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-all"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Cart Drawer */}
      <div
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Cart Header */}
          <div className="flex items-center justify-between border-b border-[#eadfd4] p-5">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-[#d96c28]" />
              <h2 className="text-xl font-bold">Your Cart</h2>
              <Badge className="ml-2 rounded-full bg-[#fde8d7] text-[#d96c28]">
                {cartItemCount} {cartItemCount === 1 ? "item" : "items"}
              </Badge>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="rounded-full p-2 hover:bg-[#f6f1eb]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Cart Items */}
          <ScrollArea className="flex-1">
            {products.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center py-20 text-center">
                <div className="mb-4 rounded-full bg-[#fde8d7] p-6">
                  <ShoppingCart className="h-10 w-10 text-[#d96c28]" />
                </div>
                <h3 className="text-xl font-semibold">Your cart is empty</h3>
                <p className="mt-2 text-[#6f5a4d]">
                  Add some gifts to get started!
                </p>
                <Button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 rounded-full bg-[#d96c28] hover:bg-[#c85f20]"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-[#eadfd4]">
                {products.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4">
                    {/* Product Image */}
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-lg font-bold text-[#d96c28]">
                        ${item.price}
                      </p>

                      {/* Quantity Controls */}
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(index, (item.quantity || 1) - 1)
                          }
                          className="rounded-full border border-[#eadfd4] p-1 hover:bg-[#f6f1eb]"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-6 text-center text-sm font-medium">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(index, (item.quantity || 1) + 1)
                          }
                          className="rounded-full border border-[#eadfd4] p-1 hover:bg-[#f6f1eb]"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="text-right">
                      <p className="font-semibold">
                        ${((item.price || 0) * (item.quantity || 1)).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeProduct(index)}
                        className="mt-2 text-sm text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          {/* Cart Footer */}
          {products.length > 0 && (
            <div className="border-t border-[#eadfd4] bg-white p-5">
              <Separator className="mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-[#6f5a4d]">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-[#6f5a4d]">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-[#d96c28]">
                    ${cartTotal.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="mt-5 flex gap-3">
                <Button
                  onClick={clearCart}
                  variant="outline"
                  className="flex-1 rounded-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  Clear All
                </Button>
                <Button className="flex-1 rounded-full bg-[#d96c28] hover:bg-[#c85f20]">
                  Checkout →
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full bg-[#fde8d7] px-4 py-1 text-[#d96c28] hover:bg-[#fde8d7]">
            Curated with Love
          </Badge>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            Explore All Gifts
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f5a4d]">
            Send flowers, cakes, chocolates, personalized hampers and heartfelt
            surprises from Sri Lanka to Australia.
          </p>
        </div>
      </section>

      {/* Search Bar & Cart Button */}
      <section className="container mx-auto px-4 pb-8">
        <div className="mx-auto flex max-w-2xl gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9c8779]" />
            <Input
              type="text"
              placeholder="Search for gifts, flowers, chocolates..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(8);
              }}
              className="w-full rounded-full border-[#eadfd4] bg-white py-6 pl-12 pr-24 text-base shadow-sm focus:border-[#d96c28] focus:ring-[#d96c28]"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setVisibleCount(8);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full p-1 hover:bg-[#f6f1eb]"
              >
                <X className="h-4 w-4 text-[#9c8779]" />
              </button>
            )}
          </div>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative rounded-full bg-[#d96c28] px-5 py-3 text-white transition-all hover:bg-[#c85f20] hover:shadow-md"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-white text-xs font-bold text-[#d96c28] shadow">
                {cartItemCount > 9 ? "9+" : cartItemCount}
              </span>
            )}
          </button>
        </div>
      </section>

      {/* Categories */}
      <section className="border-y border-[#ebe1d7] bg-white/40">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <Filter className="mr-1 h-4 w-4 text-[#9c8779]" />
            {categories.map((category, index) => (
              <Button
                key={index}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => {
                  setSelectedCategory(category);
                  setVisibleCount(8);
                }}
                className={
                  selectedCategory === category
                    ? "rounded-full bg-[#d96c28] text-white hover:bg-[#c85f20]"
                    : "rounded-full border-[#e7d8ca] bg-white text-[#5e4739] hover:bg-[#fff4ec]"
                }
              >
                {category}
              </Button>
            ))}
            {(selectedCategory !== "All" || searchQuery) && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="rounded-full text-[#d96c28] hover:bg-[#fff4ec] hover:text-[#c85f20]"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="container mx-auto px-4 pt-8">
        <p className="text-sm text-[#6f5a4d]">
          Showing {displayedProducts.length} of {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "gift" : "gifts"}
        </p>
      </section>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-8">
        {displayedProducts.length === 0 ? (
          <div className="py-20 text-center">
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-[#fde8d7]">
              <Gift className="h-12 w-12 text-[#d96c28]" />
            </div>
            <h3 className="text-2xl font-semibold text-[#2d1b12]">
              No gifts found
            </h3>
            <p className="mt-2 text-[#6f5a4d]">
              Try adjusting your search or filter criteria
            </p>
            <Button
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[#d96c28] hover:bg-[#c85f20]"
            >
              Clear Filters
            </Button>
          </div>
        ) : (
          <>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {displayedProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group overflow-hidden rounded-[28px] border border-[#eadfd4] bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  {/* Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-4 top-4">
                      <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-[#c65c1f] shadow">
                        {product.badge}
                      </span>
                    </div>
                    {product.isNew && (
                      <div className="absolute right-4 top-4">
                        <span className="rounded-full bg-[#d96c28] px-3 py-1 text-xs font-semibold text-white shadow">
                          New
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <CardContent className="p-5">
                    <div className="mb-2 flex items-center gap-2">
                      <Badge className="rounded-full bg-[#fde8d7] text-xs text-[#d96c28]">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-bold">{product.title}</h3>
                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#6f5a4d]">
                      {product.description}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-[#d96c28]">
                          ${product.price}
                        </p>
                        {product.oldPrice && (
                          <p className="text-sm text-[#9c8779] line-through">
                            ${product.oldPrice}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span
                            key={i}
                            className={`text-sm ${
                              i < product.rating
                                ? "text-yellow-500"
                                : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="mt-6 w-full rounded-xl bg-[#d96c28] py-6 text-base font-semibold text-white transition-all hover:bg-[#c85f20] hover:shadow-md"
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-12 flex justify-center">
                <Button
                  onClick={loadMore}
                  variant="outline"
                  className="rounded-full border-[#d96c28] px-8 py-6 text-[#d96c28] hover:bg-[#fff4ec] hover:text-[#c85f20]"
                >
                  Load More Gifts
                </Button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 pb-20">
        <Card className="rounded-[32px] border border-[#eadfd4] bg-white shadow-sm">
          <CardContent className="grid gap-10 p-10 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#fff2e4]">
                  <feature.icon className="h-8 w-8 text-[#d96c28]" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-3 leading-7 text-[#6f5a4d]">
                  {feature.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-24">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#c95414] to-[#de6a2d] px-8 py-20 text-center text-white shadow-xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-5xl font-bold">Sweet Moments Delivered</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
              Send handcrafted chocolates and luxury sweet gifts to loved ones
              across Australia.
            </p>
            <Button
              size="lg"
              className="mt-10 rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#c95414] transition-all hover:bg-orange-100 hover:shadow-lg"
            >
              Explore Chocolates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const categories = [
  "All",
  "Flowers",
  "Cakes",
  "Chocolate",
  "Gift Hampers",
  "Personalized",
  "Combos",
  "Plants",
  "Jewelry",
];

const productsData = [
  {
    id: 1,
    title: "Red Roses Bouquet",
    category: "Flowers",
    badge: "Best Seller",
    image:
      "https://images.unsplash.com/photo-1520763185298-1b434c919102?q=80&w=1200&auto=format&fit=crop",
    description:
      "A luxury handcrafted bouquet with premium roses and elegant wrapping.",
    price: 39,
    oldPrice: 52,
    rating: 5,
    isNew: false,
  },
  {
    id: 2,
    title: "Luxury Chocolate Box",
    category: "Chocolate",
    badge: "Premium",
    image:
      "https://images.unsplash.com/photo-1511381939415-e44015466834?q=80&w=1200&auto=format&fit=crop",
    description:
      "Elegant assorted chocolates perfect for gifting and celebrations.",
    price: 52,
    oldPrice: 70,
    rating: 5,
    isNew: false,
  },
  {
    id: 3,
    title: "Artisan Chocolate Set",
    category: "Chocolate",
    badge: "Handmade",
    image:
      "https://images.unsplash.com/photo-1549007953-9b53f6b6f90a?q=80&w=1200&auto=format&fit=crop",
    description: "Crafted premium chocolate selection with elegant flavors.",
    price: 45,
    oldPrice: 60,
    rating: 4,
    isNew: true,
  },
  {
    id: 4,
    title: "Signature Gift Pack",
    category: "Gift Hampers",
    badge: "Trending",
    image:
      "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=1200&auto=format&fit=crop",
    description: "Premium chocolate gift hamper with assorted delights.",
    price: 68,
    oldPrice: 92,
    rating: 5,
    isNew: false,
  },
  {
    id: 5,
    title: "Birthday Cake - Red Velvet",
    category: "Cakes",
    badge: "Fresh Baked",
    image:
      "https://images.unsplash.com/photo-1586788224331-947f68671cf1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Moist red velvet cake with cream cheese frosting, perfect for birthdays.",
    price: 45,
    oldPrice: 58,
    rating: 5,
    isNew: false,
  },
  {
    id: 6,
    title: "Sunflower Delight Bouquet",
    category: "Flowers",
    badge: "Cheerful",
    image:
      "https://images.unsplash.com/photo-1490750967868-88aa4486c946?q=80&w=1200&auto=format&fit=crop",
    description: "Bright sunflowers arranged with seasonal greens.",
    price: 35,
    oldPrice: 48,
    rating: 4,
    isNew: false,
  },
  {
    id: 7,
    title: "Personalized Name Necklace",
    category: "Personalized",
    badge: "Custom Made",
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop",
    description: "14k gold plated necklace with custom name engraving.",
    price: 89,
    oldPrice: 120,
    rating: 5,
    isNew: true,
  },
  {
    id: 8,
    title: "Romantic Dinner Combo",
    category: "Combos",
    badge: "Date Night",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop",
    description:
      "Wine, chocolates, and roses for the perfect romantic evening.",
    price: 79,
    oldPrice: 105,
    rating: 5,
    isNew: false,
  },
  {
    id: 9,
    title: "Indoor Plant - Peace Lily",
    category: "Plants",
    badge: "Eco Friendly",
    image:
      "https://images.unsplash.com/photo-1593697971681-d2ce9af13bfb?q=80&w=1200&auto=format&fit=crop",
    description: "Low-maintenance peace lily that purifies air and brings joy.",
    price: 32,
    oldPrice: 45,
    rating: 4,
    isNew: false,
  },
  {
    id: 10,
    title: "Chocolate Strawberry Box",
    category: "Chocolate",
    badge: "Gourmet",
    image:
      "https://images.unsplash.com/photo-1587315288902-0be61e3e6c3e?q=80&w=1200&auto=format&fit=crop",
    description: "Fresh strawberries dipped in premium Belgian chocolate.",
    price: 38,
    oldPrice: 52,
    rating: 5,
    isNew: false,
  },
  {
    id: 11,
    title: "Anniversary Cake - 2 Tier",
    category: "Cakes",
    badge: "Celebration",
    image:
      "https://images.unsplash.com/photo-1535141192574-5d4897c12636?q=80&w=1200&auto=format&fit=crop",
    description: "Elegant two-tier vanilla cake with buttercream flowers.",
    price: 85,
    oldPrice: 110,
    rating: 5,
    isNew: false,
  },
  {
    id: 12,
    title: "Luxury Spa Hamper",
    category: "Gift Hampers",
    badge: "Self Care",
    image:
      "https://images.unsplash.com/photo-1604603815783-2bd94c5a819f?q=80&w=1200&auto=format&fit=crop",
    description: "Relaxing spa essentials: candles, bath salts, and lotions.",
    price: 55,
    oldPrice: 75,
    rating: 4,
    isNew: true,
  },
  {
    id: 13,
    title: "Mixed Roses & Lilies",
    category: "Flowers",
    badge: "Romantic",
    image:
      "https://images.unsplash.com/photo-1582819506926-005d9524e886?q=80&w=1200&auto=format&fit=crop",
    description: "Stunning mix of red roses and white lilies.",
    price: 48,
    oldPrice: 65,
    rating: 5,
    isNew: false,
  },
  {
    id: 14,
    title: "Engraved Photo Frame",
    category: "Personalized",
    badge: "Keepsake",
    image:
      "https://images.unsplash.com/photo-1606828197523-6baecdb7087b?q=80&w=1200&auto=format&fit=crop",
    description: "Wooden frame with custom engraving and photo slot.",
    price: 29,
    oldPrice: 42,
    rating: 4,
    isNew: false,
  },
  {
    id: 15,
    title: "Kids Birthday Combo",
    category: "Combos",
    badge: "Party Time",
    image:
      "https://images.unsplash.com/photo-1559617309-f827781aa6b8?q=80&w=1200&auto=format&fit=crop",
    description: "Cake, balloons, and small gift for children's birthdays.",
    price: 49,
    oldPrice: 68,
    rating: 5,
    isNew: true,
  },
  {
    id: 16,
    title: "Silver Infinity Bracelet",
    category: "Jewelry",
    badge: "Elegant",
    image:
      "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=1200&auto=format&fit=crop",
    description: "Sterling silver bracelet with infinity symbol.",
    price: 42,
    oldPrice: 60,
    rating: 4,
    isNew: false,
  },
  {
    id: 17,
    title: "Bonsai Tree - Zen Garden",
    category: "Plants",
    badge: "Mindful",
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1200&auto=format&fit=crop",
    description: "Beautiful bonsai tree for meditation and decor.",
    price: 65,
    oldPrice: 85,
    rating: 5,
    isNew: false,
  },
  {
    id: 18,
    title: "Chocolate Truffle Cake",
    category: "Cakes",
    badge: "Rich",
    image:
      "https://images.unsplash.com/photo-1606890658317-7d2e8bd92b78?q=80&w=1200&auto=format&fit=crop",
    description: "Decadent chocolate truffle cake with ganache topping.",
    price: 42,
    oldPrice: 56,
    rating: 5,
    isNew: false,
  },
];

const features = [
  {
    icon: Gem,
    title: "Premium Ingredients",
    description: "Crafted using high-quality cocoa and luxury ingredients.",
  },
  {
    icon: Gift,
    title: "Luxury Packaging",
    description: "Elegant presentation perfect for gifting and celebrations.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable delivery across major Australian cities.",
  },
];
