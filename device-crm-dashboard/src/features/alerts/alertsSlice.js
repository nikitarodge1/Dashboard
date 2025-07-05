import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alerts: JSON.parse(localStorage.getItem("alerts")) || [],
};

const alertsSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    submitAlert: (state, action) => {
      state.alerts.push(action.payload);
      localStorage.setItem("alerts", JSON.stringify(state.alerts));
    },
  },
});

export const { submitAlert } = alertsSlice.actions;
export default alertsSlice.reducer;
