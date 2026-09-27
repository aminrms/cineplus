"use client";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { PageContainer } from "@/components/common/layout";
import { useI18n } from "@/i18n/provider";

export function SubPageShell({ title, children }: { title: string; children: ReactNode }) {
  const { t } = useI18n();
  return (
    <PageContainer className="max-w-2xl">
      <div className="flex items-center gap-3 py-4">
        <Link href="/profile" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10" aria-label={t("back")}><ArrowLeft size={18} className="rtl:rotate-180" /></Link>
        <h1 className="text-h3">{title}</h1>
      </div>
      {children}
    </PageContainer>
  );
}
