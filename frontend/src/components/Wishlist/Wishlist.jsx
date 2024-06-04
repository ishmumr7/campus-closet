import React, { useState } from "react";
import { productData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs"
import { AiOutlineHeart } from "react-icons/ai";

const Wishlist = ({ setOpenWishlist }) => {
  const cartData = [productData[1], productData[1]];
  console.log(cartData);

  return (
    <div className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className=" cursor-pointer "
              onClick={() => setOpenWishlist(false)}
            />
          </div>

          {/* Item Length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <AiOutlineHeart size={25} />
            <h5 className=" text-[20px] pl-2 font-[500]">1 Item(s)</h5>
          </div>

          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartItem key={index} data={i} />)}
          </div>
        </div>

        
      </div>
    </div>
  );
};

const CartItem = ({ data }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discount_price * value;

  return (
    <div className=" border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1 className=" cursor-pointer " />
        <img
          src={data.image_Url[1].url}
          alt=""
          className=" h-[80px] w-[80px] ml-2 "
        />
        
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className=" font-[400] text-[17px] text-[#d02222] font-Roboto ">
            RM {totalPrice}
          </h4>
        </div>

        <div>
          <BsCartPlus size={20} className=' cursor-pointer pl-1 ' title="Add to Cart" />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
