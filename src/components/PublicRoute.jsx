import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const { accessToken, isAuthChecked } = useSelector((store) => store.auth);
  if (!isAuthChecked) return <div>Loading...</div>;
  if (accessToken) return <Navigate to="/browse" replace />;
  return children;
};

export default PublicRoute;
