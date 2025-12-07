import React, { useState } from "react";
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Very simple fake auth for now
    if (email.trim() === "" || pass.trim() === "") {
      alert("Enter email & password");
      return;
    }
    localStorage.setItem("ems_logged_in", "true");
    navigate("/app/dashboard");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Paper elevation={3} sx={{ p: 4, width: 360 }}>
        <Typography variant="h5" textAlign="center" mb={2}>
          EMS Login
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />

          <Button variant="contained" fullWidth onClick={handleLogin}>
            Login
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
}
