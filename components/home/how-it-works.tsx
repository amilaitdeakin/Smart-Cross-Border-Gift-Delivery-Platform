"use client";

import Link from "next/link";
import {
  Gift,
  MapPin,
  Heart,
  Sparkles,
  Package,
  Truck,
  Clock,
  Star,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Choose a Gift",
      description:
        "Browse our collection of fresh flowers, delicious cakes, and unique custom gifts from Sri Lanka.",
      icon: Gift,
      color: "from-amber-500 to-orange-500",
      features: ["500+ gift options", "Fresh flowers", "Customizable cakes"],
    },
    {
      number: "02",
      title: "Select Delivery",
      description:
        "Pick your receiver's location in Australia and choose a convenient delivery time that works for you.",
      icon: MapPin,
      color: "from-orange-500 to-red-500",
      features: ["Same day delivery", "Track in real-time", "15+ cities"],
    },
    {
      number: "03",
      title: "Surprise Them",
      description:
        "We deliver with love. Track your gift in real-time and watch their face light up when it arrives!",
      icon: Heart,
      color: "from-red-500 to-pink-500",
      features: ["Surprise option", "Real-time tracking", "Delivery updates"],
    },
  ];

  return (
    <section className="py-24 bg-[#fff9f4] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(200,98,42,0.02)_1px,transparent_0)] bg-size-[40px_40px]" />

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-linear-to-r from-orange-200/10 to-amber-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-linear-to-r from-amber-200/10 to-orange-200/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#c8622a] border-none px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline" />
            Simple 3-Step Process
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a0a00] mb-6">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Sending love across borders has never been easier. Follow these
            three simple steps to make your loved ones smile.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connecting Line (hidden on mobile) */}
          <div className="hidden md:block absolute top-32 left-[20%] right-[20%] h-0.5 bg-linear-to-r from-transparent via-orange-200 to-transparent" />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative group">
                {/* Step Number - Large Background */}
                <div className="absolute -top-6 -right-4 text-8xl font-bold text-orange-100/50 select-none">
                  {step.number}
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg border border-orange-100 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative z-10">
                  {/* Icon Container */}
                  <div
                    className={`w-20 h-20 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Step Title */}
                  <h3 className="text-2xl font-bold text-[#1a0a00] mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2">
                    {step.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-2 text-sm text-gray-500"
                      >
                        <CheckCircle className="h-4 w-4 text-[#c8622a]" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Step Indicator */}
                  <div className="mt-6 pt-4 border-t border-orange-100 flex items-center justify-between">
                    <span className="text-xs font-medium text-[#c8622a]">
                      Step {step.number}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-[#c8622a] transition-colors">
                      <ArrowRight className="h-4 w-4 text-[#c8622a] group-hover:text-white transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-orange-100">
            <Clock className="h-5 w-5 text-[#c8622a]" />
            <span className="text-gray-600">Average delivery time:</span>
            <span className="font-semibold text-[#1a0a00]">2-4 hours</span>
            <span className="text-gray-400 mx-2">•</span>
            <Truck className="h-5 w-5 text-[#c8622a]" />
            <span className="text-gray-600">Same day available</span>
          </div>

          <div className="mt-8">
            <Button
              size="lg"
              className="bg-[#c8622a] hover:bg-[#b5531e] text-white px-8 h-14 text-base rounded-full shadow-lg shadow-[#c8622a]/20 hover:shadow-xl transition-all"
              asChild
            >
              <Link href="/gifts">
                Start Sending Gifts
                <Gift className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: "10K+", label: "Deliveries", icon: Package },
            { number: "4.9", label: "Rating", icon: Star },
            { number: "15", label: "Cities", icon: MapPin },
            { number: "30min", label: "Avg. Response", icon: Clock },
          ].map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-orange-100 text-[#c8622a] mb-3">
                  <StatIcon className="h-6 w-6" />
                </div>
                <div className="text-2xl font-bold text-[#1a0a00]">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
