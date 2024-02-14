import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const token = localStorage.getItem('token');
    return token ? <Outlet/> : <Navigate to="/" replace />;
}