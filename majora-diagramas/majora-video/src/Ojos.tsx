import React from 'react';
import {C} from './tema';

type Props = {
  izq: number; // ángulo del servo izquierdo (0-180)
  der: number; // ángulo del servo derecho (0-180)
  abierto: number; // 0 = cerrado, 1 = totalmente abierto
  color: string;
  ancho?: number;
  id?: string;
};

// 90° = pupila centrada; ±45° = desplazamiento máximo.
const desplazamiento = (grados: number) => ((grados - 90) / 45) * 60;

export const Ojos: React.FC<Props> = ({izq, der, abierto, color, ancho = 900, id = 'ojos'}) => {
  const ry = Math.max(6, 110 * abierto);

  const ojo = (cx: number, grados: number, clave: string) => (
    <g key={clave}>
      <clipPath id={`${id}-${clave}`}>
        <ellipse cx={cx} cy={150} rx={140} ry={ry} />
      </clipPath>
      <ellipse cx={cx} cy={150} rx={140} ry={ry} fill={C.texto} opacity={0.92} />
      <g clipPath={`url(#${id}-${clave})`}>
        <circle cx={cx + desplazamiento(grados)} cy={150} r={62} fill={color} />
        <circle cx={cx + desplazamiento(grados)} cy={150} r={26} fill={C.negro} />
      </g>
      <ellipse cx={cx} cy={150} rx={140} ry={ry} fill="none" stroke={C.negro} strokeWidth={10} />
    </g>
  );

  return (
    <svg
      width={ancho}
      height={(ancho * 300) / 800}
      viewBox="0 0 800 300"
      style={{filter: `drop-shadow(0 0 28px ${color})`}}
    >
      {ojo(220, izq, 'izq')}
      {ojo(580, der, 'der')}
    </svg>
  );
};
