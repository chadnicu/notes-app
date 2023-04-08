// import { getNotes } from './api/getNotes/getNotes';
import { cache } from 'react';
import Form from './Form';
import Note from './components/Note';
import prisma from '@/prisma/client';
// import { postNote } from './api/notes/postNote';

export default async function Home() {
  // const data = await getNotes();
  const data = await prisma.note.findMany();
  fetch(data.toString(), { cache: 'no-store' });

  // console.log(data);

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
