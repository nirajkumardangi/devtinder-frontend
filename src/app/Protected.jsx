import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loading from "../pages/Loading";

function Protected({ children }) {
  const { user, checked } = useSelector((s) => s.user);

  // Wait until checked becomes true
  if (!checked) return <Loading />;

  // If user not logged in
  return user ? children : <Navigate to="/login" replace />;
}

export default Protected;
