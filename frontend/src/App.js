import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import {
  LoginPage,
  SignUpPage,
  ActivationPage,
  HomePage,
  ProductPage,
  ProductDetailsPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProfilePage,
} from "./routes/Routes.js";
import ProtectedRoute from "./routes/ProtectedRoutes.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import { useSelector } from "react-redux";

const App = () => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
    <>
      {loading ? null : (
        <>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route
                path="/activation/:activation_token"
                element={<ActivationPage />}
              />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
              <Route path="/best-selling" element={<BestSellingPage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/profile" element={
                <ProtectedRoute isAuthenticated={isAuthenticated}>
                  <ProfilePage />
                </ProtectedRoute>
              } />
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
      )}
    </>
  );
};

export default App;
