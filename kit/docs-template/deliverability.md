# Deliverability y DNS — [PENDIENTE: nombre]

## Dominio

- Dominio principal:
- Subdominio de envío (ej. `mail.`):
- Email de marca (ej. `hola@`):

## Registros DNS obligatorios

| Tipo | Nombre | Valor | Estado |
|---|---|---|---|
| SPF | | | [PENDIENTE] |
| DKIM | | | [PENDIENTE] |
| DMARC | | | [PENDIENTE] |

## Checklist

- [ ] Dominio verificado en el proveedor de email.
- [ ] SPF, DKIM y DMARC configurados y validados.
- [ ] DMARC en `p=none` y plan de escalado a `quarantine`/`reject`.
- [ ] Prueba de entrega en Gmail, Outlook y Yahoo.
- [ ] Advertencia: nunca enviar cold email por el dominio principal.
