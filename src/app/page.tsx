"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PageContainer } from "@/components/PageContainer";

export default function HomePage() {
  return (
    <PageContainer className="justify-center">
      <section className="mx-auto grid w-full max-w-5xl items-center gap-10 py-8 lg:grid-cols-[1fr_0.82fr]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-moss">Three Card Reading</p>
          <h1 className="mt-5 text-4xl font-bold leading-tight text-cacao sm:text-6xl">
            เปิดพื้นที่สงบให้ไพ่เล่าเรื่องของคุณ
          </h1>
          <p className="mt-5 max-w-xl text-base leading-8 text-bark/72 sm:text-lg">
            เลือกไพ่ 3 ใบเพื่อรับคำทำนายที่นุ่มนวลและตรงประเด็น ครอบคลุมการงาน การเงิน ความรัก และสุขภาพในจังหวะชีวิตตอนนี้
          </p>
          <motion.div className="mt-8" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/shuffle"
              className="inline-flex rounded-full bg-bark px-8 py-3.5 text-base font-bold text-cream shadow-soft transition hover:bg-cacao focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/35"
            >
              เริ่มสับไพ่
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.12 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div className="absolute inset-8 rounded-[2rem] bg-moss/25 blur-3xl" />
          <div className="absolute left-10 top-8 h-[72%] w-[58%] rotate-[-10deg] rounded-[1.6rem] border border-white/75 bg-linen shadow-soft" />
          <div className="absolute right-5 top-16 h-[72%] w-[58%] rotate-[9deg] rounded-[1.6rem] border border-white/75 bg-sage shadow-soft" />
          <div className="absolute left-1/2 top-1/2 h-[78%] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] border border-white/80 bg-cream p-4 shadow-soft">
            <div className="grid h-full place-items-center rounded-[1.25rem] border border-bark/10 bg-[linear-gradient(135deg,rgba(196,204,177,0.55),rgba(185,120,95,0.18))]">
              <div className="h-24 w-24 rounded-full border border-bark/20 bg-cream/45 shadow-inner" />
            </div>
          </div>
        </motion.div>
      </section>
    </PageContainer>
  );
}
