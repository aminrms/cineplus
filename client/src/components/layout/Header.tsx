"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Clapperboard, Languages, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/provider";
import { appName } from "@/i18n/helpers";
import { GlobalSearch } from "@/components/common/GlobalSearch";
import { NotificationsSheet } from "@/components/common/NotificationsSheet";
import { CinemaLocationButton } from "@/components/cinema/CinemaLocationDialog";

export function Header() {
  const path = usePathname();
  const { t, locale, setLocale } = useI18n();
  const LINKS = [
    { href: "/", label: t("nav.home") },
    { href: "/movies", label: t("nav.movies") },
    { href: "/cinemas", label: t("nav.cinemas") },
    { href: "/bookings", label: t("nav.bookings") },
  ];
  return (
    <header className="glass fixed inset-x-0 top-0 z-40 border-b border-white/[0.08]">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-2 px-4 sm:gap-3 sm:px-6 md:h-20">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label={`${appName(locale)} home`}>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-electric to-luminous shadow-glow"><Clapperboard size={20} /></span>
          <span className="whitespace-nowrap text-base font-extrabold tracking-tight sm:text-lg">{appName(locale)}</span>
        </Link>
        <nav className="ms-2 hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={cn("whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-slate-400 transition hover:text-white", (path === l.href || (l.href !== "/" && path.startsWith(l.href))) && "bg-white/[0.07] text-white")}>{l.label}</Link>
          ))}
        </nav>
        <div className="ms-auto hidden min-w-[160px] max-w-xs flex-1 items-center md:flex">
          <GlobalSearch variant="bar" />
        </div>
        <div className="ms-auto md:hidden">
          <GlobalSearch variant="icon" />
        </div>
        <button
          onClick={() => setLocale(locale === "fa" ? "en" : "fa")}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 text-xs font-bold"
          aria-label={t("lang.label")}
        >
          <Languages size={15} className="text-luminous" />
          {locale === "fa" ? "EN" : "فا"}
        </button>
        <CinemaLocationButton className="hidden max-w-[180px] items-center gap-1 text-xs text-slate-300 lg:flex" />
        <NotificationsSheet
          trigger={
            <button className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]" aria-label={t("notif.label")}>
              <Bell size={18} /><span className="absolute end-2 top-2 h-2 w-2 rounded-full bg-error" />
            </button>
          }
        />
        <Link href="/profile" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-electric to-luminous" aria-label={t("profile.label")}><User size={18} /></Link>
      </div>
    </header>
  );
}
