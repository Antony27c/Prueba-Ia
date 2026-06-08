import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { tipo, modo, pregunta, respuesta_estudiante, respuesta_oficial, pistas_usadas, ayuda_usada } = body

    if (!respuesta_estudiante || respuesta_estudiante.trim().length < 10) {
      return Response.json({
        estado: "incorrecto",
        feedback: "No se ingresó una respuesta válida. Escribí tu respuesta antes de enviar.",
        conceptos_faltantes: [],
        puntaje: 0
      })
    }

    const systemPrompt = tipo === "teorica"
      ? `Sos un profesor de Programación II evaluando una respuesta teórica.
Comparás la respuesta del estudiante con la respuesta oficial.
Evaluá si el estudiante captó los conceptos clave, no si usó las mismas palabras.
Una respuesta con las ideas correctas explicadas con otras palabras es correcta.
Penalizá solo si falta algún concepto importante o hay errores graves.
Devolvé SOLO un objeto JSON válido, sin backticks, sin texto adicional, con esta estructura exacta:
{"estado":"correcto","feedback":"...","conceptos_faltantes":[],"puntaje":8}`
      : `Sos un profesor de Python evaluando código de un estudiante.
Evaluá si el código resuelve el problema del enunciado.
NO penalices: estilo de comillas, ortografía en strings, nombres de variables distintos.
SÍ penaliza: errores de lógica, sintaxis que rompe el código, no usar las estructuras pedidas.
Devolvé SOLO un objeto JSON válido, sin backticks, sin texto adicional, con esta estructura exacta:
{"estado":"correcto","feedback":"...","conceptos_faltantes":[],"puntaje":8}`

    const userPrompt = tipo === "teorica"
      ? `Pregunta: ${pregunta}\nRespuesta del estudiante: ${respuesta_estudiante}\nRespuesta oficial: ${respuesta_oficial}`
      : `Enunciado: ${pregunta}\nCódigo del estudiante: ${respuesta_estudiante}\nSolución de referencia: ${respuesta_oficial}\nPistas usadas: ${pistas_usadas ?? 0}\nAyuda usada: ${ayuda_usada ?? false}`

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        max_tokens: 600,
        temperature: 0.3
      })
    })

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content ?? ''

    console.log('=== GROQ RESPONSE ===')
    console.log(text)
    console.log('====================')

    const clean = text
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim()

    console.log('=== CLEAN TEXT ===')
    console.log(clean)
    console.log('==================')

    try {
      const parsed = JSON.parse(clean)
      return Response.json({
        estado: parsed.estado ?? 'parcial',
        feedback: parsed.feedback ?? 'No se pudo procesar el feedback.',
        conceptos_faltantes: parsed.conceptos_faltantes ?? [],
        puntaje: parsed.puntaje ?? 5
      })
    } catch (e) {
      console.log('=== PARSE ERROR ===')
      console.log(e)
      console.log('==================')
      return Response.json({
        estado: 'parcial',
        feedback: clean.length > 10 ? clean : 'No se pudo procesar la evaluación. Intentá de nuevo.',
        conceptos_faltantes: [],
        puntaje: 5
      })
    }

  } catch {
    return Response.json({
      estado: 'incorrecto',
      feedback: 'Error interno del servidor. Intentá de nuevo.',
      conceptos_faltantes: [],
      puntaje: 0
    })
  }
}
