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
          <div key={index} className="flex items-center gap-3">
            <motion.span
              animate={{
                scale: isFilled ? 1.08 : 1,
                backgroundColor: isFilled ? "#66734d" : "#eee0ca",
                color: isFilled ? "#fff8ef" : "#8a7662"
              }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              className="grid h-7 w-7 place-items-center rounded-full border border-white/70 text-xs font-bold shadow-sm"
            >
              {index + 1}
            </motion.span>
            {index < SELECTED_CARD_LIMIT - 1 ? <span className="h-px w-6 bg-moss/45" /> : null}
          </div>
        );
      })}
    </div>
  );
}
