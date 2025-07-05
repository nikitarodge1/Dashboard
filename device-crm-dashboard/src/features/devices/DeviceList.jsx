import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteDevice } from "./devicesSlice";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";

export default function DevicesList() {
  const devices = useSelector((state) => state.devices.devices);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteDevice(id));
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Device Inventory
      </Typography>
      <Grid container spacing={2}>
        {devices.map((device) => (
          <Grid item xs={12} sm={6} md={4} key={device.id}>
            <Card sx={{ p: 2 }}>
              <CardContent>
                <Typography variant="h6">{device.name}</Typography>
                <Typography>ID: {device.id}</Typography>
                <Typography>Facility: {device.facility}</Typography>
                <Typography>Status: {device.status}</Typography>
                <Typography>Battery: {device.battery}%</Typography>
                <Typography>Last Service: {device.lastService}</Typography>
                <Typography>AMC/CMC: {device.amcStatus}</Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(device.id)}
                  sx={{ mt: 2 }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
