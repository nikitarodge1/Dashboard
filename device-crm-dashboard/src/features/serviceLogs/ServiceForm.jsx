import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  MenuItem,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addServiceLog } from "./serviceSlice";
import { v4 as uuidv4 } from "uuid";

const purposeOptions = ["Preventive", "Breakdown"];

export default function ServiceForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    deviceId: "",
    engineer: "",
    date: "",
    purpose: "Preventive",
    notes: "",
    attachment: null,
  });
  const [attachmentPreview, setAttachmentPreview] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "attachment") {
      const file = files[0];
      setFormData({ ...formData, attachment: file });
      const reader = new FileReader();
      reader.onloadend = () => setAttachmentPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLog = {
      id: uuidv4(),
      ...formData,
      attachment: attachmentPreview,
    };
    dispatch(addServiceLog(newLog));
    setFormData({
      deviceId: "",
      engineer: "",
      date: "",
      purpose: "Preventive",
      notes: "",
      attachment: null,
    });
    setAttachmentPreview(null);
    setOpen(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Log Service Visit
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
          label="Engineer Name"
          name="engineer"
          value={formData.engineer}
          onChange={handleChange}
          required
        />
        <TextField
          label="Visit Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          select
          label="Purpose"
          name="purpose"
          value={formData.purpose}
          onChange={handleChange}
        >
          {purposeOptions.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={2}
        />
        <Button variant="outlined" component="label">
          Upload Photo or PDF
          <input
            hidden
            accept="image/*,.pdf"
            type="file"
            name="attachment"
            onChange={handleChange}
          />
        </Button>
        {attachmentPreview && (
          <Typography variant="body2" sx={{ mt: 1 }}>
            Attachment ready to upload ✔️
          </Typography>
        )}
        <Button variant="contained" type="submit">
          Save Log
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Service visit logged successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
