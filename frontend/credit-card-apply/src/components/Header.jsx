import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" color="primary" elevation={1}>
      <Toolbar>
        {/* LEFT SIDE TITLE */}
        <Typography
          variant="h6"
          component="div"
          sx={{ cursor: "pointer" }}
          onClick={() => navigate("/")}
        >
          Credit Portal
        </Typography>

        {/* PUSH BUTTON TO RIGHT */}
        <Box sx={{ flexGrow: 1 }} />

        {/* RIGHT SIDE LOGIN BUTTON */}
        <Button color="inherit" variant="outlined" onClick={handleLoginClick}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
