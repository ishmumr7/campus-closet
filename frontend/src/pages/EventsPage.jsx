import React from "react";
import Header from "../components/Layout/Header";
import EventCard from "../components/Events/EventCard";
import { useSelector } from "react-redux";
import Loader from "../components/Layout/Loader";
import styles from "../styles/styles";
import Footer from "../components/Layout/Footer";

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
						{allEvents &&
							allEvents.map((i, index) => (
								<EventCard active={true} data={i} key={index} />
							))}
					</div>
					<Footer />
				</div>
			)}
		</>
	);
};

export default EventsPage;
