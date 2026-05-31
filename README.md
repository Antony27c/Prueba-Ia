# Examen Multiple Choice

Aplicación web de examen tipo multiple choice con 20 preguntas organizadas en 3 unidades. Incluye un backend serverless en Vercel para feedback con IA vía GroqCloud.

## Stack

- Frontend: HTML + CSS + JS vanilla (archivo único)
- Backend: Vercel Serverless Function (`api/feedback.js`)
- IA: GroqCloud API (`llama3-8b-8192`)

## Cómo desplegar en Vercel

### 1. Subir el proyecto a GitHub

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/tu-repo.git
git push -u origin main
```

### 2. Importar el proyecto en Vercel

1. Ve a [vercel.com](https://vercel.com) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New..." → "Project"**.
3. Selecciona el repositorio que subiste en el paso anterior.
4. Vercel detectará automáticamente que es un proyecto con funciones serverless (`api/`).
5. No necesitas cambiar ningún setting de framework — deja **Framework Preset** en `Other`.
6. Haz clic en **"Deploy"**.

### 3. Configurar la variable de entorno GROQ_API_KEY

1. Ve a tu proyecto en Vercel.
2. Entra en **Settings → Environment Variables**.
3. Agrega una nueva variable:
   - **Name**: `GROQ_API_KEY`
   - **Value**: `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`
4. Selecciona los entornos **Production** (y **Development** si querés probar previews).
5. Haz clic en **"Add"**.

### 4. Redeploy

1. Ve a **Deployments**.
2. Busca el deployment inicial, haz clic en el menú de tres puntos y selecciona **"Redeploy"**.
3. Esperá a que termine — tu app ya está lista con el feedback por IA funcionando.

> La API key se almacena de forma segura como variable de entorno en el servidor de Vercel. El frontend nunca la ve; solo la usa la serverless function (`api/feedback.js`) del lado del backend.

## Uso local

Si querés probar localmente con funciones serverless de Vercel, instalá [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel dev
```

Esto levanta un servidor local que emula el entorno de Vercel, incluyendo las variables de entorno del archivo `.env`.
