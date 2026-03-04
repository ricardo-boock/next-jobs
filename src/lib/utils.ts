import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeSalary(input: string | null): string | null {
  if (!input) return null;

  const raw: string | null = input.trim();
  if (!raw) return null;

  let s: string = raw;

  // Very conservative, low-risk fixes
  s = s.replace(/(\d+(?:[.,]\d+)?)\$/g, "$$$1"); // 14$ -> $14
  s = s.replace(/\s*\/\s*/g, " / "); // /hour -> / hour
  s = s.replace(/[–—]/g, "-").replace(/\s*-\s*/g, " - ");
  s = s.replace(/\s+/g, " ").trim();
  s = s.replace(/ - /g, " – "); // range dash

  // Only if it's truly ending with ,000
  s = s.replace(/\b(\d+),000\b/g, "$1K");

  // Only convert decimal comma when 1–2 digits after comma (3,5 -> 3.5)
  s = s.replace(/\b(\d+),(\d{1,2})\b/g, "$1.$2");

  // If formatting produced something suspiciously shorter, fall back
  if (s.length < Math.floor(raw.length * 0.6)) return raw;

  return s;
}
