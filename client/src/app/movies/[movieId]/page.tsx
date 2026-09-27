"use client";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Clock, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { useMovie } from "@/hooks/useQueries";
import { PageContainer, SectionHeader } from "@/components/common/layout";
import { ErrorState } from "@/components/common/states";
import { Skeleton } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DateSelector } from "@/components/booking/DateSelector";
import { TrailerButton } from "@/components/movie/TrailerButton";
import { DATES } from "@/data/mock";
import { setDate, setMovie } from "@/store/bookingSlice";
import { useState } from "react";
import { formatDuration, formatDurationShort } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { movieGenres, movieSynopsis, movieTitle } from "@/i18n/helpers";

export default function MovieDetailsPage() {
  const { movieId } = useParams<{ movieId: string }>();
  const { data: movie, isLoading, isError, refetch } = useMovie(movieId);
  const { t, locale } = useI18n();
  const [date, setDateLocal] = useState(DATES[3]);
  const dispatch = useDispatch();
  const router = useRouter();

  if (isLoading) return <PageContainer><div className="py-6"><Skeleton className="h-[280px] w-full sm:h-[380px]" /><Skeleton className="mt-4 h-8 w-1/2" /></div></PageContainer>;
  if (isError || !movie) return <PageContainer><div className="py-10"><ErrorState onRetry={() => refetch()} /></div></PageContainer>;

  const book = () => {
    dispatch(setMovie(movie.id));
    dispatch(setDate(date));
    router.push(`/showtimes?movie=${movie.id}&date=${date}`);
  };

  return (
    <div className="pb-28 md:pb-16">
      <div className="relative">
        <div className="relative h-[280px] sm:h-[340px] md:h-[460px]">
          <Image src={movie.backdrop} alt="" fill priority className="object-cover" sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-b from-deep/60 via-transparent to-deep" />
        </div>
        <PageContainer className="relative -mt-24 pb-0 sm:-mt-32">
          <Link href="/movies" className="mb-4 inline-flex min-h-[44px] items-center gap-1 text-sm text-slate-300"><ArrowLeft size={16} className="rtl:rotate-180" /> {t("back")}</Link>
          <div className="flex flex-col gap-5 sm:flex-row">
            <div className="relative h-48 w-32 shrink-0 overflow-hidden rounded-[20px] border border-white/15 shadow-large sm:h-56 sm:w-40">
              <Image src={movie.poster} alt={`${movieTitle(movie, locale)} poster`} fill className="object-cover" sizes="160px" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap gap-1.5">
                <Badge>{movie.certification}</Badge>
                <Badge variant="muted">{formatDurationShort(movie.duration, locale)}</Badge>
                {movie.formats.map((f) => <Badge key={f} variant="vip">{f}</Badge>)}
              </div>
              <h1 className="text-h2 mt-2 sm:text-h1">{movieTitle(movie, locale)}</h1>
              <p className="mt-0.5 text-xs text-slate-500">{movie.title}</p>
              <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <Star size={15} className="text-amber-400" fill="currentColor" />{movie.rating.toFixed(1)}
                <span className="text-slate-500">·</span><Clock size={14} />{formatDuration(movie.duration, locale)}
                <span className="text-slate-500">·</span>{movieGenres(movie, locale).join("، ")}
              </p>
              <p className="mt-1 text-xs text-slate-500">{t("details.directed")} {movie.director} · {movie.language}</p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <TrailerButton movie={movie} />
                <Button onClick={book} className="sm:w-auto">{t("bookTickets")}</Button>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>
      <PageContainer>
        <section className="mt-8"><SectionHeader title={t("details.synopsis")} /><p className="max-w-3xl text-sm leading-7 text-slate-300">{movieSynopsis(movie, locale)}</p></section>
        <section className="mt-8">
          <SectionHeader title={t("details.cast")} />
          <div className="no-scrollbar flex gap-4 overflow-x-auto pb-2">
            {movie.cast.map((c) => (
              <div key={c.id} className="flex w-20 shrink-0 flex-col items-center text-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.avatar} alt={c.name} className="h-16 w-16 rounded-full border border-white/10 object-cover" loading="lazy" />
                <p className="mt-2 w-full truncate text-xs font-semibold">{c.name}</p>
                <p className="w-full truncate text-[11px] text-slate-500">{c.role}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-8">
          <SectionHeader title={t("details.pickDate")} />
          <DateSelector dates={DATES} value={date} onChange={setDateLocal} />
        </section>
        <div className="sticky bottom-24 mt-8 md:bottom-6">
          <Button size="lg" className="w-full md:mx-auto md:max-w-md" onClick={book}>{t("details.continue")}{movieTitle(movie, locale)}</Button>
        </div>
      </PageContainer>
    </div>
  );
}
