"use client";

import {
  Cake,
  ChevronRight,
  Clock,
  Flower2,
  Gift,
  MapPin,
  Play,
  Shield,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-linear-to-br from-amber-50 via-orange-50 to-amber-50 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(200,98,42,0.03)_1px,transparent_0)] bg-size-[40px_40px]" />

      {/* Animated Orbs */}
      <div className="absolute w-150 h-150 bg-linear-to-r from-amber-200/10 to-orange-200/10 rounded-full -top-50 -right-50 animate-float" />
      <div className="absolute w-100 h-100 bg-linear-to-r from-orange-200/10 to-amber-200/10 rounded-full -bottom-25 -left-25 animate-float-slow" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-100/80 text-[#c8622a] border border-orange-200 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Sparkles className="h-4 w-4" />
              <span>✨ Cross-Border Gift Delivery</span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-[#1a0a00]">
              Send Love From{" "}
              <span className="bg-linear-to-r from-[#c8622a] to-amber-500 bg-clip-text text-transparent">
                Sri Lanka
              </span>
              <br />
              To{" "}
              <span className="bg-linear-to-r from-[#c8622a] to-amber-500 bg-clip-text text-transparent">
                Worldwide
              </span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
              Deliver beautiful gifts to your loved ones across the border.
              Fresh flowers, delicious cakes, and custom presents with surprise
              delivery options.
            </p>

            {/* Stats */}
            <div className="flex items-center gap-8">
              <div>
                <div className="text-3xl font-bold text-[#1a0a00]">10K+</div>
                <div className="text-sm text-gray-500">Happy Deliveries</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1a0a00]">4.9</div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  5,200+ Reviews
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-[#1a0a00]">15</div>
                <div className="text-sm text-gray-500">Cities in Worldwide</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                className="bg-[#c8622a] hover:bg-[#b5531e] text-white px-8 h-14 text-base rounded-full shadow-lg shadow-[#c8622a]/20 hover:shadow-xl transition-all"
                asChild
              >
                <Link href="/gifts">
                  Send a Gift Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-[#c8622a] text-[#c8622a] hover:bg-orange-50 px-8 h-14 text-base rounded-full"
                asChild
              >
                <Link href="/how-it-works">
                  <Play className="mr-2 h-5 w-5 fill-current" />
                  How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 pt-6">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                <span className="text-sm text-gray-600">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-[#c8622a]" />
                <span className="text-sm text-gray-600">Same Day Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-[#c8622a]" />
                <span className="text-sm text-gray-600">Tracked Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Content - Floating Cards */}
          <div className="relative hidden lg:block h-150">
            {/* Main Gift Card */}
            <div className="absolute top-20 left-0 w-80 z-20 animate-float-card">
              <div className="bg-white rounded-2xl p-6 shadow-2xl border border-orange-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 bg-linear-to-br from-amber-500 to-orange-700 rounded-2xl flex items-center justify-center">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg text-[#1a0a00]">
                      Birthday Surprise
                    </h3>
                    <p className="text-sm text-gray-500">
                      Chocolate Cake + Roses
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Badge className="bg-orange-100 text-[#c8622a] border-none">
                    Surprise Ready
                  </Badge>
                  <span className="text-[#c8622a] font-bold">$89 AUD</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" /> Delivery to Sydney • Today
                </div>
              </div>
            </div>

            {/* Flower Card */}
            <div className="absolute top-40 right-0 w-72 z-10 animate-float-card-delay">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Flower2 className="h-6 w-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a0a00]">
                      Fresh Roses Bouquet
                    </h4>
                    <p className="text-xs text-gray-500">12 Red Roses</p>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#c8622a] font-semibold">$65 AUD</span>
                  <Badge
                    variant="outline"
                    className="border-[#c8622a] text-[#c8622a]"
                  >
                    Express
                  </Badge>
                </div>
              </div>
            </div>

            {/* Cake Card */}
            <div className="absolute bottom-20 left-20 w-72 z-0 animate-float-card-delay-2">
              <div className="bg-white rounded-2xl p-5 shadow-xl border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Cake className="h-6 w-6 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#1a0a00]">
                      Chocolate Fudge Cake
                    </h4>
                    <p className="text-xs text-gray-500">1kg • Eggless</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.9</span>
                  <span className="text-sm text-gray-500">(128 reviews)</span>
                </div>
              </div>
            </div>

            {/* Delivery Person */}
            <div
              className="absolute bottom-0 right-20 z-30 animate-bounce"
              style={{ animationDuration: "3s" }}
            >
              <div className="bg-white rounded-full p-2 shadow-lg flex items-center gap-3 border-2 border-[#c8622a]">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-orange-100 text-[#c8622a]">
                    DP
                  </AvatarFallback>
                </Avatar>
                <div className="pr-3">
                  <p className="text-xs text-gray-500">Out for delivery</p>
                  <p className="text-sm font-semibold text-[#1a0a00]">
                    10 min away
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Categories */}
        <div className="mt-20 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm text-gray-500 mr-2">Popular:</span>
          {[
            "Birthday",
            "Anniversary",
            "Valentine's Day",
            "Mother's Day",
            "Get Well",
            "Just Because",
          ].map((item) => (
            <Link
              key={item}
              href={`/occasions?q=${item.toLowerCase()}`}
              className="bg-white hover:bg-[#c8622a] hover:text-white px-5 py-2 rounded-full text-sm font-medium text-[#5c3010] border border-orange-200 transition-all hover:scale-105"
            >
              {item}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
