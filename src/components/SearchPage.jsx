import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Paper,
  Typography,
  Button,
  TextField,
  Box,
  Container,
  Collapse,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useImage } from "../hooks/useImage";
import PropTypes from "prop-types";

const SearchPage = ({ onSearch }) => {
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

    if (!image) {
      console.error("No image selected");
      return;
    }

    try {
      const reader = new FileReader();

      const base64Image = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(image);
      });

      const response = await fetch("http://localhost:5001/api/analyze-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
          barcode: barcode,
          context: context,
          reason: reason === "Other" ? otherReason : reason,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error);
      }

      const mockResult = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        imageUrl: previewUrl,
        barcode,
        context,
        reason: reason === "Other" ? otherReason : reason,
        results: {
          analysis: data.analysis,
          carbonFootprint: "Pending API integration",
          esgScore: "Pending API integration",
        },
      };

      if (onSearch) {
        onSearch(mockResult);
      }

      addToHistory(mockResult);
      navigate("/results");
    } catch (error) {
      console.error("Error analyzing image:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          ESG Scanner
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Box sx={{ mb: 3 }}>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="image-upload"
              type="file"
              onChange={handleImageChange}
              required
            />
            <label htmlFor="image-upload">
              <Button
                variant="outlined"
                component="span"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ mb: 2 }}
              >
                Upload Product Image
              </Button>
            </label>
            {previewUrl && (
              <Box sx={{ mt: 2, textAlign: "center" }}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={{ maxWidth: "300px", borderRadius: "8px" }}
                />
              </Box>
            )}
          </Box>

          <TextField
            fullWidth
            label="Barcode (Optional)"
            value={barcode}
            onChange={(e) => setBarcode(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Reason for using CoffeeMonster2000:
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: "20px",
              mb: 2,
              flexWrap: "wrap",
            }}
          >
            {["Health", "Environment", "Dietary Restrictions", "Other"].map(
              (buttonText) => (
                <Button
                  key={buttonText}
                  onClick={() => handleReasonClick(buttonText)}
                  variant={reason === buttonText ? "contained" : "outlined"}
                  sx={{
                    flex: "1 1 calc(25% - 15px)",
                    minWidth: "140px",
                    borderRadius: "20px",
                  }}
                >
                  {buttonText}
                </Button>
              )
            )}
          </Box>

          <Collapse in={showOtherInput}>
            <TextField
              fullWidth
              label="Specify Other Reason"
              value={otherReason}
              onChange={(e) => setOtherReason(e.target.value)}
              sx={{ mb: 3 }}
              required={showOtherInput}
            />
          </Collapse>

          <TextField
            fullWidth
            label="Additional Context"
            multiline
            rows={4}
            value={context}
            onChange={(e) => setContext(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{ mt: 2 }}
          >
            Scan Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

SearchPage.propTypes = {
  onSearch: PropTypes.func,
};

export default SearchPage;
