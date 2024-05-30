import React from "react";
import styles from "../../../styles/styles";
import CountDown from "./CountDown.jsx";

const EventCard = () => {
  return (
    <div className="w-full block bg-white rounded-lg lg:flex p-2 mb-12">
      <div className="w-full lg:w-[50%] m-auto">
        <img src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg" alt="" />
      </div>

      <div className="w-full lg:w-[50%] flex flex-col justify-center">
        <h2 className={styles.productTitle}>iPhone 14 Pro Max 8/256GB</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
          sequi magnam ducimus esse nobis numquam fugiat, quas illo officiis ad,
          eaque sapiente accusantium quam perspiciatis unde repellat sunt
          quisquam, inventore harum dolore est. Inventore magni optio totam
          molestiae architecto reiciendis consequuntur pariatur quam, velit
          nostrum voluptas tenetur earum at amet!
        </p>

        <div className="flex py-2 justify-between">
          <div className="flex">
            <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
              1099RM
            </h5>
            <h5 className=" font-bold text-[20px] text-[#333] font-Roboto">
              999 RM
            </h5>
          </div>
          <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">120 sold</span>
        </div>
        <CountDown />
        
      </div>
    </div>
  );
};

export default EventCard;