"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { TarotCardData } from "@/types/tarot";

const meaningSections = [
  { key: "work", label: "การงาน" },
  { key: "money", label: "การเงิน" },
  { key: "love", label: "ความรัก" },
  { key: "health", label: "สุขภาพ" }
] as const;

type CardDetailModalProps = {
  card: TarotCardData | null;
  onClose: () => void;
};

export function CardDetailModal({ card, onClose }: CardDetailModalProps) {
  return (
    <AnimatePresence>
      {card ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-cacao/35 px-4 py-4 backdrop-blur-sm sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            aria-labelledby="card-detail-title"
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ duration: 0.28 }}
            onClick={(event) => event.stopPropagation()}
            className="max-h-[88vh] w-full max-w-4xl overflow-y-auto rounded-[1.5rem] border border-white/70 bg-cream p-5 shadow-soft sm:p-7"
          >
            <div className="grid gap-6 md:grid-cols-[13rem_1fr]">
              <motion.div
                initial={{ opacity: 0, y: 18, rotate: -2 }}
                animate={{ opacity: 1, y: 0, rotate: 0 }}
                transition={{ duration: 0.36, delay: 0.04 }}
                className="mx-auto w-44 md:w-full"
              >
                <div className="relative aspect-[11/19] overflow-hidden rounded-[1.25rem] border border-white/80 bg-linen shadow-soft">
                  <Image
                    src={card.image}
                    alt={card.name_th}
                    fill
                    sizes="(max-width: 768px) 176px, 208px"
                    className="object-contain"
                    priority
                  />
                </div>
              </motion.div>

              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold text-moss">คำทำนายไพ่</p>
                    <h2 id="card-detail-title" className="mt-1 text-2xl font-bold text-cacao sm:text-3xl">
                      {card.name_th}
                    </h2>
                    <p className="text-sm text-bark/60">{card.name_en}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-linen text-xl leading-none text-bark shadow-sm transition hover:bg-sand focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/30"
                    aria-label="ปิด"
                  >
                    ×
                  </button>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {card.keywords.map((keyword) => (
                    <span key={keyword} className="rounded-full bg-sage/45 px-3 py-1 text-xs font-semibold text-bark">
                      {keyword}
                    </span>
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {meaningSections.map((section) => (
                    <article key={section.key} className="rounded-2xl border border-white/75 bg-white/45 p-4 shadow-sm">
                      <h3 className="text-base font-bold text-cacao">{section.label}</h3>
                      <p className="mt-2 text-sm leading-7 text-bark/80">{card.meaning[section.key]}</p>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
