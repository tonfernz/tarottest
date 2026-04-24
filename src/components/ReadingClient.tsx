"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
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
      <section className="flex flex-1 flex-col items-center justify-center text-center">
        <p className="text-sm font-semibold text-moss">ยังไม่มีไพ่ที่เลือก</p>
        <h1 className="mt-2 text-3xl font-bold text-cacao">กลับไปเลือกไพ่ 3 ใบก่อนเปิดคำทำนาย</h1>
        <Link
          href="/shuffle"
          className="mt-7 rounded-full bg-bark px-7 py-3 text-base font-bold text-cream shadow-soft transition hover:bg-cacao focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/35"
        >
          เริ่มสับไพ่
        </Link>
      </section>
    );
  }

  return (
    <section className="flex flex-1 flex-col items-center justify-center gap-8 py-6">
      <motion.div
        className="max-w-3xl text-center"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <p className="text-sm font-semibold text-moss">คำทำนาย 3 ใบ</p>
        <h1 className="mt-2 text-3xl font-bold text-cacao sm:text-4xl">ค่อย ๆ เปิดไพ่ทีละใบ</h1>
        <p className="mt-3 text-sm leading-7 text-bark/70 sm:text-base">
          แตะไพ่เพื่อเปิดหน้าไพ่ เมื่อเปิดแล้วแตะอีกครั้งเพื่ออ่านคำทำนายด้านการงาน การเงิน ความรัก และสุขภาพ
        </p>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
        {cards.map((card, index) => (
          <TarotCard
            key={card.id}
            card={card}
            faceUp={revealedIds.includes(card.id)}
            showName={revealedIds.includes(card.id)}
            index={index}
            onClick={() => handleCardClick(card)}
          />
        ))}
      </div>

      <Link href="/shuffle" className="text-sm font-semibold text-bark/65 transition hover:text-bark">
        สับไพ่ใหม่
      </Link>

      <CardDetailModal card={activeCard} onClose={() => setActiveCard(null)} />
    </section>
  );
}
