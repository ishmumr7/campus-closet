import React, { useEffect } from "react";
import SellerCreate from "../components/Seller/SellerCreate";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SellerCreatePage = () => {
  const { isSeller } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (isSeller) {
      navigate("/dashboard");
    }
  }, [isSeller, navigate]);

  return (
    <div>
      <SellerCreate />
    </div>
  );
};

export default SellerCreatePage;
