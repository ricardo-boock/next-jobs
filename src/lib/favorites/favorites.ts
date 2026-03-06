export const FAVORITES_KEY = "favorites";

export function getFavorites(): number[] {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function isFavorite(jobId: number): boolean {
  return getFavorites().includes(jobId);
}

export function setFavorite(jobId: number): void {
  const current = getFavorites();
  const updated = Array.from(new Set([...current, jobId]));

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("favorites-change"));
}

export function removeFavorite(jobId: number): void {
  const updated = getFavorites().filter((id) => id !== jobId);

  localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  window.dispatchEvent(new Event("favorites-change"));
}

export function toggleFavorite(jobId: number): void {
  if (isFavorite(jobId)) removeFavorite(jobId);
  else setFavorite(jobId);
}

export function deleteFavorites(): void {
  localStorage.removeItem(FAVORITES_KEY);
  window.dispatchEvent(new Event("favorites-change"));
}
