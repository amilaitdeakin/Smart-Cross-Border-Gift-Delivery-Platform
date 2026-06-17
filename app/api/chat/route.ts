import { OpenAI } from "openai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemMessage = {
      role: "system" as const,
      content: `You are a helpful customer service assistant for WorldWish, a cross-border gift delivery platform. 
      You help customers find the perfect gifts, answer questions about delivery, assist with orders, and provide recommendations. 
      Be friendly, professional, and helpful. If you don't know something about specific policies, suggest the customer contact support.`,
    };

    const allMessages = [
      systemMessage,
      ...messages.map((msg: any) => ({
        role: msg.role as "user" | "assistant",
        content: msg.content,
      })),
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: allMessages as any,
      temperature: 0.7,
      max_tokens: 500,
    });

    const assistant_message =
      response.choices[0]?.message?.content || "I apologize, I couldn't generate a response.";

    return NextResponse.json({
      message: assistant_message,
      role: "assistant",
    });
  } catch (error) {
    console.error("Chat error:", error);
    return NextResponse.json(
      { error: "Failed to process chat request" },
      { status: 500 }
    );
  }
}
