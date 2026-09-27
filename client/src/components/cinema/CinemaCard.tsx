"use client";
import Link from "next/link";
import { Building2, MapPin, Navigation } from "lucide-react";
import type { Cinema } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/provider";
import { cinemaAddress, cinemaFacilities, cinemaName } from "@/i18n/helpers";
import { faDigits } from "@/lib/formatters";

export function CinemaCard({ cinema }: { cinema: Cinema }) {
  const { t, locale } = useI18n();
  const dist = locale === "fa" ? faDigits(cinema.distance.toFixed(1)) : cinema.distance.toFixed(1);
  return (
    <Card className="p-4 sm:p-5">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-luminous"><Building2 size={20} /></div>
        <div className="min-w-0">
          <h3 className="font-semibold">{cinemaName(cinema, locale)}</h3>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-slate-400"><MapPin size={12} className="shrink-0" />{dist} {t("cinemas.km")} · {cinemaAddress(cinema, locale)}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {cinemaFacilities(cinema, locale).map((f) => <Badge key={f} variant={f === "آیمکس" || f === "IMAX" ? "default" : "muted"}>{f}</Badge>)}
      </div>
      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <Link href={`/showtimes?cinema=${cinema.id}`} className="flex-1"><Button className="w-full" size="sm">{t("cinemas.showtimes")}</Button></Link>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${cinema.name} ${cinema.address}`)}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button variant="outline" size="sm" className="w-full sm:w-auto"><Navigation size={14} /> {t("cinemas.directions")}</Button>
        </a>
      </div>
    </Card>
  );
}
