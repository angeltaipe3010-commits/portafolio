import { motion } from "framer-motion";
import { fadeUp, stagger, easeOut, dur } from "../lib/motion";
import SectionHeader from "./SectionHeader";

const stats = [
  { value: "3+", label: "Años programando" },
  { value: "4", label: "Proyectos construidos" },
  { value: "10+", label: "Tecnologías en el stack" },
  { value: "∞", label: "Ganas de seguir aprendiendo" },
];

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="relative mx-auto max-w-7xl px-6 py-20 md:py-32"
    >
      <SectionHeader
        eyebrow="Sobre mí"
        title="De la curiosidad al oficio."
        description="Desarrollador web enfocado en construir aplicaciones completas: interfaces claras por delante y una base de datos bien pensada por detrás."
      />

      <div className="grid gap-16 md:grid-cols-[1.2fr_1fr] md:items-start">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 text-fg-muted"
        >
          <motion.p variants={fadeUp} className="text-lg leading-relaxed">
            Mi interés por la programación empezó frente a una pantalla, pero no
            la de un editor: la del cine. Esas escenas donde alguien tecleaba a
            toda velocidad sobre un fondo verde lleno de{" "}
            <span className="text-fg">unos y ceros</span> me dejaron una
            pregunta que tardé años en responder: ¿qué hay realmente detrás de
            todo eso?
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed">
            Cuando empecé a estudiar encontré la respuesta, y con ella el{" "}
            <span className="text-fg">desarrollo web</span>. Lo que era
            curiosidad se convirtió en oficio: descubrir que con código se pueden
            construir herramientas que otras personas usan todos los días fue lo
            que terminó de definir el camino.
          </motion.p>
          <motion.p variants={fadeUp} className="text-lg leading-relaxed">
            Hoy trabajo en proyectos full-stack con{" "}
            <span className="text-fg">React</span>,{" "}
            <span className="text-fg">TypeScript</span> y{" "}
            <span className="text-fg">Supabase</span>, además de{" "}
            <span className="text-fg">Java</span> y{" "}
            <span className="text-fg">MySQL</span> del lado del servidor,
            prestando la misma atención al modelo de datos que a la interfaz.
          </motion.p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-2 gap-4"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              whileHover={{ y: -4, borderColor: "rgba(163,230,53,0.4)" }}
              transition={{ duration: dur.base, ease: easeOut }}
              className="rounded-2xl border border-border bg-bg-soft/50 p-6 backdrop-blur"
            >
              <div className="font-display text-4xl font-semibold text-fg">
                {s.value}
              </div>
              <div className="mt-2 text-sm text-fg-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
