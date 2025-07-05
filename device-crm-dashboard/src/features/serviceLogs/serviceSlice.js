import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceLogs: JSON.parse(localStorage.getItem("serviceLogs")) || [],
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    addServiceLog: (state, action) => {
      state.serviceLogs.push(action.payload);
      localStorage.setItem("serviceLogs", JSON.stringify(state.serviceLogs));
    },
  },
});

export const { addServiceLog } = serviceSlice.actions;
export default serviceSlice.reducer;
