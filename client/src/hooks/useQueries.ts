"use client";
import { useQuery } from "@tanstack/react-query";
import { bookingsApi, cinemasApi, concessionsApi, moviesApi, showtimesApi } from "@/lib/api";

export const useMovies = () => useQuery({ queryKey: ["movies"], queryFn: moviesApi.getMovies });
export const useMovie = (id: string) => useQuery({ queryKey: ["movie", id], queryFn: () => moviesApi.getMovie(id), enabled: !!id });
export const useMovieSearch = (q: string) => useQuery({ queryKey: ["search", q], queryFn: () => moviesApi.search(q), enabled: q.length > 1 });
export const useCinemas = () => useQuery({ queryKey: ["cinemas"], queryFn: cinemasApi.getCinemas });
export const useShowtimes = (movieId?: string, date?: string, cinemaId?: string) =>
  useQuery({ queryKey: ["showtimes", movieId, date, cinemaId], queryFn: () => showtimesApi.getShowtimes(movieId, date, cinemaId) });
export const useConcessions = () => useQuery({ queryKey: ["concessions"], queryFn: concessionsApi.getConcessions });
export const useBookings = () => useQuery({ queryKey: ["bookings"], queryFn: bookingsApi.getBookings });
