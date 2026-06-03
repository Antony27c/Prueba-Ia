export interface QuestionPPDificil {
  id: number;
  unit: 1 | 2 | 3;
  unitLabel: string;
  topic: string;
  question: string;
  keyPoints: string[];
  modelAnswer: string;
}

export const PP_DIFICIL_QUESTIONS: QuestionPPDificil[] = [
  // ===== UNIDAD 1 (4 preguntas) =====
  {
    id: 101,
    unit: 1,
    unitLabel: 'Unidad 1',
    topic: 'Entorno del Programador + HTML/CSS',
    question: '¿Qué es un Sistema Operativo y cuál es su función principal en una computadora?',
    keyPoints: [
      'intermediario entre hardware y software',
      'gestiona recursos del sistema (CPU, memoria, discos)',
      'ejemplos: Windows, Linux, macOS',
    ],
    modelAnswer: 'Un Sistema Operativo es un software que actúa como intermediario entre el hardware y el software. Su función principal es gestionar los recursos del sistema como la CPU, memoria y dispositivos de almacenamiento, y proporcionar una interfaz para que los programas y el usuario interactúen con la computadora. Ejemplos: Windows, Linux y macOS.',
  },
  {
    id: 102,
    unit: 1,
    unitLabel: 'Unidad 1',
    topic: 'Entorno del Programador + HTML/CSS',
    question: 'Explicá el flujo de trabajo básico de Git: ¿qué hacen git add, git commit y git push?',
    keyPoints: [
      'git add agrega cambios al staging area',
      'git commit guarda el snapshot localmente en el historial',
      'git push sube los commits al repositorio remoto',
    ],
    modelAnswer: 'git add prepara los archivos modificados para ser confirmados, moviéndolos al staging area. git commit crea un snapshot permanente de esos cambios en el repositorio local. git push envía los commits locales al repositorio remoto (como GitHub o GitLab).',
  },
  {
    id: 103,
    unit: 1,
    unitLabel: 'Unidad 1',
    topic: 'Entorno del Programador + HTML/CSS',
    question: '¿Qué son las etiquetas semánticas de HTML5 y por qué se usan? Mencioná al menos 3 ejemplos.',
    keyPoints: [
      'describen el significado del contenido, no solo su apariencia',
      'mejoran accesibilidad y SEO',
      'ejemplos: header, nav, main, footer, section, article, aside',
    ],
    modelAnswer: 'Las etiquetas semánticas de HTML5 le dan significado al contenido, indicando qué representa cada sección de la página. Se usan para mejorar la accesibilidad (lectores de pantalla) y el SEO (los buscadores entienden mejor la estructura). Ejemplos: <header> (encabezado), <nav> (navegación), <footer> (pie de página), <section> (sección genérica), <article> (contenido independiente).',
  },
  {
    id: 104,
    unit: 1,
    unitLabel: 'Unidad 1',
    topic: 'Entorno del Programador + HTML/CSS',
    question: '¿Qué es Flexbox y para qué tipo de layout se usa? Mencioná al menos dos propiedades del contenedor.',
    keyPoints: [
      'layout unidimensional (una fila o columna)',
      'display: flex',
      'justify-content para alineación horizontal',
      'align-items para alineación vertical',
    ],
    modelAnswer: 'Flexbox es un modelo de layout unidimensional que distribuye elementos en una sola dirección (fila o columna). Se usa para alinear y distribuir espacio entre elementos de un contenedor. Propiedades del contenedor: display: flex para activarlo, justify-content (alineación horizontal), align-items (alineación vertical), gap (espaciado entre items).',
  },

  // ===== UNIDAD 2 (5 preguntas) =====
  {
    id: 201,
    unit: 2,
    unitLabel: 'Unidad 2',
    topic: 'CSS Avanzado, JavaScript ES6+ y Servidor Web',
    question: 'Explicá las diferencias entre let, const y var en JavaScript.',
    keyPoints: [
      'var tiene scope de función y puede redeclararse',
      'let tiene scope de bloque y puede reasignarse',
      'const tiene scope de bloque y no puede reasignarse',
    ],
    modelAnswer: 'var tiene alcance de función (function scope) y permite redeclaración. let y const tienen alcance de bloque (block scope). let permite reasignar su valor, const no permite reasignación. En general se recomienda usar const por defecto y let cuando se necesita reasignar. var está en desuso por su comportamiento impredecible.',
  },
  {
    id: 202,
    unit: 2,
    unitLabel: 'Unidad 2',
    topic: 'CSS Avanzado, JavaScript ES6+ y Servidor Web',
    question: '¿Qué son los métodos map() y filter() de los arrays? Explicá qué hace cada uno con un ejemplo simple.',
    keyPoints: [
      'map transforma cada elemento y devuelve un nuevo array del mismo tamaño',
      'filter devuelve solo los elementos que cumplen la condición',
      'ambos no modifican el array original (inmutables)',
    ],
    modelAnswer: 'map() recorre el array y transforma cada elemento, devolviendo un nuevo array del mismo tamaño. Ej: [1,2,3].map(n => n * 2) → [2,4,6]. filter() recorre el array y devuelve solo los elementos que cumplen una condición. Ej: [1,2,3,4].filter(n => n > 2) → [3,4]. Ninguno modifica el array original.',
  },
  {
    id: 203,
    unit: 2,
    unitLabel: 'Unidad 2',
    topic: 'CSS Avanzado, JavaScript ES6+ y Servidor Web',
    question: 'Explicá el modelo cliente-servidor: ¿qué es un request y un response?',
    keyPoints: [
      'cliente hace una solicitud (request) al servidor',
      'servidor procesa y devuelve una respuesta (response)',
      'ejemplos de métodos HTTP: GET, POST, DELETE, PUT',
    ],
    modelAnswer: 'En el modelo cliente-servidor, el cliente (navegador, app) envía un request (solicitud) al servidor pidiendo un recurso o acción. El servidor procesa la solicitud y devuelve un response (respuesta) con los datos solicitados o un código de estado. Los métodos HTTP comunes son GET (obtener), POST (crear), PUT (actualizar) y DELETE (eliminar).',
  },
  {
    id: 204,
    unit: 2,
    unitLabel: 'Unidad 2',
    topic: 'CSS Avanzado, JavaScript ES6+ y Servidor Web',
    question: '¿Qué son los códigos de estado HTTP? Mencioná al menos 4 con su significado.',
    keyPoints: [
      '200 OK (éxito)',
      '201 Created (recurso creado)',
      '404 Not Found (no encontrado)',
      '500 Internal Server Error (error del servidor)',
      '401 Unauthorized (no autorizado)',
      '301 Redirect (redirección)',
    ],
    modelAnswer: 'Los códigos de estado HTTP indican el resultado de una solicitud. Los más importantes: 200 OK (solicitud exitosa), 201 Created (recurso creado correctamente), 404 Not Found (recurso no encontrado), 500 Internal Server Error (error en el servidor), 401 Unauthorized (falta autenticación), 301 Moved Permanently (redirección).',
  },
  {
    id: 205,
    unit: 2,
    unitLabel: 'Unidad 2',
    topic: 'CSS Avanzado, JavaScript ES6+ y Servidor Web',
    question: '¿Qué es el DOM y cómo puede JavaScript manipularlo? Mencioná dos métodos de selección.',
    keyPoints: [
      'árbol de nodos que representa la estructura del HTML',
      'getElementById para seleccionar por ID',
      'querySelector para seleccionar con selectores CSS',
      'textContent, innerHTML, classList para modificar',
    ],
    modelAnswer: 'El DOM (Document Object Model) es una representación en memoria del documento HTML como un árbol de nodos. JavaScript puede manipularlo usando métodos como: document.getElementById("id") para seleccionar por ID, document.querySelector(".clase") para seleccionar con selectores CSS. Luego puede modificar contenido con textContent o innerHTML, o estilos con classList.',
  },

  // ===== UNIDAD 3 (4 preguntas) =====
  {
    id: 301,
    unit: 3,
    unitLabel: 'Unidad 3',
    topic: 'React.js y Frontend Profesional',
    question: '¿Qué es un componente en React y cuál es su convención de nombres?',
    keyPoints: [
      'función que retorna JSX',
      'PascalCase para el nombre del componente',
      'reutilizable y componible',
    ],
    modelAnswer: 'Un componente en React es una función de JavaScript que retorna JSX (una sintaxis similar a HTML). Representa una pieza reutilizable de la interfaz. Los componentes se nombran en PascalCase (ej: Boton, TarjetaUsuario). Se pueden componer (un componente dentro de otro) para construir interfaces complejas.',
  },
  {
    id: 302,
    unit: 3,
    unitLabel: 'Unidad 3',
    topic: 'React.js y Frontend Profesional',
    question: '¿Qué son las props? ¿Por qué se dice que son de solo lectura?',
    keyPoints: [
      'datos que el padre pasa al hijo',
      'no se pueden modificar dentro del componente hijo',
      'flujo unidireccional de datos',
    ],
    modelAnswer: 'Las props (properties) son datos que un componente padre le pasa a un componente hijo. Se dice que son de solo lectura porque el componente hijo no debe modificarlas; React sigue un flujo unidireccional de datos (de padre a hijo). Si el hijo necesita cambiar datos, debe notificar al padre mediante callbacks.',
  },
  {
    id: 303,
    unit: 3,
    unitLabel: 'Unidad 3',
    topic: 'React.js y Frontend Profesional',
    question: 'Explicá el hook useState: ¿para qué sirve y cómo funciona?',
    keyPoints: [
      'maneja estado local del componente',
      'retorna un array con [valor, funciónSetter]',
      'llamar al setter re-renderiza el componente',
    ],
    modelAnswer: 'useState es un hook que permite agregar estado local a componentes funcionales. Se usa así: const [contador, setContador] = useState(0). Retorna un array con dos elementos: el valor actual del estado y una función para actualizarlo. Al llamar a la función setter (setContador), React vuelve a renderizar el componente con el nuevo valor.',
  },
  {
    id: 304,
    unit: 3,
    unitLabel: 'Unidad 3',
    topic: 'React.js y Frontend Profesional',
    question: '¿Para qué sirve useEffect? Explicá qué pasa si el array de dependencias está vacío.',
    keyPoints: [
      'ejecuta efectos secundarios (fetch, timers, suscripciones)',
      'array vacío [] = solo se ejecuta al montar el componente',
      'sin array = se ejecuta en cada render',
      'útil para fetch inicial de datos',
    ],
    modelAnswer: 'useEffect ejecuta código después de que el componente se renderiza. Sirve para efectos secundarios como peticiones API, timers o suscripciones. Si el array de dependencias está vacío [], el efecto se ejecuta solo una vez cuando el componente se monta. Si no se pasa array, se ejecuta en cada render. Si tiene valores, se ejecuta cuando esos valores cambian.',
  },
];
