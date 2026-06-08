'use client';

import { useState, useRef, useCallback, useMemo } from 'react';
import Link from 'next/link';
import { SIMULACRO } from '@/data/prog2/simulacro';
import type { PreguntaSimulacro } from '@/data/prog2/simulacro';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type ModoKey = 'facil' | 'intermedio' | 'dificil';
type PasoFlujo = 'modo' | 'ejercicio' | 'resultados';

type FeedbackData = {
  estado: 'correcto' | 'parcial' | 'incorrecto';
  feedback: string;
  conceptos_faltantes: string[];
  puntaje: number;
};

type ResultadoEjercicio = {
  id: number;
  titulo: string;
  estado: 'correcto' | 'parcial' | 'incorrecto';
  puntaje: number;
  ayudas: number;
};

const MODOS: {
  key: ModoKey;
  label: string;
  color: string;
  bg: string;
  desc: string;
  icon: string;
}[] = [
  {
    key: 'facil',
    label: 'Fácil',
    color: '#3fb950',
    bg: '#1b3624',
    desc: 'Multiple choice + ejercicio con pistas',
    icon: '🟢',
  },
  {
    key: 'intermedio',
    label: 'Intermedio',
    color: '#d29922',
    bg: '#2d2416',
    desc: 'Pregunta abierta + ejercicio con pistas limitadas',
    icon: '🟡',
  },
  {
    key: 'dificil',
    label: 'Difícil',
    color: '#f85149',
    bg: '#3d1f1e',
    desc: 'Igual que el simulacro real, sin ayudas automáticas',
    icon: '🔴',
  },
];

const OPCIONES_LETRAS = ['A', 'B', 'C', 'D'] as const;

export default function SimulacroPage() {
  const [paso, setPaso] = useState<PasoFlujo>('modo');
  const [modo, setModo] = useState<ModoKey | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [resultados, setResultados] = useState<ResultadoEjercicio[]>([]);
  const [respuestaTeorica, setRespuestaTeorica] = useState('');
  const [codigoPractico, setCodigoPractico] = useState('');

  const [respondidoTeorica, setRespondidoTeorica] = useState(false);
  const [respondidoPractica, setRespondidoPractica] = useState(false);

  const [feedbackTeorica, setFeedbackTeorica] = useState<FeedbackData | null>(null);
  const [feedbackPractica, setFeedbackPractica] = useState<FeedbackData | null>(null);

  const [loadingTeorica, setLoadingTeorica] = useState(false);
  const [loadingPractica, setLoadingPractica] = useState(false);

  const [pistasTeoDesbloqueadas, setPistasTeoDesbloqueadas] = useState(0);
  const [pistasPraDesbloqueadas, setPistasPraDesbloqueadas] = useState(0);

  const [ayudaTeoVisible, setAyudaTeoVisible] = useState(false);
  const [ayudaPraVisible, setAyudaPraVisible] = useState(false);

  const [feedbackCache, setFeedbackCache] = useState<Record<string, FeedbackData>>({});
  const [descuentos, setDescuentos] = useState(0);

  const abortRef = useRef<AbortController | null>(null);

  const total = SIMULACRO.length;
  const ejercicio = SIMULACRO[currentIdx];
  const progreso = ((currentIdx) / total) * 100;
  const puedeAvanzar = respondidoTeorica || respondidoPractica;

  const handleSelectModo = useCallback((key: ModoKey) => {
    setModo(key);
    setPaso('ejercicio');
    setCurrentIdx(0);
    setResultados([]);
    setRespuestaTeorica('');
    setCodigoPractico('');
    setRespondidoTeorica(false);
    setRespondidoPractica(false);
    setFeedbackTeorica(null);
    setFeedbackPractica(null);
    setLoadingTeorica(false);
    setLoadingPractica(false);
    setPistasTeoDesbloqueadas(0);
    setPistasPraDesbloqueadas(0);
    setAyudaTeoVisible(false);
    setAyudaPraVisible(false);
    setDescuentos(0);
  }, []);

  const reiniciarEjercicio = useCallback(() => {
    setRespuestaTeorica('');
    setCodigoPractico('');
    setRespondidoTeorica(false);
    setRespondidoPractica(false);
    setFeedbackTeorica(null);
    setFeedbackPractica(null);
    setPistasTeoDesbloqueadas(0);
    setPistasPraDesbloqueadas(0);
    setAyudaTeoVisible(false);
    setAyudaPraVisible(false);
  }, []);

  const handleSiguiente = useCallback(() => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
      reiniciarEjercicio();
    } else {
      setPaso('resultados');
    }
  }, [currentIdx, total, reiniciarEjercicio]);

  const handleAnterior = useCallback(() => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
      reiniciarEjercicio();
    }
  }, [currentIdx, reiniciarEjercicio]);

  // Mode Fácil: opción múltiple
  const handleSelectOption = useCallback(
    (letra: string) => {
      if (!ejercicio || respondidoTeorica) return;
      setRespondidoTeorica(true);
      const correcto = letra === ejercicio.correcta;
      const pts = correcto ? 10 : 0;
      setFeedbackTeorica({
        estado: correcto ? 'correcto' : 'incorrecto',
        feedback: correcto
          ? '¡Respuesta correcta!'
          : `Respuesta incorrecta. La opción correcta era ${ejercicio.correcta}.`,
        conceptos_faltantes: correcto ? [] : ['Revisar el concepto en la teoría'],
        puntaje: pts,
      });
      setResultados((prev) => [
        ...prev.filter((r) => r.id !== ejercicio.id),
        { id: ejercicio.id, titulo: ejercicio.tema_titulo, estado: correcto ? 'correcto' : 'incorrecto', puntaje: pts, ayudas: 0 },
      ]);
    },
    [ejercicio, respondidoTeorica]
  );

  const evaluarConIA = useCallback(
    async (tipo: 'teorica' | 'practica') => {
      if (!ejercicio) return;
      const texto = tipo === 'teorica' ? respuestaTeorica.trim() : codigoPractico.trim();
      if (!texto) return;

      const ref = tipo === 'teorica' ? ejercicio.respuesta_oficial : ejercicio.solucion_codigo;
      const cacheKey = `${ejercicio.id}_${tipo}_${modo}_${texto}`;

      if (feedbackCache[cacheKey]) {
        const cached = feedbackCache[cacheKey];
        if (tipo === 'teorica') {
          setFeedbackTeorica(cached);
          setRespondidoTeorica(true);
        } else {
          setFeedbackPractica(cached);
          setRespondidoPractica(true);
        }
        const ptsFinal = Math.max(0, cached.puntaje - (tipo === 'teorica' ? (ayudaTeoVisible ? 2 : 0) + pistasTeoDesbloqueadas : (ayudaPraVisible ? 3 : 0) + pistasPraDesbloqueadas));
        setResultados((prev) => [
          ...prev.filter((r) => r.id !== ejercicio.id),
          { id: ejercicio.id, titulo: ejercicio.tema_titulo, estado: cached.estado, puntaje: ptsFinal, ayudas: tipo === 'teorica' ? pistasTeoDesbloqueadas + (ayudaTeoVisible ? 1 : 0) : pistasPraDesbloqueadas + (ayudaPraVisible ? 1 : 0) },
        ]);
        return;
      }

      if (abortRef.current) abortRef.current.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      if (tipo === 'teorica') {
        setLoadingTeorica(true);
        setFeedbackTeorica(null);
      } else {
        setLoadingPractica(true);
        setFeedbackPractica(null);
      }

      try {
        const preguntaTexto =
          tipo === 'teorica'
            ? ejercicio.pregunta_teorica
            : `${ejercicio.enunciado_practico}\n\nCódigo base:\n${ejercicio.codigo_base}`;

        const res = await fetch('/api/prog2/simulacro', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tipo,
            modo,
            pregunta: preguntaTexto,
            respuesta_estudiante: texto,
            respuesta_oficial: ref,
            pistas_usadas: tipo === 'teorica' ? pistasTeoDesbloqueadas : pistasPraDesbloqueadas,
            ayuda_usada: tipo === 'teorica' ? ayudaTeoVisible : ayudaPraVisible,
          }),
          signal: controller.signal,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || `Error ${res.status}`);

        const resultado: FeedbackData = {
          estado: data.estado || 'parcial',
          feedback: data.feedback || '',
          conceptos_faltantes: data.conceptos_faltantes || [],
          puntaje: typeof data.puntaje === 'number' ? data.puntaje : 5,
        };

        if (!controller.signal.aborted) {
          const descuento = tipo === 'teorica'
            ? (ayudaTeoVisible ? 2 : 0) + pistasTeoDesbloqueadas
            : (ayudaPraVisible ? 3 : 0) + pistasPraDesbloqueadas;
          const ptsFinal = Math.max(0, resultado.puntaje - descuento);
          if (tipo === 'teorica') {
            setFeedbackTeorica(resultado);
            setRespondidoTeorica(true);
          } else {
            setFeedbackPractica(resultado);
            setRespondidoPractica(true);
          }
          setFeedbackCache((prev) => ({ ...prev, [cacheKey]: resultado }));
          setResultados((prev) => [
            ...prev.filter((r) => r.id !== ejercicio.id),
            { id: ejercicio.id, titulo: ejercicio.tema_titulo, estado: resultado.estado, puntaje: ptsFinal, ayudas: tipo === 'teorica' ? pistasTeoDesbloqueadas + (ayudaTeoVisible ? 1 : 0) : pistasPraDesbloqueadas + (ayudaPraVisible ? 1 : 0) },
          ]);
        }
      } catch (err) {
        if (err instanceof DOMException && err.name === 'AbortError') return;
        if (!controller.signal.aborted) {
          const fb = { estado: 'parcial' as const, feedback: 'Error al obtener evaluación.', conceptos_faltantes: [], puntaje: 5 };
          if (tipo === 'teorica') {
            setFeedbackTeorica(fb);
            setRespondidoTeorica(true);
          } else {
            setFeedbackPractica(fb);
            setRespondidoPractica(true);
          }
        }
      } finally {
        if (!controller.signal.aborted) {
          if (tipo === 'teorica') setLoadingTeorica(false);
          else setLoadingPractica(false);
        }
        if (abortRef.current === controller) abortRef.current = null;
      }
    },
    [ejercicio, respuestaTeorica, codigoPractico, feedbackCache, pistasTeoDesbloqueadas, pistasPraDesbloqueadas, ayudaTeoVisible, ayudaPraVisible, modo]
  );

  const handleUsarAyuda = useCallback(
    (tipo: 'teorica' | 'practica') => {
      if (tipo === 'teorica') {
        setAyudaTeoVisible(true);
        setDescuentos((d) => d + 2);
      } else {
        setAyudaPraVisible(true);
        setDescuentos((d) => d + 3);
      }
    },
    []
  );

  const puntajeTotal = useMemo(
    () => resultados.reduce((acc, r) => acc + r.puntaje, 0),
    [resultados]
  );

  // ================================================================
  // STEP 1 — Selector de modo
  // ================================================================
  if (paso === 'modo') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="flex items-center justify-between mb-4">
          <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
            ← Volver
          </Link>
          <span className="text-[#8b949e] text-xs">Programación II — Simulacro</span>
        </div>
        <div className="text-center mb-8">
          <h1 className="text-xl font-bold text-[#f0f6fc] mb-1">📋 Simulacro Oficial</h1>
          <p className="text-sm text-[#8b949e]">Programación II — IES N° 6001</p>
        </div>
        <p className="text-sm text-[#8b949e] text-center mb-5">Seleccioná el modo:</p>
        <div className="flex flex-col gap-3">
          {MODOS.map((m) => (
            <button
              key={m.key}
              onClick={() => handleSelectModo(m.key)}
              className="w-full text-left p-4 rounded-xl border transition-all duration-200 hover:scale-[1.01]"
              style={{ background: m.bg, borderColor: m.color }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span>{m.icon}</span>
                <span className="font-bold" style={{ color: m.color }}>
                  {m.label}
                </span>
              </div>
              <p className="text-sm text-[#c9d1d9] ml-7">{m.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ================================================================
  // STEP 3 — Resultados finales
  // ================================================================
  if (paso === 'resultados') {
    return (
      <div className="max-w-lg mx-auto">
        <div className="text-center p-6 rounded-xl bg-[#161b22] border border-[#30363d] mb-6">
          <div className="text-4xl mb-3">✅</div>
          <h2 className="text-lg font-bold text-[#f0f6fc] mb-1">Simulacro completado</h2>
          <p className="text-sm text-[#8b949e] mb-4">
            Modo:{' '}
            <span className="font-semibold text-[#f0f6fc]">
              {modo === 'facil' ? 'Fácil' : modo === 'intermedio' ? 'Intermedio' : 'Difícil'}
            </span>
          </p>
          <div className="text-3xl font-bold text-[#58a6ff] mb-1">{puntajeTotal}/{total * 10}</div>
          <div className="text-sm text-[#8b949e] mb-4">Puntaje total</div>
          {descuentos > 0 && (
            <div className="text-sm text-[#f85149] mb-4">
              Puntos descontados por ayudas: -{descuentos}
            </div>
          )}
          <div className="flex flex-col gap-1.5 text-left mb-5">
            {SIMULACRO.map((p) => {
              const res = resultados.find((r) => r.id === p.id);
              return (
                <div
                  key={p.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-[#21262d] text-sm"
                >
                  <span className="text-[#c9d1d9] truncate mr-2">
                    Ej. {p.id} — {p.tema_titulo}
                  </span>
                  <span className="shrink-0 flex items-center gap-1">
                    {res ? (
                      <>
                        {res.estado === 'correcto' ? (
                          <span className="text-[#3fb950]">✅ {res.puntaje}/10</span>
                        ) : res.estado === 'parcial' ? (
                          <span className="text-[#d29922]">⚠️ {res.puntaje}/10</span>
                        ) : (
                          <span className="text-[#f85149]">❌ {res.puntaje}/10</span>
                        )}
                      </>
                    ) : (
                      <span className="text-[#8b949e]">—</span>
                    )}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="flex gap-2 justify-center">
            <Link
              href="/examen/prog2"
              className="px-5 py-2 rounded-lg bg-[#21262d] text-[#c9d1d9] text-sm font-semibold border border-[#30363d] hover:bg-[#30363d] transition-colors"
            >
              ← Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ================================================================
  // STEP 2 — Ejercicio actual
  // ================================================================
  if (!ejercicio) return null;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-3">
        <Link href="/examen/prog2" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
          ← Salir
        </Link>
        <span className="text-[#8b949e] text-xs">
          {modo === 'facil' ? 'Fácil' : modo === 'intermedio' ? 'Intermedio' : 'Difícil'}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-[#8b949e] mb-1.5">
          <span>Ejercicio {currentIdx + 1} de {total}</span>
          <span>{Math.round(progreso)}%</span>
        </div>
        <div className="w-full h-2 bg-[#21262d] rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progreso}%`, background: '#58a6ff' }}
          />
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex gap-1 mb-4">
        {SIMULACRO.map((p, i) => {
          const res = resultados.find((r) => r.id === p.id);
          let bg = '#21262d';
          if (res?.estado === 'correcto') bg = '#238636';
          else if (res?.estado === 'parcial') bg = '#d29922';
          else if (res?.estado === 'incorrecto') bg = '#da3633';
          return (
            <div
              key={p.id}
              className="h-1.5 flex-1 rounded-full transition-colors duration-300"
              style={{ background: i === currentIdx ? '#58a6ff' : bg }}
            />
          );
        })}
      </div>

      {/* Exercise card */}
      <div className="rounded-xl border border-[#30363d] bg-[#161b22] overflow-hidden">
        {/* Header */}
        <div className="px-5 py-3 border-b border-[#30363d] bg-[#21262d]">
          <h2 className="text-sm font-bold text-[#f0f6fc]">{ejercicio.titulo}</h2>
        </div>

        <div className="p-5 space-y-4">
          {/* ── Theory ── */}
          <div>
            <div className="text-xs text-[#8b949e] font-semibold mb-2 flex items-center gap-1">
              <span>📚</span> {ejercicio.tema_titulo}
            </div>
            <p className="text-sm text-[#c9d1d9] leading-relaxed whitespace-pre-line">
              {ejercicio.teoria}
            </p>
            {ejercicio.codigo_teoria && (
              <div className="mt-3 rounded-lg overflow-hidden border border-[#30363d]">
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: '8px',
                    fontSize: '13px',
                    padding: '14px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {ejercicio.codigo_teoria}
                </SyntaxHighlighter>
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-[#21262d]" />

          {/* ══ PARTE TEÓRICA ══ */}
          <div>
            <div className="text-xs text-[#8b949e] font-semibold mb-2 flex items-center gap-1 font-mono tracking-wider">
              ══ Parte Teórica ═══════════════════════════
            </div>
            <p className="text-sm text-[#f0f6fc] leading-relaxed whitespace-pre-line mb-3">
              {ejercicio.pregunta_teorica}
            </p>

            {/* FÁCIL: multiple choice */}
            {modo === 'facil' && (
              <div className="flex flex-col gap-2">
                {OPCIONES_LETRAS.map((letra) => {
                  const texto = ejercicio.opciones[letra];
                  const isCorrecta = letra === ejercicio.correcta;
                  let bg = '#21262d';
                  let border = '#30363d';
                  let hover = 'hover:bg-[#30363d]';
                  if (respondidoTeorica) {
                    if (isCorrecta) {
                      bg = '#1b3624';
                      border = '#3fb950';
                      hover = '';
                    } else {
                      bg = '#161b22';
                      border = '#21262d';
                      hover = '';
                    }
                  }
                  return (
                    <button
                      key={letra}
                      onClick={() => handleSelectOption(letra)}
                      disabled={respondidoTeorica}
                      className={`w-full text-left p-3 rounded-lg border text-sm font-mono transition-all duration-200 ${hover} flex items-start gap-3`}
                      style={{ background: bg, borderColor: border }}
                    >
                      <span
                        className="font-bold shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs"
                        style={{
                          background: isCorrecta && respondidoTeorica ? '#3fb950' : '#21262d',
                          color: isCorrecta && respondidoTeorica ? '#fff' : '#8b949e',
                          border: `1px solid ${isCorrecta && respondidoTeorica ? '#3fb950' : border}`,
                        }}
                      >
                        {letra}
                      </span>
                      <span className="text-[#c9d1d9] whitespace-pre-line">{texto}</span>
                    </button>
                  );
                })}

                {respondidoTeorica && feedbackTeorica && (
                  <div
                    className={`p-3 rounded-lg border text-sm mt-2 ${
                      feedbackTeorica.estado === 'correcto'
                        ? 'bg-[#1b3624] border-[#3fb950]'
                        : 'bg-[#3d1f1e] border-[#da3633]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span>{feedbackTeorica.estado === 'correcto' ? '✅' : '❌'}</span>
                      <span className="font-bold" style={{ color: feedbackTeorica.estado === 'correcto' ? '#3fb950' : '#f85149' }}>
                        {feedbackTeorica.estado === 'correcto' ? 'Correcto' : 'Incorrecto'}
                      </span>
                    </div>
                    <p className="text-[#c9d1d9] whitespace-pre-line">{ejercicio.respuesta_oficial}</p>
                  </div>
                )}
              </div>
            )}

            {/* INTERMEDIO: textarea + pistas */}
            {modo === 'intermedio' && (
              <div>
                <textarea
                  value={respuestaTeorica}
                  onChange={(e) => setRespuestaTeorica(e.target.value)}
                  disabled={respondidoTeorica}
                  placeholder="Escribí tu respuesta teórica acá..."
                  className="w-full min-h-[90px] p-3 rounded-lg border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] text-sm font-mono resize-y focus:outline-none focus:border-[#58a6ff] transition-colors"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {!respondidoTeorica &&
                    [0, 1, 2].map((i) => {
                      const unlocked = pistasTeoDesbloqueadas > i;
                      return (
                        <button
                          key={i}
                          onClick={() => {
                            if (!unlocked) {
                              setPistasTeoDesbloqueadas((p) => Math.max(p, i + 1));
                              setDescuentos((d) => d + 1);
                            }
                          }}
                          disabled={unlocked}
                          className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                            unlocked
                              ? 'bg-[#2d2416] text-[#d29922] border-[#d29922] cursor-default'
                              : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:bg-[#30363d]'
                          }`}
                        >
                          {unlocked ? `💡 Pista ${i + 1}: ${ejercicio.pistas[i]}` : `💡 Pista +${i + 1} (-1 pt)`}
                        </button>
                      );
                    })}
                  {!respondidoTeorica && (
                    <button
                      onClick={() => evaluarConIA('teorica')}
                      disabled={loadingTeorica || !respuestaTeorica.trim()}
                      className="px-4 py-1.5 rounded-lg bg-[#238636] text-white text-xs font-semibold hover:bg-[#2ea043] transition-colors disabled:opacity-50"
                    >
                      {loadingTeorica ? 'Evaluando...' : 'Evaluar respuesta'}
                    </button>
                  )}
                </div>

                {loadingTeorica && (
                  <div className="mt-2 p-3 rounded-lg bg-[#21262d] border border-[#30363d] animate-pulse">
                    <div className="h-4 bg-[#30363d] rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#30363d] rounded w-1/2" />
                  </div>
                )}

                {feedbackTeorica && !loadingTeorica && (
                  <div
                    className={`mt-2 p-3 rounded-lg border ${
                      feedbackTeorica.estado === 'correcto'
                        ? 'bg-[#1b3624] border-[#3fb950]'
                        : feedbackTeorica.estado === 'parcial'
                        ? 'bg-[#2d2416] border-[#d29922]'
                        : 'bg-[#3d1f1e] border-[#da3633]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {feedbackTeorica.estado === 'correcto' ? '✅' : feedbackTeorica.estado === 'parcial' ? '⚠️' : '❌'}
                      </span>
                      <span className="text-sm font-bold" style={{ color: feedbackTeorica.estado === 'correcto' ? '#3fb950' : feedbackTeorica.estado === 'parcial' ? '#d29922' : '#f85149' }}>
                        {feedbackTeorica.estado === 'correcto' ? 'Correcto' : feedbackTeorica.estado === 'parcial' ? 'Parcial' : 'Incorrecto'}
                      </span>
                    </div>
                    <p className="text-sm text-[#c9d1d9] whitespace-pre-line">{feedbackTeorica.feedback}</p>
                    {feedbackTeorica.conceptos_faltantes.length > 0 && (
                      <div className="mt-1">
                        <div className="text-xs text-[#d29922] font-semibold">Conceptos a revisar:</div>
                        <ul className="list-disc list-inside text-sm text-[#c9d1d9]">
                          {feedbackTeorica.conceptos_faltantes.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* DIFÍCIL: textarea + ayuda (-2 pts) */}
            {modo === 'dificil' && (
              <div>
                <textarea
                  value={respuestaTeorica}
                  onChange={(e) => setRespuestaTeorica(e.target.value)}
                  disabled={respondidoTeorica}
                  placeholder="Escribí tu respuesta teórica acá..."
                  className="w-full min-h-[90px] p-3 rounded-lg border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] text-sm font-mono resize-y focus:outline-none focus:border-[#58a6ff] transition-colors"
                />
                <div className="flex flex-wrap gap-2 mt-2">
                  {!ayudaTeoVisible && !respondidoTeorica && (
                    <button
                      onClick={() => handleUsarAyuda('teorica')}
                      className="px-3 py-1.5 rounded-lg bg-[#3d1f1e] text-[#f85149] text-xs font-semibold border border-[#f85149] hover:bg-[#4d2523] transition-colors"
                    >
                      💡 Ver respuesta (-2 pts)
                    </button>
                  )}
                  {!respondidoTeorica && (
                    <button
                      onClick={() => evaluarConIA('teorica')}
                      disabled={loadingTeorica || !respuestaTeorica.trim()}
                      className="px-4 py-1.5 rounded-lg bg-[#238636] text-white text-xs font-semibold hover:bg-[#2ea043] transition-colors disabled:opacity-50"
                    >
                      {loadingTeorica ? 'Evaluando...' : 'Evaluar respuesta'}
                    </button>
                  )}
                </div>
                {ayudaTeoVisible && (
                  <div className="mt-2 p-3 rounded-lg bg-[#3d1f1e] border border-[#f85149]">
                    <div className="text-xs text-[#f85149] font-bold mb-1">Respuesta oficial (-2 pts):</div>
                    <p className="text-sm text-[#c9d1d9] whitespace-pre-line">{ejercicio.respuesta_oficial}</p>
                  </div>
                )}

                {loadingTeorica && (
                  <div className="mt-2 p-3 rounded-lg bg-[#21262d] border border-[#30363d] animate-pulse">
                    <div className="h-4 bg-[#30363d] rounded w-3/4 mb-2" />
                    <div className="h-4 bg-[#30363d] rounded w-1/2" />
                  </div>
                )}

                {feedbackTeorica && !loadingTeorica && (
                  <div
                    className={`mt-2 p-3 rounded-lg border ${
                      feedbackTeorica.estado === 'correcto'
                        ? 'bg-[#1b3624] border-[#3fb950]'
                        : feedbackTeorica.estado === 'parcial'
                        ? 'bg-[#2d2416] border-[#d29922]'
                        : 'bg-[#3d1f1e] border-[#da3633]'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-lg">
                        {feedbackTeorica.estado === 'correcto' ? '✅' : feedbackTeorica.estado === 'parcial' ? '⚠️' : '❌'}
                      </span>
                      <span className="text-sm font-bold" style={{ color: feedbackTeorica.estado === 'correcto' ? '#3fb950' : feedbackTeorica.estado === 'parcial' ? '#d29922' : '#f85149' }}>
                        {feedbackTeorica.estado === 'correcto' ? 'Correcto' : feedbackTeorica.estado === 'parcial' ? 'Parcial' : 'Incorrecto'}
                      </span>
                    </div>
                    <p className="text-sm text-[#c9d1d9] whitespace-pre-line">{feedbackTeorica.feedback}</p>
                    {feedbackTeorica.conceptos_faltantes.length > 0 && (
                      <div className="mt-1">
                        <div className="text-xs text-[#d29922] font-semibold">Conceptos a revisar:</div>
                        <ul className="list-disc list-inside text-sm text-[#c9d1d9]">
                          {feedbackTeorica.conceptos_faltantes.map((c, i) => (
                            <li key={i}>{c}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Separator */}
          <div className="border-t border-[#21262d]" />

          {/* ══ PARTE PRÁCTICA ══ */}
          <div>
            <div className="text-xs text-[#8b949e] font-semibold mb-2 flex items-center gap-1 font-mono tracking-wider">
              ══ Parte Práctica ═══════════════════════════
            </div>
            <p className="text-sm text-[#f0f6fc] leading-relaxed whitespace-pre-line mb-3">
              {ejercicio.enunciado_practico}
            </p>

            {/* Código base */}
            <div className="mb-3 rounded-lg overflow-hidden border border-[#30363d]">
              <div className="text-xs text-[#8b949e] px-4 pt-2 pb-1">Código base:</div>
              <SyntaxHighlighter
                language="python"
                style={vscDarkPlus}
                customStyle={{
                  borderRadius: '0 0 8px 8px',
                  fontSize: '13px',
                  padding: '14px',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  margin: 0,
                }}
                wrapLines={true}
                wrapLongLines={true}
              >
                {ejercicio.codigo_base}
              </SyntaxHighlighter>
            </div>

            {/* Textarea para código */}
            <textarea
              value={codigoPractico}
              onChange={(e) => setCodigoPractico(e.target.value)}
              disabled={respondidoPractica}
              placeholder="# Escribí tu código solución acá..."
              className="w-full min-h-[120px] p-3 rounded-lg border border-[#30363d] bg-[#0d1117] text-[#c9d1d9] text-sm font-mono resize-y focus:outline-none focus:border-[#58a6ff] transition-colors"
            />

            {/* Pistas y botones según modo */}
            <div className="flex flex-wrap gap-2 mt-2">
              {/* FÁCIL: 3 pistas visibles */}
              {modo === 'facil' && (
                <div className="w-full mb-1">
                  <div className="text-xs text-[#d29922] font-semibold mb-1">💡 Pistas:</div>
                  {ejercicio.pistas.map((p, i) => (
                    <div key={i} className="text-xs text-[#c9d1d9] mb-0.5">
                      {i + 1}. {p}
                    </div>
                  ))}
                </div>
              )}

              {/* INTERMEDIO: 2 pistas desbloqueables */}
              {modo === 'intermedio' &&
                [0, 1].map((i) => {
                  const unlocked = pistasPraDesbloqueadas > i;
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        if (!unlocked) {
                          setPistasPraDesbloqueadas((p) => Math.max(p, i + 1));
                          setDescuentos((d) => d + 1);
                        }
                      }}
                      disabled={unlocked}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        unlocked
                          ? 'bg-[#2d2416] text-[#d29922] border-[#d29922] cursor-default'
                          : 'bg-[#21262d] text-[#8b949e] border-[#30363d] hover:bg-[#30363d]'
                      }`}
                    >
                      {unlocked ? `💡 Pista ${i + 1}: ${ejercicio.pistas[i]}` : `💡 Pista +${i + 1} (-1 pt)`}
                    </button>
                  );
                })}

              {/* DIFÍCIL: Ver solución (-3 pts) */}
              {modo === 'dificil' && !ayudaPraVisible && !respondidoPractica && (
                <button
                  onClick={() => handleUsarAyuda('practica')}
                  className="px-3 py-1.5 rounded-lg bg-[#3d1f1e] text-[#f85149] text-xs font-semibold border border-[#f85149] hover:bg-[#4d2523] transition-colors"
                >
                  💡 Ver solución (-3 pts)
                </button>
              )}

              {!respondidoPractica && (
                <button
                  onClick={() => evaluarConIA('practica')}
                  disabled={loadingPractica || !codigoPractico.trim()}
                  className="px-4 py-1.5 rounded-lg bg-[#238636] text-white text-xs font-semibold hover:bg-[#2ea043] transition-colors disabled:opacity-50 flex items-center gap-1"
                >
                  {loadingPractica ? (
                    <>
                      <span className="inline-block w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Evaluando...
                    </>
                  ) : (
                    '✅ Evaluar con IA'
                  )}
                </button>
              )}
            </div>

            {/* Solución visible si pidió ayuda */}
            {ayudaPraVisible && (
              <div className="mt-2 rounded-lg overflow-hidden border border-[#f85149]">
                <div className="text-xs text-[#f85149] font-bold px-4 pt-2 pb-1">
                  Solución {modo === 'dificil' ? '(-3 pts)' : ''}:
                </div>
                <SyntaxHighlighter
                  language="python"
                  style={vscDarkPlus}
                  customStyle={{
                    borderRadius: '0 0 8px 8px',
                    fontSize: '13px',
                    padding: '14px',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    margin: 0,
                  }}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {ejercicio.solucion_codigo}
                </SyntaxHighlighter>
              </div>
            )}

            {/* Feedback práctico */}
            {loadingPractica && (
              <div className="mt-2 p-3 rounded-lg bg-[#21262d] border border-[#30363d] animate-pulse">
                <div className="h-4 bg-[#30363d] rounded w-3/4 mb-2" />
                <div className="h-4 bg-[#30363d] rounded w-1/2 mb-2" />
                <div className="h-4 bg-[#30363d] rounded w-2/3" />
              </div>
            )}

            {feedbackPractica && !loadingPractica && (
              <div
                className={`mt-2 p-3 rounded-lg border ${
                  feedbackPractica.estado === 'correcto'
                    ? 'bg-[#1b3624] border-[#3fb950]'
                    : feedbackPractica.estado === 'parcial'
                    ? 'bg-[#2d2416] border-[#d29922]'
                    : 'bg-[#3d1f1e] border-[#da3633]'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">
                    {feedbackPractica.estado === 'correcto' ? '✅' : feedbackPractica.estado === 'parcial' ? '⚠️' : '❌'}
                  </span>
                  <span className="text-sm font-bold" style={{ color: feedbackPractica.estado === 'correcto' ? '#3fb950' : feedbackPractica.estado === 'parcial' ? '#d29922' : '#f85149' }}>
                    {feedbackPractica.estado === 'correcto' ? 'Correcto' : feedbackPractica.estado === 'parcial' ? 'Parcial' : 'Incorrecto'}
                  </span>
                </div>
                <p className="text-sm text-[#c9d1d9] whitespace-pre-line">{feedbackPractica.feedback}</p>
                {feedbackPractica.conceptos_faltantes.length > 0 && (
                  <div className="mt-1">
                    <div className="text-xs text-[#d29922] font-semibold">Conceptos a revisar:</div>
                    <ul className="list-disc list-inside text-sm text-[#c9d1d9]">
                      {feedbackPractica.conceptos_faltantes.map((c, i) => (
                        <li key={i}>{c}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t border-[#30363d]">
                  <div className="text-xs text-[#58a6ff] font-semibold mb-2">💡 Solución de referencia:</div>
                  <div className="rounded-lg overflow-hidden border border-[#30363d]">
                    <SyntaxHighlighter
                      language="python"
                      style={vscDarkPlus}
                      customStyle={{
                        borderRadius: '8px',
                        fontSize: '13px',
                        padding: '14px',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-word',
                        margin: 0,
                      }}
                      wrapLines={true}
                      wrapLongLines={true}
                    >
                      {ejercicio.solucion_codigo}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleAnterior}
          disabled={currentIdx === 0}
          className="px-4 py-2 rounded-lg bg-[#21262d] text-[#c9d1d9] text-sm font-semibold border border-[#30363d] hover:bg-[#30363d] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          ← Anterior
        </button>
        <span className="text-xs text-[#8b949e]">
          {currentIdx + 1} / {total}
        </span>
        <button
          onClick={handleSiguiente}
          disabled={!puedeAvanzar}
          className="px-4 py-2 rounded-lg bg-[#238636] text-white text-sm font-semibold hover:bg-[#2ea043] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Siguiente ejercicio →
        </button>
      </div>
    </div>
  );
}
