"use client";

import {
  Baby,
  Briefcase,
  Cake,
  Calendar,
  Church,
  Coffee,
  Flower2,
  Gift as GiftIcon,
  Heart,
  Moon,
  PartyPopper,
  Sparkles,
  Stars,
  Sun,
} from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

export default function OccasionsBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const occasions = [
    {
      id: 1,
      name: "Birthday",
      icon: Cake,
      color: "from-pink-500 to-rose-500",
      bg: "bg-pink-100",
      textColor: "text-pink-600",
      date: "Every day",
      description: "Make their day special",
      emoji: "🎂",
      count: "10K+ birthdays celebrated",
    },
    {
      id: 2,
      name: "Anniversary",
      icon: Heart,
      color: "from-red-500 to-rose-500",
      bg: "bg-red-100",
      textColor: "text-red-600",
      date: "Year round",
      description: "Celebrate love across borders",
      emoji: "💑",
      count: "5K+ anniversaries",
    },
    {
      id: 3,
      name: "Valentine's",
      icon: Heart,
      color: "from-purple-500 to-pink-500",
      bg: "bg-purple-100",
      textColor: "text-purple-600",
      date: "February 14",
      description: "Send love from afar",
      emoji: "❤️",
      count: "3K+ Valentine's deliveries",
    },
    {
      id: 4,
      name: "Mother's Day",
      icon: Flower2,
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-100",
      textColor: "text-amber-600",
      date: "May 12",
      description: "Honor the amazing moms",
      emoji: "🌹",
      count: "4K+ Mother's Day gifts",
    },
    {
      id: 5,
      name: "Father's Day",
      icon: Briefcase,
      color: "from-blue-500 to-cyan-500",
      bg: "bg-blue-100",
      textColor: "text-blue-600",
      date: "September 1",
      description: "Show dad some love",
      emoji: "👔",
      count: "3.5K+ Father's Day gifts",
    },
    {
      id: 6,
      name: "Wedding",
      icon: Church,
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-100",
      textColor: "text-emerald-600",
      date: "All year",
      description: "Perfect wedding gifts",
      emoji: "💒",
      count: "2K+ wedding gifts",
    },
    {
      id: 7,
      name: "New Baby",
      icon: Baby,
      color: "from-yellow-500 to-amber-500",
      bg: "bg-yellow-100",
      textColor: "text-yellow-600",
      date: "Welcome the little one",
      description: "Celebrate new arrivals",
      emoji: "👶",
      count: "1.5K+ baby gifts",
    },
    {
      id: 8,
      name: "Get Well",
      icon: Coffee,
      color: "from-green-500 to-teal-500",
      bg: "bg-green-100",
      textColor: "text-green-600",
      date: "Wishing recovery",
      description: "Send get well wishes",
      emoji: "🤒",
      count: "2K+ get well gifts",
    },
    {
      id: 9,
      name: "Just Because",
      icon: GiftIcon,
      color: "from-purple-500 to-indigo-500",
      bg: "bg-purple-100",
      textColor: "text-purple-600",
      date: "Any day",
      description: "No reason needed",
      emoji: "🎁",
      count: "8K+ surprise gifts",
    },
  ];

  const upcomingOccasions = [
    {
      month: "March",
      events: ["International Women's Day", "St. Patrick's Day", "Holi"],
    },
    {
      month: "April",
      events: ["Easter", "Ramadan", "Sinhala & Tamil New Year"],
    },
    { month: "May", events: ["Mother's Day", "Vesak", "Memorial Day"] },
    {
      month: "June",
      events: ["Father's Day", "Eid al-Adha", "Dragon Boat Festival"],
    },
  ];

  // Auto-rotate occasions for visual interest
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Parallax effect on mouse move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  return (
    <section className="py-24 bg-[#fff9f4] relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0" onMouseMove={handleMouseMove}>
        {/* Gradient Orbs */}
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-linear-to-br from-orange-200/20 to-pink-200/20 rounded-full blur-3xl transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`,
          }}
        />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-linear-to-br from-purple-200/20 to-amber-200/20 rounded-full blur-3xl transition-transform duration-300"
          style={{
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
        />
      </div>

      {/* Confetti Effect (static decorative) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-orange-300/30 rounded-full"
            style={{
              // eslint-disable-next-line react-hooks/rules-of-hooks
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `float-${i % 3} ${5 + (i % 5)}s infinite`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="mb-4 bg-linear-to-r from-orange-100 to-pink-100 text-[#c8622a] border-none px-4 py-1.5 text-sm font-medium">
            <PartyPopper className="h-3.5 w-3.5 mr-1 inline" />
            Celebrate Every Moment
          </Badge>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#1a0a00] mb-4">
            Special Occasions
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            No matter the occasion, we have the perfect gift to make it
            memorable.
          </p>
        </div>

        {/* Animated Banner */}
        <div className="relative mb-16">
          {/* Main Banner Card */}
          <div className="bg-linear-to-r from-[#1a0a00] to-[#2d1200] rounded-3xl p-1">
            <div className="bg-[#fff9f4] rounded-2xl p-8 border border-orange-100">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#c8622a]" />
                    <span className="text-sm font-medium text-[#c8622a]">
                      Upcoming Celebrations
                    </span>
                  </div>

                  {/* Rotating Occasion Display */}
                  <div className="relative h-32">
                    {occasions.slice(0, 3).map((occasion, index) => (
                      <div
                        key={occasion.id}
                        className={`absolute inset-0 transition-all duration-500 transform ${
                          index === currentSlide
                            ? "opacity-100 translate-x-0"
                            : index < currentSlide
                              ? "opacity-0 -translate-x-full"
                              : "opacity-0 translate-x-full"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 ${occasion.bg} rounded-2xl flex items-center justify-center`}
                          >
                            <occasion.icon
                              className={`h-8 w-8 ${occasion.textColor}`}
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="text-2xl font-bold text-[#1a0a00]">
                                {occasion.name}
                              </h3>
                              <span className="text-2xl">{occasion.emoji}</span>
                            </div>
                            <p className="text-gray-600">
                              {occasion.description}
                            </p>
                            <p className="text-sm text-[#c8622a] mt-1">
                              {occasion.count}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Dots Indicator */}
                  <div className="flex gap-2">
                    {[0, 1, 2].map((index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all ${
                          index === currentSlide
                            ? "w-8 bg-[#c8622a]"
                            : "w-2 bg-orange-200 hover:bg-orange-300"
                        }`}
                        aria-label={`View occasion ${index + 1}`}
                      />
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-linear-to-br from-orange-200 to-amber-200 border-2 border-white flex items-center justify-center text-xs font-medium text-[#c8622a]"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-sm text-gray-500">
                      <span className="font-semibold text-[#1a0a00]">500+</span>{" "}
                      gifts delivered today
                    </div>
                  </div>
                </div>

                {/* Right Content - Decorative Calendar */}
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-xl border border-orange-100">
                    <h4 className="font-semibold text-[#1a0a00] mb-4 flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-[#c8622a]" />
                      {` This Month's Occasions`}
                    </h4>
                    <div className="space-y-3">
                      {upcomingOccasions[0].events.map((event, index) => (
                        <div key={index} className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Stars className="h-4 w-4 text-[#c8622a]" />
                          </div>
                          <div>
                            <p className="font-medium text-[#1a0a00]">
                              {event}
                            </p>
                            <p className="text-xs text-gray-400">
                              {upcomingOccasions[0].month} 2026
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Floating Decorations */}
                  <div className="absolute -top-4 -right-4 animate-bounce">
                    <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-xl shadow-lg">
                      🎉
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Occasions Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
          {occasions.map((occasion) => {
            const Icon = occasion.icon;
            return (
              <div
                key={occasion.id}
                className="group bg-white rounded-xl p-4 border border-orange-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div
                    className={`w-10 h-10 ${occasion.bg} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <Icon className={`h-5 w-5 ${occasion.textColor}`} />
                  </div>
                  <span className="text-2xl">{occasion.emoji}</span>
                </div>
                <h3 className="font-semibold text-[#1a0a00] mb-1">
                  {occasion.name}
                </h3>
                <p className="text-xs text-gray-500 mb-2">{occasion.date}</p>
                <div className="flex items-center gap-1">
                  <Sparkles className="h-3 w-3 text-[#c8622a]" />
                  <span className="text-xs text-gray-600">
                    {occasion.description}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Seasonal Banner */}
        <div className="bg-linear-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-6 border border-orange-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Moon className="h-6 w-6 text-[#c8622a]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1a0a00]">
                  Ramadan Mubarak
                </h4>
                <p className="text-sm text-gray-500">
                  Special gift collections for Ramadan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md">
                <Sun className="h-6 w-6 text-[#c8622a]" />
              </div>
              <div>
                <h4 className="font-semibold text-[#1a0a00]">
                  Sinhala & Tamil New Year
                </h4>
                <p className="text-sm text-gray-500">
                  Traditional gift packages available
                </p>
              </div>
            </div>

            <Badge className="bg-white text-[#c8622a] border-orange-200 px-4 py-2">
              <Calendar className="h-3.5 w-3.5 mr-1 inline" />
              April 2026
            </Badge>
          </div>
        </div>

        {/* Note: Display-only section */}
        <p className="text-center text-xs text-gray-400 mt-8">
          * Browse occasions • No occasion too small • Every celebration matters
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-0 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
        }
        @keyframes float-1 {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(20px) rotate(-180deg);
          }
        }
        @keyframes float-2 {
          0%,
          100% {
            transform: translateX(0) rotate(0deg);
          }
          50% {
            transform: translateX(20px) rotate(90deg);
          }
        }
      `}</style>
    </section>
  );
}
