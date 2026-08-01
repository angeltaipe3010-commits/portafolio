import type { PointerEvent as ReactPointerEvent } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight, Code2 } from "lucide-react";
import { fadeUp, easeOut } from "../lib/motion";
import type { Project } from "../data/portfolio";

type Props = { project: Project; className?: string };

export default function ProjectCard({ project, className = "" }: Props) {
  const reduced = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springCfg = { stiffness: 220, damping: 22, mass: 0.4 };
  const sx = useSpring(x, springCfg);
  const sy = useSpring(y, springCfg);
  const rotateY = useTransform(sx, [-0.5, 0.5], [reduced ? 0 : -4, reduced ? 0 : 4]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [reduced ? 0 : 3, reduced ? 0 : -3]);

  const handleMove = (e: ReactPointerEvent<HTMLElement>) => {
    if (reduced) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  // La card lleva dos destinos (demo y repo), así que es un artículo con
  // enlaces dentro y no un enlace envolvente: anidar anchors sería inválido.
  return (
    <motion.article
      variants={fadeUp}
      whileHover="hover"
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative block overflow-hidden rounded-3xl border border-border bg-bg-soft/60 p-8 backdrop-blur transition-colors duration-200 hover:border-fg-dim ${className}`}
    >
      {/* Accent gradient */}
      <motion.div
        variants={{ hover: { opacity: 1 } }}
        initial={{ opacity: 0.4 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${
          project.accent ?? "from-lime-400/10 to-transparent"
        }`}
      />

      {/* Shimmer */}
      <motion.div
        variants={{ hover: { x: "180%", opacity: 0.5 } }}
        initial={{ x: "-80%", opacity: 0 }}
        transition={{ duration: 0.7, ease: easeOut }}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/6 to-transparent"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs text-fg-dim">
              <span className="font-mono">{project.year}</span>
              <span className="h-px w-6 bg-fg-dim" />
              <span>Proyecto</span>
            </div>
            <h3 className="font-display text-2xl font-semibold text-fg sm:text-3xl">
              {project.title}
            </h3>
          </div>

          {project.demo && (
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`Abrir la demo de ${project.title}`}
              variants={{ hover: { rotate: 12, x: 2, y: -2 } }}
              initial={{ rotate: 0, x: 0, y: 0 }}
              transition={{ duration: 0.25, ease: easeOut }}
              className="shrink-0 rounded-full border border-border bg-bg p-3 text-fg transition-colors duration-200 hover:border-fg-dim hover:bg-surface active:scale-[0.94]"
            >
              <ArrowUpRight size={18} />
            </motion.a>
          )}
        </div>

        <p className="mt-4 max-w-md text-fg-muted">{project.description}</p>

        <div className="mt-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-bg/50 px-3 py-1 text-xs text-fg-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {(project.demo || project.repo) && (
          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border pt-6">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-1.5 text-xs font-medium text-bg transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
              >
                Ver demo
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="group/link inline-flex items-center gap-1.5 rounded-full border border-border bg-bg/50 px-4 py-1.5 text-xs text-fg transition-colors duration-200 hover:border-fg-dim hover:bg-surface active:scale-[0.97]"
              >
                <Code2 size={14} />
                Código
                <ArrowUpRight
                  size={14}
                  className="text-fg-dim transition-transform duration-200 ease-out group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
