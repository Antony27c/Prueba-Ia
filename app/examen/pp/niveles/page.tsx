'use client';

import Link from 'next/link';

const levels = [
  {
    title: 'Nivel Original',
    description: 'El examen completo con preguntas de las 3 unidades, tal como fue diseñado originalmente.',
    aiInfo: 'Sin intervención de IA — solo feedback inmediato al responder.',
    href: '/examen/pp',
    color: '#8b949e',
    bg: '#21262d',
    gradient: 'linear-gradient(135deg, #8b949e, #c9d1d9)',
    icon: '📋',
  },
  {
    title: 'Nivel Fácil',
    description: 'Multiple choice con preguntas más directas y conceptuales. Ideal para repasar fundamentos.',
    aiInfo: 'La IA explica por qué tu respuesta fue incorrecta cuando te equivocás.',
    href: '/examen/pp/facil',
    color: '#3fb950',
    bg: '#1b3624',
    gradient: 'linear-gradient(135deg, #3fb950, #56d364)',
    icon: '🌱',
  },
  {
    title: 'Nivel Intermedio',
    description: 'Múltiple choice con opciones engañosas, código para leer y diferencias sutiles entre conceptos.',
    aiInfo: 'La IA explica por qué tu respuesta fue incorrecta cuando te equivocás.',
    href: '/examen/pp/intermedio',
    color: '#f0883e',
    bg: '#3d2e1e',
    gradient: 'linear-gradient(135deg, #f0883e, #e3b341)',
    icon: '⚡',
  },
  {
    title: 'Nivel Difícil',
    description: 'Respondé con tus propias palabras. La IA evalúa tu respuesta y te dice si es correcta, parcial o incorrecta.',
    aiInfo: 'La IA evalúa cada respuesta y te permite reintentar hasta 2 veces por pregunta.',
    href: '/examen/pp/dificil',
    color: '#d29922',
    bg: '#2d2416',
    gradient: 'linear-gradient(135deg, #d29922, #e3b341)',
    icon: '🔥',
  },
];

export default function NivelesPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
          ← Volver
        </Link>
        <span className="text-[#8b949e] text-xs">Prácticas Profesionalizantes</span>
      </div>

      <h1 className="text-xl font-bold text-[#f0f6fc] text-center mb-2">
        Elegí tu nivel
      </h1>
      <p className="text-sm text-[#8b949e] text-center mb-6">
        Cada nivel tiene una modalidad distinta. Elegí el que mejor se adapte a tu estudio.
      </p>

      <div className="flex flex-col gap-4">
        {levels.map((level) => (
          <Link
            key={level.title}
            href={level.href}
            className="block p-5 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: level.bg,
              borderColor: level.color,
            }}
          >
            <div className="flex items-start gap-4">
              <div className="text-2xl">{level.icon}</div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold mb-1" style={{ color: level.color }}>
                  {level.title}
                </h2>
                <p className="text-sm text-[#c9d1d9] mb-2 leading-relaxed">
                  {level.description}
                </p>
                <div
                  className="inline-block text-xs px-2 py-1 rounded font-medium"
                  style={{
                    background: level.color + '22',
                    color: level.color,
                    border: `1px solid ${level.color}44`,
                  }}
                >
                  {level.aiInfo}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
