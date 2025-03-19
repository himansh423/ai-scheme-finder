import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { message, scheme, userProfile, chatHistory } = await req.json();

    if (!message || !scheme) {
      return NextResponse.json(
        { error: "Message and scheme details are required" },
        { status: 400 }
      );
    }

    const formattedHistory = chatHistory.map((msg: any) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }],
    }));

    const systemPrompt = `
      You are an AI assistant specialized in providing information about government schemes and benefits.
      
      Current scheme details:
      - Name: ${scheme.name}
      - Category: ${scheme.category}
      - Eligibility: ${scheme.eligibility}
      - Trust Score: ${scheme.TrustScore}
      - Reason for recommendation: ${
        scheme.reason ||
        "This scheme aligns with the user's profile and financial goals."
      }
      
      User profile:
      - Age: ${userProfile.age}
      - Monthly Earnings: ${userProfile.salary}
      - Occupation: ${userProfile.occupation}
      - Location: ${userProfile.location}
      
      Provide accurate, helpful information about this specific scheme. If you don't know something specific about the scheme, acknowledge that and provide general guidance based on the available information.
      
      Keep your responses concise, informative, and focused on the scheme details provided.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const chat = model.startChat({
      history: formattedHistory,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      },
    });

    const result = await chat.sendMessage(
      `${systemPrompt}\n\nUser question: ${message}`
    );
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json(
      { error: "Failed to process your request" },
      { status: 500 }
    );
  }
}
