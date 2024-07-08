import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
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
  OrderSuccessPage,
	PaymentPage,
	ProfilePage,
	UserInboxPage,
	OrderDetailsPage,
	TrackOrderPage,
	SellerCreatePage,
	SellerPreviewPage,
} from "./routes/Routes.js";
import {
	SellerHomePage,
	SellerDashboardPage,
	SellerOrdersPage,
	SellerOrdersDetailsPage,
	SellerCreateProductPage,
	SellerProductsPage,
	SellerCreateEventPage,
	SellerEventsPage,
	SellerWithdrawMoneyPage,
	SellerInboxPage,
	SellerCouponsPage,
	SellerRefundsPage,
	SellerSettingsPage,
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
import axios from "axios";
import { server } from "./server.js";

const App = () => {
	const [stripeApiKey, setStripeApiKey] = useState("");

	async function getStripeApikey() {
		const { data } = await axios.get(`${server}/payment/stripeapikey`);
		setStripeApiKey(data.stripeApikey);
	}

	useEffect(() => {
		Store.dispatch(loadUser());
		Store.dispatch(getAllProducts());
		Store.dispatch(getAllEvents());
		getStripeApikey();
	}, []);

	return (
		<BrowserRouter>
			{stripeApiKey && (
				<Elements stripe={loadStripe(stripeApiKey)}>
					<Routes>
						<Route
							path="/payment"
							element={
								<ProtectedRoute>
									<PaymentPage />
								</ProtectedRoute>
							}
						/>
					</Routes>
				</Elements>
			)}
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
					path="/order/success"
					element={
						<ProtectedRoute>
							<OrderSuccessPage />
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
				<Route
					path="/inbox"
					element={
						<ProtectedRoute>
							<UserInboxPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/order/:id"
					element={
						<ProtectedRoute>
							<OrderDetailsPage />
						</ProtectedRoute>
					}
				/>
				<Route
					path="/user/track/order/:id"
					element={
						<ProtectedRoute>
							<TrackOrderPage />
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
					path="/dashboard-orders"
					element={
						<SellerProtectedRoute>
							<SellerOrdersPage />
						</SellerProtectedRoute>
					}
				/>
				<Route
					path="/order/:id"
					element={
						<SellerProtectedRoute>
							<SellerOrdersDetailsPage />
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
          path="/dashboard-withdraw-money"
          element={
            <SellerProtectedRoute>
              <SellerWithdrawMoneyPage />
            </SellerProtectedRoute>
          }
        />
				<Route
          path="/dashboard-messages"
          element={
            <SellerProtectedRoute>
              <SellerInboxPage />
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
				<Route
					path="/dashboard-refunds"
					element={
						<SellerProtectedRoute>
							<SellerRefundsPage />
						</SellerProtectedRoute>
					}
				/>
				<Route
					path="/settings"
					element={
						<SellerProtectedRoute>
							<SellerSettingsPage />
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
