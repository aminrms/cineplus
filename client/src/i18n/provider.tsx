"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionaries, type DictKey, type Locale } from "./dictionaries";

type Ctx = {
  locale: Locale;
  dir: "rtl" | "ltr";
  setLocale: (l: Locale) => void;
  t: (k: DictKey) => string;
};

const I18nCtx = createContext<Ctx>({ locale: "fa", dir: "rtl", setLocale: () => {}, t: (k) => dictionaries.fa[k] });

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("cineplus-locale");
      if (saved === "en" || saved === "fa") setLocaleState(saved);
    } catch { /* ignore */ }
  }, []);
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
    try { localStorage.setItem("cineplus-locale", locale); } catch { /* ignore */ }
  }, [locale]);
  const setLocale = useCallback((l: Locale) => setLocaleState(l), []);
  const t = useCallback((k: DictKey) => dictionaries[locale][k] ?? dictionaries.en[k] ?? k, [locale]);
  const val = useMemo<Ctx>(() => ({ locale, dir: locale === "fa" ? "rtl" : "ltr", setLocale, t }), [locale, setLocale, t]);
  return <I18nCtx.Provider value={val}>{children}</I18nCtx.Provider>;
}

export function useI18n() { return useContext(I18nCtx); }
