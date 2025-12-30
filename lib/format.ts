import type { Locale } from './i18n';

type Language = 'fa' | 'en';

export function formatNumber(num: number, lang: Language, decimals = 2) {
  const locale = lang === 'fa' ? 'fa-IR' : 'en-US';
  return new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);
}

export function formatNumberLatin(num: number, decimals = 2) {
  return new Intl.NumberFormat('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);
}

export function formatPrice(num: number, lang: Language) {
  return formatNumber(num, lang, 2);
}

export function formatSize(num: number, lang: Language) {
  return formatNumber(num, lang, 3);
}

export function formatCompact(num: number) {
  if (num >= 1e9) return `${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `${(num / 1e6).toFixed(2)}M`;
  if (num >= 1e3) return `${(num / 1e3).toFixed(2)}K`;
  return num.toFixed(2);
}
