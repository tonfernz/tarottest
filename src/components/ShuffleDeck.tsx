"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { SelectedCards } from "@/components/SelectedCards";
import { CARD_BACK_IMAGE, SELECTED_CARD_LIMIT, allTarotCards, shuffleArray, withBasePath } from "@/lib/tarot";
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
    }, 1500);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedCount = selectedIds.length;
  const canReveal = selectedCount === SELECTED_CARD_LIMIT;
  const nextCard = cards.find((card) => !selectedIds.includes(card.id));
  const deckCards = useMemo(() => Array.from({ length: 8 }), []);

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
    if (canReveal) {
      router.push(`/reading?ids=${selectedIds.join(",")}`);
    }
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-md flex-col gap-3 overflow-hidden rounded-[1.8rem] border border-white/70 bg-pearl/40 px-4 pb-4 shadow-soft sm:min-h-0 sm:max-w-5xl sm:gap-7 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:shadow-none">
      <AppHeader />

      <div className="text-center">
        <p className="text-xs font-bold text-olive sm:text-sm">เลือกไพ่ 3 ใบ</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-cacao sm:text-4xl">ตั้งใจถาม แล้วเลือกไพ่ที่ดึงดูดใจ</h1>
        <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-bark/65 sm:text-sm sm:leading-7">
          โฟกัสกับคำถามของคุณ แล้วเลือกไพ่ที่รู้สึกเชื่อมโยงมากที่สุด
        </p>
      </div>

      <SelectedCards selectedCount={selectedCount} />

      <AnimatePresence mode="wait">
        {isShuffling ? (
          <motion.div
            key="shuffling"
            className="relative mx-auto mt-1 h-[13.5rem] w-[7.85rem] sm:h-[22.5rem] sm:w-[12.6rem]"
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute -inset-8 rounded-full bg-sand/15 blur-3xl" />
            {deckCards.map((_, index) => (
              <motion.div
                key={index}
                className="absolute inset-0 overflow-hidden rounded-[1.2rem] border border-white/80 bg-blush sm:rounded-[1.35rem]"
                animate={{
                  scaleY: [1, 0.99, 1],
                  x: [0, index % 2 === 0 ? -10 : 10, 0],
                  y: [0, index % 2 === 0 ? -3 : 3, 0],
                  rotate: [0, index % 2 === 0 ? -3.5 : 3.5, 0]
                }}
                transition={{
                  duration: 0.5,
                  repeat: 2,
                  repeatType: "mirror",
                  delay: index * 0.02,
                  ease: "easeInOut"
                }}
                style={{ zIndex: deckCards.length - index }}
              >
                <Image src={withBasePath(CARD_BACK_IMAGE)} alt="" fill sizes="224px" className="object-contain" priority />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="draw"
            className="grid flex-1 items-center gap-3 sm:grid-cols-[1fr_1.05fr] sm:gap-7"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative flex items-center justify-center">
              <div className="pointer-events-none absolute inset-x-4 top-1/2 h-32 -translate-y-1/2 rounded-full border border-sand/45" />
              <div className="pointer-events-none absolute left-2 top-8 hidden text-3xl text-sand/70 sm:block">✦</div>
              <div className="pointer-events-none absolute bottom-8 right-2 hidden text-3xl text-sand/70 sm:block">✦</div>

              <motion.button
                type="button"
                onClick={drawCard}
                disabled={!nextCard || selectedCount >= SELECTED_CARD_LIMIT}
                whileHover={selectedCount < SELECTED_CARD_LIMIT ? { y: -3, scale: 1.01 } : undefined}
                whileTap={selectedCount < SELECTED_CARD_LIMIT ? { scale: 0.975 } : undefined}
                className="group relative h-[11.9rem] w-[7rem] outline-none disabled:cursor-not-allowed sm:h-[23.4rem] sm:w-[13.5rem]"
                aria-label="เลือกไพ่จากกอง"
              >
                <span className="absolute -inset-5 rounded-full bg-clay/10 blur-3xl transition group-hover:bg-clay/15" />
                {deckCards.map((_, index) => (
                  <motion.span
                    key={index}
                    className="absolute inset-0 overflow-hidden rounded-[1.12rem] border border-white/80 bg-blush sm:rounded-[1.4rem]"
                    initial={{ opacity: 0, y: 16, rotate: 0 }}
                    animate={{
                      opacity: selectedCount >= SELECTED_CARD_LIMIT && index < 3 ? 0 : 1,
                      x: (index - 3.5) * 0.9,
                      y: index * -1,
                      rotate: (index - 3.5) * 0.45
                    }}
                    transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1], delay: index * 0.01 }}
                    style={{ zIndex: deckCards.length - index }}
                  >
                    <Image src={withBasePath(CARD_BACK_IMAGE)} alt="" fill sizes="240px" className="object-contain" priority={index > 5} />
                  </motion.span>
                ))}

                <AnimatePresence>
                  {drawAnimationKey > 0 ? (
                    <motion.span
                      key={drawAnimationKey}
                      className="absolute inset-0 overflow-hidden rounded-[1.12rem] border border-olive/40 bg-blush sm:rounded-[1.4rem]"
                      initial={{ opacity: 0, x: 0, y: 0, rotate: 0, scale: 1 }}
                      animate={{ opacity: [0, 0.9, 0], x: [0, 32, 44], y: [0, -22, -10], rotate: [0, 4, 3], scale: [1, 0.9, 0.84] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                      style={{ zIndex: deckCards.length + 1, pointerEvents: "none" }}
                    >
                      <Image src={withBasePath(CARD_BACK_IMAGE)} alt="" fill sizes="240px" className="object-contain" />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="rounded-[1.5rem] border border-white/80 bg-pearl/75 p-3 shadow-sm sm:p-5">
              <p className="text-center text-sm font-bold text-bark">ไพ่ที่เลือก ({selectedCount}/3)</p>
              <div className="mx-auto mt-3 grid max-w-[13.5rem] grid-cols-3 gap-1.5 sm:mt-4 sm:max-w-none sm:gap-3">
                {Array.from({ length: SELECTED_CARD_LIMIT }).map((_, index) => {
                  const isSelected = index < selectedCount;

                  return (
                    <motion.div
                      key={index}
                      animate={{
                        y: isSelected ? -3 : 0,
                        scale: isSelected ? 1 : 0.98,
                        borderColor: isSelected ? "#66734d" : "rgba(185, 120, 95, 0.28)"
                      }}
                      transition={{ type: "spring", stiffness: 230, damping: 22 }}
                      className="relative aspect-[11/19] overflow-hidden rounded-[0.75rem] border border-dashed bg-cream/50 sm:rounded-[0.9rem]"
                    >
                      {isSelected ? (
                        <>
                          <Image src={withBasePath(CARD_BACK_IMAGE)} alt="" fill sizes="96px" className="object-contain" />
                          <span className="absolute bottom-1 right-1 grid h-5 w-5 place-items-center rounded-full bg-olive text-xs font-bold text-cream shadow-sm">
                            ✓
                          </span>
                        </>
                      ) : (
                        <span className="grid h-full place-items-center text-lg font-bold text-bark/25">{index + 1}</span>
                      )}
                    </motion.div>
                  );
                })}
              </div>

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
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-3 flex w-full items-center justify-center gap-3 rounded-full bg-olive px-6 py-3 text-sm font-bold text-cream shadow-glow transition hover:bg-moss focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/35 sm:mt-5 sm:text-base"
                  >
                    <span>✦</span>
                    เปิดคำทำนาย
                    <span>✦</span>
                  </motion.button>
                ) : (
                  <p className="mt-3 text-center text-xs font-semibold text-bark/55 sm:mt-5">เลือกไพ่ให้ครบ 3 ใบ เพื่อเปิดคำทำนาย</p>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
