import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => (
  <AppBar position="static" color="default" elevation={1}>
    <Toolbar sx={{ justifyContent: "center" }}>
      <Typography variant="h5" fontWeight={600} component="h1">
        Credit Card Application Portal
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
