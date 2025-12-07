import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

const Navbar = ({ mode, toggleTheme }) => {
  const handleLogout = () => {
    localStorage.removeItem("ems_logged_in");
    window.location.href = "/";
  };

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
    >
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Employee Management System
        </Typography>

        <IconButton color="inherit" onClick={toggleTheme}>
          {mode === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>

        <IconButton color="inherit" onClick={handleLogout}>
          Logout
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
