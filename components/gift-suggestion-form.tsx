// app/gifts/ai-suggestions/page.tsx
"use client";

import { useState } from "react";
import { useTRPC } from "@/trpc/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sparkles,
  Loader2,
  Gift,
  User,
  Calendar,
  Heart,
  DollarSign,
  Globe,
  Tag,
  Star,
  ShoppingBag,
  Info,
} from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface GiftSuggestion {
  name: string;
  description: string;
  estimatedPrice: string;
  where_to_buy?: string;
  why_suitable?: string;
}

export default function GiftSuggestionPageForm() {
  const trpc = useTRPC();

  const [formData, setFormData] = useState({
    recipientAge: "",
    recipientGender: "",
    interests: "",
    budget: "",
    occasion: "General",
    relationship: "Friend",
    language: "English",
  });

  const [suggestions, setSuggestions] = useState<GiftSuggestion[]>([]);
  const [showResults, setShowResults] = useState(false);

  const suggestGiftsMutation = useMutation({
    ...trpc.giftSuggestion.suggestGifts.mutationOptions(),
    onSuccess: (data) => {
      setSuggestions(data.suggestions || []);
      setShowResults(true);
      toast.success("✨ Gift suggestions generated successfully!");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      const errorMessage = error?.message || "Failed to generate suggestions";
      toast.error(`Error: ${errorMessage}`);
      setShowResults(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const interests =
      formData.interests
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i) || [];

    suggestGiftsMutation.mutate({
      recipientAge: formData.recipientAge
        ? parseInt(formData.recipientAge)
        : undefined,
      recipientGender: formData.recipientGender || undefined,
      interests,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      occasion: formData.occasion,
      relationship: formData.relationship,
      language: formData.language,
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const clearForm = () => {
    setFormData({
      recipientAge: "",
      recipientGender: "",
      interests: "",
      budget: "",
      occasion: "General",
      relationship: "Friend",
      language: "English",
    });
    setSuggestions([]);
    setShowResults(false);
  };

  return (
    <div className="min-h-screen bg-[#f6f1eb] text-[#2d1b12]">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 bg-[#fde8d7] px-4 py-1.5 rounded-full text-sm font-semibold text-[#d96c28] mb-4">
            <Sparkles className="h-4 w-4" />
            AI Powered
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Smart Gift Suggestions
          </h1>
          <p className="text-lg text-[#6f5a4d] max-w-2xl mx-auto">
            {` Let our AI help you find the perfect gift based on your recipient's
            preferences, interests, and occasion.`}
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <Card className="rounded-[28px] border border-[#eadfd4] bg-white shadow-sm sticky top-8">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#fde8d7] p-2 rounded-xl">
                    <Gift className="h-5 w-5 text-[#d96c28]" />
                  </div>
                  <CardTitle className="text-xl">Gift Criteria</CardTitle>
                </div>
                <p className="text-sm text-[#6f5a4d] mt-1">
                  Tell us about the recipient
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Recipient Age */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <User className="h-4 w-4 text-[#d96c28]" />
                      Recipient Age
                      <span className="text-xs text-[#9c8779] font-normal">
                        (Optional)
                      </span>
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.recipientAge}
                      onChange={(e) =>
                        handleInputChange("recipientAge", e.target.value)
                      }
                      className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <Heart className="h-4 w-4 text-[#d96c28]" />
                      Gender
                      <span className="text-xs text-[#9c8779] font-normal">
                        (Optional)
                      </span>
                    </label>
                    <Select
                      value={formData.recipientGender}
                      onValueChange={(value) =>
                        handleInputChange(
                          "recipientGender",
                          value === "__unspecified__" ? "" : value,
                        )
                      }
                    >
                      <SelectTrigger className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__unspecified__">
                          Not specified
                        </SelectItem>
                        <SelectItem value="Male">👨 Male</SelectItem>
                        <SelectItem value="Female">👩 Female</SelectItem>
                        <SelectItem value="Other">🌈 Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <Star className="h-4 w-4 text-[#d96c28]" />
                      Interests
                      <span className="text-xs text-[#9c8779] font-normal">
                        (Optional)
                      </span>
                    </label>
                    <Input
                      placeholder="e.g., gaming, reading, cooking"
                      value={formData.interests}
                      onChange={(e) =>
                        handleInputChange("interests", e.target.value)
                      }
                      className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]"
                    />
                    <p className="text-xs text-[#9c8779] mt-1.5">
                      Separate with commas
                    </p>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <DollarSign className="h-4 w-4 text-[#d96c28]" />
                      Budget
                      <span className="text-xs text-[#9c8779] font-normal">
                        (Optional)
                      </span>
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                      className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]"
                    />
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <Calendar className="h-4 w-4 text-[#d96c28]" />
                      Occasion
                    </label>
                    <Select
                      value={formData.occasion}
                      onValueChange={(value) =>
                        handleInputChange("occasion", value)
                      }
                    >
                      <SelectTrigger className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">🎯 General</SelectItem>
                        <SelectItem value="Birthday">🎂 Birthday</SelectItem>
                        <SelectItem value="Wedding">💍 Wedding</SelectItem>
                        <SelectItem value="Anniversary">
                          💕 Anniversary
                        </SelectItem>
                        <SelectItem value="Christmas">🎄 Christmas</SelectItem>
                        <SelectItem value="Graduation">
                          🎓 Graduation
                        </SelectItem>
                        <SelectItem value="Baby Shower">
                          👶 Baby Shower
                        </SelectItem>
                        <SelectItem value="Corporate">💼 Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <Heart className="h-4 w-4 text-[#d96c28]" />
                      Relationship
                    </label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) =>
                        handleInputChange("relationship", value)
                      }
                    >
                      <SelectTrigger className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Friend">🤝 Friend</SelectItem>
                        <SelectItem value="Family">👨‍👩‍👦 Family</SelectItem>
                        <SelectItem value="Colleague">💼 Colleague</SelectItem>
                        <SelectItem value="Partner">❤️ Partner</SelectItem>
                        <SelectItem value="Boss">👔 Boss</SelectItem>
                        <SelectItem value="Child">🧒 Child</SelectItem>
                        <SelectItem value="Parent">👨‍👩‍👧 Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="flex items-center gap-2 text-sm font-medium text-[#5e4739] mb-1.5">
                      <Globe className="h-4 w-4 text-[#d96c28]" />
                      Response Language
                    </label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        handleInputChange("language", value)
                      }
                    >
                      <SelectTrigger className="rounded-xl border-[#eadfd4] focus:border-[#d96c28] focus:ring-[#d96c28]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">🇬🇧 English</SelectItem>
                        <SelectItem value="Spanish">🇪🇸 Spanish</SelectItem>
                        <SelectItem value="French">🇫🇷 French</SelectItem>
                        <SelectItem value="German">🇩🇪 German</SelectItem>
                        <SelectItem value="Chinese">🇨🇳 Chinese</SelectItem>
                        <SelectItem value="Japanese">🇯🇵 Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3 pt-2">
                    <Button
                      type="submit"
                      disabled={suggestGiftsMutation.isPending}
                      className="w-full rounded-xl bg-[#d96c28] py-6 text-base font-semibold hover:bg-[#c85f20] transition-all"
                    >
                      {suggestGiftsMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                          Generating Suggestions...
                        </>
                      ) : (
                        <>
                          <Sparkles className="mr-2 h-5 w-5" />
                          Generate Suggestions
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={clearForm}
                      className="w-full rounded-xl border-[#eadfd4] text-[#5e4739] hover:bg-[#f6f1eb]"
                    >
                      Clear All
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            {showResults && suggestions.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-[#2d1b12]">
                      Suggested Gifts
                    </h2>
                    <p className="text-sm text-[#6f5a4d]">
                      {suggestions.length} recommendations found
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-[#6f5a4d]">
                    <Tag className="h-4 w-4 text-[#d96c28]" />
                    <span>AI Generated</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {suggestions.map((suggestion, index) => (
                    <Card
                      key={index}
                      className="rounded-[24px] border border-[#eadfd4] bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#fde8d7] text-[#d96c28] font-bold">
                              {index + 1}
                            </div>
                            <CardTitle className="text-xl text-[#2d1b12]">
                              {suggestion.name}
                            </CardTitle>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < 4
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {/* Description */}
                        <div>
                          <p className="text-sm font-medium text-[#5e4739] mb-1.5 flex items-center gap-2">
                            <Info className="h-4 w-4 text-[#d96c28]" />
                            Description
                          </p>
                          <p className="text-[#2d1b12] leading-relaxed">
                            {suggestion.description}
                          </p>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-[#f6f1eb] rounded-xl p-3">
                            <p className="text-xs font-medium text-[#6f5a4d] mb-1">
                              Estimated Price
                            </p>
                            <p className="text-lg font-bold text-[#d96c28]">
                              {suggestion.estimatedPrice}
                            </p>
                          </div>
                          {suggestion.where_to_buy && (
                            <div className="bg-[#f6f1eb] rounded-xl p-3">
                              <p className="text-xs font-medium text-[#6f5a4d] mb-1">
                                Where to Buy
                              </p>
                              <p className="text-sm font-medium text-[#2d1b12] flex items-center gap-1.5">
                                <ShoppingBag className="h-3.5 w-3.5 text-[#d96c28]" />
                                {suggestion.where_to_buy}
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Why Suitable */}
                        {suggestion.why_suitable && (
                          <div className="bg-[#fde8d7] rounded-xl p-4">
                            <p className="text-sm font-medium text-[#5e4739] mb-1.5 flex items-center gap-2">
                              <Heart className="h-4 w-4 text-[#d96c28]" />
                              {`  Why It's Suitable`}
                            </p>
                            <p className="text-sm text-[#2d1b12] leading-relaxed">
                              {suggestion.why_suitable}
                            </p>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                          <Button
                            size="sm"
                            className="rounded-full bg-[#d96c28] hover:bg-[#c85f20]"
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-full border-[#eadfd4]"
                          >
                            Add to List
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Regenerate Button */}
                <div className="mt-8 text-center">
                  <Button
                    onClick={() => {
                      setSuggestions([]);
                      setShowResults(false);
                      // Trigger form submit
                      const form = document.querySelector("form");
                      if (form) form.dispatchEvent(new Event("submit"));
                    }}
                    variant="outline"
                    className="rounded-full border-[#d96c28] text-[#d96c28] hover:bg-[#fff4ec]"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Regenerate Suggestions
                  </Button>
                </div>
              </div>
            ) : showResults && suggestions.length === 0 ? (
              <Card className="rounded-[28px] border border-dashed border-[#eadfd4] bg-white">
                <CardContent className="pt-12 pb-12 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#f6f1eb]">
                    <Gift className="h-8 w-8 text-[#9c8779]" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#2d1b12]">
                    No Suggestions Found
                  </h3>
                  <p className="mt-2 text-[#6f5a4d]">
                    Try adjusting your criteria and generate again.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="rounded-[28px] border border-dashed border-[#eadfd4] bg-white">
                <CardContent className="pt-16 pb-16 text-center">
                  <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#fde8d7]">
                    <Sparkles className="h-10 w-10 text-[#d96c28]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#2d1b12]">
                    Ready to Find the Perfect Gift?
                  </h3>
                  <p className="mt-3 max-w-md mx-auto text-[#6f5a4d]">
                    {`Fill in the criteria on the left and click "Generate
                    Suggestions" to get personalized gift recommendations.`}
                  </p>
                  <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-[#6f5a4d]">
                    <span className="flex items-center gap-1.5">
                      <Tag className="h-4 w-4 text-[#d96c28]" />
                      Personalized
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-[#d96c28]" />
                      AI Powered
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart className="h-4 w-4 text-[#d96c28]" />
                      Thoughtful
                    </span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
