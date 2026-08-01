import { motion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { fadeUp, stagger } from "../lib/motion";
import { contact, socials } from "../data/portfolio";

export default function Contact() {
  return (
    <section
      id="contacto"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="relative overflow-hidden rounded-3xl border border-border bg-bg-soft/60 px-6 py-16 text-center backdrop-blur md:px-12 md:py-28"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            maskImage:
              "radial-gradient(ellipse at center, black 20%, transparent 70%)",
          }}
        />

        <motion.div
          variants={fadeUp}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg/60 px-3 py-1 text-xs text-fg-muted backdrop-blur"
        >
          <Mail size={12} />
          Hablemos
        </motion.div>

        <motion.h2
          variants={fadeUp}
          className="tracking-display mx-auto max-w-4xl font-display text-balance text-4xl font-semibold text-fg sm:text-6xl md:text-7xl"
        >
          ¿Tienes una idea?
          <br />
          <span className="bg-gradient-to-r from-accent via-fg to-accent bg-clip-text text-transparent">
            Vamos a construirla.
          </span>
        </motion.h2>

        <motion.p
          variants={fadeUp}
          className="mx-auto mt-6 max-w-xl text-lg text-fg-muted"
        >
          Estoy abierto a colaboraciones, proyectos freelance y conversaciones
          que valgan la pena. Respondo rápido, lo prometo.
        </motion.p>

        <motion.div
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]"
          >
            {contact.email}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </motion.div>

        <motion.ul
          variants={fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-fg-muted"
        >
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-1 rounded px-1 py-0.5 transition-colors duration-200 hover:text-fg active:scale-[0.96]"
              >
                {s.label}
                <ArrowUpRight
                  size={14}
                  className="opacity-0 transition-all duration-200 ease-out group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                />
              </a>
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </section>
  );
}
