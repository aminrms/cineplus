"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, MapPin } from "lucide-react";
import { useBookings } from "@/hooks/useQueries";
import { PageContainer } from "@/components/common/layout";
import { ErrorState } from "@/components/common/states";
import { Skeleton } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TicketCard } from "@/components/ticket/TicketCard";
import { BookingSummaryRows } from "@/components/booking/BookingSummary";
import { MOVIES, CINEMAS, SHOWTIMES } from "@/data/mock";
import { formatCurrency, formatDateLong, formatTimeLabel } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useBookings();
  const { t, locale } = useI18n();
  const booking = (data ?? []).find((b) => b.id === id);

  if (isLoading) return <PageContainer><div className="py-6"><Skeleton className="mx-auto h-[420px] w-full max-w-md" /></div></PageContainer>;
  if (!booking) return <PageContainer><div className="py-10"><ErrorState message={t("bookings.none")} /></div></PageContainer>;

  const movie = MOVIES.find((m) => m.id === booking.movieId) ?? MOVIES[0];
  const cinema = CINEMAS.find((c) => c.id === booking.cinemaId);
  const st = SHOWTIMES.find((s) => s.id === booking.showtimeId);
  const statusLabel = t(`status.${booking.status}` as "status.active");

  return (
    <PageContainer>
      <div className="flex items-center gap-3 py-4">
        <Link href="/bookings" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10" aria-label={t("back")}><ArrowLeft size={18} className="rtl:rotate-180" /></Link>
        <div className="flex min-w-0 items-center gap-2">
          <h1 className="truncate text-h3">{movieTitle(movie, locale)}</h1>
          <Badge variant={booking.status === "active" ? "success" : booking.status === "completed" ? "info" : "muted"}>{statusLabel}</Badge>
        </div>
      </div>
      <div className="grid items-start gap-4 sm:gap-6 lg:grid-cols-[1fr_360px]">
        <TicketCard
          movie={{ title: movieTitle(movie, locale), poster: movie.poster }}
          cinema={cinema ? cinemaName(cinema, locale) : ""}
          hall={st ? hallName(st.hall, locale) : ""}
          date={st ? formatDateLong(st.date, locale) : booking.createdAt}
          time={st ? formatTimeLabel(st.time, locale) : ""}
          seats={booking.seatIds}
          bookingId={booking.id}
          total={booking.total}
        />
        <div className="space-y-4">
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 font-bold">{t("ticket.details")}</h2>
            <dl className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-slate-300"><MapPin size={14} className="shrink-0 text-luminous" />{cinema && cinemaName(cinema, locale)}</div>
              <div className="flex items-center gap-2 text-slate-300"><Calendar size={14} className="shrink-0 text-luminous" />{st ? formatDateLong(st.date, locale) : booking.createdAt}</div>
              <div className="flex items-center gap-2 text-slate-300"><Clock size={14} className="shrink-0 text-luminous" />{st ? formatTimeLabel(st.time, locale) : ""}{st ? ` · ${hallName(st.hall, locale)}` : ""}</div>
              <div className="flex justify-between border-t border-white/10 pt-2"><dt className="text-slate-400">{t("ticket.status")}</dt><dd className="font-semibold">{statusLabel}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">{t("ticket.bookingId")}</dt><dd className="font-mono font-semibold" dir="ltr">{booking.id}</dd></div>
              {booking.extras.length > 0 && (
                <div className="flex justify-between gap-2"><dt className="shrink-0 text-slate-400">{t("checkout.extrasLabel")}</dt><dd className="text-end font-semibold">{booking.extras.map((e) => `${e.name} × ${e.quantity}`).join(locale === "fa" ? "، " : ", ")}</dd></div>
              )}
            </dl>
          </Card>
          <Card className="p-4 sm:p-5">
            <BookingSummaryRows ticket={booking.subtotal} extras={booking.extras.reduce((s, e) => s + e.price * e.quantity, 0)} fee={booking.bookingFee} discount={booking.discount} total={booking.total} />
          </Card>
          <Link href={`/movies/${booking.movieId}`}><Button variant="secondary" className="w-full">{t("bookings.viewDetails")}</Button></Link>
          <p className="text-center text-[11px] text-slate-500">{t("checkout.secure")}</p>
        </div>
      </div>
      <div className="h-6" />
    </PageContainer>
  );
}
