---
name: ci-cd
description: Estandares de integracion y despliegue continuo del kit (GitHub Actions, checks obligatorios, preview deploys en Vercel, branch de Neon por PR, gate de cobertura). Usalo al configurar acciones, deploy, checks de PR o cuando haya que definir como se valida y publica el proyecto.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: github-actions+vercel
  db: neon-branch-per-pr
---

# CI/CD — convenciones

## Default

- GitHub Actions para CI; Vercel para deploys (front; y back en Render si `layout: split-backend`).
- Neon: branch efímera por PR para integration/E2E.

## Reglas

### Checks obligatorios en PR

En orden de velocidad, todos obligatorios:

1. `lint` (ESLint) + formato.
2. `typecheck` (`tsc --noEmit`).
3. `test:unit` (Jest) + **coverage gate** (ratchet).
4. `build` (producción).
5. `test:e2e @critical` contra preview.
6. `a11y` (axe) en componentes base (ver skill `accessibility`).

`@full` E2E corre nightly y bloquea el merge si estaba en el pre-merge.

### Preview deploys

- Cada PR genera preview en Vercel con su propia `DATABASE_URL` de branch de Neon.
- La branch se crea al abrir el PR y se borra al mergear/cerrar.
- No compartir la DB de producción/staging con previews.

### Branch protection

- `main` protegida: no push directo, checks requeridos, 1 review.
- Historial lineal (squash).

### Secretos en CI

- Secrets de GitHub, nunca en el YAML. En configs usar `{env:VAR}`.
- Rotar cualquier secreto que se haya expuesto.

### Deploy a producción

- Merge a `main` → deploy automático a producción.
- Migraciones corren antes del deploy de la app (orden explícito).
- Rollback: Vercel instant rollback + migración reversible documentada.

## Cómo afecta al scaffold

- `.github/workflows/ci.yml`, `.github/workflows/e2e-nightly.yml`, `vercel.json` (si aplica), y un job de branch de Neon.

## Checklist

- [ ] Todos los checks obligatorios corriendo.
- [ ] Preview con DB efímera.
- [ ] `main` protegida.
- [ ] Migraciones ordenadas antes del deploy.
