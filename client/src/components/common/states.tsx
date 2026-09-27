"use client";
import { Search, Ticket } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";

export function EmptyState({ title, message, actionLabel, actionHref }: { title: string; message: string; actionLabel?: string; actionHref?: string }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[20px] border border-dashed border-white/10 bg-surface px-6 py-16 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-electric/15 text-luminous"><Ticket size={24} /></div>
      <h3 className="text-h3">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-slate-400">{message}</p>
      {actionLabel && actionHref && <Link href={actionHref} className="mt-6"><Button>{actionLabel}</Button></Link>}
    </div>
  );
}
export function ErrorState({ message, onRetry }: { message?: string; onRetry?: () => void }) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center rounded-[20px] border border-white/10 bg-surface px-6 py-14 text-center">
      <h3 className="text-h3">{t("err.title")}</h3>
      <p className="mt-2 text-sm text-slate-400">{message ?? t("err.sub")}</p>
      {onRetry && <Button variant="secondary" className="mt-5" onClick={onRetry}>{t("retry")}</Button>}
    </div>
  );
}
export function LoadingGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5" aria-busy>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="animate-pulse"><div className="aspect-[2/3] rounded-[20px] bg-white/[0.06]" /><div className="mt-3 h-4 rounded bg-white/[0.06]" /><div className="mt-2 h-3 w-2/3 rounded bg-white/[0.06]" /></div>
      ))}
    </div>
  );
}
export function SearchEmpty() {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <Search size={28} className="text-slate-600" />
      <h3 className="mt-3 text-h3">{t("movies.noResult")}</h3>
      <p className="mt-1 text-sm text-slate-400">{t("movies.noResultSub")}</p>
    </div>
  );
}
