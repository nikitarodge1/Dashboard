import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { submitAlert } from "./alertsSlice";
import { v4 as uuidv4 } from "uuid";

export default function AlertForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    deviceId: "",
    date: "",
    issue: "",
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
    const newAlert = {
      id: uuidv4(),
      ...formData,
      photo: photoPreview,
    };
    dispatch(submitAlert(newAlert));
    setFormData({
      deviceId: "",
      date: "",
      issue: "",
      photo: null,
    });
    setPhotoPreview(null);
    setOpen(true);
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>
        Submit Alert / Issue
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
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          required
        />
        <TextField
          label="Issue Description"
          name="issue"
          value={formData.issue}
          onChange={handleChange}
          multiline
          rows={3}
          required
        />
        <Button variant="outlined" component="label">
          Upload Photo
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
            <Typography variant="body2">Photo Preview:</Typography>
            <img
              src={photoPreview}
              alt="preview"
              style={{ width: "150px", borderRadius: "8px" }}
            />
          </Box>
        )}
        <Button type="submit" variant="contained">
          Submit Alert
        </Button>
      </Box>

      <Snackbar open={open} autoHideDuration={3000} onClose={() => setOpen(false)}>
        <Alert severity="success" sx={{ width: "100%" }}>
          Alert submitted successfully!
        </Alert>
      </Snackbar>
    </Paper>
  );
}
