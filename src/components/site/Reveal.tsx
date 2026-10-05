import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { type ReactNode } from "react";

/**
 * Coordinated scroll-reveal system for AICSSYC sections.
 *
 * Every section uses the same rhythm:
 *   1. Eyebrow slides in from the left (fast, decisive).
 *   2. Heading rises with a blur-clear (the hero beat).
 *   3. Body / supporting copy fades up.
 *   4. Card grids stagger in with a subtle scale.
 *
 * Wrap a section's top-level <div> in <RevealGroup>, then drop in
 * <Eyebrow>, <Heading>, <Body>, <RevealItem>, or <CardGrid> children.
 */

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const groupVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const eyebrowVariants: Variants = {
  hidden: { opacity: 0, x: -28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: EASE },
  },
};

export const headingVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const bodyVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: EASE },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, ease: EASE },
  },
};

export const cardGridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

export const accentLineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0 },
  show: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.9, ease: EASE },
  },
};

const viewport = { once: true, amount: 0.2 } as const;

type DivProps = HTMLMotionProps<"div">;

export function RevealGroup({ children, className, ...rest }: DivProps & { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={groupVariants}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({
  children,
  className,
  color = "gold",
}: {
  children: ReactNode;
  className?: string;
  color?: "gold" | "emerald";
}) {
  const c = color === "emerald" ? "text-emerald" : "text-gold";
  const bg = color === "emerald" ? "bg-emerald" : "bg-gold";
  return (
    <motion.p
      variants={eyebrowVariants}
      className={`text-xs uppercase tracking-[0.22em] font-medium ${c} ${className ?? ""}`}
    >
      <motion.span
        variants={accentLineVariants}
        style={{ originX: 0 }}
        className={`inline-block h-px w-8 align-middle mr-3 ${bg}`}
      />
      {children}
    </motion.p>
  );
}

export function Heading({
  as: Tag = "h2",
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  children: ReactNode;
  className?: string;
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag variants={headingVariants} className={className}>
      {children}
    </MotionTag>
  );
}

export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={bodyVariants} className={className}>
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  custom,
}: {
  children: ReactNode;
  className?: string;
  custom?: number;
}) {
  return (
    <motion.div variants={itemVariants} custom={custom} className={className}>
      {children}
    </motion.div>
  );
}

/**
 * CardGrid orchestrates a staggered reveal for any direct children.
 * Each direct child should be a <RevealItem> (or have variants={itemVariants}).
 */
export function CardGrid({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: 0.05 } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ----- Legacy single-shot API kept for compatibility ----- */

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

const legacyVariant = (dir: Direction, distance: number): Variants => {
  const base = { opacity: 0 };
  switch (dir) {
    case "up":
      return { hidden: { ...base, y: distance }, show: { opacity: 1, y: 0 } };
    case "down":
      return { hidden: { ...base, y: -distance }, show: { opacity: 1, y: 0 } };
    case "left":
      return { hidden: { ...base, x: distance }, show: { opacity: 1, x: 0 } };
    case "right":
      return { hidden: { ...base, x: -distance }, show: { opacity: 1, x: 0 } };
    case "scale":
      return { hidden: { ...base, scale: 0.86 }, show: { opacity: 1, scale: 1 } };
    case "blur":
      return {
        hidden: { ...base, y: distance },
        show: { opacity: 1, y: 0 },
      };
  }
};

export function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  distance = 48,
  once = true,
  className,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.25 }}
      variants={legacyVariant(direction, distance)}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
