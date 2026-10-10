# Adrián Ludovico - Sitio de Kinesiología Cardiorrespiratoria

## Objetivo

Crear una landing page en Next.js que presente la práctica profesional del Lic. Adrián Javier Ludovico, explique sus especialidades y convierta visitas en conversaciones directas por WhatsApp.

## Audiencia y resultado esperado

La página está dirigida a pacientes adultos, familiares y cuidadores que necesitan comprender una indicación respiratoria y encontrar atención especializada. En los primeros segundos debe quedar claro quién atiende, cuál es la especialidad y cómo iniciar una consulta.

## Contenido autorizado

El contenido clínico, la formación y los datos profesionales provienen de `D:/Marib/Downloads/PAPÁ.docx`. Se corrigen errores ortográficos y se comprime el texto para lectura web sin cambiar su significado. No se inventan testimonios, métricas, resultados, fotografías de Adrián ni datos de contacto.

## Dirección visual

La dirección se denomina **Corredor de aire**. Una trayectoria respiratoria conecta el hero, los tres escenarios de atención y los servicios. La marca usa celeste muy claro como superficie, azul marino clínico como color estructural y coral como único acento.

- Diseño: variación 8/10.
- Movimiento: intensidad 8/10.
- Densidad: 4/10.
- Forma: paneles de 16 px, botones tipo píldora, imágenes con recortes orgánicos controlados.
- Tipografía: sans condensada para títulos y sans legible para texto.
- Tema: claro como identidad principal, con equivalentes oscuros coherentes mediante preferencia del sistema.

La ilustración del corredor dentro de los pulmones funciona como logo. La ilustración generada de una sesión respiratoria es material editorial y nunca se presenta como una fotografía de Adrián.

## Arquitectura de la página

1. Navegación fija con marca, anclas y acción `Solicitar turno`.
2. Hero dividido con propuesta de valor, llamada a WhatsApp e ilustración editorial.
3. Recorrido de cuidado que conecta UTI, consultorio y domicilio.
4. Presentación profesional y enfoque clínico.
5. Explorador interactivo de seis servicios.
6. Formación y actualización continua en una composición editorial.
7. Modalidades de atención y preguntas frecuentes.
8. Cierre de contacto con WhatsApp y campos pendientes claramente configurables.

## Interacción y movimiento

- Entrada secuencial del hero para establecer jerarquía.
- Línea de respiración vinculada al progreso de scroll para conectar el relato.
- Revelado por viewport en bloques principales.
- Panel de servicios con selección animada y estado accesible.
- Microinteracciones de botones y navegación móvil.
- Todas las animaciones se degradan a estado estático con `prefers-reduced-motion`.

## Contacto

`NEXT_PUBLIC_WHATSAPP_NUMBER` define el número en formato internacional sin signos. Mientras esté ausente, los enlaces usan `https://wa.me/?text=...`, que permite elegir un contacto sin afirmar un número inexistente. Email, dirección y horarios quedan como valores opcionales en una configuración central.

## Accesibilidad

- Jerarquía semántica de encabezados.
- Navegación por teclado y foco visible.
- Botones con etiquetas concretas y estados `aria-expanded` o `aria-pressed` donde corresponda.
- Contraste WCAG AA.
- Imágenes con `alt` descriptivo y dimensiones reservadas.
- Menú móvil con control de foco y cierre mediante Escape.

## Rendimiento

La composición estática se renderiza en Server Components. Las animaciones se aíslan en componentes cliente. Las imágenes usan `next/image`; la ilustración principal se precarga. No se usan listeners manuales de scroll ni animaciones de layout costosas.

## Verificación

- Pruebas unitarias del generador de enlaces de WhatsApp y del contenido visible esencial.
- Lint, TypeScript y build de producción.
- Inspección visual en viewport de escritorio y móvil sin iniciar un servidor persistente.
- Detector mecánico de calidad visual sobre los archivos modificados.

