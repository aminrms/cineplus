"use client";
import { PageContainer } from "@/components/common/layout";
import { ErrorState } from "@/components/common/states";
export default function Error({ reset }: { reset: () => void }) {
  return <PageContainer><div className="py-10"><ErrorState onRetry={reset} /></div></PageContainer>;
}
