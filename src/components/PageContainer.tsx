import type { ReactNode } from "react";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
};

export function PageContainer({ children, className = "" }: PageContainerProps) {
  return (
    <main className={`mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-3 sm:px-8 sm:py-6 lg:px-10 ${className}`}>
      {children}
    </main>
  );
}
