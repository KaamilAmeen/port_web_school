"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedText({
  text,
  className,
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={cn(className)} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-bottom"
          initial={reduceMotion ? false : { opacity: 0, y: "0.45em" }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduceMotion ? 0 : 0.7,
            delay: reduceMotion ? 0 : delay + index * 0.045,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span className="inline-block pb-[0.08em]">{word}&nbsp;</span>
        </motion.span>
      ))}
    </span>
  );
}
