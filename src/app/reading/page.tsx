import { Suspense } from "react";
import { PageContainer } from "@/components/PageContainer";
import { ReadingClient } from "@/components/ReadingClient";

export default function ReadingPage() {
  return (
    <PageContainer>
      <Suspense>
        <ReadingClient />
      </Suspense>
    </PageContainer>
  );
}
