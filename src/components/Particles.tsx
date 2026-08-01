import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
};

const MAX_PARTICLES = 36;
const MIN_MOVE_DIST = 14;
const MIN_EMIT_INTERVAL_MS = 40;

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Skip on touch + reduced motion
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = [];
    const lastEmit = { x: -1, y: -1, t: 0 };

    const onMove = (e: PointerEvent) => {
      const now = performance.now();
      const dx = e.clientX - lastEmit.x;
      const dy = e.clientY - lastEmit.y;
      const dist = Math.hypot(dx, dy);
      if (dist < MIN_MOVE_DIST || now - lastEmit.t < MIN_EMIT_INTERVAL_MS) return;

      const count = dist > 60 ? 2 : 1;
      for (let i = 0; i < count; i++) {
        particles.push({
          x: e.clientX + (Math.random() - 0.5) * 6,
          y: e.clientY + (Math.random() - 0.5) * 6,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35 - 0.12, // slight upward drift
          life: 0,
          maxLife: 650 + Math.random() * 500,
          size: 1 + Math.random() * 1.8,
        });
      }
      if (particles.length > MAX_PARTICLES) {
        particles.splice(0, particles.length - MAX_PARTICLES);
      }
      lastEmit.x = e.clientX;
      lastEmit.y = e.clientY;
      lastEmit.t = now;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let last = performance.now();
    let rafId = 0;
    const tick = (now: number) => {
      const dt = Math.min(now - last, 48); // clamp to avoid huge jumps on tab return
      last = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life += dt;
        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.maxLife;
        p.x += p.vx * dt * 0.06;
        p.y += p.vy * dt * 0.06;

        // Ease-out fade: fast start, gentle tail
        const opacity = Math.pow(1 - t, 1.6) * 0.55;
        const size = p.size * (1 - t * 0.4);

        ctx.beginPath();
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(163, 230, 53, ${opacity})`;
        ctx.fill();
      }

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[5] hidden md:block"
    />
  );
}
