import React from "react";
import styles from "../../../styles/styles";
import EventCard from "./EventCard.jsx";

const Events = () => {
  return (
    <div>
      <div className={`${styles.section}`}>
        <div className={styles.heading}>Events</div>

        <div className="w-full grid">
          <EventCard />
        </div>
      </div>
    </div>
  );
};

export default Events;
