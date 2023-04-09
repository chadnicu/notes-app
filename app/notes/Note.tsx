'use client';

import Pencil from '@/components/Pencil';
import Trash from '@/components/Trash';
import { useState } from 'react';

type NoteProps = {
  id: number;
  title: string;
  content: string;
  published: Date;
};

export default function Note({ id, title, content, published }: NoteProps) {
  const [editable, setEditable] = useState(false);

  function handleEdit() {
    setEditable(!editable);
  }

  return (
    <div className="flex h-fit w-72 flex-col gap-2 break-words rounded-md bg-slate-800 p-5 text-center">
      {/* <p className="text-left">{id}</p> */}
      <div className="flex justify-between">
        <button
          onClick={handleEdit}
          className={`${
            editable ? 'text-purple-400' : 'md:hover:text-purple-400'
          }`}
        >
          <Pencil />
        </button>
        <button className="md:hover:text-purple-400">
          <Trash />
        </button>
      </div>
      <h1 className="text-2xl font-medium">{title}</h1>
      <p className="text-lg">{content}</p>
      <p className="text-right text-xs">{published.toString().slice(0, 10)}</p>
    </div>
  );
}
