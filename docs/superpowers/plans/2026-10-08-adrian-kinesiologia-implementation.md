# Adrián Kinesiología Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir una landing page animada y accesible para la práctica de kinesiología cardiorrespiratoria de Adrián Ludovico.

**Architecture:** Next.js App Router renderiza la estructura y el SEO en servidor. Islas cliente pequeñas concentran navegación, selección de servicios y movimiento con Motion. La verdad de contenido y contacto vive en módulos de datos puros para evitar valores inventados y permitir pruebas directas.

**Tech Stack:** Next.js, React, TypeScript, CSS global con tokens, Motion, Phosphor Icons, Vitest y Testing Library.

**Spec:** `docs/superpowers/specs/2026-10-08-adrian-kinesiologia-design.md`

## Global Constraints

- Usar únicamente contenido profesional suministrado en el DOCX.
- No inventar teléfono, email, dirección, horarios, testimonios ni resultados.
- Mantener el logo entregado y la paleta celeste, azul marino y coral.
- Respetar `prefers-reduced-motion` y WCAG AA.
- No desplegar, publicar ni iniciar un servidor persistente.

---

### Task 1: Base del proyecto y contacto seguro

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `vitest.config.ts`
- Create: `tests/setup.ts`
- Create: `tests/contact.test.ts`
- Create: `lib/contact.ts`
- Create: `.env.example`

**Interfaces:**
- Produces: `buildWhatsAppUrl(number: string | undefined, message: string): string`.

- [ ] Escribir pruebas que exijan normalización de número, codificación de mensaje y fallback sin número.
- [ ] Ejecutar `pnpm test tests/contact.test.ts` y comprobar que falla por módulo inexistente.
- [ ] Implementar `buildWhatsAppUrl` sin valores de contacto ficticios.
- [ ] Ejecutar la prueba y comprobar que pasa.

### Task 2: Contenido y superficie principal

**Files:**
- Create: `lib/site.ts`
- Create: `app/layout.tsx`
- Create: `app/page.tsx`
- Create: `app/globals.css`
- Create: `components/kinesiology-landing.tsx`
- Create: `components/navigation.tsx`
- Create: `components/service-explorer.tsx`
- Create: `components/reveal.tsx`
- Create: `tests/landing.test.tsx`

**Interfaces:**
- Consumes: `buildWhatsAppUrl`.
- Produces: página con secciones `inicio`, `enfoque`, `servicios`, `formacion`, `preguntas` y `contacto`.

- [ ] Escribir una prueba de superficie que exija identidad profesional, seis servicios, CTA de WhatsApp y navegación semántica.
- [ ] Ejecutar `pnpm test tests/landing.test.tsx` y comprobar que falla por componente inexistente.
- [ ] Implementar la estructura estática, configuración de contenido e islas cliente.
- [ ] Agregar movimiento motivado, estados interactivos, teclado y fallback de movimiento reducido.
- [ ] Ejecutar la prueba de superficie hasta obtener estado verde.

### Task 3: Activos, responsive y metadata

**Files:**
- Create: `public/brand/adrian-ludovico-logo.jpeg`
- Create: `public/images/rehabilitacion-respiratoria.png`
- Create: `next.config.ts`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: archivos entregados y la ilustración editorial generada.
- Produces: imágenes optimizadas por Next, metadata social y composición móvil explícita.

- [ ] Copiar los activos aprobados sin modificar los originales.
- [ ] Reservar dimensiones y prioridad para el activo LCP.
- [ ] Completar breakpoints móvil, tablet y escritorio.
- [ ] Ejecutar pruebas, lint y build.

### Task 4: Verificación visual y documentación del sistema

**Files:**
- Create: `.impeccable/review/desktop.png`
- Create: `.impeccable/review/mobile.png`
- Create: `DESIGN.md`

**Interfaces:**
- Consumes: build de producción y contrato visual.
- Produces: evidencia de escritorio/móvil y reglas de diseño reutilizables.

- [ ] Ejecutar detector de diseño sobre los archivos de UI una sola vez.
- [ ] Renderizar escritorio y móvil en un navegador automatizado temporal.
- [ ] Corregir en una sola tanda los problemas materiales encontrados.
- [ ] Repetir build y pruebas completas.
- [ ] Documentar la identidad que realmente quedó implementada.
