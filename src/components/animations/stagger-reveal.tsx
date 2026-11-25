"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export function StaggerReveal({
  children,
  className,
  itemClassName,
}: {
  children: ReactNode;
  className?: string;
  itemClassName?: string;
}) {
  const reduceMotion = useReducedMotion();
  const items = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.09 } },
      }}
    >
      {items.map((child, index) => (
        <motion.div
          key={index}
          className={itemClassName}
          variants={{
            hidden: reduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.5 } },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
