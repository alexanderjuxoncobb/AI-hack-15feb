import { useImage } from "../context/ImageContext";
import { useNavigate } from "react-router-dom";

export default function ScanPage() {
  const { setUploadedImage } = useImage();
  const navigate = useNavigate();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create URL for the image
    const imageUrl = URL.createObjectURL(file);
    setUploadedImage(imageUrl);

    // Continue with your existing analysis logic
    // ...

    navigate("/results");
  };

  // ... rest of your component
}
