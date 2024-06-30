import React, { useState } from "react";
import { productData } from "../../static/data";
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addTocart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { toast } from "react-toastify";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const itemExists = cart && cart.find((i) => i._id === data._id);
    if (itemExists) {
      toast.error("Item already added to cart!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart!");
      setOpenWishlist(false);
    }
  };

  return (
    <div className=" fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10">
      <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <RxCross1
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Wishlist Items is empty!</h5>
          </div>
        ) : (
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
              {wishlist &&
                wishlist.map((i, index) => (
                  <WishlistItem
                    key={index}
                    data={i}
                    removeFromWishlistHandler={removeFromWishlistHandler}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const WishlistItem = ({
  data,
  removeFromWishlistHandler,
  addToCartHandler,
}) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className=" border-b p-4">
      <div className="w-full flex items-center">
        <RxCross1
          className=" cursor-pointer "
          onClick={() => removeFromWishlistHandler(data)}
        />
        <img
          src={`${backend_url}/${data.images[0]}`}
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
          <BsCartPlus
            size={20}
            className=" cursor-pointer pl-1 "
            title="Add to Cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
