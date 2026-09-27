"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CINEMAS, MOVIES } from "@/data/mock";
import { useI18n } from "@/i18n/provider";
import { cinemaName, movieGenres } from "@/i18n/helpers";
import { SubPageShell } from "../_shell";

export default function PreferencesPage() {
  const { t, locale, setLocale } = useI18n();
  const allGenres = [...new Set(MOVIES.flatMap((m) => movieGenres(m, locale)))];
  const [genres, setGenres] = useState<string[]>([allGenres[0], allGenres[1]].filter(Boolean));
  const [cinema, setCinema] = useState(CINEMAS[0].id);
  return (
    <SubPageShell title={t("pref.title")}>
      <Card className="p-4 sm:p-5">
        <p className="mb-2 text-sm font-bold">{t("pref.lang")}</p>
        <div className="grid grid-cols-2 gap-2">
          {(["fa", "en"] as const).map((l) => (
            <button key={l} onClick={() => setLocale(l)} className={cn("min-h-[48px] rounded-2xl border text-sm font-bold transition", locale === l ? "border-electric bg-electric/15 text-white" : "border-white/10 text-slate-400")}>
              {l === "fa" ? t("pref.fa") : t("pref.en")}
            </button>
          ))}
        </div>
      </Card>
      <Card className="mt-3 p-4 sm:p-5">
        <p className="mb-2 text-sm font-bold">{t("pref.genres")}</p>
        <div className="flex flex-wrap gap-2">
          {allGenres.map((g) => {
            const on = genres.includes(g);
            return (
              <button key={g} onClick={() => setGenres((gs) => (on ? gs.filter((x) => x !== g) : [...gs, g]))} aria-pressed={on} className={cn("min-h-[40px] rounded-full border px-4 text-xs font-semibold transition", on ? "border-electric bg-electric/20 text-white" : "border-white/10 text-slate-400")}>{g}</button>
            );
          })}
        </div>
      </Card>
      <Card className="mt-3 p-4 sm:p-5">
        <p className="mb-2 text-sm font-bold">{t("pref.cinema")}</p>
        <div className="space-y-2">
          {CINEMAS.map((c) => (
            <button key={c.id} onClick={() => setCinema(c.id)} aria-pressed={cinema === c.id} className={cn("flex min-h-[52px] w-full items-center gap-2 rounded-2xl border p-3 text-sm font-semibold transition", cinema === c.id ? "border-electric bg-electric/10 text-white" : "border-white/10 text-slate-400")}>
              <span className={cn("flex h-5 w-5 items-center justify-center rounded-full border", cinema === c.id ? "border-luminous" : "border-white/20")}>
                {cinema === c.id && <span className="h-2.5 w-2.5 rounded-full bg-luminous" />}
              </span>
              {cinemaName(c, locale)}
            </button>
          ))}
        </div>
      </Card>
      <Button className="mt-4 w-full sm:w-auto" onClick={() => toast.success(t("pref.saved"))}>{t("save")}</Button>
    </SubPageShell>
  );
}
