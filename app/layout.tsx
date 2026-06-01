import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Examen Multiple Choice',
  description: 'Simulador de examen multiple choice',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="flex items-center justify-center p-4 min-h-screen">
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-8 w-full max-w-[680px] shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          {children}
        </div>
      </body>
    </html>
  );
}
