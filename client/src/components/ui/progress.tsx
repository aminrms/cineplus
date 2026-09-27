"use client";
import * as Progress from "@radix-ui/react-progress";
export function LoyaltyProgress({ value, max }: { value: number; max: number }) {
  return (
    <Progress.Root className="h-2 w-full overflow-hidden rounded-full bg-white/10" value={(value / max) * 100} aria-label={`${value} of ${max} loyalty points`}>
      <Progress.Indicator className="h-full rounded-full bg-gradient-to-r from-electric to-luminous transition-all" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
    </Progress.Root>
  );
}
