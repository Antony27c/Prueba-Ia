'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { BD_QUESTIONS } from '@/data/questions-bd';

interface WrongAnswer {
  pregunta: string;
  elegida: string;
  correcta: string;
  questionId: number;
  selectedIdx: number;
}

export default function BDExamPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number | null>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState<WrongAnswer[]>([]);
  const [explicacionesCache, setExplicacionesCache] = useState<Record<string, string>>({});
  const [explicacionLoading, setExplicacionLoading] = useState(false);
  const [explicacionText, setExplicacionText] = useState('');
  const [explicacionError, setExplicacionError] = useState('');

  const explicacionRef = useRef<HTMLDivElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const totalQuestions = BD_QUESTIONS.length;
  const currentQuestion = BD_QUESTIONS[currentIndex];
  const currentAnswer = answers[currentQuestion?.id] ?? null;
  const hasUnanswered = BD_QUESTIONS.some((q) => answers[q.id] === undefined || answers[q.id] === null);
  const answeredCount = BD_QUESTIONS.filter((q) => answers[q.id] !== undefined && answers[q.id] !== null).length;

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

      const prompt = `Sos un profesor de la materia "Bases de Datos". Un estudiante respondió mal una pregunta de opción múltiple.

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

      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: optionIndex }));

      const isCorrect = optionIndex === currentQuestion.correct;
      if (!isCorrect) {
        pedirExplicacion(
          currentQuestion.question,
          currentQuestion.options[optionIndex],
          currentQuestion.options[currentQuestion.correct]
        );
      }
    },
    [currentQuestion, currentAnswer, submitted, pedirExplicacion]
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

  const isCorrectAnswer = (qIdx: number) => {
    const q = BD_QUESTIONS[qIdx];
    const ans = answers[q.id];
    if (ans === undefined || ans === null) return null;
    return ans === q.correct;
  };

  const submitExam = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }

    let correctCount = 0;
    const wrong: WrongAnswer[] = [];

    BD_QUESTIONS.forEach((q) => {
      const ans = answers[q.id];
      if (ans === undefined || ans === null) return;
      if (ans === q.correct) {
        correctCount++;
      } else {
        wrong.push({
          pregunta: q.question,
          elegida: q.options[ans],
          correcta: q.options[q.correct],
          questionId: q.id,
          selectedIdx: ans,
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
    const pct = Math.round((score / totalQuestions) * 100);

    let finalMsgClass = '';
    let finalMsgText = '';
    if (pct === 100) {
      finalMsgClass = 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]';
      finalMsgText = '¡Perfecto! Dominás todos los temas de Bases de Datos.';
    } else if (pct >= 70) {
      finalMsgClass = 'bg-[#1c2a41] text-[#79c0ff] border border-[#58a6ff]';
      finalMsgText = '¡Muy bien! Tenés un sólido conocimiento en Bases de Datos.';
    } else if (pct >= 40) {
      finalMsgClass = 'bg-[#3d2e1e] text-[#d29922] border border-[#bb8009]';
      finalMsgText = 'Estás en el camino. Repasá los temas donde fallaste.';
    } else {
      finalMsgClass = 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]';
      finalMsgText = 'Necesitás repasar Bases de Datos. ¡Intentá de nuevo!';
    }

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Volver</Link>
          <span className="text-[#8b949e] text-xs">Simulador de Bases de Datos</span>
        </div>

        <div className="text-center">
          <div className="text-xl font-semibold text-[#f0f6fc] mb-1">Resultado</div>
          <div className="text-5xl font-extrabold mb-1 bg-gradient-to-r from-[#3fb950] to-[#56d364] bg-clip-text text-transparent">
            {score} / {totalQuestions}
          </div>
          <div className="text-[#8b949e] mb-5">{pct}% correcto</div>

          {/* Per-topic breakdown */}
          <div className="flex flex-col gap-2 mb-4">
            {['TP01', 'TP02', 'TP03'].map((topic) => {
              const topicQs = BD_QUESTIONS.filter((q) => q.topic === topic);
              const correctTopics = topicQs.filter(
                (q) => answers[q.id] === q.correct
              ).length;
              return (
                <div
                  key={topic}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm"
                  style={{
                    background: topic === 'TP01' ? '#1c2a41' : topic === 'TP02' ? '#2d2416' : '#1b3624',
                    border: `1px solid ${topic === 'TP01' ? '#58a6ff' : topic === 'TP02' ? '#d29922' : '#3fb950'}`,
                  }}
                >
                  <span className="font-semibold" style={{ color: topic === 'TP01' ? '#58a6ff' : topic === 'TP02' ? '#d29922' : '#3fb950' }}>{topic}</span>
                  <span className="font-semibold" style={{ color: topic === 'TP01' ? '#58a6ff' : topic === 'TP02' ? '#d29922' : '#3fb950' }}>{correctTopics}/{topicQs.length}</span>
                </div>
              );
            })}
          </div>

          <div className={`px-4 py-3 rounded-lg mb-5 text-base ${finalMsgClass}`}>{finalMsgText}</div>

          {/* Per-question review */}
          {wrongAnswers.length > 0 && (
            <div className="text-left mb-5">
              <h3 className="text-base font-bold text-[#f0f6fc] mb-3">Revisión de preguntas incorrectas</h3>
              {wrongAnswers.map((w) => {
                const q = BD_QUESTIONS.find((x) => x.id === w.questionId)!;
                return (
                  <div key={w.questionId} className="mb-3 p-4 rounded-xl bg-[#1c2128] border-l-4 border-[#f85149]">
                    <p className="text-sm font-semibold text-[#f0f6fc] mb-2">{w.pregunta}</p>
                    <div className="text-xs mb-1"><span className="text-[#ff7b72]">✗ Elegiste: {w.elegida}</span></div>
                    <div className="text-xs mb-2"><span className="text-[#7ee787]">✓ Correcta: {w.correcta}</span></div>
                    {q.explanation && (
                      <div className="mt-2 p-3 rounded-lg bg-[#161b22] border border-[#d29922]">
                        <p className="text-xs font-bold text-[#d29922] mb-1">📘 Explicación</p>
                        <p className="text-xs leading-relaxed text-[#c9d1d9]">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <button onClick={resetExam} className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90" style={{ background: 'linear-gradient(135deg, #3fb950, #56d364)' }}>Reintentar</button>
        </div>
      </div>
    );
  }

  // ===== EXAM IN PROGRESS =====
  const currentIsCorrect = currentAnswer !== null ? currentAnswer === currentQuestion.correct : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">← Volver</Link>
        <span className="text-[#8b949e] text-xs">Simulador de Bases de Datos</span>
      </div>

      {/* Progress */}
      <div className="w-full h-[6px] bg-[#21262d] rounded mb-3 overflow-hidden">
        <div className="h-full rounded transition-all duration-500" style={{ width: `${(answeredCount / totalQuestions) * 100}%`, background: 'linear-gradient(90deg, #3fb950, #56d364)' }} />
      </div>

      <div className="flex items-center justify-between text-xs text-[#8b949e] mb-4">
        <span>Pregunta {currentIndex + 1} de {totalQuestions}</span>
        <span>{answeredCount} respondidas</span>
      </div>

      {/* Topic badge */}
      <div className="inline-block text-xs font-semibold px-2 py-1 rounded mb-3" style={{
        background: currentQuestion.topic === 'TP01' ? '#1c2a41' : currentQuestion.topic === 'TP02' ? '#2d2416' : '#1b3624',
        color: currentQuestion.topic === 'TP01' ? '#58a6ff' : currentQuestion.topic === 'TP02' ? '#d29922' : '#3fb950',
        border: `1px solid ${currentQuestion.topic === 'TP01' ? '#58a6ff' : currentQuestion.topic === 'TP02' ? '#d29922' : '#3fb950'}`,
      }}>{currentQuestion.topic}</div>

      {/* Question */}
      <h2 className="text-lg font-semibold text-[#f0f6fc] leading-relaxed mb-4">{currentQuestion.question}</h2>

      {/* Options */}
      <div className="flex flex-col gap-3 mb-4">
        {currentQuestion.options.map((opt, idx) => {
          const isSelected = currentAnswer === idx;
          const isCorrectOption = idx === currentQuestion.correct;

          let classes = 'w-full text-left px-4 py-3 rounded-xl border-2 transition-all duration-200 select-none';
          let styles: React.CSSProperties = {};

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
            <button key={idx} onClick={() => handleSelectOption(idx)} className={classes} style={styles}>
              {opt}
            </button>
          );
        })}
      </div>

      {/* Feedback text */}
      {currentAnswer !== null && (
        <div className={`px-4 py-3 rounded-lg text-sm font-semibold mb-3 ${currentIsCorrect ? 'bg-[#1b3624] text-[#7ee787] border border-[#3fb950]' : 'bg-[#3d1f1e] text-[#ff7b72] border border-[#f85149]'}`}>
          {currentIsCorrect ? '¡Correcto!' : `Incorrecto. La respuesta correcta era: ${currentQuestion.options[currentQuestion.correct]}`}
        </div>
      )}

      {/* AI explanation for wrong answers */}
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

      {/* Navigation */}
      <div className="flex gap-3">
        <button onClick={() => { if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; } setCurrentIndex((i) => Math.max(0, i - 1)); setExplicacionText(''); setExplicacionError(''); setExplicacionLoading(false); }}
          disabled={currentIndex === 0}
          className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${currentIndex === 0 ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'}`}>
          ← Anterior
        </button>

        {currentIndex < totalQuestions - 1 ? (
          <button onClick={() => { if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; } setCurrentIndex((i) => i + 1); setExplicacionText(''); setExplicacionError(''); setExplicacionLoading(false); }}
            className="flex-1 py-3 rounded-xl font-semibold text-sm transition-all bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]">
            Siguiente →
          </button>
        ) : (
          <button onClick={submitExam} disabled={hasUnanswered}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-all ${hasUnanswered ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'text-white hover:opacity-90'}`}
            style={hasUnanswered ? {} : { background: 'linear-gradient(135deg, #3fb950, #56d364)' }}>
            Entregar examen
          </button>
        )}
      </div>

      {hasUnanswered && currentIndex === totalQuestions - 1 && (
        <p className="text-center text-xs text-[#d29922] mt-2">Respondé todas las preguntas antes de entregar</p>
      )}

      {/* Quick nav dots */}
      <div className="flex flex-wrap justify-center gap-1.5 mt-5">
        {BD_QUESTIONS.map((q, idx) => {
          const ans = answers[q.id];
          const answered = ans !== undefined && ans !== null;
          const correct = answered ? (ans === q.correct) : null;
          return (
            <button key={q.id} onClick={() => { if (abortRef.current) { abortRef.current.abort(); abortRef.current = null; } setCurrentIndex(idx); setExplicacionText(''); setExplicacionError(''); setExplicacionLoading(false); }}
              className={`w-[22px] h-[22px] rounded-full text-[10px] font-semibold transition-all ${
                idx === currentIndex ? 'ring-2 ring-offset-1 ring-offset-[#161b22] ring-[#3fb950] scale-110' : ''
              } ${
                answered ? (correct ? 'bg-[#3fb950] text-[#0d1117]' : 'bg-[#f85149] text-white') : 'bg-[#21262d] text-[#8b949e] border border-[#30363d]'
              }`}>
              {idx + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}
