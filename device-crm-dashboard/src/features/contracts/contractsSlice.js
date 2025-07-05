import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contracts: JSON.parse(localStorage.getItem("contracts")) || [],
};

const contractsSlice = createSlice({
  name: "contracts",
  initialState,
  reducers: {
    addContract: (state, action) => {
      state.contracts.push(action.payload);
      localStorage.setItem("contracts", JSON.stringify(state.contracts));
    },
  },
});

export const { addContract } = contractsSlice.actions;
export default contractsSlice.reducer;
