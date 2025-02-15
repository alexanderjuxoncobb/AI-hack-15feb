import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { analyzeProductImage } from "../services/geminiService";
import { useImage } from "../hooks/useImage";

const ResultsPage = () => {
  const { searchHistory } = useImage();

  const handleImageAnalysis = async (imageFile) => {
    try {
      const result = await analyzeProductImage(
        imageFile,
        "This is a grocery product from a UK supermarket"
      );
      console.log(result);
      // Handle the result as needed
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" sx={{ mb: 4, mt: 4 }}>
        Scan Results
      </Typography>
      {searchHistory.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: "center" }}>
          <Typography color="text.secondary">
            No scans yet. Try scanning a product!
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ mt: 2 }}>
          {searchHistory.map((item) => (
            <Paper key={item.id} sx={{ p: 3, mb: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  {item.imageUrl && (
                    <img
                      src={item.imageUrl}
                      alt="Scanned product"
                      style={{
                        width: "100%",
                        maxWidth: "300px",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography variant="h6" gutterBottom>
                    Scan Details
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    <Typography color="text.secondary">
                      Date: {new Date(item.timestamp).toLocaleString()}
                    </Typography>
                    {item.barcode && (
                      <Typography color="text.secondary">
                        Barcode: {item.barcode}
                      </Typography>
                    )}
                    <Typography color="text.secondary">
                      {item.reason ? `Reason: ${item.reason}` : ""}
                    </Typography>
                    {item.context && (
                      <Typography color="text.secondary">
                        Context: {item.context}
                      </Typography>
                    )}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" gutterBottom>
                    ESG Information
                  </Typography>
                  <Typography color="text.secondary">
                    Carbon Footprint: {item.results.carbonFootprint}
                  </Typography>
                  <Typography color="text.secondary">
                    ESG Score: {item.results.esgScore}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default ResultsPage;
