import { motion } from "framer-motion";
import { fadeUp, stagger, easeOut } from "../lib/motion";
import { experience } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  return (
    <section
      id="experiencia"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
    >
      <SectionHeader
        eyebrow="Trayectoria"
        title="El camino hasta aquí."
        description="Cada rol dejó una lección. Aquí un resumen honesto."
      />

      <motion.ol
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative mx-auto max-w-3xl"
      >
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: easeOut }}
          style={{ transformOrigin: "top" }}
          className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-accent via-border to-transparent"
        />

        {experience.map((item, i) => (
          <motion.li
            key={`${item.company}-${item.period}`}
            variants={fadeUp}
            className="relative pl-12 pb-12 last:pb-0"
          >
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.35,
                delay: 0.2 + i * 0.1,
                ease: easeOut,
              }}
              className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-bg"
            >
              <span className="h-2 w-2 rounded-full bg-accent" />
            </motion.span>

            <div className="rounded-2xl border border-border bg-bg-soft/50 p-6 backdrop-blur transition-colors duration-200 hover:border-fg-dim">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl font-medium text-fg">
                  {item.role}{" "}
                  <span className="text-fg-muted">· {item.company}</span>
                </h3>
                <span className="font-mono text-xs text-fg-dim">
                  {item.period}
                </span>
              </div>
              <p className="mt-3 text-fg-muted">{item.description}</p>
            </div>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  );
}
