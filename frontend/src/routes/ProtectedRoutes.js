import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user)
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }

    if (role && user.role !== role) {
      return <Navigate to="/" replace />;
    }

    return children;
  }
};

export default ProtectedRoute;