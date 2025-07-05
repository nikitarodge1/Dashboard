import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  installations: JSON.parse(localStorage.getItem("installations")) || [],
};

const installationSlice = createSlice({
  name: "installation",
  initialState,
  reducers: {
    addInstallation: (state, action) => {
      state.installations.push(action.payload);
      localStorage.setItem("installations", JSON.stringify(state.installations));
    },
  },
});

export const { addInstallation } = installationSlice.actions;
export default installationSlice.reducer;
