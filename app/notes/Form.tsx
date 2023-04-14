'use client';

import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import XMark from '@/components/XMark';
import PencilSquare from '@/components/PencilSquare';

export default function Form() {
  const pathname = usePathname();

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

    await fetch('/api', {
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
          className={`text-zinc-300 md:hover:text-purple-400 ${
            pathname !== '/notes' ? 'hidden' : ''
          }`}
        >
          <PencilSquare />
        </button>
      ) : (
        <div className="min-h-[40px] w-full max-w-xs">
          <form className="absolute left-0 right-0 z-10 m-auto w-fit rounded-md bg-zinc-800 p-8 text-zinc-300 shadow-xl shadow-zinc-900 md:left-auto md:right-12 md:m-0">
            <button
              onClick={() => setActive(!active)}
              type="button"
              className="right-4 top-4 float-right md:absolute md:float-none md:hover:text-purple-400 "
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
                className="font-bold focus:outline-none  md:hover:text-purple-400"
                type="submit"
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
