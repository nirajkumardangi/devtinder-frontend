import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../pages/Loading";

function Protected() {
  const { user, checked } = useSelector((s) => s.user);
  const location = useLocation();

  // If we haven't checked the token/session yet, show global loader
  if (!checked) return <Loading />;

  // Use Outlet to render the child routes defined in App.jsx
  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default Protected;
