import React, { useState } from "react";
import { Link } from "react-router-dom";
import { productData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";
import { IoBagHandleOutline } from "react-icons/io5";
import { HiMinus, HiOutlineMinus, HiPlus } from "react-icons/hi";
import { MdDeleteOutline } from "react-icons/md";
import styles from "../../styles/styles";

const Cart = ({ setOpenCart }) => {
  const cartData = [productData[2], productData[6]];
  console.log(cartData);

  return (
    <div className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        <div>
          <div className="flex w-full justify-end pt-5 pr-5">
            <RxCross1
              size={25}
              className=" cursor-pointer "
              onClick={() => setOpenCart(false)}
            />
          </div>

          {/* Item Length */}
          <div className={`${styles.noramlFlex} p-4`}>
            <IoBagHandleOutline size={25} />
            <h5 className=" text-[20px] pl-2 font-[500]">1 Item(s)</h5>
          </div>

          <div className="w-full border-t">
            {cartData &&
              cartData.map((i, index) => <CartItem key={index} data={i} />)}
          </div>
        </div>

        <div className="px-5 mb-3">
          {/* CHECKOUT BUTTON */}
          <Link to="/checkout">
            <div className=" h-[45px] flex items-center justify-center w-[100%] bg-[#e44343] rounded-[5px] " >
              <h1 className="text-white text-[18px] font-600">
                Checkout
              </h1>
            </div>
          </Link>
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
        <div>
          <div
            className={`bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value + 1)}
          >
            <HiPlus size={18} color="#fff" />
          </div>
          <span className=" pl-[10px]">{value}</span>
          <div
            className={`bg-[#a7abb14f] rounded-full w-[25px] h-[25px] ${styles.noramlFlex} justify-center cursor-pointer`}
            onClick={() => setValue(value > 1 ? value - 1 : 1)}
          >
            <HiOutlineMinus size={18} color="#7d879c" />
          </div>
        </div>
        <img src={data.image_Url[1].url} alt="" className=" h-[80px] w-[80px] ml-2 "/>
        <div className="pl-[5px]">
          <h1>{data.name}</h1>
          <h4 className=" font-[400] text-[17px] text-[#d02222] font-Roboto ">RM {totalPrice}</h4>
        </div>
        <MdDeleteOutline size={25} color="#d02222" className=" cursor-pointer pl-1"/>
      </div>
    </div>
  );
};

export default Cart;
