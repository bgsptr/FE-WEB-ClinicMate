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
import Chat from "./pages/Chat";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoutes from "./components/ProtectedRoute";
import { Role } from "./components/types";
import { Doctor } from "./pages/Doctor";
import { Home } from "./pages/Home";

const Root = () => {
  return (
    <Suspense>
      <AuthProvider>
        <Routes>
          <Route path="/forbidden" element={<h2>Unauthorized</h2>} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/patient"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN]}>
                <PatientList />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/doctor"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN]}>
                <Doctor />
              </ProtectedRoutes>
            }
          />

          <Route path="/register" element={<Register />} />

          {/* <Route
            path="/patient"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN]}>
                <PatientList />
              </ProtectedRoutes>
            }
          /> */}

          <Route
            path="/rawat_jalan"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN]}>
                <RawatJalanSchedule />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/rawat_jalan/register"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN, Role.PATIENT]}>
                <RawatJalanRegister />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/patient/register"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN, Role.PATIENT]}>
                <PatientRegister />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/jadwal_praktik/list"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN, Role.PATIENT]}>
                <ScheduleList />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/jadwal_praktik/:doctor_id"
            element={
              <ProtectedRoutes allowedRoles={[Role.ADMIN]}>
                <AddSchedule />
              </ProtectedRoutes>
            }
          />

          {/* <Route path="/rawat_jalan" element={<RawatJalanSchedule />} /> */}
          {/* <Route path="/rawat_jalan/register" element={<RawatJalanRegister />} /> */}

          <Route path="/patient_detail" element={<PatientDetail />} />
          <Route path="/jadwal_praktik" element={<DoctorSchedule />} />
          {/* <Route path="/jadwal_praktik/list" element={<ScheduleList />} /> */}

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AuthProvider>
    </Suspense>
  );
};

export default Root;
