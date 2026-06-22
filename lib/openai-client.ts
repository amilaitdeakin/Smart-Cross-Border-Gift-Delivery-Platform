import OpenAI from "openai";

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

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "OPENAI_API_KEY is not set in environment variables. Please set OPENAI_API_KEY in your .env.local file."
    );
  }

  return new OpenAI({ apiKey });
}

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

  const completion = await getOpenAIClient().chat.completions.create({
    model: "gpt-4o-mini",
    temperature: 0.6,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are an expert gift advisor. Return JSON only with shape {\"suggestions\": GiftSuggestion[]} and exactly 5 suggestions.",
      },
      {
        role: "user",
        content: `Generate 5 personalized gift suggestions.

Recipient Age: ${recipientAge || "Not specified"}
Recipient Gender: ${recipientGender || "Not specified"}
Interests/Hobbies: ${interests.length > 0 ? interests.join(", ") : "Not specified"}
Budget: ${budget ? `$${budget}` : "Not specified"}
Occasion: ${occasion}
Relationship: ${relationship}
Response Language: ${language}

Each suggestion must include:
1. name
2. description (1-2 sentences)
3. estimatedPrice
4. where_to_buy
5. why_suitable`,
      },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI returned an empty response for gift suggestions");
  }

  const parsed = JSON.parse(content) as { suggestions?: GiftSuggestion[] };
  const suggestions = parsed.suggestions;

  if (!Array.isArray(suggestions) || suggestions.length === 0) {
    throw new Error("Failed to parse gift suggestions from OpenAI response");
  }

  return suggestions;
}
