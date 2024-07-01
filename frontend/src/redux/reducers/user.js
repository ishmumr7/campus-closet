import { createReducer } from "@reduxjs/toolkit";
import { act } from "react";

const initialState = {
  loading: true,
  isAuthenticated: false,
  isSeller: false,
  user: null,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        isSeller: action.payload.role === "seller",
      };
    })
    .addCase("LoadUserFail", (state, action) => {
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false,
        isSeller: false,
      };
    })

    // Update user
    .addCase('updateUserInfoRequest', (state) => {
      state.loading = true;
      state.error = null; // Reset error state on request
    })
    .addCase('updateUserInfoSuccess', (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Reset error state on success
    })
    .addCase('updateUserInfoFailed', (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      return {
        ...state,
        error: null,
      };
    });
});
