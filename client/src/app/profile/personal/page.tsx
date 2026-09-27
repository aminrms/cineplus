"use client";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { MOCK_USER } from "@/lib/constants";
import { useI18n } from "@/i18n/provider";
import { SubPageShell } from "../_shell";

export default function PersonalPage() {
  const { t, locale } = useI18n();
  const [name, setName] = useState(locale === "fa" ? MOCK_USER.name : MOCK_USER.nameEn);
  const [phone, setPhone] = useState(locale === "fa" ? MOCK_USER.phone : MOCK_USER.phoneEn);
  const [email, setEmail] = useState(MOCK_USER.email);
  const [city, setCity] = useState(locale === "fa" ? MOCK_USER.city : MOCK_USER.cityEn);
  return (
    <SubPageShell title={t("personal.title")}>
      <Card className="space-y-4 p-4 sm:p-5">
        <div><label htmlFor="p-name" className="mb-1.5 block text-sm font-semibold">{t("personal.name")}</label><Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} /></div>
        <div><label htmlFor="p-phone" className="mb-1.5 block text-sm font-semibold">{t("personal.phone")}</label><Input id="p-phone" value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" /></div>
        <div><label htmlFor="p-email" className="mb-1.5 block text-sm font-semibold">{t("personal.email")}</label><Input id="p-email" value={email} onChange={(e) => setEmail(e.target.value)} inputMode="email" dir="ltr" className="text-left" /></div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div><label htmlFor="p-city" className="mb-1.5 block text-sm font-semibold">{t("personal.city")}</label><Input id="p-city" value={city} onChange={(e) => setCity(e.target.value)} /></div>
          <div><label htmlFor="p-birth" className="mb-1.5 block text-sm font-semibold">{t("personal.birth")}</label><Input id="p-birth" placeholder={locale === "fa" ? "۱۳۷۵/۰۳/۱۲" : "1996-06-02"} /></div>
        </div>
        <Button className="w-full sm:w-auto" onClick={() => toast.success(t("personal.saved"))}>{t("save")}</Button>
      </Card>
    </SubPageShell>
  );
}
