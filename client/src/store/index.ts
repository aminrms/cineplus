"use client";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import bookingReducer from "./bookingSlice";

export const store = configureStore({ reducer: { booking: bookingReducer, auth: authReducer } });
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
