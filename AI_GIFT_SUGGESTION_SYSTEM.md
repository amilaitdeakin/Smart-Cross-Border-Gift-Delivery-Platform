# AI Gift Suggestion System

A smart gift recommendation engine powered by Claude (Anthropic) integration that provides personalized gift suggestions based on recipient information.

## Features

- 🤖 **AI-Powered Suggestions**: Uses Claude AI to generate intelligent, personalized gift recommendations
- 🎯 **Comprehensive Filtering**: Filter by age, gender, interests, budget, occasion, and relationship
- 🌍 **Multi-Language Support**: Get suggestions in English, Spanish, French, German, Chinese, or Japanese
- 💰 **Budget-Aware**: Recommendations include estimated price ranges
- 🛍️ **Shopping Guidance**: Get store recommendations and suitability explanations
- ⚡ **Real-time Processing**: Fast API integration with streaming support

## Architecture

### Backend
- **Framework**: Next.js with tRPC
- **AI Provider**: Anthropic (Claude 3.5 Sonnet model)
- **Database**: Drizzle ORM with PostgreSQL/Neon

### Frontend
- **Framework**: React 19 with TypeScript
- **Components**: Custom shadcn UI components
- **State Management**: React Query with tRPC hooks
- **Styling**: Tailwind CSS

## Setup

### 1. Environment Variables

Create `.env.local` in the project root:

```env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

**Get your API key**: Visit [Anthropic Console](https://console.anthropic.com/keys)

### 2. Install Dependencies

```bash
npm install --legacy-peer-deps
npm install @anthropic-ai/sdk --legacy-peer-deps
```

### 3. Running the Application

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Web Interface

Navigate to: `/gifts/ai-suggestions`

Fill in the gift criteria:
- **Recipient Age** (optional): Age of the gift recipient
- **Gender** (optional): Recipient's gender
- **Interests**: Comma-separated hobbies/interests
- **Budget** (optional): Maximum budget in USD
- **Occasion**: Select from Birthday, Wedding, Anniversary, etc.
- **Relationship**: Friend, Family, Colleague, Partner, etc.
- **Language**: Response language preference

Click "Generate Suggestions" to get 5 personalized gift recommendations.

### API Usage

Use the tRPC endpoint:

```typescript
// Client-side
const suggestions = await trpc.giftSuggestion.suggestGifts.mutate({
  recipientAge: 25,
  recipientGender: 'Female',
  interests: ['reading', 'photography', 'hiking'],
  budget: 100,
  occasion: 'Birthday',
  relationship: 'Friend',
  language: 'English',
});
```

## API Endpoints

### POST `/api/trpc/giftSuggestion.suggestGifts`

**Input Parameters:**
```typescript
{
  recipientAge?: number;          // Age of recipient
  recipientGender?: string;       // Male | Female | Other
  interests?: string[];           // Array of interests
  budget?: number;                // Max budget in USD
  occasion?: string;              // Event/occasion
  relationship?: string;          // Relationship to recipient
  language?: string;              // Response language
}
```

**Response:**
```typescript
{
  success: boolean;
  suggestions: Array<{
    name: string;                 // Gift name
    description: string;          // 1-2 sentence description
    estimatedPrice: string;       // Price range
    where_to_buy?: string;        // Store recommendations
    why_suitable?: string;        // Why it suits the recipient
  }>;
}
```

## File Structure

```
project/
├── app/
│   └── gifts/
│       └── ai-suggestions/
│           └── page.tsx              # Main page
├── components/
│   └── gift-suggestion-form.tsx      # React form component
├── lib/
│   └── anthropic-client.ts           # Anthropic Claude integration
├── trpc/
│   └── routers/
│       ├── _app.ts                   # Main router (updated)
│       └── gift-suggestion.ts        # Gift suggestion router
└── .env.local                        # Environment variables
```

## Key Components

### `anthropic-client.ts`
Handles:
- Anthropic Claude client initialization
- Prompt engineering for gift suggestions
- Response parsing and validation
- Error handling

### `gift-suggestion.ts` (Router)
tRPC router that:
- Validates input with Zod schemas
- Calls the Claude API
- Handles errors gracefully
- Returns formatted suggestions

### `gift-suggestion-form.tsx` (Component)
React component featuring:
- Form with 7 input fields
- Real-time state management
- Loading states with spinner
- Success/error toast notifications
- Responsive grid layout
- Card-based results display

## Error Handling

The system includes comprehensive error handling:
- **API Key Missing**: Throws error if `ANTHROPIC_API_KEY` is not set
- **Invalid Response**: Validates JSON parsing from Claude response
- **Network Errors**: Handled by tRPC and displayed via toast
- **Input Validation**: Zod schema validation on inputs

## Performance Optimizations

- **Streaming**: Supports Claude streaming for faster initial responses
- **Caching**: React Query handles client-side caching
- **Lazy Loading**: Components load only when needed
- **Memoization**: Form values memoized to prevent re-renders

## Customization

### Adding New Occasions

Edit `gift-suggestion-form.tsx`:
```typescript
<SelectItem value="NewOccasion">New Occasion</SelectItem>
```

### Changing AI Model

Edit `anthropic-client.ts`:
```typescript
model: 'claude-3-opus-20250219', // Change to different Claude version
```

### Adjusting Response Format

Modify the prompt in `generateGiftSuggestions()` function to change:
- Number of suggestions (currently 5)
- Response structure
- Detail level

## Testing

```bash
npm run build    # Build the project
npm run lint     # Run linter
npm run dev      # Run in development
```

## Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| ANTHROPIC_API_KEY | Yes | Your Anthropic API key for Claude |

## Troubleshooting

### "ANTHROPIC_API_KEY is not set"
- Ensure `.env.local` file exists in project root
- Check API key is correctly copied without extra spaces
- Verify you're using Anthropic API key, not OpenAI key

### "Failed to parse gift suggestions"
- Claude API response format changed
- Check Claude model availability on Anthropic console
- Review prompt engineering in `anthropic-client.ts`

### 404 Not Found on `/gifts/ai-suggestions`
- Ensure directory structure is correct: `app/gifts/ai-suggestions/page.tsx`
- Rebuild with `npm run build`
- Restart development server

## API Cost Estimation

Claude 3.5 Sonnet pricing (as of 2024):
- Input: $3 per 1M tokens
- Output: $15 per 1M tokens
- Typical gift suggestion request: ~500 input tokens + ~1000 output tokens = ~$0.015

## Future Enhancements

- [ ] Save favorite suggestions to user profile
- [ ] Integration with e-commerce APIs for direct purchasing
- [ ] User feedback loop to improve AI suggestions
- [ ] Image generation for gift visualizations
- [ ] Multi-recipient group gifting
- [ ] Budget split calculation for group gifts

## Support

For issues or questions, refer to:
- [Anthropic Claude Documentation](https://docs.anthropic.com)
- [Next.js Documentation](https://nextjs.org/docs)
- [tRPC Documentation](https://trpc.io/docs)

## License

Part of Smart Cross-Border Gift Delivery Platform
