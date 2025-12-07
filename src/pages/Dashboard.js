import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography } from "@mui/material";
import employeeAPI from "../api/employeeAPI";
import departmentAPI from "../api/departmentAPI";
import salaryAPI from "../api/salaryAPI";
import payrollAPI from "../api/payrollAPI";

const StatCard = ({ title, value }) => (
  <Paper elevation={3} sx={{ p: 2 }}>
    <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
    <Typography variant="h5">{value}</Typography>
  </Paper>
);

const Dashboard = () => {
  const [empCount, setEmpCount] = useState(0);
  const [deptCount, setDeptCount] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);
  const [payrollCount, setPayrollCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const [e, d, s, p] = await Promise.all([
          employeeAPI.getAll(),
          departmentAPI.getAll(),
          salaryAPI.getAll(),
          payrollAPI.getAll(),
        ]);
        setEmpCount(e.data.length);
        setDeptCount(d.data.length);
        setSalaryCount(s.data.length);
        setPayrollCount(p.data.length);
      } catch (err) {
        console.error("Dashboard load error", err);
      }
    })();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Employees" value={empCount} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Departments" value={deptCount} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Salary Records" value={salaryCount} /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatCard title="Payrolls" value={payrollCount} /></Grid>
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Typography variant="h6">Quick notes</Typography>
        <Typography variant="body2" color="text.secondary">
          Use the sidebar to manage Employees, Departments, Salaries, Leaves and Payrolls. The UI uses modal forms for Add/Edit.
        </Typography>
      </Box>
    </Box>
  );
};

export default Dashboard;
