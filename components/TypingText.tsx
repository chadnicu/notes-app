'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const textContainer = {
  hidden: {
    opacity: 0,
  },
  show: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
  }),
};

export const textVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      ease: 'easeIn',
    },
  },
};

export const TypingText = () => (
  <motion.div initial="hidden" whileInView="show">
    <motion.h1
      variants={textContainer}
      className="text-5xl font-bold md:text-8xl"
    >
      {Array.from('Go to /notes').map((letter, index) => (
        <motion.span
          variants={textVariant}
          key={index}
          className={`${index > 5 ? 'text-purple-400' : 'text-foreground'}`}
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
