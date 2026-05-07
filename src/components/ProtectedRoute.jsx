import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { accessToken, isAuthChecked } = useSelector((store) => store.auth);
  if (!isAuthChecked) return <div>Loading...</div>;
  if (!accessToken) return <Navigate to="/" replace />;
  return children;
};

export default ProtectedRoute;
