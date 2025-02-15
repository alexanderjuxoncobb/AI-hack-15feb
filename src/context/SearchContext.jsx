import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useImage } from '../context/ImageContext';
import {
  Paper, Typography, Button, TextField,
  Box, Container, Collapse,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const SearchPage = () => {
  const navigate = useNavigate();
  const { addToHistory } = useImage();
  const [image, setImage] = useState(null);
  const [barcode, setBarcode] = useState("");
  const [context, setContext] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleReasonClick = (selectedReason) => {
    setReason(selectedReason);
    setShowOtherInput(selectedReason === "Other");
    if (selectedReason !== "Other") {
      setOtherReason("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mockResult = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      imageUrl: previewUrl,
      barcode,
      context,
      reason: reason === "Other" ? otherReason : reason,
      results: {
        carbonFootprint: "Pending API integration",
        esgScore: "Pending API integration",
      },
    };

    addToHistory(mockResult);
    navigate("/results");
  };

  // Rest of your component remains the same
  // ...
};

export default SearchPage;