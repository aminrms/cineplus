"use client";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { BookingExtra, BookingState, PaymentMethod } from "@/types";

const initialState: BookingState = { selectedSeats: [], extras: [] };

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    setMovie: (s, a: PayloadAction<string>) => { s.movieId = a.payload; },
    setCinema: (s, a: PayloadAction<string>) => { s.cinemaId = a.payload; },
    setDate: (s, a: PayloadAction<string>) => { s.date = a.payload; },
    setShowtime: (s, a: PayloadAction<string>) => { s.showtimeId = a.payload; },
    toggleSeat: (s, a: PayloadAction<string>) => {
      s.selectedSeats = s.selectedSeats.includes(a.payload)
        ? s.selectedSeats.filter((x) => x !== a.payload)
        : [...s.selectedSeats, a.payload];
    },
    clearSeats: (s) => { s.selectedSeats = []; },
    setExtra: (s, a: PayloadAction<BookingExtra>) => {
      const ex = s.extras.find((e) => e.id === a.payload.id);
      if (ex) ex.quantity = a.payload.quantity;
      else s.extras.push(a.payload);
      s.extras = s.extras.filter((e) => e.quantity > 0);
    },
    clearExtras: (s) => { s.extras = []; },
    setPromo: (s, a: PayloadAction<string | undefined>) => { s.promoCode = a.payload; },
    setPayment: (s, a: PayloadAction<PaymentMethod>) => { s.paymentMethod = a.payload; },
    resetBooking: () => initialState,
  },
});

export const { setMovie, setCinema, setDate, setShowtime, toggleSeat, clearSeats, setExtra, clearExtras, setPromo, setPayment, resetBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
