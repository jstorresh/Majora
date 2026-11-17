# majora-video

Aplicación Remotion con el video vertical de la Máscara de Majora interactiva: 1080 × 1920, 30 fps, 66 s.

## Comandos

```
npm install
npm run dev      # abre Remotion Studio
npm run lint     # valida tipos con tsc
npm run build    # renderiza out/mascara-majora-vertical.mp4
```

## Composiciones

- `MascaraMajora`: video completo (1980 fotogramas).
- `EscenaIntro`, `EscenaSensor`, `EscenaEstados`, `EscenaCalma`, `EscenaCierre`: una por escena, para previsualizar.

## Estructura

- `src/tema.ts`: paleta Grunge, duraciones por escena y tipos.
- `src/Fondo.tsx`: fondo con ruido de película y franja naranja.
- `src/Ojos.tsx`: ojos de la máscara; los ángulos de servo (0–180°) mueven las pupilas.
- `src/MascaraMajora.tsx`: las cinco escenas y la composición completa.
- `src/Root.tsx`: registro de composiciones.

Los umbrales (80 cm y 30 cm), los ángulos (90°/90°, 65°/115°, 45°/135°) y los pines salen del documento de diseño. El video no incluye audio; el guion de locución está en `../docs/guion.md`.
