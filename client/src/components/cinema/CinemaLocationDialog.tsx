"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Building2, Check, MapPin, X } from "lucide-react";
import { useCinemas } from "@/hooks/useQueries";
import { useSelectedCinema } from "@/hooks/useSelectedCinema";
import { useI18n } from "@/i18n/provider";
import { cinemaAddress, cinemaName } from "@/i18n/helpers";
import { faDigits } from "@/lib/formatters";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedId?: string;
  onSelect: (id: string) => void;
};

export function CinemaLocationDialog({ open, onOpenChange, selectedId, onSelect }: Props) {
  const { data: cinemas, isLoading } = useCinemas();
  const { t, locale } = useI18n();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-label={t("location.choose")}
          className={cn(
            "fixed z-50 flex flex-col overflow-hidden bg-charcoal shadow-large",
            // Full screen on mobile, centered card on desktop
            "inset-0 h-full w-full sm:inset-auto sm:left-1/2 sm:top-1/2 sm:h-auto sm:max-h-[85vh] sm:w-[480px] sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-[24px] sm:border sm:border-white/10",
          )}
        >
          <div className="flex items-center gap-2 border-b border-white/[0.08] p-4">
            <MapPin size={18} className="shrink-0 text-luminous" />
            <div className="min-w-0 flex-1">
              <Dialog.Title className="text-h3">{t("location.title")}</Dialog.Title>
              <Dialog.Description className="truncate text-xs text-slate-500">{t("location.sub")}</Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <button
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/[0.06]"
                aria-label={t("close")}
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto p-3 sm:p-4">
            {isLoading && <p className="py-10 text-center text-sm text-slate-500">…</p>}
            <ul className="space-y-2">
              {cinemas?.map((c) => {
                const active = c.id === selectedId;
                const dist = locale === "fa" ? faDigits(c.distance.toFixed(1)) : c.distance.toFixed(1);
                return (
                  <li key={c.id}>
                    <button
                      onClick={() => {
                        onSelect(c.id);
                        onOpenChange(false);
                      }}
                      aria-pressed={active}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-2xl border p-3 text-start transition min-h-[64px]",
                        active
                          ? "border-electric bg-electric/15 shadow-glow"
                          : "border-white/[0.08] bg-surface hover:border-electric/40",
                      )}
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-luminous">
                        <Building2 size={20} />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-semibold">{cinemaName(c, locale)}</span>
                        <span className="mt-0.5 block truncate text-xs text-slate-400">
                          {dist} {t("cinemas.km")} · {cinemaAddress(c, locale)}
                        </span>
                      </span>
                      {active && (
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-electric text-white">
                          <Check size={15} />
                        </span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export function CinemaLocationButton({ className, showAddress = false }: { className?: string; showAddress?: boolean }) {
  const [open, setOpen] = useState(false);
  const { t, locale } = useI18n();
  const { selected, selectedId, setSelectedId } = useSelectedCinema();

  return (
    <>
      <button onClick={() => setOpen(true)} className={className} aria-label={t("location.choose")}>
        <MapPin size={16} className="shrink-0 text-luminous" />
        <span className="truncate">
          {selected ? cinemaName(selected, locale) : locale === "fa" ? "…" : "…"}
          {showAddress && selected ? ` · ${cinemaAddress(selected, locale)}` : ""}
        </span>
      </button>
      <CinemaLocationDialog open={open} onOpenChange={setOpen} selectedId={selectedId} onSelect={setSelectedId} />
    </>
  );
}
