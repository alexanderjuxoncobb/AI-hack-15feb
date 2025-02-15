import { NextResponse } from "next/server";
import { getGeminiResponse } from "@/utils/gemini";

export async function POST(request: Request) {
  try {
    const { prompt, image } = await request.json();

    if (!prompt || !image) {
      return NextResponse.json(
        { error: "Prompt and image are required" },
        { status: 400 }
      );
    }

    // Remove the data:image/jpeg;base64, prefix if present
    const base64Image = image.replace(/^data:image\/\w+;base64,/, "");

    const response = await getGeminiResponse(prompt, base64Image);

    if (!response.success) {
      return NextResponse.json(
        { error: response.error },
        { status: 500 }
      );
    }

    return NextResponse.json({ result: response.data });
  } catch (error) {
    console.error("API Route Error:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
} 