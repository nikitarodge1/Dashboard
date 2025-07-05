import { createSlice } from "@reduxjs/toolkit";

const devicesSlice = createSlice({
  name: "devices",
  initialState: {
    devices: [],
  },
  reducers: {
    addDevice: (state, action) => {
      state.devices.push(action.payload);
    },
    deleteDevice: (state, action) => {
      state.devices = state.devices.filter(
        (device) => device.id !== action.payload
      );
    },
    clearDevices: (state) => {
      state.devices = [];
    },
  },
});

export const { addDevice, deleteDevice, clearDevices } = devicesSlice.actions;
export default devicesSlice.reducer;
