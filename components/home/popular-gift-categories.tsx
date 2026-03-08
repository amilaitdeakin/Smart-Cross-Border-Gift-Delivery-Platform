"use client";

import {
  ArrowRight,
  Cake,
  Candy,
  Coffee,
  Flower2,
  Gift,
  Heart,
  Package,
  Sparkles,
  Star,
  ToyBrick,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Categories() {
  const mainCategories = [
    {
      name: "Flowers",
      icon: Flower2,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-100",
      textColor: "text-pink-600",
      count: "45+ arrangements",
      href: "/",
      items: ["Roses", "Orchids", "Bouquets", "Flower Boxes"],
    },
    {
      name: "Cakes",
      icon: Cake,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-100",
      textColor: "text-amber-600",
      count: "30+ flavors",
      href: "/",
      items: ["Chocolate", "Fruit", "Birthday", "Custom"],
    },
    {
      name: "Chocolates",
      icon: Candy,
      color: "from-amber-700 to-amber-900",
      bg: "bg-amber-100",
      textColor: "text-amber-700",
      count: "25+ varieties",
      href: "/",
      items: ["Belgian", "Handmade", "Assorted", "Sugar Free"],
    },
    {
      name: "Custom Gifts",
      icon: Package,
      color: "from-purple-500 to-purple-700",
      bg: "bg-purple-100",
      textColor: "text-purple-600",
      count: "50+ options",
      href: "/",
      items: ["Personalized", "Gift Boxes", "Hampers", "Combos"],
    },
  ];

  const occasionCategories = [
    {
      name: "Birthday",
      icon: Gift,
      color: "bg-blue-100 text-blue-600",
      href: "/",
    },
    {
      name: "Anniversary",
      icon: Heart,
      color: "bg-red-100 text-red-600",
      href: "/",
    },
    {
      name: "Wedding",
      icon: Sparkles,
      color: "bg-purple-100 text-purple-600",
      href: "/",
    },
    {
      name: "Get Well",
      icon: Coffee,
      color: "bg-green-100 text-green-600",
      href: "/",
    },
    {
      name: "New Baby",
      icon: ToyBrick,
      color: "bg-yellow-100 text-yellow-600",
      href: "/",
    },
    {
      name: "Just Because",
      icon: Heart,
      color: "bg-pink-100 text-pink-600",
      href: "/",
    },
  ];

  const trendingItems = [
    { name: "Red Roses Bouquet", price: "$65", image: "🌹", sold: "2.5k+" },
    { name: "Chocolate Cake", price: "$49", image: "🍰", sold: "1.8k+" },
    { name: "Belgian Chocolates", price: "$39", image: "🍫", sold: "3.2k+" },
    { name: "Gift Hamper", price: "$89", image: "🧺", sold: "1.2k+" },
    { name: "Birthday Combo", price: "$79", image: "🎁", sold: "2.1k+" },
    { name: "Flower Box", price: "$55", image: "🌸", sold: "1.5k+" },
  ];

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(200,98,42,0.02)_1px,transparent_0)] bg-size-[40px_40px]" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-0 w-72 h-72 bg-linear-to-br from-orange-100/30 to-amber-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-72 h-72 bg-linear-to-br from-pink-100/30 to-purple-100/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#c8622a] border-none px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline" />
            Shop by Category
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a0a00] mb-6">
            Popular Gift Categories
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find the perfect gift for any occasion from our wide range of
            carefully curated categories.
          </p>
        </div>

        {/* Main Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {mainCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                href={category.href}
                className="group relative bg-white rounded-2xl p-6 border border-orange-100 shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                {/* Background Gradient on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                {/* Icon */}
                <div
                  className={`w-16 h-16 ${category.bg} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`h-8 w-8 ${category.textColor}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-[#1a0a00] mb-2 group-hover:text-[#c8622a] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">{category.count}</p>

                {/* Items List */}
                <ul className="space-y-1 mb-4">
                  {category.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-600 flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-[#c8622a]" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* View All Link */}
                <div className="flex items-center gap-1 text-[#c8622a] font-medium text-sm group-hover:gap-2 transition-all">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </div>

                {/* Decorative Number */}
                <div className="absolute bottom-2 right-2 text-6xl font-bold text-orange-100/30 select-none">
                  {index + 1}
                </div>
              </Link>
            );
          })}
        </div>

        {/* Occasion Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-[#1a0a00]">
              Shop by Occasion
            </h3>
            <Link
              href="/occasions"
              className="text-[#c8622a] hover:text-[#b5531e] font-medium flex items-center gap-1 group"
            >
              View All Occasions
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {occasionCategories.map((occasion, index) => {
              const Icon = occasion.icon;
              return (
                <Link
                  key={index}
                  href={occasion.href}
                  className="group text-center"
                >
                  <div
                    className={`${occasion.color} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md group-hover:shadow-lg`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#c8622a] transition-colors">
                    {occasion.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Trending Items */}
        <div className="bg-[#fff9f4] rounded-3xl p-8 border border-orange-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Star className="h-5 w-5 text-[#c8622a] fill-[#c8622a]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a0a00]">Trending Now</h3>
            </div>
            <Badge className="bg-orange-100 text-[#c8622a] border-none">
              Most Popular
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {trendingItems.map((item, index) => (
              <Link
                key={index}
                href={`/gifts?q=${item.name}`}
                className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-orange-50 hover:border-[#c8622a]"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                  {item.image}
                </div>
                <h4 className="font-medium text-[#1a0a00] text-sm mb-1 group-hover:text-[#c8622a]">
                  {item.name}
                </h4>
                <div className="flex items-center justify-between">
                  <span className="text-[#c8622a] font-bold text-sm">
                    {item.price}
                  </span>
                  <span className="text-xs text-gray-500">
                    {item.sold} sold
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-[#c8622a] hover:bg-[#b5531e] text-white px-8 h-14 text-base rounded-full shadow-lg shadow-[#c8622a]/20 hover:shadow-xl transition-all"
            asChild
          >
            <Link href="/gifts">
              Browse All Categories
              <Gift className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
