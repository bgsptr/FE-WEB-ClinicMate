import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = ({ children, allowedRoles }) => {
    const { role } = useAuth();

    console.log("data", allowedRoles);
    console.log("role", role);

    const location = useLocation();

    if (!role) return <Navigate to="/login" />
    // if (allowedRoles[0] === "authorized") return <Navigate to={location.state?.from || "/dashboard"} state={{ from: location.pathname }} />;
    if (!allowedRoles?.includes(role)) return <Navigate to="/forbidden" />

    return children;
}

export default ProtectedRoutes;