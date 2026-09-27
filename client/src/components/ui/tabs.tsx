"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
export function SimpleTabs({ tabs, defaultValue, onChange }: { tabs: { value: string; label: string }[]; defaultValue: string; onChange?: (v: string) => void }) {
  return (
    <Tabs.Root defaultValue={defaultValue} onValueChange={onChange} className="w-full">
      <Tabs.List className="flex gap-2 rounded-full border border-white/10 bg-surface p-1.5 w-fit" role="tablist" aria-label="Filter tabs">
        {tabs.map((t) => (
          <Tabs.Trigger key={t.value} value={t.value} className={cn("rounded-full px-5 py-2 text-sm font-semibold text-slate-400 transition-all data-[state=active]:bg-gradient-to-br data-[state=active]:from-electric data-[state=active]:to-luminous data-[state=active]:text-white data-[state=active]:shadow-glow")}>
            {t.label}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
    </Tabs.Root>
  );
}
