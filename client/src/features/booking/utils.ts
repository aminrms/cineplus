import { BOOKING_FEE, PROMO_CODES, TICKET_PRICE_STANDARD, TICKET_PRICE_VIP } from "@/lib/constants";
import type { BookingExtra } from "@/types";

export function seatPrice(row: string): number {
  if (["A", "B"].includes(row)) return TICKET_PRICE_VIP;
  return TICKET_PRICE_STANDARD;
}
export function ticketSubtotalForSeats(seatIds: string[]): number {
  return seatIds.reduce((s, id) => s + seatPrice(id.charAt(0)), 0);
}
export function calculateTicketSubtotal(seatCount: number, pricePerSeat = TICKET_PRICE_STANDARD): number {
  return seatCount * pricePerSeat;
}
export function calculateExtrasSubtotal(extras: BookingExtra[]): number {
  return extras.reduce((s, e) => s + e.price * e.quantity, 0);
}
export function calculateBookingFee(): number { return BOOKING_FEE; }
export function calculateDiscount(subtotal: number, promoCode?: string): number {
  if (!promoCode) return 0;
  const rate = PROMO_CODES[promoCode.toUpperCase()] ?? 0;
  return Math.round(subtotal * rate);
}
export function calculateGrandTotal(ticket: number, extras: number, fee: number, discount: number): number {
  return Math.round(ticket + extras + fee - discount);
}
