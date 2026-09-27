"use client";
import { cn } from "@/lib/utils";
import type { Seat } from "@/types";
import { seatPrice } from "@/features/booking/utils";
import { TICKET_PRICE_STANDARD, TICKET_PRICE_VIP } from "@/lib/constants";
import { formatCurrency } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";

export function SeatButton({ seat, selected, onToggle }: { seat: Seat; selected: boolean; onToggle: () => void }) {
  const { t, locale } = useI18n();
  const sold = seat.status === "sold";
  const disabled = seat.status === "disabled";
  const vip = seat.type === "vip";
  const stateLabel = sold ? t("seat.sold") : selected ? t("seat.selected") : t("seat.available");
  const label = `${t("ticket.seats")} ${seat.id}، ${stateLabel}، ${formatCurrency(seatPrice(seat.row), locale)}`;
  return (
    <button
      onClick={onToggle} disabled={sold || disabled} aria-label={label} aria-pressed={selected}
      title={label}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-t-[10px] rounded-b-[4px] border text-[11px] font-bold transition-all hover:scale-110 focus-visible:ring-2 focus-visible:ring-luminous sm:h-8 sm:w-8 sm:text-[10px]",
        sold && "cursor-not-allowed border-white/5 bg-white/[0.04] text-slate-700",
        disabled && "cursor-not-allowed opacity-20",
        !sold && !disabled && !selected && !vip && "border-white/20 bg-transparent text-slate-500 hover:border-luminous",
        !sold && !disabled && !selected && vip && "border-vip/50 bg-vip/10 text-vip",
        selected && "border-electric bg-gradient-to-br from-electric to-luminous text-white shadow-seat"
      )}
    >
      {!sold && seat.number}
    </button>
  );
}

export function SeatLegend() {
  const { t, locale } = useI18n();
  const items = [
    { label: `${t("legend.available")} · ${formatCurrency(TICKET_PRICE_STANDARD, locale)}`, cls: "border-white/20" },
    { label: `${t("legend.vip")} · ${formatCurrency(TICKET_PRICE_VIP, locale)}`, cls: "border-vip/50 bg-vip/10" },
    { label: t("legend.selected"), cls: "border-electric bg-gradient-to-br from-electric to-luminous" },
    { label: t("legend.sold"), cls: "border-white/5 bg-white/[0.04]" },
  ];
  return (
    <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 sm:gap-4">
      {items.map((i) => (
        <span key={i.label} className="flex items-center gap-1.5"><span className={cn("h-4 w-4 rounded-t-md rounded-b-sm border", i.cls)} />{i.label}</span>
      ))}
    </div>
  );
}
