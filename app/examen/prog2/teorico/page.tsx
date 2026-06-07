'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { TEMAS } from '@/data/prog2/temas';

type UnidadKey = 'Unidad 0 — Nivelación Python' | 'Unidad 1 — Estructuras Dinámicas Lineales' | 'Unidad 2 — Recursividad' | 'Unidad 3 — Archivos' | 'Unidad 4 — Árboles y Grafos';

const UNIDADES: { key: UnidadKey; label: string }[] = [
  { key: 'Unidad 0 — Nivelación Python', label: 'Unidad 0 — Nivelación Python' },
  { key: 'Unidad 1 — Estructuras Dinámicas Lineales', label: 'Unidad 1 — Estructuras Dinámicas Lineales' },
  { key: 'Unidad 2 — Recursividad', label: 'Unidad 2 — Recursividad' },
  { key: 'Unidad 3 — Archivos', label: 'Unidad 3 — Archivos' },
  { key: 'Unidad 4 — Árboles y Grafos', label: 'Unidad 4 — Árboles y Grafos' },
];

export default function Prog2TeoricoPage() {
  const [selectedUnidad, setSelectedUnidad] = useState<UnidadKey | null>(null);
  const [currentTemaIdx, setCurrentTemaIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [feedbackData, setFeedbackData] = useState<Record<number, { correcto: boolean; feedback: string } | null>>({});
  const [loadingFeedback, setLoadingFeedback] = useState<Record<number, boolean>>({});
  const [unidadResults, setUnidadResults] = useState<Record<string, { correctas: number; total: number }>>({});
  const [finished, setFinished] = useState(false);

  const abortRef = useRef<AbortController | null>(null);

  const temasFiltrados = useMemo(
    () => (selectedUnidad ? TEMAS.filter((t) => t.unidad === selectedUnidad) : []),
    [selectedUnidad]
  );

  const temaActual = temasFiltrados[currentTemaIdx];
  const answeredCount = Object.keys(answers).length;
  const totalEnUnidad = temasFiltrados.length;

  const pedirFeedback = useCallback(
    async (temaId: number, respuesta: string, correcta: string, expl_correcta: string, expl_incorrecta: string) => {
      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setLoadingFeedback((prev) => ({ ...prev, [temaId]: true }));

      try {
        const res = await fetch('/api/prog2/teorico', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            respuesta,
            correcta,
            explicacion_correcta: expl_correcta,
            explicacion_incorrecta: expl_incorrecta,
          }),
          signal: controller.signal,
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

        if (!controller.signal.aborted) {
          setFeedbackData((prev) => ({ ...prev, [temaId]: data }));
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (!controller.signal.aborted) {
          setFeedbackData((prev) => ({
            ...prev,
            [temaId]: { correcto: false, feedback: 'Error al obtener feedback' },
          }));
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoadingFeedback((prev) => ({ ...prev, [temaId]: false }));
        }
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    []
  );

  const handleSelectOption = useCallback(
    (opcion: string) => {
      if (!temaActual) return;
      if (answers[temaActual.id] !== undefined) return;

      setAnswers((prev) => ({ ...prev, [temaActual.id]: opcion }));
      pedirFeedback(
        temaActual.id,
        opcion,
        temaActual.correcta,
        temaActual.explicacion_correcta,
        temaActual.explicacion_incorrecta
      );
    },
    [temaActual, answers, pedirFeedback]
  );

  const handleNext = useCallback(() => {
    if (currentTemaIdx < temasFiltrados.length - 1) {
      setCurrentTemaIdx((i) => i + 1);
    } else {
      const correctas = temasFiltrados.filter(
        (t) => feedbackData[t.id]?.correcto
      ).length;
      setUnidadResults((prev) => ({
        ...prev,
        [selectedUnidad!]: { correctas, total: temasFiltrados.length },
      }));
      setFinished(true);
    }
  }, [currentTemaIdx, temasFiltrados, feedbackData, selectedUnidad]);

  const handleNextUnidad = useCallback(() => {
    const unidadKeys = UNIDADES.map((u) => u.key);
    const currentIdx = unidadKeys.indexOf(selectedUnidad!);
    if (currentIdx < unidadKeys.length - 1) {
      const next = unidadKeys[currentIdx + 1];
      setSelectedUnidad(next);
      setCurrentTemaIdx(0);
      setAnswers({});
      setFeedbackData({});
      setLoadingFeedback({});
      setFinished(false);
    }
  }, [selectedUnidad]);

  const handleSelectUnidad = useCallback((unidad: UnidadKey) => {
    setSelectedUnidad(unidad);
    setCurrentTemaIdx(0);
    setAnswers({});
    setFeedbackData({});
    setLoadingFeedback({});
    setFinished(false);
  }, []);

  // Pantalla de selección de unidad
  if (!selectedUnidad) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Volver
          </Link>
          <span className="text-[#8b949e] text-xs">Programación II — Teórico</span>
        </div>
        <h1 className="text-xl font-bold text-[#f0f6fc] text-center mb-2">
          📚 Modo Teórico
        </h1>
        <p className="text-sm text-[#8b949e] text-center mb-6">
          Seleccioná una unidad para empezar
        </p>
        <div className="flex flex-col gap-3">
          {UNIDADES.map((u) => {
            const res = unidadResults[u.key];
            return (
              <button
                key={u.key}
                onClick={() => handleSelectUnidad(u.key)}
                className="block w-full text-left p-4 rounded-xl border border-[#30363d] bg-[#161b22] hover:bg-[#1c2128] transition-all duration-200 hover:scale-[1.01]"
              >
                <h2 className="text-base font-bold text-[#f0f6fc]">{u.label}</h2>
                <p className="text-xs text-[#8b949e] mt-1">
                  {TEMAS.filter((t) => t.unidad === u.key).length} temas
                  {res && ` — ${res.correctas}/${res.total} correctas`}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Pantalla de fin de unidad
  if (finished) {
    const res = unidadResults[selectedUnidad];
    const porcentaje = res ? Math.round((res.correctas / res.total) * 100) : 0;
    const unidadKeys = UNIDADES.map((u) => u.key);
    const currentIdx = unidadKeys.indexOf(selectedUnidad);
    const hasNext = currentIdx < unidadKeys.length - 1;

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Volver al menú
          </Link>
          <span className="text-[#8b949e] text-xs">Programación II — Teórico</span>
        </div>
        <div className="text-center p-6 rounded-xl bg-[#161b22] border border-[#30363d] max-w-md mx-auto">
          <div className="text-4xl mb-3">
            {porcentaje >= 70 ? '🎉' : porcentaje >= 40 ? '👍' : '💪'}
          </div>
          <h2 className="text-lg font-bold text-[#f0f6fc] mb-2">
            {selectedUnidad} — Completada
          </h2>
          <div className="text-3xl font-bold text-[#58a6ff] mb-2">
            {res?.correctas}/{res?.total}
          </div>
          <div className="text-sm text-[#8b949e] mb-4">
            {porcentaje}% correcto
          </div>
          <div className="flex flex-col gap-2">
            {hasNext && (
              <button
                onClick={handleNextUnidad}
                className="px-6 py-2 rounded-lg bg-[#238636] text-white text-sm font-semibold hover:bg-[#2ea043] transition-colors"
              >
                Siguiente unidad →
              </button>
            )}
            <button
              onClick={() => handleSelectUnidad(selectedUnidad)}
              className="px-6 py-2 rounded-lg bg-[#21262d] text-[#c9d1d9] text-sm font-semibold border border-[#30363d] hover:bg-[#30363d] transition-colors"
            >
              Repetir unidad
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!temaActual) return null;

  const miRespuesta = answers[temaActual.id];
  const miFeedback = feedbackData[temaActual.id];
  const isLoadingFeedback = loadingFeedback[temaActual.id];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
          ← Salir
        </Link>
        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <span>{selectedUnidad}</span>
          <span>—</span>
          <span>Tema {currentTemaIdx + 1}/{totalEnUnidad}</span>
        </div>
      </div>

      {/* Progreso */}
      <div className="flex gap-1 mb-4">
        {temasFiltrados.map((t, i) => {
          const fb = feedbackData[t.id];
          let bg = '#21262d';
          if (fb?.correcto) bg = '#238636';
          else if (fb && !fb.correcto) bg = '#da3633';
          return (
            <div
              key={t.id}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{ background: bg }}
            />
          );
        })}
      </div>

      {/* Tema y teoría */}
      <div className="mb-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
        <div className="text-xs text-[#8b949e] mb-1">
          📚 TEMA {temasFiltrados.indexOf(temaActual) + 1}/{totalEnUnidad}
        </div>
        <h2 className="text-lg font-bold text-[#f0f6fc] mb-2">{temaActual.titulo}</h2>
        <p className="text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-line">
          {temaActual.teoria}
        </p>
      </div>

      {/* Código de ejemplo */}
      <div className="mb-4 p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
        <div className="text-xs text-[#8b949e] mb-2">💻 EJEMPLO:</div>
        <pre className="text-sm text-[#c9d1d9] font-mono whitespace-pre overflow-x-auto">
          {temaActual.codigo}
        </pre>
      </div>

      {/* Pregunta */}
      <div className="mb-4 p-4 rounded-xl bg-[#1c2a41] border border-[#58a6ff]">
        <div className="text-xs text-[#58a6ff] mb-2">❓ PREGUNTA:</div>
        <p className="text-sm text-[#f0f6fc] leading-relaxed whitespace-pre-line">
          {temaActual.pregunta}
        </p>
      </div>

      {/* Opciones */}
      <div className="flex flex-col gap-2 mb-4">
        {(['A', 'B', 'C', 'D'] as const).map((letra) => {
          const texto = temaActual.opciones[letra];
          const isSelected = miRespuesta === letra;
          const isCorrectAnswer = letra === temaActual.correcta;
          const mostrarResultado = miFeedback !== undefined;

          let bg = '#21262d';
          let border = '#30363d';
          let hover = 'hover:bg-[#30363d]';

          if (mostrarResultado) {
            if (isCorrectAnswer) {
              bg = '#1b3624';
              border = '#3fb950';
              hover = '';
            } else if (isSelected && !isCorrectAnswer) {
              bg = '#3d1f1e';
              border = '#da3633';
              hover = '';
            } else {
              bg = '#161b22';
              border = '#21262d';
              hover = '';
            }
          } else if (miRespuesta !== undefined) {
            bg = '#161b22';
            border = '#21262d';
            hover = '';
          }

          return (
            <button
              key={letra}
              onClick={() => handleSelectOption(letra)}
              disabled={miRespuesta !== undefined}
              className={`w-full text-left p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${hover} flex items-start gap-3`}
              style={{ background: bg, borderColor: border }}
            >
              <span
                className="font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                style={{
                  background: isSelected ? (miFeedback?.correcto ? '#3fb950' : '#da3633') : '#21262d',
                  color: isSelected ? '#fff' : '#8b949e',
                  border: `1px solid ${mostrarResultado && isCorrectAnswer ? '#3fb950' : border}`,
                }}
              >
                {letra}
              </span>
              <span className="text-[#c9d1d9] whitespace-pre-line">{texto}</span>
            </button>
          );
        })}
      </div>

      {/* Feedback */}
      {isLoadingFeedback && (
        <div className="mb-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d] animate-pulse">
          <div className="h-4 bg-[#21262d] rounded w-3/4 mb-2" />
          <div className="h-4 bg-[#21262d] rounded w-1/2" />
        </div>
      )}

      {miFeedback && !isLoadingFeedback && (
        <div
          className={`mb-4 p-4 rounded-xl border ${
            miFeedback.correcto
              ? 'bg-[#1b3624] border-[#3fb950]'
              : 'bg-[#3d1f1e] border-[#da3633]'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{miFeedback.correcto ? '✅' : '❌'}</span>
            <span
              className="text-sm font-bold"
              style={{ color: miFeedback.correcto ? '#3fb950' : '#f85149' }}
            >
              {miFeedback.correcto ? 'Correcto' : 'Incorrecto'}
            </span>
          </div>
          <p className="text-sm text-[#c9d1d9] leading-relaxed">{miFeedback.feedback}</p>
        </div>
      )}

      {/* Botón siguiente */}
      {miFeedback && !isLoadingFeedback && (
        <button
          onClick={handleNext}
          className="w-full py-3 rounded-lg bg-[#238636] text-white text-sm font-semibold hover:bg-[#2ea043] transition-colors"
        >
          {currentTemaIdx < temasFiltrados.length - 1 ? 'Siguiente tema →' : 'Ver resultados'}
        </button>
      )}

      {/* Navegación entre temas respondidos */}
      {temasFiltrados.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {temasFiltrados.map((t, i) => {
            const fb = feedbackData[t.id];
            let dotColor = '#21262d';
            if (fb?.correcto) dotColor = '#3fb950';
            else if (fb && !fb.correcto) dotColor = '#da3633';
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (answers[t.id] !== undefined && i !== currentTemaIdx) {
                    setCurrentTemaIdx(i);
                  }
                }}
                disabled={answers[t.id] === undefined}
                className="w-3 h-3 rounded-full transition-all duration-200"
                style={{
                  background: dotColor,
                  opacity: i === currentTemaIdx ? 1 : 0.5,
                  cursor: answers[t.id] !== undefined ? 'pointer' : 'default',
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
