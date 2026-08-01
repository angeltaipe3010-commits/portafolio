import { motion } from "framer-motion";
import { fadeUp, stagger } from "../lib/motion";

type Props = {
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({ eyebrow, title, description }: Props) {
  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className="mb-16 max-w-3xl"
    >
      <motion.div
        variants={fadeUp}
        className="mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-accent"
      >
        <span className="h-px w-8 bg-accent" />
        {eyebrow}
      </motion.div>
      <motion.h2
        variants={fadeUp}
        className="tracking-display font-display text-balance text-4xl font-semibold text-fg sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="mt-6 text-balance text-lg text-fg-muted"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
