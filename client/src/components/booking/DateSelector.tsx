"use client";
import { cn } from "@/lib/utils";
import { formatDayNum, formatWeekdayShort } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";

export function DateSelector({ dates, value, onChange }: { dates: string[]; value?: string; onChange: (d: string) => void }) {
  const { t, locale } = useI18n();
  return (
    <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label={t("details.pickDate")}>
      {dates.map((d) => {
        const active = d === value;
        return (
          <button
            key={d} role="tab" aria-selected={active} onClick={() => onChange(d)}
            className={cn(
              "flex min-h-[68px] min-w-[68px] shrink-0 flex-col items-center justify-center rounded-2xl border px-3 py-2 transition",
              active ? "border-electric bg-gradient-to-br from-electric to-luminous text-white shadow-glow" : "border-white/10 bg-surface text-slate-300 hover:border-electric/40"
            )}
          >
            <span className="text-[11px] font-medium">{formatWeekdayShort(d, locale)}</span>
            <span className="text-lg font-bold">{formatDayNum(d, locale)}</span>
          </button>
        );
      })}
    </div>
  );
}
