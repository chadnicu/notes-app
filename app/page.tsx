import Link from 'next/link';

export default async function Home() {
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-5">
      <h1 className="text-5xl font-bold md:text-8xl">Welcome</h1>
      <Link
        href="/notes"
        className="text-5xl font-bold text-purple-400 md:text-8xl"
      >
        Go to /notes
      </Link>
    </main>
  );
}
  