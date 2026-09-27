"use client";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { BottomNav } from "@/components/layout/BottomNav";
import { cn } from "@/lib/utils";

// Routes rendered chromeless (no header, no bottom nav) on mobile AND desktop:
// - movie detail pages have a full-bleed hero + their own back button
// - login / verify (phone auth) are standalone flows
const HIDE_CHROME: RegExp[] = [/^\/movies\/[^/]+\/?$/, /^\/login\/?$/, /^\/verify\/?$/];

export function AppShell({ children }: { children: React.ReactNode }) {
  const path = usePathname() ?? "";
  const chromeless = HIDE_CHROME.some((re) => re.test(path));

  return (
    <>
      {!chromeless && <Header />}
      <main className={cn(!chromeless && "pt-16 md:pt-20")}>{children}</main>
      {!chromeless && <BottomNav />}
    </>
  );
}
