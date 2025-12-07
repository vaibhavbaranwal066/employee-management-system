import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Snackbar, Alert, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import departmentAPI from "../api/departmentAPI";
import DataTable from "../components/DataTable";

const DeptForm = ({ initial, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ jobDept: "", name: "", description: "", salaryRange: "" });

  useEffect(() => {
    if (initial) setForm(initial);
    else setForm({ jobDept: "", name: "", description: "", salaryRange: "" });
  }, [initial]);

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField label="Dept Code" value={form.jobDept} onChange={(e) => setForm({ ...form, jobDept: e.target.value })} fullWidth sx={{ mb: 2 }} />
      <TextField label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} fullWidth sx={{ mb: 2 }} />
      <TextField label="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} fullWidth sx={{ mb: 2 }} />
      <TextField label="Salary Range" value={form.salaryRange} onChange={(e) => setForm({ ...form, salaryRange: e.target.value })} fullWidth />
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

const Departments = () => {
  const [rows, setRows] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { load(); }, []);

  const load = async () => {
    try {
      const res = await departmentAPI.getAll();
      const mapped = res.data.map(d => ({ id: d.jobId, jobId: d.jobId, name: d.name, jobDept: d.jobDept, salaryRange: d.salaryRange }));
      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load departments", severity: "error" });
    }
  };

  const handleAdd = async (form) => {
    try {
      await departmentAPI.create(form);
      setOpenAdd(false);
      setSnack({ open: true, message: "Department created", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Create failed", severity: "error" });
    }
  };

  const handleEdit = async (form) => {
    try {
      await departmentAPI.update(editItem.jobId, form);
      setEditItem(null);
      setSnack({ open: true, message: "Department updated", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this department?")) return;
    try {
      await departmentAPI.delete(id);
      setSnack({ open: true, message: "Deleted", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "jobId", headerName: "ID" },
    { field: "jobDept", headerName: "Code" },
    { field: "name", headerName: "Name" },
    { field: "salaryRange", headerName: "Salary Range" }
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Departments</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenAdd(true)}>Add Dept</Button>
      </Box>

      <DataTable columns={columns} rows={rows} onEdit={(id) => {
        const item = rows.find(r => r.jobId === id);
        setEditItem(item);
      }} onDelete={(id) => handleDelete(id)} />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
        <DialogTitle>Add Department</DialogTitle>
        <DialogContent><DeptForm onSubmit={handleAdd} onCancel={() => setOpenAdd(false)} /></DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onClose={() => setEditItem(null)} fullWidth>
        <DialogTitle>Edit Department</DialogTitle>
        <DialogContent>{editItem && <DeptForm initial={editItem} onSubmit={handleEdit} onCancel={() => setEditItem(null)} />}</DialogContent>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Departments;
