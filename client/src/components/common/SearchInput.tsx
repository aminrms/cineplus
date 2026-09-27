"use client";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/provider";
export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  const { t } = useI18n();
  return (
    <div className="relative w-full">
      <Search size={18} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-slate-500" />
      <Input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder ?? t("search.placeholder")} className="ps-11" aria-label={t("search.label")} role="searchbox" />
    </div>
  );
}
