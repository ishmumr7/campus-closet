import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return <div className={` ${styles.noramlFlex} `}>
    {
      navItems && navItems.map((i, index) => (
        <div className="flex">
          <Link to={i.url} className={`${active === index + 1 ? "text-[#FFD700]" : "text-[#fff]"} font-[500] px-6 cursor-pointer`}>
            {i.title}
          </Link>
        </div>
      ))
    }
  </div>;
};

export default Navbar;
