import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("eventCreateRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("eventCreateSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        event: action.payload,
        success: true,
      };
    })
    .addCase("eventCreateFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    })
    // Get seller events
    .addCase("getAllEventsSellerRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("getAllEventsSellerSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        events: action.payload,
        success: true,
      };
    })
    .addCase("getAllEventsSellerFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    })

    // Delete event seller
    .addCase("deleteEventRequest", (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase("deleteEventSuccess", (state, action) => {
      return {
        ...state,
        isLoading: false,
        message: action.payload,
      };
    })
    .addCase("deleteEventFail", (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      return {
        ...state,
        error: null,
      };
    });
});
