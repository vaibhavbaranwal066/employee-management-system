import React, { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, DialogContent, TextField, MenuItem, Snackbar, Alert, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import payrollAPI from "../api/payrollAPI";
import employeeAPI from "../api/employeeAPI";
import departmentAPI from "../api/departmentAPI";
import salaryAPI from "../api/salaryAPI";
import leaveAPI from "../api/leaveAPI";
import DataTable from "../components/DataTable";

const PayrollForm = ({ initial, employees, depts, salaries, leaves, onSubmit, onCancel }) => {
  const [form, setForm] = useState({
    employee: null, jobDepartment: null, salaryBonus: null, leaveRequest: null, date: "", report: "", totalAmount: ""
  });

  useEffect(() => {
    if (initial) {
      setForm({
        employee: initial.employee ? { empId: initial.employee.empId } : null,
        jobDepartment: initial.jobDepartment ? { jobId: initial.jobDepartment.jobId } : null,
        salaryBonus: initial.salaryBonus ? { salaryId: initial.salaryBonus.salaryId } : null,
        leaveRequest: initial.leaveRequest ? { leaveId: initial.leaveRequest.leaveId } : null,
        date: initial.date, report: initial.report, totalAmount: initial.totalAmount
      });
    } else {
      setForm({ employee: null, jobDepartment: null, salaryBonus: null, leaveRequest: null, date: "", report: "", totalAmount: "" });
    }
  }, [initial]);

  const handleChange = (key) => (e) => {
    const val = e.target.value;
    if (key === "employee") setForm(s => ({ ...s, employee: val ? { empId: Number(val) } : null }));
    else if (key === "jobDepartment") setForm(s => ({ ...s, jobDepartment: val ? { jobId: Number(val) } : null }));
    else if (key === "salaryBonus") setForm(s => ({ ...s, salaryBonus: val ? { salaryId: Number(val) } : null }));
    else if (key === "leaveRequest") setForm(s => ({ ...s, leaveRequest: val ? { leaveId: Number(val) } : null }));
    else setForm(s => ({ ...s, [key]: val }));
  };

  return (
    <Box component="form" sx={{ mt: 1 }}>
      <TextField select label="Employee" value={(form.employee && form.employee.empId) || ""} onChange={handleChange("employee")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {employees.map(e => <MenuItem key={e.empId} value={e.empId}>{e.fname} {e.lname}</MenuItem>)}
      </TextField>

      <TextField select label="Department" value={(form.jobDepartment && form.jobDepartment.jobId) || ""} onChange={handleChange("jobDepartment")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {depts.map(d => <MenuItem key={d.jobId} value={d.jobId}>{d.name}</MenuItem>)}
      </TextField>

      <TextField select label="Salary" value={(form.salaryBonus && form.salaryBonus.salaryId) || ""} onChange={handleChange("salaryBonus")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {salaries.map(s => <MenuItem key={s.salaryId} value={s.salaryId}>{s.jobDepartment ? s.jobDepartment.name : "Unknown"} - {s.amount}</MenuItem>)}
      </TextField>

      <TextField select label="Leave (optional)" value={(form.leaveRequest && form.leaveRequest.leaveId) || ""} onChange={handleChange("leaveRequest")} fullWidth sx={{ mb: 2 }}>
        <MenuItem value="">None</MenuItem>
        {leaves.map(l => <MenuItem key={l.leaveId} value={l.leaveId}>{l.employee ? `${l.employee.fname} ${l.employee.lname}` : "Unknown"} - {l.date}</MenuItem>)}
      </TextField>

      <TextField label="Date" type="date" value={form.date || ""} onChange={handleChange("date")} fullWidth sx={{ mb: 2 }} InputLabelProps={{ shrink: true }} />
      <TextField label="Report" value={form.report || ""} onChange={handleChange("report")} fullWidth sx={{ mb: 2 }} />
      <TextField label="Total Amount" value={form.totalAmount || ""} onChange={handleChange("totalAmount")} fullWidth />

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button variant="contained" onClick={() => onSubmit(form)}>Save</Button>
        <Button variant="outlined" onClick={onCancel}>Cancel</Button>
      </Box>
    </Box>
  );
};

const Payroll = () => {
  const [rows, setRows] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [depts, setDepts] = useState([]);
  const [salaries, setSalaries] = useState([]);
  const [leaves, setLeaves] = useState([]);

  const [openAdd, setOpenAdd] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => { loadAll(); }, []);

  const loadAll = async () => {
    try {
      const [pRes, eRes, dRes, sRes, lRes] = await Promise.all([
        payrollAPI.getAll(), employeeAPI.getAll(), departmentAPI.getAll(), salaryAPI.getAll(), leaveAPI.getAll()
      ]);
      setRows(pRes.data.map(p => ({
        id: p.payrollId,
        payrollId: p.payrollId,
        empName: p.employee ? `${p.employee.fname} ${p.employee.lname}` : "",
        jobName: p.jobDepartment ? p.jobDepartment.name : "",
        salaryAmount: p.salaryBonus ? p.salaryBonus.amount : "",
        date: p.date,
        totalAmount: p.totalAmount
      })));
      setEmployees(eRes.data);
      setDepts(dRes.data);
      setSalaries(sRes.data);
      setLeaves(lRes.data);
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Failed to load payroll data", severity: "error" });
    }
  };

  const handleAdd = async (form) => {
    try {
      await payrollAPI.create(form);
      setOpenAdd(false);
      setSnack({ open: true, message: "Payroll created", severity: "success" });
      loadAll();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Create failed", severity: "error" });
    }
  };

  const handleEditOpen = async (id) => {
    try {
      const res = await payrollAPI.get(id);
      setEditItem(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditSave = async (form) => {
    try {
      await payrollAPI.update(editItem.payrollId, form);
      setEditItem(null);
      setSnack({ open: true, message: "Payroll updated", severity: "success" });
      loadAll();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Update failed", severity: "error" });
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this payroll?")) return;
    try {
      await payrollAPI.delete(id);
      setSnack({ open: true, message: "Deleted", severity: "success" });
      loadAll();
    } catch (err) {
      console.error(err);
      setSnack({ open: true, message: "Delete failed", severity: "error" });
    }
  };

  const columns = [
    { field: "payrollId", headerName: "ID" },
    { field: "empName", headerName: "Employee" },
    { field: "jobName", headerName: "Department" },
    { field: "salaryAmount", headerName: "Salary" },
    { field: "date", headerName: "Date" },
    { field: "totalAmount", headerName: "Total" }
  ];

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h5">Payrolls</Typography>
        <Button startIcon={<AddIcon />} variant="contained" onClick={() => setOpenAdd(true)}>Add Payroll</Button>
      </Box>

      <DataTable columns={columns} rows={rows} onEdit={(id) => handleEditOpen(id)} onDelete={(id) => handleDelete(id)} />

      <Dialog open={openAdd} onClose={() => setOpenAdd(false)} fullWidth maxWidth="md">
        <DialogTitle>Add Payroll</DialogTitle>
        <DialogContent>
          <PayrollForm employees={employees} depts={depts} salaries={salaries} leaves={leaves} onSubmit={handleAdd} onCancel={() => setOpenAdd(false)} />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editItem} onClose={() => setEditItem(null)} fullWidth maxWidth="md">
        <DialogTitle>Edit Payroll</DialogTitle>
        <DialogContent>{editItem && <PayrollForm initial={editItem} employees={employees} depts={depts} salaries={salaries} leaves={leaves} onSubmit={handleEditSave} onCancel={() => setEditItem(null)} />}</DialogContent>
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={3000} onClose={() => setSnack(s => ({ ...s, open: false }))}>
        <Alert severity={snack.severity} onClose={() => setSnack(s => ({ ...s, open: false }))}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Payroll;
