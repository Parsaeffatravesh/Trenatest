"use client";

import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import { translations, Locale, TranslationKeys } from "./translations";

type I18nContextType = {
  locale: Locale;
  t: TranslationKeys;
  setLocale: (locale: Locale) => void;
  dir: "rtl" | "ltr";
  t_with: (key: string, params: Record<string, string | number>) => string;
  saveToProfile: (locale: Locale) => Promise<void>;
};

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "app-locale";

function interpolateString(template: string, params: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key) => {
    return String(params[key] ?? match);
  });
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("fa");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (stored && (stored === "fa" || stored === "en")) {
      setLocaleState(stored);
    }
  }, []);

  const saveToProfile = useCallback(async (newLocale: Locale) => {
    try {
      await fetch("/api/profile/locale", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale: newLocale }),
      });
    } catch (error) {
      console.error("Failed to save locale to profile:", error);
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem(STORAGE_KEY, newLocale);
    document.documentElement.lang = newLocale;
    document.documentElement.dir = newLocale === "fa" ? "rtl" : "ltr";
    saveToProfile(newLocale);
  }, [saveToProfile]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "fa" ? "rtl" : "ltr";
  }, [locale]);

  const t_with = useCallback((key: string, params: Record<string, string | number>) => {
    const keys = key.split(".");
    let value: any = translations[locale];
    for (const k of keys) {
      value = value?.[k];
    }
    if (typeof value === "string") {
      return interpolateString(value, params);
    }
    return key;
  }, [locale]);

  const value: I18nContextType = {
    locale,
    t: translations[locale],
    setLocale,
    dir: locale === "fa" ? "rtl" : "ltr",
    t_with,
    saveToProfile,
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
