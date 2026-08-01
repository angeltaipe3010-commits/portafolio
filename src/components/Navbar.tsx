import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks } from "../data/portfolio";
import { easeOut, dur } from "../lib/motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#inicio");
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // Hysteresis so a jittery scroll near the threshold doesn't flicker.
    const onScroll = () => {
      setScrolled((prev) => {
        const y = window.scrollY;
        if (!prev && y > 32) return true;
        if (prev && y < 16) return false;
        return prev;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Se acumulan las secciones dentro de la franja y gana la primera en orden
    // del menú, para no depender del orden en que llegan las entries.
    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        const first = navLinks.find((l) => visible.has(l.href.slice(1)));
        if (first) setActive(first.href);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );
    navLinks.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // El menú móvil se cierra con Escape y al tocar fuera; sin esto quedaba
  // abierto y solo el propio botón podía cerrarlo.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (menuRef.current?.contains(target)) return;
      if (toggleRef.current?.contains(target)) return;
      setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: dur.slow, ease: easeOut }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <motion.nav
        animate={{
          maxWidth: scrolled ? 880 : 1120,
          backgroundColor: scrolled ? "rgba(10,10,10,0.72)" : "rgba(10,10,10,0)",
          borderColor: scrolled ? "rgba(38,38,38,1)" : "rgba(38,38,38,0)",
        }}
        transition={{ duration: dur.base, ease: easeOut }}
        style={{
          width: "100%",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(16px)" : "none",
        }}
        className="relative flex items-center justify-between rounded-full border px-5 py-3 md:px-6"
      >
        <div className="flex w-full items-center justify-between">
          <a
            href="#inicio"
            className="font-display text-lg font-semibold tracking-tight text-fg transition-colors duration-200"
          >
            <span className="text-accent">◆</span> portafolio
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  className="relative block rounded-full px-3 py-1.5 text-sm text-fg-muted transition-colors duration-200 hover:text-fg"
                >
                  {active === link.href && (
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-surface"
                      transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                    />
                  )}
                  <span className={active === link.href ? "text-fg" : ""}>
                    {link.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contacto"
            className="hidden rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-bg transition-transform duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97] md:inline-block"
          >
            Hablemos
          </a>

          <button
            ref={toggleRef}
            type="button"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
            className="rounded-full border border-border p-2 text-fg transition-colors duration-200 hover:bg-surface active:scale-[0.94] md:hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={open ? "x" : "menu"}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18, ease: easeOut }}
                className="block"
              >
                {open ? <X size={18} /> : <Menu size={18} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            ref={menuRef}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.22, ease: easeOut }}
            style={{ transformOrigin: "top right" }}
            className="absolute right-4 top-20 left-4 rounded-2xl border border-border bg-bg-soft/90 p-4 backdrop-blur-xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-fg-muted transition-colors duration-200 hover:bg-surface hover:text-fg active:scale-[0.98]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="mt-2 block rounded-lg bg-accent px-3 py-2 text-center font-medium text-bg transition-transform duration-150 ease-out active:scale-[0.97]"
                >
                  Hablemos
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
