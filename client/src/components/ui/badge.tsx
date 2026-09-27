"use client";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { useI18n } from "@/i18n/provider";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide", {
  variants: {
    variant: {
      default: "bg-electric/15 text-luminous border border-electric/30",
      vip: "bg-vip/15 text-vip border border-vip/30",
      success: "bg-success/15 text-success border border-success/30",
      warning: "bg-warning/15 text-warning border border-warning/30",
      muted: "bg-white/5 text-slate-400 border border-white/10",
      info: "bg-info/15 text-info border border-info/30",
    },
  },
  defaultVariants: { variant: "default" },
});
export function Badge({ className, variant, ...p }: HTMLAttributes<HTMLSpanElement> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ variant }), className)} {...p} />;
}
export function StatusBadge({ status }: { status: string }) {
  const { t } = useI18n();
  const map: Record<string, "success" | "warning" | "muted"> = { available: "success", "filling-fast": "warning", "sold-out": "muted" };
  const label: Record<string, string> = { available: t("avail.available"), "filling-fast": t("avail.filling"), "sold-out": t("avail.soldout") };
  return <Badge variant={map[status] ?? "muted"}>{label[status] ?? status}</Badge>;
}
