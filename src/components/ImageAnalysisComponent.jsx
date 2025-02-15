import { useState } from "react";
import { analyzeProductImage } from "../services/geminiService";

const ImageAnalysisComponent = ({ setSearchHistory }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const imageFile = formData.get('image');

    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    try {
      const analysisResult = await analyzeProductImage(imageFile, "This is a grocery product from a UK supermarket.");
      
      // Create an object to store the analysis result and image URL
      const resultData = {
        productName: analysisResult.productName,
        brandName: analysisResult.brandName,
        weight: analysisResult.weight,
        country: analysisResult.country,
        carbonFootprint: analysisResult.carbonFootprint,
        esgScore: analysisResult.esgScore,
        imageUrl: URL.createObjectURL(imageFile), // Create a URL for the uploaded image
        timestamp: new Date().toISOString(),
      };

      // Update the search history
      setSearchHistory(prev => [...prev, resultData]);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" required />
      <button type="submit">Analyze Image</button>
    </form>
  );
};

export default ImageAnalysisComponent; 