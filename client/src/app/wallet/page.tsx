"use client";
import { useMemo, useState } from "react";
import { ArrowDownLeft, ArrowUpRight, Plus, Wallet as WalletIcon } from "lucide-react";
import { toast } from "sonner";
import { PageContainer, PageHeader } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { Card, GlassCard } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BOOKINGS } from "@/data/mock";
import { MOVIES } from "@/data/mock";
import { formatCurrency } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { movieTitle } from "@/i18n/helpers";
import { cn } from "@/lib/utils";

type Tx = { id: string; kind: "topup" | "purchase"; labelFa: string; labelEn: string; amount: number; date: string };

const QUICK = [100000, 200000, 500000];

export default function WalletPage() {
  const { t, locale } = useI18n();
  const [balance, setBalance] = useState(250000);
  const [topups, setTopups] = useState<Tx[]>([]);

  const txs: Tx[] = useMemo(() => {
    const purchases: Tx[] = BOOKINGS.map((b) => {
      const m = MOVIES.find((x) => x.id === b.movieId);
      return {
        id: b.id, kind: "purchase",
        labelFa: m ? movieTitle(m, "fa") : b.id, labelEn: m ? movieTitle(m, "en") : b.id,
        amount: -b.total, date: b.createdAt,
      };
    });
    return [...topups, ...purchases];
  }, [topups]);

  const topUp = (amount: number) => {
    setBalance((b) => b + amount);
    setTopups((tx) => [{ id: `tx-${Date.now()}`, kind: "topup", labelFa: t("wallet.topup"), labelEn: "Wallet top-up", amount, date: new Date().toISOString().slice(0, 10) }, ...tx]);
    toast.success(t("wallet.topped"));
  };

  return (
    <PageContainer className="max-w-2xl">
      <PageHeader title={t("wallet.title")} subtitle={t("wallet.payHint")} />
      <GlassCard className="overflow-hidden p-5 sm:p-6">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <WalletIcon size={17} className="text-luminous" /> {t("wallet.balance")}
        </div>
        <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">{formatCurrency(balance, locale)}</p>
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold text-slate-400">{t("wallet.addFunds")}</p>
          <div className="grid grid-cols-3 gap-2">
            {QUICK.map((a) => (
              <Button key={a} variant="secondary" size="sm" className="min-h-[48px]" onClick={() => topUp(a)}>
                <Plus size={14} /> {formatCurrency(a, locale)}
              </Button>
            ))}
          </div>
        </div>
      </GlassCard>

      <h2 className="mb-3 mt-8 text-h3">{t("wallet.transactions")}</h2>
      {txs.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-white/10 p-8 text-center text-sm text-slate-500">{t("wallet.empty")}</p>
      ) : (
        <ul className="space-y-2">
          {txs.map((x) => (
            <li key={x.id}>
              <Card className="flex items-center gap-3 p-3 sm:p-4">
                <span className={cn("flex h-11 w-11 shrink-0 items-center justify-center rounded-xl", x.kind === "topup" ? "bg-success/15 text-success" : "bg-electric/15 text-luminous")}>
                  {x.kind === "topup" ? <ArrowDownLeft size={19} /> : <ArrowUpRight size={19} />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{x.kind === "topup" ? t("wallet.topup") : `${t("wallet.purchase")} · ${locale === "fa" ? x.labelFa : x.labelEn}`}</p>
                  <p className="mt-0.5 text-[11px] text-slate-500" dir="ltr">{x.date} · {x.id}</p>
                </div>
                <div className="shrink-0 text-end">
                  <p className={cn("text-sm font-bold", x.amount > 0 ? "text-success" : "text-slate-100")} dir={locale === "fa" ? "rtl" : "ltr"}>
                    {x.amount > 0 ? "+" : "−"}{formatCurrency(Math.abs(x.amount), locale)}
                  </p>
                  <Badge variant={x.kind === "topup" ? "success" : "muted"} className="mt-1">{x.kind === "topup" ? t("wallet.topup") : t("wallet.purchase")}</Badge>
                </div>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
