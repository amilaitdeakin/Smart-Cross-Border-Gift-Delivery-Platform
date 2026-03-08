"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Gift,
  Heart,
  Star,
  ShoppingCart,
  Eye,
  Sparkles,
  Flower2,
  Cake,
  Candy,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function FeaturedGifts() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);

  const featuredGifts = [
    {
      id: 1,
      name: "Birthday Bliss Combo",
      description: "Chocolate Cake + 6 Red Roses + Card",
      price: 89,
      originalPrice: 109,
      rating: 4.9,
      reviews: 128,
      image: "/assets/Gemini_Generated_Image_nmy1wrnmy1wrnmy1.png",
      category: "Combo",
      badge: "Best Seller",
      badgeColor: "bg-amber-500",
      icon: Gift,
      colors: ["from-pink-100 to-rose-100", "text-pink-600"],
    },
    {
      id: 2,
      name: "Eternal Love Roses",
      description: "12 Long Stem Red Roses in Premium Box",
      price: 65,
      originalPrice: 79,
      rating: 4.8,
      reviews: 93,
      image: "/assets/Gemini_Generated_Image_yhnr2fyhnr2fyhnr.png",
      category: "Flowers",
      badge: "Fresh",
      badgeColor: "bg-green-500",
      icon: Flower2,
      colors: ["from-red-100 to-pink-100", "text-red-600"],
    },
    {
      id: 3,
      name: "Chocolate Fudge Cake",
      description: "1kg Rich Chocolate Cake with Nuts",
      price: 49,
      originalPrice: 59,
      rating: 5.0,
      reviews: 215,
      image: "/assets/Gemini_Generated_Image_7irinn7irinn7iri.png",
      category: "Cakes",
      badge: "Popular",
      badgeColor: "bg-orange-500",
      icon: Cake,
      colors: ["from-amber-100 to-orange-100", "text-amber-600"],
    },
    {
      id: 4,
      name: "Belgian Chocolate Box",
      description: "24 Piece Assorted Belgian Chocolates",
      price: 39,
      originalPrice: 49,
      rating: 4.9,
      reviews: 167,
      image: "/assets/Gemini_Generated_Image_retnitretnitretn.png",
      category: "Chocolates",
      badge: "Premium",
      badgeColor: "bg-purple-500",
      icon: Candy,
      colors: ["from-amber-100 to-brown-100", "text-amber-700"],
    },
    {
      id: 5,
      name: "Anniversary Special",
      description: "Red Roses + Champagne + Chocolates",
      price: 129,
      originalPrice: 159,
      rating: 5.0,
      reviews: 84,
      image: "/assets/Gemini_Generated_Image_4i8uvx4i8uvx4i8u.png",
      category: "Combo",
      badge: "Luxury",
      badgeColor: "bg-purple-500",
      icon: Gift,
      colors: ["from-purple-100 to-pink-100", "text-purple-600"],
    },
    // Using gift1 again for the 6th item (you can replace with more images if you have them)
    {
      id: 6,
      name: "Get Well Soon Basket",
      description: "Fruits, Chocolates & Get Well Card",
      price: 59,
      originalPrice: 69,
      rating: 4.7,
      reviews: 56,
      image: "/assets/Gemini_Generated_Image_vbmrbuvbmrbuvbmr.png",
      category: "Wellness",
      badge: "Thoughtful",
      badgeColor: "bg-blue-500",
      icon: Gift,
      colors: ["from-blue-100 to-cyan-100", "text-blue-600"],
    },
    {
      id: 7,
      name: "Just Because Hamper",
      description: "Assorted Treats & Personalised Card",
      price: 79,
      originalPrice: 99,
      rating: 4.8,
      reviews: 42,
      image: "/assets/Gemini_Generated_Image_ruzgp7ruzgp7ruzg.png",
      category: "Hampers",
      badge: "Gift Ready",
      badgeColor: "bg-pink-500",
      icon: Gift,
      colors: ["from-pink-100 to-rose-100", "text-pink-600"],
    },
    {
      id: 8,
      name: "Valentine's Special",
      description: "Rose Petals, Cake & Candle Set",
      price: 99,
      originalPrice: 119,
      rating: 4.9,
      reviews: 138,
      image: "/assets/Gemini_Generated_Image_35wmrx35wmrx35wm.png",
      category: "Romance",
      badge: "Romantic",
      badgeColor: "bg-red-500",
      icon: Heart,
      colors: ["from-red-100 to-rose-100", "text-red-600"],
    },
  ];

  const toggleLike = (id: number) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter((cardId) => cardId !== id));
    } else {
      setLikedCards([...likedCards, id]);
    }
  };

  return (
    <section className="py-24 bg-[#fff9f4] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(200,98,42,0.02)_1px,transparent_0)] bg-size-[40px_40px]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-linear-to-br from-orange-200/10 to-amber-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-linear-to-br from-pink-200/10 to-purple-200/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#c8622a] border-none px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline" />
            Curated Collection
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a0a00] mb-6">
            Featured Gifts
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hand-picked selections from our most loved gifts, perfect for any
            occasion.
          </p>
        </div>

        {/* Gifts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredGifts.map((gift) => (
            <Card
              key={gift.id}
              className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden relative"
              onMouseEnter={() => setHoveredCard(gift.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Image Section */}
              <div className="relative h-48 bg-linear-to-br from-gray-100 to-gray-200 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-size-[20px_20px]" />
                </div>

                {/* Actual Image */}
                <Image
                  src={gift.image}
                  alt={gift.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  priority={gift.id <= 4}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Badge */}
                <Badge
                  className={`absolute top-3 left-3 ${gift.badgeColor} text-white border-none z-10`}
                >
                  {gift.badge}
                </Badge>

                {/* Quick Action Buttons - Appear on Hover */}
                <div
                  className={`absolute inset-x-0 bottom-0 flex justify-center gap-2 p-3 bg-linear-to-t from-black/60 via-black/30 to-transparent transition-all duration-300 z-20 ${
                    hoveredCard === gift.id
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white hover:bg-[#c8622a] hover:text-white transition-colors shadow-lg"
                    onClick={() => console.log("Quick view", gift.id)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full bg-white hover:bg-[#c8622a] hover:text-white transition-colors shadow-lg"
                    onClick={() => console.log("Add to cart", gift.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </Button>
                  <Button
                    size="icon"
                    variant="secondary"
                    className={`rounded-full shadow-lg transition-colors ${
                      likedCards.includes(gift.id)
                        ? "bg-red-500 text-white hover:bg-red-600"
                        : "bg-white hover:bg-[#c8622a] hover:text-white"
                    }`}
                    onClick={() => toggleLike(gift.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${likedCards.includes(gift.id) ? "fill-white" : ""}`}
                    />
                  </Button>
                </div>
              </div>

              {/* Content Section */}
              <CardContent className="p-4">
                {/* Category & Rating */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-[#c8622a] bg-orange-100 px-2 py-1 rounded-full">
                    {gift.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{gift.rating}</span>
                    <span className="text-xs text-gray-400">
                      ({gift.reviews})
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-lg text-[#1a0a00] mb-1 group-hover:text-[#c8622a] transition-colors">
                  {gift.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                  {gift.description}
                </p>

                {/* Price */}
                <div className="flex items-end gap-2">
                  <span className="text-2xl font-bold text-[#c8622a]">
                    ${gift.price}
                  </span>
                  <span className="text-sm text-gray-400 line-through mb-1">
                    ${gift.originalPrice}
                  </span>
                  <span className="text-xs bg-green-100 text-green-600 px-1.5 py-0.5 rounded-full ml-auto">
                    Save ${gift.originalPrice - gift.price}
                  </span>
                </div>

                {/* Divider */}
                <div className="my-3 border-t border-orange-100" />

                {/* Features */}
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${gift.colors[1]}`} />
                    <span>Fresh</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Gift className="h-3 w-3" />
                    <span>Gift Wrap</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>🇦🇺</span>
                    <span>Delivery</span>
                  </div>
                </div>
              </CardContent>

              {/* Hover Overlay Effect */}
              <div
                className={`absolute inset-0 bg-[#c8622a]/0 group-hover:bg-[#c8622a]/5 transition-colors duration-300 pointer-events-none`}
              />
            </Card>
          ))}
        </div>

        {/* View More Indicator (Non-clickable) */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md border border-orange-100">
            <Sparkles className="h-5 w-5 text-[#c8622a]" />
            <span className="text-gray-600">End of Featured Collection</span>
            <span className="text-[#c8622a] font-semibold">8 Gifts</span>
          </div>
        </div>

        {/* Category Tabs (Non-clickable) */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <span className="text-sm text-gray-500 mr-2">Browse:</span>
          {["All", "Flowers", "Cakes", "Chocolates", "Combos", "Hampers"].map(
            (item) => (
              <span
                key={item}
                className={`px-4 py-2 rounded-full text-sm font-medium cursor-default ${
                  item === "All"
                    ? "bg-[#c8622a] text-white"
                    : "bg-white text-gray-600 border border-orange-200"
                }`}
              >
                {item}
              </span>
            ),
          )}
        </div>

        {/* Note: This is a display-only section - no navigation links */}
        <p className="text-center text-xs text-gray-400 mt-4">
          * Hover over cards to see quick actions • Demo showcase only
        </p>
      </div>
    </section>
  );
}
