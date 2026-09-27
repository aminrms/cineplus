"use client";
import { useState } from "react";
import { useBookings } from "@/hooks/useQueries";
import { PageContainer, PageHeader } from "@/components/common/layout";
import { BookingCard } from "@/components/booking/BookingCard";
import { EmptyState, ErrorState, LoadingGrid } from "@/components/common/states";
import { SimpleTabs } from "@/components/ui/tabs";
import { useI18n } from "@/i18n/provider";

export default function BookingsPage() {
  const { data, isLoading, isError, refetch } = useBookings();
  const { t } = useI18n();
  const [tab, setTab] = useState("active");
  const list = (data ?? []).filter((b) => (tab === "active" ? b.status === "active" : b.status !== "active"));
  return (
    <PageContainer>
      <PageHeader title={t("bookings.title")} subtitle={t("bookings.sub")} />
      <SimpleTabs tabs={[{ value: "active", label: t("bookings.active") }, { value: "history", label: t("bookings.history") }]} defaultValue={tab} onChange={setTab} />
      <div className="mt-5 space-y-3 sm:space-y-4">
        {isLoading && <LoadingGrid />}
        {isError && <ErrorState onRetry={() => refetch()} />}
        {data && list.length === 0 && (
          tab === "active"
            ? <EmptyState title={t("bookings.none")} message={t("bookings.noneSub")} actionLabel={t("bookings.explore")} actionHref="/movies" />
            : <EmptyState title={t("bookings.noHistory")} message={t("bookings.noHistorySub")} actionLabel={t("bookings.explore")} actionHref="/movies" />
        )}
        {list.map((b) => <BookingCard key={b.id} booking={b} />)}
      </div>
    </PageContainer>
  );
}
