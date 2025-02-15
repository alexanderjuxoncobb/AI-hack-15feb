import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

export async function getGeminiResponse(prompt: string, imageBase64: string) {
  try {
    // Get the vision model
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Prepare the image data
    const imageData = {
      inlineData: {
        data: imageBase64,
        mimeType: "image/jpeg", // Adjust based on your image type
      },
    };

    // Generate content with both prompt and image
    const result = await model.generateContent([prompt, imageData]);
    const response = await result.response;
    
    return {
      success: true,
      data: response.text(),
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    return {
      success: false,
      error: "Failed to process image with Gemini",
    };
  }
} 