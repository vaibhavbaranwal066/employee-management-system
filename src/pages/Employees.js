import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, MenuItem, Grid, IconButton, Snackbar, Alert, Typography
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import employeeAPI from "../api/employeeAPI";
import departmentAPI from "../api/departmentAPI";
import DataTable from "../components/DataTable";
import { useNavigate } from "react-router-dom";

const EmployeeForm = ({ initial, departments, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    fname: "", lname: "", gender: "", age: "", contactAdd: "", empEmail: "", empPass: "", jobDepartment: null
  });

  useEffect(() => {
    if (initial) {
      // normalize jobDepartment to { jobId }
      const jd = initial.jobDepartment ? { jobId: initial.jobDepartment.jobId } : null;
      setForm({ ...initial, jobDepartment: jd });
    } else {
      setForm({
        fname: "", lname: "", gender: "", age: "", contactAdd: "", empEmail: "", empPass: "", jobDepartment: null
      });
    }
  }, [initial]);

  const handleChange = (key) => (e) => {
    if (key === "jobDepartment") {
      const jobId = Number(e.target.value);
      setForm((s) => ({ ...s, jobDepartment: jobId ? { jobId } : null }));
    } else {
      setForm((s) => ({ ...s, [key]: e.target.value }));
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><TextField required label="First name" value={form.fname || ""} onChange={handleChange("fname")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField required label="Last name" value={form.lname || ""} onChange={handleChange("lname")} fullWidth /></Grid>
        <Grid item xs={12} sm={4}><TextField select label="Gender" value={form.gender || ""} onChange={handleChange("gender")} fullWidth>
          <MenuItem value="">Select</MenuItem>
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField></Grid>
        <Grid item xs={12} sm={4}><TextField label="Age" type="number" value={form.age || ""} onChange={handleChange("age")} fullWidth /></Grid>
        <Grid item xs={12} sm={4}><TextField label="Contact" value={form.contactAdd || ""} onChange={handleChange("contactAdd")} fullWidth /></Grid>

        <Grid item xs={12} sm={6}><TextField label="Email" value={form.empEmail || ""} onChange={handleChange("empEmail")} fullWidth /></Grid>
        <Grid item xs={12} sm={6}><TextField label="Password" value={form.empPass || ""} onChange={handleChange("empPass")} fullWidth /></Grid>

        <Grid item xs={12}>
          <TextField select label="Department" value={(form.jobDepartment && form.jobDepartment.jobId) || ""} onChange={handleChange("jobDepartment")} fullWidth>
            <MenuItem value="">None</MenuItem>
            {departments.map((d) => <MenuItem key={d.jobId} value={d.jobId}>{d.name}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

const Employees = () => {
  const [rows, setRows] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  const navigate = useNavigate();

  useEffect(() => {
    load();
    loadDepartments();
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const res = await employeeAPI.getAll();
      // map to DataTable rows (row.id required)
      const mapped = res.data.map((e) => ({
        id: e.empId,
        empId: e.empId,
        fname: e.fname,
        lname: e.lname,
        gender: e.gender,
        age: e.age,
        contactAdd: e.contactAdd,
        empEmail: e.empEmail,
        jobName: e.jobDepartment ? e.jobDepartment.name : ""
      }));
      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load employees", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const res = await departmentAPI.getAll();
      setDepartments(res.data);
    } catch (err) {
      console.error("departments load err", err);
    }
  };

  const handleAdd = async (form) => {
    try {
      await employeeAPI.create(form);
      setOpenAdd(false);
      setSnack({ open: true, message: "Employee created", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Create failed", severity: "error" });
    }
  };

  const handleEditOpen = async (id) => {
    try {
      const res = await employeeAPI.get(id);
      setEditItem(res.data);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load employee", severity: "error" });
    }
  };

  const handleEditSave = async (form) => {
    try {
      await employeeAPI.update(editItem.empId, form);
      setEditItem(null);
      setSnack({ open: true, message: "Employee updated", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      await employeeAPI.delete(id);
      setSnack({ open: true, message: "Employee deleted", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "empId", headerName: "ID" },
    { field: "fname", headerName: "First" },
    { field: "lname", headerName: "Last" },
    { field: "jobName", headerName: "Dept" },
    { field: "empEmail", headerName: "Email" }
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Employees</Typography>
        <Box>
          <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenAdd(true)}>Add Employee</Button>
        </Box>
      </Box>

      <DataTable columns={columns} rows={rows} onEdit={(id) => handleEditOpen(id)} onDelete={(id) => handleDelete(id)} />

      {/* Add Dialog */}
      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} maxWidth="md" fullWidth>
        <DialogTitle>Add Employee</DialogTitle>
        <DialogContent>
          <EmployeeForm initial={null} departments={departments} onSubmit={handleAdd} onCancel={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editItem} onClose={() => setEditItem(null)} maxWidth="md" fullWidth>
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent>
          {editItem && <EmployeeForm initial={editItem} departments={departments} onSubmit={handleEditSave} onCancel={() => setEditItem(null)} />}
        </DialogContent>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Employees;
