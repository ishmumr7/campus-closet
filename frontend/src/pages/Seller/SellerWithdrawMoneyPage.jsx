import React from "react";
import DashboardHeader from "../../components/Seller/Layout/DashboardHeader";
import DashboardSideBar from "../../components/Seller/Layout/DashboardSideBar";
import WithdrawMoney from "../../components/Seller/WithdrawMoney";

const SellerWithdrawMoneyPage = () => {
	return (
		<div>
			<DashboardHeader />
			<div className="flex items-start justify-between w-full">
				<div className="w-[80px] 800px:w-[330px]">
					<DashboardSideBar active={7} />
				</div>
				<WithdrawMoney />
			</div>
		</div>
	);
};

export default SellerWithdrawMoneyPage;
