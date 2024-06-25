import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "../../styles/styles";

const SellerInfo = ({ isOwner }) => {
  const { loading, user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    
  }

  return (
    <div className="w-full py-5">
      <div className="w-full flex item-center justify-center">
        <img
          src={`https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg`}
          alt={user.name}
          className="w-[150px] h-[150px] object-cover rounded-full"
        />
      </div>
      <h3 className="text-center py-2 text-[20px]">{user.name}</h3>
      <p className="text-[16px] text-[#000000a6] p-[10px] flex items-center">
        {user.description}
      </p>
      <div className="p-3">
        <h5 className="font-[600]">Address</h5>
        <h4 className="text-[#000000a6]">{user.addresses[0].address1}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Phone Number</h5>
        <h4 className="text-[#000000a6]">{user.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Total Products</h5>
        <h4 className="text-[#000000a6]">{`3`}</h4> {/* Add dynamic */}
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Seller Ratings</h5>
        <h4 className="text-[#000000b0]">{`4.3`}/5</h4> {/* Add dynamic */}
      </div>
      <div className="p-3">
        <h5 className="font-[600]">Joined On</h5>
        <h4 className="text-[#000000b0]">{user?.createdAt?.slice(0, 10)}</h4>
      </div>
      {isOwner && (
        <div className="py-3 px-4">
           <Link to="/settings">
           <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
            <span className="text-white">Edit Info</span>
          </div>
           </Link>
          <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}
          onClick={logoutHandler}
          >
            <span className="text-white">Log Out</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerInfo;
