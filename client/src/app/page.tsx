"use client";
import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Bell, Star } from "lucide-react";
import { useMovies } from "@/hooks/useQueries";
import { CinemaLocationButton } from "@/components/cinema/CinemaLocationDialog";
import { PageContainer, SectionHeader } from "@/components/common/layout";
import { LoadingGrid, ErrorState } from "@/components/common/states";
import { MovieCard } from "@/components/movie/MovieCard";
import { TrailerButton } from "@/components/movie/TrailerButton";
import { GlobalSearch } from "@/components/common/GlobalSearch";
import { NotificationsSheet } from "@/components/common/NotificationsSheet";
import { SimpleTabs } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDurationShort } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { movieGenres, movieTitle } from "@/i18n/helpers";

export default function HomePage() {
  const { data: movies, isLoading, isError, refetch } = useMovies();
  const { t, locale } = useI18n();
  const [tab, setTab] = useState("now-showing");
  const filtered = useMemo(() => {
    if (!movies) return [];
    return movies.filter((m) => m.status === tab);
  }, [movies, tab]);
  const featured = movies?.find((m) => m.id === "dune-part-two") ?? movies?.[0];

  return (
    <PageContainer>
      <div className="flex items-center gap-2 py-4 sm:gap-3">
        <CinemaLocationButton className="flex min-h-[44px] min-w-0 items-center gap-1.5 text-sm font-medium" />
        <span className="ms-auto md:hidden">
          <NotificationsSheet
            trigger={
              <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/10" aria-label={t("notif.label")}>
                <Bell size={18} />
                <span className="absolute end-2.5 top-2.5 h-2 w-2 rounded-full bg-error" />
              </span>
            }
          />
        </span>
      </div>
      <div className="md:hidden"><GlobalSearch variant="home" /></div>

      {featured && (
        <section className="relative mt-4 overflow-hidden rounded-[20px] border border-white/10 sm:rounded-[24px]" aria-label={movieTitle(featured, locale)}>
          <div className="relative h-[380px] sm:h-[420px] md:h-[480px]">
            <Image src={featured.backdrop} alt="" fill priority className="object-cover" sizes="100vw" />
            <div className="absolute inset-0 hero-gradient" />
            <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 md:p-10">
              <div className="flex flex-wrap gap-1.5">
                {featured.formats.map((f) => <Badge key={f}>{f}</Badge>)}
                <Badge variant="muted">{featured.certification}</Badge>
                <Badge variant="muted">{formatDurationShort(featured.duration, locale)}</Badge>
              </div>
              <h1 className="text-h1 mt-3 max-w-2xl sm:text-display">{movieTitle(featured, locale)}</h1>
              <p className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                <Star size={15} className="text-amber-400" fill="currentColor" />{featured.rating.toFixed(1)}
                <span className="text-slate-500">·</span>{formatDurationShort(featured.duration, locale)}
                <span className="text-slate-500">·</span>{movieGenres(featured, locale).slice(0, 2).join("، ")}
              </p>
              <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                <TrailerButton movie={featured} />
                <Link href={`/movies/${featured.id}`}><Button className="w-full sm:w-auto">{t("bookTickets")}</Button></Link>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="mt-8"><SimpleTabs tabs={[{ value: "now-showing", label: t("home.nowShowing") }, { value: "coming-soon", label: t("home.comingSoon") }]} defaultValue={tab} onChange={setTab} /></div>

      <section className="mt-6" aria-label="Movies">
        <SectionHeader title={tab === "now-showing" ? t("home.nowShowing") : t("home.comingSoon")} action={<Link href="/movies" className="whitespace-nowrap text-sm font-semibold text-luminous">{t("seeAll")}</Link>} />
        {isLoading && <LoadingGrid />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {movies && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
            {filtered.map((m) => <MovieCard key={m.id} movie={m} />)}
          </div>
        )}
      </section>

      <section className="mt-10" aria-label={t("home.popular")}>
        <SectionHeader title={t("home.popular")} subtitle={t("home.popularSub")} />
        <div className="no-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2">
          {movies?.slice(0, 6).map((m) => <MovieCard key={m.id} movie={m} variant="compact" />)}
        </div>
      </section>
    </PageContainer>
  );
}
