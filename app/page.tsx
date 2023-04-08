import Link from 'next/link';
import prisma from '@/prisma/client';

export default async function Home() {
  const data = await prisma.note.findMany();

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold">Welcome</h1>
      <Link
        href="/notes"
        className="text-5xl font-bold text-purple-400 md:text-slate-200 md:hover:text-purple-400"
      >
        Go to /notes
      </Link>
    </main>
  );
}
