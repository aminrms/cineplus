"use client";
import Link from "next/link";
import { Bell, ChevronRight, CreditCard, HelpCircle, Lock, LogOut, Settings, User, Wallet } from "lucide-react";
import { useDispatch } from "react-redux";
import { toast } from "sonner";
import { PageContainer } from "@/components/common/layout";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LoyaltyProgress } from "@/components/ui/progress";
import { MOCK_USER } from "@/lib/constants";
import { signOut } from "@/store/authSlice";
import { useI18n } from "@/i18n/provider";
import { faDigits } from "@/lib/formatters";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { t, locale } = useI18n();
  const name = locale === "fa" ? MOCK_USER.name : MOCK_USER.nameEn;
  const points = locale === "fa" ? faDigits(MOCK_USER.loyaltyPoints.toLocaleString("fa-IR")) : MOCK_USER.loyaltyPoints.toLocaleString("en-US");
  const remain = locale === "fa" ? faDigits((MOCK_USER.loyaltyTarget - MOCK_USER.loyaltyPoints).toLocaleString("fa-IR")) : (MOCK_USER.loyaltyTarget - MOCK_USER.loyaltyPoints).toLocaleString("en-US");
  const SETTINGS = [
    { icon: User, label: t("profile.personal"), href: "/profile/personal" },
    { icon: Wallet, label: t("wallet.title"), href: "/wallet" },
    { icon: Bell, label: t("profile.notifications"), href: "/profile/notifications" },
    { icon: CreditCard, label: t("profile.payments"), href: "/profile/payments" },
    { icon: Settings, label: t("profile.preferences"), href: "/profile/preferences" },
    { icon: Lock, label: t("profile.privacy"), href: "/profile/privacy" },
    { icon: HelpCircle, label: t("profile.help"), href: "/profile/help" },
  ];
  return (
    <PageContainer>
      <Card className="mt-4 overflow-hidden sm:mt-6">
        <div className="h-20 bg-gradient-to-r from-electric via-luminous to-electric opacity-60 sm:h-24" />
        <div className="-mt-8 flex items-center gap-3 p-4 sm:-mt-10 sm:gap-4 sm:p-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-charcoal bg-gradient-to-br from-electric to-luminous text-xl font-extrabold sm:h-20 sm:w-20 sm:text-2xl">{locale === "fa" ? "ا" : "A"}</div>
          <div className="min-w-0">
            <h1 className="truncate text-h3">{name}</h1>
            <Badge variant="vip" className="mt-1">{t("profile.membership")}</Badge>
          </div>
        </div>
        <div className="px-4 pb-4 sm:px-5 sm:pb-5">
          <div className="flex items-center justify-between text-sm"><span className="text-slate-400">{t("profile.points")}</span><span className="font-bold text-amber-400">{points} {t("profile.pts")}</span></div>
          <div className="mt-2"><LoyaltyProgress value={MOCK_USER.loyaltyPoints} max={MOCK_USER.loyaltyTarget} /></div>
          <p className="mt-1 text-[11px] text-slate-500">{remain} {t("profile.toNext")}</p>
        </div>
      </Card>
      <div className="mt-3 space-y-2 sm:mt-4">
        {SETTINGS.map((s) => (
          <Link key={s.href} href={s.href} className="flex min-h-[60px] w-full items-center gap-3 rounded-2xl border border-white/[0.08] bg-charcoal p-4 text-sm font-medium transition hover:border-electric/40">
            <s.icon size={18} className="shrink-0 text-luminous" />{s.label}<ChevronRight size={16} className="ms-auto shrink-0 text-slate-600 rtl:rotate-180" />
          </Link>
        ))}
        <button onClick={() => { dispatch(signOut()); toast.success(t("profile.signedOut")); }} className="flex min-h-[60px] w-full items-center gap-3 rounded-2xl border border-error/30 bg-error/10 p-4 text-sm font-semibold text-error">
          <LogOut size={18} className="shrink-0" />{t("profile.signout")}
        </button>
      </div>
    </PageContainer>
  );
}
