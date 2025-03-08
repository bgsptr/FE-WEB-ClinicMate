// import { Navigate, useLocation } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode;
    allowedRoles: string[];
  }

const ProtectedRoutes: FC<Props> = ({ children, allowedRoles }) => {
    const auth = useAuth();
    const role = auth?.role;

    console.log("data", allowedRoles);
    console.log("role", role);

    // const location = useLocation();

    if (!role) return <Navigate to="/login" />
    // if (allowedRoles[0] === "authorized") return <Navigate to={location.state?.from || "/dashboard"} state={{ from: location.pathname }} />;
    if (!allowedRoles?.includes(role)) return <Navigate to="/forbidden" />

    return children;
}

export default ProtectedRoutes;