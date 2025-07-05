import { configureStore } from "@reduxjs/toolkit";
import devicesReducer from "../features/devices/devicesSlice"; 
import installationReducer from "../features/installation/installationSlice";
import serviceReducer from "../features/serviceLogs/serviceSlice";
import contractReducer from "../features/contracts/contractsSlice";
import alertReducer from "../features/alerts/alertsSlice";

export const store = configureStore({
  reducer: {
    devices: devicesReducer,
    installation: installationReducer,
    service: serviceReducer,
    contracts: contractReducer,
    alerts: alertReducer,
  },
});
