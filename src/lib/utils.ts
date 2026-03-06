import { clsx, type ClassValue } from "clsx";
import DOMPurify from "dompurify";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function cleanJobTitle(title: string): string {
  return title
    .replace(/[\u{1F1E6}-\u{1F1FF}]{2}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeJobSalary(salary: string | null): string | null {
  if (!salary) return null;

  const raw: string | null = salary.trim();
  if (!raw) return null;

  let s: string = raw;

  s = s.replace(/(\d+(?:[.,]\d+)?)\$/g, "$$$1");
  s = s.replace(/\s*\/\s*/g, " / ");
  s = s.replace(/[–—]/g, "-").replace(/\s*-\s*/g, " - ");
  s = s.replace(/\s+/g, " ").trim();
  s = s.replace(/ - /g, " – ");
  s = s.replace(/\b(\d+),000\b/g, "$1K");
  s = s.replace(/\b(\d+),(\d{1,2})\b/g, "$1.$2");

  if (s.length < Math.floor(raw.length * 0.6)) return raw;

  return s;
}

export function cleanJobDescription(html: string): string {
  let safe = DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style", "class", "id"],
    FORBID_TAGS: ["script", "iframe", "form"],
  });

  let doc = new DOMParser().parseFromString(safe, "text/html");

  doc
    .querySelectorAll('img[src*="track"], img[src$=".gif"][width="1"]')
    .forEach((el) => el.remove());

  safe = doc.body.innerHTML;
  safe = safe.replace(/(?:<br\s*\/?>\s*){2,}/gi, "</p><p>");
  safe = safe.replace(/&nbsp;/gi, " ");

  if (!/^\s*<p[\s>]/i.test(safe)) {
    safe = `<p>${safe}</p>`;
  }

  doc = new DOMParser().parseFromString(safe, "text/html");

  doc.querySelectorAll("*").forEach((el) => {
    const text = el.textContent?.replace(/\u00A0/g, "").trim();
    const hasChildren = el.children.length > 0;

    if (!text && !hasChildren) {
      el.remove();
    }
  });

  return doc.body.innerHTML;
}
