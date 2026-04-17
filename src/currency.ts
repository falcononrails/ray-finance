import { config } from "./config.js";

interface CurrencyFormatOptions {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function getDisplayLocale(): string {
  return config.displayLocale || "en-US";
}

export function getDisplayCurrency(): string {
  return config.displayCurrency || "USD";
}

export function formatCurrencyAmount(
  amount: number,
  options: CurrencyFormatOptions = {}
): string {
  const {
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  try {
    return new Intl.NumberFormat(getDisplayLocale(), {
      style: "currency",
      currency: getDisplayCurrency(),
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  } catch {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits,
      maximumFractionDigits,
    }).format(amount);
  }
}

export function formatDisplayDate(date: Date, options: Intl.DateTimeFormatOptions): string {
  return date.toLocaleDateString(getDisplayLocale(), options);
}

export function formatDisplayCount(n: number): string {
  return n.toLocaleString(getDisplayLocale());
}
