export interface QuestionBD {
  id: number;
  topic: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export const BD_QUESTIONS: QuestionBD[] = [
  // ===== TP01: Archivos, Carpetas, Metadatos, Extensiones, CSV vs XLSX, Rutas =====
  {
    id: 1,
    topic: "TP01",
    question: "¿Qué son los metadatos en un archivo?",
    options: [
      "A) El contenido principal del archivo",
      "B) Datos que describen otros datos, como fecha de creación, tamaño y tipo",
      "C) El nombre del archivo únicamente",
      "D) La extensión del archivo"
    ],
    correct: 1,
    explanation: "Los metadatos son 'datos sobre datos'. Describen propiedades del archivo (fecha, tamaño, tipo, autor) sin ser el contenido en sí."
  },
  {
    id: 2,
    topic: "TP01",
    question: "¿Cuál es la diferencia principal entre los formatos CSV y XLSX?",
    options: [
      "A) CSV es para imágenes, XLSX para texto",
      "B) CSV es un formato de texto plano sin formato; XLSX es un formato binario con soporte para fórmulas y estilos",
      "C) Son exactamente iguales",
      "D) XLSX es más antiguo que CSV"
    ],
    correct: 1,
    explanation: "CSV (Comma-Separated Values) almacena datos como texto plano separado por comas, sin formato. XLSX es el formato nativo de Excel basado en XML que soporta fórmulas, estilos y múltiples hojas."
  },
  {
    id: 3,
    topic: "TP01",
    question: "¿Qué indica la extensión de un archivo?",
    options: [
      "A) El tamaño del archivo",
      "B) La ubicación del archivo",
      "C) El tipo o formato del archivo",
      "D) La fecha de modificación"
    ],
    correct: 2,
    explanation: "La extensión (ej: .txt, .jpg, .pdf) indica el tipo o formato del archivo, permitiendo al sistema operativo asociarlo con el programa adecuado."
  },
  {
    id: 4,
    topic: "TP01",
    question: "¿Qué es una ruta absoluta?",
    options: [
      "A) La ruta desde la carpeta raíz hasta un archivo",
      "B) La ruta desde la carpeta actual hasta un archivo",
      "C) El nombre del archivo solamente",
      "D) Un acceso directo"
    ],
    correct: 0,
    explanation: "Una ruta absoluta especifica la ubicación completa desde la raíz del sistema de archivos (ej: C:/Users/Usuario/Documentos/archivo.txt)."
  },
  {
    id: 5,
    topic: "TP01",
    question: "¿Qué es una carpeta o directorio?",
    options: [
      "A) Un tipo de archivo especial que contiene otros archivos y carpetas",
      "B) Un archivo ejecutable",
      "C) Un programa de computadora",
      "D) Un metadato del sistema"
    ],
    correct: 0,
    explanation: "Un directorio es una estructura que organiza jerárquicamente los archivos, pudiendo contener otros archivos y subdirectorios."
  },
  {
    id: 6,
    topic: "TP01",
    question: "¿Qué son los archivos en informática?",
    options: [
      "A) Colecciones de datos almacenados en un dispositivo con un nombre identificador",
      "B) Programas exclusivamente ejecutables",
      "C) Solo documentos de texto",
      "D) Carpetas del sistema"
    ],
    correct: 0,
    explanation: "Un archivo es un conjunto de datos almacenados en un dispositivo de almacenamiento, identificado por un nombre y una extensión que indica su tipo."
  },

  // ===== TP02: DBMS, Arquitectura tres niveles, DDL/DML/DCL, DA vs DBA, Redundancia, Independencia de datos, Fases del diseño =====
  {
    id: 7,
    topic: "TP02",
    question: "¿Qué es un DBMS (Database Management System)?",
    options: [
      "A) Un programa para crear presentaciones",
      "B) Un sistema de software que permite crear, gestionar y administrar bases de datos",
      "C) Un tipo de archivo CSV",
      "D) Un lenguaje de programación"
    ],
    correct: 1,
    explanation: "Un DBMS (Sistema Gestor de Bases de Datos) es un software que actúa como intermediario entre los usuarios y la base de datos, facilitando el almacenamiento, consulta y administración de datos."
  },
  {
    id: 8,
    topic: "TP02",
    question: "¿Cuáles son los tres niveles de la arquitectura de bases de datos?",
    options: [
      "A) Físico, lógico y de vistas",
      "B) Interno, conceptual y externo",
      "C) Simple, medio y complejo",
      "D) Local, regional y global"
    ],
    correct: 1,
    explanation: "La arquitectura de tres niveles (ANSI/SPARC) divide la BD en: nivel interno (almacenamiento físico), nivel conceptual (estructura lógica global) y nivel externo (vistas de los usuarios)."
  },
  {
    id: 9,
    topic: "TP02",
    question: "¿Qué significa DDL en bases de datos?",
    options: [
      "A) Data Definition Language — lenguaje para definir la estructura de la base de datos",
      "B) Data Direct Language",
      "C) Digital Data Library",
      "D) Data Display Language"
    ],
    correct: 0,
    explanation: "DDL (Data Definition Language) incluye comandos como CREATE, ALTER y DROP, que permiten definir y modificar la estructura de tablas, índices y otros objetos de la BD."
  },
  {
    id: 10,
    topic: "TP02",
    question: "¿Qué comando pertenece al DML (Data Manipulation Language)?",
    options: [
      "A) CREATE",
      "B) ALTER",
      "C) SELECT",
      "D) GRANT"
    ],
    correct: 2,
    explanation: "DML incluye comandos para manipular datos: SELECT (consultar), INSERT (insertar), UPDATE (actualizar) y DELETE (eliminar). CREATE y ALTER son DDL; GRANT es DCL."
  },
  {
    id: 11,
    topic: "TP02",
    question: "¿Cuál es la diferencia entre un DA (Administrador de Datos) y un DBA (Administrador de Base de Datos)?",
    options: [
      "A) Son el mismo rol",
      "B) El DA define qué datos se almacenan y las políticas; el DBA se encarga de la implementación técnica y el mantenimiento",
      "C) El DBA define los datos y el DA los implementa",
      "D) No existe el rol de DA"
    ],
    correct: 1,
    explanation: "El DA (Data Administrator) se enfoca en la definición estratégica de datos y políticas; el DBA (Database Administrator) se ocupa de la implementación técnica, rendimiento, seguridad y mantenimiento del DBMS."
  },
  {
    id: 12,
    topic: "TP02",
    question: "¿Qué es la redundancia de datos?",
    options: [
      "A) Almacenar los mismos datos en múltiples lugares, lo que puede causar inconsistencias",
      "B) Eliminar datos duplicados automáticamente",
      "C) Comprimir datos para ahorrar espacio",
      "D) Respaldar datos en la nube"
    ],
    correct: 0,
    explanation: "La redundancia ocurre cuando un mismo dato se repite en varios lugares de la BD. Esto puede provocar inconsistencias (datos diferentes para un mismo hecho) y desperdicio de espacio."
  },
  {
    id: 13,
    topic: "TP02",
    question: "¿Qué es la independencia de datos?",
    options: [
      "A) Que los datos no dependen de la electricidad",
      "B) La capacidad de modificar la estructura física o lógica sin afectar a los usuarios o aplicaciones",
      "C) Que cada usuario tiene su propia copia de los datos",
      "D) Que los datos se almacenan en archivos separados"
    ],
    correct: 1,
    explanation: "La independencia de datos permite cambiar la organización física (independencia física) o lógica (independencia lógica) de los datos sin que las aplicaciones que los usan deban modificarse."
  },
  {
    id: 14,
    topic: "TP02",
    question: "¿Cuáles son las fases del diseño de una base de datos?",
    options: [
      "A) Análisis, codificación y prueba",
      "B) Diseño conceptual, diseño lógico y diseño físico",
      "C) Creación, inserción y eliminación",
      "D) Planificación, ejecución y evaluación"
    ],
    correct: 1,
    explanation: "Las tres fases del diseño de BD son: diseño conceptual (modelo ER independiente del DBMS), diseño lógico (esquema relacional/tablas) y diseño físico (índices, almacenamiento, rendimiento)."
  },

  // ===== TP03: Entidades, Atributos, Relaciones, Cardinalidad, Modelo de Chen, Sistemas Clínica/Escolar/Logística =====
  {
    id: 15,
    topic: "TP03",
    question: "¿Qué es una entidad en el modelo entidad-relación?",
    options: [
      "A) Una tabla en la base de datos",
      "B) Un objeto o concepto del mundo real que se puede identificar de manera única",
      "C) Una consulta SQL",
      "D) Una relación entre dos tablas"
    ],
    correct: 1,
    explanation: "Una entidad es un objeto distinguible del mundo real (ej: un estudiante, un auto, un pedido) que tiene existencia propia y se describe mediante atributos."
  },
  {
    id: 16,
    topic: "TP03",
    question: "¿Qué son los atributos en una entidad?",
    options: [
      "A) Las relaciones con otras entidades",
      "B) Las propiedades o características que describen a una entidad",
      "C) Los índices de la base de datos",
      "D) Las consultas que se pueden hacer"
    ],
    correct: 1,
    explanation: "Los atributos son las propiedades que describen a una entidad (ej: para 'Empleado': nombre, DNI, fecha_nacimiento, salario). Cada atributo tiene un dominio de valores."
  },
  {
    id: 17,
    topic: "TP03",
    question: "¿Qué significa una cardinalidad 1:N en una relación?",
    options: [
      "A) Una entidad se relaciona con una sola entidad de otro tipo",
      "B) Una entidad se relaciona con muchas entidades de otro tipo, y viceversa",
      "C) Una entidad se relaciona con muchas entidades de otro tipo, pero cada una de esas pertenece a una sola",
      "D) Muchas entidades se relacionan con muchas entidades"
    ],
    correct: 2,
    explanation: "La cardinalidad 1:N (uno a muchos) significa que una entidad A puede estar asociada con varias entidades B, pero cada entidad B está asociada con una sola entidad A. Ej: un cliente tiene muchas facturas."
  },
  {
    id: 18,
    topic: "TP03",
    question: "En el modelo de Chen, ¿cómo se representa una entidad?",
    options: [
      "A) Con un círculo",
      "B) Con un rectángulo",
      "C) Con un rombo",
      "D) Con un triángulo"
    ],
    correct: 1,
    explanation: "En el modelo entidad-relación de Chen, las entidades se representan con rectángulos, las relaciones con rombos y los atributos con círculos o elipses."
  },
  {
    id: 19,
    topic: "TP03",
    question: "¿Qué es una relación N:M?",
    options: [
      "A) Muchos a muchos — varias entidades se relacionan con varias entidades del otro tipo",
      "B) Uno a muchos",
      "C) Uno a uno",
      "D) No existe ese tipo de relación"
    ],
    correct: 0,
    explanation: "N:M significa que varias entidades de un tipo se relacionan con varias entidades del otro. Ej: un estudiante cursa muchas materias y cada materia tiene muchos estudiantes."
  },
  {
    id: 20,
    topic: "TP03",
    question: "En el modelo de Chen, ¿cómo se representa una relación entre entidades?",
    options: [
      "A) Con un rectángulo",
      "B) Con un círculo",
      "C) Con un rombo",
      "D) Con una línea punteada"
    ],
    correct: 2,
    explanation: "En el modelo de Chen, las relaciones entre entidades se representan con rombos, conectados mediante líneas a las entidades participantes."
  },
  {
    id: 21,
    topic: "TP03",
    question: "En un sistema de clínica, ¿qué cardinalidad hay entre Médico y Paciente?",
    options: [
      "A) 1:1 — un médico atiende a un solo paciente",
      "B) 1:N — un médico atiende a muchos pacientes, cada paciente tiene un médico",
      "C) N:M — un médico atiende a muchos pacientes y un paciente puede ser atendido por varios médicos",
      "D) No hay relación"
    ],
    correct: 2,
    explanation: "En un sistema de clínica, la relación entre Médico y Paciente suele ser N:M, ya que un médico atiende a varios pacientes y un paciente puede ser atendido por varios médicos."
  },
  {
    id: 22,
    topic: "TP03",
    question: "¿Qué es una cardinalidad 1:1?",
    options: [
      "A) Cada entidad se relaciona con exactamente una entidad del otro tipo",
      "B) Una entidad se relaciona con muchas",
      "C) Muchas entidades se relacionan con muchas",
      "D) No existe en bases de datos"
    ],
    correct: 0,
    explanation: "La cardinalidad 1:1 significa que cada instancia de una entidad se relaciona con exactamente una instancia de la otra. Ej: cada persona tiene un único DNI."
  },
];
