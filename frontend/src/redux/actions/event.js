import axios from "axios";
import { server } from "../../server";

//create event
export const createEvent = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "eventCreateRequest",
    });

    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const { data } = await axios.post(
      `${server}/event/create-event`,
      newForm,
      config
    );
    dispatch({
      type: "eventCreateSuccess",
      payload: data.event,
    });
  } catch (error) {
    dispatch({
      type: "eventCreateFail",
      payload: error.response.data.message,
    });
  }
};

//Get all events seller
export const getAllEventsSeller = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsSellerRequest",
    });

    const { data } = await axios.get(
      `${server}/event/get-all-events-seller/${id}`
    );
    dispatch({
      type: "getAllEventsSellerSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventsSellerFail",
      payload: error.response.data.message,
    });
  }
};

// Get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAlleventsRequest",
    });

    const { data } = await axios.get(`${server}/event/get-all-events`);
    dispatch({
      type: "getAlleventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAlleventsFail",
      payload: error.response.data.message,
    });
  }
};

// Delete event
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });

    const { data } = await axios.delete(
      `${server}/event/delete-seller-event/${id}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFail",
      payload: error.response.data.message,
    });
  }
};
