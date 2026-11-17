import React from 'react';
import {AbsoluteFill, Easing, Sequence, interpolate, useCurrentFrame} from 'remotion';
import {Fondo} from './Fondo';
import {Ojos} from './Ojos';
import {
  C,
  COLOR_ESTADO,
  D,
  Estado,
  NOMBRE_ESTADO,
  fuenteMono,
  fuenteTitulo,
  limitar,
} from './tema';

const aparecer = (f: number, inicio: number, dur = 20) =>
  interpolate(f, [inicio, inicio + dur], [0, 1], limitar);

const Etiqueta: React.FC<{texto: string; color?: string; tam?: number}> = ({
  texto,
  color = C.gris,
  tam = 38,
}) => (
  <div style={{fontFamily: fuenteMono, color, fontSize: tam, letterSpacing: 6, textAlign: 'center'}}>
    {texto}
  </div>
);

const Titular: React.FC<{texto: string; color?: string; tam?: number}> = ({
  texto,
  color = C.naranja,
  tam = 120,
}) => (
  <div style={{fontFamily: fuenteTitulo, color, fontSize: tam, lineHeight: 1, textAlign: 'center'}}>
    {texto}
  </div>
);

// ---------- Lógica de estados (igual que el código base del documento) ----------

const estadoPorDistancia = (d: number): Estado =>
  d > 80 ? 'DORMIDA' : d > 30 ? 'DESPERTAR' : 'POSESION';

const angulosPorDistancia = (d: number, f: number) => {
  let izq = interpolate(d, [30, 35, 75, 80], [45, 65, 65, 90], limitar);
  let der = 180 - izq;
  // POSESIÓN: los servos alternan posiciones.
  if (d <= 30 && Math.floor(f / 6) % 2 === 1) {
    izq = 180 - izq;
    der = 180 - der;
  }
  return {izq, der};
};

// ---------- Escena 1: introducción ----------

export const EscenaIntro: React.FC = () => {
  const f = useCurrentFrame();
  const abierto = 0.24 + 0.03 * Math.sin(f / 12);
  const glitch = f % 47 < 3 ? 10 : 0;

  return (
    <Fondo>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: aparecer(f, 10, 30), transform: `translateX(${glitch}px)`, textAlign: 'center'}}>
          <Etiqueta texto="COSPLAY · WEARABLE · PROP" />
          <div
            style={{
              fontFamily: fuenteTitulo,
              color: C.naranja,
              fontSize: 170,
              lineHeight: 0.95,
              marginTop: 30,
            }}
          >
            MÁSCARA
            <br />
            DE MAJORA
          </div>
          <div
            style={{
              display: 'inline-block',
              background: C.rojo,
              color: C.texto,
              fontFamily: fuenteTitulo,
              fontSize: 80,
              padding: '6px 36px',
              marginTop: 30,
              transform: 'rotate(-3deg)',
            }}
          >
            INTERACTIVA
          </div>
        </div>
        <div style={{marginTop: 120, opacity: aparecer(f, 60, 30)}}>
          <Ojos izq={90} der={90} abierto={abierto} color={C.gris} id="intro" />
        </div>
        <div style={{marginTop: 80, opacity: aparecer(f, 120, 30)}}>
          <Etiqueta texto="ESP32 · HC-SR04 · SERVOS 180°" color={C.grisClaro} tam={34} />
        </div>
      </AbsoluteFill>
    </Fondo>
  );
};

// ---------- Escena 2: sensor y circuito ----------

const PINES: ReadonlyArray<readonly [string, string]> = [
  ['TRIG', 'GPIO 5'],
  ['ECHO', 'GPIO 18'],
  ['SERVO IZQUIERDO', 'GPIO 13'],
  ['SERVO DERECHO', 'GPIO 12'],
];

export const EscenaSensor: React.FC = () => {
  const f = useCurrentFrame();

  return (
    <Fondo>
      <AbsoluteFill style={{padding: '170px 70px 0', alignItems: 'center'}}>
        <div style={{opacity: aparecer(f, 0, 20)}}>
          <Titular texto="EL SENSOR" />
        </div>
        <svg
          width={800}
          height={420}
          viewBox="0 0 800 420"
          style={{marginTop: 60, overflow: 'visible', opacity: aparecer(f, 10, 25)}}
        >
          {[0, 1, 2].map((k) => {
            const fase = ((f + k * 20) % 60) / 60;
            return (
              <circle
                key={k}
                cx={230}
                cy={210}
                r={110 + fase * 260}
                fill="none"
                stroke={C.naranja}
                strokeWidth={6}
                opacity={(1 - fase) * 0.7}
              />
            );
          })}
          <rect x={20} y={60} width={760} height={300} fill={C.carbon} stroke={C.gris} strokeWidth={6} />
          <circle cx={230} cy={210} r={100} fill={C.negro} stroke={C.naranja} strokeWidth={8} />
          <circle cx={570} cy={210} r={100} fill={C.negro} stroke={C.grisClaro} strokeWidth={8} />
          <circle cx={230} cy={210} r={46} fill={C.carbon} stroke={C.gris} strokeWidth={4} />
          <circle cx={570} cy={210} r={46} fill={C.carbon} stroke={C.gris} strokeWidth={4} />
          <text x={400} y={405} textAnchor="middle" fontFamily={fuenteMono} fontSize={28} fill={C.grisClaro}>
            HC-SR04
          </text>
        </svg>
        <div style={{marginTop: 70, opacity: aparecer(f, 60, 25)}}>
          <Etiqueta texto="MIDE LA DISTANCIA AL FRENTE" color={C.grisClaro} tam={36} />
        </div>
        <div style={{marginTop: 60, width: 880}}>
          {PINES.map(([nombre, pin], i) => {
            const t = aparecer(f, 140 + i * 45, 18);
            return (
              <div
                key={nombre}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: fuenteMono,
                  fontSize: 46,
                  color: C.texto,
                  borderBottom: `3px solid ${C.gris}`,
                  padding: '14px 10px',
                  opacity: t,
                  transform: `translateX(${(1 - t) * -60}px)`,
                }}
              >
                <span>{nombre}</span>
                <span style={{color: C.naranja}}>{pin}</span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </Fondo>
  );
};

// ---------- Escena 3: estados por distancia ----------

export const EscenaEstados: React.FC = () => {
  const f = useCurrentFrame();
  const d = interpolate(
    f,
    [0, 180, 230, 330, 400, 450, 660],
    [120, 110, 70, 55, 45, 22, 18],
    limitar,
  );
  const estado = estadoPorDistancia(d);
  const color = COLOR_ESTADO[estado];
  const {izq, der} = angulosPorDistancia(d, f);
  const abierto = interpolate(d, [30, 40, 75, 85, 100], [1, 0.7, 0.7, 0.22, 0.22], limitar);

  const anchoBarra = 900;
  const x = (cm: number) => interpolate(cm, [0, 120], [0, anchoBarra], limitar);

  return (
    <Fondo>
      <AbsoluteFill style={{padding: '170px 90px 0', alignItems: 'center'}}>
        <Etiqueta texto="ESTADO" color={C.gris} tam={34} />
        <div style={{marginTop: 20}}>
          <Titular texto={NOMBRE_ESTADO[estado]} color={color} tam={190} />
        </div>
        <div style={{marginTop: 90}}>
          <Ojos izq={izq} der={der} abierto={abierto} color={color} id="estados" />
        </div>
        <div style={{marginTop: 50}}>
          <Etiqueta
            texto={`SERVO IZQ ${Math.round(izq)}° · SERVO DER ${Math.round(der)}°`}
            color={C.grisClaro}
            tam={34}
          />
        </div>

        <div style={{marginTop: 150, position: 'relative', width: anchoBarra, height: 160}}>
          <div style={{position: 'absolute', top: 60, left: 0, width: x(30), height: 36, background: C.rojo}} />
          <div
            style={{position: 'absolute', top: 60, left: x(30), width: x(80) - x(30), height: 36, background: C.naranja}}
          />
          <div
            style={{position: 'absolute', top: 60, left: x(80), width: x(120) - x(80), height: 36, background: C.gris}}
          />
          {[30, 80].map((cm) => (
            <div
              key={cm}
              style={{
                position: 'absolute',
                top: 110,
                left: x(cm) - 60,
                width: 120,
                textAlign: 'center',
                fontFamily: fuenteMono,
                fontSize: 34,
                color: C.texto,
              }}
            >
              {cm} cm
            </div>
          ))}
          <div
            style={{
              position: 'absolute',
              top: 18,
              left: x(d) - 24,
              width: 48,
              height: 48,
              borderRadius: 24,
              background: C.texto,
              border: `6px solid ${C.negro}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: -30,
              left: x(d) - 100,
              width: 200,
              textAlign: 'center',
              fontFamily: fuenteMono,
              fontSize: 34,
              color: C.texto,
            }}
          >
            {Math.round(d)} cm
          </div>
        </div>
      </AbsoluteFill>
    </Fondo>
  );
};

// ---------- Escena 4: calma y seguridad ----------

const SEGURIDAD = [
  'Sensor sin lectura: posición segura 90° / 90°',
  'Servos, cables y batería bien fijados',
  'Campo de visión libre · se pone y quita rápido',
];

export const EscenaCalma: React.FC = () => {
  const f = useCurrentFrame();
  const restante = Math.max(0, 5 - f / 30);
  const retorno = interpolate(f, [150, 240], [0, 1], {...limitar, easing: Easing.inOut(Easing.ease)});
  const izq = 65 + 25 * retorno;
  const der = 180 - izq;
  const abierto = 0.65 - (0.65 - 0.22) * retorno;

  const estado: Estado = f < 150 ? 'DESPERTAR' : f < 240 ? 'CALMA' : 'DORMIDA';
  const color = COLOR_ESTADO[estado];
  const progreso = Math.min(1, f / 150);
  const radio = 130;
  const circunferencia = 2 * Math.PI * radio;
  const opacidadAnillo = 1 - aparecer(f, 240, 20);

  return (
    <Fondo>
      <AbsoluteFill style={{padding: '170px 80px 0', alignItems: 'center'}}>
        <Etiqueta texto={f < 150 ? 'LA PERSONA SE ALEJA' : 'SIN PRESENCIA CERCANA'} color={C.grisClaro} tam={34} />
        <div style={{marginTop: 20}}>
          <Titular texto={NOMBRE_ESTADO[estado]} color={color} tam={170} />
        </div>
        <div style={{marginTop: 70}}>
          <Ojos izq={izq} der={der} abierto={abierto} color={color} id="calma" />
        </div>

        <div style={{position: 'relative', width: 920, height: 620, marginTop: 60}}>
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: 920,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              opacity: opacidadAnillo,
            }}
          >
            <svg width={320} height={320} viewBox="0 0 320 320">
              <circle cx={160} cy={160} r={radio} fill="none" stroke={C.carbon} strokeWidth={26} />
              <circle
                cx={160}
                cy={160}
                r={radio}
                fill="none"
                stroke={C.naranja}
                strokeWidth={26}
                strokeDasharray={circunferencia}
                strokeDashoffset={circunferencia * progreso}
                transform="rotate(-90 160 160)"
              />
              <text
                x={160}
                y={190}
                textAnchor="middle"
                fontFamily={fuenteTitulo}
                fontSize={100}
                fill={C.texto}
              >
                {restante.toFixed(1)}
              </text>
            </svg>
            <Etiqueta texto="SEGUNDOS PARA LA CALMA" color={C.gris} tam={32} />
          </div>

          <div style={{position: 'absolute', top: 0, left: 0, width: 920}}>
            {SEGURIDAD.map((linea, i) => {
              const t = aparecer(f, 270 + i * 40, 18);
              return (
                <div
                  key={linea}
                  style={{
                    fontFamily: fuenteMono,
                    fontSize: 40,
                    color: C.texto,
                    borderLeft: `10px solid ${i === 0 ? C.rojo : C.naranja}`,
                    background: C.carbon,
                    padding: '22px 28px',
                    marginBottom: 34,
                    opacity: t,
                    transform: `translateX(${(1 - t) * 80}px)`,
                  }}
                >
                  {linea}
                </div>
              );
            })}
          </div>
        </div>
      </AbsoluteFill>
    </Fondo>
  );
};

// ---------- Escena 5: cierre ----------

export const EscenaCierre: React.FC = () => {
  const f = useCurrentFrame();
  const abierto = interpolate(f, [0, 90, 150, 220], [0.6, 1, 0.6, 0.04], limitar);
  const color = interpolate(f, [0, 90, 150], [0, 1, 2], limitar) < 1.5 ? C.naranja : C.gris;

  return (
    <Fondo>
      <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
        <div style={{opacity: aparecer(f, 0, 25)}}>
          <Ojos izq={90} der={90} abierto={abierto} color={color} id="cierre" />
        </div>
        <div style={{marginTop: 110, opacity: aparecer(f, 40, 30)}}>
          <Titular texto="MÁSCARA DE" tam={130} />
          <Titular texto="MAJORA" tam={190} />
        </div>
        <div style={{marginTop: 30, opacity: aparecer(f, 70, 30)}}>
          <Etiqueta texto="INTERACTIVA" color={C.rojo} tam={52} />
        </div>
        <div style={{marginTop: 90, opacity: aparecer(f, 100, 30)}}>
          <Etiqueta texto="ESP32 · BLENDER · WOKWI" color={C.grisClaro} tam={34} />
        </div>
      </AbsoluteFill>
    </Fondo>
  );
};

// ---------- Video completo ----------

export const MascaraMajora: React.FC = () => {
  const inicioSensor = D.intro;
  const inicioEstados = inicioSensor + D.sensor;
  const inicioCalma = inicioEstados + D.estados;
  const inicioCierre = inicioCalma + D.calma;

  return (
    <AbsoluteFill style={{backgroundColor: C.negro}}>
      <Sequence from={0} durationInFrames={D.intro}>
        <EscenaIntro />
      </Sequence>
      <Sequence from={inicioSensor} durationInFrames={D.sensor}>
        <EscenaSensor />
      </Sequence>
      <Sequence from={inicioEstados} durationInFrames={D.estados}>
        <EscenaEstados />
      </Sequence>
      <Sequence from={inicioCalma} durationInFrames={D.calma}>
        <EscenaCalma />
      </Sequence>
      <Sequence from={inicioCierre} durationInFrames={D.cierre}>
        <EscenaCierre />
      </Sequence>
    </AbsoluteFill>
  );
};
