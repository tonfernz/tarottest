"use client";

import { motion } from "framer-motion";
import { SELECTED_CARD_LIMIT } from "@/lib/tarot";

type SelectedCardsProps = {
  selectedCount: number;
};

export function SelectedCards({ selectedCount }: SelectedCardsProps) {
  return (
    <div className="flex items-center justify-center gap-3" aria-label={`เลือกแล้ว ${selectedCount} จาก ${SELECTED_CARD_LIMIT} ใบ`}>
      {Array.from({ length: SELECTED_CARD_LIMIT }).map((_, index) => {
        const isFilled = index < selectedCount;

        return (
          <motion.span
            key={index}
            animate={{ scale: isFilled ? 1.08 : 1, backgroundColor: isFilled ? "#7d8a62" : "#efe2d0" }}
            className="h-2.5 w-10 rounded-full border border-white/70 shadow-sm"
          />
        );
      })}
    </div>
  );
}
