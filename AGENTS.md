# Reglas base del kit `bootstrap-ia`

Estas reglas aplican a todo el trabajo en este repositorio y a los proyectos que generate el kit.

## Idioma y tono

- Respondé siempre en **español**.
- Sé directo y conciso. Sin preámbulos ni resúmenes innecesarios.
- Explicá los comandos no triviales antes de ejecutarlos.

## Principios del kit

1. **Delivery primero**: el objetivo es llegar a un MVP desplegado en el menor tiempo posible.
2. **Todo por defecto, todo configurable**: las decisiones viven en `bootstrap.config.json`. Si algo no está definido, preguntá; no asumas.
3. **Adapters solo en bordes de swap/confianza**: pagos, auth, email, mensajería, observabilidad. Interfaces finas, sin abstracción prematura.
4. **Spec-first**: antes de implementar una feature, generá una spec con criterios Given/When/Then. Después los tests.
5. **Scaffold con CLIs reales**: nunca generes boilerplate de frameworks a mano. Usá `create-next-app`, el CLI de shadcn, migraciones reales y verificá con `build` + tests.
6. **Verificación antes de declarar listo**: mostrá la evidencia (comando + salida) antes de decir "terminado". Ver skill `verification-before-completion`.

## Código

- **No agregues comentarios** salvo que se pidan explícitamente.
- TypeScript strict. Sin `any`. Validación de inputs con Zod en los bordes.
- Convenciones de nombres en inglés para código; documentación y UI en español salvo indicación contraria.
- Referenciá código como `ruta/archivo.ts:línea` en las explicaciones.

## Seguridad

- Secretos solo en `.env` (nunca commiteados). En configs usá `{env:VAR}`.
- Nunca loguear ni exponer tokens, API keys ni connection strings.
- Variables de servidor sin prefijo `NEXT_PUBLIC_`. Cero código de servidor importado en el cliente.
- Operaciones destructivas (MCP o SQL) siempre se preguntan antes de ejecutar.

## Testing

- Stack: Jest + React Testing Library + Playwright.
- Probar **comportamiento**, no implementación. RTL: consultar por rol/texto. `userEvent` sobre `fireEvent`.
- Mockear solo en los bordes de red (MSW). Aislar DB con una branch de Neon por PR.
- Cobertura objetivo: **90% en dominio/servicios** con gate de ratchet (nunca baja).
- E2E amplio: `@critical` en cada PR, `@full` nightly.
- `Definition of Done`: tests verdes + cobertura + a11y sin errores + build limpio.

## Git

- **GitHub Flow** + **Conventional Commits** (`feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`).
- Ramas cortas desde `main`. PR con descripción y checks verdes.
- No commitear archivos generados ni secretos (ver `.gitignore`).
- Aislá cada feature en su propio worktree (`/worktree`): una feature = un worktree = una branch = un PR.
- Puertos por worktree: `node scripts/ports.mjs` (determinístico). DB compartida: no corras migraciones en dos worktrees a la vez.

## Estado y memoria

- Mantené `PROJECT_STATE.md` actualizado tras cada hito: estado actual, próximo paso y decisiones tomadas.
- Este archivo es la memoria entre sesiones: si una sesión nueva empieza, leela junto con `PROJECT_STATE.md` y `bootstrap.config.json`.
