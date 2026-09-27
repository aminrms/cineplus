import { BOOKINGS, CINEMAS, CONCESSIONS, DATES, MOVIES, SHOWTIMES } from "@/data/mock";
import type { Booking, Cinema, Concession, Movie, Showtime } from "@/types";

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms));
const USE_MOCK = true;

export const moviesApi = {
  async getMovies(): Promise<Movie[]> { if (!USE_MOCK) { const { data } = await import("@/lib/api/client").then(m => m.apiClient.get("/movies")); return data; } await delay(); return MOVIES; },
  async getMovie(id: string): Promise<Movie | undefined> { await delay(200); return MOVIES.find(m => m.id === id); },
  async search(q: string): Promise<Movie[]> {
    await delay(200);
    const s = q.toLowerCase();
    return MOVIES.filter(m => m.title.toLowerCase().includes(s) || m.genres.join(" ").toLowerCase().includes(s) || m.director.toLowerCase().includes(s) || m.cast.some(c => c.name.toLowerCase().includes(s)));
  },
};
export const cinemasApi = {
  async getCinemas(): Promise<Cinema[]> { await delay(); return CINEMAS; },
};
export const showtimesApi = {
  async getShowtimes(movieId?: string, date?: string, cinemaId?: string): Promise<Showtime[]> {
    await delay();
    return SHOWTIMES.filter(s => (!movieId || s.movieId === movieId) && (!date || s.date === date) && (!cinemaId || s.cinemaId === cinemaId));
  },
  async getDates(): Promise<string[]> { return DATES; },
};
export const concessionsApi = {
  async getConcessions(): Promise<Concession[]> { await delay(); return CONCESSIONS; },
};
export const bookingsApi = {
  async getBookings(): Promise<Booking[]> { await delay(); return BOOKINGS; },
  async createBooking(b: Omit<Booking, "id" | "createdAt">): Promise<Booking> {
    await delay(800);
    return { ...b, id: `CMX-${Math.floor(10000 + Math.random() * 89999)}`, createdAt: new Date().toISOString() };
  },
};
