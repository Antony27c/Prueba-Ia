# Examen Multiple Choice

Aplicación web de simulación de exámenes multiple choice para las materias **Prácticas Profesionalizantes II** y **Bases de Datos**. Construida con Next.js 14 y desplegada en Vercel.

## Stack

| Tecnología | Versión |
|------------|---------|
| **Next.js** (App Router) | 14.2.21 |
| **React** | 18.3.1 |
| **TypeScript** | 5.7.3 |
| **Tailwind CSS** | 3.4.17 |
| **IA** | GroqCloud (`llama-3.1-8b-instant`) |
| **Deploy** | Vercel |

## Estructura del proyecto

```
/
├── app/
│   ├── page.tsx              → Menú principal (/) — elegís PP o BD
│   ├── layout.tsx            → Layout raíz con wrapper dark
│   ├── globals.css           → Tailwind + estilos personalizados
│   ├── api/feedback/route.ts → POST /api/feedback (proxy a Groq)
│   └── examen/
│       ├── pp/
│       │   ├── page.tsx      → Examen PP original (20 preg., 3 unidades)
│       │   ├── niveles/page.tsx → Selector de dificultad (4 niveles)
│       │   ├── facil/page.tsx → Nivel fácil — multiple choice directo
│       │   ├── intermedio/page.tsx → Nivel intermedio — trampa, código, sutilezas
│       │   └── dificil/page.tsx → Nivel difícil — respuesta libre con IA
│       └── bd/page.tsx       → Examen BD (22 preguntas, 3 temas)
├── data/
│   ├── questions-bd.ts        → Preguntas de Bases de Datos
│   ├── questions-pp-facil.ts  → 20 preguntas nivel fácil
│   ├── questions-pp-intermedio.ts → 20 preguntas nivel intermedio
│   └── questions-pp-dificil.ts   → 13 preguntas nivel difícil
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
├── vercel.json
└── package.json
```

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Menú principal para seleccionar examen |
| `/examen/pp` | Examen PP original |
| `/examen/pp/niveles` | Selector de dificultad (4 niveles) |
| `/examen/pp/facil` | Nivel fácil — múltiple choice directo |
| `/examen/pp/intermedio` | Nivel intermedio — preguntas con trampa |
| `/examen/pp/dificil` | Nivel difícil — respuesta libre evaluada por IA |
| `/examen/bd` | Simulador de Bases de Datos |
| `/api/feedback` | API endpoint para feedback con IA |

## Exámenes

### Prácticas Profesionalizantes

El examen PP tiene **4 niveles de dificultad** seleccionables desde `/examen/pp/niveles`:

- **Nivel Original** — El examen original con 20 preguntas (7+9+4). Flujo secuencial por unidades con banners.
- **Nivel Fácil** — 20 preguntas de multiple choice directas y conceptuales. Feedback IA en incorrectas.
- **Nivel Intermedio** — 20 preguntas con 3 tipos: "¿Cuál NO es?", lectura de código, y diferencias sutiles. Feedback IA en incorrectas.
- **Nivel Difícil** — 13 preguntas de respuesta libre. La IA evalúa cada respuesta como correcta, parcial o incorrecta. Hasta 2 reintentos por pregunta.

**Unidades** (los 4 niveles cubren el mismo temario):
- **Unidad 1** — Entorno del Programador + HTML/CSS (7 preguntas)
- **Unidad 2** — CSS Avanzado, JavaScript ES6+ y Servidor Web (9 preguntas)
- **Unidad 3** — React.js y Frontend Profesional (4 preguntas)

### Bases de Datos (22 preguntas)

- **TP01** — Archivos, carpetas, metadatos, extensiones, CSV vs XLSX, rutas (6 preguntas)
- **TP02** — DBMS, arquitectura tres niveles, DDL/DML/DCL, DA vs DBA, redundancia, independencia de datos, fases del diseño (8 preguntas)
- **TP03** — Entidades, atributos, relaciones, cardinalidad, modelo de Chen (8 preguntas)

Navegación libre entre preguntas con botones anterior/siguiente y puntos de acceso rápido. Feedback visual inmediato al responder y explicaciones generadas por IA en respuestas incorrectas.

## Funcionalidades

- Feedback visual inmediato (verde = correcto, rojo = incorrecto)
- Explicación con IA para cada respuesta incorrecta (vía GroqCloud)
- Efecto máquina de escribir en las explicaciones
- Skeletons de carga mientras la IA procesa
- Barra de progreso global
- Contador de preguntas respondidas
- Puntos de navegación rápida (BD)
- Pantalla de resultados con desglose por unidad/tema
- Diseño responsive y dark theme
- `AbortController` para cancelar peticiones al navegar
- Selector de dificultad con 4 niveles (Original / Fácil / Intermedio / Difícil)
- Preguntas tipo "leer código" con bloque de código monoespaciado
- Evaluación con IA para respuestas de texto libre (nivel difícil)
- Hasta 2 reintentos por pregunta en nivel difícil

## Cómo correr localmente

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variable de entorno
# Creá .env.local con:
# GROQ_API_KEY=tu_api_key

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir http://localhost:3000
```

## Cómo desplegar en Vercel

1. Subí el proyecto a GitHub
2. Importalo en [Vercel](https://vercel.com)
3. Configurá la variable de entorno `GROQ_API_KEY` en Vercel (Settings → Environment Variables)
4. Vercel detecta automáticamente Next.js gracias al `vercel.json`
5. Hacé deploy

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `GROQ_API_KEY` | API key de GroqCloud para el feedback con IA |
