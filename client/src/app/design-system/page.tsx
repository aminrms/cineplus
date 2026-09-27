"use client";
import { PageContainer, PageHeader, SectionHeader } from "@/components/common/layout";
import { Badge, StatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, GlassCard, Skeleton } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LoyaltyProgress } from "@/components/ui/progress";
import { SimpleTabs } from "@/components/ui/tabs";
import { MOVIES } from "@/data/mock";
import { MovieCard } from "@/components/movie/MovieCard";
import { useI18n } from "@/i18n/provider";

const SWATCHES: [string, string][] = [
  ["Obsidian #0B0B10", "#0B0B10"], ["Deep #08090D", "#08090D"], ["Charcoal #16161F", "#16161F"],
  ["Surface #11131A", "#11131A"], ["Elevated #191B25", "#191B25"],
  ["Electric #7C3AED", "#7C3AED"], ["Luminous #A855F7", "#A855F7"], ["VIP Amber #F59E0B", "#F59E0B"],
  ["Success #22C55E", "#22C55E"], ["Warning #F59E0B", "#F59E0B"], ["Error #EF4444", "#EF4444"], ["Info #3B82F6", "#3B82F6"],
];

export default function DesignSystemPage() {
  const { t } = useI18n();
  return (
    <PageContainer>
      <PageHeader title={t("design.title")} subtitle={t("design.sub")} />
      <section><SectionHeader title={t("design.colors")} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {SWATCHES.map(([label, hex]) => (
            <div key={label} className="rounded-2xl border border-white/10 p-3"><div className="h-14 rounded-xl border border-white/10" style={{ background: hex }} /><p className="mt-2 text-xs font-semibold" dir="ltr">{label}</p></div>
          ))}
        </div>
      </section>
      <section className="mt-10"><SectionHeader title={t("design.type")} />
        <Card className="space-y-2 p-4 sm:p-5">
          <p className="text-display">ساین‌پلاس</p><p className="text-h1">{t("app.tagline")}</p>
          <p className="text-h2">{t("home.nowShowing")}</p><p className="text-h3">{t("cinemas.title")}</p>
          <p className="text-sm">Body — رزرو بلیت سینما در چند ثانیه.</p><p className="text-xs text-slate-400">Small — شنبه ۴ اردیبهشت · ۸:۱۰ شب</p>
        </Card>
      </section>
      <section className="mt-10"><SectionHeader title={t("design.buttons")} />
        <div className="flex flex-wrap gap-2">
          <Button>{t("continue")}</Button><Button variant="secondary">{t("back")}</Button><Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button><Button variant="destructive">Destructive</Button><Button loading>Loading</Button>
        </div>
      </section>
      <section className="mt-10"><SectionHeader title={t("design.inputs")} />
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="space-y-3 p-4 sm:p-5"><Input placeholder={t("search.placeholder")} /><Input placeholder={t("movies.all")} disabled />
            <div className="flex flex-wrap gap-1.5"><Badge>IMAX</Badge><Badge variant="vip">VIP</Badge><StatusBadge status="available" /><StatusBadge status="filling-fast" /><StatusBadge status="sold-out" /></div>
          </Card>
          <Card className="space-y-3 p-4 sm:p-5">
            <SimpleTabs tabs={[{ value: "a", label: t("home.nowShowing") }, { value: "b", label: t("home.comingSoon") }]} defaultValue="a" />
            <LoyaltyProgress value={1250} max={2000} />
            <div className="flex gap-2"><Skeleton className="h-10 w-24" /><Skeleton className="h-10 w-24" /></div>
          </Card>
        </div>
      </section>
      <section className="mt-10"><SectionHeader title={t("design.cards")} />
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          <GlassCard className="p-5">Glass</GlassCard>
          <Card className="p-5">Surface card</Card>
          <div className="grid grid-cols-2 gap-3">{MOVIES.slice(0, 2).map((m) => <MovieCard key={m.id} movie={m} />)}</div>
        </div>
      </section>
    </PageContainer>
  );
}
