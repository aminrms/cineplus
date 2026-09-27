"use client";
import Image from "next/image";
import Link from "next/link";
import { Clock, Star } from "lucide-react";
import type { Movie } from "@/types";
import { formatDurationShort } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { movieGenres, movieTitle } from "@/i18n/helpers";

export function MovieCard({ movie, variant = "default" }: { movie: Movie; variant?: "default" | "featured" | "compact" }) {
  const { t, locale } = useI18n();
  const title = movieTitle(movie, locale);
  if (variant === "compact") {
    return (
      <Link href={`/movies/${movie.id}`} className="group flex min-w-[240px] gap-3 rounded-2xl border border-white/[0.08] bg-charcoal p-3 transition hover:border-electric/40 sm:min-w-[260px]">
        <div className="relative h-24 w-16 shrink-0 overflow-hidden rounded-xl">
          <Image src={movie.poster} alt={title} fill className="object-cover transition group-hover:scale-105" sizes="64px" />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-amber-400"><Star size={12} fill="currentColor" />{movie.rating.toFixed(1)}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{movieGenres(movie, locale).join(" · ")}</p>
        </div>
      </Link>
    );
  }
  return (
    <div className="group">
      <Link href={`/movies/${movie.id}`} className="block overflow-hidden rounded-[20px] border border-white/[0.08] bg-charcoal shadow-DEFAULT transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-glow" aria-label={title}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image src={movie.poster} alt={`${title} poster`} fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width:640px) 50vw, (max-width:1024px) 33vw, 20vw" loading="lazy" />
          <div className="absolute start-2 top-2 flex items-center gap-1 rounded-full bg-black/70 px-2 py-1 text-[11px] font-bold text-amber-400 backdrop-blur">
            <Star size={11} fill="currentColor" />{movie.rating.toFixed(1)}
          </div>
        </div>
        <div className="p-3">
          <p className="truncate text-sm font-semibold">{title}</p>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-400"><Clock size={12} />{formatDurationShort(movie.duration, locale)} · {movieGenres(movie, locale)[0]}</p>
          <Button size="sm" variant="secondary" className="mt-3 w-full group-hover:border-electric/50">{t("book")}</Button>
        </div>
      </Link>
    </div>
  );
}
