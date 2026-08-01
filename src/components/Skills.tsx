import { motion } from "framer-motion";
import { fadeUp, stagger, easeOut, dur } from "../lib/motion";
import { skillGroups } from "../data/portfolio";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
    >
      <SectionHeader
        eyebrow="Stack"
        title="Las herramientas del oficio."
        description="Un stack moderno enfocado en velocidad de desarrollo, tipos fuertes y experiencias fluidas."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <motion.div
              key={group.title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ duration: dur.base, ease: easeOut }}
              className="group relative overflow-hidden rounded-2xl border border-border bg-bg-soft/50 p-6 backdrop-blur"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/10 blur-2xl opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100" />

              <div className="relative flex items-center gap-3">
                <div className="rounded-xl border border-border bg-bg p-2.5 text-accent">
                  <Icon size={20} />
                </div>
                <h3 className="font-display text-lg font-medium text-fg">
                  {group.title}
                </h3>
              </div>

              <ul className="relative mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-bg/50 px-3 py-1 text-xs text-fg-muted transition-colors duration-200 group-hover:border-fg-dim"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
