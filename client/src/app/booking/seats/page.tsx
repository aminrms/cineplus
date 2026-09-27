"use client";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { ArrowLeft, Armchair } from "lucide-react";
import Link from "next/link";
import type { RootState } from "@/store";
import { PageContainer } from "@/components/common/layout";
import { SeatMap } from "@/components/booking/SeatMap";
import { SeatHoldTimer } from "@/components/booking/SeatHoldTimer";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Button } from "@/components/ui/button";
import { MOVIES, CINEMAS, SHOWTIMES } from "@/data/mock";
import { formatCurrency, formatDateLong, formatTimeLabel } from "@/lib/formatters";
import { ticketSubtotalForSeats } from "@/features/booking/utils";
import { GlassCard } from "@/components/ui/card";
import { BOOKING_FEE } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";

export default function SeatsPage() {
  const booking = useSelector((s: RootState) => s.booking);
  const router = useRouter();
  const { t, locale } = useI18n();
  const movie = MOVIES.find((m) => m.id === booking.movieId) ?? MOVIES[0];
  const cinema = CINEMAS.find((c) => c.id === booking.cinemaId) ?? CINEMAS[0];
  const st = SHOWTIMES.find((s) => s.id === booking.showtimeId);
  const subtotal = ticketSubtotalForSeats(booking.selectedSeats);
  const when = st ? `${formatDateLong(st.date, locale)} · ${formatTimeLabel(st.time, locale)} · ${hallName(st.hall, locale)}` : "";
  const seatLabel = booking.selectedSeats.length > 0
    ? `${booking.selectedSeats.length} ${t("seats.selected")}: ${booking.selectedSeats.join(" · ")}`
    : t("seats.noSeats");

  return (
    <PageContainer>
      <div className="mx-auto max-w-xl py-4"><BookingSteps current={1} /></div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-w-0 items-center gap-3">
          <Link href="/showtimes" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10" aria-label={t("back")}><ArrowLeft size={18} className="rtl:rotate-180" /></Link>
          <div className="min-w-0">
            <h1 className="truncate text-h3">{movieTitle(movie, locale)}</h1>
            <p className="truncate text-xs text-slate-400">{cinemaName(cinema, locale)}{when ? ` · ${when}` : ""}</p>
          </div>
        </div>
        <div className="sm:ms-auto"><SeatHoldTimer /></div>
      </div>

      <div className="mt-4 grid items-start gap-4 sm:gap-6 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0 rounded-[20px] border border-white/[0.08] bg-charcoal p-3 sm:p-5 md:p-8">
          <SeatMap />
          <div className="mx-auto mt-5 flex max-w-md items-center justify-center gap-2 rounded-2xl bg-electric/10 px-4 py-2.5 text-center text-xs font-semibold text-slate-200" role="status" aria-live="polite">
            <Armchair size={15} className="shrink-0 text-luminous" />
            <span className="truncate">{seatLabel}</span>
          </div>
        </div>
        <aside className="hidden min-w-0 lg:block">
          <GlassCard className="sticky top-24 p-5">
            <h2 className="font-bold">{movieTitle(movie, locale)}</h2>
            <p className="mt-1 text-xs leading-5 text-slate-400">{cinemaName(cinema, locale)}<br />{when}</p>
            <p className="mt-3 text-sm font-semibold">{booking.selectedSeats.length} {t("seats.selected")}</p>
            <p className="min-h-[20px] text-xs text-luminous">{booking.selectedSeats.join(" · ") || t("seats.noSeats")}</p>
            <dl className="mt-4 space-y-1.5 text-sm">
              <div className="flex justify-between"><dt className="text-slate-400">{t("seats.tickets")}</dt><dd className="font-semibold">{formatCurrency(subtotal, locale)}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">{t("seats.fee")}</dt><dd className="font-semibold">{formatCurrency(BOOKING_FEE, locale)}</dd></div>
              <div className="flex justify-between border-t border-white/10 pt-2 font-bold"><dt>{t("seats.total")}</dt><dd>{formatCurrency(subtotal + BOOKING_FEE, locale)}</dd></div>
            </dl>
            <Button className="mt-4 w-full" disabled={booking.selectedSeats.length === 0} onClick={() => router.push("/booking/extras")}>{t("seats.toExtras")}</Button>
          </GlassCard>
        </aside>
      </div>

      <div className="glass fixed inset-x-3 bottom-[84px] z-30 flex items-center gap-2 rounded-2xl p-3 sm:gap-3 lg:hidden">
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] text-slate-400 sm:text-xs">{booking.selectedSeats.length} {t("seats.selected")}{booking.selectedSeats.length > 0 ? ` · ${booking.selectedSeats.join(" ")}` : ""}</p>
          <p className="truncate text-base font-extrabold sm:text-lg">{formatCurrency(subtotal, locale)}</p>
        </div>
        <Button disabled={booking.selectedSeats.length === 0} onClick={() => router.push("/booking/extras")} className="h-12 shrink-0 px-5">{t("seats.toExtras")}</Button>
      </div>
      <div className="h-24 lg:hidden" />
    </PageContainer>
  );
}
