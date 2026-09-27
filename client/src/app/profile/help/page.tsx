"use client";
import { useState } from "react";
import { ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SUPPORT_PHONE, SUPPORT_PHONE_EN } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { SubPageShell } from "../_shell";

export default function HelpPage() {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  const faqs = [
    { q: t("help.q1"), a: t("help.a1") },
    { q: t("help.q2"), a: t("help.a2") },
    { q: t("help.q3"), a: t("help.a3") },
    { q: t("help.q4"), a: t("help.a4") },
  ];
  return (
    <SubPageShell title={t("help.title")}>
      <p className="mb-2 text-sm font-bold">{t("help.faq")}</p>
      <div className="space-y-2">
        {faqs.map((f, i) => (
          <Card key={i} className="overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i} className="flex min-h-[56px] w-full items-center gap-2 p-4 text-start text-sm font-semibold">
              <span className="flex-1">{f.q}</span>
              <ChevronDown size={17} className={cn("shrink-0 text-luminous transition-transform", open === i && "rotate-180")} />
            </button>
            {open === i && <p className="border-t border-white/[0.06] p-4 text-sm leading-6 text-slate-400">{f.a}</p>}
          </Card>
        ))}
      </div>
      <Card className="mt-4 flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:p-5">
        <div className="flex-1">
          <p className="text-sm font-bold">{t("help.contact")}</p>
          <p className="mt-0.5 text-xs text-slate-500">{t("help.call")}: <span dir="ltr">{locale === "fa" ? SUPPORT_PHONE : SUPPORT_PHONE_EN}</span></p>
        </div>
        <Button variant="secondary" className="w-full sm:w-auto"><Phone size={15} /> {t("help.call")}</Button>
      </Card>
    </SubPageShell>
  );
}
