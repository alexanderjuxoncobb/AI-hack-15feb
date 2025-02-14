import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";

function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 0 }}>
          REA Search
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            startIcon={<SearchIcon />}
            sx={{ border: "none", fontWeight: "bold", padding: "10px 20px" }}
          >
            Search
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/results")}
            startIcon={<HistoryIcon />}
            sx={{
              border: "none",
              marginLeft: "20px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            People
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
