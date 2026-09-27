"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { SubPageShell } from "../_shell";

export default function NotificationsPage() {
  const { t } = useI18n();
  const [vals, setVals] = useState({ booking: true, offers: true, movies: false });
  const rows = [
    { key: "booking" as const, title: t("notif.booking"), sub: t("notif.bookingSub") },
    { key: "offers" as const, title: t("notif.offers"), sub: t("notif.offersSub") },
    { key: "movies" as const, title: t("notif.movies"), sub: t("notif.moviesSub") },
  ];
  return (
    <SubPageShell title={t("notif.title")}>
      <Card className="divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-3 p-4">
            <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{r.title}</p><p className="mt-0.5 text-xs text-slate-500">{r.sub}</p></div>
            <button
              role="switch" aria-checked={vals[r.key]} aria-label={r.title}
              onClick={() => setVals((v) => ({ ...v, [r.key]: !v[r.key] }))}
              className={cn("relative h-8 w-14 shrink-0 rounded-full transition-colors", vals[r.key] ? "bg-gradient-to-br from-electric to-luminous" : "bg-white/10")}
            >
              <span className={cn("absolute top-1 h-6 w-6 rounded-full bg-white transition-all", vals[r.key] ? "start-7" : "start-1")} />
            </button>
          </div>
        ))}
      </Card>
      <Button className="mt-4 w-full sm:w-auto" onClick={() => toast.success(t("notif.saved"))}>{t("save")}</Button>
    </SubPageShell>
  );
}
