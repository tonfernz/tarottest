import tarotCards from "@/data/tarotCards.json";
import type { TarotCardData } from "@/types/tarot";

export const CARD_BACK_IMAGE = "/cards/back.png";
export const SELECTED_CARD_LIMIT = 3;

export const allTarotCards = tarotCards as TarotCardData[];

export function shuffleArray<T>(items: T[]): T[] {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
  }

  return shuffled;
}

export function getCardsByIds(ids: string[]): TarotCardData[] {
  const cardsById = new Map(allTarotCards.map((card) => [card.id, card]));
  return ids.map((id) => cardsById.get(id)).filter((card): card is TarotCardData => Boolean(card));
}
