import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Snackbar, Alert, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import leaveAPI from "../api/leaveAPI";
import employeeAPI from "../api/employeeAPI";
import DataTable from "../components/DataTable";

const LeaveForm = ({ initial, employees, onSubmit, onCancel }) => {
  const [form, setForm] = useState({ employee: null, date: "", reason: "" });

  useEffect(() => {
    if (initial) {
      const emp = initial.employee ? { empId: initial.employee.empId } : null;
      setForm({ employee: emp, date: initial.date, reason: initial.reason });
    } else setForm({ employee: null, date: "", reason: "" });
  }, [initial]);

  const handleChange = (key) => (e) => {
    if (key === "employee") setForm(s => ({ ...s, employee: { empId: Number(e.target.value) } }));
    else setForm(s => ({ ...s, [key]: e.target.value }));
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField select label="Employee" value={(form.employee && form.employee.empId) || ""} onChange={handleChange("employee")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {employees.map(emp => <MenuItem key={emp.empId} value={emp.empId}>{emp.fname} {emp.lname}</MenuItem>)}
      </TextField>

      <TextField label="Date" type="date" value={form.date || ""} onChange={handleChange("date")} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
      <TextField label="Reason" value={form.reason || ""} onChange={handleChange("reason")} fullWidth multiline rows={3} />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

const Leaves = () => {
  const [rows, setRows] = useState([]);
  const [emps, setEmps] = useState([]);
  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { load(); loadEmps(); }, []);

  const load = async () => {
    try {
      const res = await leaveAPI.getAll();
      const mapped = res.data.map(l => ({
        id: l.leaveId,
        leaveId: l.leaveId,
        empName: l.employee ? `${l.employee.fname} ${l.employee.lname}` : "",
        date: l.date,
        reason: l.reason
      }));
      setRows(mapped);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load leaves", severity: "error" });
    }
  };

  const loadEmps = async () => {
    try {
      const r = await employeeAPI.getAll();
      setEmps(r.data);
    } catch (err) { console.error(err); }
  };

  const handleAdd = async (form) => {
    try {
      await leaveAPI.create(form);
      setOpenAdd(false);
      setSnack({ open: true, message: "Leave created", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Create failed", severity: "error" });
    }
  };

  const handleEditSave = async (form) => {
    try {
      await leaveAPI.update(editItem.leaveId, form);
      setEditItem(null);
      setSnack({ open: true, message: "Leave updated", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this leave?")) return;
    try {
      await leaveAPI.delete(id);
      setSnack({ open: true, message: "Deleted", severity: "success" });
      load();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "leaveId", headerName: "ID" },
    { field: "empName", headerName: "Employee" },
    { field: "date", headerName: "Date" },
    { field: "reason", headerName: "Reason" }
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Leaves</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenAdd(true)}>Add Leave</Button>
      </Box>

      <DataTable columns={columns} rows={rows} onEdit={(id) => {
        const item = rows.find(r => r.leaveId === id);
        if (item) {
          // fetch full leave by id for edit
          (async () => {
            try {
              const res = await leaveAPI.getAll(); // we have all; but better fetch individually
              const le = res.data.find(l => l.leaveId === id);
              setEditItem(le);
            } catch (err) {
              console.error(err);
            }
          })();
        }
      }} onDelete={(id) => handleDelete(id)} />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth>
        <DialogTitle>Add Leave</DialogTitle>
        <DialogContent><LeaveForm initial={null} employees={emps} onSubmit={handleAdd} onCancel={() => setOpenAdd(false)} /></DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onClose={() => setEditItem(null)} fullWidth>
        <DialogTitle>Edit Leave</DialogTitle>
        <DialogContent>{editItem && <LeaveForm initial={editItem} employees={emps} onSubmit={handleEditSave} onCancel={() => setEditItem(null)} />}</DialogContent>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Leaves;
