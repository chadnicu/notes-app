import { getNotes } from './api/getNotes/getNotes';
import Form from './Form';
import Note from './components/Note';
// import { postNote } from './api/notes/postNote';

export default async function Home() {
  const data = await getNotes();
  // console.log(data);

  return (
    <main className="grid lg:grid-cols-4 place-items-center">
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
