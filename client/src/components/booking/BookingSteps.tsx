"use client";
import { Check, CreditCard, Armchair, Popcorn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

export function BookingSteps({ current }: { current: 1 | 2 | 3 }) {
  const { t } = useI18n();
  const steps = [
    { n: 1, label: t("steps.seats"), icon: Armchair },
    { n: 2, label: t("steps.extras"), icon: Popcorn },
    { n: 3, label: t("steps.pay"), icon: CreditCard },
  ];
  return (
    <ol className="flex items-center gap-1 sm:gap-2" aria-label="Booking progress">
      {steps.map((s, i) => {
        const done = s.n < current;
        const active = s.n === current;
        return (
          <li key={s.n} className="flex flex-1 items-center gap-1 sm:gap-2" aria-current={active ? "step" : undefined}>
            <span
              className={cn(
                "flex h-9 min-w-[36px] flex-1 items-center justify-center gap-1.5 rounded-full border px-2 text-xs font-bold transition sm:h-10 sm:px-4",
                done && "border-success/50 bg-success/10 text-success",
                active && "border-electric bg-electric/15 text-white shadow-glow",
                !done && !active && "border-white/10 text-slate-500"
              )}
            >
              {done ? <Check size={15} /> : <s.icon size={15} className="shrink-0" />}
              <span className="hidden sm:inline">{s.label}</span>
              <span className="sm:hidden">{s.n}</span>
            </span>
            {i < steps.length - 1 && <span className={cn("h-px w-2 shrink-0 sm:w-6", s.n < current ? "bg-success/50" : "bg-white/10")} aria-hidden />}
          </li>
        );
      })}
    </ol>
  );
}
