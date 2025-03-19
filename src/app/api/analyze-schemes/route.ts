import { GoogleGenerativeAI } from "@google/generative-ai";
import { type NextRequest, NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_GEMINI_API_KEY || ""
);
interface SchemeDetails {
  name: string;
  category: string;
  eligibility: string;
  TrustScore: string;
  reason?: string;
}
export async function POST(request: NextRequest) {
  try {
    const { schemes, userProfile } = await request.json();

    if (!schemes || schemes.length < 2) {
      return NextResponse.json(
        { error: "At least two schemes are required for comparison" },
        { status: 400 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const schemesData = schemes
      .map((scheme: SchemeDetails) => {
        return `
Scheme Name: ${scheme.name}
Trust Score: ${scheme.TrustScore}
Category: ${scheme.category}
Eligibility: ${scheme.eligibility}
Reason: ${scheme.reason}
      `;
      })
      .join("\n\n");

    const userProfileData = `
Age: ${userProfile.age}
Monthly Earnings: ${userProfile.salary}
Occupation: ${userProfile.occupation}
Location: ${userProfile.location}
    `;

    const prompt = `
You are a financial advisor specializing in government schemes and financial products. 
I need you to analyze the following schemes and determine which one is the best fit for the user based on their profile.

USER PROFILE:
${userProfileData}

SCHEMES TO COMPARE:
${schemesData}

Please provide a comprehensive analysis in the following JSON format:
{
  "bestScheme": "Name of the best scheme",
  "reasoning": "A concise explanation of why this scheme is the best fit for the user",
  "comparisonTable": {
    "Scheme Name 1": {
      "advantages": ["advantage 1", "advantage 2", "advantage 3"],
      "disadvantages": ["disadvantage 1", "disadvantage 2"],
      "suitabilityScore": 85
    },
    "Scheme Name 2": {
      "advantages": ["advantage 1", "advantage 2", "advantage 3"],
      "disadvantages": ["disadvantage 1", "disadvantage 2"],
      "suitabilityScore": 75
    }
  },
  "detailedAnalysis": "A detailed paragraph explaining the comparison between all schemes and why the recommended one is the best fit"
}

Ensure that:
1. The suitabilityScore is a number between 0-100
2. Each scheme has at least 2 advantages and 1 disadvantage
3. The bestScheme matches one of the scheme names exactly
4. The reasoning is concise (1-2 sentences)
5. The detailedAnalysis is comprehensive (at least 100 words)
6. The response is valid JSON that can be parsed
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const jsonMatch =
      text.match(/```json\n([\s\S]*?)\n```/) ||
      text.match(/```\n([\s\S]*?)\n```/) ||
      text.match(/{[\s\S]*}/);

    let parsedResponse;
    if (jsonMatch) {
      try {
        parsedResponse = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } catch (e) {
        console.log(e)
        const cleanedJson = (jsonMatch[1] || jsonMatch[0])
          .replace(/[\u201C\u201D]/g, '"')
          .replace(/'/g, '"');
        parsedResponse = JSON.parse(cleanedJson);
      }
    } else {
      try {
        parsedResponse = JSON.parse(text);
      } catch (e) {
        console.log(e)
        return NextResponse.json(
          { error: "Failed to parse AI response", rawResponse: text },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Error analyzing schemes:", error);
    return NextResponse.json(
      { error: "Failed to analyze schemes", details: (error as Error).message },
      { status: 500 }
    );
  }
}
