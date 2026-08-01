import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { stagger } from "../lib/motion";
import { contact, projects } from "../data/portfolio";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

export default function Projects() {
  return (
    <section
      id="proyectos"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
    >
      <SectionHeader
        eyebrow="Trabajo seleccionado"
        title="Proyectos que envié al mundo."
        description="Una selección de trabajos recientes. Cada uno con sus decisiones, sus compromisos y sus pequeñas victorias."
      />

      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="grid gap-6 md:grid-cols-2"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.title}
            project={project}
            className={
              projects.length % 2 === 1 && i === projects.length - 1
                ? "md:col-span-2"
                : ""
            }
          />
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="mt-12 flex justify-center"
      >
        <a
          href={contact.github}
          target="_blank"
          rel="noreferrer"
          className="group inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
        >
          Ver más en GitHub
          <ArrowUpRight
            size={16}
            className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </a>
      </motion.div>
    </section>
  );
}
