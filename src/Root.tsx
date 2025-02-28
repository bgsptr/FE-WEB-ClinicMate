import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PatientList from "./pages/PatientList";
import PatientRegister from "./pages/PatientRegister";
import RawatJalanSchedule from "./pages/RawatJalanSchedule";
import RawatJalanRegister from "./pages/RawatJalanRegister";
import PatientDetail from "./pages/PatientDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DoctorSchedule from "./pages/DoctorSchedule";
import ScheduleList from "./pages/ScheduleList";
import AddSchedule from "./pages/AddSchedule";
import Dashboard from "./pages/Dashboard";

const Root = () => {
  return (
    <Suspense>
        <Routes>
          <Route path="/patient" element={<PatientList />} />
          <Route path="/patient/register" element={<PatientRegister />} />
          <Route path="/rawat_jalan" element={<RawatJalanSchedule />} />
          <Route path="/rawat_jalan/register" element={<RawatJalanRegister />} />
          <Route path="/patient_detail" element={<PatientDetail />} />
          <Route path="/jadwal_praktik" element={<DoctorSchedule />} />
          <Route path="/jadwal_praktik/list" element={<ScheduleList />} />
          <Route path="/jadwal_praktik/:doctor_id" element={<AddSchedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    </Suspense>
  );
};

export default Root;
