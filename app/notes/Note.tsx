'use client';

import Pencil from '@/components/Pencil';
import Check from '@/components/Check';
import Trash from '@/components/Trash';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

type NoteProps = {
  id: number;
  title: string;
  content: string;
  published: Date;
};

export default function Note({ id, title, content, published }: NoteProps) {
  const router = useRouter();

  const [editable, setEditable] = useState(false);

  let newTitle = useRef(title);
  let newContent = useRef(content);

  function handleTitle(e: any) {
    newTitle.current = e.currentTarget.textContent;
  }

  function handleContent(e: any) {
    newContent.current = e.currentTarget.textContent;
  }

  async function handleEdit() {
    setEditable(!editable);
    if (!editable) {
      return;
    }

    await fetch('/api', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
        title: newTitle.current,
        content: newContent.current,
      }),
    });

    router.refresh();
  }

  async function handleDelete() {
    await fetch('/api', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id,
      }),
    });

    router.refresh();
  }

  return (
    <div className="flex h-fit w-72 flex-col gap-3 break-words rounded-md bg-slate-800 p-5 text-center">
      {/* <p className="text-left">{id}</p> */}
      <div className="flex justify-between">
        <button onClick={handleEdit} className="md:hover:text-purple-400">
          {editable ? <Check /> : <Pencil />}
        </button>
        <button onClick={handleDelete} className="md:hover:text-purple-400">
          <Trash />
        </button>
      </div>
      <h1
        onInput={handleTitle}
        contentEditable={editable}
        className={`text-2xl font-medium ${
          editable ? 'border border-slate-500 p-2' : ''
        }`}
      >
        {title}
      </h1>
      <p
        onInput={handleContent}
        contentEditable={editable}
        className={`text-lg ${editable ? 'border border-slate-500 p-2' : ''}`}
      >
        {content}
      </p>
      <p className="text-right text-xs">{published.toString().slice(0, 10)}</p>
    </div>
  );
}
