export type CastMember = { id: string; name: string; role: string; avatar: string };
export type Movie = {
  id: string; title: string; titleFa: string; poster: string; backdrop: string; rating: number;
  duration: number; genres: string[]; genresFa: string[]; certification: string; synopsis: string; synopsisFa: string;
  releaseDate: string; director: string; language: string; status: "now-showing" | "coming-soon";
  cast: CastMember[]; trailerUrl?: string; formats: string[];
};
export type Cinema = {
  id: string; name: string; nameFa: string; distance: number; address: string; addressFa: string;
  facilities: string[]; facilitiesFa: string[]; halls: string[];
};
export type Showtime = {
  id: string; movieId: string; cinemaId: string; date: string; time: string; hall: string;
  format: "standard" | "imax" | "dolby"; status: "available" | "filling-fast" | "sold-out";
};
export type SeatType = "standard" | "vip" | "couple";
export type SeatStatus = "available" | "sold" | "disabled";
export type Seat = { id: string; row: string; number: number; type: SeatType; status: SeatStatus; price: number };
export type BookingExtra = { id: string; name: string; price: number; quantity: number };
export type Concession = { id: string; name: string; nameFa: string; description: string; descriptionFa: string; price: number; category: string; categoryFa: string; image: string };
export type PaymentMethod = "card" | "wallet";
export type BookingState = {
  movieId?: string; cinemaId?: string; date?: string; showtimeId?: string;
  selectedSeats: string[]; extras: BookingExtra[]; promoCode?: string; paymentMethod?: PaymentMethod;
};
export type Booking = {
  id: string; movieId: string; cinemaId: string; showtimeId: string; seatIds: string[];
  extras: BookingExtra[]; subtotal: number; discount: number; bookingFee: number; total: number;
  status: "active" | "completed" | "cancelled" | "expired"; createdAt: string;
};
