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
Penalizá solo si falta algún concepto importante o hay errores conceptuales graves.
Devolvé SOLO un objeto JSON válido, sin backticks, sin texto adicional:
{"estado":"correcto","feedback":"...","conceptos_faltantes":[],"puntaje":8}`
  : `Sos un profesor de Python evaluando código de un estudiante.
Tu trabajo es analizar el código línea por línea y decir qué está bien y qué está mal.

REGLA MÁS IMPORTANTE: Antes de marcar algo como error, verificá que realmente sea un error lógico o de sintaxis. 
Si el código produce el resultado correcto pedido por el enunciado, es correcto aunque use nombres de variables distintos o un estilo diferente.

NUNCA marques como error:
- Nombres de variables distintos a la solución (primero, atendido, resultado son equivalentes)
- Mensajes de print con palabras distintas si muestran el dato correcto
- Estilo de comillas simples vs dobles
- Agregar o no agregar pasos extras que no rompen la solución

SÍ marcá como error:
- Errores de sintaxis que rompen el código
- Lógica incorrecta que produce resultados erróneos
- No usar las estructuras pedidas explícitamente en el enunciado

En el feedback:
- Analizá el código del estudiante línea por línea
- Indicá qué líneas están bien y por qué
- Si hay errores reales, mostrá cómo corregir ESA línea específica
- Sé directo y no inventes problemas donde no los hay

Estado:
- "correcto": el código resuelve el problema (puntaje 8-10)
- "parcial": resuelve parte del problema o tiene errores menores reales (puntaje 4-7)  
- "incorrecto": no resuelve el problema o tiene errores graves (puntaje 0-3)

Devolvé SOLO un objeto JSON válido, sin backticks, sin texto adicional:
{"estado":"correcto","feedback":"...","conceptos_faltantes":[],"puntaje":9}`

    const userPrompt = tipo === "teorica"
  ? `Pregunta: ${pregunta}\nRespuesta del estudiante: ${respuesta_estudiante}\nRespuesta oficial: ${respuesta_oficial}`
  : `Enunciado del problema: ${pregunta}

Código del estudiante:
${respuesta_estudiante}

Analizá ESPECÍFICAMENTE el código del estudiante línea por línea:
- Indicá qué líneas están bien y por qué
- Indicá qué líneas tienen errores y cómo corregirlas
- Si hay errores, mostrá cómo quedaría esa línea corregida
- No compares con ninguna solución de referencia
- No menciones "la solución de referencia" en ningún momento
- Hablá siempre del código que escribió el estudiante

Pistas usadas: ${pistas_usadas ?? 0}
Ayuda usada: ${ayuda_usada ?? false}`

    console.log('=== API KEY EXISTS ===', !!process.env.GROQ_API_KEY)
    console.log('=== REQUEST BODY ===', { tipo, modo, pregunta: pregunta?.slice(0,50), respuesta_estudiante: respuesta_estudiante?.slice(0,50) })

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

    console.log('=== GROQ STATUS ===', response.status)
    const data = await response.json()
    console.log('=== GROQ DATA ===', JSON.stringify(data).slice(0, 200))
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
