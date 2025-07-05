import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import DashboardLayout from "./features/dashboard/DashboardLayout";
import DeviceForm from "./features/devices/DeviceForm";
import DeviceList from "./features/devices/DeviceList";
import InstallationForm from "./features/installation/InstallationForm";
import ServiceForm from "./features/serviceLogs/ServiceForm";
import ContractList from "./features/contracts/ContractList";
import AlertForm from "./features/alerts/AlertForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/devices" replace />} />
          <Route
            path="devices"
            element={
              <>
                <DeviceForm />
                <DeviceList />
              </>
            }
          />
          <Route path="installation" element={<InstallationForm />} />
          <Route path="service" element={<ServiceForm />} />
          <Route path="contracts" element={<ContractList />} />
          <Route path="alerts" element={<AlertForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
