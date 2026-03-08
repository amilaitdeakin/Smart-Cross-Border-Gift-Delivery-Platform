"use client";

import {
  Calendar,
  Heart,
  MapPin,
  MessageCircle,
  Quote,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  const [expandedReviews, setExpandedReviews] = useState<number[]>([]);
  const [helpfulClicks, setHelpfulClicks] = useState<number[]>([]);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Wijesinghe",
      location: "Colombo → Sydney",
      avatar: "SW",
      avatarColor: "bg-pink-100 text-pink-600",
      rating: 5,
      date: "2 days ago",
      verified: true,
      purchase: "Birthday Bliss Combo",
      comment:
        "My sister was so surprised! The cake was fresh and the flowers beautiful. The delivery person even helped set up a small surprise. Thank you LankaToAus for making her birthday special!",
      fullComment:
        "My sister was so surprised! The cake was fresh and the flowers beautiful. The delivery person even helped set up a small surprise with candles and everything. She cried happy tears! The tracking feature was spot on and I knew exactly when it would arrive. Thank you LankaToAus for making her birthday so special from so far away!",
      helpful: 24,
      image: "🎂",
    },
    {
      id: 2,
      name: "Michael Perera",
      location: "Kandy → Melbourne",
      avatar: "MP",
      avatarColor: "bg-blue-100 text-blue-600",
      rating: 5,
      date: "1 week ago",
      verified: true,
      purchase: "Eternal Love Roses",
      comment:
        "Excellent service! Tracked the delivery in real-time and it arrived exactly when promised. The roses were absolutely stunning - just like the pictures.",
      fullComment:
        "Excellent service! Tracked the delivery in real-time and it arrived exactly when promised. The roses were absolutely stunning - just like the pictures. My wife was overjoyed for our anniversary. Will definitely be using this service again for all special occasions.",
      helpful: 18,
      image: "🌹",
    },
    {
      id: 3,
      name: "Emily Fernando",
      location: "Galle → Brisbane",
      avatar: "EF",
      avatarColor: "bg-purple-100 text-purple-600",
      rating: 5,
      date: "3 days ago",
      verified: true,
      purchase: "Surprise Delivery",
      comment:
        "The surprise delivery feature is amazing! My mum had no idea until the doorbell rang. Her reaction was priceless. The delivery person even recorded a video!",
      fullComment:
        "The surprise delivery feature is amazing! My mum had no idea until the doorbell rang. Her reaction was priceless. The delivery person even recorded a short video of her opening the gift. Living in different countries is hard, but this service makes it feel like we're closer. 10/10 recommend!",
      helpful: 32,
      image: "🎁",
    },
    {
      id: 4,
      name: "David Ratnayake",
      location: "Colombo → Perth",
      avatar: "DR",
      avatarColor: "bg-green-100 text-green-600",
      rating: 4,
      date: "5 days ago",
      verified: true,
      purchase: "Chocolate Fudge Cake",
      comment:
        "The cake was delicious and arrived in perfect condition. Only giving 4 stars because delivery was 15 mins late, but the quality made up for it.",
      fullComment:
        "The cake was delicious and arrived in perfect condition. Only giving 4 stars because delivery was 15 mins late, but the quality made up for it. The chocolate fudge cake was rich and moist - my brother said it was the best cake he's had in Australia. Would order again for sure!",
      helpful: 9,
      image: "🍰",
    },
    {
      id: 5,
      name: "Priya Krishnan",
      location: "Jaffna → Sydney",
      avatar: "PK",
      avatarColor: "bg-orange-100 text-orange-600",
      rating: 5,
      date: "2 weeks ago",
      verified: true,
      purchase: "Anniversary Special",
      comment:
        "Made our 10th anniversary special even though we're 10,000km apart. The champagne was chilled and ready to pop! Such thoughtful service.",
      fullComment:
        "Made our 10th anniversary special even though we're 10,000km apart. The champagne was chilled and ready to pop! Such thoughtful service. They even included a handwritten card with our message. My husband was so touched. Thank you for bridging the distance!",
      helpful: 45,
      image: "🥂",
    },
    {
      id: 6,
      name: "Nuwan Silva",
      location: "Negombo → Melbourne",
      avatar: "NS",
      avatarColor: "bg-cyan-100 text-cyan-600",
      rating: 5,
      date: "4 days ago",
      verified: true,
      purchase: "Get Well Soon Basket",
      comment:
        "My father was in hospital and this arrived just in time. The fruits were fresh and the card was beautifully written. Great service!",
      fullComment:
        "My father was in hospital and this arrived just in time. The fruits were fresh and the card was beautifully written. The hospital staff even commented on how lovely the arrangement was. It really cheered him up during recovery. Great service and very reliable!",
      helpful: 17,
      image: "🧺",
    },
  ];

  const stats = [
    { label: "Happy Customers", value: "10,000+", icon: Heart },
    { label: "5-Star Reviews", value: "4,800+", icon: Star },
    { label: "Cities Covered", value: "15", icon: MapPin },
    { label: "Daily Deliveries", value: "150+", icon: Calendar },
  ];

  const toggleExpand = (id: number) => {
    if (expandedReviews.includes(id)) {
      setExpandedReviews(expandedReviews.filter((reviewId) => reviewId !== id));
    } else {
      setExpandedReviews([...expandedReviews, id]);
    }
  };

  const markHelpful = (id: number) => {
    if (!helpfulClicks.includes(id)) {
      setHelpfulClicks([...helpfulClicks, id]);
    }
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_2px_2px,rgba(200,98,42,0.02)_1px,transparent_0)] bg-size-[40px_40px]" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-linear-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-linear-to-br from-pink-100/20 to-purple-100/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4 bg-orange-100 text-[#c8622a] border-none px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-3.5 w-3.5 mr-1 inline" />
            Social Proof
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a0a00] mb-6">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {`Real stories from real people who've sent love across borders.`}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="bg-[#fff9f4] rounded-2xl p-6 text-center border border-orange-100 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon className="h-6 w-6 text-[#c8622a]" />
                </div>
                <div className="text-2xl font-bold text-[#1a0a00]">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group border border-orange-100 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              <CardContent className="p-6">
                {/* Header with Quote Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12 ring-2 ring-orange-100">
                      <AvatarFallback className={testimonial.avatarColor}>
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-[#1a0a00]">
                        {testimonial.name}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <MapPin className="h-3 w-3" />
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                  <Quote className="h-8 w-8 text-orange-200" />
                </div>

                {/* Rating and Date */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonial.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    {testimonial.verified && (
                      <Badge
                        variant="outline"
                        className="text-[10px] border-green-200 text-green-600 bg-green-50 px-1.5 py-0"
                      >
                        ✓ Verified
                      </Badge>
                    )}
                    <span className="text-xs text-gray-400">
                      {testimonial.date}
                    </span>
                  </div>
                </div>

                {/* Purchase Info */}
                <div className="mb-3 text-xs font-medium text-[#c8622a] bg-orange-50 inline-block px-2 py-1 rounded-full">
                  Purchased: {testimonial.purchase}
                </div>

                {/* Comment */}
                <div className="text-gray-600 text-sm mb-4">
                  <p className="italic leading-relaxed">
                    {`"${
                      expandedReviews.includes(testimonial.id)
                        ? testimonial.fullComment
                        : testimonial.comment
                    }"`}
                  </p>
                  {testimonial.fullComment.length >
                    testimonial.comment.length && (
                    <button
                      onClick={() => toggleExpand(testimonial.id)}
                      className="text-[#c8622a] text-xs font-medium mt-2 hover:underline focus:outline-none"
                    >
                      {expandedReviews.includes(testimonial.id)
                        ? "Show less"
                        : "Read more"}
                    </button>
                  )}
                </div>

                {/* Footer with Helpful Button */}
                <div className="flex items-center justify-between pt-3 border-t border-orange-100">
                  <button
                    onClick={() => markHelpful(testimonial.id)}
                    disabled={helpfulClicks.includes(testimonial.id)}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      helpfulClicks.includes(testimonial.id)
                        ? "text-[#c8622a]"
                        : "text-gray-400 hover:text-[#c8622a]"
                    }`}
                  >
                    <ThumbsUp
                      className={`h-3.5 w-3.5 ${
                        helpfulClicks.includes(testimonial.id)
                          ? "fill-[#c8622a]"
                          : ""
                      }`}
                    />
                    <span>
                      {helpfulClicks.includes(testimonial.id)
                        ? "Thank you for feedback"
                        : `Helpful (${testimonial.helpful + (helpfulClicks.includes(testimonial.id) ? 1 : 0)})`}
                    </span>
                  </button>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MessageCircle className="h-3.5 w-3.5" />
                    <span>Share</span>
                  </div>
                </div>
              </CardContent>

              {/* Hover Overlay Effect */}
              <div className="absolute inset-0 bg-[#c8622a]/0 group-hover:bg-[#c8622a]/5 transition-colors duration-300 pointer-events-none" />
            </Card>
          ))}
        </div>

        {/* Overall Rating Banner */}
        <div className="mt-12 bg-[#fff9f4] rounded-2xl p-6 border border-orange-100 text-center">
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-3">
              <div className="text-4xl font-bold text-[#1a0a00]">4.9</div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
            </div>
            <div className="h-8 w-px bg-orange-200 hidden md:block" />
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-red-500 fill-red-500" />
                <span className="text-gray-600">Trusted by thousands</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#c8622a]" />
                <span className="text-gray-600">5,200+ verified reviews</span>
              </div>
            </div>
          </div>
        </div>

        {/* Note: Display-only section */}
        <p className="text-center text-xs text-gray-400 mt-6">
          * Real customer reviews • No purchase required to read reviews
        </p>
      </div>
    </section>
  );
}
