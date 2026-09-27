import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import { Providers } from "@/store/provider";
import { I18nProvider } from "@/i18n/provider";
import { AppShell } from "@/components/layout/AppShell";
import { Toaster } from "sonner";

const vazirmatn = Vazirmatn({ subsets: ["arabic", "latin"], variable: "--font-vazir", display: "swap" });

export const metadata: Metadata = {
  title: "ساین‌پلاس — بیش از فقط فیلم | CinePlus",
  description: "رزرو بلیت سینما: کشف فیلم، انتخاب صندلی و پرداخت در چند ثانیه.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fa" dir="rtl" className={`dark ${vazirmatn.variable}`}>
      <body className="min-h-screen bg-deep font-vazir text-slate-100">
        <Providers>
          <I18nProvider>
            <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
              <div className="absolute right-[10%] top-[-10%] h-[420px] w-[420px] rounded-full ambient-purple" />
              <div className="absolute left-[-10%] top-[40%] h-[380px] w-[380px] rounded-full opacity-60 ambient-purple" />
            </div>
            <AppShell>{children}</AppShell>
            <Toaster theme="dark" position="top-center" richColors />
          </I18nProvider>
        </Providers>
      </body>
    </html>
  );
}
