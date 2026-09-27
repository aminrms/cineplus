import type { Locale } from "./dictionaries";
import type { Cinema, Concession, Movie } from "@/types";

export const appName = (locale: Locale) => (locale === "fa" ? "ساین‌پلاس" : "CinePlus");

export const movieTitle = (m: Movie, locale: Locale) => (locale === "fa" ? m.titleFa : m.title);
export const movieGenres = (m: Movie, locale: Locale) => (locale === "fa" ? m.genresFa : m.genres);
export const movieSynopsis = (m: Movie, locale: Locale) => (locale === "fa" ? m.synopsisFa : m.synopsis);
export const cinemaName = (c: Cinema, locale: Locale) => (locale === "fa" ? c.nameFa : c.name);
export const cinemaAddress = (c: Cinema, locale: Locale) => (locale === "fa" ? c.addressFa : c.address);
export const cinemaFacilities = (c: Cinema, locale: Locale) => (locale === "fa" ? c.facilitiesFa : c.facilities);
export const concessionName = (c: Concession, locale: Locale) => (locale === "fa" ? c.nameFa : c.name);
export const concessionDesc = (c: Concession, locale: Locale) => (locale === "fa" ? c.descriptionFa : c.description);
export const concessionCat = (c: Concession, locale: Locale) => (locale === "fa" ? c.categoryFa : c.category);
export const hallName = (hall: string, locale: Locale) => {
  if (locale !== "fa") return hall;
  return hall.replace(/VIP/gi, "وی‌آی‌پی").replace(/Hall\s*([A-Z0-9]+)/gi, "سالن $1");
};
export const showFormat = (format: string, locale: Locale) => {
  if (locale !== "fa") {
    if (format === "imax") return "IMAX";
    if (format === "dolby") return "Dolby";
    return "Standard";
  }
  if (format === "imax") return "آیمکس";
  if (format === "dolby") return "دالبی";
  return "استاندارد";
};
