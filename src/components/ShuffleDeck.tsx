"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CARD_BACK_IMAGE, SELECTED_CARD_LIMIT, allTarotCards, shuffleArray } from "@/lib/tarot";
import { SelectedCards } from "@/components/SelectedCards";
import type { TarotCardData } from "@/types/tarot";

export function ShuffleDeck() {
  const router = useRouter();
  const [isShuffling, setIsShuffling] = useState(true);
  const [cards, setCards] = useState<TarotCardData[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drawAnimationKey, setDrawAnimationKey] = useState(0);

  useEffect(() => {
    const shuffledCards = shuffleArray(allTarotCards).slice(0, 12);
    const timer = window.setTimeout(() => {
      setCards(shuffledCards);
      setIsShuffling(false);
    }, 1700);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedCount = selectedIds.length;
  const canReveal = selectedCount === SELECTED_CARD_LIMIT;
  const nextCard = cards.find((card) => !selectedIds.includes(card.id));

  const deckCards = useMemo(() => Array.from({ length: 9 }), []);

  function drawCard() {
    if (!nextCard || selectedIds.length >= SELECTED_CARD_LIMIT) {
      return;
    }

    setDrawAnimationKey((currentKey) => currentKey + 1);
    setSelectedIds((currentIds) => {
      if (currentIds.length >= SELECTED_CARD_LIMIT) {
        return currentIds;
      }

      return [...currentIds, nextCard.id];
    });
  }

  function openReading() {
    if (!canReveal) {
      return;
    }

    router.push(`/reading?ids=${selectedIds.join(",")}`);
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 py-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-moss">เลือกไพ่ 3 ใบ</p>
        <h1 className="mt-2 text-3xl font-bold text-cacao sm:text-4xl">ตั้งใจถาม แล้วเลือกไพ่ที่ดึงดูดใจ</h1>
      </div>

      <AnimatePresence mode="wait">
        {isShuffling ? (
          <motion.div
            key="shuffling"
            className="relative h-[22rem] w-52 sm:h-[26rem] sm:w-60"
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.35 }}
          >
            {deckCards.map((_, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 overflow-hidden rounded-[1.45rem] border border-white/70 bg-linen shadow-soft"
                animate={{
                  x: [0, index % 2 === 0 ? -38 : 38, 0],
                  y: [0, -12, 0],
                  rotate: [0, index % 2 === 0 ? -14 : 14, 0]
                }}
                transition={{
                  duration: 0.7,
                  repeat: 2,
                  delay: index * 0.08,
                  ease: "easeInOut"
                }}
                style={{ zIndex: deckCards.length - index }}
              >
                <Image src={CARD_BACK_IMAGE} alt="" fill sizes="240px" className="object-contain" priority />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="cards"
            className="flex w-full flex-col items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <SelectedCards selectedCount={selectedCount} />
            <div className="mt-8 grid w-full max-w-4xl items-center gap-8 lg:grid-cols-[1fr_1.05fr]">
              <div className="flex flex-col items-center gap-5">
                <motion.button
                  type="button"
                  onClick={drawCard}
                  disabled={!nextCard || selectedCount >= SELECTED_CARD_LIMIT}
                  whileHover={selectedCount < SELECTED_CARD_LIMIT ? { y: -4, scale: 1.015 } : undefined}
                  whileTap={selectedCount < SELECTED_CARD_LIMIT ? { scale: 0.98 } : undefined}
                  className="group relative h-[24rem] w-56 outline-none disabled:cursor-not-allowed sm:h-[28rem] sm:w-64"
                  aria-label="เลือกไพ่จากกอง"
                >
                  <span className="absolute -inset-8 rounded-full bg-moss/15 blur-3xl transition group-hover:bg-moss/20" />
                  {deckCards.map((_, index) => {
                    const depth = deckCards.length - index;

                    return (
                      <motion.span
                        key={index}
                        className="absolute inset-0 overflow-hidden rounded-[1.55rem] border border-white/80 bg-linen shadow-soft"
                        initial={{ opacity: 0, y: 18, rotate: 0 }}
                        animate={{
                          opacity: selectedCount >= SELECTED_CARD_LIMIT && index < 3 ? 0 : 1,
                          x: (index - 4) * 1.4,
                          y: index * -1.5,
                          rotate: (index - 4) * 0.75
                        }}
                        transition={{ duration: 0.34, delay: index * 0.02 }}
                        style={{ zIndex: depth }}
                      >
                        <Image src={CARD_BACK_IMAGE} alt="" fill sizes="256px" className="object-contain" priority={index > 5} />
                      </motion.span>
                    );
                  })}

                  <AnimatePresence>
                    {drawAnimationKey > 0 ? (
                      <motion.span
                        key={drawAnimationKey}
                        className="absolute inset-0 overflow-hidden rounded-[1.55rem] border border-moss/50 bg-linen shadow-glow"
                        initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }}
                        animate={{ opacity: [0, 0.95, 0], x: [0, 96, 132], y: [0, -52, -20], rotate: [0, 12, 8], scale: [1, 0.92, 0.86] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                        style={{ zIndex: deckCards.length + 1, pointerEvents: "none" }}
                      >
                        <Image src={CARD_BACK_IMAGE} alt="" fill sizes="256px" className="object-contain" />
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </motion.button>

                <p className="max-w-xs text-center text-sm leading-7 text-bark/70">
                  แตะกองไพ่เพื่อเลือกทีละใบ ระบบจะเก็บไพ่ที่เลือกไว้โดยไม่เปิดหน้าจนกว่าจะถึงหน้าคำทำนาย
                </p>
              </div>

              <div className="rounded-[1.5rem] border border-white/75 bg-white/35 p-5 shadow-soft">
                <p className="text-sm font-semibold text-moss">ไพ่ที่เลือก</p>
                <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
                  {Array.from({ length: SELECTED_CARD_LIMIT }).map((_, index) => {
                    const isSelected = index < selectedCount;

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{
                          opacity: isSelected ? 1 : 0.42,
                          y: 0,
                          scale: isSelected ? 1 : 0.96
                        }}
                        className="relative aspect-[11/19] overflow-hidden rounded-[1rem] border border-white/80 bg-linen shadow-sm"
                      >
                        {isSelected ? (
                          <Image src={CARD_BACK_IMAGE} alt="" fill sizes="120px" className="object-contain" />
                        ) : (
                          <span className="grid h-full place-items-center text-2xl font-semibold text-bark/20">{index + 1}</span>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {canReveal ? (
          <motion.button
            type="button"
            onClick={openReading}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-full bg-bark px-8 py-3 text-base font-bold text-cream shadow-soft transition hover:bg-cacao focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/35"
          >
            เปิดคำทำนาย
          </motion.button>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
