import React from "react";
import styles from "../../styles/styles";
import { navItems } from "../../static/data";
import { Link } from "react-router-dom";

const Navbar = ({ active }) => {
  return <div className={` block 800px:${styles.noramlFlex} `}>
    {
      navItems && navItems.map((i, index) => (
        <div className="flex">
          <Link to={i.url} className={`${active === index + 1 ? "text-[#FFD700]" : "text-black 800px:text-[#fff]"} pb-[30px] 800px:pb-0 font-[500] px-6 cursor-pointer ${styles.hover_effect}`}>
            {i.title}
          </Link>
        </div>
      ))
    }
  </div>;
};

export default Navbar;
