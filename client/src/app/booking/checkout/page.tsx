"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft, CreditCard, Lock, Wallet } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { resetBooking } from "@/store/bookingSlice";
import { PageContainer } from "@/components/common/layout";
import { PromoCodeInput } from "@/components/booking/PromoCodeInput";
import { PaymentMethodSelector } from "@/components/booking/PaymentMethodSelector";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { BookingSummaryRows, useBookingTotals } from "@/components/booking/BookingSummary";
import { Button } from "@/components/ui/button";
import { Card, GlassCard } from "@/components/ui/card";
import { MOVIES, CINEMAS, SHOWTIMES } from "@/data/mock";
import { bookingsApi } from "@/lib/api";
import { formatCurrency, formatDateLong, formatTimeLabel } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";
import { cinemaName, hallName, movieTitle } from "@/i18n/helpers";

export default function CheckoutPage() {
  const booking = useSelector((s: RootState) => s.booking);
  const dispatch = useDispatch();
  const router = useRouter();
  const { t, locale } = useI18n();
  const [paying, setPaying] = useState(false);
  const { ticket, extras, fee, discount, total } = useBookingTotals(booking);
  const method = booking.paymentMethod ?? "card";
  const movie = MOVIES.find((m) => m.id === booking.movieId) ?? MOVIES[0];
  const cinema = CINEMAS.find((c) => c.id === booking.cinemaId) ?? CINEMAS[0];
  const st = SHOWTIMES.find((s) => s.id === booking.showtimeId);
  const when = st ? `${formatDateLong(st.date, locale)} · ${formatTimeLabel(st.time, locale)} · ${hallName(st.hall, locale)}` : "";

  const pay = async () => {
    if (booking.selectedSeats.length === 0) { toast.error(t("checkout.pickSeatsFirst")); router.push("/booking/seats"); return; }
    setPaying(true);
    try {
      const created = await bookingsApi.createBooking({
        movieId: movie.id, cinemaId: cinema.id, showtimeId: st?.id ?? "demo",
        seatIds: booking.selectedSeats, extras: booking.extras,
        subtotal: ticket + extras, discount, bookingFee: fee, total, status: "active",
      });
      sessionStorage.setItem("last-booking", JSON.stringify({ ...created, total }));
      toast.success(t("checkout.confirmed"));
      dispatch(resetBooking());
      router.push(`/booking/success?id=${created.id}`);
    } catch {
      toast.error(t("checkout.payFailed"));
    } finally { setPaying(false); }
  };

  return (
    <PageContainer>
      <div className="mx-auto max-w-xl py-4"><BookingSteps current={3} /></div>
      <div className="flex items-center gap-3 py-1">
        <Link href="/booking/extras" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10" aria-label={t("back")}><ArrowLeft size={18} className="rtl:rotate-180" /></Link>
        <h1 className="text-h3">{t("checkout.title")}</h1>
      </div>
      <div className="grid gap-4 sm:gap-5 lg:grid-cols-[1fr_360px]">
        <div className="min-w-0 space-y-4">
          <Card className="p-4 sm:p-5">
            <h2 className="font-bold">{t("checkout.booking")}</h2>
            <p className="mt-2 text-sm font-semibold">{movieTitle(movie, locale)}</p>
            <p className="text-xs text-slate-400">{cinemaName(cinema, locale)}{when ? ` · ${when}` : ""}</p>
            <p className="mt-1 text-xs font-bold text-luminous">{t("ticket.seats")}: {booking.selectedSeats.join(" · ") || "—"}</p>
            {booking.extras.length > 0 && <p className="mt-1 text-xs text-slate-400">{t("checkout.extrasLabel")}: {booking.extras.map((e) => `${e.name} × ${e.quantity}`).join(locale === "fa" ? "، " : ", ")}</p>}
          </Card>
          <Card className="p-4 sm:p-5"><PromoCodeInput /><p className="mt-2 text-[11px] text-slate-500">{t("checkout.promoTry")}</p></Card>
          <Card className="p-4 sm:p-5">
            <h2 className="mb-3 font-bold">{t("checkout.payment")}</h2>
            <PaymentMethodSelector />
            {method === "card" ? (
              <p className="mt-4 flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs leading-5 text-slate-300">
                <CreditCard size={15} className="mt-0.5 shrink-0 text-luminous" />
                {t("checkout.cardHint")}
              </p>
            ) : (
              <p className="mt-4 flex items-start gap-2 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3 text-xs leading-5 text-slate-300">
                <Wallet size={15} className="mt-0.5 shrink-0 text-luminous" />
                {t("checkout.walletHint")}
              </p>
            )}
            <p className="mt-3 flex items-center gap-1.5 text-xs text-slate-400"><Lock size={13} className="shrink-0 text-success" /> {t("checkout.secure")}</p>
          </Card>
        </div>
        <aside className="min-w-0">
          <GlassCard className="p-4 sm:p-5 lg:sticky lg:top-24">
            <h2 className="mb-3 font-bold">{t("checkout.summary")}</h2>
            <BookingSummaryRows ticket={ticket} extras={extras} fee={fee} discount={discount} total={total} />
            <Button size="lg" className="mt-5 w-full" loading={paying} onClick={pay}>
              {paying ? t("checkout.processing") : `${t("checkout.pay")} ${formatCurrency(total, locale)}`}
            </Button>
          </GlassCard>
        </aside>
      </div>
      <div className="h-6" />
    </PageContainer>
  );
}
