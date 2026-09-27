"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Timer } from "lucide-react";
import { toast } from "sonner";
import type { RootState } from "@/store";
import { clearSeats } from "@/store/bookingSlice";
import { SEAT_HOLD_SECONDS } from "@/lib/constants";
import { formatCountdown } from "@/lib/formatters";
import { useI18n } from "@/i18n/provider";

export function SeatHoldTimer() {
  const selected = useSelector((s: RootState) => s.booking.selectedSeats);
  const dispatch = useDispatch();
  const { t, locale } = useI18n();
  const [secs, setSecs] = useState(SEAT_HOLD_SECONDS);
  useEffect(() => { if (selected.length > 0) setSecs(SEAT_HOLD_SECONDS); }, [selected.length]);
  useEffect(() => {
    if (selected.length === 0) return;
    if (secs <= 0) {
      dispatch(clearSeats());
      toast.warning(t("seats.holdExpired"));
      return;
    }
    const timer = setTimeout(() => setSecs((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [secs, selected.length, dispatch, t]);
  if (selected.length === 0) return null;
  return (
    <div className="glass flex items-center justify-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-amber-300 sm:text-sm" role="timer" aria-live="polite">
      <Timer size={16} className="shrink-0" /> {t("seats.locked")} {formatCountdown(secs, locale)}
    </div>
  );
}
