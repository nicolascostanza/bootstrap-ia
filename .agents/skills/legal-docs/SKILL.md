---
name: legal-docs
description: Checklists y borradores legales iniciales del kit (terminos, privacidad, cookies, entidad, impuestos) con foco Argentina. Usalo al lanzar publicamente, recolectar datos de usuarios, configurar una entidad o entender obligaciones legales basicas.
license: MIT
compatibility: opencode
metadata:
  bloque: B11
  jurisdiction-default: AR
---

# Legal y fiscal (checklists)

> **Disclaimer**: no es asesoría legal ni contable. Son checklists y borradores para ordenar el arranque; lo vinculante lo revisa un profesional en la jurisdicción correspondiente.

## Antes de lanzar públicamente

- [ ] Términos y Condiciones (uso, responsabilidad, cancelación).
- [ ] Política de Privacidad (qué datos, para qué, cuánto tiempo, con quién se comparten).
- [ ] Política de Cookies (si aplica) y banner de consentimiento.
- [ ] Datos de facturación visibles (razón social, CUIT, contacto).
- [ ] Canal de contacto para reclamos.

## Datos personales

- [ ] Minimizar recolección (solo lo necesario).
- [ ] Base de datos con acceso restringido y RLS.
- [ ] Derecho de acceso/borrado: proceso definido.
- [ ] Si hay usuarios UE/UK: GDPR básico (base legal, transferencias, DPA).
- [ ] Nunca exponer datos en logs (ver skill `observability`).

## Entidad y fiscal (Argentina)

- [ ] Forma jurídica: unipersonal / SAS / SRL (evaluar con contador).
- [ ] Monotributo o régimen general según facturación estimada.
- [ ] Inscripción AFIP/ARCA y punto de venta para facturar.
- [ ] Método de cobro y su tratamiento (MercadoPago/Stripe: comisiones, retenciones).
- [ ] Facturación de servicios digitales desde AR hacia el exterior (si aplica).

## Propiedad intelectual y terceros

- [ ] Licencias de dependencias (revisar licencias restrictivas).
- [ ] Marca: al menos verificar disponibilidad antes de invertir en branding.
- [ ] Contratos con freelancers/colaboradores (cesión de IP).

## Reglas

- Ante duda legal seria (contratos grandes, datos sensibles, salud/finanzas), **escalar a un profesional**.
- Registrar cada decisión legal en `docs/legal.md` con fecha.
- No copiar T&C de otra empresa sin adaptar.
