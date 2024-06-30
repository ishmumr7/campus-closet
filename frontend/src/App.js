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
  SellerPreviewPage,
} from "./routes/Routes.js";
import {
  SellerHomePage,
  SellerDashboardPage,
  SellerCreateProductPage,
  SellerProductsPage,
  SellerCreateEventPage,
  SellerEventsPage,
  SellerCouponsPage
} from "./routes/SellerRoutes.js";
import ProtectedRoute from "./routes/ProtectedRoute.js";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Store from "./redux/store";
import { loadUser } from "./redux/actions/user";
import SellerProtectedRoute from "./routes/SellerProtectedRoute.js";
import { getAllProducts } from "./redux/actions/product.js";
import { getAllEvents } from "./redux/actions/event.js";

const App = () => {
  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(getAllProducts());
    Store.dispatch(getAllEvents());
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
        <Route path="/seller/preview/:id" element={<SellerPreviewPage />} />

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
        <Route
          path="/dashboard-products"
          element={
            <SellerProtectedRoute>
              <SellerProductsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-create-event"
          element={
            <SellerProtectedRoute>
              <SellerCreateEventPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-events"
          element={
            <SellerProtectedRoute>
              <SellerEventsPage />
            </SellerProtectedRoute>
          }
        />
        <Route
          path="/dashboard-coupons"
          element={
            <SellerProtectedRoute>
              <SellerCouponsPage />
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
