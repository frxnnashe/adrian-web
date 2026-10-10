# Adrián Ludovico - Kinesiología Cardiorrespiratoria

Landing page institucional construida con Next.js, TypeScript, Motion y CSS.

## Configuración

```bash
pnpm install
Copy-Item .env.example .env.local
```

Completar `NEXT_PUBLIC_WHATSAPP_NUMBER` con el número internacional, solo dígitos. Ejemplo de formato: código de país + característica + número.

Los demás datos son opcionales:

```env
NEXT_PUBLIC_CONTACT_EMAIL=
NEXT_PUBLIC_OFFICE_ADDRESS=
NEXT_PUBLIC_OFFICE_HOURS=
```

## Comandos

```bash
pnpm dev
pnpm test
pnpm lint
pnpm typecheck
pnpm build
```

El sitio usa `https://wa.me/?text=...` mientras no haya un número configurado. Al completar la variable de entorno, todos los CTA apuntan automáticamente al contacto directo.
