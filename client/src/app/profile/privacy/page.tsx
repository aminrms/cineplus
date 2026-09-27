"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { SubPageShell } from "../_shell";

export default function PrivacyPage() {
  const { t } = useI18n();
  const [vals, setVals] = useState({ profile: false, history: true, ads: false });
  const rows = [
    { key: "profile" as const, label: t("privacy.profile") },
    { key: "history" as const, label: t("privacy.history") },
    { key: "ads" as const, label: t("privacy.ads") },
  ];
  return (
    <SubPageShell title={t("privacy.title")}>
      <Card className="divide-y divide-white/[0.06]">
        {rows.map((r) => (
          <div key={r.key} className="flex items-center gap-3 p-4">
            <p className="flex-1 text-sm font-semibold">{r.label}</p>
            <button
              role="switch" aria-checked={vals[r.key]} aria-label={r.label}
              onClick={() => setVals((v) => ({ ...v, [r.key]: !v[r.key] }))}
              className={cn("relative h-8 w-14 shrink-0 rounded-full transition-colors", vals[r.key] ? "bg-gradient-to-br from-electric to-luminous" : "bg-white/10")}
            >
              <span className={cn("absolute top-1 h-6 w-6 rounded-full bg-white transition-all", vals[r.key] ? "start-7" : "start-1")} />
            </button>
          </div>
        ))}
      </Card>
      <p className="mt-3 flex items-start gap-1.5 text-xs leading-5 text-slate-500"><Lock size={13} className="mt-0.5 shrink-0 text-success" />{t("privacy.note")}</p>
      <Button className="mt-4 w-full sm:w-auto" onClick={() => toast.success(t("privacy.saved"))}>{t("save")}</Button>
    </SubPageShell>
  );
}
