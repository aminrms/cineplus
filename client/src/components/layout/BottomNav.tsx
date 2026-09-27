"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Building2, Film, Home, Ticket, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";

export function BottomNav() {
  const path = usePathname();
  const { t } = useI18n();
  const ITEMS = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/movies", label: t("nav.movies"), icon: Film },
    { href: "/cinemas", label: t("nav.cinemas"), icon: Building2 },
    { href: "/bookings", label: t("nav.tickets"), icon: Ticket },
    { href: "/profile", label: t("nav.profile"), icon: User },
  ];
  return (
    <nav className="glass fixed inset-x-3 bottom-3 z-40 rounded-2xl border border-white/10 md:hidden" aria-label="Mobile">
      <div className="grid grid-cols-5">
        {ITEMS.map((it) => {
          const active = path === it.href || (it.href !== "/" && path.startsWith(it.href));
          const Icon = it.icon;
          return (
            <Link key={it.href} href={it.href} className="flex min-h-[56px] flex-col items-center justify-center gap-1 py-2" aria-current={active ? "page" : undefined}>
              <Icon size={20} className={cn(active ? "text-luminous drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" : "text-slate-500")} />
              <span className={cn("text-[10px] font-semibold", active ? "text-white" : "text-slate-500")}>{it.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
