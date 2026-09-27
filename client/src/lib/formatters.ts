import { toJalaali } from "jalaali-js";
import type { Locale } from "@/i18n/dictionaries";

export function faDigits(input: string | number): string {
  return String(input).replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[Number(d)]);
}

export function formatCurrency(n: number, locale: Locale = "fa"): string {
  if (locale === "fa") return `${Math.round(n).toLocaleString("fa-IR")} تومان`;
  return `${Math.round(n).toLocaleString("en-US")} Toman`;
}

const FA_WEEKDAYS = ["یکشنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه", "شنبه"];
const FA_WEEKDAYS_SHORT = ["یک", "دو", "سه", "چهار", "پنج", "جمعه", "شنبه"];
const FA_MONTHS = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];
const EN_WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function jalaliParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  const j = toJalaali(y, m, d);
  const weekday = new Date(y, m - 1, d).getDay();
  return { jy: j.jy, jm: j.jm, jd: j.jd, weekday };
}

export function formatDateLong(iso: string, locale: Locale = "fa"): string {
  const { jm, jd, weekday } = jalaliParts(iso);
  if (locale === "fa") return `${FA_WEEKDAYS[weekday]} ${faDigits(jd)} ${FA_MONTHS[jm - 1]}`;
  return `${EN_WEEKDAYS[weekday]}, ${FA_MONTHS[jm - 1]} ${jd}`;
}
export function formatWeekdayShort(iso: string, locale: Locale = "fa"): string {
  const { weekday } = jalaliParts(iso);
  return locale === "fa" ? FA_WEEKDAYS_SHORT[weekday] : EN_WEEKDAYS[weekday].slice(0, 3);
}
export function formatDayNum(iso: string, locale: Locale = "fa"): string {
  const { jd } = jalaliParts(iso);
  return locale === "fa" ? faDigits(jd) : String(jd);
}

export function formatTimeLabel(t: string, locale: Locale = "fa"): string {
  const [h, m] = t.split(":").map(Number);
  const mm = String(m).padStart(2, "0");
  if (locale === "fa") {
    const h12 = h % 12 === 0 ? 12 : h % 12;
    const part = h < 5 ? "نیمه‌شب" : h < 12 ? "صبح" : h < 17 ? "عصر" : "شب";
    return `${faDigits(h12)}:${faDigits(mm)} ${part}`;
  }
  const ampm = h >= 12 ? "PM" : "AM";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${mm} ${ampm}`;
}

export function formatDuration(mins: number, locale: Locale = "fa"): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (locale === "fa") return `${faDigits(h)} ساعت و ${faDigits(m)} دقیقه`;
  return `${h}h ${m}m`;
}
export function formatDurationShort(mins: number, locale: Locale = "fa"): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (locale === "fa") return `${faDigits(h)}:${faDigits(String(m).padStart(2, "0"))}`;
  return `${h}h ${m}m`;
}

export function formatCountdown(totalSeconds: number, locale: Locale = "fa"): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  const str = `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return locale === "fa" ? faDigits(str) : str;
}

export function formatStartsIn(locale: Locale = "fa"): string {
  return locale === "fa" ? "شروع تا ۲ ساعت و ۱۵ دقیقه دیگر" : "Starts in 2h 15m";
}
