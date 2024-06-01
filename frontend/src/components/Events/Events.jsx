import React from "react";
import EventCard from "./EventCard.jsx";
import styles from "../../styles/styles.js";

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
