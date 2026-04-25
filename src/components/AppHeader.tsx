import Link from "next/link";

type AppHeaderProps = {
  closeHref?: string;
};

export function AppHeader({ closeHref = "/" }: AppHeaderProps) {
  return (
    <header className="mx-auto flex w-full max-w-md items-center justify-between pt-2">
      <Link
        href="/"
        className="grid h-10 w-10 place-items-center rounded-full border border-white/75 bg-pearl/75 text-2xl leading-none text-bark shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25"
        aria-label="กลับหน้าหลัก"
      >
        ‹
      </Link>
      <p className="text-sm font-semibold tracking-wide text-cacao sm:text-base">Earth Tone Tarot <span className="text-moss">🌿</span></p>
      <Link
        href={closeHref}
        className="grid h-10 w-10 place-items-center rounded-full border border-white/75 bg-pearl/75 text-2xl leading-none text-bark shadow-sm transition hover:bg-white focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-moss/25"
        aria-label="ปิด"
      >
        ×
      </Link>
    </header>
  );
}
