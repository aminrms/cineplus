"use client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type AuthState = { phone?: string; verified: boolean };
const initialState: AuthState = { verified: false };
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhone: (s, a: PayloadAction<string>) => { s.phone = a.payload; s.verified = false; },
    setVerified: (s, a: PayloadAction<boolean>) => { s.verified = a.payload; },
    signOut: () => initialState,
  },
});
export const { setPhone, setVerified, signOut } = authSlice.actions;
export default authSlice.reducer;
