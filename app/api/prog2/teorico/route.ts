import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { respuesta, correcta, explicacion_correcta, explicacion_incorrecta } = body || {};

    if (!respuesta || !correcta) {
      return NextResponse.json(
        { error: 'Los campos "respuesta" y "correcta" son requeridos' },
        { status: 400 }
      );
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'GROQ_API_KEY no configurada' }, { status: 500 });
    }

    const es_correcta = respuesta === correcta;

    const systemPrompt = `Sos un tutor de Programación II especializado en Python.
El estudiante respondió una pregunta sobre un tema específico.

Tu tarea es explicar si la respuesta es correcta o incorrecta.

REGLAS ESTRICTAS:
- Explicá usando SOLO el concepto que pregunta la pregunta, no mezcles con otros conceptos
- Si la pregunta es sobre recorrido por niveles, explicá solo recorrido por niveles (BFS)
- Si la pregunta es sobre inorden, explicá solo inorden
- Sé preciso y directo, máximo 3 oraciones
- No menciones otros tipos de recorridos salvo que sean necesarios para comparar
- Si el estudiante eligió mal, explicá por qué la correcta es correcta, no por qué la incorrecta es incorrecta
- Sin saludos ni relleno`;

    const userMessage = `Respuesta elegida: "${respuesta}"
Respuesta correcta: "${correcta}"
${es_correcta ? `Explicación correcta: ${explicacion_correcta}` : `Explicación de por qué es incorrecta: ${explicacion_incorrecta}`}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        max_tokens: 500,
        temperature: 0.7,
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

    return NextResponse.json({ correcto: es_correcta, feedback: reply });
  } catch (err) {
    return NextResponse.json(
      { error: 'Error interno', detalle: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
