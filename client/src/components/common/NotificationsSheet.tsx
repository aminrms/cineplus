"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Bell, CheckCheck, Clapperboard, Crown, TicketPercent, X } from "lucide-react";
import { useI18n } from "@/i18n/provider";
import { cn } from "@/lib/utils";

type Item = { id: string; icon: typeof Bell; fa: string; en: string; timeFa: string; timeEn: string };

const ITEMS: Item[] = [
  { id: "n1", icon: Clapperboard, fa: "یادآوری: «تل‌ماسه: بخش دوم» شنبه ساعت ۸:۱۰ شب شروع می‌شود", en: "Reminder: Dune: Part Two starts Saturday at 8:10 PM", timeFa: "۲ ساعت پیش", timeEn: "2h ago" },
  { id: "n2", icon: TicketPercent, fa: "کد PROMO10؛ ۱۰٪ تخفیف برای رزرو بعدی شما", en: "PROMO10: 10% off your next booking", timeFa: "۵ ساعت پیش", timeEn: "5h ago" },
  { id: "n3", icon: Clapperboard, fa: "«موج عمیق» به‌زودی در پردیس کوروش اکران می‌شود", en: "Deep Tide is coming soon to Kourosh Cineplex", timeFa: "دیروز", timeEn: "Yesterday" },
  { id: "n4", icon: Crown, fa: "۱٬۲۵۰ امتیاز وفاداری دارید؛ تا پلاتینیوم ادامه دهید", en: "You have 1,250 loyalty points — keep going to Platinum", timeFa: "۲ روز پیش", timeEn: "2 days ago" },
];

export function NotificationsSheet({ trigger }: { trigger: React.ReactNode }) {
  const { t, locale } = useI18n();
  const [open, setOpen] = useState(false);
  const [read, setRead] = useState<string[]>([]);
  const unread = ITEMS.filter((i) => !read.includes(i.id)).length;
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content
          aria-label={t("notif.drawerTitle")}
          className="fixed z-50 flex max-h-[85vh] flex-col overflow-hidden border border-white/10 bg-charcoal shadow-large inset-x-0 bottom-0 rounded-t-[24px] sm:inset-x-auto sm:bottom-0 sm:end-0 sm:top-0 sm:h-full sm:max-h-full sm:w-[400px] sm:rounded-none"
        >
          <div className="flex items-center gap-2 border-b border-white/[0.08] p-4">
            <Bell size={18} className="text-luminous" />
            <Dialog.Title className="flex-1 text-h3">{t("notif.drawerTitle")}</Dialog.Title>
            {unread > 0 && (
              <button onClick={() => setRead(ITEMS.map((i) => i.id))} className="flex min-h-[40px] items-center gap-1 text-xs font-bold text-luminous">
                <CheckCheck size={15} /> {t("notif.markRead")}
              </button>
            )}
            <Dialog.Close asChild>
              <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/[0.06]" aria-label={t("close")}><X size={18} /></button>
            </Dialog.Close>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {unread === 0 ? (
              <p className="py-10 text-center text-sm text-slate-500">{t("notif.allRead")}</p>
            ) : (
              <ul className="space-y-2">
                {ITEMS.map((n) => {
                  const isRead = read.includes(n.id);
                  return (
                    <li key={n.id}>
                      <button
                        onClick={() => setRead((r) => [...r, n.id])}
                        className={cn("flex w-full items-start gap-3 rounded-2xl border p-3 text-start transition", isRead ? "border-white/[0.06] bg-white/[0.02] opacity-60" : "border-white/[0.08] bg-surface hover:border-electric/40")}
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-luminous"><n.icon size={18} /></span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-medium leading-5">{locale === "fa" ? n.fa : n.en}</span>
                          <span className="mt-1 block text-[11px] text-slate-500">{locale === "fa" ? n.timeFa : n.timeEn}</span>
                        </span>
                        {!isRead && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-luminous" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
