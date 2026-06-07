export interface Tema {
  id: number;
  unidad: string;
  titulo: string;
  teoria: string;
  codigo: string;
  pregunta: string;
  opciones: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correcta: 'A' | 'B' | 'C' | 'D';
  explicacion_correcta: string;
  explicacion_incorrecta: string;
}

export const TEMAS: Tema[] = [
  // ===== UNIDAD 0 — Nivelación Python =====
  {
    id: 1,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'Variables y tipos de datos',
    teoria:
      'En Python, las variables no requieren declaración explícita de tipo. El tipo se infiere automáticamente en tiempo de ejecución. Los tipos básicos incluyen int, float, str, bool, list, tuple, dict y set. Python es dinámicamente tipado, lo que significa que una variable puede cambiar de tipo durante la ejecución.',
    codigo: `# Definición de variables con distintos tipos de datos
nombre = "Ana"          # str (cadena de texto): se escribe entre comillas
edad = 20               # int (número entero): sin decimales
altura = 1.75           # float (número decimal): usa punto como separador
es_estudiante = True    # bool (booleano): True o False

# Tipado dinámico: una variable puede cambiar de tipo
valor = 42             # empieza siendo int
valor = "ahora texto"  # ahora pasa a ser str (esto es válido en Python)

# Type hints: indican el tipo esperado (solo documentación, no obligatorio)
total: int = 100        # ": int" es una sugerencia, no una regla
print(type(total))      # type() muestra el tipo real: <class 'int'>`,
    pregunta: '¿Cuál de las siguientes afirmaciones sobre variables en Python es correcta?',
    opciones: {
      A: 'Las variables deben declararse con su tipo antes de usarse',
      B: 'Python permite que una variable cambie de tipo durante la ejecución',
      C: 'El tipo de una variable se define con la sintaxis "var: tipo = valor" obligatoriamente',
      D: 'Las variables en Python solo pueden almacenar números y texto',
    },
    correcta: 'B',
    explicacion_correcta:
      'Python es dinámicamente tipado: una variable puede cambiar de tipo durante la ejecución sin necesidad de redeclararla.',
    explicacion_incorrecta:
      'Python no requiere declaración de tipos (A), los type hints son opcionales (C), y las variables pueden almacenar muchos más tipos como listas, diccionarios, etc. (D).',
  },
  {
    id: 2,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'f-strings y formateo',
    teoria:
      'Los f-strings (Python 3.6+) permiten incrustar expresiones dentro de cadenas usando la sintaxis f"texto {expresión}". Son más legibles y rápidos que los métodos anteriores como %-formatting o str.format(). También soportan especificadores de formato como :.2f para decimales.',
    codigo: `# f-strings básicos: se antepone "f" antes de las comillas
nombre = "Carlos"      # variable de tipo str
edad = 22              # variable de tipo int
# Las llaves {} insertan el valor de la variable dentro del texto
print(f"Me llamo {nombre} y tengo {edad} años")

# Las llaves pueden contener expresiones, no solo variables
print(f"El doble de {edad} es {edad * 2}")

# Formateo de números con decimales
pi = 3.14159265        # número con muchos decimales
print(f"Pi con 2 decimales: {pi:.2f}")  # ":2f" redondea a 2 decimales

# Alineación de texto en columnas
print(f"|{'texto':<10}|")  # "<10" alinea a la izquierda en 10 espacios
print(f"|{'texto':>10}|")  # ">10" alinea a la derecha en 10 espacios`,
    pregunta: '¿Cuál es la salida del siguiente código?\n\nnumero = 7\nprint(f"El {numero * 2} es par")',
    opciones: {
      A: 'El 14 es par',
      B: 'El numero * 2 es par',
      C: 'El 7 * 2 es par',
      D: 'Error de sintaxis',
    },
    correcta: 'A',
    explicacion_correcta:
      'Los f-strings evalúan las expresiones dentro de las llaves, por lo que 7 * 2 se calcula como 14 y se incrusta en la cadena.',
    explicacion_incorrecta:
      'Las otras opciones ignoran que las expresiones dentro de {} se evalúan (B, C) o asumen incorrectamente un error de sintaxis (D).',
  },
  {
    id: 3,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'Operadores y condicionales',
    teoria:
      'Python ofrece operadores aritméticos (+, -, *, /, //, %, **), de comparación (==, !=, <, >, <=, >=) y lógicos (and, or, not). Los condicionales usan if, elif y else con indentación obligatoria. El operador ternario permite condiciones en una línea: valor_si_true if condicion else valor_si_false.',
    codigo: `# Operadores aritméticos especiales de Python
print(10 // 3)   # // división entera: resultado 3 (descarta el decimal)
print(10 % 3)    # % módulo: resto de la división (10 / 3 = 3, resto 1)
print(5 ** 2)    # ** potencia: 5 elevado al cuadrado = 25

# Estructura condicional con if / elif / else
nota = 85                # nota del estudiante
if nota >= 90:           # si la condición es verdadera
    print("Excelente")
elif nota >= 70:         # si no se cumplió la primera pero sí esta
    print("Bueno")
else:                    # si ninguna condición anterior se cumplió
    print("Necesita mejorar")

# Operador ternario: condición en una sola línea
edad = 17
mensaje = "Mayor" if edad >= 18 else "Menor"  # es como un if compacto`,
    pregunta: '¿Qué retorna la expresión (10 // 3) + (10 % 3)?',
    opciones: {
      A: '10',
      B: '3.33',
      C: '4',
      D: '3',
    },
        correcta: 'C',
    explicacion_correcta:
      '10 // 3 da 3 (división entera) y 10 % 3 da 1 (resto). 3 + 1 = 4.',
    explicacion_incorrecta:
      'La división entera (//) y el módulo (%) son operaciones distintas; su suma no da 3.33, 10 ni 3.',
  },
  {
    id: 4,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'Bucles y colecciones',
    teoria:
      'Python tiene dos tipos principales de bucles: for (para iterar sobre colecciones) y while (mientras se cumpla una condición). Las colecciones principales son listas (mutables), tuplas (inmutables), diccionarios (pares clave-valor) y conjuntos (elementos únicos). La función range() genera secuencias numéricas.',
    codigo: `# Lista: colección ordenada y modificable
frutas = ["manzana", "pera", "banana"]  # se define con corchetes
for fruta in frutas:                     # itera sobre cada elemento
    print(fruta)                         # imprime cada fruta

# range(): genera números del 0 al n-1
for i in range(3):      # range(3) produce: 0, 1, 2
    print(i)

# while: repite mientras la condición sea verdadera
contador = 0
while contador < 3:     # se ejecuta mientras contador sea menor a 3
    contador += 1       # incrementa contador en 1 cada vuelta

# Diccionario: colección clave -> valor (como un mapa)
edades = {"Ana": 20, "Luis": 22}     # clave: nombre, valor: edad
for clave, valor in edades.items():  # items() da pares (clave, valor)
    print(f"{clave}: {valor}")`,
    pregunta: '¿Cuál es la salida del siguiente código?\n\nfor i in range(3):\n    print(i, end=" ")',
    opciones: {
      A: '1 2',
      B: '1 2 3',
      C: '0 1 2 3',
      D: '0 1 2',
    },
        correcta: 'D',
    explicacion_correcta:
      'range(3) genera los números 0, 1 y 2. El parámetro end=" " hace que se impriman en la misma línea separados por espacio.',
    explicacion_incorrecta:
      'range(n) comienza en 0 y termina en n-1, no en 1 (B, D) ni incluye el límite superior (C).',
  },
  {
    id: 5,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'Funciones (*args, **kwargs, lambda)',
    teoria:
      'Las funciones se definen con def. *args captura argumentos posicionales adicionales como tupla. **kwargs captura argumentos con nombre adicionales como diccionario. Las funciones lambda son funciones anónimas de una sola expresión. Los parámetros pueden tener valores por defecto.',
    codigo: `# Función básica: recibe un parámetro y retorna un valor
def saludar(nombre):
    return f"Hola {nombre}"  # return envía el resultado al que llamó

# *args: permite recibir cualquier cantidad de argumentos posicionales
def sumar_todo(*args):       # args es una tupla con todos los valores
    return sum(args)          # sum() suma todos los elementos de la tupla

# **kwargs: permite recibir argumentos con nombre (clave=valor)
def mostrar_datos(**kwargs):  # kwargs es un diccionario
    for k, v in kwargs.items():
        print(f"{k}: {v}")

# Llamadas a las funciones
sumar_todo(1, 2, 3)       # args = (1, 2, 3), retorna 6
mostrar_datos(nombre="Ana", edad=20)  # kwargs = {"nombre": "Ana", "edad": 20}

# Lambda: función anónima de una sola línea
cuadrado = lambda x: x ** 2   # "lambda parámetros: expresión"
print(cuadrado(5))             # 25`,
    pregunta: '¿Qué imprime el siguiente código?\n\nf = lambda a, b: a if a > b else b\nprint(f(5, 8))',
    opciones: {
      A: '8',
      B: '5',
      C: 'True',
      D: 'Error porque lambda no puede usar if',
    },
    correcta: 'A',
    explicacion_correcta:
      'La lambda retorna el mayor de los dos valores. Como 8 > 5, retorna 8.',
    explicacion_incorrecta:
      'Las lambdas sí pueden usar expresiones condicionales ternarias (D). La comparación retorna 8, no 5 (B) ni True (C).',
  },
  {
    id: 6,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'POO: clases, __init__, self, __str__',
    teoria:
      'Las clases en Python se definen con class. El método __init__ es el constructor que se ejecuta al instanciar. self referencia a la instancia actual. __str__ define la representación informal del objeto (lo que retorna str() y print()). Todos los métodos de instancia reciben self como primer parámetro.',
    codigo: `# Definición de la clase Persona
class Persona:
    # __init__ es el constructor: se ejecuta al crear un objeto
    def __init__(self, nombre, edad):
        self.nombre = nombre  # self.nombre es el atributo de la instancia
        self.edad = edad      # self.edad guarda el valor recibido

    # Método de instancia: recibe self como primer parámetro
    def saludar(self):
        return f"Hola, soy {self.nombre}"

    # __str__ define qué mostrar cuando se imprime el objeto
    def __str__(self):
        return f"{self.nombre} ({self.edad} años)"

# Creación de una instancia (objeto)
p = Persona("Ana", 25)   # Python llama automáticamente a __init__
print(p)                 # usa __str__: "Ana (25 años)"
print(p.saludar())       # llama al método saludar() de la instancia`,
    pregunta: '¿Qué imprime print(p) si p = Persona("Luis", 30)?',
    opciones: {
      A: '<__main__.Persona object at 0x...>',
      B: 'Luis (30 años)',
      C: '{"nombre": "Luis", "edad": 30}',
      D: 'Error porque falta implementar __str__',
    },
        correcta: 'B',
    explicacion_correcta:
      'El método __str__ está definido y retorna un string formateado. print() usa __str__ automáticamente.',
    explicacion_incorrecta:
      'Al tener __str__ definido, no se muestra la representación default del objeto (B). Tampoco retorna un dict (C) ni hay error (D).',
  },
  {
    id: 7,
    unidad: 'Unidad 0 — Nivelación Python',
    titulo: 'POO: herencia y polimorfismo',
    teoria:
      'La herencia permite que una clase derive de otra, heredando sus atributos y métodos. Se usa class Hija(Padre). super() llama métodos de la clase padre. El polimorfismo permite que objetos de distintas clases respondan al mismo método de forma distinta. Python soporta herencia múltiple.',
    codigo: `# Clase padre (superclase)
class Animal:
    def __init__(self, nombre):
        self.nombre = nombre  # atributo común a todos los animales

    def hacer_sonido(self):
        pass  # "pass" es un placeholder: no hace nada (método vacío)

# Perro hereda de Animal: recibe nombre y puede sobrescribir métodos
class Perro(Animal):
    def hacer_sonido(self):   # sobrescribe el método del padre
        return "Guau"

# Gato también hereda de Animal
class Gato(Animal):
    def hacer_sonido(self):   # misma firma, distinto comportamiento
        return "Miau"

# Polimorfismo: cada objeto responde según su clase real
animales = [Perro("Rex"), Gato("Misu")]  # lista con objetos de distintas clases
for a in animales:
    # a.hacer_sonido() se comporta distinto según sea Perro o Gato
    print(f"{a.nombre} dice {a.hacer_sonido()}")`,
    pregunta: '¿Qué imprime el bucle for del código anterior?',
    opciones: {
      A: 'Rex dice None\nMisu dice None',
      B: 'Rex dice Miau\nMisu dice Guau',
      C: 'Rex dice Guau\nMisu dice Miau',
      D: 'Error porque Animal no tiene implementación en hacer_sonido',
    },
        correcta: 'C',
    explicacion_correcta:
      'Cada clase hija sobrescribe hacer_sonido() con su propia implementación. Perro retorna "Guau" y Gato retorna "Miau".',
    explicacion_incorrecta:
      'No se intercambian los sonidos (B). Cada objeto conserva su método sobrescrito (C). Python no obliga a implementar métodos abstractos a nivel de clase (D).',
  },

  // ===== UNIDAD 1 — Estructuras Dinámicas Lineales =====
  {
    id: 8,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'TAD: interfaz vs implementación',
    teoria:
      'Un TAD (Tipo Abstracto de Dato) define qué operaciones se pueden realizar sobre una estructura de datos, sin especificar cómo se implementan. La interfaz describe las operaciones públicas (push, pop, etc.), mientras que la implementación concreta puede usar arrays, nodos enlazados, etc. Esto permite cambiar la implementación sin afectar al usuario del TAD.',
    codigo: `# INTERFAZ: define QUÉ hace (sin mostrar CÓMO)
class Pila:
    # Los "..." indican que el método no está implementado aún
    def push(self, elemento): ...   # agregar elemento al tope
    def pop(self): ...               # quitar y devolver el tope
    def peek(self): ...              # ver el tope sin quitarlo
    def esta_vacia(self): ...        # consultar si está vacía

# IMPLEMENTACIÓN: define CÓMO funciona (usa lista de Python internamente)
class PilaConLista(Pila):           # hereda de la interfaz Pila
    def __init__(self):
        self._elementos = []         # lista privada para guardar datos

    def push(self, elemento):
        self._elementos.append(elemento)  # append agrega al final

    def pop(self):
        return self._elementos.pop()      # pop() quita el último elemento

    def peek(self):
        return self._elementos[-1]        # [-1] accede al último elemento

    def esta_vacia(self):
        return len(self._elementos) == 0  # True si la lista está vacía`,
    pregunta: '¿Cuál es la principal ventaja de separar interfaz e implementación en un TAD?',
    opciones: {
      A: 'El código se ejecuta más rápido',
      B: 'Se puede cambiar la implementación sin modificar el código que usa el TAD',
      C: 'Se reduce la cantidad de métodos necesarios',
      D: 'La interfaz obliga a usar listas de Python',
    },
    correcta: 'B',
    explicacion_correcta:
      'La separación permite cambiar la implementación interna (ej: de lista a nodos enlazados) sin afectar el código cliente que usa el TAD.',
    explicacion_incorrecta:
      'No necesariamente mejora velocidad (A), no reduce métodos (C), y la interfaz no dicta la implementación (D).',
  },
  {
    id: 9,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'Nodos y referencias',
    teoria:
      'Un nodo es la unidad básica de las estructuras enlazadas. Contiene un dato y una o más referencias (enlaces) a otros nodos. En Python, las referencias son implícitas: asignar un objeto a una variable crea una referencia, no una copia. Dos variables pueden referenciar el mismo objeto.',
    codigo: `# Clase Nodo: unidad básica de las estructuras enlazadas
class Nodo:
    def __init__(self, dato):  # constructor: recibe el dato a guardar
        self.dato = dato       # atributo que almacena el valor
        self.siguiente = None  # referencia al próximo nodo (inicia vacía)

# Crear nodos individuales (cada uno es independiente)
nodo1 = Nodo(10)      # nodo con dato = 10, siguiente = None
nodo2 = Nodo(20)      # nodo con dato = 20, siguiente = None
nodo3 = Nodo(30)      # nodo con dato = 30, siguiente = None

# Enlazar nodos: conectar las referencias para formar una cadena
nodo1.siguiente = nodo2  # ahora nodo1 apunta a nodo2
nodo2.siguiente = nodo3  # ahora nodo2 apunta a nodo3

# Recorrer la cadena desde el primer nodo hasta el final
actual = nodo1           # empezamos por el primer nodo
while actual:            # mientras actual no sea None
    print(actual.dato, end=" -> ")  # imprimimos el dato del nodo actual
    actual = actual.siguiente       # avanzamos al siguiente nodo
# Resultado: 10 -> 20 -> 30 -> None`,
    pregunta: '¿Qué contiene nodo1.siguiente.siguiente.dato después de enlazar nodo1 -> nodo2 -> nodo3?',
    opciones: {
      A: 'Error porque no se puede encadenar .siguiente',
      B: '20',
      C: 'None',
      D: '30',
    },
        correcta: 'D',
    explicacion_correcta:
      'nodo1.siguiente es nodo2, y nodo2.siguiente es nodo3. Por tanto, nodo3.dato es 30.',
    explicacion_incorrecta:
      'El encadenamiento de referencias es válido (D). nodo1.siguiente.siguiente llega a nodo3, no a nodo2 (B). Su dato es 30, no None (C).',
  },
  {
    id: 10,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'Listas enlazadas simples',
    teoria:
      'Una lista enlazada simple es una secuencia de nodos donde cada nodo tiene un dato y un puntero al siguiente. La lista tiene una referencia a la cabeza (primer nodo). Las operaciones principales son insertar (al inicio, al final, en posición), eliminar, buscar y recorrer. A diferencia de los arrays, el acceso no es indexado: hay que recorrer desde la cabeza.',
    codigo: `# Clase Nodo: representa cada elemento de la lista
class Nodo:
    def __init__(self, dato):
        self.dato = dato       # valor que guarda el nodo
        self.siguiente = None  # referencia al próximo nodo

# Clase ListaEnlazada: administra la secuencia de nodos
class ListaEnlazada:
    def __init__(self):
        self.cabeza = None  # referencia al primer nodo (None = lista vacía)

    # Insertar un nuevo nodo al principio de la lista
    def insertar_inicio(self, dato):
        nuevo = Nodo(dato)     # crear el nuevo nodo con el dato
        nuevo.siguiente = self.cabeza  # el nuevo apunta al que era primero
        self.cabeza = nuevo    # la cabeza ahora apunta al nuevo nodo

    # Recorrer la lista imprimiendo cada elemento
    def recorrer(self):
        actual = self.cabeza   # empezar desde la cabeza
        while actual:          # mientras haya nodos
            print(actual.dato, end=" -> ")  # imprimir el dato
            actual = actual.siguiente        # avanzar al siguiente
        print("None")          # indicar el final de la lista`,
    pregunta: '¿Qué ocurre si se llama a recorrer() sobre una lista enlazada recién creada (sin insertar elementos)?',
    opciones: {
      A: 'Imprime "None"',
      B: 'No imprime nada',
      C: 'Lanza AttributeError porque self.cabeza es None',
      D: 'Imprime "None -> None"',
    },
    correcta: 'A',
    explicacion_correcta:
      'Si self.cabeza es None, el while no se ejecuta y se imprime solo "None".',
    explicacion_incorrecta:
      'Sí imprime algo (B). No hay error porque while actual con actual=None simplemente no itera (C). No imprime flecha cuando no hay nodos (D).',
  },
  {
    id: 11,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'Listas dobles y circulares',
    teoria:
      'En una lista doblemente enlazada, cada nodo tiene dos punteros: siguiente y anterior. Esto permite recorrer en ambas direcciones. En una lista circular, el último nodo apunta al primero (o siguiente -> cabeza). Las listas dobles facilitan la eliminación de un nodo sin necesidad de conocer su predecesor.',
    codigo: `# Nodo para lista doblemente enlazada: tiene dos referencias
class NodoDoble:
    def __init__(self, dato):
        self.dato = dato         # valor del nodo
        self.siguiente = None    # referencia al nodo siguiente
        self.anterior = None     # referencia al nodo anterior

# Lista circular simple: el último nodo apunta al primero
class ListaCircular:
    def __init__(self):
        self.cabeza = None  # referencia al primer nodo

    def insertar(self, dato):
        nuevo = Nodo(dato)   # crear el nuevo nodo (usa la clase Nodo simple)
        if not self.cabeza:  # si la lista está vacía
            self.cabeza = nuevo      # el nuevo es el primer nodo
            nuevo.siguiente = nuevo  # se enlaza a sí mismo (forma un círculo)
        else:                # si ya hay elementos
            actual = self.cabeza
            # recorrer hasta encontrar el último nodo
            while actual.siguiente != self.cabeza:
                actual = actual.siguiente  # avanzar al siguiente
            # actual es el último: su siguiente apunta al nuevo
            actual.siguiente = nuevo
            nuevo.siguiente = self.cabeza  # el nuevo apunta a la cabeza`,
    pregunta: '¿Cuándo termina el while al insertar en una lista circular?',
    opciones: {
      A: 'Cuando actual es None',
      B: 'Cuando actual.siguiente es None',
      C: 'Cuando actual.siguiente es igual a self.cabeza',
      D: 'El while nunca termina porque es circular',
    },
        correcta: 'C',
    explicacion_correcta:
      'En una lista circular, el último nodo apunta a la cabeza. El while itera hasta encontrar el nodo cuyo siguiente sea la cabeza.',
    explicacion_incorrecta:
      'En listas circulares ningún siguiente es None (B, C). El while sí termina porque encuentra la condición de corte (D).',
  },
  {
    id: 12,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'Pilas — LIFO, push, pop, peek',
    teoria:
      'Una pila sigue el principio LIFO (Last In, First Out): el último elemento agregado es el primero en salir. Las operaciones básicas son push (agregar), pop (quitar y retornar el tope) y peek (ver el tope sin quitarlo). Se puede implementar con listas de Python (append/pop) o con nodos enlazados.',
    codigo: `# Implementación de una Pila usando una lista de Python
class Pila:
    def __init__(self):
        self._items = []  # lista interna donde se guardan los elementos

    # push: agrega un elemento al tope de la pila
    def push(self, item):
        self._items.append(item)  # append agrega al final de la lista

    # pop: quita y devuelve el elemento del tope
    def pop(self):
        if self.esta_vacia():        # validar que no esté vacía
            raise IndexError("Pila vacía")  # lanza una excepción
        return self._items.pop()     # pop() quita el último elemento

    # peek: mira el tope sin quitarlo
    def peek(self):
        if self.esta_vacia():
            raise IndexError("Pila vacía")
        return self._items[-1]       # [-1] accede al último sin borrarlo

    # esta_vacia: consulta si la pila tiene elementos
    def esta_vacia(self):
        return len(self._items) == 0  # True si la lista está vacía

# Uso de la pila
p = Pila()        # crear una pila vacía
p.push(10)        # apilar el 10 (tope -> [10])
p.push(20)        # apilar el 20 (tope -> [10, 20])
print(p.pop())    # desapilar: sale el 20 (LIFO: el último en entrar)
print(p.peek())   # mirar el tope: ahora es 10 (sin quitarlo)`,
    pregunta: '¿Qué imprime el código de uso de la pila?',
    opciones: {
      A: 'Error porque la pila está vacía',
      B: '10\n20',
      C: '10\n10',
      D: '20\n10',
    },
        correcta: 'D',
    explicacion_correcta:
      'pop() retorna el último elemento agregado (20, LIFO). Luego peek() muestra el tope actual (10) sin quitarlo.',
    explicacion_incorrecta:
      'pop() retorna el último (20), no el primero (B, C). La pila tiene elementos, no hay error (D).',
  },
  {
    id: 13,
    unidad: 'Unidad 1 — Estructuras Dinámicas Lineales',
    titulo: 'Colas — FIFO, enqueue, dequeue',
    teoria:
      'Una cola sigue el principio FIFO (First In, First Out): el primer elemento agregado es el primero en salir. Las operaciones básicas son enqueue (agregar al final), dequeue (quitar y retornar el frente) y front (ver el frente sin quitarlo). Se implementa comúnmente con collections.deque para operaciones eficientes en ambos extremos.',
    codigo: `from collections import deque  # deque: cola doblemente terminada (eficiente)

# Implementación de una Cola usando deque
class Cola:
    def __init__(self):
        self._items = deque()  # deque permite agregar/sacar de ambos extremos

    # enqueue: agrega un elemento al final de la cola
    def enqueue(self, item):
        self._items.append(item)  # append agrega al final

    # dequeue: quita y devuelve el primer elemento (el que lleva más tiempo)
    def dequeue(self):
        if self.esta_vacia():
            raise IndexError("Cola vacía")
        return self._items.popleft()  # popleft() quita el primero (FIFO)

    # front: mira el primer elemento sin quitarlo
    def front(self):
        if self.esta_vacia():
            raise IndexError("Cola vacía")
        return self._items[0]  # [0] accede al primero sin borrarlo

    def esta_vacia(self):
        return len(self._items) == 0

# Uso de la cola
c = Cola()         # crear una cola vacía
c.enqueue("a")     # encolar "a" (frente -> ["a", ...])
c.enqueue("b")     # encolar "b" (frente -> ["a", "b"])
print(c.dequeue()) # desencolar: sale "a" (FIFO: el primero en entrar)
print(c.front())   # mirar el frente: ahora es "b" (sin quitarlo)`,
    pregunta: '¿Qué imprime el código de uso de la cola?',
    opciones: {
      A: 'a\nb',
      B: 'b\na',
      C: 'a\na',
      D: 'b\nb',
    },
    correcta: 'A',
    explicacion_correcta:
      'dequeue() retorna el primer elemento agregado ("a", FIFO). front() muestra el nuevo frente ("b") sin quitarlo.',
    explicacion_incorrecta:
      'FIFO significa que el primero en entrar es el primero en salir, así que dequeue retorna "a", no "b" (B, D). front() ve "b", no "a" (C).',
  },

  // ===== UNIDAD 2 — Recursividad =====
  {
    id: 14,
    unidad: 'Unidad 2 — Recursividad',
    titulo: 'Caso base y caso recursivo',
    teoria:
      'Toda función recursiva tiene dos partes: el caso base (condición que detiene la recursión) y el caso recursivo (la función se llama a sí misma con un problema más pequeño). Sin caso base, la recursión sería infinita y provocaría un StackOverflowError. La recursión reemplaza iteraciones en problemas que pueden descomponerse en subproblemas similares.',
    codigo: `# Función recursiva: se llama a sí misma hasta llegar al caso base
def contar(n):
    # CASO BASE: condición que detiene la recursión
    if n == 0:
        print("¡Fin!")
        return          # return sin valor termina la función

    # CASO RECURSIVO: la función se llama con un valor más chico
    print(n)            # imprime el valor actual
    contar(n - 1)       # se llama a sí misma con n-1 (se acerca al caso base)

# Llamada inicial: empieza la recursión
contar(3)
# Salida esperada:
# 3
# 2
# 1
# ¡Fin!`,
    pregunta: '¿Qué ocurre si una función recursiva no tiene caso base?',
    opciones: {
      A: 'La función retorna None automáticamente',
      B: 'Se ejecuta infinitamente hasta llenar la pila de llamadas',
      C: 'Python ignora la recursión y ejecuta solo el caso recursivo una vez',
      D: 'El programa no compila porque falta el caso base',
    },
        correcta: 'B',
    explicacion_correcta:
      'Sin caso base, la recursión nunca termina. Cada llamada consume memoria en la pila hasta que ocurre un desbordamiento (StackOverflow).',
    explicacion_incorrecta:
      'No retorna None automáticamente (B). Python no ignora la recursión (C). Python es interpretado, no hay etapa de compilación que lo detecte (D).',
  },
  {
    id: 15,
    unidad: 'Unidad 2 — Recursividad',
    titulo: 'Factorial y Fibonacci',
    teoria:
      'Factorial (n!) es el producto de todos los enteros desde 1 hasta n. Se define recursivamente como n! = n * (n-1)!, con caso base 0! = 1. Fibonacci es una secuencia donde cada término es la suma de los dos anteriores: fib(n) = fib(n-1) + fib(n-2), con casos base fib(0) = 0 y fib(1) = 1.',
    codigo: `# Factorial recursivo: n! = n * (n-1)!
def factorial(n):
    if n == 0:           # caso base: 0! = 1 (por definición matemática)
        return 1
    return n * factorial(n - 1)  # caso recursivo: n * (n-1)! hasta llegar a 0

print(factorial(5))  # 5 * 4 * 3 * 2 * 1 = 120

# Fibonacci recursivo: fib(n) = fib(n-1) + fib(n-2)
def fibonacci(n):
    if n == 0:           # caso base 1: fib(0) = 0
        return 0
    if n == 1:           # caso base 2: fib(1) = 1
        return 1
    # caso recursivo: suma de los dos términos anteriores
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(6))  # 0, 1, 1, 2, 3, 5, 8 → el 6to término (0-index) es 8`,
    pregunta: '¿Cuántas llamadas recursivas hace fibonacci(4)?',
    opciones: {
      A: '2',
      B: '4',
      C: '8',
      D: '1',
    },
        correcta: 'C',
    explicacion_correcta:
      'fib(4) llama a fib(3) y fib(2). fib(3) llama a fib(2) y fib(1), etc. En total se hacen 8 llamadas (contando la inicial).',
    explicacion_incorrecta:
      'Fibonacci sin memoización tiene complejidad exponencial, hace más de 4 (B), 2 (C) o 1 (D) llamadas.',
  },
  {
    id: 16,
    unidad: 'Unidad 2 — Recursividad',
    titulo: 'Torres de Hanoi y búsqueda binaria recursiva',
    teoria:
      'Torres de Hanoi consiste en mover discos de una torre a otra usando una auxiliar, sin colocar un disco grande sobre uno pequeño. La solución recursiva mueve n-1 discos a la auxiliar, mueve el disco más grande, luego mueve n-1 discos de la auxiliar al destino. La búsqueda binaria recursiva divide el arreglo ordenado en mitades, descartando la mitad donde no puede estar el elemento.',
    codigo: `# Torres de Hanoi: mover n discos de origen a destino usando auxiliar
def hanoi(n, origen, destino, auxiliar):
    # Caso base: mover un solo disco (más simple de resolver)
    if n == 1:
        print(f"Mover disco 1 de {origen} a {destino}")
        return
    # Paso 1: mover n-1 discos de origen a auxiliar (usando destino como apoyo)
    hanoi(n-1, origen, auxiliar, destino)
    # Paso 2: mover el disco más grande de origen a destino
    print(f"Mover disco {n} de {origen} a {destino}")
    # Paso 3: mover los n-1 discos de auxiliar a destino (usando origen como apoyo)
    hanoi(n-1, auxiliar, destino, origen)

# Llamada inicial: mover 3 discos de la torre A a la torre C (B es auxiliar)
hanoi(3, "A", "C", "B")

# Búsqueda binaria recursiva: busca un valor en un arreglo ordenado
def busqueda_binaria(arr, objetivo, izquierda, derecha):
    # Caso base: el rango está vacío → el valor no está en el arreglo
    if izquierda > derecha:
        return -1          # -1 significa "no encontrado"
    # Calcular el punto medio del rango actual
    medio = (izquierda + derecha) // 2
    if arr[medio] == objetivo:    # caso base: encontramos el valor
        return medio              # retorna la posición donde está
    if arr[medio] < objetivo:     # el valor está en la mitad derecha
        return busqueda_binaria(arr, objetivo, medio+1, derecha)
    return busqueda_binaria(arr, objetivo, izquierda, medio-1)  # mitad izquierda`,
    pregunta: '¿Cuántos movimientos se requieren para resolver Torres de Hanoi con 3 discos?',
    opciones: {
      A: '6',
      B: '3',
      C: '8',
      D: '7',
    },
        correcta: 'D',
    explicacion_correcta:
      'La fórmula es 2^n - 1. Para 3 discos: 2^3 - 1 = 7 movimientos.',
    explicacion_incorrecta:
      'No son 3 movimientos (B, uno por disco). La fórmula 2^n - 1 da 7, no 8 (C) ni 6 (D).',
  },
  {
    id: 17,
    unidad: 'Unidad 2 — Recursividad',
    titulo: 'Merge Sort y Quick Sort',
    teoria:
      'Merge Sort divide el arreglo en mitades, las ordena recursivamente y luego las fusiona. Tiene complejidad O(n log n) en todos los casos. Quick Sort elige un pivote, particiona el arreglo en elementos menores y mayores al pivote, y ordena recursivamente cada partición. Su complejidad promedio es O(n log n), pero el peor caso es O(n²).',
    codigo: `# Merge Sort: ordena dividiendo en mitades y fusionando
def merge_sort(arr):
    if len(arr) <= 1:   # caso base: un solo elemento ya está ordenado
        return arr
    medio = len(arr) // 2         # punto medio
    izquierda = merge_sort(arr[:medio])   # ordenar recursivamente la mitad izq
    derecha = merge_sort(arr[medio:])     # ordenar recursivamente la mitad der

    # Fusionar las dos mitades ordenadas en una sola lista ordenada
    resultado = []
    i = j = 0                     # índices para recorrer ambas mitades
    while i < len(izquierda) and j < len(derecha):
        if izquierda[i] <= derecha[j]:   # comparar elementos de ambas mitades
            resultado.append(izquierda[i]); i += 1  # tomar de la izquierda
        else:
            resultado.append(derecha[j]); j += 1    # tomar de la derecha
    return resultado + izquierda[i:] + derecha[j:]  # agregar lo que sobra

# Quick Sort: ordena eligiendo un pivote y particionando
def quick_sort(arr):
    if len(arr) <= 1:   # caso base: arreglo vacío o de un elemento
        return arr
    pivote = arr[0]     # elegir el primer elemento como pivote
    # Lista de elementos menores o iguales al pivote
    menores = [x for x in arr[1:] if x <= pivote]
    # Lista de elementos mayores al pivote
    mayores = [x for x in arr[1:] if x > pivote]
    # Ordenar recursivamente cada partición y concatenar con el pivote
    return quick_sort(menores) + [pivote] + quick_sort(mayores)`,
    pregunta: '¿Qué característica distingue a Merge Sort de Quick Sort?',
    opciones: {
      A: 'Merge Sort siempre usa O(n log n) mientras que Quick Sort puede ser O(n²) en el peor caso',
      B: 'Quick Sort siempre es más rápido que Merge Sort',
      C: 'Merge Sort no usa recursión pero Quick Sort sí',
      D: 'Quick Sort requiere memoria adicional O(n) y Merge Sort no',
    },
    correcta: 'A',
    explicacion_correcta:
      'Merge Sort garantiza O(n log n) en todos los casos. Quick Sort tiene promedio O(n log n) pero peor caso O(n²).',
    explicacion_incorrecta:
      'Quick Sort no siempre es más rápido (B). Ambos usan recursión (C). Merge Sort requiere O(n) memoria adicional, Quick Sort puede ser in-place (D).',
  },
  {
    id: 18,
    unidad: 'Unidad 2 — Recursividad',
    titulo: 'Memoización y backtracking',
    teoria:
      'La memoización guarda resultados de llamadas costosas para reutilizarlos, evitando recomputación. Es clave para optimizar algoritmos recursivos como Fibonacci. El backtracking explora todas las soluciones posibles construyendo una solución paso a paso y retrocediendo cuando encuentra que la solución actual no puede completarse. Ejemplos: N-Reinas, laberintos, Sudoku.',
    codigo: `# Fibonacci con memoización: guarda resultados para no recalcular
def fibonacci_memo(n, memo={}):
    # Si ya calculamos este valor, lo devolvemos sin recalcular
    if n in memo:
        return memo[n]
    if n <= 1:         # casos base: fib(0) = 0, fib(1) = 1
        return n
    # Guardar el resultado antes de retornarlo (así se reutiliza después)
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

print(fibonacci_memo(50))  # se calcula al instante gracias a memo

# Backtracking: generar todas las permutaciones de una lista
def permutar(elegidos, restantes):
    # Caso base: no quedan elementos por elegir → mostrar la permutación
    if not restantes:
        print(elegidos)
        return
    # Probar cada elemento restante como siguiente en la permutación
    for i, elem in enumerate(restantes):
        # Elegir "elem" y seguir con los que quedan (excluyendo el actual)
        permutar(elegidos + [elem],
                 restantes[:i] + restantes[i+1:])

permutar([], [1, 2, 3])  # genera: [1,2,3], [1,3,2], [2,1,3], ...`,
    pregunta: '¿Por qué fibonacci_memo(50) es mucho más rápido que fibonacci(50) sin memoización?',
    opciones: {
      A: 'Porque memo evita la recursión y usa un bucle for',
      B: 'Porque memo guarda resultados para no recalcular los mismos subproblemas',
      C: 'Porque memo reduce el caso base de 2 a 1',
      D: 'Porque memo elimina la necesidad de la pila de llamadas',
    },
        correcta: 'B',
    explicacion_correcta:
      'La memoización almacena resultados intermedios en un diccionario. Cada subproblema se calcula una sola vez, reduciendo la complejidad de exponencial a lineal.',
    explicacion_incorrecta:
      'Sigue usando recursión (B). Los casos base no cambian (C). Sigue usando la pila, pero evita recomputación (D).',
  },

  // ===== UNIDAD 3 — Archivos =====
  {
    id: 19,
    unidad: 'Unidad 3 — Archivos',
    titulo: 'Archivos de texto y modos de apertura',
    teoria:
      'Python abre archivos con open(archivo, modo). Los modos principales son: "r" (lectura), "w" (escritura, trunca), "a" (append), "x" (creación exclusiva). Se agrega "+" para lectura/escritura y "b" para modo binario. El bloque with asegura que el archivo se cierre automáticamente, incluso si ocurre una excepción.',
    codigo: `# "w" (write): abre para escritura, borra el contenido si el archivo existe
with open("datos.txt", "w", encoding="utf-8") as f:  # with cierra automáticamente
    f.write("Línea 1\\n")   # write escribe texto en el archivo
    f.write("Línea 2\\n")   # \\n agrega un salto de línea

# "r" (read): abre solo para lectura
with open("datos.txt", "r", encoding="utf-8") as f:
    for linea in f:         # itera sobre cada línea del archivo
        print(linea.strip())  # strip() quita el salto de línea \\n

# "a" (append): agrega contenido al final sin borrar lo existente
with open("datos.txt", "a", encoding="utf-8") as f:
    f.write("Línea 3\\n")

# "w+": lectura + escritura (trunca el archivo primero)
with open("temp.txt", "w+") as f:
    f.write("Hola")         # escribe "Hola" al principio
    f.seek(0)               # seek(0) vuelve al inicio del archivo
    print(f.read())         # read() lee todo el contenido: "Hola"`,
    pregunta: '¿Qué hace el modo "w" al abrir un archivo que ya existe?',
    opciones: {
      A: 'Lanza un error porque el archivo ya existe',
      B: 'Agrega contenido al final del archivo existente',
      C: 'Borra el contenido existente y abre para escritura',
      D: 'Abre el archivo solo para lectura',
    },
        correcta: 'C',
    explicacion_correcta:
      'El modo "w" (write) trunca el archivo: borra todo el contenido existente antes de abrirlo para escritura.',
    explicacion_incorrecta:
      'Append es "a" (B). Creación exclusiva es "x" (C). Lectura es "r" (D).',
  },
  {
    id: 20,
    unidad: 'Unidad 3 — Archivos',
    titulo: 'CSV con reader y DictReader',
    teoria:
      'El módulo csv permite leer y escribir archivos CSV. csv.reader retorna filas como listas. csv.DictReader retorna cada fila como un diccionario usando la primera fila como claves. csv.writer escribe filas como listas, y csv.DictWriter escribe desde diccionarios especificando fieldnames.',
    codigo: `import csv

# Escribir un archivo CSV con filas de datos
# newline="" evita líneas en blanco adicionales en Windows
with open("alumnos.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)                          # crear el escritor CSV
    writer.writerow(["nombre", "edad", "nota"])     # escribir el encabezado
    writer.writerow(["Ana", 20, 8.5])                # escribir una fila
    writer.writerow(["Luis", 22, 7.0])               # escribir otra fila

# Leer el CSV usando DictReader: cada fila es un diccionario
with open("alumnos.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)  # usa la primera fila como nombres de columna
    for fila in reader:         # fila es un dict: {"nombre": "Ana", ...}
        # Acceder a los valores por el nombre de la columna
        print(fila["nombre"], fila["nota"])
# Resultado:
# Ana 8.5
# Luis 7.0`,
    pregunta: '¿Qué ventaja tiene DictReader sobre reader?',
    opciones: {
      A: 'Soporta formatos que no son CSV',
      B: 'Es más rápido que reader',
      C: 'No requiere abrir el archivo con with',
      D: 'Permite acceder a las columnas por nombre en lugar de índice numérico',
    },
        correcta: 'D',
    explicacion_correcta:
      'DictReader usa la primera fila como claves y permite acceder a los valores por nombre de columna, haciendo el código más legible.',
    explicacion_incorrecta:
      'No es más rápido (B). Sí requiere with o cerrar manualmente (C). Solo lee CSV (D).',
  },
  {
    id: 21,
    unidad: 'Unidad 3 — Archivos',
    titulo: 'Pickle y serialización',
    teoria:
      'El módulo pickle serializa objetos de Python a un formato binario para guardarlos en archivos o transmitirlos. pickle.dump() escribe un objeto a un archivo. pickle.load() lo restaura. No es seguro para datos de fuentes no confiables (puede ejecutar código malicioso al deserializar). Para datos simples, JSON es una alternativa más segura e interoperable.',
    codigo: `import pickle

# Objeto complejo de Python: un diccionario con varios tipos de datos
datos = {
    "nombres": ["Ana", "Luis", "Carlos"],  # lista dentro del dict
    "promedio": 7.5,                        # float
    "activo": True                          # booleano
}

# Serializar (guardar): convierte el objeto a binario y lo escribe
# "wb" = write binary (modo binario, necesario para pickle)
with open("datos.pkl", "wb") as f:
    pickle.dump(datos, f)   # dump(objeto, archivo) escribe en formato binario

# Deserializar (cargar): lee el binario y reconstruye el objeto
# "rb" = read binary
with open("datos.pkl", "rb") as f:
    recuperado = pickle.load(f)  # load(archivo) restaura el objeto original

print(recuperado)
# {'nombres': ['Ana', 'Luis', 'Carlos'], 'promedio': 7.5, 'activo': True}`,
    pregunta: '¿Por qué pickle no es recomendado para intercambiar datos entre aplicaciones?',
    opciones: {
      A: 'Porque el formato binario de pickle solo es compatible con Python',
      B: 'Porque pickle no puede serializar diccionarios',
      C: 'Porque pickle es más lento que escribir texto plano',
      D: 'Porque pickle requiere una base de datos para funcionar',
    },
    correcta: 'A',
    explicacion_correcta:
      'Pickle usa un formato específico de Python, por lo que aplicaciones en otros lenguajes no pueden leer los archivos generados.',
    explicacion_incorrecta:
      'Pickle serializa diccionarios sin problema (B). No es especialmente lento comparado con alternativas (C). No requiere BD (D).',
  },
  {
    id: 22,
    unidad: 'Unidad 3 — Archivos',
    titulo: 'Manejo de errores y módulo OS',
    teoria:
      'Las excepciones se manejan con try/except/else/finally. Se pueden capturar excepciones específicas (FileNotFoundError, PermissionError, etc.). El módulo os permite interactuar con el sistema operativo: os.path.exists(), os.mkdir(), os.listdir(), os.remove(). os.path.join() construye rutas de forma segura según el SO.',
    codigo: `import os

# Manejo de errores al leer un archivo que puede no existir
try:
    with open("no_existe.txt", "r") as f:  # intentar abrir el archivo
        contenido = f.read()
except FileNotFoundError:      # capturar el error si el archivo no existe
    print("El archivo no existe")
except PermissionError:        # capturar error si no hay permisos
    print("Sin permisos para leer")
else:                          # se ejecuta solo si NO hubo excepción
    print("Archivo leído correctamente")
finally:                       # se ejecuta SIEMPRE (haya o no error)
    print("Operación finalizada")

# Módulo OS: operaciones con el sistema de archivos
# os.path.join() combina partes de una ruta usando el separador correcto
ruta = os.path.join("carpeta", "subcarpeta", "archivo.txt")
print(ruta)  # "carpeta/subcarpeta/archivo.txt" en Linux

# os.path.exists() verifica si una ruta existe
if not os.path.exists("datos"):  # si la carpeta "datos" no existe
    os.mkdir("datos")            # mkdir la crea
    print("Carpeta creada")`,
    pregunta: '¿Qué hace os.path.join()?',
    opciones: {
      A: 'Verifica si una ruta existe en el sistema de archivos',
      B: 'Combina segmentos de ruta usando el separador correcto del sistema operativo',
      C: 'Crea todas las carpetas necesarias para una ruta',
      D: 'Concatena strings sin modificar los separadores',
    },
        correcta: 'B',
    explicacion_correcta:
      'os.path.join() une segmentos de ruta con el separador apropiado (\\ en Windows, / en Linux/Mac).',
    explicacion_incorrecta:
      'os.path.exists() verifica existencia (B). os.makedirs() crea carpetas (C). No solo concatena, usa separadores correctos (D).',
  },
  {
    id: 23,
    unidad: 'Unidad 3 — Archivos',
    titulo: 'CRUD completo',
    teoria:
      'Un CRUD (Create, Read, Update, Delete) es un conjunto de operaciones básicas sobre datos persistentes. Se implementa combinando operaciones de archivos: CREATE escribe registros nuevos, READ lee y busca, UPDATE modifica registros existentes (generalmente reescribiendo el archivo), DELETE elimina registros (reescribiendo sin ellos). Es la base de aplicaciones con persistencia en archivos.',
    codigo: `# CRUD (Create, Read, Update, Delete) con archivo CSV
import csv

ARCHIVO = "tareas.csv"       # nombre del archivo donde se guardan los datos

# CREATE: agregar una nueva tarea al archivo
def crear(titulo, estado="pendiente"):
    with open(ARCHIVO, "a", newline="") as f:  # "a" = append (agregar)
        w = csv.writer(f)
        w.writerow([titulo, estado])             # escribe una nueva fila

# READ: leer todas las tareas del archivo
def leer():
    try:
        with open(ARCHIVO, "r") as f:
            return list(csv.DictReader(f))  # convierte cada fila en un dict
    except FileNotFoundError:  # si el archivo no existe, devolver lista vacía
        return []

# UPDATE: modificar el estado de una tarea por su título
def actualizar(titulo_buscar, nuevo_estado):
    tareas = leer()                    # 1. leer todas las tareas
    with open(ARCHIVO, "w", newline="") as f:  # 2. reescribir todo
        w = csv.writer(f)
        w.writerow(["titulo", "estado"])  # 3. escribir el encabezado
        for t in tareas:                   # 4. recorrer todas las tareas
            if t["titulo"] == titulo_buscar:  # si es la que buscamos
                w.writerow([t["titulo"], nuevo_estado])  # con el nuevo estado
            else:
                w.writerow([t["titulo"], t["estado"]])    #  mantener igual`,
    pregunta: 'En el método actualizar(), ¿por qué se reescribe todo el archivo en lugar de modificar solo la línea?',
    opciones: {
      A: 'Porque csv.writer no permite escritura selectiva',
      B: 'Porque es más eficiente reescribir todo el archivo',
      C: 'Porque los archivos de texto no permiten modificar una línea sin reescribir todo',
      D: 'Porque el archivo debe ordenarse después de cada actualización',
    },
        correcta: 'C',
    explicacion_correcta:
      'Los archivos de texto no soportan inserción o modificación en medio del archivo. Para cambiar una línea, hay que reescribir el archivo completo.',
    explicacion_incorrecta:
      'No es más eficiente (B). El problema es la naturaleza secuencial del archivo, no una limitación de csv.writer (C). No requiere ordenamiento (D).',
  },

  // ===== UNIDAD 4 — Árboles y Grafos =====
  {
    id: 24,
    unidad: 'Unidad 4 — Árboles y Grafos',
    titulo: 'Terminología de árboles binarios',
    teoria:
      'Un árbol binario es una estructura jerárquica donde cada nodo tiene 0, 1 o 2 hijos (izquierdo y derecho). Términos clave: raíz (nodo superior), hoja (nodo sin hijos), padre, hijo, subárbol, nivel (distancia desde la raíz), altura (máximo nivel). Un árbol binario completo tiene todos los niveles llenos excepto quizás el último.',
    codigo: `# Clase NodoArbol: representa un nodo del árbol binario
class NodoArbol:
    def __init__(self, valor):  # Constructor: se ejecuta al crear cada nodo
        self.valor = valor       # Guarda el dato del nodo
        self.izquierdo = None   # Referencia al hijo izquierdo (vacío al inicio)
        self.derecho = None     # Referencia al hijo derecho (vacío al inicio)

# Construimos el árbol manualmente conectando nodos
#       1          ← raíz (nivel 1)
#      / \
#     2   3        ← nivel 2
#    /
#   4              ← nivel 3 (nodo hoja: sin hijos)

raiz = NodoArbol(1)              # Nodo raíz con valor 1
raiz.izquierdo = NodoArbol(2)   # Hijo izquierdo de la raíz
raiz.derecho = NodoArbol(3)     # Hijo derecho de la raíz
raiz.izquierdo.izquierdo = NodoArbol(4)  # Hijo izquierdo del nodo 2

# Altura del árbol: 3 (niveles: 1, 2, 3)
# Nodos hoja (sin hijos): el nodo 3 y el nodo 4`,
    pregunta: 'En el árbol del código, ¿cuántos nodos hoja tiene?',
    opciones: {
      A: '4',
      B: '3',
      C: '1',
      D: '2',
    },
        correcta: 'D',
    explicacion_correcta:
      'Los nodos hoja son los que no tienen hijos: el nodo 3 (sin hijos) y el nodo 4 (sin hijos). Total: 2.',
    explicacion_incorrecta:
      'El nodo 2 tiene un hijo (4), así que no es hoja. Solo cuentan los que no tienen hijos izquierdo ni derecho.',
  },
  {
    id: 25,
    unidad: 'Unidad 4 — Árboles y Grafos',
    titulo: 'Recorridos: inorden, preorden, postorden, por niveles',
    teoria:
      'Hay 4 recorridos principales: inorden (izquierdo-raíz-derecho, da secuencia ordenada en ABB), preorden (raíz-izquierdo-derecho, útil para copiar árboles), postorden (izquierdo-derecho-raíz, útil para eliminar), y por niveles (BFS, nivel por nivel usando una cola). Cada uno visita los nodos en diferente orden.',
    codigo: `# Recorrido inorden: subárbol izquierdo → raíz → subárbol derecho
def inorden(nodo):
    if nodo:
        inorden(nodo.izquierdo)  # 1. visitar todo el subárbol izquierdo
        print(nodo.valor, end=" ")  # 2. imprimir la raíz
        inorden(nodo.derecho)    # 3. visitar todo el subárbol derecho

# Recorrido preorden: raíz → subárbol izquierdo → subárbol derecho
def preorden(nodo):
    if nodo:
        print(nodo.valor, end=" ")  # 1. imprimir la raíz primero
        preorden(nodo.izquierdo)    # 2. luego el subárbol izquierdo
        preorden(nodo.derecho)      # 3. luego el subárbol derecho

# Recorrido postorden: subárbol izquierdo → subárbol derecho → raíz
def postorden(nodo):
    if nodo:
        postorden(nodo.izquierdo)   # 1. subárbol izquierdo
        postorden(nodo.derecho)     # 2. subárbol derecho
        print(nodo.valor, end=" ")  # 3. raíz al final

# Recorrido por niveles (BFS): nivel por nivel, usando una cola
from collections import deque
def por_niveles(raiz):
    if not raiz:
        return
    cola = deque([raiz])       # cola que empieza con la raíz
    while cola:
        nodo = cola.popleft()  # tomar el primer nodo de la cola (FIFO)
        print(nodo.valor, end=" ")
        if nodo.izquierdo: cola.append(nodo.izquierdo)  # encolar hijo izquierdo
        if nodo.derecho: cola.append(nodo.derecho)      # encolar hijo derecho

# Para el árbol:
#       2
#      / \\
#     1   3
# Resultados de cada recorrido:
# Inorden: 1 2 3     (izquierdo → raíz → derecho)
# Preorden: 2 1 3    (raíz → izquierdo → derecho)
# Postorden: 1 3 2   (izquierdo → derecho → raíz)
# Niveles: 2 1 3     (nivel 1 → nivel 2)`,
    pregunta: 'Para el árbol del código, ¿qué imprime el recorrido por niveles?',
    opciones: {
      A: '1 2 3',
      B: '2 1 3',
      C: '1 3 2',
      D: '2 3 1',
    },
        correcta: 'B',
    explicacion_correcta:
      'El recorrido por niveles (BFS) visita los nodos nivel por nivel de izquierda a derecha. La raíz es 2 (nivel 1), luego 1 y 3 (nivel 2), por eso el resultado es 2 1 3.',
    explicacion_incorrecta:
      '1 2 3 es el recorrido inorden (izquierdo-raíz-derecho), no el recorrido por niveles. El recorrido por niveles usa BFS y empieza siempre por la raíz.',
  },
  {
    id: 26,
    unidad: 'Unidad 4 — Árboles y Grafos',
    titulo: 'ABB: inserción, búsqueda, eliminación',
    teoria:
      'Un ABB (Árbol Binario de Búsqueda) cumple: para cada nodo, todos los valores en su subárbol izquierdo son menores, y todos en el derecho son mayores. Inserción: buscar lugar según comparaciones. Búsqueda: O(h) donde h es altura. Eliminación: 3 casos (hoja, un hijo, dos hijos — se reemplaza por el sucesor inorden).',
    codigo: `# Clase ABB: Árbol Binario de Búsqueda
class ABB:
    def __init__(self):
        self.raiz = None  # el árbol empieza vacío (sin raíz)

    # Inserción recursiva
    def insertar(self, valor):
        # llamar al método auxiliar que recibe el nodo actual
        self.raiz = self._insertar(self.raiz, valor)

    def _insertar(self, nodo, valor):
        if nodo is None:          # llegamos a una posición vacía
            return NodoArbol(valor)  # crear el nuevo nodo aquí
        if valor < nodo.valor:    # si el valor es menor → ir a la izquierda
            nodo.izquierdo = self._insertar(nodo.izquierdo, valor)
        elif valor > nodo.valor:  # si el valor es mayor → ir a la derecha
            nodo.derecho = self._insertar(nodo.derecho, valor)
        return nodo               # devolver el nodo (sin cambios si ya existía)

    # Búsqueda recursiva
    def buscar(self, valor):
        def _buscar(nodo):
            if nodo is None or nodo.valor == valor:  # encontrado o no existe
                return nodo                           # retorna el nodo o None
            if valor < nodo.valor:                   # ir a la izquierda
                return _buscar(nodo.izquierdo)
            return _buscar(nodo.derecho)              # ir a la derecha
        return _buscar(self.raiz)`,
    pregunta: '¿En qué orden deben insertarse los valores para que el ABB tenga altura mínima?',
    opciones: {
      A: 'Insertar en orden decreciente siempre',
      B: 'Insertar en orden creciente siempre',
      C: 'Insertar los valores ordenados de forma que el árbol quede balanceado, ej: mediano primero',
      D: 'El orden de inserción no afecta la altura del ABB',
    },
        correcta: 'C',
    explicacion_correcta:
      'Para altura mínima el árbol debe estar balanceado. Insertar el elemento mediano primero ayuda a que los subárboles izquierdo y derecho tengan tamaño similar.',
    explicacion_incorrecta:
      'Insertar en orden creciente (B) o decreciente (C) crea un árbol degenerado (lista enlazada). El orden sí afecta la altura (D).',
  },
  {
    id: 27,
    unidad: 'Unidad 4 — Árboles y Grafos',
    titulo: 'Grafos: tipos y representaciones',
    teoria:
      'Un grafo es un conjunto de vértices (nodos) conectados por aristas (edges). Tipos: dirigido vs no dirigido, ponderado vs no ponderado. Representaciones: lista de adyacencia (diccionario: vértice -> lista de vecinos) y matriz de adyacencia (tabla booleana n×n). Lista de adyacencia es más eficiente en memoria para grafos dispersos.',
    codigo: `# Grafo no dirigido con lista de adyacencia (diccionario)
# Cada clave es un vértice, su valor es la lista de vecinos conectados
grafo = {
    "A": ["B", "C"],  # A conecta con B y C
    "B": ["A", "D"],  # B conecta con A y D (simétrico: no dirigido)
    "C": ["A", "D"],  # C conecta con A y D
    "D": ["B", "C"]   # D conecta con B y C
}

# Grafo dirigido (digrafo): las conexiones tienen dirección
grafo_dir = {
    "A": ["B"],        # A → B (A apunta a B, pero B no necesariamente a A)
    "B": ["C"],        # B → C
    "C": ["D"],        # C → D
    "D": []            # D no conecta con nadie (vértice terminal)
}

# Grafo ponderado: cada arista tiene un peso (costo, distancia, etc.)
# Cada elemento de la lista es una tupla (vecino, peso)
grafo_pond = {
    "A": [("B", 5), ("C", 3)],   # A → B con peso 5, A → C con peso 3
    "B": [("A", 5), ("D", 2)],   # B → A con peso 5, B → D con peso 2
    "C": [("A", 3), ("D", 1)],   # C → A con peso 3, C → D con peso 1
    "D": [("B", 2), ("C", 1)]    # D → B con peso 2, D → C con peso 1
}`,
    pregunta: '¿Cuándo conviene usar matriz de adyacencia en lugar de lista de adyacencia?',
    opciones: {
      A: 'Cuando se necesita recorrer todos los vecinos de un vértice',
      B: 'Cuando el grafo tiene pocos vértices y muchas aristas',
      C: 'Cuando el grafo es dirigido',
      D: 'Cuando el grafo es denso (muchas aristas) y se necesita consultar rápido si existe una arista',
    },
        correcta: 'D',
    explicacion_correcta:
      'La matriz de adyacencia permite consultar si existe una arista en O(1). Es preferible en grafos densos donde el costo de memoria es aceptable.',
    explicacion_incorrecta:
      'Para grafos con pocos vértices la diferencia es mínima (B). Puede usarse para dirigidos también (C). Para recorrer vecinos, lista es más eficiente (D).',
  },
  {
    id: 28,
    unidad: 'Unidad 4 — Árboles y Grafos',
    titulo: 'BFS y DFS',
    teoria:
      'BFS (Breadth-First Search) explora nivel por nivel usando una cola. Encuentra la ruta más corta en grafos no ponderados. DFS (Depth-First Search) explora en profundidad usando una pila (o recursión). Puede implementarse de forma iterativa (pila explícita) o recursiva. BFS requiere más memoria (cola puede crecer mucho), DFS puede ser más eficiente en memoria.',
    codigo: `from collections import deque

# BFS (Breadth-First Search): explora nivel por nivel usando una cola
def bfs(grafo, inicio):
    visitados = set()            # conjunto para marcar los ya visitados
    cola = deque([inicio])       # cola FIFO con el nodo inicial
    visitados.add(inicio)        # marcar el inicio como visitado
    while cola:
        vertice = cola.popleft()    # tomar el primero de la cola
        print(vertice, end=" ")     # visitar el vértice
        for vecino in grafo[vertice]:  # recorrer todos sus vecinos
            if vecino not in visitados:  # si no fue visitado aún
                visitados.add(vecino)    # marcarlo como visitado
                cola.append(vecino)      # encolarlo para visitar después

# DFS (Depth-First Search): explora en profundidad usando una pila
def dfs_iterativo(grafo, inicio):
    visitados = set()            # conjunto para marcar los ya visitados
    pila = [inicio]              # pila LIFO con el nodo inicial
    while pila:
        vertice = pila.pop()     # tomar el último agregado (LIFO)
        if vertice not in visitados:
            print(vertice, end=" ")  # visitar el vértice
            visitados.add(vertice)   # marcarlo como visitado
            for vecino in grafo[vertice]:
                if vecino not in visitados:
                    pila.append(vecino)  # apilar vecinos para explorar

# Grafo de ejemplo (no dirigido)
g = {
    "A": ["B", "C"],  # A conecta con B y C
    "B": ["D"],       # B conecta con D
    "C": ["E"],       # C conecta con E
    "D": [],          # D sin conexiones
    "E": []           # E sin conexiones
}
# BFS desde A: A B C D E      (explora nivel por nivel)
# DFS desde A: A C E B D      (explora en profundidad, rama por rama)`,
    pregunta: '¿Qué estructura de datos usa BFS para determinar el próximo vértice a visitar?',
    opciones: {
      A: 'Una cola (FIFO)',
      B: 'Una pila (LIFO)',
      C: 'Un conjunto (set)',
      D: 'Un diccionario',
    },
    correcta: 'A',
    explicacion_correcta:
      'BFS usa una cola para procesar los vértices en el orden en que fueron descubiertos (FIFO), garantizando exploración por niveles.',
    explicacion_incorrecta:
      'DFS usa pila (B). El conjunto es para marcar visitados (C). El diccionario representa el grafo, no guía el orden de visita (D).',
  },
];
