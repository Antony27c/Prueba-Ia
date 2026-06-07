'use client';

import Link from 'next/link';

const exams = [
  {
    id: 'pp',
    title: 'Prácticas Profesionalizantes',
    subtitle: 'Programador Junior',
    icon: '💻',
    description: 'Entorno del Programador, HTML/CSS, JavaScript, React.js',
    color: '#58a6ff',
    bg: '#1c2a41',
    gradient: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
  },
  {
    id: 'bd',
    title: 'Bases de Datos',
    subtitle: 'Simulador de Examen',
    icon: '🗄️',
    description: 'Archivos, DBMS, Diseño de BD, Modelo Entidad-Relación',
    color: '#3fb950',
    bg: '#1b3624',
    gradient: 'linear-gradient(135deg, #3fb950, #56d364)',
  },
  {
    id: 'prog2',
    title: 'Programación II',
    subtitle: 'Estructuras de Datos y Algoritmos',
    icon: '🐍',
    description: 'Python, POO, listas enlazadas, pilas, colas, recursividad, archivos, árboles y grafos',
    color: '#bc8cff',
    bg: '#2a1e3c',
    gradient: 'linear-gradient(135deg, #bc8cff, #58a6ff)',
  },
];

export default function HomePage() {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold text-[#f0f6fc] mb-2">
        🎯 Examen Multiple Choice
      </h1>
      <p className="text-[#8b949e] mb-8 text-sm">
        Seleccioná el examen que querés rendir
      </p>

      <div className="flex flex-col gap-4">
        {exams.map((exam) => (
          <Link
            key={exam.id}
            href={exam.id === 'pp' ? `/examen/${exam.id}/niveles` : `/examen/${exam.id}`}
            className="block p-6 rounded-xl border-2 border-transparent transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
            style={{
              background: exam.bg,
              borderColor: exam.color,
            }}
          >
            <div className="text-3xl mb-2">{exam.icon}</div>
            <h2 className="text-lg font-bold mb-1" style={{ color: exam.color }}>
              {exam.title}
            </h2>
            <p className="text-sm font-semibold text-[#e6edf3] mb-1">
              {exam.subtitle}
            </p>
            <p className="text-xs text-[#8b949e]">{exam.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
