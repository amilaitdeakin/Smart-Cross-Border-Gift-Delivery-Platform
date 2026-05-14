"use client";

import Image from "next/image";
import { Gift, Truck, Gem } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ShopByOccasionPage() {
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
      {/* Hero */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <Badge className="rounded-full bg-[#fde8d7] px-4 py-1 text-[#d96c28] hover:bg-[#fde8d7]">
            Celebrate Every Moment
          </Badge>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            Shop by Occasion
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f5a4d]">
            Find thoughtful gifts for birthdays, anniversaries, graduations,
            festive celebrations and every meaningful moment between Sri Lanka
            and Worldwide.
          </p>
        </div>
      </section>

      {/* Tabs */}
      <section className="border-y border-[#ebe1d7] bg-white/40">
        <div className="container mx-auto flex flex-wrap items-center justify-center gap-3 px-4 py-5">
          {tabs.map((tab, index) => (
            <Button
              key={index}
              variant={index === 0 ? "default" : "outline"}
              className={
                index === 0
                  ? "rounded-full bg-[#d96c28] text-white hover:bg-[#c85f20]"
                  : "rounded-full border-[#e7d8ca] bg-white text-[#5e4739] hover:bg-[#fff4ec]"
              }
            >
              {tab}
            </Button>
          ))}
        </div>
      </section>

      {/* Occasion Cards */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {occasions.map((item, index) => (
            <Card
              key={index}
              className="group overflow-hidden rounded-[28px] border-0 bg-transparent shadow-xl"
            >
              <div className="relative h-[420px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Badge */}
                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#2d1b12] shadow">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-3xl font-bold">{item.title}</h3>

                  <p className="mt-3 text-sm leading-6 text-white/90">
                    {item.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
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
              across Worldwide.
            </p>

            <Button
              size="lg"
              className="mt-10 rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#c95414] hover:bg-orange-100"
            >
              Explore Chocolates
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const tabs = [
  "All Occasions",
  "Birthdays",
  "Anniversaries",
  "Weddings",
  "Graduations",
  "Festivals",
  "New Baby",
];

const occasions = [
  {
    title: "Birthdays",
    badge: "Most Popular",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1200&auto=format&fit=crop",
    description:
      "Surprise loved ones with cakes, flowers, gourmet hampers and unforgettable birthday gifts.",
  },
  {
    title: "Anniversaries",
    badge: "Romantic Picks",
    image:
      "https://images.unsplash.com/photo-1518199266791-5375a83190b7?q=80&w=1200&auto=format&fit=crop",
    description:
      "Express your love with chocolates and romantic surprise gifts for your special someone.",
  },
  {
    title: "Weddings",
    badge: "Elegant Choices",
    image:
      "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=1200&auto=format&fit=crop",
    description:
      "Send premium gifts and heartfelt wedding celebrations to happy couples.",
  },
  {
    title: "Graduations",
    badge: "Proud Moments",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1200&auto=format&fit=crop",
    description:
      "Celebrate achievements with meaningful congratulation gifts and hampers.",
  },
  {
    title: "Festivals",
    badge: "Seasonal Favorites",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    description:
      "Delight families with festive sweets and seasonal celebration gifts.",
  },
  {
    title: "New Baby",
    badge: "New Arrivals",
    image:
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?q=80&w=1200&auto=format&fit=crop",
    description:
      "Adorable baby hampers and thoughtful gifts for growing families.",
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
    description: "Reliable delivery across major Worldwiden cities.",
  },
];
