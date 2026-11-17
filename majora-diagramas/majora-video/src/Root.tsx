import React from 'react';
import {Composition} from 'remotion';
import {
  EscenaCalma,
  EscenaCierre,
  EscenaEstados,
  EscenaIntro,
  EscenaSensor,
  MascaraMajora,
} from './MascaraMajora';
import {ALTO, ANCHO, D, FPS, TOTAL} from './tema';

const comun = {fps: FPS, width: ANCHO, height: ALTO} as const;

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="MascaraMajora" component={MascaraMajora} durationInFrames={TOTAL} {...comun} />
    <Composition id="EscenaIntro" component={EscenaIntro} durationInFrames={D.intro} {...comun} />
    <Composition id="EscenaSensor" component={EscenaSensor} durationInFrames={D.sensor} {...comun} />
    <Composition id="EscenaEstados" component={EscenaEstados} durationInFrames={D.estados} {...comun} />
    <Composition id="EscenaCalma" component={EscenaCalma} durationInFrames={D.calma} {...comun} />
    <Composition id="EscenaCierre" component={EscenaCierre} durationInFrames={D.cierre} {...comun} />
  </>
);
