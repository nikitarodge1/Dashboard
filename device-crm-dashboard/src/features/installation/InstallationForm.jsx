import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { addInstallation } from "./installationSlice";
import { v4 as uuidv4 } from "uuid";

export default function InstallationForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    deviceId: "",
    engineer: "",
    date: "",
    checklist: "",
    notes: "",
    photo: null,
  });
  const [photoPreview, setPhotoPreview] = useState(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      const file = files[0];
      setFormData({ ...formData, photo: file });
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: uuidv4(),
      ...formData,
      photo: photoPreview,
    };
    dispatch(addInstallation(newEntry));
    setFormData({
      deviceId: "",
      engineer: "",
      date: "",
      checklist: "",
      notes: "",
      photo: null,
    });
    setPhotoPreview(null);
    setOpen(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Log New Installation & Training
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
          label="Installation Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Checklist Status"
          name="checklist"
          value={formData.checklist}
          onChange={handleChange}
        />
        <TextField
          label="Additional Notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={2}
        />
        <Button variant="outlined" component="label">
          Upload Unboxing Photo
          <input
            hidden
            accept="image/*"
            type="file"
            name="photo"
            onChange={handleChange}
          />
        </Button>
        {photoPreview && (
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2">Preview:</Typography>
            <img
              src={photoPreview}
              alt="Preview"
              style={{ height: "100px", borderRadius: "8px" }}
            />
          </Box>
        )}
        <Button variant="contained" type="submit">
          Submit Installation
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Installation logged successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
