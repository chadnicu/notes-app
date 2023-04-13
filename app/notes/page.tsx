export const dynamic = 'auto';

import prisma from '@/prisma/client';
import Note from './Note';
import PencilSquare from '@/components/PencilSquare';
import Page from '../note/[slug]/page';
import Link from 'next/link';

export default async function Home() {
  const data = await prisma.note.findMany();

  return (
    <main className="grid grid-cols-1 place-items-center gap-10 py-10 md:grid-cols-2 md:place-items-start md:p-10 lg:grid-cols-3 xl:grid-cols-4">
      {data.length === 0 && (
        <p className="inset-0 m-auto flex h-6 w-80 justify-center gap-1 text-center md:absolute">
          There{"'"}s no notes. Click <PencilSquare size={5} />
          to add some
        </p>
      )}
      {data.map((note: any) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content ?? ''}
          // published={note.published}
        />
      ))}
    </main>
  );
}
