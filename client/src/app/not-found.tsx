"use client";
import Link from "next/link";
import { PageContainer } from "@/components/common/layout";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/provider";
export default function NotFound() {
  const { t } = useI18n();
  return (
    <PageContainer><div className="flex flex-col items-center px-4 py-20 text-center sm:py-24">
      <h1 className="text-display" dir="ltr">404</h1>
      <p className="mt-2 text-slate-400">{t("err.sub")}</p>
      <Link href="/" className="mt-6"><Button>{t("success.home")}</Button></Link>
    </div></PageContainer>
  );
}
