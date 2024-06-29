import React from 'react'
import DashboardHeader from '../../components/Seller/Layout/DashboardHeader';
import DashboardSideBar from '../../components/Seller/Layout/DashboardSideBar';
import SellerEvents from '../../components/Seller/SellerEvents.jsx';

const SellerEventsPage = () => {
  return (
    <div>
      <div>
        <DashboardHeader />
        <div className="flex justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
              <DashboardSideBar active={5} />
            </div>
            <div className="w-full justify-center flex">
                <SellerEvents />
            </div>
          </div>
    </div>
    </div>
  )
}

export default SellerEventsPage;