"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { AppHeader } from "@/components/AppHeader";
import { CardDetailModal } from "@/components/CardDetailModal";
import { TarotCard } from "@/components/TarotCard";
import { getCardsByIds } from "@/lib/tarot";
import type { TarotCardData } from "@/types/tarot";

export function ReadingClient() {
  const searchParams = useSearchParams();
  const ids = useMemo(() => searchParams.get("ids")?.split(",").filter(Boolean) ?? [], [searchParams]);
  const cards = useMemo(() => getCardsByIds(ids), [ids]);
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [activeCard, setActiveCard] = useState<TarotCardData | null>(null);

  function handleCardClick(card: TarotCardData) {
    if (!revealedIds.includes(card.id)) {
      setRevealedIds((currentIds) => [...currentIds, card.id]);
      return;
    }

    setActiveCard(card);
  }

  if (cards.length !== 3) {
    return (
      <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-md flex-col items-center justify-center rounded-[1.8rem] border border-white/70 bg-pearl/55 px-5 text-center shadow-soft">
        <p className="text-sm font-bold text-olive">ยังไม่มีไพ่ที่เลือก</p>
        <h1 className="mt-2 text-2xl font-bold text-cacao">กลับไปเลือกไพ่ 3 ใบก่อนเปิดคำทำนาย</h1>
        <Link
          href="/shuffle"
          className="mt-7 rounded-full bg-olive px-7 py-3 text-base font-bold text-cream shadow-glow transition hover:bg-moss focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/35"
        >
          เริ่มสับไพ่
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto flex min-h-[calc(100vh-1.5rem)] w-full max-w-md flex-col gap-4 overflow-hidden rounded-[1.8rem] border border-white/70 bg-pearl/45 px-4 pb-5 shadow-soft sm:min-h-0 sm:max-w-5xl sm:gap-7 sm:rounded-none sm:border-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:shadow-none">
      <AppHeader closeHref="/shuffle" />

      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="text-xs font-bold text-olive sm:text-sm">คำทำนาย 3 ใบ</p>
        <h1 className="mt-1 text-2xl font-bold leading-tight text-cacao sm:text-4xl">ค่อย ๆ เปิดไพ่ทีละใบ</h1>
        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-bark/65 sm:text-sm sm:leading-7">
          แตะครั้งแรกเพื่อเปิดหน้าไพ่ และแตะอีกครั้งเพื่อดูรายละเอียดคำทำนาย
        </p>
      </motion.div>

      <div className="mx-auto grid w-full max-w-[22rem] grid-cols-3 gap-3 rounded-[1.5rem] border border-white/80 bg-pearl/75 p-3 shadow-soft sm:max-w-4xl sm:gap-6 sm:p-5">
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            card={card}
            faceUp={revealedIds.includes(card.id)}
            showName={revealedIds.includes(card.id)}
            labelMode="english-only"
            index={index}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <Link href="/shuffle" className="text-center text-sm font-semibold text-bark/65 transition hover:text-bark">
        สับไพ่ใหม่
      </Link>

      <CardDetailModal card={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}
