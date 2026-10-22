---
name: "Adrián Ludovico — Kinesiología Cardiorrespiratoria"
description: "Sistema clínico cercano que convierte el cuidado respiratorio en un corredor de aire continuo."
colors:
  page: "#f3f7fa"
  surface: "#ffffff"
  surface-strong: "#dfeaf1"
  ink: "#153247"
  ink-soft: "#4c7892"
  accent: "#b8443c"
  accent-strong: "#96362f"
  clinical-blue: "#4c7892"
  light-on-panel: "#f3f7fa"
  warm-white: "#fff9f8"
  line: "rgba(21, 50, 71, 0.16)"
  page-dark: "#0c1b27"
  surface-dark: "#122b3b"
  surface-strong-dark: "#1c3c50"
  ink-dark: "#f3f7fa"
  ink-soft-dark: "#afc9d8"
  clinical-blue-dark: "#74a4bf"
  panel-dark-theme: "#153247"
  line-dark: "rgba(243, 247, 250, 0.17)"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(3.65rem, 6vw, 4.9rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.65rem, 5vw, 4.7rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(1.55rem, 2.2vw, 2rem)"
    fontWeight: 600
    lineHeight: 1.1
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "0.9rem"
    fontWeight: 700
    lineHeight: 1.18
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "28px"
  3xl: "40px"
  4xl: "56px"
rounded:
  logo: "14px"
  panel: "16px"
  pill: "999px"
  circle: "50%"
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.accent-strong}"
    textColor: "{colors.warm-white}"
  button-small:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.warm-white}"
    rounded: "{rounded.pill}"
    padding: "0 18px"
    height: "44px"
  button-light:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.accent-strong}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "52px"
  panel-dark:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.light-on-panel}"
    rounded: "{rounded.panel}"
    padding: "clamp(34px, 6vw, 76px)"
---

# Sistema de diseño: Adrián Ludovico

## Overview

**Creative North Star: "Corredor de aire"**

La interfaz expresa el cuidado respiratorio como una trayectoria continua: amplia, respirable y orientada. El fondo celeste abre espacio; el azul marino aporta estructura clínica; el coral marca acciones, hitos y pulsos sin convertir la experiencia en una alarma. La composición equilibra autoridad profesional y cercanía humana con una densidad deliberadamente baja.

La forma distintiva no es un adorno aislado, sino un sistema de recorridos: órbitas en el hero, una línea de progreso entre UTI, consultorio y domicilio, listas secuenciales y paneles que guían la atención. El movimiento explica continuidad y cambio de contexto; nunca sustituye el contenido ni bloquea la interacción.

**Key Characteristics:**

- Superficies claras y aireadas con paneles azul marino de contraste puntual.
- Coral reservado para acción, foco, selección e hitos clínicos.
- Titulares condensados y firmes; texto corrido abierto y legible.
- Recorridos lineales, círculos y órbitas como gramática de respiración.
- Movimiento expresivo con degradación completa para movimiento reducido.
- Jerarquía directa: comprender el enfoque, reconocer el servicio y contactar.

## Colors

La paleta combina calma respiratoria, rigor clínico y una única voz activa.

### Primary

- **Coral activo** (`accent`): acciones principales, selección, foco visible, nodos y señales de avance.
- **Coral profundo** (`accent-strong`): estado hover del coral y contraste de texto sobre superficies muy claras.

### Secondary

- **Azul clínico** (`clinical-blue`): enlaces secundarios, iconografía, progreso y apoyo visual sin competir con la acción principal.

### Neutral

- **Aire celeste** (`page`): lienzo general y pista visual de amplitud.
- **Blanco clínico** (`surface`): secciones y tarjetas que deben separarse del fondo sin endurecerse.
- **Celeste estructural** (`surface-strong`): bandas, pistas y zonas de agrupación.
- **Azul marino clínico** (`ink`): texto principal y paneles de máxima autoridad.
- **Azul tinta suave** (`ink-soft`): párrafos, metadatos y jerarquía secundaria.
- **Luz sobre panel** (`light-on-panel`): contenido sobre fondos oscuros.
- **Blanco cálido** (`warm-white`): texto y acciones sobre coral.
- **Línea respirable** (`line`): divisores y contornos de baja intensidad.

El tema oscuro conserva los roles, no invierte mecánicamente colores: usa `page-dark`, `surface-dark`, `surface-strong-dark`, `ink-dark`, `ink-soft-dark`, `clinical-blue-dark`, `panel-dark-theme` y `line-dark`. El coral permanece estable para sostener el reconocimiento de acción.

**The One Coral Voice Rule.** El coral es el único acento de acción; no introducir otros colores saturados para competir con CTA, foco o selección.

**The Clinical Contrast Rule.** Las superficies oscuras son episodios de énfasis y lectura concentrada, no el fondo dominante de la página clara.

## Typography

**Display Font:** Source Serif 4 (con `Georgia, serif` como respaldo)  
**Body Font:** Source Sans 3 (con `sans-serif` como respaldo)

**Character:** Source Serif 4 aporta una voz profesional, humana y editorial a los titulares. Source Sans 3 conserva claridad y lectura cómoda en explicaciones, navegación y controles.

### Hierarchy

- **Display** (`typography.display`): reservado al mensaje principal; ancho máximo de 13 caracteres para sostener impacto y lectura por bloques.
- **Headline** (`typography.headline`): encabezados de sección; se balancean visualmente y trabajan con largos máximos de 9 a 12 caracteres en las composiciones más expresivas.
- **Title** (`typography.title`): títulos de tarjetas, etapas, FAQ y resultados seleccionados.
- **Body** (`typography.body`): explicación clínica y texto de apoyo; limitar normalmente a 44–65 caracteres para evitar columnas fatigantes.
- **Label** (`typography.label`): navegación, botones y selectores; peso alto, sin versales forzadas.

**The Editorial Hierarchy Rule.** Source Serif 4 organiza y aporta autoridad; Source Sans 3 explica y permite actuar. La serif se reserva para títulos y énfasis breves.

**The Human Clinical Rule.** Priorizar frases cortas, lenguaje comprensible y pesos firmes antes que mayúsculas, tracking amplio o estética hospitalaria impersonal.

## Layout

El contenedor principal mide `min(100% - 40px, 1380px)` y baja a márgenes laterales de 15 px en pantallas de hasta 760 px. La altura de navegación es 72 px en escritorio y 66 px en móvil. Las secciones alternan superficies y grandes intervalos verticales fluidos, normalmente entre 88 y 190 px, para producir una cadencia de inspiración y pausa.

La composición usa grillas asimétricas de dos columnas para hero, enfoque, servicios, formación, FAQ y contacto. Las proporciones favorecen la pieza que lleva el relato: 0.82/1.18 en hero, 0.78/1.22 en enfoque y 0.8/1.2 en explorador de servicios. Los gaps son fluidos mediante `clamp()` y las columnas usan `minmax(0, …)` para evitar desborde.

En 980 px o menos, la navegación pasa a menú desplegable y las grillas editoriales principales se apilan. En 760 px o menos, el recorrido horizontal se convierte en eje vertical, los selectores de servicios pasan a carrusel horizontal con `scroll-snap`, el detalle deja de ser sticky y el CTA/contacto se apila. En 430 px o menos se oculta el descriptor largo de marca, se compactan botones y la formación abandona su columna de fecha.

**The Breath Before Density Rule.** Cada grupo necesita espacio para ser comprendido; no llenar vacíos con tarjetas, métricas o decoración no respaldada.

**The Continuous Path Rule.** Cuando una secuencia cambia de eje en móvil, debe conservar el orden, los hitos y la relación visual entre pasos.

## Elevation & Depth

La profundidad combina capas tonales con sombras ambientales azules. Las superficies permanecen planas por defecto; la sombra aparece en imágenes editoriales, paneles de detalle, tarjetas importantes, navegación móvil y acciones flotantes. El desenfoque del header es translúcido solo cuando el sistema permite transparencia.

### Shadow Vocabulary

- **Ambient principal** (`0 28px 70px rgba(21, 50, 71, 0.16)`): imágenes hero y paneles de máxima jerarquía en tema claro.
- **Ambient principal oscuro** (`0 28px 70px rgba(0, 6, 14, 0.34)`): equivalente del tema oscuro.
- **Acción coral** (`0 14px 30px color-mix(in srgb, var(--accent) 26%, transparent)`): botones principales; aumenta en hover.
- **Tarjeta sutil** (`0 18px 50px color-mix(in srgb, var(--blue) 13%, transparent)`): credenciales y superficies informativas.
- **Menú móvil** (`0 18px 36px rgba(21, 50, 71, 0.12)`): separa el desplegable del contenido.

**The Ambient, Not Floating Rule.** Las sombras deben sentirse como difusión de aire y no como cajas suspendidas; evitar contornos oscuros o múltiples niveles simultáneos.

## Shapes

El radio de panel (`rounded.panel`) define imágenes, tarjetas, selectores móviles y paneles. La marca compacta usa `rounded.logo`; botones, pistas y subrayados usan `rounded.pill`; iconos circulares, nodos y controles flotantes usan `rounded.circle`. Los recortes permanecen geométricos y controlados: rectángulos suaves, círculos, órbitas incompletas y una leve placa rotada detrás de la marca.

Los bordes usan `line` a 1 px para separar sin endurecer. Las imágenes se recortan con proporciones estables —3:2 en escritorio, 4:3 en móvil y 1:1 para la figura de marca— y reservan su espacio antes de cargar.

**The Soft Geometry Rule.** Usar una sola familia de radios y círculos; no mezclar blobs arbitrarios, esquinas excesivamente redondas ni ornamentación clínica genérica.

## Components

### Buttons

- **Shape:** píldora completa, altura táctil de 52 px; variante compacta de 44 px en navegación.
- **Primary:** coral activo, texto blanco cálido, icono y etiqueta en línea, padding horizontal amplio.
- **Hover / Active:** pasa a coral profundo, gana sombra y sube 2 px; al activar baja 1 px y escala a 0.98.
- **Focus:** anillo coral de 3 px con separación de 4 px mediante `:focus-visible`.
- **Light:** blanco cálido sobre la banda coral, con texto coral profundo y sombra cálida.

### Links

- **Navigation:** Archivo en peso alto y tinta suave; una línea coral crece de izquierda a derecha en hover.
- **Text link:** tinta principal, subrayado azul clínico de 2 px y cambio a coral en hover.

### Cards / Containers

- **Panel de servicio:** fondo azul marino, texto claro, radio de panel, sombra ambiental y padding fluido. El cambio de servicio usa fundido y desplazamiento vertical breve.
- **Tarjeta de perfil:** superficie clara, radio de panel, sombra azul muy tenue y separadores internos.
- **Metadatos de contacto:** capa coral translúcida con borde blanco suave; no simula datos que todavía no fueron confirmados.

### Selectors

- **Desktop:** filas de 74 px con divisor inferior, icono circular y desplazamiento horizontal de 4 px en hover.
- **Selected:** texto principal, `aria-pressed="true"` e icono coral con pictograma claro.
- **Mobile:** tarjetas horizontales de 196 px mínimo, borde suave y snap; el panel de detalle queda debajo.

### Navigation

Header sticky con fondo mezclado, blur de 18 px y borde inferior. En móvil, el botón circular expone `aria-expanded`, el menú aparece bajo el header, se cierra con Escape y devuelve el foco al disparador. Con transparencia reducida, el header usa una superficie opaca sin blur.

### Journey

Una pista de 4 px conecta tres etapas mediante gradiente azul–coral y nodos circulares. En escritorio progresa horizontalmente con el scroll; en móvil se vuelve vertical y se presenta completa. El orden semántico no cambia.

### FAQ

Usa `details` y `summary` nativos, divisores suaves y un indicador circular +/−. El área de resumen tiene 96 px mínimos y mantiene foco global visible.

### Motion & Reduced Motion

El hero tiene una escena de pulmones tridimensionales construida con `THREE.Points`: la nube dispersa se reúne en aproximadamente 2,8 segundos y luego sostiene una rotación leve en Y y una expansión respiratoria mínima. El encuadre acerca los pulmones un 15–17 % respecto de la versión inicial. Las partículas de tejido usan azul y cian vivos; la vía aérea se distingue en coral luminoso, con tokens propios de la escena. El cursor modifica la orientación dentro de límites acotados, únicamente con mouse. La escena no muestra controles y reinicia la formación al volver a entrar en el viewport, a partir de un 15 % de visibilidad.

El motor 3D carga de forma diferida al entrar en pantalla. Usa 8.800 puntos en escritorio y 4.400 en pantallas de hasta 760 px, con densidad de píxel limitada. Se suspende fuera del viewport o con la pestaña oculta y libera geometría, material, observadores y renderer al desmontarse. Una silueta SVG determinista mantiene el contenido visible durante la carga, ante falta de WebGL y con movimiento reducido.

El retrato transparente aprobado del profesional se ubica junto a “Un profesional que entiende todo el recorrido”, antes de la secuencia UTI → consultorio → domicilio. Usa WebP con alfa, conserva su proporción completa y se apila bajo el texto en móvil.

El canvas de partículas ocupa todo el hero, de borde a borde, incluyendo el área detrás del titular. La nube inicia fuera de los cuatro extremos y converge en el encuadre aprobado de los pulmones; una proyección extendida conserva su posición y escala. El texto y sus enlaces quedan por encima del canvas, que no intercepta clics. La densidad de píxel limita el render a un máximo aproximado de tres millones de píxeles.

La entrada base revela contenido con opacidad, desplazamiento de 28 px y blur de 8 px durante 700 ms. Los cambios de servicio usan 350 ms con curva expresiva `cubic-bezier(0.16, 1, 0.3, 1)`. La trayectoria usa un spring de rigidez 110, amortiguación 24 y masa 0.4. Los pulmones se ensamblan durante 2,8 s y mantienen una respiración y rotación suaves, solo cuando no se solicita reducción.

Con `prefers-reduced-motion: reduce`, el scroll suave se desactiva, las animaciones pasan a una sola iteración y sus duraciones y transiciones se reducen a 0.01 ms. `MotionConfig` aplica la preferencia del usuario después de una hidratación determinista; la trayectoria se presenta completa y el contenido permanece visible.

## Do's and Don'ts

### Do:

- **Do** usar coral solo para acción, selección, foco e hitos que requieren atención.
- **Do** mantener la secuencia UTI → consultorio → domicilio y adaptar su eje sin alterar su significado.
- **Do** conservar foco visible, controles nativos, etiquetas concretas y estados `aria-expanded`, `aria-pressed` o `aria-live` según corresponda.
- **Do** respetar `prefers-color-scheme`, `prefers-reduced-motion` y `prefers-reduced-transparency` sin perder contenido ni función.
- **Do** reservar dimensiones de imágenes, limitar el texto y sostener contraste WCAG AA.
- **Do** usar movimiento para explicar entrada, progreso, selección o continuidad.

### Don't:

- **Don't** inventar testimonios, métricas, fotografías del profesional ni datos de contacto.
- **Don't** introducir gradientes multicolor, neón, glassmorphism generalizado o acentos saturados adicionales.
- **Don't** usar sombras duras, tarjetas para cada fragmento o radios ajenos a la familia establecida.
- **Don't** animar layout, bloquear el scroll ni depender del movimiento para comprender el recorrido.
- **Don't** ocultar foco, reducir áreas táctiles por debajo de 44 px ni reemplazar controles semánticos por elementos genéricos.
- **Don't** presentar la ilustración editorial como fotografía de Adrián.
