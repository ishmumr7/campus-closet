import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { loading, isSeller } = useSelector((state) => state.user);

  if (loading === true) {
    return <div />;
  } else {
    if (!isSeller) {
      return <Navigate to={`/`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
