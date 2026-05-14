"use client";

import Image from "next/image";
import {
  Gift,
  Pencil,
  CreditCard,
  Truck,
  Package,
  Heart,
  Star,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full bg-[#f4dcc4] px-4 py-1 text-sm font-medium text-[#c46b2d]">
            Simple & Seamless
          </span>

          <h1 className="mt-6 text-5xl font-bold tracking-tight md:text-6xl">
            How It Works
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6f5a4d]">
            Sending gifts from Sri Lanka to Worldwide has never been easier.
            From choosing the perfect surprise to doorstep delivery, we handle
            everything with care.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="relative rounded-3xl border-[#eadfd4] bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <CardContent className="p-8">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff2e4]">
                  <step.icon className="h-7 w-7 text-[#d96c28]" />
                </div>

                <span className="absolute right-6 top-6 text-4xl font-bold text-[#f3d7c2]">
                  {index + 1}
                </span>

                <h3 className="text-2xl font-semibold">{step.title}</h3>

                <p className="mt-4 leading-7 text-[#6f5a4d]">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Delivery Flow */}
      <section className="container mx-auto px-4 py-20">
        <Card className="rounded-[32px] border-[#eadfd4] bg-white shadow-sm">
          <CardContent className="p-10">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d96c28]">
                Delivery Flow
              </p>

              <h2 className="mt-4 text-4xl font-bold">
                From Sri Lanka to Worldwide
              </h2>
            </div>

            <div className="mt-14 flex flex-col items-center justify-between gap-8 lg:flex-row">
              {flow.map((item, index) => (
                <div key={index} className="flex items-center gap-8">
                  <div className="text-center">
                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#fff2e4]">
                      <item.icon className="h-9 w-9 text-[#d96c28]" />
                    </div>

                    <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

                    <p className="mt-2 text-sm text-[#6f5a4d]">
                      {item.description}
                    </p>
                  </div>

                  {index !== flow.length - 1 && (
                    <span className="hidden text-4xl text-[#d96c28] lg:block">
                      →
                    </span>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Why Choose Us */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Image Side */}
          <div className="relative overflow-hidden rounded-[32px] shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop"
              alt="Working desk"
              width={1200}
              height={800}
              className="h-full w-full object-cover"
            />

            <Card className="absolute bottom-6 left-6 w-64 rounded-3xl border-0 bg-white/95 shadow-xl backdrop-blur">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fff2e4]">
                  <Star className="h-6 w-6 text-[#d96c28]" />
                </div>

                <h4 className="text-xl font-semibold">Trusted by Thousands</h4>

                <p className="mt-3 text-sm leading-6 text-[#6f5a4d]">
                  Families across the world trust us to create meaningful
                  gifting experiences.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d96c28]">
              Why Choose Us
            </p>

            <h2 className="mt-4 text-5xl font-bold leading-tight">
              Built Around Meaningful Connections
            </h2>

            <div className="mt-10 space-y-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-5">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#fff2e4]">
                    <feature.icon className="h-7 w-7 text-[#d96c28]" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-semibold">{feature.title}</h3>

                    <p className="mt-2 leading-7 text-[#6f5a4d]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container mx-auto max-w-4xl px-4 pb-24">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#d96c28]">
            FAQ
          </p>

          <h2 className="mt-4 text-5xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-12">
          <Accordion type="single" collapsible className="space-y-5">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border border-[#eadfd4] bg-white px-6"
              >
                <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="pb-6 text-[#6f5a4d]">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 pb-20">
        <div className="relative overflow-hidden rounded-[36px] bg-gradient-to-r from-[#c95414] to-[#de6a2d] px-8 py-20 text-center text-white shadow-xl">
          <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          <div className="relative z-10">
            <h2 className="text-5xl font-bold">Ready to Send a Gift?</h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-orange-100">
              Start browsing beautiful gifts curated for every celebration and
              every loved one across Worldwide.
            </p>

            <Button
              size="lg"
              className="mt-10 rounded-full bg-white px-10 py-7 text-lg font-semibold text-[#c95414] hover:bg-orange-100"
            >
              Browse Gifts
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const steps = [
  {
    icon: Gift,
    title: "Choose a Gift",
    description:
      "Browse flowers, cakes, hampers and personalized gifts curated for every occasion.",
  },
  {
    icon: Pencil,
    title: "Add Details",
    description:
      "Include recipient details, personalized notes and delivery preferences.",
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    description:
      "Complete your order securely with fast online payment options.",
  },
  {
    icon: Truck,
    title: "Delivered with Love",
    description:
      "Your gift is beautifully prepared and delivered across Worldwide on time.",
  },
];

const flow = [
  {
    icon: Heart,
    title: "Sri Lanka",
    description: "Gifts sourced with care",
  },
  {
    icon: Package,
    title: "Packed",
    description: "Beautifully wrapped & prepared",
  },
  {
    icon: Globe,
    title: "Worldwide",
    description: "Delivered to your loved ones",
  },
];

const features = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable and timely delivery across major Worldwiden cities.",
  },
  {
    icon: Gift,
    title: "Premium Presentation",
    description:
      "Every gift is packaged beautifully to create unforgettable moments.",
  },
  {
    icon: Heart,
    title: "Personalized Experience",
    description:
      "Add messages, special requests and custom touches for every order.",
  },
];

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most deliveries are completed within 1–3 business days depending on the location in Worldwide.",
  },
  {
    question: "Can I schedule a future delivery?",
    answer: "Yes, you can select a preferred delivery date during checkout.",
  },
  {
    question: "Do you offer personalized messages?",
    answer:
      "Absolutely. Every order can include a custom greeting message for your loved ones.",
  },
];
