import prisma from '@/prisma/client';
import Note from './Note';

export default async function Home() {
  const data = await prisma.note.findMany();

  return (
    <main className="grid place-items-center lg:grid-cols-4">
      {data.map((note) => (
        <Note
          key={note.id}
          id={note.id}
          title={note.title}
          content={note.content ?? ''}
          published={note.published}
        />
      ))}
    </main>
  );
}
