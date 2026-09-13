import { GreetingCardData } from '../types';

const STORAGE_KEY = 'morya_greetings_saved_cards';

export function getSavedCards(): GreetingCardData[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data);
  } catch (e) {
    console.error('Failed to load saved cards', e);
    return [];
  }
}

export function saveCardToLocal(card: GreetingCardData): void {
  try {
    const existing = getSavedCards();
    // Filter out duplicate IDs
    const filtered = existing.filter((c) => c.id !== card.id);
    // Keep last 15 cards
    const updated = [card, ...filtered].slice(0, 15);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to save card to localStorage', e);
  }
}

export function deleteSavedCard(id: string): GreetingCardData[] {
  try {
    const existing = getSavedCards();
    const updated = existing.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch (e) {
    console.error('Failed to delete card', e);
    return [];
  }
}
