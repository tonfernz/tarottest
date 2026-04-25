"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { withBasePath } from "@/lib/tarot";
import type { TarotCardData } from "@/types/tarot";

const meaningSections = [
  { key: "work", label: "การงาน", icon: "▣" },
  { key: "money", label: "การเงิน", icon: "◇" },
  { key: "love", label: "ความรัก", icon: "♡" },
  { key: "health", label: "สุขภาพ", icon: "＋" }
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
          className="fixed inset-0 z-50 flex items-end justify-center bg-cacao/45 px-0 backdrop-blur-sm sm:px-4 sm:py-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.28 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-detail-title"
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 48 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            onClick={(event) => event.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] border border-white/70 bg-pearl p-5 shadow-soft sm:max-h-[88vh] sm:rounded-[1.8rem] sm:p-7"
          >
            <div className="sticky top-0 z-20 -mx-5 -mt-5 flex items-center justify-center bg-pearl/95 px-5 pb-3 pt-4 backdrop-blur sm:-mx-7 sm:-mt-7 sm:px-7">
              <span className="h-1 w-12 rounded-full bg-bark/20" />
              <button
                type="button"
                onClick={onClose}
                className="absolute right-5 top-3 grid h-10 w-10 place-items-center text-3xl leading-none text-bark transition hover:scale-105 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25"
                aria-label="ปิด"
              >
                ×
              </button>
            </div>

            <motion.div
              className="grid grid-cols-[8rem_1fr] items-start gap-4 sm:grid-cols-[11rem_1fr] sm:gap-6"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.32, delay: 0.08 }}
            >
              <div>
                <div className="w-full">
                  <div className="relative aspect-[11/19] overflow-hidden rounded-[1.15rem] shadow-soft">
                    <Image
                      src={withBasePath(card.image)}
                      alt={card.name_th}
                      fill
                      sizes="(max-width: 640px) 128px, 176px"
                      className="object-contain"
                      priority
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-bold text-olive">🌿 คำทำนายไพ่</p>
                <h2 id="card-detail-title" className="mt-2 text-3xl font-bold leading-tight text-cacao sm:text-5xl">
                  {card.name_en}
                </h2>
                <p className="mt-1 text-sm font-semibold text-bark/60 sm:text-base">{card.name_th}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.keywords.slice(0, 5).map((keyword) => (
                    <span key={keyword} className="rounded-full bg-linen px-3 py-1.5 text-xs font-semibold text-bark/75">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="mt-5 grid grid-cols-4 gap-1 rounded-full border border-sand/60 bg-cream p-1 shadow-sm">
              {meaningSections.map((section) => {
                const isActive = section.key === activeMeaning;

                return (
                  <button
                    key={section.key}
                    type="button"
                    onClick={() => setActiveMeaning(section.key)}
                    className={`relative rounded-full px-2 py-2 text-xs font-bold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25 sm:text-sm ${
                      isActive ? "text-cream" : "text-bark/70 hover:text-bark"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="active-meaning-tab"
                        className="absolute inset-0 rounded-full bg-olive shadow-sm"
                        transition={{ type: "spring", stiffness: 260, damping: 28 }}
                      />
                    ) : null}
                    <span className="relative z-10">{section.label}</span>
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.article
                key={activeMeaning}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="mt-4 rounded-[1.35rem] border border-white/80 bg-white/50 p-5 shadow-soft"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-sand/55 text-sm font-bold text-olive">{activeSection.icon}</span>
                  <h3 className="text-xl font-bold text-cacao">{activeSection.label}</h3>
                </div>
                <p className="mt-4 text-base leading-8 text-bark/80">{card.meaning[activeSection.key]}</p>
              </motion.article>
            </AnimatePresence>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
