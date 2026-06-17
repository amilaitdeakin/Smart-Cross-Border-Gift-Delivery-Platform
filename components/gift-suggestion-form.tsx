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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

interface GiftSuggestion {
  name: string;
  description: string;
  estimatedPrice: string;
  where_to_buy?: string;
  why_suitable?: string;
}

export function GiftSuggestionForm() {
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
      toast.success("Gift suggestions generated successfully!");
    },
    onError: (error: any) => {
      const errorMessage =
        error?.message || "Failed to generate suggestions";
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-slate-900 mb-2 text-center">
          🎁 AI Gift Suggestion System
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Get personalized gift recommendations powered by AI
        </p>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle>Gift Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Recipient Age */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Recipient Age (Optional)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 25"
                      value={formData.recipientAge}
                      onChange={(e) =>
                        handleInputChange("recipientAge", e.target.value)
                      }
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Gender (Optional)
                    </label>
                    <Select
                      value={formData.recipientGender}
                      onValueChange={(value) =>
                        handleInputChange("recipientGender", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Not specified</SelectItem>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Interests */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Interests (Optional)
                    </label>
                    <Input
                      placeholder="e.g., gaming, reading, cooking"
                      value={formData.interests}
                      onChange={(e) =>
                        handleInputChange("interests", e.target.value)
                      }
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Separate with commas
                    </p>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Budget (Optional)
                    </label>
                    <Input
                      type="number"
                      placeholder="e.g., 100"
                      value={formData.budget}
                      onChange={(e) =>
                        handleInputChange("budget", e.target.value)
                      }
                    />
                  </div>

                  {/* Occasion */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Occasion
                    </label>
                    <Select
                      value={formData.occasion}
                      onValueChange={(value) =>
                        handleInputChange("occasion", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="General">General</SelectItem>
                        <SelectItem value="Birthday">Birthday</SelectItem>
                        <SelectItem value="Wedding">Wedding</SelectItem>
                        <SelectItem value="Anniversary">Anniversary</SelectItem>
                        <SelectItem value="Christmas">Christmas</SelectItem>
                        <SelectItem value="Graduation">Graduation</SelectItem>
                        <SelectItem value="Baby Shower">Baby Shower</SelectItem>
                        <SelectItem value="Corporate">Corporate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Relationship */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Relationship
                    </label>
                    <Select
                      value={formData.relationship}
                      onValueChange={(value) =>
                        handleInputChange("relationship", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Friend">Friend</SelectItem>
                        <SelectItem value="Family">Family</SelectItem>
                        <SelectItem value="Colleague">Colleague</SelectItem>
                        <SelectItem value="Partner">Partner</SelectItem>
                        <SelectItem value="Boss">Boss</SelectItem>
                        <SelectItem value="Child">Child</SelectItem>
                        <SelectItem value="Parent">Parent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Response Language
                    </label>
                    <Select
                      value={formData.language}
                      onValueChange={(value) =>
                        handleInputChange("language", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Spanish">Spanish</SelectItem>
                        <SelectItem value="French">French</SelectItem>
                        <SelectItem value="German">German</SelectItem>
                        <SelectItem value="Chinese">Chinese</SelectItem>
                        <SelectItem value="Japanese">Japanese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={suggestGiftsMutation.isPending}
                  >
                    {suggestGiftsMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Suggestions"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {showResults && suggestions.length > 0 ? (
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">
                    Suggested Gifts
                  </h2>
                </div>
                {suggestions.map((suggestion, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-lg transition-shadow"
                  >
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {suggestion.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-slate-600 mb-1">
                          Description
                        </p>
                        <p className="text-slate-700">
                          {suggestion.description}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">
                            Estimated Price
                          </p>
                          <p className="text-slate-700">
                            {suggestion.estimatedPrice}
                          </p>
                        </div>
                        {suggestion.where_to_buy && (
                          <div>
                            <p className="text-sm font-medium text-slate-600 mb-1">
                              Where to Buy
                            </p>
                            <p className="text-slate-700">
                              {suggestion.where_to_buy}
                            </p>
                          </div>
                        )}
                      </div>

                      {suggestion.why_suitable && (
                        <div>
                          <p className="text-sm font-medium text-slate-600 mb-1">
                            Why It's Suitable
                          </p>
                          <p className="text-slate-700 text-sm">
                            {suggestion.why_suitable}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : showResults && suggestions.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <p className="text-center text-slate-500">
                    No suggestions generated. Please try again.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed">
                <CardContent className="pt-6">
                  <p className="text-center text-slate-500">
                    Fill in the criteria and click "Generate Suggestions" to get
                    personalized gift recommendations.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
