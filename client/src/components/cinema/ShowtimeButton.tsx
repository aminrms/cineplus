"use client";
import { cn } from "@/lib/utils";
import { formatTimeLabel } from "@/lib/formatters";
import type { Showtime } from "@/types";
import { useI18n } from "@/i18n/provider";
import { showFormat } from "@/i18n/helpers";

export function ShowtimeButton({ showtime, selected, onSelect }: { showtime: Showtime; selected?: boolean; onSelect?: () => void }) {
  const { t, locale } = useI18n();
  const disabled = showtime.status === "sold-out";
  const color = showtime.status === "available" ? "border-success/40 text-success" : showtime.status === "filling-fast" ? "border-warning/40 text-warning" : "border-white/10 text-slate-600";
  const statusLabel = showtime.status === "available" ? t("avail.available") : showtime.status === "filling-fast" ? t("avail.filling") : t("avail.soldout");
  return (
    <button
      disabled={disabled}
      onClick={onSelect}
      aria-label={`${formatTimeLabel(showtime.time, locale)}، ${statusLabel}`}
      className={cn(
        "flex min-h-[48px] min-w-[92px] flex-col items-center justify-center rounded-xl border px-3 py-2 text-sm font-semibold transition",
        color,
        selected ? "border-electric bg-electric/20 text-white shadow-glow" : "bg-surface hover:border-electric/50",
        disabled && "cursor-not-allowed bg-white/[0.02]"
      )}
    >
      <span>{formatTimeLabel(showtime.time, locale)}</span>
      <span className="text-[10px] font-medium tracking-wide opacity-80">{showFormat(showtime.format, locale)}</span>
    </button>
  );
}
