# Portafolio

Web personal de una sola página: presentación, proyectos, habilidades,
experiencia y contacto.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS 4 · Framer Motion ·
Spline

## Puesta en marcha

```bash
npm install
```

```bash
npm run dev
```

No necesita variables de entorno.

## Estructura

```
src/
  components/    Hero, About, Projects, Skills, Experience, Contact,
                 Navbar, Footer, Particles, SplineBackground, ProjectCard
  data/          portfolio.ts — todo el contenido editable en un solo sitio
  lib/           motion.ts — variantes de animación compartidas
```

**Para actualizar el contenido no hace falta tocar componentes.** Los textos,
proyectos, enlaces y datos de contacto viven en `src/data/portfolio.ts`.

Cada proyecto acepta una URL de despliegue; sin ella no se muestra el botón
*Ver demo*.

## Despliegue

En Vercel, importar el repositorio. Detecta Vite automáticamente y no hay nada
que configurar: es una página única con navegación por anclas, así que no
necesita reglas de reescritura.

## Nota sobre el peso

El fondo 3D de Spline es la mayor parte del JavaScript que se descarga
(alrededor de 4,8 MB en total). Se ve bien en escritorio, pero en móvil con
conexión lenta la primera carga se nota. Si llega a ser un problema, la vía
sería cargar `SplineBackground` de forma diferida y mostrar solo `Particles`
mientras tanto.
