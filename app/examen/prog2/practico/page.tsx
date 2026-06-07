'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { EJERCICIOS } from '@/data/prog2/ejercicios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface FeedbackResult {
  estado: 'correcto' | 'parcial' | 'incorrecto';
  que_estuvo_bien: string;
  errores: string[];
  como_mejorar: string;
  puntaje: number;
}

type Step = 'tp' | 'dificultad' | 'ejercicio' | 'feedback'
  | 'integr-dificultad' | 'integr-puntos' | 'integr-ejercicio' | 'integr-feedback' | 'integr-final';

const TPS = ['TP01', 'TP02', 'TP03', 'TP04', 'TP05', 'TP06', 'TP07', 'TP08'];
const DIFICULTADES = ['facil', 'intermedio', 'dificil'] as const;
const PUNTOS = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const PUNTOS_TITULOS: Record<number, string> = {
  1: 'Variables y tipos de datos',
  2: 'Estructuras condicionales',
  3: 'Bucles y colecciones',
  4: 'Funciones',
  5: 'POO',
  6: 'Listas enlazadas',
  7: 'Pilas y colas',
  8: 'Recursividad',
  9: 'Árboles y Grafos',
};

export default function Prog2PracticoPage() {
  const [step, setStep] = useState<Step>('tp');
  const [selectedTp, setSelectedTp] = useState<string | null>(null);
  const [selectedDif, setSelectedDif] = useState<typeof DIFICULTADES[number] | null>(null);
  const [codigo, setCodigo] = useState('');
  const [feedback, setFeedback] = useState<FeedbackResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [intentos, setIntentos] = useState(0);

  const [integrDif, setIntegrDif] = useState<typeof DIFICULTADES[number] | null>(null);
  const [integrPunto, setIntegrPunto] = useState(1);
  const [integrPuntosResueltos, setIntegrPuntosResueltos] = useState<Record<number, FeedbackResult | null>>({});

  const abortRef = useRef<AbortController | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const ejercicio = useMemo(() => {
    if (!selectedTp || !selectedDif) return null;
    return EJERCICIOS.find(
      (e) => e.tp === selectedTp && e.dificultad === selectedDif
    ) || null;
  }, [selectedTp, selectedDif]);

  const integrEjercicio = useMemo(() => {
    if (!integrDif || !integrPunto) return null;
    return EJERCICIOS.find(
      (e) => e.tp === 'INTEGRADOR' && e.punto === integrPunto && e.dificultad === integrDif
    ) || null;
  }, [integrDif, integrPunto]);

  const handleSelectTp = useCallback((tp: string) => {
    setSelectedTp(tp);
    setStep('dificultad');
    setCodigo('');
    setFeedback(null);
    setError('');
    setIntentos(0);
  }, []);

  const handleSelectDif = useCallback((dif: typeof DIFICULTADES[number]) => {
    setSelectedDif(dif);
    setStep('ejercicio');
    setCodigo('');
    setFeedback(null);
    setError('');
    setIntentos(0);
  }, []);

  const handleEvaluar = useCallback(async () => {
    if (!codigo.trim() || !ejercicio) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/prog2/practico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo_estudiante: codigo,
          enunciado: ejercicio.enunciado,
          solucion_referencia: ejercicio.solucion,
          dificultad: ejercicio.dificultad,
        }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

      if (!controller.signal.aborted) {
        setFeedback(data);
        setStep('feedback');
        setIntentos((i) => i + 1);
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Error al evaluar código');
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [codigo, ejercicio]);

  const handleIntegrEvaluar = useCallback(async () => {
    if (!codigo.trim() || !integrEjercicio) return;

    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/prog2/practico', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          codigo_estudiante: codigo,
          enunciado: integrEjercicio.enunciado,
          solucion_referencia: integrEjercicio.solucion,
          dificultad: integrEjercicio.dificultad,
        }),
        signal: controller.signal,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

      if (!controller.signal.aborted) {
        setIntegrPuntosResueltos((prev) => ({ ...prev, [integrPunto]: data }));
        setFeedback(data);
        setStep('integr-feedback');
      }
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      if (!controller.signal.aborted) {
        setError(err instanceof Error ? err.message : 'Error al evaluar código');
      }
    } finally {
      if (!controller.signal.aborted) setLoading(false);
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [codigo, integrEjercicio, integrPunto]);

  const handleReintentar = useCallback(() => {
    setStep('ejercicio');
    setFeedback(null);
    setError('');
  }, []);

  const handleOtroEjercicio = useCallback(() => {
    setStep('dificultad');
    setCodigo('');
    setFeedback(null);
    setError('');
    setIntentos(0);
  }, []);

  const handleVolverTPs = useCallback(() => {
    setStep('tp');
    setSelectedTp(null);
    setSelectedDif(null);
    setCodigo('');
    setFeedback(null);
    setError('');
    setIntentos(0);
  }, []);

  const handleIntegrSeleccionarDif = useCallback((dif: typeof DIFICULTADES[number]) => {
    setIntegrDif(dif);
    setStep('integr-puntos');
    setCodigo('');
    setFeedback(null);
    setError('');
  }, []);

  const handleIntegrSeleccionarPunto = useCallback((punto: number) => {
    setIntegrPunto(punto);
    setStep('integr-ejercicio');
    setCodigo('');
    setFeedback(null);
    setError('');
  }, []);

  const handleIntegrVolverPuntos = useCallback(() => {
    setStep('integr-puntos');
    setCodigo('');
    setFeedback(null);
    setError('');
  }, []);

  const handleIntegrPuntoAnterior = useCallback(() => {
    if (integrPunto > 1) {
      setIntegrPunto((p) => p - 1);
      setStep('integr-ejercicio');
      setCodigo('');
      setFeedback(null);
      setError('');
    }
  }, [integrPunto]);

  const handleIntegrPuntoSiguiente = useCallback(() => {
    if (integrPunto < 9) {
      setIntegrPunto((p) => p + 1);
      setStep('integr-ejercicio');
      setCodigo('');
      setFeedback(null);
      setError('');
    }
  }, [integrPunto]);

  const handleIntegrVolverInicio = useCallback(() => {
    setStep('tp');
    setIntegrDif(null);
    setIntegrPunto(1);
    setIntegrPuntosResueltos({});
    setCodigo('');
    setFeedback(null);
    setError('');
  }, []);

  const todosResueltos = PUNTOS.every((p) => integrPuntosResueltos[p] !== undefined);
  const puntosCompletados = PUNTOS.filter((p) => integrPuntosResueltos[p] !== undefined).length;

  const puntajePromedio = useMemo(() => {
    if (puntosCompletados === 0) return 0;
    const suma = PUNTOS.reduce((acc, p) => {
      const fb = integrPuntosResueltos[p];
      return acc + (fb ? fb.puntaje : 0);
    }, 0);
    return (suma / puntosCompletados).toFixed(1);
  }, [integrPuntosResueltos, puntosCompletados]);

  const feedbackSection = (onReintentar: () => void, onSiguiente: () => void, mostrarSolucion = true) => (
    <div className="mb-4 space-y-3">
      <div
        className={`p-4 rounded-xl border ${
          feedback?.estado === 'correcto'
            ? 'bg-[#1b3624] border-[#3fb950]'
            : feedback?.estado === 'parcial'
            ? 'bg-[#3d2e1e] border-[#f0883e]'
            : 'bg-[#3d1f1e] border-[#da3633]'
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {feedback?.estado === 'correcto' ? '✅' : feedback?.estado === 'parcial' ? '⚠️' : '❌'}
            </span>
            <span
              className="text-sm font-bold"
              style={{
                color: feedback?.estado === 'correcto'
                  ? '#3fb950' : feedback?.estado === 'parcial'
                  ? '#f0883e' : '#f85149',
              }}
            >
              {feedback?.estado === 'correcto' ? 'Correcto' : feedback?.estado === 'parcial' ? 'Parcial' : 'Incorrecto'}
            </span>
          </div>
          <span className="text-sm font-bold text-[#f0f6fc]">
            Puntaje: {feedback?.puntaje}/10
          </span>
        </div>
      </div>

      {feedback?.que_estuvo_bien && (
        <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]">
          <div className="text-xs text-[#3fb950] mb-1">✅ Qué estuvo bien:</div>
          <p className="text-sm text-[#c9d1d9]">{feedback.que_estuvo_bien}</p>
        </div>
      )}

      {feedback?.errores && feedback.errores.length > 0 && (
        <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]">
          <div className="text-xs text-[#f85149] mb-1">🐛 Errores encontrados:</div>
          <ul className="list-disc list-inside text-sm text-[#c9d1d9] space-y-1">
            {feedback.errores.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {feedback?.como_mejorar && (
        <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]">
          <div className="text-xs text-[#58a6ff] mb-1">💡 Cómo mejorar:</div>
          <p className="text-sm text-[#c9d1d9]">{feedback.como_mejorar}</p>
        </div>
      )}

      {mostrarSolucion && (
        <div className="rounded-xl overflow-hidden border border-[#30363d]">
          <div className="text-xs text-[#8b949e] px-4 pt-3 pb-1">📖 Solución de referencia:</div>
          <SyntaxHighlighter
            language="python"
            style={vscDarkPlus}
            customStyle={{
              borderRadius: '8px',
              fontSize: '14px',
              padding: '16px',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              margin: 0,
            }}
            wrapLines={true}
            wrapLongLines={true}
          >
            {(integrEjercicio!.solucion || ejercicio!.solucion || '')}
          </SyntaxHighlighter>
        </div>
      )}

      <div className="flex gap-3">
        <button onClick={onReintentar} className="flex-1 py-2.5 rounded-lg bg-[#21262d] text-[#c9d1d9] text-sm font-semibold border border-[#30363d] hover:bg-[#30363d] transition-colors">
          Intentar de nuevo
        </button>
        <button onClick={onSiguiente} className="flex-1 py-2.5 rounded-lg bg-[#238636] text-white text-sm font-semibold hover:bg-[#2ea043] transition-colors">
          Siguiente
        </button>
      </div>
    </div>
  );

  // ===================== PASO 1: SELECCIONAR TP =====================
  if (step === 'tp') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Volver
          </Link>
          <span className="text-[#8b949e] text-xs">Programación II — Práctico</span>
        </div>
        <h1 className="text-xl font-bold text-[#f0f6fc] text-center mb-2">
          💻 Modo Práctico
        </h1>
        <p className="text-sm text-[#8b949e] text-center mb-6">
          Seleccioná un Trabajo Práctico
        </p>
        <div className="grid grid-cols-2 gap-3">
          {TPS.map((tp) => {
            const ejerciciosTp = EJERCICIOS.filter((e) => e.tp === tp);
            return (
              <button
                key={tp}
                onClick={() => handleSelectTp(tp)}
                className="p-4 rounded-xl border border-[#30363d] bg-[#161b22] hover:bg-[#1c2128] transition-all duration-200 hover:scale-[1.02] text-left"
              >
                <h2 className="text-base font-bold text-[#f0f6fc]">{tp}</h2>
                <p className="text-xs text-[#8b949e] mt-1">
                  {ejerciciosTp.length} ejercicios
                </p>
                <div className="flex gap-1 mt-2">
                  {ejerciciosTp.map((e) => (
                    <span
                      key={e.id}
                      className="text-[10px] px-1.5 py-0.5 rounded"
                      style={{
                        background: e.dificultad === 'facil' ? '#1b3624' : e.dificultad === 'intermedio' ? '#3d2e1e' : '#2d2416',
                        color: e.dificultad === 'facil' ? '#3fb950' : e.dificultad === 'intermedio' ? '#f0883e' : '#d29922',
                      }}
                    >
                      {e.dificultad === 'facil' ? 'F' : e.dificultad === 'intermedio' ? 'I' : 'D'}
                    </span>
                  ))}
                </div>
              </button>
            );
          })}

          {/* Tarjeta del Integrador */}
          <button
            onClick={() => setStep('integr-dificultad')}
            className="col-span-2 border-2 border-[#d29922] rounded-xl p-5 bg-[#2d2416] hover:bg-[#3d2e1e] transition-all duration-200 hover:scale-[1.01] text-left"
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[#d29922] text-lg">⭐</span>
              <h3 className="text-[#d29922] font-bold text-lg">Integrador</h3>
            </div>
            <p className="text-[#8b949e] text-sm mb-3">
              9 puntos — Variables, Condicionales, Bucles, Funciones, POO, Listas Enlazadas, Pilas y Colas, Recursividad, Árboles y Grafos
            </p>
            <div className="flex gap-2">
              <span className="bg-[#1b3624] text-[#3fb950] text-xs px-2 py-1 rounded font-semibold">F</span>
              <span className="bg-[#3d2e1e] text-[#f0883e] text-xs px-2 py-1 rounded font-semibold">I</span>
              <span className="bg-[#2d2416] text-[#d29922] text-xs px-2 py-1 rounded font-semibold">D</span>
            </div>
          </button>
        </div>
      </div>
    );
  }

  // ===================== PASO 2: SELECCIONAR DIFICULTAD (normal) =====================
  if (step === 'dificultad') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleVolverTPs} className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← TPs
          </button>
          <span className="text-[#8b949e] text-xs">{selectedTp}</span>
        </div>
        <h1 className="text-xl font-bold text-[#f0f6fc] text-center mb-2">{selectedTp}</h1>
        <p className="text-sm text-[#8b949e] text-center mb-6">Seleccioná la dificultad</p>
        <div className="flex flex-col gap-3">
          {DIFICULTADES.map((dif) => {
            const colors: Record<string, { color: string; bg: string }> = {
              facil: { color: '#3fb950', bg: '#1b3624' },
              intermedio: { color: '#f0883e', bg: '#3d2e1e' },
              dificil: { color: '#d29922', bg: '#2d2416' },
            };
            const labels: Record<string, string> = {
              facil: '🌱 Fácil',
              intermedio: '⚡ Intermedio',
              dificil: '🔥 Difícil',
            };
            const descs: Record<string, string> = {
              facil: 'Completar código con huecos',
              intermedio: 'Escribir código con una pista',
              dificil: 'Resolver desde cero',
            };
            return (
              <button
                key={dif}
                onClick={() => handleSelectDif(dif)}
                className="p-4 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-[1.02] text-left"
                style={{ background: colors[dif].bg, borderColor: colors[dif].color }}
              >
                <h2 className="text-base font-bold" style={{ color: colors[dif].color }}>{labels[dif]}</h2>
                <p className="text-xs text-[#8b949e] mt-1">{descs[dif]}</p>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (!ejercicio && step !== 'integr-dificultad' && step !== 'integr-puntos' && step !== 'integr-ejercicio' && step !== 'integr-feedback' && step !== 'integr-final') return null;

  // ===================== INTEGRADOR: SELECCIONAR DIFICULTAD =====================
  if (step === 'integr-dificultad') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleVolverTPs} className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Volver
          </button>
          <span className="text-[#8b949e] text-xs">⭐ Integrador</span>
        </div>
        <h1 className="text-xl font-bold text-[#f0f6fc] text-center mb-2">⭐ Examen Integrador</h1>
        <p className="text-sm text-[#8b949e] text-center mb-6">Seleccioná el nivel de dificultad</p>
        <div className="flex flex-col gap-3">
          {([
            { dif: 'facil' as const, label: '🟢 Fácil', desc: 'Completar código con huecos' },
            { dif: 'intermedio' as const, label: '🟡 Intermedio', desc: 'Escribir código con pista' },
            { dif: 'dificil' as const, label: '🔴 Difícil', desc: 'Resolver desde cero' },
          ]).map(({ dif, label, desc }) => (
            <button
              key={dif}
              onClick={() => handleIntegrSeleccionarDif(dif)}
              className="p-4 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-[1.02] text-left"
              style={{
                background: dif === 'facil' ? '#1b3624' : dif === 'intermedio' ? '#3d2e1e' : '#2d2416',
                borderColor: dif === 'facil' ? '#3fb950' : dif === 'intermedio' ? '#f0883e' : '#d29922',
              }}
            >
              <h2 className="text-base font-bold" style={{
                color: dif === 'facil' ? '#3fb950' : dif === 'intermedio' ? '#f0883e' : '#d29922',
              }}>{label}</h2>
              <p className="text-xs text-[#8b949e] mt-1">{desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ===================== INTEGRADOR: PANEL DE 9 PUNTOS =====================
  if (step === 'integr-puntos') {
    const allDone = todosResueltos;
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => { setStep('integr-dificultad'); setIntegrDif(null); }} className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Nivel
          </button>
          <span className="text-[#8b949e] text-xs">
            ⭐ Integrador — {integrDif === 'facil' ? 'Fácil' : integrDif === 'intermedio' ? 'Intermedio' : 'Difícil'}
          </span>
        </div>
        <h1 className="text-lg font-bold text-[#f0f6fc] text-center mb-1">⭐ Examen Integrador</h1>
        <p className="text-xs text-[#8b949e] text-center mb-4">
          {puntosCompletados}/9 puntos completados
        </p>

        <div className="grid grid-cols-3 gap-2 mb-4">
          {PUNTOS.map((p) => {
            const fb = integrPuntosResueltos[p];
            const resuelto = fb !== undefined;
            return (
              <button
                key={p}
                onClick={() => handleIntegrSeleccionarPunto(p)}
                className="p-3 rounded-xl border text-center transition-all duration-200 hover:scale-[1.03]"
                style={{
                  background: resuelto ? '#1b3624' : '#161b22',
                  borderColor: resuelto ? '#3fb950' : '#30363d',
                }}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className="text-sm font-bold text-[#f0f6fc]">Punto {p}</span>
                  {resuelto && <span className="text-green">✅</span>}
                </div>
                <p className="text-[10px] text-[#8b949e] leading-tight">{PUNTOS_TITULOS[p]}</p>
              </button>
            );
          })}
        </div>

        {allDone && (
          <button
            onClick={() => setStep('integr-final')}
            className="w-full py-3 rounded-lg bg-[#d29922] text-white text-sm font-bold hover:bg-[#e3b341] transition-colors"
          >
            Ver resultados finales →
          </button>
        )}
      </div>
    );
  }

  // ===================== INTEGRADOR: EJERCICIO INDIVIDUAL =====================
  if (step === 'integr-ejercicio' && integrEjercicio) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <button onClick={handleIntegrVolverPuntos} className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Puntos
          </button>
          <span className="text-[#8b949e] text-xs">
            Punto {integrPunto}/9 — {integrDif === 'facil' ? 'Fácil' : integrDif === 'intermedio' ? 'Intermedio' : 'Difícil'}
          </span>
        </div>

        <div className="mb-3 p-3 rounded-xl bg-[#2d2416] border border-[#d29922]">
          <div className="text-xs text-[#d29922] mb-1">Punto {integrPunto}: {PUNTOS_TITULOS[integrPunto]}</div>
        </div>

        <div className="mb-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
          <div className="text-xs text-[#8b949e] mb-2">📝 Enunciado:</div>
          <p className="text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-line">{integrEjercicio.enunciado}</p>
        </div>

        {integrEjercicio.pista && (
          <div className="mb-4 p-3 rounded-xl bg-[#3d2e1e] border border-[#f0883e]">
            <div className="text-xs text-[#f0883e] mb-1">💡 Pista:</div>
            <p className="text-sm text-[#c9d1d9]">{integrEjercicio.pista}</p>
          </div>
        )}

        {integrEjercicio.dificultad === 'facil' && integrEjercicio.codigo_base && (
          <div className="mb-4 p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
            <div className="text-xs text-[#8b949e] mb-2">📄 Código base (completá donde dice // ???):</div>
            <pre className="text-sm text-[#c9d1d9] font-mono whitespace-pre overflow-x-auto">{integrEjercicio.codigo_base}</pre>
          </div>
        )}

        <div className="mb-3">
          <label className="text-xs text-[#8b949e] mb-1 block">
            {integrEjercicio.dificultad === 'facil' ? '✏️ Completá el código:' : '✏️ Escribí tu código Python aquí:'}
          </label>
          <textarea
            ref={textareaRef}
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="# Escribí tu código Python acá..."
            className="w-full h-48 p-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-sm text-[#c9d1d9] font-mono resize-y focus:outline-none focus:border-[#58a6ff] transition-colors"
            spellCheck={false}
          />
        </div>

        {error && (
          <div className="mb-3 p-3 rounded-xl bg-[#3d1f1e] border border-[#da3633] text-sm text-[#f85149]">{error}</div>
        )}

        <div className="flex gap-2 mb-4">
          <button
            onClick={handleIntegrPuntoAnterior}
            disabled={integrPunto <= 1}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              integrPunto <= 1 ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
            }`}
          >
            ← Punto anterior
          </button>
          <div className="flex-1 text-center text-xs text-[#8b949e] self-center">{integrPunto}/9</div>
          <button
            onClick={handleIntegrPuntoSiguiente}
            disabled={integrPunto >= 9}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
              integrPunto >= 9 ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#21262d] text-[#c9d1d9] hover:bg-[#30363d] border border-[#30363d]'
            }`}
          >
            Siguiente punto →
          </button>
        </div>

        <button
          onClick={handleIntegrEvaluar}
          disabled={loading || !codigo.trim()}
          className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
            loading || !codigo.trim() ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#238636] text-white hover:bg-[#2ea043]'
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="w-4 h-4 border-2 border-[#484f58] border-t-white rounded-full animate-spin" />
              Evaluando código...
            </span>
          ) : 'Evaluar'}
        </button>
      </div>
    );
  }

  // ===================== INTEGRADOR: FEEDBACK =====================
  if (step === 'integr-feedback' && integrEjercicio) {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#8b949e] text-xs">Punto {integrPunto}/9 — {PUNTOS_TITULOS[integrPunto]}</span>
        </div>

        {feedbackSection(
          () => { setStep('integr-ejercicio'); setFeedback(null); setError(''); },
          () => {
            if (integrPunto < 9) {
              setIntegrPunto((p) => p + 1);
              setStep('integr-ejercicio');
            } else {
              setStep('integr-final');
            }
            setCodigo('');
            setFeedback(null);
            setError('');
          },
          true
        )}
      </div>
    );
  }

  // ===================== INTEGRADOR: PANTALLA FINAL =====================
  if (step === 'integr-final') {
    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[#8b949e] text-xs">⭐ Integrador</span>
        </div>

        <div className="text-center p-6 rounded-xl bg-[#161b22] border border-[#d29922] max-w-md mx-auto">
          <div className="text-4xl mb-3">⭐</div>
          <h2 className="text-lg font-bold text-[#f0f6fc] mb-1">Integrador completado</h2>
          <p className="text-sm text-[#8b949e] mb-4">
            Puntos resueltos: {puntosCompletados}/9
          </p>
          <div className="text-3xl font-bold text-[#d29922] mb-4">
            {puntajePromedio}/10
          </div>

          <div className="space-y-1 mb-4 text-left">
            {PUNTOS.map((p) => {
              const fb = integrPuntosResueltos[p];
              const hecho = fb !== undefined;
              return (
                <div
                  key={p}
                  className="flex items-center justify-between p-2 rounded-lg text-sm"
                  style={{ background: hecho ? '#1b3624' : '#21262d' }}
                >
                  <span className="text-[#c9d1d9]">
                    Punto {p}: {PUNTOS_TITULOS[p]}
                  </span>
                  <span className="font-bold" style={{ color: hecho ? '#3fb950' : '#484f58' }}>
                    {hecho ? `✅ ${fb!.puntaje}/10` : '⬜ Pendiente'}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => { setStep('integr-puntos'); }}
              className="px-6 py-2 rounded-lg bg-[#21262d] text-[#c9d1d9] text-sm font-semibold border border-[#30363d] hover:bg-[#30363d] transition-colors"
            >
              Reintentar puntos
            </button>
            <button
              onClick={handleIntegrVolverInicio}
              className="px-6 py-2 rounded-lg bg-[#238636] text-white text-sm font-semibold hover:bg-[#2ea043] transition-colors"
            >
              Volver al inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== MODO NORMAL: EJERCICIO =====================
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <button onClick={handleVolverTPs} className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
          ← TPs
        </button>
        <span className="text-[#8b949e] text-xs">
          {ejercicio?.tp} — {ejercicio?.dificultad === 'facil' ? 'Fácil' : ejercicio?.dificultad === 'intermedio' ? 'Intermedio' : 'Difícil'}
        </span>
      </div>

      <div className="mb-4 p-4 rounded-xl bg-[#161b22] border border-[#30363d]">
        <div className="text-xs text-[#8b949e] mb-2">📝 Enunciado:</div>
        <p className="text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-line">{ejercicio?.enunciado}</p>
      </div>

      {ejercicio?.pista && (
        <div className="mb-4 p-3 rounded-xl bg-[#3d2e1e] border border-[#f0883e]">
          <div className="text-xs text-[#f0883e] mb-1">💡 Pista:</div>
          <p className="text-sm text-[#c9d1d9]">{ejercicio.pista}</p>
        </div>
      )}

      {ejercicio?.dificultad === 'facil' && ejercicio?.codigo_base && step !== 'feedback' && (
        <div className="mb-4 p-4 rounded-xl bg-[#0d1117] border border-[#30363d]">
          <div className="text-xs text-[#8b949e] mb-2">📄 Código base (completá donde dice // ???):</div>
          <pre className="text-sm text-[#c9d1d9] font-mono whitespace-pre overflow-x-auto">{ejercicio.codigo_base}</pre>
        </div>
      )}

      {step === 'feedback' && feedback && feedbackSection(handleReintentar, handleOtroEjercicio, true)}

      {step !== 'feedback' && (
        <>
          <div className="mb-3">
            <label className="text-xs text-[#8b949e] mb-1 block">
              {ejercicio?.dificultad === 'facil' ? '✏️ Completá el código reemplazando // ???:' : '✏️ Escribí tu código Python aquí:'}
            </label>
            <textarea
              ref={textareaRef}
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              placeholder="# Escribí tu código Python acá..."
              className="w-full h-48 p-3 rounded-xl bg-[#0d1117] border border-[#30363d] text-sm text-[#c9d1d9] font-mono resize-y focus:outline-none focus:border-[#58a6ff] transition-colors"
              spellCheck={false}
            />
          </div>

          {error && (
            <div className="mb-3 p-3 rounded-xl bg-[#3d1f1e] border border-[#da3633] text-sm text-[#f85149]">{error}</div>
          )}

          <button
            onClick={handleEvaluar}
            disabled={loading || !codigo.trim()}
            className={`w-full py-3 rounded-lg text-sm font-semibold transition-all duration-200 ${
              loading || !codigo.trim() ? 'bg-[#21262d] text-[#484f58] cursor-not-allowed' : 'bg-[#238636] text-white hover:bg-[#2ea043]'
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-[#484f58] border-t-white rounded-full animate-spin" />
                Evaluando código...
              </span>
            ) : 'Evaluar código →'}
          </button>
        </>
      )}
    </div>
  );
}
