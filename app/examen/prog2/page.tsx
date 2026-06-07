'use client';

import Link from 'next/link';

const modes = [
  {
    title: 'Modo Teórico',
    description: 'Recorrés los temas con teoría, ejemplos y preguntas',
    icon: '📚',
    href: '/examen/prog2/teorico',
    color: '#58a6ff',
    bg: '#1c2a41',
    gradient: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
  },
  {
    title: 'Modo Práctico',
    description: 'Resolvés ejercicios y recibís feedback de tu código',
    icon: '💻',
    href: '/examen/prog2/practico',
    color: '#d29922',
    bg: '#2d2416',
    gradient: 'linear-gradient(135deg, #d29922, #e3b341)',
  },
];

export default function Prog2Page() {
  return (
    <div className="text-center">
      <div className="flex items-center justify-between mb-4">
        <Link href="/" className="text-sm text-[#8b949e] hover:text-[#58a6ff] transition-colors">
          ← Volver
        </Link>
        <span className="text-[#8b949e] text-xs">Programación II</span>
      </div>

      <h1 className="text-xl font-bold text-[#f0f6fc] mb-2">
        Programación II
      </h1>
      <p className="text-sm text-[#8b949e] mb-6">
        Elegí un modo de estudio
      </p>

      <div className="flex flex-col gap-4">
        {modes.map((mode) => (
          <Link
            key={mode.title}
            href={mode.href}
            className="block p-6 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: mode.bg,
              borderColor: mode.color,
            }}
          >
            <div className="text-3xl mb-2">{mode.icon}</div>
            <h2 className="text-lg font-bold mb-1" style={{ color: mode.color }}>
              {mode.title}
            </h2>
            <p className="text-sm text-[#c9d1d9]">{mode.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
