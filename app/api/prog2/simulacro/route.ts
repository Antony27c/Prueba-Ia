import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tipo, modo, pregunta, respuesta_estudiante, respuesta_oficial, pistas_usadas, ayuda_usada } = body || {};

    if (!tipo || !modo || !pregunta || !respuesta_estudiante || !respuesta_oficial) {
      return NextResponse.json(
        { error: 'Los campos tipo, modo, pregunta, respuesta_estudiante y respuesta_oficial son requeridos' },
        { status: 400 }
      );
    }

    if (tipo !== 'teorica' && tipo !== 'practica') {
      return NextResponse.json({ error: 'tipo debe ser "teorica" o "practica"' }, { status: 400 });
    }

    if (modo !== 'intermedio' && modo !== 'dificil') {
      return NextResponse.json({ error: 'modo debe ser "intermedio" o "dificil"' }, { status: 400 });
    }

    if (respuesta_estudiante.trim().length < 10) {
      return NextResponse.json({
        estado: 'incorrecto',
        feedback: 'No se ingresó una respuesta válida para evaluar. Escribí tu respuesta antes de enviar.',
        conceptos_faltantes: [],
        puntaje: 0,
      });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY no configurada' }, { status: 500 });
    }

    const ayudasMsg =
      tipo === 'teorica'
        ? `Pistas usadas: ${pistas_usadas || 0}${ayuda_usada ? '. El estudiante usó la ayuda (vió la respuesta oficial).' : ''}`
        : `Pistas usadas: ${pistas_usadas || 0}${ayuda_usada ? '. El estudiante usó la ayuda (vió la solución).' : ''}`;

    const systemPrompt = `Sos un profesor de Programación II evaluando la respuesta de un estudiante en un simulacro de examen.

${tipo === 'teorica' ? `
EVALUÁS UNA RESPUESTA TEÓRICA:
- Verificá que el estudiante haya captado los conceptos clave
- Una respuesta con las ideas correctas con otras palabras es correcta
- Penalizá solo si falta algún concepto importante o hay errores conceptuales
` : `
EVALUÁS CÓDIGO PYTHON:
- Verificá que el código resuelva el problema del enunciado
- Penalizá errores de lógica o sintaxis que rompen el código
- NO penalices estilo de comillas, ortografía en strings ni nombres de variables
- Si usó ayuda o pistas, mencionalo brevemente
`}

NUNCA des la solución completa en el feedback aunque el estudiante lo pida.

${ayudasMsg}

Devolvé SOLO este JSON sin texto adicional:
{
  "estado": "correcto" | "parcial" | "incorrecto",
  "feedback": "explicación clara y directa de qué estuvo bien y qué faltó",
  "conceptos_faltantes": ["solo si es teórica"],
  "puntaje": número entre 0 y 10
}`;

    const userMessage = `PREGUNTA:\n${pregunta}\n\nRESPUESTA DEL ESTUDIANTE:\n${respuesta_estudiante}\n\nRESPUESTA OFICIAL (solo como referencia para evaluar):\n${respuesta_oficial}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 800,
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

    let parsed;
    try {
      parsed = JSON.parse(reply);
    } catch {
      return NextResponse.json({
        estado: 'parcial',
        feedback: reply,
        conceptos_faltantes: [],
        puntaje: 5,
      });
    }

    return NextResponse.json({
      estado: parsed.estado || 'parcial',
      feedback: parsed.feedback || reply,
      conceptos_faltantes: parsed.conceptos_faltantes || [],
      puntaje: typeof parsed.puntaje === 'number' ? parsed.puntaje : 5,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno', detalle: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
