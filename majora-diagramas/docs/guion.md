# Guion: Máscara de Majora interactiva

Video vertical de 1080 × 1920, 30 fps, 66 s (1980 fotogramas). Los tiempos coinciden con las duraciones definidas en `majora-video/src/tema.ts`.

| Escena | Tiempo | Fotogramas |
| --- | --- | --- |
| 1. Introducción | 0:00–0:08 | 0–240 |
| 2. El sensor y el circuito | 0:08–0:22 | 240–660 |
| 3. Los estados | 0:22–0:44 | 660–1320 |
| 4. Calma y seguridad | 0:44–0:58 | 1320–1740 |
| 5. Cierre | 0:58–1:06 | 1740–1980 |

## 1. Introducción (8 s)

**Visual:** título "MÁSCARA DE MAJORA" en naranja, etiqueta roja "INTERACTIVA", ojos casi cerrados con respiración leve y un glitch breve.

**Locución:** Una máscara que no se queda quieta. Esta Máscara de Majora vive en la cabeza de quien la lleva y reacciona a quien se acerca.

## 2. El sensor y el circuito (14 s)

**Visual:** sensor HC-SR04 con ondas que salen del emisor. Los cuatro pines aparecen uno a uno: TRIG GPIO 5, ECHO GPIO 18, servo izquierdo GPIO 13, servo derecho GPIO 12.

**Locución:** Un sensor ultrasónico mide la distancia frente a la máscara. El ESP32 interpreta esa medida y elige un estado. Dos microservos, detrás de los ojos, convierten la decisión en movimiento visible.

## 3. Los estados (22 s)

**Visual:** ojos grandes al centro y una barra de distancia con las marcas de 30 y 80 cm. Una persona se acerca: la barra pasa de gris a naranja y a rojo, y el nombre del estado cambia de color. En POSESIÓN los ojos alternan rápido.

**Locución:** Más allá de ochenta centímetros, la máscara duerme y los ojos descansan en posición neutra. Entre treinta y ochenta, despierta: los ojos se abren y cambian lentamente. A treinta centímetros o menos entra en posesión: los ojos se mueven rápido y alternados. Se entiende sin pantalla ni explicaciones.

## 4. Calma y seguridad (14 s)

**Visual:** cuenta regresiva de 5 s con la persona alejándose. Los ojos regresan lentamente a la posición neutra y el estado pasa de CALMA a DORMIDA. Después aparecen tres medidas de seguridad.

**Locución:** Cuando la persona se aleja y pasan cinco segundos, llega la calma y los ojos regresan despacio. Si el sensor falla, la máscara adopta una posición segura. Servos, cables y batería van fijados, y el campo de visión queda libre.

## 5. Cierre (8 s)

**Visual:** título de cierre, "Cosplay · Wearable · Prop", herramientas (ESP32, Blender, Wokwi) y los ojos que se cierran.

**Locución:** Máscara de Majora interactiva. Una prop que despierta cuando alguien se acerca.
