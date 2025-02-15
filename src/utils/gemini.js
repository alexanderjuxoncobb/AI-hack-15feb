import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

export async function analyzeImageWithGemini(imageFile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
    
    // Convert image to base64
    const base64Image = await fileToBase64(imageFile);
    
    const prompt = "Analyze this image for ESG information. Provide the carbon footprint and ESG score.";
    
    const result = await model.generateContent([prompt, {
      inlineData: {
        data: base64Image,
        mimeType: imageFile.type
      }
    }]);

    return await result.response.text();
  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
}

// Helper function to convert file to base64
function fileToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64String = reader.result.split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
  });
} 