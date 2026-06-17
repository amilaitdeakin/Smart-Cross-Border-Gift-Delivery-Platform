# Live Chatbot with OpenAI Integration

This document explains how to set up and use the live chatbot feature integrated with OpenAI on your homepage.

## Features

✅ **Real-time Chat**: Interactive chat interface with typing indicators
✅ **AI-Powered Responses**: Uses OpenAI GPT-3.5-turbo for intelligent responses
✅ **Professional UI**: Modern, responsive design with Tailwind CSS
✅ **Mobile Friendly**: Works seamlessly on all device sizes
✅ **Context Aware**: Maintains conversation history for better responses
✅ **Easy Integration**: Minimal setup required

## Setup Instructions

### 1. Install Dependencies

First, install the OpenAI SDK:

```bash
npm install openai
```

Or if you use the included package.json:

```bash
npm install
```

### 2. Get OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/account/api-keys)
2. Sign up or log in to your account
3. Create a new API key
4. Copy your API key

### 3. Configure Environment Variables

Add your OpenAI API key to your `.env.local` file:

```bash
OPENAI_API_KEY=sk-your-api-key-here
```

**Important**: Never commit your API key to version control. Add `.env.local` to your `.gitignore`.

### 4. Files Created

The following files have been created for the chatbot:

- **`/app/api/chat/route.ts`** - Backend API endpoint for chat requests
- **`/components/live-chatbot.tsx`** - Chatbot UI component
- **`/app/page.tsx`** - Updated homepage with chatbot integration

### 5. How It Works

#### Backend (`/app/api/chat/route.ts`)

- Receives user messages via POST request
- Sends messages to OpenAI with a system prompt
- Returns AI-generated responses

#### Frontend (`/components/live-chatbot.tsx`)

- Displays a floating chat button in the bottom-right corner
- Shows chat window when clicked
- Manages message history
- Handles sending messages and displaying responses

#### System Prompt

The chatbot is configured with a specific system prompt that tells it to act as a customer service assistant for WorldWish. You can customize this prompt in `/app/api/chat/route.ts`:

```typescript
system: `You are a helpful customer service assistant for WorldWish, a cross-border gift delivery platform. 
You help customers find the perfect gifts, answer questions about delivery, assist with orders, and provide recommendations. 
Be friendly, professional, and helpful.`;
```

## Customization

### Change Chatbot Styling

Edit `/components/live-chatbot.tsx` to modify:

- Colors: Update gradient classes (e.g., `from-blue-600 to-purple-600`)
- Size: Change the `w-96` and `h-96` classes
- Position: Modify `bottom-6 right-6` positioning

### Update System Prompt

Edit `/app/api/chat/route.ts` to change the system message for different use cases.

### Change AI Model

In `/app/api/chat/route.ts`, change:

```typescript
model: "gpt-3.5-turbo", // Change to "gpt-4" or other models
```

### Adjust Response Parameters

In `/app/api/chat/route.ts`:

```typescript
temperature: 0.7,      // 0-1: Lower = more deterministic, Higher = more creative
max_tokens: 500,       // Maximum response length
```

## Testing

1. Start your development server:

```bash
npm run dev
```

2. Open `http://localhost:3000` in your browser

3. Look for the "Chat with us" button in the bottom-right corner

4. Click to open the chat and test conversations

## Troubleshooting

### "OpenAI API key not configured"

- Check that `OPENAI_API_KEY` is set in your `.env.local` file
- Restart your development server after adding the env variable
- Verify the API key is correct and active

### API requests are failing

- Check browser console for error messages (F12 → Console)
- Verify your OpenAI account has available credits
- Check that your API key hasn't been revoked

### Chat doesn't appear

- Verify that `LiveChatbot` component is imported in `page.tsx`
- Check browser console for JavaScript errors
- Clear browser cache and reload

## Pricing

OpenAI API calls are billed based on usage:

- **GPT-3.5-turbo**: ~$0.001 per 1K tokens (very affordable)
- **GPT-4**: ~$0.03 per 1K tokens

Monitor your usage at [OpenAI Usage](https://platform.openai.com/account/usage/overview)

## Advanced: Streaming Responses

For better UX with longer responses, you can implement streaming:

```typescript
// In /app/api/chat/route.ts
const stream = await openai.chat.completions.create({
  ...options,
  stream: true,
});
```

## Security Notes

⚠️ **Important**:

- Never expose your `OPENAI_API_KEY` in frontend code
- The API key should only be in `.env.local` (server-side)
- Implement rate limiting in production to prevent abuse
- Consider adding authentication to the chat endpoint

## Next Steps

1. ✅ Deploy the app to production
2. ✅ Monitor OpenAI API costs
3. ✅ Collect user feedback and refine prompts
4. ✅ Consider adding features like:
   - Chat history persistence
   - User ratings/feedback
   - Admin dashboard
   - Conversation analytics

## Support

For issues with:

- **OpenAI**: Visit [OpenAI Documentation](https://platform.openai.com/docs)
- **Next.js**: Visit [Next.js Documentation](https://nextjs.org/docs)
- **Tailwind CSS**: Visit [Tailwind Documentation](https://tailwindcss.com/docs)
