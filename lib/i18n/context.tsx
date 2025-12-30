"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { translations, Locale, TranslationKeys } from "./translations";

type I18nContextType = {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
};

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "app-locale";

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (stored === "fa" || stored === "en")) {
      setLocaleState(stored);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "fa" ? "rtl" : "ltr";
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const value: I18nContextType = {
    locale,
    t: translations[locale],
    setLocale,
    dir: locale === "fa" ? "rtl" : "ltr",
  };

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}
