"use client";
import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { PageContainer } from "@/components/common/layout";
import { TicketCard } from "@/components/ticket/TicketCard";
import { Button } from "@/components/ui/button";
import { MOVIES, CINEMAS, SHOWTIMES } from "@/data/mock";
import { formatDateLong, formatTimeLabel } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";

export default function SuccessPage() {
  return (
    <Suspense fallback={<PageContainer><div className="py-10 text-center text-sm text-slate-400">…</div></PageContainer>}>
      <SuccessContent />
    </Suspense>
  );
}

function SuccessContent() {
  const params = useSearchParams();
  const id = params.get("id") ?? "CMX-88214";
  const { t, locale } = useI18n();
  const [last, setLast] = useState<{ total: number; seatIds: string[]; movieId?: string; cinemaId?: string; showtimeId?: string } | null>(null);
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("last-booking");
      if (raw) setLast(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);
  const movie = MOVIES.find((m) => m.id === last?.movieId) ?? MOVIES[0];
  const cinema = CINEMAS.find((c) => c.id === last?.cinemaId);
  const st = SHOWTIMES.find((s) => s.id === last?.showtimeId);
  return (
    <PageContainer>
      <div className="py-6 text-center sm:py-8">
        <p className="text-sm font-bold uppercase tracking-widest text-success">{t("success.paid")}</p>
        <h1 className="text-h2 mt-1 sm:text-h1">{t("success.ready")}</h1>
      </div>
      <TicketCard
        movie={{ title: movieTitle(movie, locale), poster: movie.poster }}
        cinema={cinema ? cinemaName(cinema, locale) : locale === "fa" ? "پردیس سینمایی کوروش" : "Kourosh Cineplex"}
        hall={st ? hallName(st.hall, locale) : hallName("Hall 3", locale)}
        date={st ? formatDateLong(st.date, locale) : locale === "fa" ? "شنبه ۶ اردیبهشت" : "Sat, Apr 26"}
        time={st ? formatTimeLabel(st.time, locale) : formatTimeLabel("20:10", locale)}
        seats={last?.seatIds ?? ["F7", "F8", "F9"]}
        bookingId={id} total={last?.total ?? 569500}
      />
      <div className="mx-auto mt-6 flex max-w-md flex-col gap-2 sm:flex-row">
        <Link href="/bookings" className="flex-1"><Button variant="secondary" className="w-full">{t("success.myBookings")}</Button></Link>
        <Link href="/" className="flex-1"><Button className="w-full">{t("success.home")}</Button></Link>
      </div>
    </PageContainer>
  );
}
