import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Snackbar, Alert, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import salaryAPI from "../api/salaryAPI";
import departmentAPI from "../api/departmentAPI";
import DataTable from "../components/DataTable";
import { MenuItem } from "@mui/material";

const SalaryForm = ({ initial, departments, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ jobDepartment: null, amount: "", annual: "", bonus: "" });

  useEffect(() => {
    if (initial) {
      const jd = initial.jobDepartment ? { jobId: initial.jobDepartment.jobId } : null;
      setForm({ jobDepartment: jd, amount: initial.amount, annual: initial.annual, bonus: initial.bonus });
    } else {
      setForm({ jobDepartment: null, amount: "", annual: "", bonus: "" });
    }
  }, [initial]);

  const handleChange = (key) => (e) => {
    if (key === "jobDepartment") {
      const id = Number(e.target.value);
      setForm(s => ({ ...s, jobDepartment: id ? { jobId: id } : null }));
    } else {
      setForm(s => ({ ...s, [key]: e.target.value }));
    }
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField select label="Department" value={(form.jobDepartment && form.jobDepartment.jobId) || ""} onChange={handleChange("jobDepartment")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {departments.map(d => <MenuItem key={d.jobId} value={d.jobId}>{d.name}</MenuItem>)}
      </TextField>

      <TextField label="Amount" value={form.amount || ""} onChange={handleChange("amount")} fullWidth sx={{ mb: 2 }} />
      <TextField label="Annual" value={form.annual || ""} onChange={handleChange("annual")} fullWidth sx={{ mb: 2 }} />
      <TextField label="Bonus" value={form.bonus || ""} onChange={handleChange("bonus")} fullWidth />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

export default function Salaries() {
  const [rows, setRows] = useState([]);
  const [depts, setDepts] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { load(); loadDepts(); }, []);

  const load = async () => {
    try {
      const res = await salaryAPI.getAll();
      const mapped = res.data.map(s => ({
        id: s.salaryId,
        salaryId: s.salaryId,
        jobName: s.jobDepartment ? s.jobDepartment.name : "",
        amount: s.amount,
        annual: s.annual,
        bonus: s.bonus
      }));
      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load salaries", severity: "error" });
    }
  };

  const loadDepts = async () => {
    try {
      const r = await departmentAPI.getAll();
      setDepts(r.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAdd = async (form) => {
    try {
      await salaryAPI.create(form);
      setOpenAdd(false);
      setSnack({ open: true, message: "Salary created", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Create failed", severity: "error" });
    }
  };

  const handleEditSave = async (form) => {
    try {
      await salaryAPI.update(editItem.salaryId, form);
      setEditItem(null);
      setSnack({ open: true, message: "Salary updated", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this salary record?")) return;
    try {
      await salaryAPI.delete(id);
      setSnack({ open: true, message: "Deleted", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "salaryId", headerName: "ID" },
    { field: "jobName", headerName: "Dept" },
    { field: "amount", headerName: "Amount" },
    { field: "annual", headerName: "Annual" },
    { field: "bonus", headerName: "Bonus" }
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Salaries</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenAdd(true)}>Add Salary</Button>
      </Box>

      <DataTable columns={columns} rows={rows} onEdit={(id) => {
        const item = rows.find(r => r.salaryId === id);
        setEditItem(item);
      }} onDelete={(id) => handleDelete(id)} />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
        <DialogTitle>Add Salary</DialogTitle>
        <DialogContent><SalaryForm departments={depts} onSubmit={handleAdd} onCancel={() => setOpenAdd(false)} /></DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onClose={() => setEditItem(null)} fullWidth>
        <DialogTitle>Edit Salary</DialogTitle>
        <DialogContent>{editItem && <SalaryForm initial={editItem} departments={depts} onSubmit={handleEditSave} onCancel={() => setEditItem(null)} />}</DialogContent>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
}
