import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Container, Typography } from "@mui/material";
import AttendanceList from "./components/AttendanceList";

function App() {
  return (
    <Container>
      <Typography variant="h4">Student Attendance System</Typography>
      <AttendanceList />
    </Container>
  );
}

export default App;
