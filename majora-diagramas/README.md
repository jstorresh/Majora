# Máscara de Majora interactiva

Proyecto de documentación visual de una Máscara de Majora interactiva (cosplay / wearable / prop) basada en el [documento de diseño](docs/Documento_diseno_Mascara_Majora_Interactiva.docx). Incluye un diagrama de estados en tres formatos equivalentes y un video animado vertical hecho con Remotion.

La máscara se lleva en la cabeza: un sensor ultrasónico HC-SR04 mide la distancia frente al usuario, un ESP32 elige el estado y dos servos de 180° detrás de los ojos producen el movimiento visible. Los estados se entienden por la posición y el movimiento de los ojos, sin pantalla.

## Diagrama

El diagrama cubre los cuatro estados (DORMIDA, DESPERTAR, POSESIÓN y CALMA), sus umbrales de distancia, el retorno temporal de 5 s, la rama de lectura inválida del sensor y los pines del ESP32. Si se modifica el contenido, mantener la información esencial sincronizada en los tres archivos:

- [`majora-estados.svg`](majora-estados.svg): versión vectorial para ver en navegador y escalar sin perder calidad.
- [`majora-estados.excalidraw`](majora-estados.excalidraw): versión editable en Excalidraw.
- [`majora-estados.mmd`](majora-estados.mmd): versión Mermaid, editable como texto y renderizable en herramientas compatibles.

El estilo obligatorio de los diagramas es Grunge, con una paleta basada en negro, gris, naranja y rojo. No sustituir estos formatos ni usar generadores de imágenes para crear diagramas o recursos.

| Estado | Condición | Servos (izq / der) |
| --- | --- | --- |
| DORMIDA | Sin persona o > 80 cm | 90° / 90° |
| DESPERTAR | Persona entre 30 y 80 cm | 65° / 115° |
| POSESIÓN | Persona ≤ 30 cm | alternan 45°/135° ↔ 135°/45° |
| CALMA | La persona se aleja y pasan 5 s | regreso lento a 90° / 90° |

Pines: TRIG → GPIO 5 · ECHO → GPIO 18 · servo izquierdo → GPIO 13 · servo derecho → GPIO 12 · GND común.

## Video

La aplicación de [`majora-video/`](majora-video) contiene un video vertical de 1080 × 1920, a 30 fps y 66 segundos. Recorre la introducción, el sensor y el circuito, los estados por distancia, la calma con las medidas de seguridad y el cierre. Remotion registra la composición `MascaraMajora` y una composición por escena para previsualizar.

Para generarlo, ejecuta desde `majora-video/`:

```
npm install
npx remotion render src/index.ts MascaraMajora out/mascara-majora-vertical.mp4
```

Para abrir Remotion Studio o validar el código:

```
npm run dev
npm run lint
```

El render queda en `majora-video/out/`, excluido de Git. El video no incluye locución; el texto sincronizado está en `docs/guion.md`.

## Documentación

- [`docs/guion.md`](docs/guion.md): guion narrativo y visual, con tiempos por escena.
- [`docs/estilo-grunge.md`](docs/estilo-grunge.md): referencia de estilo y paleta.
- [`docs/Documento_diseno_Mascara_Majora_Interactiva.docx`](docs/Documento_diseno_Mascara_Majora_Interactiva.docx): documento de diseño original (fuente de contenido).
- [`majora-video/README.md`](majora-video/README.md): detalles y comandos de la aplicación de video.

## Estado pendiente (según el documento de diseño)

Validar medidas reales del modelo 3D en Blender, definir el mecanismo de cada ojo, montar y capturar la simulación en Wokwi (el enlace aún está por pegar en el documento), ajustar umbrales y tiempos, y documentar el montaje físico. Al verificar el montaje físico, comprobar la alimentación de los servos y la compatibilidad de niveles del ECHO del HC-SR04 con el ESP32.
