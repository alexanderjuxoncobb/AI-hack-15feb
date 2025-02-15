// ResultsPage.jsx
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { useImage } from "../context/ImageContext";

const ResultsPage = () => {
  const { searchHistory } = useImage();

  const renderAnalysis = (analysis) => {
    try {
      // If analysis is already an object, use it directly
      const data =
        typeof analysis === "string" ? JSON.parse(analysis) : analysis;

      return (
        <>
          <Typography color="text.secondary">
            Product: {data.name_of_product || "N/A"}
          </Typography>
          <Typography color="text.secondary">
            Brand: {data.name_of_brand || "N/A"}
          </Typography>
          <Typography color="text.secondary">
            Weight: {data.weight || "N/A"}
          </Typography>
          <Typography color="text.secondary">
            Country: {data.country || "UK"}
          </Typography>
        </>
      );
    } catch (err) {
      console.error("Error rendering analysis:", err);
      return (
        <Typography color="error">
          Error displaying product information
        </Typography>
      );
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
                    Product Information
                  </Typography>
                  {item.results.analysis && (
                    <Box sx={{ mb: 2 }}>
                      {renderAnalysis(item.results.analysis)}
                    </Box>
                  )}
                  <Divider sx={{ my: 2 }} />
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
                      Reason: {item.reason}
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
