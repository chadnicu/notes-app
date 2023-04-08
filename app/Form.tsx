'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

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
          className="border-4 border-zinc-500 p-3 text-xl"
        >
          New Note
        </button>
      ) : (
        <div className="w-full max-w-xs">
          <form className="absolute top-0 right-0 m-5 mb-4 rounded border-2 bg-white px-8 pb-8 pt-6">
            <button
              onClick={() => setActive(!active)}
              className="absolute right-5 top-3 text-xl"
            >
              x
            </button>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Title
              </label>
              <input
                className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                type="text"
                placeholder="title"
                onChange={handleTitle}
              />
            </div>
            <div className="mb-6">
              <label className="mb-2 block text-sm font-bold text-gray-700">
                Content
              </label>
              <textarea
                className="focus:shadow-outline mb-3 min-h-[100px] w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                placeholder="content"
                onChange={handleContent}
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
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
