import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ErrorBoundary from "./ErrorBoundary";

const Spline = lazy(() => import("@splinetool/react-spline"));

/**
 * Dónde NO vale la pena la escena. Dos motivos distintos, misma consecuencia:
 *
 * - `pointer: coarse` — el runtime de Spline son 568 KB comprimidos, cinco
 *   veces el resto del sitio, y engancha un listener de scroll a `document`
 *   que llama a `getBoundingClientRect()` en cada evento: un cálculo de layout
 *   por scroll durante toda la página, no solo mientras se ve el hero.
 * - movimiento reducido — es decoración animada, y quien pide menos movimiento
 *   no la ha pedido.
 *
 * En ambos casos queda el degradado de abajo, que ya era el respaldo cuando la
 * escena no cargaba.
 */
const SIN_ESCENA = "(pointer: coarse), (prefers-reduced-motion: reduce)";

function useEscenaPermitida() {
  const [permitida, setPermitida] = useState(
    () => !window.matchMedia(SIN_ESCENA).matches,
  );

  // Se vuelve a evaluar por si cambia en caliente: ratón conectado a una
  // tablet, o el ajuste de movimiento reducido del sistema.
  useEffect(() => {
    const consulta = window.matchMedia(SIN_ESCENA);
    const alCambiar = () => setPermitida(!consulta.matches);
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  return permitida;
}

type Props = {
  scene: string;
};

export default function SplineBackground({ scene }: Props) {
  const [loaded, setLoaded] = useState(false);
  const escenaPermitida = useEscenaPermitida();

  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Fallback ambient glow — stays visible under the scene */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/3 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl animate-pulse-soft" />
        <div className="absolute right-1/4 top-1/2 h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 h-[220px] w-[220px] rounded-full bg-cyan-500/10 blur-3xl" />
      </div>

      {/* La escena es decorativa: si el chunk o la escena no cargan, el glow
          de arriba se queda solo y el resto del sitio sigue en pie. El `lazy`
          va dentro de la condición a propósito: si no se monta, el chunk de
          Spline ni se pide. */}
      {escenaPermitida && (
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
      )}

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
