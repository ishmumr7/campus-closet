import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/styles";
import {
  AiFillHeart,
  AiFillStar,
  AiOutlineEye,
  AiOutlineHeart,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineStar,
} from "react-icons/ai";
import ProductDetailsCard from "./../Home/ProductDetailsCard/ProductDetailsCard.jsx";
import { backend_url } from "../../server.js";
import { toast } from "react-toastify";
import { addTocart } from "../../redux/actions/cart.js";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../redux/actions/wishlist.js";

const ProductCard = ({ data, isEvent }) => {
  const [click, setClick] = useState(false);
  const [open, setOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const addToCartHandler = (id) => {
    const itemExists = cart && cart.find((i) => i._id === id);
    if (itemExists) {
      toast.error("Item already added to cart!");
    } else {
      const cartData = { ...data, qty: 1 };
      dispatch(addTocart(cartData));
      toast.success("Item added to cart!");
    }
  };

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="w-full h-[370px] bg-white rounded-lg shadow-sm p-3 relative cursor-pointer">
      <div className="flex justify-end"></div>
      <Link
        to={
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }
      >
        <img
          src={`${backend_url}/${data.images && data.images[0]}`}
          alt={data.name}
          className="w-[80%] h-[170px] object-contain"
        />
      </Link>
      <Link to={`/seller/preview/${data?.sellerId}`}>
        <h5 className={styles.shop_name}>{data?.seller?.name}</h5>
      </Link>
      <Link
        to={
          isEvent ? `/product/${data._id}?isEvent=true` : `/product/${data._id}`
        }
      >
        <h4 className="pb-3 font-[500] h-[4em]">
          {data.name.length > 40 ? data.name.slice(0, 40) + "..." : data.name}
        </h4>
        <div className="flex">
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiFillStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
          <AiOutlineStar
            className="mr-2 cursor-pointer"
            color="#F6BA00"
            size={20}
          />
        </div>
        <div className="py-2 flex items-center justify-between">
          <div className="flex">
            <h5 className={styles.productDiscountPrice}>
              {data.originalPrice === 0 ? data.price : data.discountPrice} RM
            </h5>
            <h4 className={styles.price}>
              {data.originalPrice ? data.originalPrice + " RM" : null}
            </h4>
          </div>
          <span className="font-[400] text-[17px] text-[#68d284]">
            {data.sold_out} sold
          </span>
        </div>
      </Link>

      {/* Side options */}
      <div>
        {click ? (
          <AiFillHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => removeFromWishlistHandler(data)}
            color="red"
            title="Remove from wishlist"
          />
        ) : (
          <AiOutlineHeart
            size={22}
            className="cursor-pointer absolute right-2 top-5"
            onClick={() => addToWishlistHandler(data)}
            color="#333"
            title="Add to wishlist"
          />
        )}
        <AiOutlineEye
          size={22}
          className="cursor-pointer absolute right-2 top-14"
          onClick={() => setOpen(!open)}
          color="#333"
          title="Quick view"
        />
        <AiOutlineShoppingCart
          size={25}
          className="cursor-pointer absolute right-2 top-24"
          color="#333"
          title="Add to Cart"
          onClick={() => addToCartHandler(data._id)}
        />

        {open && <ProductDetailsCard setOpen={setOpen} data={data} />}
      </div>
    </div>
  );
};

export default ProductCard;
