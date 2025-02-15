import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
} from "@mui/material";
import { useImage } from "../hooks/useImage";

const ResultsPage = () => {
  const { searchHistory } = useImage();

  const renderAnalysis = (analysis) => {
    try {
      const parsedAnalysis =
        typeof analysis === "string" ? JSON.parse(analysis) : analysis;
      return (
        <Box>
          <Typography variant="body1">
            Product: {parsedAnalysis.name_of_product}
          </Typography>
          <Typography variant="body1">
            Brand: {parsedAnalysis.name_of_brand}
          </Typography>
          <Typography variant="body1">
            Weight: {parsedAnalysis.weight}
          </Typography>
          <Typography variant="body1">
            Country: {parsedAnalysis.country}
          </Typography>
        </Box>
      );
    } catch (error) {
      return <Typography color="error">Error parsing analysis data</Typography>;
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
                    Product Analysis
                  </Typography>
                  {item.results &&
                    item.results.analysis &&
                    renderAnalysis(item.results.analysis)}
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
