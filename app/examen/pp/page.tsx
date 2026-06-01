'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';

const UNITS = [
  {
    title: 'Unidad 1 — Entorno del Programador + HTML/CSS',
    icon: '🖥️',
    color: '#58a6ff',
    bg: '#1c2a41',
    btnBg: 'linear-gradient(135deg, #58a6ff, #79c0ff)',
    questions: [
      {
        question: '¿Qué es un Sistema Operativo?',
        options: [
          'a) Un lenguaje de programación',
          'b) Software intermediario entre hardware y software',
          'c) Un navegador web',
          'd) Un editor de código',
        ],
        correct: 1,
      },
      {
        question: '¿Qué hace el comando mkdir?',
        options: [
          'a) Elimina una carpeta',
          'b) Lista archivos',
          'c) Crea una carpeta nueva',
          'd) Cambia de directorio',
        ],
        correct: 2,
      },
      {
        question: '¿Qué es un IDE?',
        options: [
          'a) Un protocolo de red',
          'b) Un sistema de versiones',
          'c) Un entorno que reúne herramientas para programar',
          'd) Un tipo de base de datos',
        ],
        correct: 2,
      },
      {
        question: '¿Qué hace git push?',
        options: [
          'a) Guarda cambios en el historial local',
          'b) Prepara archivos para el commit',
          'c) Sube los commits al repositorio remoto',
          'd) Descarga cambios del repositorio',
        ],
        correct: 2,
      },
      {
        question: '¿Cuál es la diferencia principal entre Scrum y Kanban?',
        options: [
          'a) Scrum usa tableros, Kanban usa sprints',
          'b) Scrum es más estructurado con sprints y roles; Kanban es más flexible y visual',
          'c) Son exactamente iguales',
          'd) Kanban tiene roles fijos, Scrum no',
        ],
        correct: 1,
      },
      {
        question: '¿Para qué sirve la etiqueta <nav>?',
        options: [
          'a) Mostrar imágenes',
          'b) Definir el pie de página',
          'c) Representar el menú de navegación',
          'd) Crear una sección lateral',
        ],
        correct: 2,
      },
      {
        question: '¿Para qué tipo de layout es ideal CSS Grid?',
        options: [
          'a) Alinear elementos en una sola fila',
          'b) Layouts bidimensionales (filas y columnas)',
          'c) Animaciones',
          'd) Tipografía',
        ],
        correct: 1,
      },
    ],
  },
  {
    title: 'Unidad 2 — CSS Avanzado, JavaScript ES6+ y Servidor Web',
    icon: '⚡',
    color: '#d29922',
    bg: '#2d2416',
    btnBg: 'linear-gradient(135deg, #d29922, #e3b341)',
    questions: [
      {
        question: '¿Qué significa Mobile-First?',
        options: [
          'a) Diseñar primero para desktop y luego adaptar a móvil',
          'b) Diseñar solo para celulares',
          'c) Diseñar primero para móvil y luego escalar a pantallas más grandes',
          'd) Usar solo flexbox',
        ],
        correct: 2,
      },
      {
        question: 'En el modelo cliente-servidor, ¿qué es un "request"?',
        options: [
          'a) La respuesta del servidor',
          'b) El mensaje que el cliente envía al servidor pidiendo algo',
          'c) El código HTML de la página',
          'd) El servidor en sí',
        ],
        correct: 1,
      },
      {
        question: '¿Para qué se usa el método HTTP POST?',
        options: [
          'a) Leer datos',
          'b) Eliminar un recurso',
          'c) Crear un nuevo recurso',
          'd) Reemplazar un recurso completo',
        ],
        correct: 2,
      },
      {
        question: '¿Qué significa el código de estado HTTP 404?',
        options: [
          'a) Todo salió bien',
          'b) Error interno del servidor',
          'c) No autorizado',
          'd) El recurso no fue encontrado',
        ],
        correct: 3,
      },
      {
        question: '¿Qué es la Fetch API?',
        options: [
          'a) Un framework de JavaScript',
          'b) Una función nativa de JS para hacer peticiones HTTP',
          'c) Un método de CSS',
          'd) Una librería externa',
        ],
        correct: 1,
      },
      {
        question: '¿Cuándo conviene usar const en lugar de let?',
        options: [
          'a) Cuando el valor va a cambiar',
          'b) Siempre que sea posible, cuando el valor no debe cambiar',
          'c) Solo dentro de funciones',
          'd) Nunca, es mejor usar var',
        ],
        correct: 1,
      },
      {
        question: '¿Qué devuelve el método filter() en un array?',
        options: [
          'a) Un solo elemento',
          'b) El mismo array modificado',
          'c) Un nuevo array con los elementos que cumplen una condición',
          'd) El índice del elemento buscado',
        ],
        correct: 2,
      },
      {
        question: '¿Qué es el DOM?',
        options: [
          'a) Un lenguaje de programación',
          'b) La representación en memoria del HTML que JavaScript puede manipular',
          'c) Un método de CSS',
          'd) Un protocolo de red',
        ],
        correct: 1,
      },
      {
        question: '¿Para qué se usan async y await?',
        options: [
          'a) Para declarar variables',
          'b) Para manejar código asíncrono de forma más legible, esperando la resolución de una Promise',
          'c) Para crear componentes',
          'd) Para aplicar estilos dinámicos',
        ],
        correct: 1,
      },
    ],
  },
  {
    title: 'Unidad 3 — React.js y Frontend Profesional',
    icon: '⚛️',
    color: '#3fb950',
    bg: '#1b3624',
    btnBg: 'linear-gradient(135deg, #3fb950, #56d364)',
    questions: [
      {
        question: '¿Qué es un componente en React?',
        options: [
          'a) Una hoja de estilos',
          'b) Una función que devuelve JSX y representa una pieza reutilizable de interfaz',
          'c) Un método del DOM',
          'd) Un tipo de petición HTTP',
        ],
        correct: 1,
      },
      {
        question: '¿Por qué las props en React son de solo lectura?',
        options: [
          'a) Por una limitación técnica del navegador',
          'b) Porque React sigue un flujo de datos unidireccional y el hijo no debe modificar lo que recibe',
          'c) Porque son strings',
          'd) No son de solo lectura, se pueden modificar',
        ],
        correct: 1,
      },
      {
        question: '¿Qué pasa cuando se llama al setter de useState?',
        options: [
          'a) Nada visible',
          'b) Se modifica el estado directamente',
          'c) React actualiza el estado y vuelve a renderizar el componente',
          'd) Se reinicia toda la aplicación',
        ],
        correct: 2,
      },
      {
        question: '¿Qué pasa si el array de dependencias de useEffect se deja vacío []?',
        options: [
          'a) El efecto se ejecuta en cada renderizado',
          'b) El efecto nunca se ejecuta',
          'c) El efecto se ejecuta solo una vez, cuando el componente se monta',
          'd) Genera un error',
        ],
        correct: 2,
      },
    ],
  },
];

const TOTAL_QUESTIONS = UNITS.reduce((sum, u) => sum + u.questions.length, 0);

function typewriter(el: HTMLElement, text: string, speed = 20) {
  let i = 0;
  el.textContent = '';
  const cursor = document.createElement('span');
  cursor.className = 'cursor';
  cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:#58a6ff;margin-left:2px;vertical-align:text-bottom;animation:blink 0.8s step-end infinite;';
  el.appendChild(cursor);

  function tick() {
    if (i < text.length) {
      cursor.before(document.createTextNode(text[i]));
      i++;
      setTimeout(tick, speed);
    } else {
      cursor.remove();
    }
  }
  tick();
}

export default function PPExamPage() {
  const [currentUnit, setCurrentUnit] = useState(0);
  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [unitScores, setUnitScores] = useState<number[]>([0, 0, 0]);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [phase, setPhase] = useState<'banner' | 'question' | 'final'>('banner');
  const [preguntasIncorrectas, setPreguntasIncorrectas] = useState<
    { pregunta: string; elegida: string; correcta: string }[]
  >([]);
  const [explicacionesCache, setExplicacionesCache] = useState<Record<string, string>>({});
  const [feedbackType, setFeedbackType] = useState<'correct' | 'incorrect' | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [explicacionLoading, setExplicacionLoading] = useState(false);
  const [explicacionText, setExplicacionText] = useState('');
  const [explicacionError, setExplicacionError] = useState('');
  const [feedbackIaLoading, setFeedbackIaLoading] = useState(false);
  const [feedbackIaText, setFeedbackIaText] = useState('');
  const [feedbackIaError, setFeedbackIaError] = useState('');
  const [feedbackIaDone, setFeedbackIaDone] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const [bannerFadeOut, setBannerFadeOut] = useState(false);
  const [questionVisible, setQuestionVisible] = useState(false);

  const explicacionRef = useRef<HTMLDivElement>(null);
  const feedbackIaTextRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const questionRef = useRef<HTMLDivElement>(null);

  const u = UNITS[currentUnit];
  const q = u?.questions[currentQ];
  const pct = (totalAnswered / TOTAL_QUESTIONS) * 100;

  const updateProgress = () => pct;

  const updateCounterText = () => {
    return `U${currentUnit + 1} · ${currentQ + 1}/${u.questions.length}  ·  Global: ${totalAnswered}/${TOTAL_QUESTIONS}`;
  };

  const showQuestion = useCallback(() => {
    setAnswered(false);
    setFeedbackType(null);
    setSelectedIdx(null);
    setExplicacionText('');
    setExplicacionError('');
    setExplicacionLoading(false);
    setPhase('question');
    setTransitioning(false);
    setQuestionVisible(false);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setQuestionVisible(true);
      });
    });
  }, []);

  const handleSelectOption = useCallback(
    async (idx: number) => {
      if (answered || transitioning) return;
      setAnswered(true);
      setSelectedIdx(idx);

      const isCorrect = idx === q.correct;
      if (isCorrect) {
        setScore((s) => s + 1);
        setUnitScores((prev) => {
          const next = [...prev];
          next[currentUnit]++;
          return next;
        });
        setFeedbackType('correct');
      } else {
        const incorrecta = {
          pregunta: q.question,
          elegida: q.options[idx],
          correcta: q.options[q.correct],
        };
        setPreguntasIncorrectas((prev) => [...prev, incorrecta]);
        setFeedbackType('incorrect');
        pedirExplicacion(q.question, q.options[idx], q.options[q.correct]);
      }

      setTotalAnswered((t) => t + 1);
    },
    [answered, transitioning, q, currentUnit]
  );

  const pedirExplicacion = useCallback(
    async (pregunta: string, elegida: string, correcta: string) => {
      if (explicacionesCache[pregunta]) {
        setExplicacionText(explicacionesCache[pregunta]);
        return;
      }

      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setExplicacionLoading(true);
      setExplicacionText('');

      const prompt = `Sos un profesor de programación de la materia "Prácticas Profesionalizantes II - Programador Junior".

Un estudiante respondió mal esta pregunta:

Pregunta: "${pregunta}"
Respuesta que eligió: "${elegida}"
Respuesta correcta: "${correcta}"

Explicá en 3-4 líneas por qué la respuesta correcta es la correcta y por qué la que eligió está mal. Usá lenguaje simple y didáctico, en español. Sin saludos ni introducción, ir directo a la explicación.`;

      try {
        const res = await fetch('/api/feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

        if (!controller.signal.aborted) {
          setExplicacionesCache((prev) => ({ ...prev, [pregunta]: data.reply }));
          setExplicacionText(data.reply);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (!controller.signal.aborted) {
          setExplicacionError(
            err instanceof Error ? err.message : 'Error al obtener explicación'
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setExplicacionLoading(false);
        }
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
      }
    },
    [explicacionesCache]
  );

  const goToNext = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setTransitioning(true);
    setTimeout(() => {
      const nextQ = currentQ + 1;
      if (nextQ >= u.questions.length) {
        const nextUnit = currentUnit + 1;
        if (nextUnit >= UNITS.length) {
          setPhase('final');
          return;
        }
        setCurrentUnit(nextUnit);
        setCurrentQ(0);
        setPhase('banner');
        return;
      }
      setCurrentQ(nextQ);
      showQuestion();
    }, 200);
  }, [currentQ, currentUnit, u, showQuestion]);

  const startUnit = useCallback(() => {
    setBannerFadeOut(true);
    setTimeout(() => {
      setBannerFadeOut(false);
      showQuestion();
    }, 250);
  }, [showQuestion]);

  const resetQuiz = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setCurrentUnit(0);
    setCurrentQ(0);
    setAnswered(false);
    setScore(0);
    setUnitScores([0, 0, 0]);
    setTotalAnswered(0);
    setPreguntasIncorrectas([]);
    setFeedbackType(null);
    setSelectedIdx(null);
    setExplicacionText('');
    setExplicacionError('');
    setExplicacionLoading(false);
    setFeedbackIaText('');
    setFeedbackIaError('');
    setFeedbackIaDone(false);
    setFeedbackIaLoading(false);
    setBannerFadeOut(false);
    setQuestionVisible(false);
    setPhase('banner');
  }, []);

  const obtenerFeedback = useCallback(async () => {
    setFeedbackIaLoading(true);
    setFeedbackIaText('');
    setFeedbackIaError('');
    setFeedbackIaDone(false);

    const listaIncorrectas = preguntasIncorrectas
      .map((p) => `- "${p.pregunta}": eligió "${p.elegida}", correcta era "${p.correcta}"`)
      .join('\n');

    const prompt = `Sos un profesor de programación. Un estudiante completó un examen de "Prácticas Profesionalizantes II - Programador Junior" con estos resultados:

Puntaje total: ${score}/${TOTAL_QUESTIONS}
- Unidad 1 (Entorno del Programador + HTML/CSS): ${unitScores[0]}/${UNITS[0].questions.length}
- Unidad 2 (CSS Avanzado, JavaScript ES6+ y Servidor Web): ${unitScores[1]}/${UNITS[1].questions.length}
- Unidad 3 (React.js y Frontend Profesional): ${unitScores[2]}/${UNITS[2].questions.length}

Preguntas incorrectas:
${listaIncorrectas}

Dales un feedback personalizado y motivador en español. Indicá en qué unidades debe reforzar, qué temas específicos repasar y terminá con un mensaje de aliento. Sé concreto y breve (máximo 200 palabras).`;

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

      setFeedbackIaText(data.reply);
      setFeedbackIaDone(true);
    } catch (err) {
      setFeedbackIaError(
        err instanceof Error ? err.message : 'Error al obtener feedback'
      );
    } finally {
      setFeedbackIaLoading(false);
    }
  }, [preguntasIncorrectas, score, unitScores]);

  useEffect(() => {
    if (feedbackIaDone && feedbackIaText && feedbackIaTextRef.current) {
      typewriter(feedbackIaTextRef.current, feedbackIaText);
    }
  }, [feedbackIaDone, feedbackIaText]);

  useEffect(() => {
    if (explicacionText && explicacionRef.current) {
      const el = explicacionRef.current;
      el.textContent = '';
      let i = 0;
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:#d29922;margin-left:2px;vertical-align:text-bottom;animation:blink 0.8s step-end infinite;';
      el.appendChild(cursor);
      function tick() {
        if (i < explicacionText.length) {
          cursor.before(document.createTextNode(explicacionText[i]));
          i++;
          setTimeout(tick, 12);
        } else {
          cursor.remove();
        }
      }
      tick();
    }
  }, [explicacionText]);

  const finalPct = Math.round((score / TOTAL_QUESTIONS) * 100);

  let finalMsgClass = '';
  let finalMsgText = '';
  if (finalPct === 100) {
    finalMsgClass = 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]';
    finalMsgText = '¡Perfecto! Dominás todos los temas por completo.';
  } else if (finalPct >= 70) {
    finalMsgClass = 'bg-[#1c2a41] text-[#79c0ff] border border-[#58a6ff]';
    finalMsgText = '¡Muy bien! Tenés un sólido conocimiento en general.';
  } else if (finalPct >= 40) {
    finalMsgClass = 'bg-[#3d2e1e] text-[#d29922] border border-[#bb8009]';
    finalMsgText = 'Estás en el camino. Repasá los temas donde fallaste.';
  } else {
    finalMsgClass = 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]';
    finalMsgText = 'Necesitás repasar. ¡No te rindas, intentá de nuevo!';
  }

  return (
    <div className="pp-exam">
      {/* Nav */}
      <div className="flex items-center justify-between mb-4">
        <Link
          href="/"
          className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors"
        >
          ← Volver
        </Link>
        {phase !== 'final' && (
          <div className="text-[#8b949e] text-xs">
            {phase === 'banner'
              ? `U${currentUnit + 1} · 0/${u.questions.length}  ·  Global: ${totalAnswered}/${TOTAL_QUESTIONS}`
              : updateCounterText()}
          </div>
        )}
      </div>

      {/* Progress bar */}
      <div className="progress-bar">
        <div
          className="progress-bar-fill"
          style={{ width: `${updateProgress()}%` }}
        />
      </div>

      {phase === 'banner' && (
        <div className={`unit-banner ${bannerFadeOut ? 'fade-out' : ''}`} style={{ borderColor: u.color, background: u.bg }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{u.icon}</div>
          <div className="unit-title" style={{ color: u.color, fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            {u.title}
          </div>
          <div className="unit-desc" style={{ fontSize: '0.95rem', opacity: 0.8, marginBottom: '1.5rem', lineHeight: 1.5 }}>
            {currentUnit === 0
              ? 'Conceptos fundamentales sobre sistemas operativos, comandos de terminal, herramientas de desarrollo, control de versiones, metodologías ágiles y maquetado web con HTML y CSS.'
              : currentUnit === 1
              ? 'Diseño responsive avanzado, arquitectura cliente-servidor, protocolo HTTP, Fetch API, y fundamentos de JavaScript moderno (ES6+).'
              : 'Componentes, props, estado (useState) y efectos secundarios (useEffect) en React.'}
            <br />
            <span style={{ fontWeight: 600, marginTop: '0.4rem', display: 'inline-block' }}>
              {u.questions.length} preguntas
            </span>
          </div>
          <button
            onClick={startUnit}
            className="btn-start-unit"
            style={{
              padding: '0.8rem 2rem',
              border: 'none',
              borderRadius: '10px',
              color: '#fff',
              fontSize: '1rem',
              fontWeight: 600,
              cursor: 'pointer',
              background: u.btnBg,
            }}
          >
            Comenzar unidad
          </button>
        </div>
      )}

      {phase === 'question' && q && (
        <div
          ref={questionRef}
          className={`question-area transition-all duration-200 ${
            transitioning ? 'opacity-0 -translate-x-5' : ''
          } ${!transitioning && questionVisible ? 'opacity-100 translate-x-0' : ''} ${
            !transitioning && !questionVisible ? 'opacity-0 translate-x-5' : ''
          }`}
        >
          <div className="question-text">{q.question}</div>
          <div className="options">
            {q.options.map((opt, idx) => {
              let optionClass = 'option';
              if (answered) {
                optionClass += ' disabled';
                if (idx === q.correct) optionClass += ' reveal-correct';
                if (idx === selectedIdx && idx !== q.correct) optionClass += ' incorrect';
                if (idx === selectedIdx && idx === q.correct) optionClass += ' correct';
              }
              return (
                <div
                  key={idx}
                  className={optionClass}
                  onClick={() => handleSelectOption(idx)}
                >
                  {opt}
                </div>
              );
            })}
          </div>

          {feedbackType && (
            <div className={`feedback-text ${feedbackType}`}>
              {feedbackType === 'correct'
                ? '¡Correcto!'
                : `Incorrecto. La respuesta correcta era: ${q.options[q.correct]}`}
            </div>
          )}

          {(explicacionLoading || explicacionText || explicacionError) && (
            <div className="explicacion-box">
              <div className="explicacion-title">💡 ¿Por qué estaba mal?</div>
              {explicacionLoading && (
                <div className="explicacion-text">
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                  <div className="skeleton-line" />
                </div>
              )}
              {explicacionText && (
                <div className="explicacion-text" ref={explicacionRef} />
              )}
              {explicacionError && (
                <div className="text-[#f85149] text-xs mt-1">{explicacionError}</div>
              )}
            </div>
          )}

          {answered && (
            <button
              onClick={goToNext}
              className="mt-4 w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 active:translate-y-0"
              style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
            >
              Siguiente →
            </button>
          )}
        </div>
      )}

      {phase === 'final' && (
        <div className="text-center">
          <div className="text-xl font-semibold text-[#f0f6fc] mb-1">Resultado</div>
          <div className="final-score">{score} / {TOTAL_QUESTIONS}</div>
          <div className="text-[#8b949e] mb-3">{finalPct}% correcto</div>

          <div className="flex flex-col gap-2 mb-4">
            {UNITS.map((unit, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                style={{ background: unit.bg, border: `1px solid ${unit.color}` }}
              >
                <span style={{ color: unit.color, fontWeight: 600 }}>
                  {unit.icon} U{i + 1}
                </span>
                <span style={{ color: unit.color, fontWeight: 600 }}>
                  {unitScores[i]}/{unit.questions.length}
                </span>
              </div>
            ))}
          </div>

          <div className={`px-4 py-3 rounded-lg mb-5 text-base ${finalMsgClass}`}>
            {finalMsgText}
          </div>

          <button
            onClick={resetQuiz}
            className="w-full py-3 rounded-xl text-white font-semibold mb-3 transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #58a6ff, #bc8cff)' }}
          >
            Reintentar
          </button>

          {preguntasIncorrectas.length > 0 && !feedbackIaLoading && !feedbackIaDone && (
            <button
              onClick={obtenerFeedback}
              className="w-full py-3 rounded-xl border-2 font-semibold transition-all hover:bg-[rgba(188,140,255,0.1)]"
              style={{ borderColor: '#bc8cff', color: '#bc8cff' }}
            >
              🤖 Obtener feedback con IA
            </button>
          )}

          {feedbackIaLoading && (
            <div className="flex items-center justify-center gap-2 mt-4 text-[#8b949e] text-sm">
              <div className="flex gap-1">
                <div className="spinner-dot" />
                <div className="spinner-dot" />
                <div className="spinner-dot" />
              </div>
              <span>Procesando feedback...</span>
            </div>
          )}

          {feedbackIaDone && (
            <div
              className="mt-4 p-4 rounded-xl text-left relative"
              style={{
                background: '#161b22',
                border: '2px solid transparent',
                backgroundClip: 'padding-box',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: -2,
                  borderRadius: 12,
                  background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
                  zIndex: -1,
                }}
              />
              <div className="font-bold mb-2 text-[#f0f6fc]">🤖 Feedback IA</div>
              <div
                ref={feedbackIaTextRef}
                className="text-sm leading-relaxed text-[#c9d1d9] whitespace-pre-wrap"
              />
            </div>
          )}

          {feedbackIaError && (
            <div className="mt-3 text-sm text-[#f85149]">{feedbackIaError}</div>
          )}
        </div>
      )}
    </div>
  );
}
