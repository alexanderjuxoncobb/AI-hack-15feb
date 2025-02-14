import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material";
import SearchPage from "./pages/SearchPage";
import ResultsPage from "./pages/ResultsPage";
import Navbar from "./components/Navbar";
import { SearchProvider } from "./context/SearchContext";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2c3e50",
      light: "#34495e",
      dark: "#1a252f",
    },
    secondary: {
      main: "#78909c",
      light: "#b0bec5",
      dark: "#546e7a",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#2c3e50",
      secondary: "#5c6b73",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 500,
      color: "#2c3e50",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#ffffff",
          color: "#2c3e50",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #e0e0e0",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          border: "1px solid #e0e0e0",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            "&:hover fieldset": {
              borderColor: "#2c3e50",
            },
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "1px solid #e0e0e0",
          borderRadius: "8px !important",
          marginBottom: "8px",
          "&:before": {
            display: "none",
          },
          "&.Mui-expanded": {
            margin: "0 0 8px 0",
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          "&.Mui-expanded": {
            borderBottom: "1px solid #e0e0e0",
          },
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SearchProvider>
        <Router>
          <div className="app-container">
            <Navbar />
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/results" element={<ResultsPage />} />
            </Routes>
          </div>
        </Router>
      </SearchProvider>
    </ThemeProvider>
  );
}

export default App;
