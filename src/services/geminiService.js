import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function analyzeProductImage(imageFile, additionalContext = "") {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });

    // Convert the image to base64
    const imageData = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.readAsDataURL(imageFile);
    });

    // Prepare the image part
    const imagePart = {
      inlineData: {
        data: imageData,
        mimeType: imageFile.type,
      },
    };

    // Create a more specific prompt
    const prompt = `
      Please analyze this product image and provide ONLY the following details in this exact format:
      Product Name: [name]
      Brand Name: [brand]
      Weight/Size: [weight]
      Country: [specify if UK or not]
      
      Please be concise and only provide these specific details.
      ${additionalContext}
    `;

    const response = await model.generateContent([prompt, imagePart]);
    const result = await response.response.text();

    return {
      analysis: result,
      imageUrl: imageData,
    };
  } catch (error) {
    console.error("Detailed error in analyzeProductImage:", error);
    throw new Error(`Failed to analyze image: ${error.message}`);
  }
}

// Helper function to convert File object to GenerativePart
async function fileToGenerativePart(file) {
  const buffer = await file.arrayBuffer();
  return {
    inlineData: {
      data: Buffer.from(buffer).toString("base64"),
      mimeType: file.type,
    },
  };
}
