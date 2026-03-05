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

export function cleanJobDescription(html: string): string {
  // 1) Sanitize
  let safe = DOMPurify.sanitize(html, {
    FORBID_ATTR: ["style", "class", "id"],
    FORBID_TAGS: ["script", "iframe", "form"],
  });

  // 2) Parse into DOM
  let doc = new DOMParser().parseFromString(safe, "text/html");

  // 3) Remove Remotive tracking pixels
  doc
    .querySelectorAll('img[src*="track"], img[src$=".gif"][width="1"]')
    .forEach((el) => el.remove());

  // 4) Serialize
  safe = doc.body.innerHTML;

  // 5) Collapse excessive <br>
  safe = safe.replace(/(?:<br\s*\/?>\s*){2,}/gi, "</p><p>");

  // 6) Replace &nbsp;
  safe = safe.replace(/&nbsp;/gi, " ");

  // 7) Ensure wrapped in paragraph
  if (!/^\s*<p[\s>]/i.test(safe)) {
    safe = `<p>${safe}</p>`;
  }

  // 8) FINAL: remove empty elements
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
