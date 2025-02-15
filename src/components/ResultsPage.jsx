import React from "react";
import {
  Container,
  Paper,
  Typography,
  Grid,
  Box,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useImage } from "../hooks/useImage";
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ResultsPage = () => {
  const { searchHistory } = useImage();

  const renderAnalysis = (analysis) => {
    try {
      const parsedAnalysis =
        typeof analysis === "string" ? JSON.parse(analysis) : analysis;
      return (
        <Box>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    borderBottom: "2px solid #333",
                    pb: 1,
                    color: "#333",
                  }}
                >
                  Basic Information
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.5,
                    mt: 2,
                  }}
                >
                  {[
                    { label: "Product", value: parsedAnalysis.name_of_product },
                    { label: "Brand", value: parsedAnalysis.name_of_brand },
                    { label: "Weight", value: parsedAnalysis.weight },
                    { label: "Country", value: parsedAnalysis.country },
                    { label: "Origin", value: parsedAnalysis.origin_countries },
                  ].map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        p: 1.5,
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "rgba(0, 0, 0, 0.02)",
                        border: "1px solid rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <Typography
                        variant="subtitle2"
                        sx={{ minWidth: 80, color: "#666" }}
                      >
                        {item.label}:
                      </Typography>
                      <Typography variant="body1" sx={{ ml: 1 }}>
                        {item.value}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 2,
                  background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    borderBottom: "2px solid #4caf50",
                    pb: 1,
                    color: "#2e7d32",
                  }}
                >
                  Carbon Footprint:{" "}
                  <Typography component="span" sx={{ fontWeight: "bold" }}>
                    {parsedAnalysis.carbon_footprint_summary || "66.6g CO2e"}
                  </Typography>
                </Typography>

                <Accordion
                  sx={{
                    mt: 2,
                    "&:before": { display: "none" },
                    boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
                    border: "1px solid rgba(0,0,0,0.1)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    sx={{
                      backgroundColor: "rgba(76, 175, 80, 0.04)",
                      "&:hover": { backgroundColor: "rgba(76, 175, 80, 0.08)" },
                    }}
                  >
                    <Typography sx={{ fontWeight: 500 }}>
                      View Detailed Breakdown
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box className="markdown-content" sx={{ p: 1 }}>
                      <ReactMarkdown>
                        {parsedAnalysis.carbon_footprint_grams}
                      </ReactMarkdown>
                    </Box>
                  </AccordionDetails>
                </Accordion>

                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    backgroundColor: "rgba(76, 175, 80, 0.04)",
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{ color: "#2e7d32", mb: 1 }}
                  >
                    Equivalent to:
                  </Typography>
                  <Box sx={{ pl: 2 }}>
                    <ReactMarkdown>
                      {parsedAnalysis.unique_equivalents}
                    </ReactMarkdown>
                  </Box>
                </Box>
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 2,
                  background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    borderBottom: "2px solid #ff9800",
                    pb: 1,
                    color: "#ed6c02",
                  }}
                >
                  Health Considerations
                </Typography>
                <Box
                  className="markdown-content"
                  sx={{
                    mt: 2,
                    "& ul": {
                      listStyleType: "none",
                      p: 0,
                      m: 0,
                    },
                    "& li": {
                      mb: 1,
                      p: 1.5,
                      backgroundColor: "rgba(255, 152, 0, 0.04)",
                      border: "1px solid rgba(255, 152, 0, 0.1)",
                      borderRadius: 1,
                      "&::before": {
                        content: '"•"',
                        color: "#ff9800",
                        fontWeight: "bold",
                        display: "inline-block",
                        width: "1em",
                        marginLeft: "-1em",
                      },
                    },
                  }}
                >
                  <ReactMarkdown>
                    {parsedAnalysis.health_considerations}
                  </ReactMarkdown>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      );
    } catch (error) {
      return <Typography color="error">Error parsing analysis data</Typography>;
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        component="h1"
        sx={{
          mb: 4,
          mt: 4,
          textAlign: "center",
          color: "#333",
          fontWeight: "bold",
        }}
      >
        Scan Results
      </Typography>

      {searchHistory.length === 0 ? (
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: "center",
            borderRadius: 2,
            backgroundColor: "#f8f9fa",
          }}
        >
          <Typography color="text.secondary">
            No scans yet. Try scanning a product!
          </Typography>
        </Paper>
      ) : (
        <Box sx={{ mt: 2 }}>
          {searchHistory.map((item) => (
            <Paper
              key={item.id}
              elevation={3}
              sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
                border: "1px solid rgba(0,0,0,0.1)",
                background: "linear-gradient(to bottom, #ffffff, #f8f9fa)",
              }}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  {item.imageUrl && (
                    <Paper
                      elevation={2}
                      sx={{
                        p: 1,
                        borderRadius: 2,
                        overflow: "hidden",
                      }}
                    >
                      <img
                        src={item.imageUrl}
                        alt="Scanned product"
                        style={{
                          width: "100%",
                          height: "auto",
                          borderRadius: "8px",
                          display: "block",
                        }}
                      />
                    </Paper>
                  )}
                </Grid>
                <Grid item xs={12} md={8}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      borderBottom: "2px solid #333",
                      pb: 1,
                      color: "#333",
                    }}
                  >
                    Scan Details
                  </Typography>
                  <Box
                    sx={{
                      mb: 2,
                      display: "flex",
                      flexDirection: "column",
                      gap: 1,
                    }}
                  >
                    {[
                      {
                        label: "Date",
                        value: new Date(item.timestamp).toLocaleString(),
                      },
                      { label: "Barcode", value: item.barcode },
                      { label: "Reason", value: item.reason },
                      { label: "Context", value: item.context },
                    ]
                      .filter((i) => i.value)
                      .map((detail, index) => (
                        <Paper
                          key={index}
                          sx={{
                            p: 1.5,
                            backgroundColor: "rgba(0, 0, 0, 0.02)",
                            border: "1px solid rgba(0, 0, 0, 0.1)",
                          }}
                        >
                          <Typography
                            variant="subtitle2"
                            component="span"
                            sx={{ color: "#666", mr: 1 }}
                          >
                            {detail.label}:
                          </Typography>
                          <Typography variant="body2" component="span">
                            {detail.value}
                          </Typography>
                        </Paper>
                      ))}
                  </Box>
                  <Divider sx={{ my: 2 }} />
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      borderBottom: "2px solid #333",
                      pb: 1,
                      color: "#333",
                    }}
                  >
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
