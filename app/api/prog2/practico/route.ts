import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { codigo_estudiante, enunciado, solucion_referencia, dificultad } = body || {};

    if (!codigo_estudiante || !enunciado) {
      return NextResponse.json(
        { error: 'Los campos "codigo_estudiante" y "enunciado" son requeridos' },
        { status: 400 }
      );
    }

    if (codigo_estudiante.trim().length < 10) {
      return NextResponse.json({
        estado: 'incorrecto',
        que_estuvo_bien: 'Nada por evaluar.',
        errores: ['No se ingresó código válido para evaluar.'],
        como_mejorar: 'Escribí tu solución en Python antes de enviar.',
        puntaje: 0,
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY no configurada' }, { status: 500 });
    }

    const systemPrompt = `Sos un profesor de Python que evalúa código de estudiantes.
Tu trabajo es evaluar si el código resuelve correctamente el problema planteado.

CRITERIOS DE EVALUACIÓN (en orden de importancia):
1. ¿El código resuelve el problema del enunciado? (50%)
2. ¿La sintaxis Python es válida y funciona? (30%)
3. ¿La lógica es correcta y completa? (20%)

NUNCA penalices por:
- Uso de comillas simples vs dobles (son equivalentes en Python)
- Ortografía dentro de strings o mensajes al usuario
- Nombres de variables distintos a la solución de referencia (si cumplen su función)
- Espaciado o estilo de formato
- Diferencias menores de presentación que no afectan el resultado

SÍ penalizá por:
- Errores de sintaxis que rompen el código
- Lógica incorrecta que da resultados erróneos
- No usar las estructuras pedidas en el enunciado (ej: si pide recursividad y usa un for)
- Funciones o métodos mal implementados
- Casos borde no contemplados cuando son importantes

Devolvé SOLO un JSON con esta estructura exacta, sin texto adicional, sin markdown, sin backticks:
{
  "estado": "correcto" | "parcial" | "incorrecto",
  "que_estuvo_bien": "explicación de qué hizo bien el estudiante",
  "errores": ["solo errores reales de lógica o sintaxis", "no incluyas errores de estilo"],
  "como_mejorar": "sugerencia concreta y útil para mejorar el código",
  "puntaje": número entre 0 y 10
}

Criterio de estado:
- "correcto": puntaje 8-10, resuelve el problema sin errores lógicos
- "parcial": puntaje 4-7, resuelve parte del problema o tiene errores menores
- "incorrecto": puntaje 0-3, no resuelve el problema o tiene errores graves`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `ENUNCIADO:
${enunciado}

CÓDIGO DEL ESTUDIANTE:
${codigo_estudiante}

SOLUCIÓN DE REFERENCIA (usala solo como guía, no como respuesta exacta):
${solucion_referencia}

DIFICULTAD: ${dificultad}`,
          },
        ],
        max_tokens: 600,
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Error de Groq API: ${response.status}`, detail: errorText },
        { status: 500 }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || '';

    try {
      const parsed = JSON.parse(reply);
      return NextResponse.json(parsed);
    } catch {
      return NextResponse.json({
        estado: 'parcial',
        que_estuvo_bien: 'No se pudo analizar completamente',
        errores: ['Error al parsear respuesta de la IA'],
        como_mejorar: 'Intentá de nuevo o reformulá tu código',
        puntaje: 0,
      });
    }
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno', detalle: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
