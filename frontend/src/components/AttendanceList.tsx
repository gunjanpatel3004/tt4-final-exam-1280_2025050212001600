import React, { useState, useEffect } from "react";
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Checkbox } from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import axios from "axios";

interface StudentAttendance {
  id: number;
  studentName: string;
  date: string;
  present: boolean;
  remarks: string;
}

export default function AttendanceList() {
  const [attendances, setAttendances] = useState<StudentAttendance[]>([]);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Partial<StudentAttendance>>({});

  useEffect(() => { fetchData(); }, []);

  const fetchData = async () => {
    const res = await axios.get("http://localhost:5000/api/attendance");
    setAttendances(res.data);
  };

  const handleSubmit = async () => {
    if (current.id) await axios.put(`http://localhost:5000/api/attendance/${current.id}`, current);
    else await axios.post("http://localhost:5000/api/attendance", current);
    fetchData();
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await axios.delete(`http://localhost:5000/api/attendance/${id}`);
    fetchData();
  };

  return (
    <div>
      <Button onClick={() => setOpen(true)} startIcon={<Add />}>Add</Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Present</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendances.map((att) => (
              <TableRow key={att.id}>
                <TableCell>{att.studentName}</TableCell>
                <TableCell>{att.date}</TableCell>
                <TableCell>{att.present ? "Yes" : "No"}</TableCell>
                <TableCell>
                  <Button onClick={() => { setCurrent(att); setOpen(true); }}><Edit /></Button>
                  <Button onClick={() => handleDelete(att.id)}><Delete /></Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{current.id ? "Edit" : "Add"} Attendance</DialogTitle>
        <DialogContent>
          <TextField label="Name" value={current.studentName || ""} onChange={(e) => setCurrent({...current, studentName: e.target.value})} />
          <TextField type="date" label="Date" value={current.date || ""} onChange={(e) => setCurrent({...current, date: e.target.value})} />
          <Checkbox checked={current.present || false} onChange={(e) => setCurrent({...current, present: e.target.checked})} /> Present
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}