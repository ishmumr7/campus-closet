import React from "react";
import DashboardHeader from "../../components/Seller/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Seller/Layout/DashboardSideBar";
import AllRefundOrders from "../../components/Seller/AllRefundOrders";

const SellerRefundsPage = () => {
	return (
		<div>
			<DashboardHeader />
			<div className="flex justify-between w-full">
				<div className="w-[80px] 800px:w-[330px]">
					<DashboardSideBar active={10} />
				</div>
				<div className="w-full justify-center flex">
					<AllRefundOrders />
				</div>
			</div>
		</div>
	);
};

export default SellerRefundsPage;
