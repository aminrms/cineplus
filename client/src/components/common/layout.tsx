import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
export function PageContainer({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8 pb-28 md:pb-16", className)}>{children}</div>;
}
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex items-end justify-between gap-4 py-6">
      <div><h1 className="text-h1">{title}</h1>{subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}</div>
      {action}
    </div>
  );
}
export function SectionHeader({ title, action, subtitle }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div><h2 className="text-h3">{title}</h2>{subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}</div>
      {action}
    </div>
  );
}
