import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Typography,
  Paper,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addDevice } from "./devicesSlice";
import { v4 as uuidv4 } from "uuid";

const statusOptions = ["Online", "Offline", "Maintenance"];

export default function DeviceForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    type: "",
    facility: "",
    status: "Online",
    battery: "",
    lastServiceDate: "",
    amcStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newDevice = {
      id: uuidv4(),
      ...formData,
    };
    dispatch(addDevice(newDevice));
    setFormData({
      type: "",
      facility: "",
      status: "Online",
      battery: "",
      lastServiceDate: "",
      amcStatus: "",
    });
  };

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Add New Device
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Device Type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
        <TextField
          label="Facility"
          name="facility"
          value={formData.facility}
          onChange={handleChange}
          required
        />
        <TextField
          select
          label="Status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Battery %"
          name="battery"
          value={formData.battery}
          onChange={handleChange}
          required
          type="number"
        />
        <TextField
          label="Last Service Date"
          name="lastServiceDate"
          type="date"
          value={formData.lastServiceDate}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="AMC/CMC Status"
          name="amcStatus"
          value={formData.amcStatus}
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" color="primary">
          Add Device
        </Button>
      </Box>
    </Paper>
  );
}
