// not sure
// export const dynamic = 'auto';

import prisma from '@/prisma/client';
import Note from '../Note';
import Link from 'next/link';
import ArrowLeft from '@/components/ArrowLeft';

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await prisma.note.findUnique({
    where: { id: parseInt(params.slug) },
  });

  return (
    <main className="absolute inset-0 m-auto grid h-fit w-fit place-items-center gap-6">
      <Note
        id={data?.id ?? 0}
        title={data?.title ?? ''}
        content={data?.content ?? ''}
        published={data?.published ?? new Date()}
      />
      <Link
        href="/notes"
        className="flex items-center gap-1 md:hover:text-purple-400"
      >
        <ArrowLeft />
        <p>Go back</p>
      </Link>
    </main>
  );
}
