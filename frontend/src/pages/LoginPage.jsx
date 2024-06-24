import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuthenticated, isSeller, user, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if(isSeller) {
      navigate(`/seller/${user._id}`);
    }
  }, [loading, isSeller]);

  return (
    <div>
      <Login />
    </div>
  );
};

export default LoginPage;
