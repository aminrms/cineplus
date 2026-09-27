import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
export function Card({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("rounded-[20px] border border-white/[0.08] bg-charcoal shadow-DEFAULT", className)} {...p} />;
}
export function GlassCard({ className, ...p }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("glass rounded-[20px] shadow-DEFAULT", className)} {...p} />;
}
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-xl bg-white/[0.06]", className)} aria-hidden />;
}
