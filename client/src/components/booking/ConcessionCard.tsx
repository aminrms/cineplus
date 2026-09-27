"use client";
import Image from "next/image";
import { formatCurrency } from "@/lib/formatters";
import type { Concession } from "@/types";
import { QuantityStepper } from "./QuantityStepper";
import { Card } from "@/components/ui/card";
import { useI18n } from "@/i18n/provider";
import { concessionCat, concessionDesc, concessionName } from "@/i18n/helpers";

export function ConcessionCard({ item, qty, onChange }: { item: Concession; qty: number; onChange: (q: number) => void }) {
  const { locale } = useI18n();
  const name = concessionName(item, locale);
  return (
    <Card className="flex gap-3 overflow-hidden p-3 sm:block sm:p-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl sm:h-36 sm:w-full sm:rounded-none">
        <Image src={item.image} alt={name} fill className="object-cover" sizes="(max-width:640px) 96px, 33vw" loading="lazy" />
      </div>
      <div className="flex min-w-0 flex-1 flex-col p-0 sm:p-4">
        <span className="w-fit rounded-full bg-amber-400/10 px-2 py-0.5 text-[10px] font-bold text-amber-300">{concessionCat(item, locale)}</span>
        <div className="mt-1 flex items-start justify-between gap-2">
          <h3 className="truncate text-sm font-semibold">{name}</h3>
          <span className="shrink-0 whitespace-nowrap text-[13px] font-bold text-luminous">{formatCurrency(item.price, locale)}</span>
        </div>
        <p className="mt-0.5 line-clamp-2 text-[11px] leading-4 text-slate-400 sm:line-clamp-none sm:text-xs">{concessionDesc(item, locale)}</p>
        <div className="mt-auto flex justify-end pt-2"><QuantityStepper value={qty} onChange={onChange} label={name} /></div>
      </div>
    </Card>
  );
}
