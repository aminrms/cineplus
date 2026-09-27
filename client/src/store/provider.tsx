"use client";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { store } from "@/store";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => new QueryClient({ defaultOptions: { queries: { staleTime: 60_000, retry: 1 } } }));
  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </Provider>
  );
}
