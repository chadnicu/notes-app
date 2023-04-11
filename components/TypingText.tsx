'use client';

import { motion } from 'framer-motion';
import { textContainer, textVariant2 } from '../utils/motion';
import Link from 'next/link';

export const TypingText = () => (
  <motion.div initial="hidden" whileInView="show">
    <motion.h1
      variants={textContainer}
      className="text-5xl font-bold md:text-8xl"
    >
      {Array.from('Go to /notes').map((letter, index) => (
        <motion.span
          variants={textVariant2}
          key={index}
          className={`${index > 5 ? 'text-purple-400' : 'text-zinc-300'}`}
        >
          {letter === ' ' ? (
            '\u00A0'
          ) : index > 5 ? (
            <Link href="/notes">{letter}</Link>
          ) : (
            letter
          )}
        </motion.span>
      ))}
    </motion.h1>
  </motion.div>
);
