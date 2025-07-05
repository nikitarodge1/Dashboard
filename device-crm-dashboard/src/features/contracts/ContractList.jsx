import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addContract } from "./contractsSlice";
import { v4 as uuidv4 } from "uuid";

export default function ContractList() {
  const dispatch = useDispatch();
  const contracts = useSelector((state) => state.contracts.contracts);
  const [formData, setFormData] = useState({
    deviceId: "",
    contractType: "",
    startDate: "",
    endDate: "",
  });
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addContract({ id: uuidv4(), ...formData }));
    setFormData({
      deviceId: "",
      contractType: "",
      startDate: "",
      endDate: "",
    });
    setOpen(true);
  };

  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add AMC/CMC Contract
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
          <TextField
            label="Device ID"
            name="deviceId"
            value={formData.deviceId}
            onChange={handleChange}
            required
          />
          <TextField
            label="Contract Type (AMC or CMC)"
            name="contractType"
            value={formData.contractType}
            onChange={handleChange}
            required
          />
          <TextField
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            type="date"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Button type="submit" variant="contained">
            Add Contract
          </Button>
        </Box>
      </Paper>

      <Paper>
        <Typography variant="h6" sx={{ p: 2 }}>
          All Contracts
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Device ID</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Start</TableCell>
              <TableCell>End</TableCell>
              <TableCell>Days Left</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contracts.map((c) => {
              const daysLeft = Math.ceil(
                (new Date(c.endDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              return (
                <TableRow key={c.id}>
                  <TableCell>{c.deviceId}</TableCell>
                  <TableCell>{c.contractType}</TableCell>
                  <TableCell>{c.startDate}</TableCell>
                  <TableCell>{c.endDate}</TableCell>
                  <TableCell style={{ color: daysLeft < 10 ? "red" : "inherit" }}>
                    {daysLeft > 0 ? `${daysLeft} days` : "Expired"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Contract added successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
}
