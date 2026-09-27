"use client";
import { useCinemas } from "@/hooks/useQueries";
import { PageContainer, PageHeader } from "@/components/common/layout";
import { CinemaCard } from "@/components/cinema/CinemaCard";
import { ErrorState, LoadingGrid } from "@/components/common/states";
import { useI18n } from "@/i18n/provider";

export default function CinemasPage() {
  const { data, isLoading, isError, refetch } = useCinemas();
  const { t } = useI18n();
  return (
    <PageContainer>
      <PageHeader title={t("cinemas.title")} subtitle={t("cinemas.sub")} />
      {isLoading && <LoadingGrid />}
      {isError && <ErrorState onRetry={() => refetch()} />}
      <div className="grid gap-3 sm:gap-4 md:grid-cols-2">
        {data?.map((c) => <CinemaCard key={c.id} cinema={c} />)}
      </div>
    </PageContainer>
  );
}
