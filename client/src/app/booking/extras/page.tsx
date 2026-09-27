"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { ArrowLeft, ShoppingBasket } from "lucide-react";
import type { RootState } from "@/store";
import { setExtra } from "@/store/bookingSlice";
import { useConcessions } from "@/hooks/useQueries";
import { PageContainer } from "@/components/common/layout";
import { ConcessionCard } from "@/components/booking/ConcessionCard";
import { BookingSteps } from "@/components/booking/BookingSteps";
import { Button } from "@/components/ui/button";
import { LoadingGrid } from "@/components/common/states";
import { formatCurrency, faDigits } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";

export default function ExtrasPage() {
  const { data, isLoading } = useConcessions();
  const { t, locale } = useI18n();
  const [cat, setCat] = useState("All");
  const booking = useSelector((s: RootState) => s.booking);
  const dispatch = useDispatch();
  const router = useRouter();
  const CATS = [
    { key: "All", label: t("cats.all") },
    { key: "Combos", label: t("cats.combos") },
    { key: "Gourmet Popcorn", label: t("cats.popcorn") },
    { key: "Craft Sodas", label: t("cats.sodas") },
    { key: "Nachos", label: t("cats.nachos") },
  ];
  const list = (data ?? []).filter((c) => cat === "All" || c.category === cat);
  const count = booking.extras.reduce((s, e) => s + e.quantity, 0);
  const countStr = locale === "fa" ? faDigits(count) : String(count);
  const total = booking.extras.reduce((s, e) => s + e.price * e.quantity, 0);

  return (
    <PageContainer>
      <div className="mx-auto max-w-xl py-4"><BookingSteps current={2} /></div>
      <div className="flex items-center gap-3">
        <Link href="/booking/seats" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10" aria-label={t("back")}><ArrowLeft size={18} className="rtl:rotate-180" /></Link>
        <div className="min-w-0">
          <h1 className="text-h3">{t("extras.title")}</h1>
          <p className="truncate text-xs text-slate-400">{t("ticket.seats")}: {booking.selectedSeats.join(" · ") || "—"}</p>
        </div>
        {count > 0 && (
          <span className="ms-auto flex shrink-0 items-center gap-1.5 rounded-full bg-electric/15 px-3 py-1.5 text-xs font-bold text-luminous">
            <ShoppingBasket size={14} /> {countStr} {t("extras.items")}
          </span>
        )}
      </div>

      <div className="sticky top-16 z-20 -mx-4 mt-4 bg-deep/90 px-4 py-2 backdrop-blur-md md:top-20">
        <div className="no-scrollbar flex gap-2 overflow-x-auto" role="group" aria-label={t("extras.title")}>
          {CATS.map((c) => (
            <button key={c.key} onClick={() => setCat(c.key)} aria-pressed={cat === c.key} className={`min-h-[40px] shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold border transition ${cat === c.key ? "border-electric bg-electric/20 text-white shadow-glow" : "border-white/10 bg-surface text-slate-400"}`}>{c.label}</button>
          ))}
        </div>
      </div>

      {isLoading && <div className="mt-4"><LoadingGrid /></div>}
      <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {list.map((item) => {
          const qty = booking.extras.find((e) => e.id === item.id)?.quantity ?? 0;
          return <ConcessionCard key={item.id} item={item} qty={qty} onChange={(q) => dispatch(setExtra({ id: item.id, name: locale === "fa" ? item.nameFa : item.name, price: item.price, quantity: q }))} />;
        })}
      </div>

      <div className="glass fixed inset-x-3 bottom-[84px] z-30 flex items-center gap-2 rounded-2xl border-white/10 p-3 sm:gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] text-slate-400 sm:text-xs">{countStr} {t("extras.items")}</p>
          <p className="truncate text-base font-extrabold sm:text-lg">{formatCurrency(total, locale)}</p>
        </div>
        <Button variant="ghost" onClick={() => router.push("/booking/checkout")} className="h-12 shrink-0">{t("extras.skip")}</Button>
        <Button onClick={() => router.push("/booking/checkout")} className="h-12 shrink-0 px-5">{t("extras.checkout")}</Button>
      </div>
      <div className="h-24" />
    </PageContainer>
  );
}
