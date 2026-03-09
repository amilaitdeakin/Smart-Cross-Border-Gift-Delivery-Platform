"use client";

import {
  Cake,
  Candy,
  Eye,
  Flower2,
  Gift,
  Heart,
  Share2,
  Shield,
  ShoppingCart,
  Sparkles,
  Star,
  Truck,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface GiftDetails {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge: string;
  badgeColor: string;
  icon: React.ComponentType<{ className?: string }>;
  colors: string[];
  longDescription?: string;
  specifications?: { label: string; value: string }[];
  reviews_list?: {
    name: string;
    rating: number;
    comment: string;
    date: string;
  }[];
}

export default function FeaturedGifts() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedCards, setLikedCards] = useState<number[]>([]);
  const [selectedGift, setSelectedGift] = useState<GiftDetails | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("details");

  const featuredGifts = [
    {
      id: 1,
      name: "Birthday Bliss Combo",
      description: "Chocolate Cake + 6 Red Roses + Card",
      longDescription:
        "Make their birthday unforgettable with our signature Birthday Bliss Combo. This carefully curated set includes a rich chocolate cake (1kg), six premium red roses, and a personalized birthday card. Perfect for surprising your loved ones across the border.",
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
      specifications: [
        { label: "Cake Weight", value: "1kg" },
        { label: "Cake Flavor", value: "Chocolate" },
        { label: "Roses", value: "6 Red Roses" },
        { label: "Card", value: "Personalized Message" },
        { label: "Delivery", value: "Same Day Available" },
        { label: "Gift Wrap", value: "Premium Box" },
      ],
      reviews_list: [
        {
          name: "Sarah W.",
          rating: 5,
          comment: "Amazing combo! The cake was fresh and roses beautiful.",
          date: "2 days ago",
        },
        {
          name: "Michael P.",
          rating: 5,
          comment: "Perfect birthday surprise for my sister in Sydney.",
          date: "1 week ago",
        },
        {
          name: "Emily F.",
          rating: 4,
          comment: "Great value for money. Delivery was on time.",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 2,
      name: "Eternal Love Roses",
      description: "12 Long Stem Red Roses in Premium Box",
      longDescription:
        "Express your eternal love with this stunning arrangement of 12 long-stem red roses. Each rose is hand-picked and arranged in a premium gift box, complete with a heartfelt message card. Perfect for anniversaries, Valentine's Day, or just because.",
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
      specifications: [
        { label: "Roses", value: "12 Long Stem" },
        { label: "Color", value: "Red" },
        { label: "Box", value: "Premium Gift Box" },
        { label: "Card", value: "Included" },
        { label: "Vase Life", value: "7-10 Days" },
        { label: "Origin", value: "Sri Lanka" },
      ],
      reviews_list: [
        {
          name: "David R.",
          rating: 5,
          comment: "Absolutely beautiful roses. Better than expected!",
          date: "3 days ago",
        },
        {
          name: "Priya K.",
          rating: 5,
          comment: "My wife loved them. Thank you!",
          date: "1 week ago",
        },
        {
          name: "Nuwan S.",
          rating: 4,
          comment: "Great quality, would order again.",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 3,
      name: "Chocolate Fudge Cake",
      description: "1kg Rich Chocolate Cake with Nuts",
      longDescription:
        "Indulge in the ultimate chocolate experience with our rich and moist chocolate fudge cake. Made with premium cocoa and topped with crushed nuts, this 1kg cake is perfect for any celebration. Available for same-day delivery across Australia.",
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
      specifications: [
        { label: "Weight", value: "1kg" },
        { label: "Flavor", value: "Chocolate Fudge" },
        { label: "Toppings", value: "Crushed Nuts" },
        { label: "Serves", value: "8-10 People" },
        { label: "Shelf Life", value: "3 Days" },
        { label: "Eggless Option", value: "Available" },
      ],
      reviews_list: [
        {
          name: "Amal P.",
          rating: 5,
          comment: "Best cake I've ever ordered! So rich and moist.",
          date: "2 days ago",
        },
        {
          name: "Nimali F.",
          rating: 5,
          comment: "Birthday was a hit because of this cake!",
          date: "5 days ago",
        },
        {
          name: "Kasun R.",
          rating: 5,
          comment: "Delivery was prompt and cake was perfect.",
          date: "1 week ago",
        },
      ],
    },
    {
      id: 4,
      name: "Belgian Chocolate Box",
      description: "24 Piece Assorted Belgian Chocolates",
      longDescription:
        "Treat your loved ones to the finest Belgian chocolates with this elegant 24-piece assortment. Each piece is handcrafted with premium ingredients, offering a variety of flavors from dark chocolate truffles to milk chocolate pralines. Packaged in a beautiful gift box.",
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
      specifications: [
        { label: "Pieces", value: "24" },
        { label: "Type", value: "Assorted Belgian" },
        { label: "Flavors", value: "Dark, Milk, White" },
        { label: "Box", value: "Luxury Gift Box" },
        { label: "Shelf Life", value: "6 Months" },
        { label: "Origin", value: "Belgium" },
      ],
      reviews_list: [
        {
          name: "Chamari S.",
          rating: 5,
          comment: "So delicious! Presentation was beautiful.",
          date: "3 days ago",
        },
        {
          name: "Tharindu L.",
          rating: 5,
          comment: "Perfect gift for chocolate lovers.",
          date: "1 week ago",
        },
        {
          name: "Dilini M.",
          rating: 4,
          comment: "Great quality chocolates, would buy again.",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 5,
      name: "Anniversary Special",
      description: "Red Roses + Champagne + Chocolates",
      longDescription:
        "Celebrate your special day with our ultimate anniversary package. Includes 12 premium red roses, a bottle of finest champagne, and a box of Belgian chocolates. Complete with a personalized anniversary card. The perfect way to say 'I love you' from across the miles.",
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
      specifications: [
        { label: "Roses", value: "12 Red Roses" },
        { label: "Champagne", value: "Premium Bottle" },
        { label: "Chocolates", value: "Belgian Assortment" },
        { label: "Card", value: "Personalized" },
        { label: "Gift Wrap", value: "Luxury Box" },
        { label: "Delivery", value: "Chilled Available" },
      ],
      reviews_list: [
        {
          name: "Roshan K.",
          rating: 5,
          comment: "Made our 10th anniversary special!",
          date: "4 days ago",
        },
        {
          name: "Shanika P.",
          rating: 5,
          comment: "Everything was perfect. Thank you!",
          date: "1 week ago",
        },
        {
          name: "Nuwan J.",
          rating: 5,
          comment: "Worth every penny. Highly recommended.",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 6,
      name: "Get Well Soon Basket",
      description: "Fruits, Chocolates & Get Well Card",
      longDescription:
        "Send your warm wishes for a speedy recovery with our thoughtful Get Well Soon Basket. Filled with fresh seasonal fruits, assorted chocolates, and a comforting get well card. Beautifully arranged in a wicker basket that can be reused.",
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
      specifications: [
        { label: "Fruits", value: "Seasonal Assortment" },
        { label: "Chocolates", value: "Premium Box" },
        { label: "Card", value: "Get Well Message" },
        { label: "Basket", value: "Reusable Wicker" },
        { label: "Delivery", value: "Same Day" },
        { label: "Add-ons", value: "Flowers Available" },
      ],
      reviews_list: [
        {
          name: "Kumari W.",
          rating: 5,
          comment: "My father loved this basket. Very thoughtful.",
          date: "3 days ago",
        },
        {
          name: "Lasitha R.",
          rating: 4,
          comment: "Great quality fruits and chocolates.",
          date: "1 week ago",
        },
        {
          name: "Nadeeka S.",
          rating: 4,
          comment: "Delivery was prompt and basket looked beautiful.",
          date: "2 weeks ago",
        },
      ],
    },
    {
      id: 7,
      name: "Just Because Hamper",
      description: "Assorted Treats & Personalised Card",
      longDescription:
        "No reason needed to show you care! Our 'Just Because' Hamper is filled with an assortment of gourmet treats including cookies, chocolates, nuts, and a personalized card. Perfect for surprising someone special for no reason at all.",
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
      specifications: [
        { label: "Treats", value: "12 Items" },
        { label: "Includes", value: "Cookies, Chocolates, Nuts" },
        { label: "Card", value: "Personalized" },
        { label: "Box", value: "Luxury Hamper" },
        { label: "Dietary", value: "Options Available" },
        { label: "Occasion", value: "Any Day" },
      ],
      reviews_list: [
        {
          name: "Dinesh P.",
          rating: 5,
          comment: "Great surprise for my wife. She loved it!",
          date: "2 days ago",
        },
        {
          name: "Chathuri G.",
          rating: 5,
          comment: "Beautiful presentation and delicious treats.",
          date: "5 days ago",
        },
        {
          name: "Ruwan K.",
          rating: 4,
          comment: "Perfect 'just because' gift.",
          date: "1 week ago",
        },
      ],
    },
    {
      id: 8,
      name: "Valentine's Special",
      description: "Rose Petals, Cake & Candle Set",
      longDescription:
        "Set the mood for romance with our Valentine's Special package. Includes fragrant rose petals, a heart-shaped chocolate cake, and a set of romantic candles. Complete with a love letter card. Perfect for making Valentine's Day unforgettable.",
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
      specifications: [
        { label: "Rose Petals", value: "Fresh" },
        { label: "Cake", value: "Heart-shaped Chocolate" },
        { label: "Candles", value: "Set of 3" },
        { label: "Card", value: "Love Letter Card" },
        { label: "Delivery", value: "Date-specific" },
        { label: "Surprise", value: "Available" },
      ],
      reviews_list: [
        {
          name: "Nuwan M.",
          rating: 5,
          comment: "Made Valentine's Day so special. Thank you!",
          date: "Feb 15, 2026",
        },
        {
          name: "Dilshani T.",
          rating: 5,
          comment: "Everything was perfect. So romantic!",
          date: "Feb 14, 2026",
        },
        {
          name: "Roshan J.",
          rating: 5,
          comment: "Best Valentine's gift ever!",
          date: "Feb 14, 2026",
        },
      ],
    },
  ];

  const toggleLike = (id: number) => {
    if (likedCards.includes(id)) {
      setLikedCards(likedCards.filter((cardId) => cardId !== id));
    } else {
      setLikedCards([...likedCards, id]);
    }
  };

  const openModal = (gift: GiftDetails) => {
    setSelectedGift(gift);
    setModalOpen(true);
    setQuantity(1);
    setActiveTab("details");
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
                    onClick={() => openModal(gift)}
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
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-4xl w-[95vw] h-[90vh] lg:h-auto lg:max-h-[85vh] overflow-hidden p-0 rounded-3xl border-none shadow-2xl">
          {selectedGift && (
            <div className="flex flex-col lg:flex-row h-full">
              {/* LEFT COLUMN: Visuals */}
              <div className="lg:w-[42%] bg-[#f8f8f8] p-8 flex flex-col justify-center relative min-h-80 lg:min-h-125">
                <Badge
                  className={`absolute top-6 left-6 z-10 ${selectedGift.badgeColor} text-white border-none px-4 py-1.5 rounded-full shadow-sm font-bold tracking-wide`}
                >
                  {selectedGift.badge}
                </Badge>

                <div className="relative aspect-square w-full flex items-center justify-center group">
                  {/* Soft glow background for the product */}
                  <div className="absolute inset-0 bg-orange-200/20 blur-3xl rounded-full scale-75 group-hover:scale-90 transition-transform duration-500" />
                  <Image
                    src={selectedGift.image}
                    alt={selectedGift.name}
                    width={400}
                    height={400}
                    className="relative z-10 object-contain max-h-70 lg:max-h-95 drop-shadow-xl"
                    priority
                  />
                </div>
              </div>

              {/* RIGHT COLUMN: Info & Actions */}
              <div className="lg:w-[58%] flex flex-col bg-white h-full overflow-hidden">
                {/* 1. Header Section */}
                <div className="p-6 lg:p-8 pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#c8622a] bg-orange-50 px-2 py-1 rounded">
                      {selectedGift.category}
                    </span>
                    <div className="flex items-center gap-1 ml-auto">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-xs font-bold">
                        {selectedGift.rating}
                      </span>
                      <span className="text-xs text-gray-400">
                        ({selectedGift.reviews})
                      </span>
                    </div>
                  </div>
                  <DialogTitle className="font-serif text-2xl lg:text-3xl font-bold text-[#1a0a00] leading-tight mb-4">
                    {selectedGift.name}
                  </DialogTitle>

                  <div className="flex items-baseline gap-3 mb-6">
                    <span className="text-3xl font-bold text-[#c8622a]">
                      ${selectedGift.price}
                    </span>
                    <span className="text-lg text-gray-300 line-through font-light">
                      ${selectedGift.originalPrice}
                    </span>
                    <span className="ml-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded">
                      Save ${selectedGift.originalPrice - selectedGift.price}
                    </span>
                  </div>
                </div>

                {/* 2. Scrollable Tabs Section */}
                <div className="flex-1 overflow-y-auto px-6 lg:px-8">
                  <Tabs
                    value={activeTab}
                    onValueChange={setActiveTab}
                    className="w-full"
                  >
                    <TabsList className="flex w-full bg-gray-50 p-1 rounded-xl mb-4 border border-gray-100">
                      <TabsTrigger
                        value="details"
                        className="flex-1 rounded-lg py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#c8622a] data-[state=active]:shadow-sm"
                      >
                        Details
                      </TabsTrigger>
                      <TabsTrigger
                        value="specs"
                        className="flex-1 rounded-lg py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#c8622a] data-[state=active]:shadow-sm"
                      >
                        Specs
                      </TabsTrigger>
                      <TabsTrigger
                        value="reviews"
                        className="flex-1 rounded-lg py-2 text-xs font-semibold data-[state=active]:bg-white data-[state=active]:text-[#c8622a] data-[state=active]:shadow-sm"
                      >
                        Reviews
                      </TabsTrigger>
                    </TabsList>

                    <div className="min-h-30 pb-6">
                      <TabsContent
                        value="details"
                        className="text-sm text-gray-600 leading-relaxed animate-in fade-in-20 duration-300"
                      >
                        {selectedGift.longDescription ||
                          selectedGift.description}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                            <Truck className="h-4 w-4 text-[#c8622a]" /> Fast
                            Delivery
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-gray-500 font-medium">
                            <Shield className="h-4 w-4 text-blue-500" /> Secure
                            Payment
                          </div>
                        </div>
                      </TabsContent>
                      {/* ... other TabsContents ... */}
                    </div>
                  </Tabs>
                </div>

                {/* 3. Sticky Action Footer */}
                <div className="p-6 lg:p-8 bg-gray-50/50 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center bg-white border border-gray-200 rounded-xl h-12 shadow-sm">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full px-3 hover:bg-orange-50"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-10 text-center font-bold text-sm">
                        {quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-full px-3 hover:bg-orange-50"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                    <Button className="flex-1 h-12 bg-[#c8622a] hover:bg-[#b5531e] text-white rounded-xl font-bold shadow-lg shadow-orange-200 transition-all hover:-translate-y-px">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart — $
                      {(selectedGift.price * quantity).toFixed(2)}
                    </Button>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      className="flex-1 rounded-lg border-gray-200 text-gray-600 h-10 text-xs font-semibold"
                      onClick={() => toggleLike(selectedGift.id)}
                    >
                      <Heart
                        className={`h-4 w-4 mr-2 ${likedCards.includes(selectedGift.id) ? "fill-[#c8622a] text-[#c8622a]" : ""}`}
                      />
                      {likedCards.includes(selectedGift.id)
                        ? "Saved to Wishlist"
                        : "Save for Later"}
                    </Button>
                    <Button
                      variant="outline"
                      className="rounded-lg border-gray-200 text-gray-600 h-10 px-3"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Note: This is a display-only section - no navigation links */}
      <p className="text-center text-xs text-gray-400 mt-4">
        * Click the eye icon on any gift to see full details • Demo showcase
        only
      </p>
    </section>
  );
}
