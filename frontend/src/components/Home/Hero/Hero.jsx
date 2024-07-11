import React from "react";
import styles from "../../../styles/styles";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div
			className={` relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
			style={{
				backgroundImage:
					"url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
			}}
		>
			<div className={`${styles.section} w-[90%] 800px:w-[60%] `}>
				<h1 className=" text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize ">
					TOP SALES IN <br /> UTM
				</h1>
				<p className=" pt-5 text-[16px] w-[80%] font-Poppins font-[400] text-[#000000ba] ">
					Welcome to the UTM Student Marketplace! Buy and sell a variety of
					items from textbooks and electronics to clothing and furniture.
					Connect with fellow students to find great deals, make extra cash, and
					support sustainable practices. Join us today and make your campus life
					easier and more affordable.
				</p>
				<Link to="/best-selling" className=" inline-block">
					<div className={`${styles.button}`}>
						<span className="text-white font-Poppins text-[18px] ">
							Check out
						</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Hero;
