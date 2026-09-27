"use client";
import { useCallback, useEffect, useState } from "react";
import { useCinemas } from "@/hooks/useQueries";

const STORAGE_KEY = "cineplus:selected-cinema";
const FALLBACK_ID = "grand-metropolis";

function readStored(): string {
  if (typeof window === "undefined") return FALLBACK_ID;
  try {
    return localStorage.getItem(STORAGE_KEY) ?? FALLBACK_ID;
  } catch {
    return FALLBACK_ID;
  }
}

export function useSelectedCinema() {
  const { data: cinemas } = useCinemas();
  const [selectedId, setSelectedIdState] = useState<string>(FALLBACK_ID);

  useEffect(() => {
    setSelectedIdState(readStored());
  }, []);

  useEffect(() => {
    if (cinemas?.length && !cinemas.some((c) => c.id === selectedId)) {
      setSelectedIdState(cinemas[0].id);
    }
  }, [cinemas, selectedId]);

  const setSelectedId = useCallback((id: string) => {
    setSelectedIdState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  const selected = cinemas?.find((c) => c.id === selectedId) ?? cinemas?.[0];

  return { selectedId: selected?.id ?? selectedId, selected, setSelectedId };
}
