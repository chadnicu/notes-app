'use client';

import { TypingText } from '@/components/TypingText';

export default function Home() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold md:text-8xl">Welcome</h1>
      <TypingText />
    </main>
  );
}
