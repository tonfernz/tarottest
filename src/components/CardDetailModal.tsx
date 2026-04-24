"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { withBasePath } from "@/lib/tarot";
import type { TarotCardData } from "@/types/tarot";

const meaningSections = [
  { key: "work", label: "การงาน" },
  { key: "money", label: "การเงิน" },
  { key: "love", label: "ความรัก" },
  { key: "health", label: "สุขภาพ" }
] as const;

type MeaningKey = (typeof meaningSections)[number]["key"];

type CardDetailModalProps = {
  card: TarotCardData | null;
  onClose: () => void;
};

export function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  const [activeMeaning, setActiveMeaning] = useState<MeaningKey>("work");
  const activeSection = meaningSections.find((section) => section.key === activeMeaning) ?? meaningSections[0];

  return (
    <AnimatePresence>
      {card ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-cacao/35 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="fixed right-5 top-5 z-[60] grid h-10 w-10 place-items-center text-3xl leading-none text-cream drop-shadow-lg transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/30"
            aria-label="ปิด"
          >
            ×
          </button>

          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-detail-title"
            initial={{ opacity: 0, y: 34, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 26, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-[1.35rem] border border-white/70 bg-cream p-4 shadow-soft sm:max-h-[88vh] sm:rounded-[1.5rem] sm:p-7"
          >
            <div className="grid gap-4 md:grid-cols-[11rem_1fr] md:gap-6">
              <motion.div
                initial={{ opacity: 0, y: 16, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.36, delay: 0.04 }}
                className="mx-auto w-28 sm:w-40 md:w-full"
              >
                <div className="relative aspect-[11/19] overflow-hidden rounded-[1rem] shadow-soft sm:rounded-[1.2rem]">
                  <Image
                    src={withBasePath(card.image)}
                    alt={card.name_th}
                    fill
                    sizes="(max-width: 640px) 112px, (max-width: 768px) 160px, 176px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              <div>
                <div className="pr-10 sm:pr-0">
                  <p className="text-xs font-semibold text-moss sm:text-sm">คำทำนายไพ่</p>
                  <h2 id="card-detail-title" className="mt-1 text-xl font-bold text-cacao sm:text-3xl">
                    {card.name_th}
                  </h2>
                  <p className="text-xs text-bark/60 sm:text-sm">{card.name_en}</p>
                </div>

                <div className="mt-3 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {card.keywords.slice(0, 5).map((keyword) => (
                    <span key={keyword} className="rounded-full bg-sage/45 px-2.5 py-1 text-[11px] font-semibold text-bark sm:px-3 sm:text-xs">
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-4 gap-1.5 rounded-full bg-linen/70 p-1 sm:mt-6 sm:gap-2">
                  {meaningSections.map((section) => {
                    const isActive = section.key === activeMeaning;

                    return (
                      <button
                        key={section.key}
                        type="button"
                        onClick={() => setActiveMeaning(section.key)}
                        className={`rounded-full px-2 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25 sm:text-sm ${
                          isActive ? "bg-bark text-cream shadow-sm" : "text-bark/65 hover:bg-white/45 hover:text-bark"
                        }`}
                      >
                        {section.label}
                      </button>
                    );
                  })}
                </div>

                <motion.article
                  key={activeMeaning}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="mt-4 rounded-[1.2rem] border border-white/75 bg-white/45 p-4 shadow-sm sm:mt-5 sm:p-5"
                >
                  <h3 className="text-base font-bold text-cacao sm:text-lg">{activeSection.label}</h3>
                  <p className="mt-2 text-sm leading-7 text-bark/80 sm:text-base sm:leading-8">{card.meaning[activeSection.key]}</p>
                </motion.article>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
