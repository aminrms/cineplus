"use client";
import { Calendar, Clock, MapPin } from "lucide-react";
import type { Booking } from "@/types";
import { MOVIES, CINEMAS, SHOWTIMES } from "@/data/mock";
import { formatCurrency, formatDateLong, formatTimeLabel } from "@/lib/formatters";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";
import { faDigits } from "@/lib/formatters";

const statusVariant = (s: Booking["status"]): "success" | "info" | "muted" => (s === "active" ? "success" : s === "completed" ? "info" : "muted");

export function BookingCard({ booking }: { booking: Booking }) {
  const { t, locale } = useI18n();
  const movie = MOVIES.find((m) => m.id === booking.movieId);
  const cinema = CINEMAS.find((c) => c.id === booking.cinemaId);
  const st = SHOWTIMES.find((s) => s.id === booking.showtimeId);
  const statusLabel = t(`status.${booking.status}` as "status.active");
  return (
    <Card className="overflow-hidden">
      <div className="flex gap-3 p-4 sm:gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={movie?.poster} alt={movie ? movieTitle(movie, locale) : ""} className="h-28 w-20 shrink-0 rounded-xl object-cover" loading="lazy" />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate font-semibold">{movie && movieTitle(movie, locale)}</h3>
            <Badge variant={statusVariant(booking.status)}>{statusLabel}</Badge>
          </div>
          <p className="mt-1.5 flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-xs text-slate-400">
            <Calendar size={12} />{st ? formatDateLong(st.date, locale) : booking.createdAt} · <Clock size={12} />{st ? formatTimeLabel(st.time, locale) : ""}
          </p>
          <p className="mt-1 flex items-center gap-1.5 truncate text-xs text-slate-400"><MapPin size={12} className="shrink-0" />{cinema && cinemaName(cinema, locale)}{st ? ` · ${hallName(st.hall, locale)}` : ""}</p>
          <p className="mt-1.5 text-xs font-bold text-luminous">{t("ticket.seats")}: {booking.seatIds.join(" • ")}</p>
          <p className="mt-1 text-xs font-semibold">{formatCurrency(booking.total, locale)}</p>
          {booking.status === "active" && <p className="mt-1 text-[11px] text-success">{t("bookings.startsIn")} {locale === "fa" ? faDigits("2:15") : "2:15"}</p>}
        </div>
      </div>
      <div className="flex flex-col gap-2 border-t border-white/[0.08] p-3 sm:flex-row">
        <Link href={`/bookings/${booking.id}`} className="flex-1"><Button variant="secondary" size="sm" className="w-full">{t("bookings.viewTicket")}</Button></Link>
        <Link href={`/movies/${booking.movieId}`} className="flex-1"><Button variant="ghost" size="sm" className="w-full">{t("bookings.viewDetails")}</Button></Link>
      </div>
    </Card>
  );
}
