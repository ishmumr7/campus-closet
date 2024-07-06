import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import {
	AiFillHeart,
	AiOutlineHeart,
	AiOutlineMessage,
	AiOutlineShoppingCart,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { backend_url } from "../../../server";
import { toast } from "react-toastify";
import { addTocart } from "../../../redux/actions/cart";
import {
	addToWishlist,
	removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { Link } from "react-router-dom";

const ProductDetailsCard = ({ setOpen, data }) => {
	const [count, setCount] = useState(1);
	const [click, setClick] = useState(false);
	const [select, setselect] = useState(false);
	const { cart } = useSelector((state) => state.cart);
	const { wishlist } = useSelector((state) => state.wishlist);
	const dispatch = useDispatch();

	const handleMessageSubmit = () => {};

	const incrementCount = () => {
		if (count < data.stock) {
			setCount(count + 1);
		} else {
			toast.error("Stock unavailable!");
		}
	};

	const decrementCount = () => {
		if (count > 1) {
			setCount(count - 1);
		}
	};

	const addToCartHandler = (id) => {
		const itemExists = cart && cart.find((i) => i._id === id);
		if (itemExists) {
			toast.error("Item already added to cart!");
		} else {
			const cartData = { ...data, qty: count };
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
		<div className="bg-[#fff]">
			{data ? (
				<div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
					<div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-scroll 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
						<RxCross1
							size={30}
							className="absolute right-3 top-3 z-50"
							onClick={() => setOpen(false)}
						/>

						<div className="block w-full 800px:flex">
							<div className="w-full 800px:w-[50%]">
								<img src={`${backend_url}/${data.images[0]}`} alt="" />
								<Link to={`/seller/preview/${data?.sellerId}`}>
									<div className="flex">
										<img
											className=" h-[50px] w-[50px] rounded mr-2 "
											src="https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
											alt=""
										/>
										<div>
											<h3 className={`${styles.shop_name}`}>
												{data.seller.name}
											</h3>
											<h5 className="pb-3 text-[15px]">
												{data.reviews.length !== 0
													? data.ratings + "/5 Rating"
													: "Not Rated"}
											</h5>
										</div>
									</div>
								</Link>
								<div
									className={`${styles.button}`}
									style={{
										background: "#000",
										marginTop: "1rem",
										borderRadius: "4px",
										height: "2.75rem",
									}}
									onClick={handleMessageSubmit}
								>
									<span className="text-[#fff] flex items-center">
										Send Message <AiOutlineMessage className="ml-1 " />
									</span>
								</div>
								<h5 className="text-[16px] text-[red]">
									{data?.sold_out} Sold
								</h5>
							</div>

							<div className="w-full 800px:w-[50%] pt-5 pl-[5px] pr-[5px] ">
								<h1 className={`${styles.productTitle} text-[20px]`}>
									{data.name}
								</h1>
								<p>{data.description}</p>

								<div className="flex pt-3">
									<h4 className={`${styles.productDiscountPrice}`}>
										{data.discountPrice} RM
									</h4>
									<h3 className={styles.price}>
										{data.originalPrice ? data.originalPrice + " RM" : null}
									</h3>
								</div>
								<div className="flex items-center mt-12 justify-between pr-3">
									<div>
										<button
											className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
											onClick={decrementCount}
										>
											-
										</button>
										<span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
											{count}
										</span>
										<button
											className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
											onClick={incrementCount}
										>
											+
										</button>
									</div>
									<div>
										{click ? (
											<AiFillHeart
												size={22}
												className=" cursor-pointer "
												onClick={() => removeFromWishlistHandler(data)}
												color={click ? "red" : "#333"}
												title="Remove from wishlist"
											/>
										) : (
											<AiOutlineHeart
												size={22}
												className=" cursor-pointer "
												onClick={() => addToWishlistHandler(data)}
												color={click ? "red" : "#333"}
												title="Add to wishlist"
											/>
										)}
									</div>
								</div>
								<div
									className={styles.button}
									style={{
										marginTop: "1.5rem",
										borderRadius: "4px",
										height: "2.75rem",
										display: "flex",
										alignItems: "center",
										backgroundColor: "#000",
									}}
									onClick={() => addToCartHandler(data._id)}
								>
									<span className="text-[#fff] flex items-center">
										Add to cart <AiOutlineShoppingCart className="ml-1" />
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	);
};

export default ProductDetailsCard;
