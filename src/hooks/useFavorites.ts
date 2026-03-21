"use client";

import { useSyncExternalStore } from "react";
import { FAVORITES_KEY } from "@/lib/favorites";

function subscribe(callback: () => void): () => void {
  window.addEventListener("storage", callback);
  window.addEventListener("favorites-change", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("favorites-change", callback);
  };
}

function getSnapshot(): string {
  return localStorage.getItem(FAVORITES_KEY) ?? "[]";
}

function getServerSnapshot(): string {
  return "[]";
}

export function useFavorites(): number[] {
  const snapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  try {
    const parsed: unknown = JSON.parse(snapshot);

    return Array.isArray(parsed)
      ? parsed.filter((item): item is number => typeof item === "number")
      : [];
  } catch {
    return [];
  }
}
