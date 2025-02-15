const handleImageSubmit = async (imageFile: File, prompt: string) => {
  try {
    // Convert image to base64
    const base64Image = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(imageFile);
    });

    // Make API request
    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt,
        image: base64Image,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to get Gemini response");
    }

    const data = await response.json();
    // Handle the Gemini response data
    console.log(data.result);
    
  } catch (error) {
    console.error("Error processing image:", error);
    // Handle error appropriately
  }
}; 