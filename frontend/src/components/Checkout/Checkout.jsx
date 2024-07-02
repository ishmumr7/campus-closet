import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { johorCities } from "../../static/data";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";

const Checkout = () => {
	const { user } = useSelector((state) => state.user);
	const { cart } = useSelector((state) => state.cart);
	const [city, setCity] = useState("");
	const [userInfo, setUserInfo] = useState(false);
	const [address1, setAddress1] = useState("");
	const [address2, setAddress2] = useState("");
	const [postCode, setPostCode] = useState("");
	const [postcodeDisabled, setPostcodeDisabled] = useState(true);
	const [couponCode, setCouponCode] = useState("");
	const [couponCodeData, setCouponCodeData] = useState(null);
	const [discountPrice, setDiscountPrice] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const paymentSubmit = () => {
		if (
			address1 === "" ||
			address2 === "" ||
			postCode === null ||
			city === ""
		) {
			toast.error("Please choose your delivery address!");
		} 
    else {
			const shippingAddress = {
				address1,
				address2,
				city,
				postCode,
			};

			const orderData = {
				cart,
				totalPrice,
				subTotalPrice,
				shipping,
				discountPrice,
				shippingAddress,
				user,
			};

			// update local storage with the updated orders array
			localStorage.setItem("latestOrder", JSON.stringify(orderData));
			navigate("/payment");
		}
	};

	const subTotalPrice = cart.reduce(
		(acc, item) => acc + item.qty * item.discountPrice,
		0
	);

	const shipping = 5; // Shipping cost

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = couponCode;

		await axios.get(`${server}/coupon/get-coupon-value/${name}`).then((res) => {
			const sellerId = res.data.couponCode?.sellerId;
			const couponCodeValue = res.data.couponCode?.value;
			if (res.data.couponCode !== null) {
				const isCouponValid =
					cart && cart.filter((item) => item.sellerId === sellerId);

				if (isCouponValid.length === 0) {
					toast.error("Coupon code is not valid for this shop");
					setCouponCode("");
				} else {
					const eligiblePrice = isCouponValid.reduce(
						(acc, item) => acc + item.qty * item.discountPrice,
						0
					);
					const discountPrice = (eligiblePrice * couponCodeValue) / 100;
					setDiscountPrice(discountPrice);
					setCouponCodeData(res.data.couponCode);
					setCouponCode("");
				}
			}
			if (res.data.couponCode === null) {
				toast.error("Coupon code doesn't exists!");
				setCouponCode("");
			}
		});
	};

	const discountPercentenge = couponCodeData ? discountPrice : "";

	const totalPrice = couponCodeData
		? (subTotalPrice + shipping - discountPercentenge).toFixed(2)
		: (subTotalPrice + shipping).toFixed(2);

	return (
		<div className="w-full flex flex-col items-center py-8">
			<div className="w-[90%] 1000px:w-[70%] block 800px:flex">
				<div className="w-full 800px:w-[65%]">
					<ShippingInfo
						user={user}
						city={city}
						setCity={setCity}
						userInfo={userInfo}
						setUserInfo={setUserInfo}
						address1={address1}
						setAddress1={setAddress1}
						address2={address2}
						setAddress2={setAddress2}
						postCode={postCode}
						setPostCode={setPostCode}
						postcodeDisabled={postcodeDisabled}
						setPostcodeDisabled={setPostcodeDisabled}
					/>
				</div>
				<div className="w-full 800px:w-[35%] 800px:mt-0 mt-8">
					<CartData
						handleSubmit={handleSubmit}
						totalPrice={totalPrice}
						shipping={shipping}
						subTotalPrice={subTotalPrice}
						couponCode={couponCode}
						setCouponCode={setCouponCode}
						discountPercentenge={discountPercentenge}
					/>
				</div>
			</div>
			<div
				className={`${styles.button} w-[150px] 800px:w-[280px] mt-10`}
				onClick={paymentSubmit}
			>
				<h5 className="text-white">Go to Payment</h5>
			</div>
		</div>
	);
};

const ShippingInfo = ({
	user,
	country,
	setCountry,
	city,
	setCity,
	userInfo,
	setUserInfo,
	address1,
	setAddress1,
	address2,
	setAddress2,
	postCode,
	setPostCode,
	postcodeDisabled,
	setPostcodeDisabled,
}) => {
	const handleCityChange = (e) => {
		const selectedCity = e.target.value;
		setCity(selectedCity);
		setPostCode("");
		setPostcodeDisabled(!selectedCity);
	};

	const handlePostcodeChange = (e) => {
		setPostCode(e.target.value);
	};

	return (
		<div className="w-full 800px:w-[95%] bg-white rounded-md p-5 pb-8">
			<h5 className="text-[18px] font-[500]">Shipping Address</h5>
			<br />
			<form>
				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Full Name</label>
						<input
							type="text"
							value={user && user.name}
							required
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Email Address</label>
						<input
							type="email"
							value={user && user.email}
							required
							className={`${styles.input}`}
						/>
					</div>
				</div>

				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Phone Number</label>
						<input
							type="number"
							required
							value={user && user.phoneNumber}
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Post Code</label>
						<select
							className="w-[95%] border h-[40px] rounded-[5px]"
							required
							value={postCode}
							onChange={handlePostcodeChange}
							disabled={postcodeDisabled}
						>
							<option value="">Select a postcode...</option>
							{city &&
								johorCities
									.find((c) => c.name === city)
									?.postcode.map((code) => (
										<option key={code} value={code}>
											{code}
										</option>
									))}
						</select>
					</div>
				</div>

				<div className="w-full flex pb-3">
					<div className="w-full pb-2">
						<label className="block pb-2">City</label>
						<select
							name=""
							id=""
							value={city}
							onChange={handleCityChange}
							className="w-[95%] border h-[40px] rounded-[5px]"
						>
							<option value="">Select a city...</option>
							{johorCities.map((city) => (
								<option key={city.name} value={city.name}>
									{city.name}
								</option>
							))}
						</select>
					</div>
				</div>

				<div className="w-full flex pb-3">
					<div className="w-[50%]">
						<label className="block pb-2">Address1</label>
						<input
							type="address"
							required
							value={address1}
							onChange={(e) => setAddress1(e.target.value)}
							className={`${styles.input} !w-[95%]`}
						/>
					</div>
					<div className="w-[50%]">
						<label className="block pb-2">Address2</label>
						<input
							type="address"
							value={address2}
							onChange={(e) => setAddress2(e.target.value)}
							required
							className={`${styles.input}`}
						/>
					</div>
				</div>

				<div></div>
			</form>
			<h5
				className="text-[18px] cursor-pointer inline-block"
				onClick={() => setUserInfo(!userInfo)}
			>
				Choose From saved address
			</h5>
			{userInfo && (
				<div>
					{user &&
						user.addresses.map((item, index) => (
							<div
								key={index}
								className="flex items-center mt-2 p-2 border border-gray-300 rounded-md"
							>
								<label className="flex items-center cursor-pointer">
									<input
										type="radio"
										name="address"
										className="mr-3"
										value={item.addressType}
										onChange={() => {
											setAddress1(item.address1);
											setAddress2(item.address2);
											setPostCode(item.postCode);
											setCity(item.city);
										}}
									/>
									<h2 className="text-lg font-medium w-full">{item.addressType}</h2>
								</label>
							</div>
						))}
				</div>
			)}
		</div>
	);
};

const CartData = ({
	handleSubmit,
	totalPrice,
	shipping,
	subTotalPrice,
	couponCode,
	setCouponCode,
	discountPercentenge,
}) => {
	return (
		<div className="w-full bg-[#fff] rounded-md p-5 pb-8">
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">subtotal:</h3>
				<h5 className="text-[18px] font-[600]">RM {subTotalPrice}</h5>
			</div>
			<br />
			<div className="flex justify-between">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">shipping:</h3>
				<h5 className="text-[18px] font-[600]">RM {shipping.toFixed(2)}</h5>
			</div>
			<br />
			<div className="flex justify-between border-b pb-3">
				<h3 className="text-[16px] font-[400] text-[#000000a4]">Discount:</h3>
				<h5 className="text-[18px] font-[600]">
					-{" "}
					{discountPercentenge ? "RM " + discountPercentenge.toString() : null}
				</h5>
			</div>
			<h5 className="text-[18px] font-[600] text-end pt-3">RM {totalPrice}</h5>
			<br />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					className={`${styles.input} h-[40px] pl-2`}
					placeholder="Coupoun code"
					value={couponCode}
					onChange={(e) => setCouponCode(e.target.value)}
					required
				/>
				<input
					className={`w-full h-[40px] border border-[#f63b60] text-center text-[#f63b60] rounded-[3px] mt-8 cursor-pointer`}
					required
					value="Apply code"
					type="submit"
				/>
			</form>
		</div>
	);
};

export default Checkout;
