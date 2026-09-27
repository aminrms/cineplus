"use client";
import { CreditCard, Wallet } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { setPayment } from "@/store/bookingSlice";
import type { PaymentMethod } from "@/types";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

export function PaymentMethodSelector() {
  const val = useSelector((s: RootState) => s.booking.paymentMethod ?? "card");
  const dispatch = useDispatch();
  const { t } = useI18n();
  const METHODS: { id: PaymentMethod; label: string; icon: typeof CreditCard }[] = [
    { id: "card", label: t("pay.card"), icon: CreditCard },
    { id: "wallet", label: t("pay.wallet"), icon: Wallet },
  ];
  return (
    <div className="grid grid-cols-2 gap-2" role="radiogroup" aria-label={t("checkout.payment")}>
      {METHODS.map((m) => {
        const Icon = m.icon;
        const active = val === m.id;
        return (
          <button key={m.id} role="radio" aria-checked={active} onClick={() => dispatch(setPayment(m.id))}
            className={cn("flex min-h-[68px] flex-col items-center justify-center gap-1 rounded-2xl border p-2 text-center text-xs font-semibold transition", active ? "border-electric bg-electric/15 text-white shadow-glow" : "border-white/10 bg-surface text-slate-400 hover:border-electric/40")}>
            <Icon size={20} />{m.label}
          </button>
        );
      })}
    </div>
  );
}
