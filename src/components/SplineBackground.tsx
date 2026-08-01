import { lazy, Suspense, useState } from "react";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";

const Spline = lazy(() => import("@splinetool/react-spline"));

type Props = {
  scene: string;
};

export default function SplineBackground({ scene }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Fallback ambient glow — stays visible under the scene */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" />
        <div className="absolute right-1/4 top-1/2 h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* La escena es decorativa: si el chunk o la escena no cargan, el glow
          de arriba se queda solo y el resto del sitio sigue en pie. */}
      <ErrorBoundary>
        <Suspense fallback={null}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ transform: "scale(1.35)", transformOrigin: "center" }}
            className="pointer-events-none absolute inset-0"
          >
            <Spline scene={scene} onLoad={() => setLoaded(true)} />
          </motion.div>
        </Suspense>
      </ErrorBoundary>

      {/* Vignette + bottom fade for text contrast */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,10,10,0.55) 75%, rgba(10,10,10,0.9) 100%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg"
      />
    </div>
  );
}
