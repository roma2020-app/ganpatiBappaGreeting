const LOCAL_COUNTER_KEY = 'morya_real_cards_count';
const DEFAULT_INITIAL = 0;

/**
 * Fetches the total number of cards generated globally from the backend API.
 * Falls back to local storage if running in client-only or offline mode.
 */
export async function fetchCardsCount(): Promise<number> {
  // Clear any legacy test count
  try {
    localStorage.removeItem('morya_local_generated_count');
  } catch {
    // ignore
  }

  try {
    const res = await fetch('/api/stats/cards-count');
    if (res.ok) {
      const data = await res.json();
      if (typeof data.count === 'number') {
        localStorage.setItem(LOCAL_COUNTER_KEY, data.count.toString());
        return data.count;
      }
    }
  } catch {
    // Backend API unreachable or offline; fallback to local storage
  }

  const stored = localStorage.getItem(LOCAL_COUNTER_KEY);
  if (stored !== null) {
    const parsed = parseInt(stored, 10);
    if (!isNaN(parsed) && parsed >= 0) return parsed;
  }
  return DEFAULT_INITIAL;
}

/**
 * Increments the global count when a new card is generated.
 * Syncs with the server API and updates local storage.
 */
export async function incrementCardsCount(): Promise<number> {
  try {
    const res = await fetch('/api/stats/cards-count/increment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.ok) {
      const data = await res.json();
      if (typeof data.count === 'number') {
        localStorage.setItem(LOCAL_COUNTER_KEY, data.count.toString());
        return data.count;
      }
    }
  } catch {
    // API request failed; gracefully increment local fallback
  }

  const stored = localStorage.getItem(LOCAL_COUNTER_KEY);
  const current = stored ? parseInt(stored, 10) || DEFAULT_INITIAL : DEFAULT_INITIAL;
  const updated = current + 1;
  localStorage.setItem(LOCAL_COUNTER_KEY, updated.toString());
  return updated;
}
