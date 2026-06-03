'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PP_INTERMEDIO_QUESTIONS, QuestionPPIntermedio } from '@/data/questions-pp-intermedio';

const ALL_QUESTIONS = PP_INTERMEDIO_QUESTIONS;
const TOTAL = ALL_QUESTIONS.length;

const UNIT_COLORS: Record<number, { color: string; bg: string }> = {
  1: { color: '#58a6ff', bg: '#1c2a41' },
  2: { color: '#d29922', bg: '#2d2416' },
  3: { color: '#3fb950', bg: '#1b3624' },
};

const TYPE_BADGES: Record<string, { label: string; color: string; bg: string }> = {
  no_es: { label: '¿Cuál NO es?', color: '#d29922', bg: '#2d2416' },
  codigo: { label: 'Leer código', color: '#58a6ff', bg: '#1c2a41' },
  sutil: { label: 'Diferencia sutil', color: '#f0883e', bg: '#3d2e1e' },
};

function renderQuestion(q: QuestionPPIntermedio) {
  if (q.type !== 'codigo' || !q.question.includes('\n\n')) {
    return <h2 className="text-lg font-semibold text-[#f0f6fc] leading-relaxed">{q.question}</h2>;
  }

  const parts = q.question.split('\n\n');
  const textPart = parts[0];
  const codePart = parts.slice(1).join('\n').replace(/^  /gm, '').trim();

  return (
    <div>
      <h2 className="text-lg font-semibold text-[#f0f6fc] leading-relaxed mb-3">{textPart}</h2>
      <pre className="text-sm font-mono leading-relaxed text-[#c9d1d9] bg-[#0d1117] border border-[#30363d] rounded-md p-4 overflow-x-auto whitespace-pre-wrap">
        {codePart}
      </pre>
    </div>
  );
}

export default function PPIntermedioPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<{ questionId: number; elegida: string; correcta: string }[]>([]);
  const [explicacionesCache, setExplicacionesCache] = useState<Record<string, string>>({});
  const [explicacionLoading, setExplicacionLoading] = useState(false);
  const [explicacionText, setExplicacionText] = useState('');
  const [explicacionError, setExplicacionError] = useState('');

  const explicacionRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const currentQ = ALL_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQ?.id] ?? null;
  const answeredCount = ALL_QUESTIONS.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null).length;

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
      setExplicacionError('');

      const prompt = `Sos un profesor de programación de la materia "Prácticas Profesionalizantes II - Programador Junior".

Un estudiante respondió mal una pregunta de opción múltiple.

Pregunta: "${pregunta}"
Respuesta que eligió: "${elegida}"
Respuesta correcta: "${correcta}"

Explicá en 2-3 oraciones por qué la respuesta correcta es correcta y por qué la que eligió es incorrecta. Usá lenguaje simple y directo, en español. Sin saludos ni introducción.`;

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

  const handleSelectOption = useCallback(
    (optionIndex: number) => {
      if (currentAnswer !== null) return;
      if (submitted) return;

      setAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));

      const isCorrect = optionIndex === currentQ.correct;
      if (!isCorrect) {
        pedirExplicacion(
          currentQ.question,
          currentQ.options[optionIndex],
          currentQ.options[currentQ.correct]
        );
      }
    },
    [currentQ, currentAnswer, submitted, pedirExplicacion]
  );

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

  const goToNext = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setCurrentIndex((i) => Math.min(TOTAL - 1, i + 1));
    setExplicacionText('');
    setExplicacionError('');
    setExplicacionLoading(false);
  }, []);

  const goToPrev = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setCurrentIndex((i) => Math.max(0, i - 1));
    setExplicacionText('');
    setExplicacionError('');
    setExplicacionLoading(false);
  }, []);

  const submitExam = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    let correctCount = 0;
    const wrong: { questionId: number; elegida: string; correcta: string }[] = [];

    ALL_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null) return;
      if (ans === q.correct) {
        correctCount++;
      } else {
        wrong.push({
          questionId: q.id,
          elegida: q.options[ans],
          correcta: q.options[q.correct],
        });
      }
    });

    setScore(correctCount);
    setWrongAnswers(wrong);
    setSubmitted(true);
  }, [answers]);

  const resetExam = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setWrongAnswers([]);
    setScore(0);
    setExplicacionesCache({});
    setExplicacionText('');
    setExplicacionError('');
    setExplicacionLoading(false);
  }, []);

  // ===== RESULTS SCREEN =====
  if (submitted) {
    const pct = Math.round((score / TOTAL) * 100);

    let finalMsgClass = '';
    let finalMsgText = '';
    if (pct === 100) {
      finalMsgClass = 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]';
      finalMsgText = '¡Perfecto! Dominás todos los temas de Prácticas Profesionalizantes.';
    } else if (pct >= 70) {
      finalMsgClass = 'bg-[#1c2a41] text-[#79c0ff] border border-[#58a6ff]';
      finalMsgText = '¡Muy bien! Tenés un sólido conocimiento.';
    } else if (pct >= 40) {
      finalMsgClass = 'bg-[#3d2e1e] text-[#d29922] border border-[#bb8009]';
      finalMsgText = 'Estás en el camino. Repasá los temas donde fallaste.';
    } else {
      finalMsgClass = 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]';
      finalMsgText = 'Necesitás repasar. ¡Intentá de nuevo!';
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/pp/niveles" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Niveles</Link>
          <span className="text-[#8b949e] text-xs">Nivel Intermedio</span>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold text-[#f0f6fc] mb-1">Resultado</div>
          <div className="text-5xl font-extrabold mb-1 bg-gradient-to-r from-[#d29922] to-[#e3b341] bg-clip-text text-transparent">
            {score} / {TOTAL}
          </div>
          <div className="text-[#8b949e] mb-5">{pct}% correcto</div>

          <div className="flex flex-col gap-2 mb-4">
            {[1, 2, 3].map((unit) => {
              const unitQs = ALL_QUESTIONS.filter((q) => q.unit === unit);
              const correctUnit = unitQs.filter((q) => answers[q.id] === q.correct).length;
              const uc = UNIT_COLORS[unit];
              return (
                <div
                  key={unit}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                  style={{ background: uc.bg, border: `1px solid ${uc.color}` }}
                >
                  <span className="font-semibold" style={{ color: uc.color }}>U{unit}</span>
                  <span className="font-semibold" style={{ color: uc.color }}>{correctUnit}/{unitQs.length}</span>
                </div>
              );
            })}
          </div>

          <div className={`px-4 py-3 rounded-lg mb-5 text-base ${finalMsgClass}`}>{finalMsgText}</div>

          {wrongAnswers.length > 0 && (
            <div className="text-left mb-5">
              <h3 className="text-base font-bold text-[#f0f6fc] mb-3">Revisión de preguntas incorrectas</h3>
              {wrongAnswers.map((w) => {
                const q = ALL_QUESTIONS.find((x) => x.id === w.questionId)!;
                return (
                  <div key={w.questionId} className="mb-3 p-4 rounded-xl bg-[#1c2128] border-l-4 border-[#f85149]">
                    <p className="text-sm font-semibold text-[#f0f6fc] mb-2">{q.question}</p>
                    <div className="text-xs mb-1"><span className="text-[#ff7b72]">✗ Elegiste: {w.elegida}</span></div>
                    <div className="text-xs mb-2"><span className="text-[#7ee787]">✓ Correcta: {w.correcta}</span></div>
                    <div className="mt-2 p-3 rounded-lg bg-[#161b22] border border-[#d29922]">
                      <p className="text-xs font-bold text-[#d29922] mb-1">📘 Explicación</p>
                      <p className="text-xs leading-relaxed text-[#c9d1d9]">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={resetExam} className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #d29922, #e3b341)' }}>Reintentar</button>
        </div>
      </div>
    );
  }

  // ===== EXAM IN PROGRESS =====
  const currentIsCorrect = currentAnswer !== null ? currentAnswer === currentQ.correct : null;
  const unitColors = UNIT_COLORS[currentQ.unit];
  const typeBadge = TYPE_BADGES[currentQ.type];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/examen/pp/niveles" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Niveles</Link>
        <span className="text-[#8b949e] text-xs">Nivel Intermedio</span>
      </div>

      <div className="w-full h-[6px] bg-[#21262d] rounded mb-3 overflow-hidden">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${(answeredCount / TOTAL) * 100}%`, background: 'linear-gradient(90deg, #d29922, #e3b341)' }} />
      </div>

      <div className="flex items-center justify-between text-xs text-[#8b949e] mb-4">
        <span>Pregunta {currentIndex + 1} de {TOTAL}</span>
        <span>{answeredCount} respondidas</span>
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div
          className="inline-block text-xs font-semibold px-2 py-1 rounded"
          style={{
            background: unitColors.bg,
            color: unitColors.color,
            border: `1px solid ${unitColors.color}`,
          }}
        >
          {currentQ.unitLabel} — {currentQ.topic}
        </div>
        <div
          className="inline-block text-xs font-semibold px-2 py-1 rounded"
          style={{
            background: typeBadge.bg,
            color: typeBadge.color,
            border: `1px solid ${typeBadge.color}`,
          }}
        >
          {typeBadge.label}
        </div>
      </div>

      {renderQuestion(currentQ)}

      <div className="flex flex-col gap-3 mt-4 mb-4">
        {currentQ.options.map((opt, idx) => {
          const isSelected = currentAnswer === idx;
          const isCorrectOption = idx === currentQ.correct;

          let classes = 'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 select-none';
          if (currentAnswer === null) {
            classes += ' bg-[#21262d] border-[#30363d] text-[#c9d1d9] cursor-pointer hover:bg-[#30363d] hover:border-[#58a6ff]';
          } else {
            classes += ' pointer-events-none';
            if (isCorrectOption) {
              classes += ' bg-[#1b3624] border-[#3fb950] text-[#7ee787]';
            } else if (isSelected) {
              classes += ' bg-[#3d1f1e] border-[#f85149] text-[#ff7b72]';
            } else {
              classes += ' bg-[#21262d] border-[#30363d] text-[#c9d1d9] opacity-60';
            }
          }

          return (
            <button key={idx} onClick={() => handleSelectOption(idx)} className={classes}>
              {opt}
            </button>
          );
        })}
      </div>

      {currentAnswer !== null && (
        <div className={`px-4 py-3 rounded-lg text-sm font-semibold mb-3 ${currentIsCorrect ? 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]' : 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]'}`}>
          {currentIsCorrect ? '¡Correcto!' : `Incorrecto. La respuesta correcta era: ${currentQ.options[currentQ.correct]}`}
        </div>
      )}

      {currentAnswer !== null && !currentIsCorrect && (
        <div className="mb-3 p-4 rounded-xl bg-[#1c2128] border-l-4 border-[#d29922]" style={{ animation: 'slideUp 0.35s ease' }}>
          <div className="text-xs font-bold text-[#d29922] mb-2">💡 ¿Por qué estaba mal?</div>
          {explicacionLoading && (
            <div>
              <div className="h-3 rounded bg-[#30363d] mb-2 animate-pulse" />
              <div className="h-3 rounded bg-[#30363d] mb-2 animate-pulse" style={{ width: '85%' }} />
              <div className="h-3 rounded bg-[#30363d] animate-pulse" style={{ width: '65%' }} />
            </div>
          )}
          {explicacionText && <div ref={explicacionRef} className="text-xs leading-relaxed text-[#c9d1d9] whitespace-pre-wrap" />}
          {explicacionError && <div className="text-xs text-[#f85149] mt-1">{explicacionError}</div>}
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={goToPrev}
          disabled={currentIndex === 0}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${currentIndex === 0 ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'}`}>
          ← Anterior
        </button>

        {currentIndex < TOTAL - 1 ? (
          <button onClick={goToNext}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]">
            Siguiente →
          </button>
        ) : (
          <button onClick={submitExam} disabled={answeredCount < TOTAL}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${answeredCount < TOTAL ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'text-white hover:opacity-90'}`}
            style={answeredCount < TOTAL ? {} : { background: 'linear-gradient(135deg, #d29922, #e3b341)' }}>
            Entregar examen
          </button>
        )}
      </div>

      {answeredCount < TOTAL && currentIndex === TOTAL - 1 && (
        <p className="text-center text-xs text-[#d29922] mt-2">Respondé todas las preguntas antes de entregar</p>
      )}
    </div>
  );
}
