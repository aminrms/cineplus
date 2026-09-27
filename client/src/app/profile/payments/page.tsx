"use client";
import { useState } from "react";
import { CreditCard, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { SubPageShell } from "../_shell";

type SavedCard = { id: string; last4: string; bank: string; isDefault: boolean };

export default function PaymentsPage() {
  const { t, locale } = useI18n();
  const [cards, setCards] = useState<SavedCard[]>([
    { id: "1", last4: "4821", bank: locale === "fa" ? "بانک ملت" : "Mellat Bank", isDefault: true },
    { id: "2", last4: "9073", bank: locale === "fa" ? "بانک ملی" : "Melli Bank", isDefault: false },
  ]);
  const [num, setNum] = useState("");
  const add = () => {
    const digits = num.replace(/\D/g, "");
    if (digits.length < 16) { toast.error(t("auth.badPhone")); return; }
    setCards((c) => [...c, { id: String(Date.now()), last4: digits.slice(-4), bank: locale === "fa" ? "کارت جدید" : "New card", isDefault: false }]);
    setNum("");
    toast.success(t("pay.added"));
  };
  return (
    <SubPageShell title={t("pay.title")}>
      {cards.length === 0 && <p className="mb-3 text-sm text-slate-500">{t("pay.empty")}</p>}
      <div className="space-y-3">
        {cards.map((c) => (
          <Card key={c.id} className="flex items-center gap-3 p-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-luminous"><CreditCard size={20} /></span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold">{c.bank}</p>
              <p className="text-xs text-slate-500" dir="ltr">•••• •••• •••• {c.last4}</p>
            </div>
            {c.isDefault ? <Badge variant="vip">{t("pay.default")}</Badge> : (
              <button className="min-h-[44px] shrink-0 text-xs font-bold text-luminous" onClick={() => setCards((cs) => cs.map((x) => ({ ...x, isDefault: x.id === c.id })))}>
                {t("pay.setDefault")}
              </button>
            )}
            <button aria-label={t("pay.remove")} onClick={() => setCards((cs) => cs.filter((x) => x.id !== c.id))} className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-slate-500 hover:text-error">
              <Trash2 size={17} />
            </button>
          </Card>
        ))}
      </div>
      <Card className={cn("mt-4 p-4 sm:p-5")}>
        <p className="mb-2 text-sm font-bold">{t("pay.add")}</p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input value={num} onChange={(e) => setNum(e.target.value)} placeholder="6037 •••• •••• ••••" inputMode="numeric" dir="ltr" className="text-left" aria-label={t("checkout.cardNum")} />
          <Button onClick={add} className="shrink-0"><Plus size={16} /> {t("pay.add")}</Button>
        </div>
      </Card>
    </SubPageShell>
  );
}
