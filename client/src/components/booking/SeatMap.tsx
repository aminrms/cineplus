"use client";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { toggleSeat } from "@/store/bookingSlice";
import type { Seat as SeatType } from "@/types";
import { SeatButton, SeatLegend } from "./Seat";
import { useI18n } from "@/i18n/provider";
import { seatPrice } from "@/features/booking/utils";

const ROWS = ["A", "B", "C", "D", "E", "F", "G", "H"];
const COLS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function buildSeats(): SeatType[] {
  const seats: SeatType[] = [];
  for (const row of ROWS) {
    for (const n of COLS) {
      const id = `${row}${n}`;
      const sold = (row === "C" && [4, 5].includes(n)) || (row === "E" && n === 6) || (row === "G" && [2, 3].includes(n));
      seats.push({
        id, row, number: n,
        type: ["A", "B"].includes(row) ? "vip" : "standard",
        status: sold ? "sold" : "available",
        price: seatPrice(row),
      });
    }
  }
  return seats;
}

export function SeatMap() {
  const dispatch = useDispatch();
  const { t } = useI18n();
  const selected = useSelector((s: RootState) => s.booking.selectedSeats);
  const seats = useMemo(buildSeats, []);
  return (
    <div>
      <div className="mb-8 text-center" aria-hidden>
        <div className="mx-auto h-1.5 w-3/4 rounded-full bg-gradient-to-r from-transparent via-luminous to-transparent shadow-glow" />
        <p className="mt-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">{t("seats.screen")}</p>
      </div>
      <div className="overflow-x-auto pb-2">
        <div className="mx-auto flex min-w-[560px] max-w-[640px] flex-col gap-2" role="group" aria-label="Seat map">
          {ROWS.map((row) => (
            <div key={row} className="flex items-center justify-center gap-1.5">
              <span className="w-6 text-xs font-bold text-slate-500">{row}</span>
              {COLS.map((n) => {
                const seat = seats.find((s) => s.row === row && s.number === n)!;
                const gap = n === 5 ? "ml-5" : "";
                return (
                  <span key={n} className={gap}>
                    <SeatButton seat={seat} selected={selected.includes(seat.id)} onToggle={() => dispatch(toggleSeat(seat.id))} />
                  </span>
                );
              })}
              <span className="w-6 text-xs font-bold text-slate-500">{row}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6"><SeatLegend /></div>
    </div>
  );
}
