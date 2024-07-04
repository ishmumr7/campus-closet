import React, { useEffect } from "react";
import Login from "../components/Login/Login";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";

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
      <Header />
      <Login />
    </div>
  );
};

export default LoginPage;
