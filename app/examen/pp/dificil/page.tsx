'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { PP_DIFICIL_QUESTIONS } from '@/data/questions-pp-dificil';

const ALL_QUESTIONS = PP_DIFICIL_QUESTIONS;
const TOTAL = ALL_QUESTIONS.length;

const UNIT_COLORS: Record<number, { color: string; bg: string }> = {
  1: { color: '#58a6ff', bg: '#1c2a41' },
  2: { color: '#d29922', bg: '#2d2416' },
  3: { color: '#3fb950', bg: '#1b3624' },
};

interface AnswerEntry {
  attempts: string[];
  result: 'CORRECTO' | 'PARCIAL' | 'INCORRECTO';
  feedback: string;
  retriesLeft: number;
}

function parseAIResponse(text: string): { result: 'CORRECTO' | 'PARCIAL' | 'INCORRECTO'; feedback: string } {
  const resultMatch = text.match(/RESULTADO:\s*(CORRECTO|PARCIAL|INCORRECTO)/i);
  const feedbackMatch = text.match(/FEEDBACK:\s*([\s\S]+)/i);
  return {
    result: (resultMatch?.[1]?.toUpperCase() as any) ?? 'INCORRECTO',
    feedback: feedbackMatch?.[1]?.trim() ?? 'No se pudo evaluar la respuesta.',
  };
}

export default function PPDificilPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerEntry>>({});
  const [submitted, setSubmitted] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [autoAdvancing, setAutoAdvancing] = useState(false);

  const abortRef = useRef<AbortController | null>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const autoAdvanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQ = ALL_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQ?.id];
  const canRetry = currentAnswer && currentAnswer.result !== 'CORRECTO' && currentAnswer.retriesLeft > 0;
  const isFinalized = currentAnswer && (currentAnswer.result === 'CORRECTO' || currentAnswer.retriesLeft === 0);

  const answeredCount = ALL_QUESTIONS.filter((q) => answers[q.id] !== undefined).length;

  useEffect(() => {
    return () => {
      if (autoAdvanceTimer.current) clearTimeout(autoAdvanceTimer.current);
    };
  }, []);

  useEffect(() => {
    if (currentAnswer?.feedback && feedbackRef.current && !evaluating) {
      const el = feedbackRef.current;
      el.textContent = '';
      let i = 0;
      const cursor = document.createElement('span');
      cursor.className = 'cursor';
      cursor.style.cssText = 'display:inline-block;width:2px;height:1em;background:#d29922;margin-left:2px;vertical-align:text-bottom;animation:blink 0.8s step-end infinite;';
      el.appendChild(cursor);
      function tick() {
        if (i < currentAnswer.feedback.length) {
          cursor.before(document.createTextNode(currentAnswer.feedback[i]));
          i++;
          setTimeout(tick, 12);
        } else {
          cursor.remove();
        }
      }
      tick();
    }
  }, [currentAnswer?.feedback, evaluating]);

  const evaluateAnswer = useCallback(
    async (answerText: string) => {
      if (abortRef.current) {
        abortRef.current.abort();
      }
      const controller = new AbortController();
      abortRef.current = controller;

      setEvaluating(true);

      const keyPoints = currentQ.keyPoints.map((p, i) => `${i + 1}. ${p}`).join('\n');

      const prompt = `Sos un profesor evaluando la respuesta de un estudiante de programación.

Pregunta: "${currentQ.question}"

Puntos clave que debe mencionar (al menos la mayoría):
${keyPoints}

Respuesta modelo (referencia interna, no citar textualmente):
${currentQ.modelAnswer}

Respuesta del estudiante:
"${answerText}"

Evaluá la respuesta con uno de estos tres resultados:

RESULTADO: CORRECTO
Si la respuesta cubre la mayoría de los puntos clave correctamente y no tiene errores graves.

RESULTADO: PARCIAL
Si la respuesta tiene algo correcto pero le falta información importante. Indicá brevemente qué faltó.

RESULTADO: INCORRECTO
Si la respuesta está vacía, es incorrecta, o no responde la pregunta. Explicá la respuesta correcta brevemente.

Respondé SIEMPRE en este formato exacto (sin saludos, sin preamble):
RESULTADO: [CORRECTO|PARCIAL|INCORRECTO]
FEEDBACK: [Una o dos oraciones concisas en español.]

No uses markdown, no uses asteriscos, no saludes. Solo el formato indicado.`;

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
          const parsed = parseAIResponse(data.reply);
          const prev = answers[currentQ.id];
          const currentRetriesLeft = prev ? prev.retriesLeft : 2;
          const newRetriesLeft = parsed.result === 'CORRECTO' ? currentRetriesLeft : currentRetriesLeft - 1;

          setAnswers((prevAns) => ({
            ...prevAns,
            [currentQ.id]: {
              attempts: [...(prevAns[currentQ.id]?.attempts ?? []), answerText],
              result: parsed.result,
              feedback: parsed.feedback,
              retriesLeft: Math.max(0, newRetriesLeft),
            },
          }));

          if (parsed.result === 'CORRECTO') {
            setAutoAdvancing(true);
            autoAdvanceTimer.current = setTimeout(() => {
              goToNext();
            }, 2500);
          }
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (!controller.signal.aborted) {
          setAnswers((prevAns) => ({
            ...prevAns,
            [currentQ.id]: {
              attempts: [...(prevAns[currentQ.id]?.attempts ?? []), answerText],
              result: 'INCORRECTO',
              feedback: 'Error al evaluar la respuesta. Por favor intentá de nuevo.',
              retriesLeft: Math.max(0, (prevAns[currentQ.id]?.retriesLeft ?? 2) - 1),
            },
          }));
        }
      } finally {
        if (!controller.signal.aborted) {
          setEvaluating(false);
        }
        if (abortRef.current === controller) {
          abortRef.current = null;
        }
      }
    },
    [currentQ, answers]
  );

  const handleSubmitAnswer = useCallback(() => {
    if (!inputValue.trim()) return;
    if (evaluating) return;
    if (isFinalized) return;
    evaluateAnswer(inputValue.trim());
    setInputValue('');
  }, [inputValue, evaluating, isFinalized, evaluateAnswer]);

  const goToNext = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    setAutoAdvancing(false);
    setEvaluating(false);
    setInputValue('');

    if (currentIndex < TOTAL - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      setSubmitted(true);
    }
  }, [currentIndex]);

  const handleRetry = useCallback(() => {
    setEvaluating(false);
    setInputValue('');
  }, []);

  const resetExam = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    if (autoAdvanceTimer.current) {
      clearTimeout(autoAdvanceTimer.current);
      autoAdvanceTimer.current = null;
    }
    setCurrentIndex(0);
    setAnswers({});
    setSubmitted(false);
    setInputValue('');
    setEvaluating(false);
    setAutoAdvancing(false);
  }, []);

  // ===== RESULTS SCREEN =====
  if (submitted) {
    let correctCount = 0;
    let partialCount = 0;
    let incorrectCount = 0;

    ALL_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (!ans) return;
      if (ans.result === 'CORRECTO') correctCount++;
      else if (ans.result === 'PARCIAL') partialCount++;
      else incorrectCount++;
    });

    const totalAttempts = ALL_QUESTIONS.reduce((acc, q) => {
      const ans = answers[q.id];
      return acc + (ans ? ans.attempts.length : 0);
    }, 0);

    const pct = Math.round((correctCount / TOTAL) * 100);

    let finalMsgClass = '';
    let finalMsgText = '';
    if (pct === 100) {
      finalMsgClass = 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]';
      finalMsgText = '¡Perfecto! Respondiste todo correctamente.';
    } else if (pct >= 70) {
      finalMsgClass = 'bg-[#1c2a41] text-[#79c0ff] border border-[#58a6ff]';
      finalMsgText = '¡Muy bien! Demostrás un sólido conocimiento.';
    } else if (pct >= 40) {
      finalMsgClass = 'bg-[#3d2e1e] text-[#d29922] border border-[#bb8009]';
      finalMsgText = 'Estás en el camino. Repasá los temas donde tuviste dificultades.';
    } else {
      finalMsgClass = 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]';
      finalMsgText = 'Necesitás repasar los conceptos. ¡Intentá de nuevo!';
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/pp/niveles" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Niveles</Link>
          <span className="text-[#8b949e] text-xs">Nivel Difícil</span>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold text-[#f0f6fc] mb-1">Resultado</div>
          <div className="text-5xl font-extrabold mb-1 bg-gradient-to-r from-[#d29922] to-[#e3b341] bg-clip-text text-transparent">
            {correctCount} / {TOTAL}
          </div>
          <div className="text-[#8b949e] mb-4">{pct}% correcto</div>

          <div className="flex justify-center gap-4 mb-4 text-sm">
            <div className="text-center">
              <div className="text-[#7ee787] text-xl font-bold">{correctCount}</div>
              <div className="text-[#8b949e] text-xs">Correctas</div>
            </div>
            <div className="text-center">
              <div className="text-[#d29922] text-xl font-bold">{partialCount}</div>
              <div className="text-[#8b949e] text-xs">Parciales</div>
            </div>
            <div className="text-center">
              <div className="text-[#ff7b72] text-xl font-bold">{incorrectCount}</div>
              <div className="text-[#8b949e] text-xs">Incorrectas</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-4 text-xs text-[#8b949e]">
            <span>Total de intentos: {totalAttempts}</span>
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {[1, 2, 3].map((unit) => {
              const unitQs = ALL_QUESTIONS.filter((q) => q.unit === unit);
              const correctUnit = unitQs.filter((q) => answers[q.id]?.result === 'CORRECTO').length;
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

          <button onClick={resetExam} className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #d29922, #e3b341)' }}>Reintentar</button>
        </div>
      </div>
    );
  }

  // ===== EXAM IN PROGRESS =====
  const unitColors = UNIT_COLORS[currentQ.unit];
  const resultColors: Record<string, { bg: string; text: string; border: string }> = {
    CORRECTO: { bg: '#1b3624', text: '#7ee787', border: '#3fb950' },
    PARCIAL: { bg: '#2d2416', text: '#d29922', border: '#bb8009' },
    INCORRECTO: { bg: '#3d1f1e', text: '#ff7b72', border: '#f85149' },
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/examen/pp/niveles" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Niveles</Link>
        <span className="text-[#8b949e] text-xs">Nivel Difícil</span>
      </div>

      <div className="w-full h-[6px] bg-[#21262d] rounded mb-3 overflow-hidden">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${(answeredCount / TOTAL) * 100}%`, background: 'linear-gradient(90deg, #d29922, #e3b341)' }} />
      </div>

      <div className="flex items-center justify-between text-xs text-[#8b949e] mb-4">
        <span>Pregunta {currentIndex + 1} de {TOTAL}</span>
        <span>{answeredCount} respondidas</span>
      </div>

      <div
        className="inline-block text-xs font-semibold px-2 py-1 rounded mb-3"
        style={{
          background: unitColors.bg,
          color: unitColors.color,
          border: `1px solid ${unitColors.color}`,
        }}
      >
        {currentQ.unitLabel} — {currentQ.topic}
      </div>

      <h2 className="text-lg font-semibold text-[#f0f6fc] leading-relaxed mb-4">{currentQ.question}</h2>

      {/* Answer input or feedback */}
      {!currentAnswer && (
        <div className="mb-4">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribí tu respuesta acá..."
            rows={5}
            disabled={evaluating}
            className="w-full px-4 py-3 rounded-xl border-2 bg-[#21262d] border-[#30363d] text-[#c9d1d9] placeholder-[#484f58] resize-none transition-all focus:outline-none focus:border-[#d29922] disabled:opacity-60"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                handleSubmitAnswer();
              }
            }}
          />
          <div className="flex items-center justify-between mt-2">
            <span className="text-xs text-[#8b949e]">Ctrl+Enter para enviar</span>
            <button
              onClick={handleSubmitAnswer}
              disabled={!inputValue.trim() || evaluating}
              className="px-5 py-2 rounded-lg font-semibold text-sm transition-all text-white disabled:bg-[#21262d] disabled:text-[#484f58] disabled:cursor-not-allowed hover:opacity-90"
              style={inputValue.trim() && !evaluating ? { background: 'linear-gradient(135deg, #d29922, #e3b341)' } : {}}
            >
              {evaluating ? 'Evaluando...' : 'Enviar respuesta'}
            </button>
          </div>
        </div>
      )}

      {/* AI evaluation feedback */}
      {currentAnswer && (
        <div className="mb-4">
          <div
            className="px-4 py-3 rounded-lg text-sm font-semibold mb-3"
            style={{
              background: resultColors[currentAnswer.result].bg,
              color: resultColors[currentAnswer.result].text,
              border: `1px solid ${resultColors[currentAnswer.result].border}`,
            }}
          >
            {currentAnswer.result === 'CORRECTO' && '✅ ¡Correcto!'}
            {currentAnswer.result === 'PARCIAL' && '⚠️ Respuesta parcial'}
            {currentAnswer.result === 'INCORRECTO' && '❌ Incorrecto'}
          </div>

          <div className="p-4 rounded-xl bg-[#1c2128] border-l-4 border-[#d29922]">
            <div className="text-xs font-bold text-[#d29922] mb-2">
              {currentAnswer.result === 'CORRECTO' ? '💡 Feedback' : '💡 ¿Qué pasó?'}
            </div>
            <div ref={feedbackRef} className="text-xs leading-relaxed text-[#c9d1d9] whitespace-pre-wrap" />
          </div>

          {/* Retry or Next buttons */}
          <div className="flex gap-3 mt-4">
            {currentAnswer.result !== 'CORRECTO' && currentAnswer.retriesLeft > 0 && (
              <button onClick={handleRetry}
                className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]">
                ↩ Reintentar ({currentAnswer.retriesLeft} restantes)
              </button>
            )}
            <button
              onClick={goToNext}
              disabled={autoAdvancing}
              className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all text-white hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed`}
              style={{ background: 'linear-gradient(135deg, #d29922, #e3b341)' }}
            >
              {autoAdvancing ? 'Avanzando...' : currentIndex < TOTAL - 1 ? 'Siguiente →' : 'Ver resultados'}
            </button>
          </div>

          {currentAnswer.retriesLeft === 0 && currentAnswer.result !== 'CORRECTO' && (
            <p className="text-center text-xs text-[#ff7b72] mt-2">Sin reintentos restantes. Avanzá a la siguiente pregunta.</p>
          )}
        </div>
      )}

      {/* Loading skeleton */}
      {evaluating && !currentAnswer && (
        <div className="p-4 rounded-xl bg-[#1c2128] border-l-4 border-[#d29922] mb-4" style={{ animation: 'slideUp 0.35s ease' }}>
          <div className="h-3 rounded bg-[#30363d] mb-2 animate-pulse" />
          <div className="h-3 rounded bg-[#30363d] mb-2 animate-pulse" style={{ width: '85%' }} />
          <div className="h-3 rounded bg-[#30363d] animate-pulse" style={{ width: '65%' }} />
        </div>
      )}
    </div>
  );
}
