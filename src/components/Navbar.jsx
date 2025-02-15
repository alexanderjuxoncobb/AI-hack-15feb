import { AppBar, Toolbar, Button, Typography, Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import HistoryIcon from "@mui/icons-material/History";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            flexGrow: 0,
            textDecoration: "none",
            color: "inherit",
          }}
        >
          ESG Scanner
        </Typography>
        <Box>
          <Button
            color="inherit"
            onClick={() => navigate("/")}
            startIcon={<SearchIcon />}
            sx={{ fontWeight: "bold", padding: "10px 20px" }}
          >
            Scan
          </Button>
          <Button
            color="inherit"
            onClick={() => navigate("/results")}
            startIcon={<HistoryIcon />}
            sx={{
              marginLeft: "20px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Results
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
