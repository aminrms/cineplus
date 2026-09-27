"use client";
import Link from "next/link";
import { Calendar, Check, Download, MapPin, Share2 } from "lucide-react";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/formatters";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";

export function TicketCard({ movie, cinema, hall, date, time, seats, bookingId, total }: {
  movie: { title: string; poster: string };
  cinema: string; hall: string; date: string; time: string; seats: string[]; bookingId: string; total: number;
}) {
  const { t, locale } = useI18n();
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="overflow-hidden rounded-[24px] border border-white/10 bg-charcoal shadow-large">
        <div className="relative h-48 sm:h-52">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={movie.poster} alt={movie.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-luminous">{t("ticket.premium")}</p>
            <h2 className="text-h2">{movie.title}</h2>
          </div>
        </div>
        <div className="space-y-3 p-4 sm:p-5 text-sm">
          <div className="flex items-center gap-2 text-slate-300"><MapPin size={15} className="shrink-0 text-luminous" />{cinema} · {hall}</div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-300">
            <span className="flex items-center gap-1.5"><Calendar size={15} className="text-luminous" />{date}</span>
            <span>{time}</span>
          </div>
          <div className="rounded-2xl bg-electric/10 p-3 text-center text-sm font-extrabold tracking-widest sm:text-base">{t("ticket.seats")}: {seats.join(" • ")}</div>
          <div className="flex items-center justify-between gap-2 border-t border-dashed border-white/15 pt-3">
            <span className="text-xs text-slate-500">{t("ticket.bookingId")}: {bookingId}</span>
            <span className="whitespace-nowrap font-bold">{formatCurrency(total, locale)}</span>
          </div>
          <div className="flex justify-center py-2" aria-label={`Ticket QR for ${bookingId}`}>
            <svg width="120" height="120" viewBox="0 0 120 120" role="img" aria-label="Ticket QR code">
              <rect width="120" height="120" rx="12" fill="white" />
              {Array.from({ length: 64 }).map((_, i) => {
                const x = 14 + (i % 8) * 11.5; const y = 14 + Math.floor(i / 8) * 11.5;
                const on = (i * 7 + bookingId.length * 13) % 3 !== 0;
                return on ? <rect key={i} x={x} y={y} width="8" height="8" rx="1.5" fill="#0B0B10" /> : null;
              })}
            </svg>
          </div>
          <div className="flex h-10 items-end justify-center gap-[3px]" aria-hidden>
            {Array.from({ length: 48 }).map((_, i) => (
              <span key={i} className="bg-white/70" style={{ width: i % 3 === 0 ? 3 : 1.5, height: 28 + ((i * 7) % 12) }} />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Link href="/wallet"><Button variant="secondary" size="sm" className="w-full"><Download size={14} /> {t("ticket.wallet")}</Button></Link>
        <Button variant="secondary" size="sm" onClick={() => toast.success(t("ticket.shared"))}><Share2 size={14} /> {t("ticket.share")}</Button>
        <Button variant="secondary" size="sm" onClick={() => toast.success(t("ticket.added"))}><Calendar size={14} /> {t("ticket.calendar")}</Button>
      </div>
      <p className="mt-3 flex items-center justify-center gap-1 text-center text-xs text-success"><Check size={12} /> {t("success.confirmedNote")}</p>
    </div>
  );
}
