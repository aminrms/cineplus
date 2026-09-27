"use client";
import { Minus, Plus } from "lucide-react";
export function QuantityStepper({ value, onChange, label }: { value: number; onChange: (v: number) => void; label: string }) {
  return (
    <div className="flex items-center gap-3" role="group" aria-label={label}>
      <button onClick={() => onChange(Math.max(0, value - 1))} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 hover:border-electric" aria-label={`Decrease ${label}`}><Minus size={16} /></button>
      <span className="w-6 text-center font-bold" aria-live="polite">{value}</span>
      <button onClick={() => onChange(value + 1)} className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-electric to-luminous" aria-label={`Increase ${label}`}><Plus size={16} /></button>
    </div>
  );
}
