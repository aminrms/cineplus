"use client";
import { formatCurrency } from "@/lib/formatters";
import { calculateBookingFee, calculateDiscount, calculateExtrasSubtotal, calculateGrandTotal, ticketSubtotalForSeats } from "@/features/booking/utils";
import type { BookingState } from "@/types";
import { useI18n } from "@/i18n/provider";

export function useBookingTotals(booking: BookingState) {
  const ticket = ticketSubtotalForSeats(booking.selectedSeats);
  const extras = calculateExtrasSubtotal(booking.extras);
  const fee = calculateBookingFee();
  const discount = calculateDiscount(ticket + extras, booking.promoCode);
  const total = calculateGrandTotal(ticket, extras, fee, discount);
  return { ticket, extras, fee, discount, total };
}

export function BookingSummaryRows({ ticket, extras, fee, discount, total }: { ticket: number; extras: number; fee: number; discount: number; total: number }) {
  const { t, locale } = useI18n();
  const rows: [string, string][] = [
    [t("checkout.tickets"), formatCurrency(ticket, locale)],
    [t("checkout.concessions"), formatCurrency(extras, locale)],
    [t("checkout.fee"), formatCurrency(fee, locale)],
  ];
  return (
    <dl className="space-y-2 text-sm">
      {rows.map(([k, v]) => (
        <div key={k} className="flex justify-between text-slate-300"><dt>{k}</dt><dd className="font-semibold">{v}</dd></div>
      ))}
      {discount > 0 && (
        <div className="flex justify-between text-success"><dt>{t("checkout.discount")}</dt><dd className="font-semibold">-{formatCurrency(discount, locale)}</dd></div>
      )}
      <div className="flex justify-between border-t border-white/10 pt-3 text-base font-bold"><dt>{t("checkout.total")}</dt><dd>{formatCurrency(total, locale)}</dd></div>
    </dl>
  );
}
