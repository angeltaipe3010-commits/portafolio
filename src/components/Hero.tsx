import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";
import { fadeUp, stagger, easeOut } from "../lib/motion";
import SplineBackground from "./SplineBackground";

const SPLINE_SCENE =
  "https://prod.spline.design/NQAdF3HtwwrG99AV/scene.splinecode";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, 60]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      id="inicio"
      ref={ref}
      className="relative isolate flex min-h-screen items-center justify-center overflow-hidden pt-24"
    >
      <SplineBackground scene={SPLINE_SCENE} />

      <motion.div
        style={{ y, opacity, willChange: "transform" }}
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.span
          variants={fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-soft/60 px-3 py-1 text-xs text-fg-muted backdrop-blur"
        >
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          Disponible para nuevos proyectos
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="tracking-display font-display text-balance text-5xl font-semibold text-fg sm:text-7xl md:text-8xl"
        >
          Construyo interfaces
          <br />
          <span className="bg-gradient-to-r from-fg via-fg-muted to-fg-dim bg-clip-text text-transparent">
            que se sienten
          </span>{" "}
          <motion.span
            initial={{ backgroundSize: "0% 100%" }}
            animate={{ backgroundSize: "100% 100%" }}
            transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
            style={{
              backgroundImage:
                "linear-gradient(180deg, transparent 62%, rgba(163,230,53,0.35) 62%)",
              backgroundRepeat: "no-repeat",
            }}
          >
            vivas
          </motion.span>
          .
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="mt-8 max-w-2xl text-balance text-lg text-fg-muted sm:text-xl"
        >
          Desarrollador web full-stack. Construyo aplicaciones completas: la
          interfaz con React y TypeScript, y la base de datos y la lógica que la
          sostienen por detrás.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#proyectos"
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
          >
            Ver proyectos
            <Sparkles
              size={16}
              className="transition-transform duration-300 ease-out group-hover:rotate-12"
            />
          </a>
          <a
            href="#contacto"
            className="rounded-full border border-border bg-bg-soft/60 px-6 py-3 text-sm text-fg transition-colors duration-200 hover:bg-surface active:scale-[0.97]"
          >
            Contáctame
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
