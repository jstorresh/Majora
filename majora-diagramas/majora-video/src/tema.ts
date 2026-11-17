export const FPS = 30;
export const ANCHO = 1080;
export const ALTO = 1920;

export const C = {
  negro: '#0d0d0d',
  carbon: '#1a1a1a',
  gris: '#8a8a8a',
  grisClaro: '#c9c9c9',
  naranja: '#ff6a00',
  rojo: '#c1121f',
  texto: '#ece8e1',
} as const;

// Duraciones por escena en fotogramas (30 fps). Total: 1980 = 66 s.
export const D = {
  intro: 240,
  sensor: 420,
  estados: 660,
  calma: 420,
  cierre: 240,
} as const;

export const TOTAL = D.intro + D.sensor + D.estados + D.calma + D.cierre;

export type Estado = 'DORMIDA' | 'DESPERTAR' | 'POSESION' | 'CALMA';

export const COLOR_ESTADO: Record<Estado, string> = {
  DORMIDA: C.gris,
  DESPERTAR: C.naranja,
  POSESION: C.rojo,
  CALMA: C.grisClaro,
};

export const NOMBRE_ESTADO: Record<Estado, string> = {
  DORMIDA: 'DORMIDA',
  DESPERTAR: 'DESPERTAR',
  POSESION: 'POSESIÓN',
  CALMA: 'CALMA',
};

export const fuenteTitulo = "Impact, 'Arial Black', sans-serif";
export const fuenteMono = "'Courier New', monospace";

export const limitar = {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
} as const;
