import { socials } from "../data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-fg-dim md:flex-row">
        <div>
          © {year} · Hecho con <span className="text-accent">♥</span> en React,
          Vite y Tailwind
        </div>
        <ul className="flex items-center gap-5">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="rounded px-1 py-0.5 transition-colors duration-200 hover:text-fg active:scale-[0.96]"
              >
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
