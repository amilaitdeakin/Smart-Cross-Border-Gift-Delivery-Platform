# AI Gift Suggestion System

Personalized gift recommendations powered by **OpenAI** for the Smart Cross-Border Gift Delivery Platform.

## Setup

Add this to `.env.local`:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

Get an API key from: <https://platform.openai.com/api-keys>

## Run

```bash
npm install --legacy-peer-deps
npm run dev
```

Open: <http://localhost:3000/gifts/ai-suggestions>

## API

Endpoint (tRPC): `giftSuggestion.suggestGifts`

Input:

```ts
{
  recipientAge?: number;
  recipientGender?: string;
  interests?: string[];
  budget?: number;
  occasion?: string;
  relationship?: string;
  language?: string;
}
```

Response:

```ts
{
  success: boolean;
  suggestions: Array<{
    name: string;
    description: string;
    estimatedPrice: string;
    where_to_buy?: string;
    why_suitable?: string;
  }>;
}
```

## Key Files

- `app/gifts/ai-suggestions/page.tsx`
- `components/gift-suggestion-form.tsx`
- `trpc/routers/gift-suggestion.ts`
- `lib/openai-client.ts`

## Notes

- The backend uses `gpt-4o-mini` and asks OpenAI to return structured JSON.
- If `OPENAI_API_KEY` is missing, the API returns a clear configuration error.
