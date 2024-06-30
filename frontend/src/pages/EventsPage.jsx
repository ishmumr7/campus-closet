import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className={`${styles.section} pt-10 `}>
            <EventCard active={true} data={allEvents && allEvents[0]} />
          </div>
        </div>
      )}
    </>
  );
};

export default EventsPage;
