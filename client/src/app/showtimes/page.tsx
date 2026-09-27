"use client";
import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { MapPin, X } from "lucide-react";
import { useCinemas, useMovies, useShowtimes } from "@/hooks/useQueries";
import type { Showtime } from "@/types";
import { PageContainer, PageHeader } from "@/components/common/layout";
import { DateSelector } from "@/components/booking/DateSelector";
import { ShowtimeButton } from "@/components/cinema/ShowtimeButton";
import { StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DATES } from "@/data/mock";
import { formatDateLong } from "@/lib/formatters";
import { setCinema, setDate, setMovie, setShowtime } from "@/store/bookingSlice";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";
import { faDigits } from "@/lib/formatters";

export default function ShowtimesPage() {
  return (
    <Suspense fallback={<PageContainer><div className="py-6 text-sm text-slate-400">…</div></PageContainer>}>
      <ShowtimesContent />
    </Suspense>
  );
}

function ShowtimesContent() {
  const params = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { t, locale } = useI18n();
  const [movieId, setMovieId] = useState(params.get("movie") ?? "dune-part-two");
  const [date, setDateLocal] = useState(params.get("date") ?? DATES[3]);
  const [selected, setSelected] = useState<string | undefined>();
  const cinemaFilter = params.get("cinema") ?? undefined;
  const { data: movies } = useMovies();
  const { data: cinemas } = useCinemas();
  const { data: showtimes } = useShowtimes(movieId, date, cinemaFilter);
  const activeCinema = cinemaFilter ? cinemas?.find((c) => c.id === cinemaFilter) : undefined;

  const grouped = useMemo(() => {
    const m = new Map<string, Showtime[]>();
    (showtimes ?? []).forEach((s: Showtime) => {
      const arr = m.get(s.cinemaId) ?? [];
      arr.push(s);
      m.set(s.cinemaId, arr);
    });
    return [...m.entries()];
  }, [showtimes]);

  const proceed = () => {
    const st = (showtimes ?? []).find((s) => s.id === selected);
    if (!st) return;
    dispatch(setMovie(st.movieId)); dispatch(setCinema(st.cinemaId)); dispatch(setDate(st.date)); dispatch(setShowtime(st.id));
    router.push(`/booking/seats?showtime=${st.id}`);
  };

  return (
    <PageContainer>
      <PageHeader title={t("showtimes.title")} subtitle={formatDateLong(date, locale)} />
      {cinemaFilter && (
        <div className="mb-4 flex min-h-[44px] items-center gap-2 rounded-2xl border border-electric/40 bg-electric/10 px-3 py-2 text-xs font-semibold">
          <MapPin size={14} className="shrink-0 text-luminous" />
          <span className="min-w-0 flex-1 truncate">
            {activeCinema ? cinemaName(activeCinema, locale) : cinemaFilter}
          </span>
          <Link
            href={`/showtimes?movie=${movieId}&date=${date}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/[0.06]"
            aria-label={t("cancel")}
          >
            <X size={14} />
          </Link>
        </div>
      )}
      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label={t("showtimes.chooseMovie")}>
        {movies?.filter((m) => m.status === "now-showing").map((m) => (
          <button key={m.id} onClick={() => setMovieId(m.id)} className={`min-h-[40px] whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold border ${movieId === m.id ? "border-electric bg-electric/20 text-white" : "border-white/10 text-slate-400"}`}>{movieTitle(m, locale)}</button>
        ))}
      </div>
      <DateSelector dates={DATES} value={date} onChange={setDateLocal} />
      <div className="mt-6 space-y-3 sm:space-y-4">
        {grouped.map(([cinemaId, sts]) => {
          const cinema = cinemas?.find((c) => c.id === cinemaId);
          if (!cinema || !sts?.length) return null;
          const dist = locale === "fa" ? faDigits(cinema.distance.toFixed(1)) : cinema.distance.toFixed(1);
          return (
            <div key={cinemaId} className="rounded-[20px] border border-white/[0.08] bg-charcoal p-4 sm:p-5">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <h3 className="font-semibold">{cinemaName(cinema, locale)}</h3>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-500"><MapPin size={12} className="shrink-0" />{dist} {t("cinemas.km")} · {hallName(sts[0].hall, locale)}</p>
                </div>
                <StatusBadge status={sts.some((s) => s.status === "available") ? "available" : "filling-fast"} />
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {sts.map((s) => (
                  <ShowtimeButton key={s.id} showtime={s} selected={selected === s.id} onSelect={() => setSelected(s.id)} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sticky bottom-24 mt-6 md:bottom-6">
        <Button size="lg" className="w-full" disabled={!selected} onClick={proceed}>
          {selected ? t("showtimes.selectSeats") : t("showtimes.pickTime")}
        </Button>
      </div>
      <div className="h-2 md:hidden" />
    </PageContainer>
  );
}
