import React from "react";
import DashboardHeader from "../../components/Seller/Layout/DashboardHeader";
import OrderDetails from "../../components/Seller/OrderDetails.jsx";
import Footer from "../../components/Layout/Footer";

const SellerOrdersDetailsPage = () => {
	return (
		<div>
			<DashboardHeader />
			<OrderDetails />
			<Footer />
		</div>
	);
};

export default SellerOrdersDetailsPage;
