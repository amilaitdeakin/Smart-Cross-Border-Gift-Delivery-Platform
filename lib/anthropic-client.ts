import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error(
    "ANTHROPIC_API_KEY is not set in environment variables. Please set ANTHROPIC_API_KEY in your .env.local file."
  );
}

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export type GiftSuggestionRequest = {
  recipientAge?: number;
  recipientGender?: string;
  interests?: string[];
  budget?: number;
  occasion?: string;
  relationship?: string;
  language?: string;
};

export type GiftSuggestion = {
  name: string;
  description: string;
  estimatedPrice: string;
  where_to_buy?: string;
  why_suitable?: string;
};

export async function generateGiftSuggestions(
  request: GiftSuggestionRequest
): Promise<GiftSuggestion[]> {
  const {
    recipientAge,
    recipientGender,
    interests = [],
    budget,
    occasion = "General",
    relationship = "Friend",
    language = "English",
  } = request;

  const prompt = `You are an expert gift advisor. Generate exactly 5 personalized gift suggestions based on the following criteria:

Recipient Age: ${recipientAge || "Not specified"}
Recipient Gender: ${recipientGender || "Not specified"}
Interests/Hobbies: ${interests.length > 0 ? interests.join(", ") : "Not specified"}
Budget: ${budget ? `$${budget}` : "Not specified"}
Occasion: ${occasion}
Relationship: ${relationship}
Response Language: ${language}

For each gift, provide:
1. Gift name
2. Brief description (1-2 sentences)
3. Estimated price range
4. Where to buy
5. Why it's suitable for this person

Format your response as a JSON array with objects containing: name, description, estimatedPrice, where_to_buy, why_suitable

Return ONLY valid JSON array, no additional text.`;

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20241022",
    max_tokens: 2048,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== "text") {
    throw new Error("Unexpected response type from Claude API");
  }

  try {
    const suggestions = JSON.parse(content.text) as GiftSuggestion[];
    return suggestions;
  } catch {
    throw new Error("Failed to parse gift suggestions from AI response");
  }
}
