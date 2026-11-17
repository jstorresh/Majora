import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {C} from './tema';

export const Fondo: React.FC<{children?: React.ReactNode}> = ({children}) => {
  const f = useCurrentFrame();
  const opacidadRuido = 0.16 + 0.04 * Math.sin(f * 1.7) * Math.sin(f * 0.31);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: C.negro,
        backgroundImage: `radial-gradient(circle at 50% 30%, #2b1810 0%, ${C.negro} 68%)`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{position: 'absolute', top: 0, left: 0, opacity: opacidadRuido, mixBlendMode: 'overlay'}}
      >
        <filter id="ruido">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves={2}
            seed={Math.floor(f / 2)}
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#ruido)" />
      </svg>
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: -60,
          width: 1300,
          height: 16,
          background: C.naranja,
          opacity: 0.85,
          transform: 'rotate(-4deg)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 70,
          left: -60,
          width: 1300,
          height: 10,
          background: C.rojo,
          opacity: 0.8,
          transform: 'rotate(2deg)',
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
