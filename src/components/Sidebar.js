// src/components/Sidebar.js
import React from "react";
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 220;

const Sidebar = ({ basePath = "/app" }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const menu = [
    { text: "Dashboard", path: `${basePath}/dashboard` },
    { text: "Employees", path: `${basePath}/employees` },
    { text: "Departments", path: `${basePath}/departments` },
    { text: "Salaries", path: `${basePath}/salaries` },
    { text: "Leaves", path: `${basePath}/leaves` },
    { text: "Payroll", path: `${basePath}/payroll` }
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          bgcolor: "background.paper",
        },
      }}
    >
      <Toolbar />
      <List>
        {menu.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => navigate(item.path)}
            selected={location.pathname === item.path}
          >
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
