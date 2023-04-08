'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import PencilSquare from '@/components/PencilSquare';
import XMark from '@/components/XMark';

export default function Form() {
  const router = useRouter();

  const [active, setActive] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  function handleTitle(e: any) {
    setTitle(e.target.value);
  }

  function handleContent(e: any) {
    setContent(e.target.value);
  }

  const create = async () => {
    if (title === '') return;

    setActive(false);

    await fetch('/api/postNote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });

    setTitle('');
    setContent('');

    router.refresh();
  };

  return (
    <>
      {!active ? (
        <button
          onClick={() => setActive(!active)}
          className="h-10 w-10 text-purple-400 md:text-slate-200 md:hover:text-purple-400"
        >
          <PencilSquare />
        </button>
      ) : (
        <div className="min-h-[40px] w-full max-w-xs">
          <form className="mb-4 rounded-md bg-slate-800 px-8 pb-8 pt-6 text-slate-200 md:absolute md:right-12 md:mb-0">
            <button
              onClick={() => setActive(!active)}
              className="float-right md:float-none md:absolute right-4 top-4 h-8 w-8 text-purple-400 md:text-slate-200 md:hover:text-purple-400 "
            >
              <XMark />
            </button>
            <div className="my-5">
              <label className="mb-2 block text-sm font-bold">Title</label>
              <input
                className="w-full appearance-none rounded bg-transparent px-3 py-2 focus:outline-none"
                type="text"
                placeholder="title"
                onChange={handleTitle}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold ">Content</label>
              <textarea
                className="mb-3 min-h-[100px] w-full appearance-none rounded bg-transparent px-3 py-2 focus:outline-none"
                placeholder="content"
                onChange={handleContent}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="font-bold text-purple-400 focus:outline-none md:text-slate-200 md:hover:text-purple-400"
                type="button"
                onClick={create}
              >
                Post
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
