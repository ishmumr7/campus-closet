import React, { useEffect } from "react";
import SignUp from "../components/SignUp/SignUp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Header from "../components/Layout/Header";

const SignUpPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <Header />
      <SignUp />
    </div>
  );
};

export default SignUpPage;
