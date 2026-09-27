"use client";
import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, Star, X } from "lucide-react";
import { MOVIES } from "@/data/mock";
import { useI18n } from "@/i18n/provider";
import { movieGenres, movieTitle } from "@/i18n/helpers";
import { cn } from "@/lib/utils";

export function GlobalSearch({ variant }: { variant: "bar" | "icon" | "home" }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const router = useRouter();

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (s.length < 1) return [];
    return MOVIES.filter(
      (m) =>
        m.title.toLowerCase().includes(s) ||
        m.titleFa.includes(q.trim()) ||
        m.director.toLowerCase().includes(s) ||
        m.genres.join(" ").toLowerCase().includes(s) ||
        m.genresFa.join(" ").includes(q.trim())
    ).slice(0, 6);
  }, [q]);

  const goAll = () => {
    setOpen(false);
    router.push(`/movies?search=${encodeURIComponent(q)}`);
  };

  return (
    <Dialog.Root open={open} onOpenChange={(o) => { setOpen(o); if (!o) setQ(""); }}>
      <Dialog.Trigger asChild>
        {variant === "icon" ? (
          <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]" aria-label={t("search.label")}>
            <Search size={18} />
          </button>
        ) : (
          <button
            className={cn(
              "flex h-11 w-full items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 text-sm text-slate-500 transition hover:border-electric/40",
              variant === "bar" && "h-10 rounded-full"
            )}
            aria-label={t("search.label")}
          >
            <Search size={variant === "bar" ? 16 : 18} />
            <span className="truncate">{t("search.placeholder")}</span>
          </button>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-label={t("search.title")}
          className="fixed z-50 flex flex-col overflow-hidden border-white/10 bg-charcoal shadow-large inset-0 border-0 sm:inset-x-auto sm:bottom-auto sm:left-1/2 sm:top-[8vh] sm:h-auto sm:max-h-[80vh] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:rounded-[24px] sm:border"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.08] p-3 sm:p-4">
            <button onClick={() => setOpen(false)} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/5 sm:hidden" aria-label={t("back")}>
              <ArrowLeft size={19} className="rtl:rotate-180" />
            </button>
            <div className="relative flex-1">
              <Search size={17} className="pointer-events-none absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && q.trim()) goAll(); }}
                placeholder={t("search.hint")}
                className="h-12 w-full rounded-2xl border border-white/10 bg-surface pe-10 ps-10 text-sm focus:border-luminous focus:outline-none"
                aria-label={t("search.label")}
                role="searchbox"
              />
              {q && (
                <button onClick={() => setQ("")} className="absolute end-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full text-slate-500" aria-label={t("close")}>
                  <X size={16} />
                </button>
              )}
            </div>
            <button onClick={() => setOpen(false)} className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full hover:bg-white/5 sm:flex" aria-label={t("close")}>
              <X size={19} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 sm:max-h-[60vh]">
            {q.trim().length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">{t("search.hint")}</p>
            ) : results.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-sm font-semibold">{t("movies.noResult")}</p>
                <p className="mt-1 text-xs text-slate-500">{t("movies.noResultSub")}</p>
              </div>
            ) : (
              <>
                <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wider text-slate-500">{t("search.results")}</p>
                <ul className="space-y-1.5">
                  {results.map((m) => (
                    <li key={m.id}>
                      <Link href={`/movies/${m.id}`} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-2xl border border-transparent p-2 transition hover:border-electric/40 hover:bg-white/[0.03]">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={m.poster} alt="" className="h-14 w-10 shrink-0 rounded-lg object-cover" loading="lazy" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-semibold">{movieTitle(m, locale)}</span>
                          <span className="mt-0.5 block truncate text-[11px] text-slate-500">{movieGenres(m, locale).join(" · ")}</span>
                        </span>
                        <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-amber-400"><Star size={12} fill="currentColor" />{m.rating.toFixed(1)}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <button onClick={goAll} className="mt-2 flex min-h-[48px] w-full items-center justify-center rounded-2xl text-sm font-bold text-luminous hover:bg-electric/10">
                  {t("search.viewAll")}
                </button>
              </>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
