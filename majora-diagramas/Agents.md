# Guía para agentes

## Alcance del proyecto

- Consulta [`README.md`](README.md) para el estado, los entregables y los comandos vigentes.
- La fuente de contenido es `docs/Documento_diseno_Mascara_Majora_Interactiva.docx`. Si el documento y los entregables difieren, el documento manda.
- El repositorio incluye tres formatos de diagrama y una aplicación de video Remotion en `majora-video/`.

## Diagramas

- Cada diagrama debe entregarse en `.svg`, `.excalidraw` y `.mmd`. Conserva el mismo tema y contenido esencial en las tres representaciones; actualízalas juntas cuando cambie el diagrama.
- Usa el estilo Grunge y una paleta basada en negro, gris, naranja y rojo (ver `docs/estilo-grunge.md`).
- No uses generadores de imágenes para crear diagramas ni sus recursos.
- Datos que deben coincidir con el documento: umbrales (80 cm y 30 cm), retorno a la calma tras 5 s, ángulos de servo y pines (TRIG 5, ECHO 18, servo izquierdo 13, servo derecho 12).

## Aplicación de video

- Trabaja dentro de `majora-video/` y sigue sus dependencias, formato y convenciones existentes.
- Para instalar, iniciar Remotion Studio y validar tipos, ejecuta desde `majora-video/`: `npm install`, `npm run dev` y `npm run lint`.
- Los renders se guardan en `majora-video/out/`, excluido de Git. No elimines ni reemplaces renders existentes sin que la tarea lo requiera.
- Si cambian las duraciones de escena en `src/tema.ts`, actualiza los tiempos de `docs/guion.md`.

## Cambios y validación

- Mantén sincronizados los entregables relacionados y actualiza la documentación pertinente cuando cambie el uso o el estado del proyecto.
- Ejecuta la validación más pequeña que cubra el cambio; para la aplicación de video, usa `npm run lint` desde `majora-video/`.
