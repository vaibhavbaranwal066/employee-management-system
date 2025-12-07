import React, { useMemo, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline, Box, Toolbar } from "@mui/material";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Departments from "./pages/Departments";
import Salaries from "./pages/Salaries";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";

const drawerWidth = 220;

function App() {
  const [mode, setMode] = useState(localStorage.getItem("ems_theme") || "light");

  const toggleTheme = () => {
    const next = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem("ems_theme", next);
  };

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route path="/" element={<Login />} />

          {/* PROTECTED AREA */}
          <Route
            path="/app"
            element={
              <ProtectedRoute>
                <MainLayout mode={mode} toggleTheme={toggleTheme} />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<Employees />} />
            <Route path="departments" element={<Departments />} />
            <Route path="salaries" element={<Salaries />} />
            <Route path="leaves" element={<Leaves />} />
            <Route path="payroll" element={<Payroll />} />
          </Route>

          {/* FALLBACK */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const MainLayout = ({ mode, toggleTheme }) => {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar mode={mode} toggleTheme={toggleTheme} />
      <Sidebar basePath="/app" />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

export default App;
