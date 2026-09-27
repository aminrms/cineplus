"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
import { movieTitle } from "@/i18n/helpers";
import type { Movie } from "@/types";

export function TrailerButton({ movie }: { movie: Movie }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="secondary"><Play size={16} /> {t("watchTrailer")}</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[20px] border border-white/10 bg-charcoal shadow-large sm:rounded-[24px]"
          aria-label={`${t("watchTrailer")} — ${movieTitle(movie, locale)}`}
        >
          <div className="flex items-center gap-2 p-3 sm:p-4">
            <Dialog.Title className="flex-1 truncate text-sm font-bold sm:text-base">{movieTitle(movie, locale)}</Dialog.Title>
            <Dialog.Close asChild>
              <button className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06]" aria-label={t("close")}><X size={18} /></button>
            </Dialog.Close>
          </div>
          <div className="aspect-video w-full bg-black">
            {movie.trailerUrl ? (
              <video key={movie.id} className="h-full w-full" controls playsInline preload="metadata" poster={movie.backdrop} aria-label={movieTitle(movie, locale)}>
                <source src={movie.trailerUrl} type="video/mp4" />
              </video>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-electric to-luminous shadow-glow"><Play size={28} fill="currentColor" /></span>
                <p className="text-xs text-slate-400">{t("trailer.soon")}</p>
              </div>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
