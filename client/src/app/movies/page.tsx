"use client";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useMovies } from "@/hooks/useQueries";
import { PageContainer, PageHeader } from "@/components/common/layout";
import { ErrorState, LoadingGrid, SearchEmpty } from "@/components/common/states";
import { MovieCard } from "@/components/movie/MovieCard";
import { SearchInput } from "@/components/common/SearchInput";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { movieGenres } from "@/i18n/helpers";

export default function MoviesPage() {
  return (
    <Suspense fallback={<PageContainer><div className="py-6"><LoadingGrid /></div></PageContainer>}>
      <MoviesContent />
    </Suspense>
  );
}

function MoviesContent() {
  const params = useSearchParams();
  const initial = params.get("search") ?? "";
  const { t, locale } = useI18n();
  const [q, setQ] = useState(initial);
  const [genre, setGenre] = useState("All");
  const [status, setStatus] = useState("all");
  const { data, isLoading, isError, refetch } = useMovies();
  const GENRES = useMemo(() => {
    const set = new Map<string, string>();
    set.set("All", t("movies.all"));
    (data ?? []).forEach((m) => movieGenres(m, locale).forEach((g, i) => { if (![...set.keys()].includes(m.genres[i])) set.set(m.genres[i], g); }));
    return [...set.entries()];
  }, [data, locale, t]);
  const list = useMemo(() => {
    if (!data) return [];
    return data.filter((m) =>
      (genre === "All" || m.genres.includes(genre)) &&
      (status === "all" || m.status === status) &&
      (!q || m.title.toLowerCase().includes(q.toLowerCase()) || m.titleFa.includes(q) || m.director.toLowerCase().includes(q.toLowerCase()))
    );
  }, [data, q, genre, status]);
  return (
    <PageContainer>
      <PageHeader title={t("movies.title")} subtitle={t("movies.sub")} />
      <div className="mb-4"><SearchInput value={q} onChange={setQ} /></div>
      <div className="no-scrollbar -mx-4 mb-3 flex gap-2 overflow-x-auto px-4" role="group" aria-label={t("movies.genreFilter")}>
        {GENRES.map(([key, label]) => (
          <button key={key} onClick={() => setGenre(key)} className={cn("min-h-[40px] whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition", genre === key ? "border-electric bg-electric/20 text-white" : "border-white/10 text-slate-400")}>{label}</button>
        ))}
      </div>
      <div className="mb-6 flex flex-wrap gap-2">
        {[["all", t("movies.all")], ["now-showing", t("home.nowShowing")], ["coming-soon", t("home.comingSoon")]].map(([v, l]) => (
          <button key={v} onClick={() => setStatus(v)} className={cn("min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold", status === v ? "bg-gradient-to-br from-electric to-luminous text-white" : "text-slate-400 border border-white/10")}>{l}</button>
        ))}
      </div>
      {isLoading && <LoadingGrid />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      {data && list.length === 0 && <SearchEmpty />}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
        {list.map((m) => (
          <div key={m.id} className="relative">
            {m.status === "coming-soon" && <Badge variant="warning" className="absolute start-2 top-2 z-10">{t("movies.soon")}</Badge>}
            <MovieCard movie={m} />
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
