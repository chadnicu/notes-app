import prisma from '@/prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

type NoteProps = {
  id: number;
  title: string;
  content: string;
  published: Date;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(req.body.title, req.body.content, 'uiaiba');
  if (req.method === 'POST') {
    await prisma.note.create({
      data: {
        title: req.body.title,
        content: req.body.content
      },
    });
    res.status(200).json({ message: 'Updated' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
}
