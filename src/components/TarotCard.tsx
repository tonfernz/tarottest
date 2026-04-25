"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CARD_BACK_IMAGE, withBasePath } from "@/lib/tarot";
import type { TarotCardData } from "@/types/tarot";

type TarotCardProps = {
  card: TarotCardData;
  faceUp?: boolean;
  selected?: boolean;
  disabled?: boolean;
  showName?: boolean;
  labelMode?: "thai-en" | "english-only";
  index?: number;
  onClick?: () => void;
};

export function TarotCard({
  card,
  faceUp = false,
  selected = false,
  disabled = false,
  showName = false,
  labelMode = "thai-en",
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
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: Math.min(index * 0.025, 0.18) }}
      className="group flex w-full min-w-0 flex-col items-center gap-2 rounded-[1.35rem] outline-none focus-visible:ring-4 focus-visible:ring-moss/30 disabled:cursor-not-allowed sm:gap-3"
    >
      <span
        className={`relative block aspect-[11/19] w-full overflow-hidden rounded-[0.95rem] border bg-blush shadow-soft transition duration-300 sm:rounded-[1.25rem] ${
          selected ? "border-olive shadow-glow" : "border-white/75 group-hover:border-olive/40"
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
              src={withBasePath(CARD_BACK_IMAGE)}
              alt=""
              fill
              sizes="(max-width: 768px) 30vw, 150px"
              className="object-contain"
              priority={index < 3}
            />
          </span>
          <span className="card-face card-back-face absolute inset-0">
            <Image
              src={withBasePath(card.image)}
              alt={card.name_th}
              fill
              sizes="(max-width: 768px) 30vw, 150px"
              className="object-contain"
            />
          </span>
        </motion.span>
      </span>

      {showName ? (
        <span className="min-h-10 text-center text-xs font-semibold leading-5 text-bark sm:min-h-12 sm:text-base sm:leading-6">
          {labelMode === "english-only" ? (
            card.name_en
          ) : (
            <>
              {card.name_th}
              <span className="block text-xs font-normal text-bark/60">{card.name_en}</span>
            </>
          )}
        </span>
      ) : null}
    </motion.button>
  );
}
