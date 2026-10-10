---
name: react-conventions
description: Estandares de React del kit (hooks, composicion, estado, estructura de features, naming). Usalo cuando se creen o refactoricen componentes React, hooks, o cuando haya que decidir donde vive estado o logica de UI.
license: MIT
compatibility: opencode
metadata:
  bloque: B2
  default: react-server-components
---

# React — convenciones

## Default y alternativas

- **Default**: React con Server Components, hooks y componentes de función.
- Estado global: **ninguno por defecto**. Solo agregar librería si hay necesidad real.
- Alternativas de estado: Zustand (cliente), URL state (preferido para filtros), React Query (si hay mucho fetching cliente).

## Reglas

### Componentes

- Componentes de función. **Un componente = un propósito**.
- Props tipadas explícitamente; sin `React.FC`.
- Composición sobre props booleanas: preferí `children`/slots a `isX`, `showY`.
- Presentacional (puro, sin datos) vs contenedor (obtiene datos). Separalos.

### Hooks

- Hooks propios con prefijo `use`, un propósito, y retorno estable.
- `useEffect` es el último recurso: si podés derivar en render o resolver en el server, hacelo.
- Dependencias explícitas y completas; nunca silenciar el linter.

### Estado

- Estado local para lo local; **URL (search params)** para filtros/paginación; servidor para datos persistentes.
- Derivá en vez de sincronizar estado (evitá `useEffect` que copia props a state).
- No metas estado global para 2-3 pantallas.

### Estructura por dominio

```
features/<dominio>/
  components/
  hooks/
  actions.ts
  schemas.ts
  types.ts
```

### Naming

- Componentes y archivos: `PascalCase.tsx`.
- Hooks y utilidades: `camelCase.ts`.
- Código en inglés; textos de UI en español.

## Cómo afecta al scaffold

- Crea `features/` con la convención y componentes base de ejemplo.

## Checklist

- [ ] Sin `useEffect` para derivar o copiar estado.
- [ ] Filtros en search params, no en estado global.
- [ ] Componentes pequeños y de un propósito.
