---
name: deliverability-dns
description: Configura dominio, email de marca y registros DNS (SPF, DKIM, DMARC) para que los emails lleguen a la bandeja. Usalo al configurar el envio de emails, al arrancar un dominio, o cuando los emails caen en spam.
license: MIT
compatibility: opencode
metadata:
  bloque: B13
---

# Deliverability y DNS

## Por qué importa

Sin esto, tus emails transaccionales (verificación, magic link, recibos) caen en spam y pierden usuarios. Es lo primero que se olvida y lo más caro de arreglar después.

## Setup mínimo

1. **Subdominio de envío**: `mail.tudominio.com` (protege la reputación del dominio principal).
2. **Email de marca**: `hola@tudominio.com` (o `no-reply@` solo para transaccionales).
3. **SPF**: autorizá a tu proveedor de email (Resend/Brevo/etc.).
4. **DKIM**: firma criptográfica; pegá el registro que da el proveedor.
5. **DMARC**: empezar en `p=none` con reportes, escalar a `quarantine`/`reject` cuando valides.
6. Verificar con herramientas de entrega (Gmail/Outlook/Yahoo) antes de lanzar.

## Reglas

- **Nunca** enviar cold email ni campañas masivas por el dominio principal.
- Warm-up: subir volumen gradualmente en dominios nuevos.
- Manejar bounces y unsubscribes (listas de supresión).
- Contenido limpio: sin links sospechosos, texto/imagen balanceado.
- Separar transaccional de marketing (proveedores o subdominios distintos cuando escale).
- Monitorear reputación y tasa de entrega.

## Checklist

- [ ] Dominio verificado en el proveedor.
- [ ] SPF, DKIM y DMARC configurados.
- [ ] Prueba de entrega en los 3 proveedores principales.
- [ ] `EMAIL_FROM` usa el dominio de marca (ver `kit/scaffold/.env.example`).
- [ ] Flujo de bounces documentado.
