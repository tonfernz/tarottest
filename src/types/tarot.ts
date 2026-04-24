export type TarotMeaning = {
  work: string;
  money: string;
  love: string;
  health: string;
};

export type TarotCardData = {
  id: string;
  name_th: string;
  name_en: string;
  image: string;
  keywords: string[];
  meaning: TarotMeaning;
};
