"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CARD_BACK_IMAGE } from "@/lib/tarot";
import type { TarotCardData } from "@/types/tarot";

type TarotCardProps = {
  card: TarotCardData;
  faceUp?: boolean;
  selected?: boolean;
  disabled?: boolean;
  showName?: boolean;
  index?: number;
  onClick?: () => void;
};

export function TarotCard({
  card,
  faceUp = false,
  selected = false,
  disabled = false,
  showName = false,
  index = 0,
  onClick
}: TarotCardProps) {
  return (
    <motion.button
      type="button"
      aria-pressed={selected}
      aria-label={faceUp ? `ดูรายละเอียด ${card.name_th}` : `เลือกไพ่ใบที่ ${index + 1}`}
      disabled={disabled}
      onClick={onClick}
      initial={{ opacity: 0, y: 16, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      animate={{ opacity: disabled && !selected ? 0.55 : 1, y: 0, scale: selected ? 1.045 : 1 }}
      whileHover={disabled ? undefined : { y: -5, scale: selected ? 1.055 : 1.025 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.025, 0.18) }}
      className="group flex w-full min-w-0 flex-col items-center gap-3 rounded-[1.35rem] outline-none focus-visible:ring-4 focus-visible:ring-moss/30 disabled:cursor-not-allowed"
    >
      <span
        className={`relative block aspect-[11/19] w-full overflow-hidden rounded-[1.25rem] border bg-linen shadow-soft transition duration-300 ${
          selected ? "border-moss shadow-glow" : "border-white/70 group-hover:border-moss/40"
        }`}
        style={{ perspective: "1200px" }}
      >
        <motion.span
          className="card-3d relative block h-full w-full"
          animate={{ rotateY: faceUp ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="card-face absolute inset-0">
            <Image
              src={CARD_BACK_IMAGE}
              alt=""
              fill
              sizes="(max-width: 768px) 30vw, 150px"
              className="object-contain"
              priority={index < 3}
            />
          </span>
          <span className="card-face card-back-face absolute inset-0">
            <Image
              src={card.image}
              alt={card.name_th}
              fill
              sizes="(max-width: 768px) 30vw, 150px"
              className="object-contain"
            />
          </span>
        </motion.span>
      </span>

      {showName ? (
        <span className="min-h-12 text-center text-sm font-semibold leading-6 text-bark sm:text-base">
          {card.name_th}
          <span className="block text-xs font-normal text-bark/60">{card.name_en}</span>
        </span>
      ) : null}
    </motion.button>
  );
}
