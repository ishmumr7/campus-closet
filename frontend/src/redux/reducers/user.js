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
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
      state.error = null; // Reset error state on request
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null; // Reset error state on success
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // Update user addresses
    .addCase("updateUserAddressRequest", (state) => {
      state.addressloading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressloading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.addressloading = false;
      state.error = action.payload;
    });

  // Delete user address
  builder
    .addCase("deleteUserAddressRequest", (state) => {
      return {
        ...state,
        addressLoading: true,
      };
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      return {
        ...state,
        addressLoading: false,
        successMessage: action.payload.successMessage,
        user: action.payload.user,
      };
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      return {
        ...state,
        addressLoading: false,
        error: action.payload,
      };
    })

    // get all users --- admin
    .addCase('getAllUsersRequest', (state) => {
      return {
        ...state,
        usersLoading: true,
      };
    })
    .addCase('getAllUsersSuccess', (state, action) => {
      return {
        ...state,
        usersLoading: false,
        users: action.payload,
      };
    })
    .addCase('getAllUsersFailed', (state, action) => {
      return {
        ...state,
        usersLoading: false,
        error: action.payload,
      };
    })

    // get all sellers --- admin
    .addCase('getAllSellersRequest', (state) => {
      return {
        ...state,
        isLoading: true,
      };
    })
    .addCase('getAllSellersSuccess', (state, action) => {
      return {
        ...state,
        isLoading: false,
        sellers: action.payload,
      };
    })
    .addCase('getAllSellersFailed', (state, action) => {
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    })

    //Clear messages
    .addCase("clearMessages", (state) => {
      return {
        ...state,
        successMessage: null,
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
