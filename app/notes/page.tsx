import { getNotes } from '../api/route';
import Note from './Note';

export default async function Home() {
  const data = await getNotes();

  return (
    <main className="grid grid-cols-1 place-items-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.map((note: any) => (
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
