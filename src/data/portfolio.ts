import type { LucideIcon } from "lucide-react";
import { Code2, Database, Terminal } from "lucide-react";

export const navLinks = [
  { href: "#inicio", label: "Inicio" },
  { href: "#sobre-mi", label: "Sobre mí" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#skills", label: "Skills" },
  { href: "#experiencia", label: "Experiencia" },
  { href: "#contacto", label: "Contacto" },
];

export const contact = {
  email: "angeltaipe.3010@gmail.com",
  github: "https://github.com/angeltaipe3010-commits",
  linkedin: "https://www.linkedin.com/in/luis-angel-taipe-mamani-b75060387",
};

export const socials = [
  { label: "GitHub", href: contact.github },
  { label: "LinkedIn", href: contact.linkedin },
  { label: "Email", href: `mailto:${contact.email}` },
];

export type ProjectLink = {
  label: string;
  href: string;
  /**
   * Destino principal del proyecto. Se pinta en color de acento y alimenta la
   * flecha de la cabecera. Los demás quedan como botones secundarios.
   */
  primary?: boolean;
  /** Marca el enlace al repositorio para que lleve el icono de código. */
  code?: boolean;
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  year: string;
  /**
   * Destinos del proyecto: demo pública, panel interno, repositorio… Un
   * proyecto puede tener varios (Aurea son dos aplicaciones desplegadas
   * por separado) o ninguno, y entonces la tarjeta no muestra pie.
   */
  links?: ProjectLink[];
  /** Cómo entrar cuando algún destino pide credenciales. */
  access?: string;
  accent?: string;
};

export const projects: Project[] = [
  {
    title: "Ferretería El Progreso — Panel de control",
    description:
      "Dashboard para el dueño de una ferretería: punto de venta con cálculo de vuelto, inventario con alertas de stock, cuadre de caja, clientes con deudas y reporte del día en PDF. Incluye una escena 3D animada del patio de carga.",
    tags: ["React", "TypeScript", "Tailwind", "Three.js", "Framer Motion"],
    year: "2026",
    links: [
      {
        label: "Ver demo",
        href: "https://ferreteria-el-progreso.vercel.app/",
        primary: true,
      },
      {
        label: "Código",
        href: "https://github.com/angeltaipe3010-commits/ferreteria-el-progreso",
        code: true,
      },
    ],
    access: "Botón «Entrar como demo» · demo@elprogreso.pe / demo1234",
    accent: "from-indigo-400/20 to-transparent",
  },
  {
    title: "Clínica Nácar — Landing page",
    description:
      "Web de una sola página para una clínica estética: recorrido 3D ligado al scroll, efecto de vidrio líquido y un armador de citas que prepara el mensaje de WhatsApp.",
    tags: ["Three.js", "JavaScript", "CSS", "Lenis", "esbuild"],
    year: "2026",
    links: [
      {
        label: "Ver sitio",
        href: "https://clinica-nacar-eta.vercel.app/",
        primary: true,
      },
      {
        label: "Código",
        href: "https://github.com/angeltaipe3010-commits/Clinica-Nacar",
        code: true,
      },
    ],
    accent: "from-rose-300/20 to-transparent",
  },
  {
    title: "Aurea — Sistema de Catering",
    description:
      "Sitio público y panel interno con Supabase, gestión de menús, pedidos y eventos.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    year: "2026",
    links: [
      {
        label: "Ver sitio",
        href: "https://aurea-catering-uopo.vercel.app/",
        primary: true,
      },
      {
        label: "Panel interno",
        href: "https://aurea-catering.vercel.app/login",
      },
      {
        label: "Código",
        href: "https://github.com/angeltaipe3010-commits/aurea-catering",
        code: true,
      },
    ],
    access: "Panel: demo@aurea.pe / demo1234",
    accent: "from-lime-400/20 to-transparent",
  },
  {
    title: "Bodega Pro",
    description:
      "Sistema de gestión para una bodega local: control de inventario, entradas y salidas de productos y seguimiento de ventas diarias.",
    tags: ["React", "TypeScript", "Supabase", "Tailwind"],
    year: "2026",
    accent: "from-cyan-400/20 to-transparent",
  },
  {
    title: "Demo Barbershop — CRM",
    description:
      "CRM para barberías que centraliza la gestión de clientes, las finanzas del negocio y el inventario de productos en un solo panel.",
    tags: ["React", "TypeScript", "Supabase", "SQLite (WASM)", "Tailwind"],
    year: "2025 — 2026",
    links: [
      {
        label: "Ver demo",
        href: "https://barbershop-demo-rho-three.vercel.app/login",
        primary: true,
      },
      {
        label: "Código",
        href: "https://github.com/angeltaipe3010-commits/barbershop-demo",
        code: true,
      },
    ],
    access: "Botones de acceso por rol · admin / demo1234",
    accent: "from-fuchsia-400/20 to-transparent",
  },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    icon: Code2,
    items: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router v7",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    title: "Backend",
    icon: Database,
    items: [
      "Java (JSP / Servlet)",
      "MySQL",
      "Procedimientos almacenados",
      "MongoDB",
      "Supabase",
    ],
  },
  {
    title: "Herramientas / Despliegue",
    icon: Terminal,
    items: ["Git", "Vercel", "Eclipse + Tomcat", "Node.js / npm"],
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  description: string;
};

export const experience: ExperienceItem[] = [
  {
    role: "Formación en Desarrollo de Software",
    company: "Cibertec",
    period: "2023 — Actualidad",
    description:
      "Base técnica en programación, bases de datos y desarrollo de aplicaciones, complementada con proyectos propios en paralelo.",
  },
  {
    role: "Desarrollador Full-Stack",
    company: "AutoPartes Pro · Proyecto académico",
    period: "2025",
    description:
      "Sistema para la gestión de autopartes de automóviles: catálogo, inventario y administración de registros. Proyecto desarrollado y entregado dentro del mismo año.",
  },
  {
    role: "Desarrollador Full-Stack",
    company: "Demo Barbershop · CRM",
    period: "2025 — 2026",
    description:
      "CRM para barberías con gestión de clientes, control de finanzas e inventario de productos en un panel unificado.",
  },
  {
    role: "Desarrollador Full-Stack",
    company: "Aurea Catering",
    period: "2026 — Actualidad",
    description:
      "Diseño e implementación del sitio público, el panel administrativo y la base de datos completa del servicio de catering.",
  },
  {
    role: "Desarrollador Full-Stack",
    company: "Bodega Pro",
    period: "2026 — Actualidad",
    description:
      "Sistema de gestión para una bodega local: inventario, movimientos de productos y seguimiento de ventas.",
  },
  {
    role: "Desarrollador Frontend",
    company: "Clínica Nácar · Landing page",
    period: "2026",
    description:
      "Landing de una sola página con escena 3D procedural ligada al scroll y un armador de citas por WhatsApp, compilada en un solo archivo.",
  },
  {
    role: "Desarrollador Frontend",
    company: "Ferretería El Progreso · Panel de control",
    period: "2026",
    description:
      "Dashboard con punto de venta, inventario, caja y clientes; reporte en PDF, búsqueda rápida y escena 3D animada. Probado con 66 casos automáticos.",
  },
];

