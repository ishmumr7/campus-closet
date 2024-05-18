import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { LoginPage, SignUpPage, ActivationPage } from "./Routes";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import axios from "axios";
import { server } from "./server";

const App = () => {
  useEffect(() => {
    axios
      .get(`${server}/user/getuser`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      }).catch((err) => {
        toast.error(err.response.data.message);
      });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/sign-up" element={<SignUpPage />}></Route>
          <Route
            path="/activation/:activation_token"
            element={<ActivationPage />}
          ></Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        stacked
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
};

export default App;
