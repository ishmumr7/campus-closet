import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
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
  CheckoutPage,
  ProfilePage,
  SellerCreatePage,
} from "./routes/Routes.js";
import { SellerHomePage, SellerDashboardPage, SellerCreateProductPage } from "./routes/SellerRoutes.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
  }, []);

  return (
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
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        {/* SELLER */}
        <Route
          path="/seller-create"
          element={
            <ProtectedRoute>
              <SellerCreatePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seller/:id"
          element={
            <SellerProtectedRoute>
              <SellerHomePage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <SellerProtectedRoute>
              <SellerDashboardPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-product"
          element={
            <SellerProtectedRoute>
              <SellerCreateProductPage />
            </SellerProtectedRoute>
          }
        />
      </Routes>
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
    </BrowserRouter>
  );
};

export default App;
