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
    codigo: `# Variables y tipos básicos
nombre = "Ana"          # str
edad = 20               # int
altura = 1.75           # float
es_estudiante = True    # bool

# Tipado dinámico
valor = 42             # int
valor = "ahora texto"  # ahora es str

# Type hints (solo documentación)
total: int = 100
print(type(total))      # <class 'int'>`,
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
    codigo: `# f-strings básicos
nombre = "Carlos"
edad = 22
print(f"Me llamo {nombre} y tengo {edad} años")

# Expresiones dentro de f-strings
print(f"El doble de {edad} es {edad * 2}")

# Formato de números
pi = 3.14159265
print(f"Pi con 2 decimales: {pi:.2f}")

# Alineación
print(f"|{'texto':<10}|")  # alineado a izquierda
print(f"|{'texto':>10}|")  # alineado a derecha`,
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
    codigo: `# Operadores
print(10 // 3)   # 3 (división entera)
print(10 % 3)    # 1 (módulo o resto)
print(5 ** 2)    # 25 (potencia)

# Condicionales
nota = 85
if nota >= 90:
    print("Excelente")
elif nota >= 70:
    print("Bueno")
else:
    print("Necesita mejorar")

# Ternario
edad = 17
mensaje = "Mayor" if edad >= 18 else "Menor"`,
    pregunta: '¿Qué retorna la expresión (10 // 3) + (10 % 3)?',
    opciones: {
      A: '4',
      B: '3.33',
      C: '10',
      D: '3',
    },
    correcta: 'A',
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
    codigo: `# Listas y bucles
frutas = ["manzana", "pera", "banana"]
for fruta in frutas:
    print(fruta)

# range()
for i in range(3):
    print(i)  # 0, 1, 2

# while
contador = 0
while contador < 3:
    contador += 1

# Diccionarios
edades = {"Ana": 20, "Luis": 22}
for clave, valor in edades.items():
    print(f"{clave}: {valor}")`,
    pregunta: '¿Cuál es la salida del siguiente código?\n\nfor i in range(3):\n    print(i, end=" ")',
    opciones: {
      A: '0 1 2',
      B: '1 2 3',
      C: '0 1 2 3',
      D: '1 2',
    },
    correcta: 'A',
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
    codigo: `# Función básica
def saludar(nombre):
    return f"Hola {nombre}"

# *args y **kwargs
def sumar_todo(*args):
    return sum(args)

def mostrar_datos(**kwargs):
    for k, v in kwargs.items():
        print(f"{k}: {v}")

sumar_todo(1, 2, 3)       # 6
mostrar_datos(nombre="Ana", edad=20)

# Lambda
cuadrado = lambda x: x ** 2
print(cuadrado(5))  # 25`,
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
    codigo: `class Persona:
    def __init__(self, nombre, edad):
        self.nombre = nombre
        self.edad = edad

    def saludar(self):
        return f"Hola, soy {self.nombre}"

    def __str__(self):
        return f"{self.nombre} ({self.edad} años)"

p = Persona("Ana", 25)
print(p)          # Ana (25 años)
print(p.saludar())  # Hola, soy Ana`,
    pregunta: '¿Qué imprime print(p) si p = Persona("Luis", 30)?',
    opciones: {
      A: 'Luis (30 años)',
      B: '<__main__.Persona object at 0x...>',
      C: '{"nombre": "Luis", "edad": 30}',
      D: 'Error porque falta implementar __str__',
    },
    correcta: 'A',
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
    codigo: `class Animal:
    def __init__(self, nombre):
        self.nombre = nombre

    def hacer_sonido(self):
        pass  # método abstracto simbólico

class Perro(Animal):
    def hacer_sonido(self):
        return "Guau"

class Gato(Animal):
    def hacer_sonido(self):
        return "Miau"

# Polimorfismo
animales = [Perro("Rex"), Gato("Misu")]
for a in animales:
    print(f"{a.nombre} dice {a.hacer_sonido()}")`,
    pregunta: '¿Qué imprime el bucle for del código anterior?',
    opciones: {
      A: 'Rex dice Guau\nMisu dice Miau',
      B: 'Rex dice Miau\nMisu dice Guau',
      C: 'Rex dice None\nMisu dice None',
      D: 'Error porque Animal no tiene implementación en hacer_sonido',
    },
    correcta: 'A',
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
    codigo: `# Interfaz del TAD Pila
class Pila:
    def push(self, elemento): ...
    def pop(self): ...
    def peek(self): ...
    def esta_vacia(self): ...

# Implementación con lista de Python
class PilaConLista(Pila):
    def __init__(self):
        self._elementos = []

    def push(self, elemento):
        self._elementos.append(elemento)

    def pop(self):
        return self._elementos.pop()

    def peek(self):
        return self._elementos[-1]

    def esta_vacia(self):
        return len(self._elementos) == 0`,
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
    codigo: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

# Crear nodos y enlazarlos
nodo1 = Nodo(10)
nodo2 = Nodo(20)
nodo3 = Nodo(30)

nodo1.siguiente = nodo2
nodo2.siguiente = nodo3

# Recorrer la cadena de nodos
actual = nodo1
while actual:
    print(actual.dato, end=" -> ")
    actual = actual.siguiente
# 10 -> 20 -> 30 -> None`,
    pregunta: '¿Qué contiene nodo1.siguiente.siguiente.dato después de enlazar nodo1 -> nodo2 -> nodo3?',
    opciones: {
      A: '30',
      B: '20',
      C: 'None',
      D: 'Error porque no se puede encadenar .siguiente',
    },
    correcta: 'A',
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
    codigo: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None

    def insertar_inicio(self, dato):
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo

    def recorrer(self):
        actual = self.cabeza
        while actual:
            print(actual.dato, end=" -> ")
            actual = actual.siguiente
        print("None")`,
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
    codigo: `class NodoDoble:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None
        self.anterior = None

# Lista circular simple
class ListaCircular:
    def __init__(self):
        self.cabeza = None

    def insertar(self, dato):
        nuevo = Nodo(dato)
        if not self.cabeza:
            self.cabeza = nuevo
            nuevo.siguiente = nuevo  # apunta a sí mismo
        else:
            actual = self.cabeza
            while actual.siguiente != self.cabeza:
                actual = actual.siguiente
            actual.siguiente = nuevo
            nuevo.siguiente = self.cabeza`,
    pregunta: '¿Cuándo termina el while al insertar en una lista circular?',
    opciones: {
      A: 'Cuando actual.siguiente es igual a self.cabeza',
      B: 'Cuando actual.siguiente es None',
      C: 'Cuando actual es None',
      D: 'El while nunca termina porque es circular',
    },
    correcta: 'A',
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
    codigo: `class Pila:
    def __init__(self):
        self._items = []

    def push(self, item):
        self._items.append(item)

    def pop(self):
        if self.esta_vacia():
            raise IndexError("Pila vacía")
        return self._items.pop()

    def peek(self):
        if self.esta_vacia():
            raise IndexError("Pila vacía")
        return self._items[-1]

    def esta_vacia(self):
        return len(self._items) == 0

# Uso
p = Pila()
p.push(10)
p.push(20)
print(p.pop())    # 20
print(p.peek())   # 10`,
    pregunta: '¿Qué imprime el código de uso de la pila?',
    opciones: {
      A: '20\n10',
      B: '10\n20',
      C: '10\n10',
      D: 'Error porque la pila está vacía',
    },
    correcta: 'A',
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
    codigo: `from collections import deque

class Cola:
    def __init__(self):
        self._items = deque()

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        if self.esta_vacia():
            raise IndexError("Cola vacía")
        return self._items.popleft()

    def front(self):
        if self.esta_vacia():
            raise IndexError("Cola vacía")
        return self._items[0]

    def esta_vacia(self):
        return len(self._items) == 0

# Uso
c = Cola()
c.enqueue("a")
c.enqueue("b")
print(c.dequeue())   # a
print(c.front())     # b`,
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
    codigo: `# Estructura general de una función recursiva
def contar(n):
    # Caso base
    if n == 0:
        print("¡Fin!")
        return
    # Caso recursivo
    print(n)
    contar(n - 1)

contar(3)
# Salida:
# 3
# 2
# 1
# ¡Fin!`,
    pregunta: '¿Qué ocurre si una función recursiva no tiene caso base?',
    opciones: {
      A: 'Se ejecuta infinitamente hasta llenar la pila de llamadas',
      B: 'La función retorna None automáticamente',
      C: 'Python ignora la recursión y ejecuta solo el caso recursivo una vez',
      D: 'El programa no compila porque falta el caso base',
    },
    correcta: 'A',
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
    codigo: `# Factorial recursivo
def factorial(n):
    if n == 0:           # caso base
        return 1
    return n * factorial(n - 1)  # caso recursivo

print(factorial(5))  # 120

# Fibonacci recursivo
def fibonacci(n):
    if n == 0:           # caso base 1
        return 0
    if n == 1:           # caso base 2
        return 1
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(6))  # 8`,
    pregunta: '¿Cuántas llamadas recursivas hace fibonacci(4)?',
    opciones: {
      A: '8',
      B: '4',
      C: '2',
      D: '1',
    },
    correcta: 'A',
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
    codigo: `# Torres de Hanoi
def hanoi(n, origen, destino, auxiliar):
    if n == 1:
        print(f"Mover disco 1 de {origen} a {destino}")
        return
    hanoi(n-1, origen, auxiliar, destino)
    print(f"Mover disco {n} de {origen} a {destino}")
    hanoi(n-1, auxiliar, destino, origen)

hanoi(3, "A", "C", "B")

# Búsqueda binaria recursiva
def busqueda_binaria(arr, objetivo, izquierda, derecha):
    if izquierda > derecha:
        return -1
    medio = (izquierda + derecha) // 2
    if arr[medio] == objetivo:
        return medio
    if arr[medio] < objetivo:
        return busqueda_binaria(arr, objetivo, medio+1, derecha)
    return busqueda_binaria(arr, objetivo, izquierda, medio-1)`,
    pregunta: '¿Cuántos movimientos se requieren para resolver Torres de Hanoi con 3 discos?',
    opciones: {
      A: '7',
      B: '3',
      C: '8',
      D: '6',
    },
    correcta: 'A',
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
    codigo: `# Merge Sort
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    medio = len(arr) // 2
    izquierda = merge_sort(arr[:medio])
    derecha = merge_sort(arr[medio:])

    resultado = []
    i = j = 0
    while i < len(izquierda) and j < len(derecha):
        if izquierda[i] <= derecha[j]:
            resultado.append(izquierda[i]); i += 1
        else:
            resultado.append(derecha[j]); j += 1
    return resultado + izquierda[i:] + derecha[j:]

# Quick Sort
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivote = arr[0]
    menores = [x for x in arr[1:] if x <= pivote]
    mayores = [x for x in arr[1:] if x > pivote]
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
    codigo: `# Fibonacci con memoización
def fibonacci_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fibonacci_memo(n-1, memo) + fibonacci_memo(n-2, memo)
    return memo[n]

print(fibonacci_memo(50))  # 12586269025 (rápido)

# Backtracking: generar permutaciones
def permutar(elegidos, restantes):
    if not restantes:
        print(elegidos)
        return
    for i, elem in enumerate(restantes):
        permutar(elegidos + [elem],
                 restantes[:i] + restantes[i+1:])

permutar([], [1, 2, 3])`,
    pregunta: '¿Por qué fibonacci_memo(50) es mucho más rápido que fibonacci(50) sin memoización?',
    opciones: {
      A: 'Porque memo guarda resultados para no recalcular los mismos subproblemas',
      B: 'Porque memo evita la recursión y usa un bucle for',
      C: 'Porque memo reduce el caso base de 2 a 1',
      D: 'Porque memo elimina la necesidad de la pila de llamadas',
    },
    correcta: 'A',
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
    codigo: `# Escritura
with open("datos.txt", "w", encoding="utf-8") as f:
    f.write("Línea 1\\n")
    f.write("Línea 2\\n")

# Lectura línea por línea
with open("datos.txt", "r", encoding="utf-8") as f:
    for linea in f:
        print(linea.strip())

# Append
with open("datos.txt", "a", encoding="utf-8") as f:
    f.write("Línea 3\\n")

# w+ (lectura y escritura, trunca)
with open("temp.txt", "w+") as f:
    f.write("Hola")
    f.seek(0)       # volver al inicio
    print(f.read()) # "Hola"`,
    pregunta: '¿Qué hace el modo "w" al abrir un archivo que ya existe?',
    opciones: {
      A: 'Borra el contenido existente y abre para escritura',
      B: 'Agrega contenido al final del archivo existente',
      C: 'Lanza un error porque el archivo ya existe',
      D: 'Abre el archivo solo para lectura',
    },
    correcta: 'A',
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

# Escribir CSV
with open("alumnos.csv", "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["nombre", "edad", "nota"])
    writer.writerow(["Ana", 20, 8.5])
    writer.writerow(["Luis", 22, 7.0])

# Leer con DictReader
with open("alumnos.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for fila in reader:
        print(fila["nombre"], fila["nota"])
# Ana 8.5
# Luis 7.0`,
    pregunta: '¿Qué ventaja tiene DictReader sobre reader?',
    opciones: {
      A: 'Permite acceder a las columnas por nombre en lugar de índice numérico',
      B: 'Es más rápido que reader',
      C: 'No requiere abrir el archivo con with',
      D: 'Soporta formatos que no son CSV',
    },
    correcta: 'A',
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

# Objeto complejo
datos = {
    "nombres": ["Ana", "Luis", "Carlos"],
    "promedio": 7.5,
    "activo": True
}

# Serializar (guardar)
with open("datos.pkl", "wb") as f:
    pickle.dump(datos, f)

# Deserializar (cargar)
with open("datos.pkl", "rb") as f:
    recuperado = pickle.load(f)

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

# Manejo de errores al leer archivos
try:
    with open("no_existe.txt", "r") as f:
        contenido = f.read()
except FileNotFoundError:
    print("El archivo no existe")
except PermissionError:
    print("Sin permisos para leer")
else:
    print("Archivo leído correctamente")
finally:
    print("Operación finalizada")

# Módulo OS
ruta = os.path.join("carpeta", "subcarpeta", "archivo.txt")
print(ruta)  # carpeta/subcarpeta/archivo.txt (en Linux)

if not os.path.exists("datos"):
    os.mkdir("datos")
    print("Carpeta creada")`,
    pregunta: '¿Qué hace os.path.join()?',
    opciones: {
      A: 'Combina segmentos de ruta usando el separador correcto del sistema operativo',
      B: 'Verifica si una ruta existe en el sistema de archivos',
      C: 'Crea todas las carpetas necesarias para una ruta',
      D: 'Concatena strings sin modificar los separadores',
    },
    correcta: 'A',
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
    codigo: `# CRUD simple con archivo CSV
import csv

ARCHIVO = "tareas.csv"

def crear(titulo, estado="pendiente"):
    with open(ARCHIVO, "a", newline="") as f:
        w = csv.writer(f)
        w.writerow([titulo, estado])

def leer():
    try:
        with open(ARCHIVO, "r") as f:
            return list(csv.DictReader(f))
    except FileNotFoundError:
        return []

def actualizar(titulo_buscar, nuevo_estado):
    tareas = leer()
    with open(ARCHIVO, "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(["titulo", "estado"])
        for t in tareas:
            if t["titulo"] == titulo_buscar:
                w.writerow([t["titulo"], nuevo_estado])
            else:
                w.writerow([t["titulo"], t["estado"]])`,
    pregunta: 'En el método actualizar(), ¿por qué se reescribe todo el archivo en lugar de modificar solo la línea?',
    opciones: {
      A: 'Porque los archivos de texto no permiten modificar una línea sin reescribir todo',
      B: 'Porque es más eficiente reescribir todo el archivo',
      C: 'Porque csv.writer no permite escritura selectiva',
      D: 'Porque el archivo debe ordenarse después de cada actualización',
    },
    correcta: 'A',
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
    codigo: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

# Construir un árbol simple
#       1
#      / \\
#     2   3
#    /
#   4

raiz = NodoArbol(1)
raiz.izquierdo = NodoArbol(2)
raiz.derecho = NodoArbol(3)
raiz.izquierdo.izquierdo = NodoArbol(4)

# Altura: 3 (niveles: 1, 2, 3)
# Nodos hoja: 3 y 4`,
    pregunta: 'En el árbol del código, ¿cuántos nodos hoja tiene?',
    opciones: {
      A: '2',
      B: '3',
      C: '1',
      D: '4',
    },
    correcta: 'A',
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
    codigo: `def inorden(nodo):
    if nodo:
        inorden(nodo.izquierdo)
        print(nodo.valor, end=" ")
        inorden(nodo.derecho)

def preorden(nodo):
    if nodo:
        print(nodo.valor, end=" ")
        preorden(nodo.izquierdo)
        preorden(nodo.derecho)

def postorden(nodo):
    if nodo:
        postorden(nodo.izquierdo)
        postorden(nodo.derecho)
        print(nodo.valor, end=" ")

from collections import deque
def por_niveles(raiz):
    if not raiz:
        return
    cola = deque([raiz])
    while cola:
        nodo = cola.popleft()
        print(nodo.valor, end=" ")
        if nodo.izquierdo: cola.append(nodo.izquierdo)
        if nodo.derecho: cola.append(nodo.derecho)

# Para el árbol:
#       2
#      / \\
#     1   3
# Inorden: 1 2 3
# Preorden: 2 1 3
# Postorden: 1 3 2
# Niveles: 2 1 3`,
    pregunta: 'Para el árbol del código, ¿qué imprime el recorrido por niveles?',
    opciones: {
      A: '2 1 3',
      B: '1 2 3',
      C: '1 3 2',
      D: '2 3 1',
    },
    correcta: 'A',
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
    codigo: `class ABB:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        self.raiz = self._insertar(self.raiz, valor)

    def _insertar(self, nodo, valor):
        if nodo is None:
            return NodoArbol(valor)
        if valor < nodo.valor:
            nodo.izquierdo = self._insertar(nodo.izquierdo, valor)
        elif valor > nodo.valor:
            nodo.derecho = self._insertar(nodo.derecho, valor)
        return nodo

    def buscar(self, valor):
        def _buscar(nodo):
            if nodo is None or nodo.valor == valor:
                return nodo
            if valor < nodo.valor:
                return _buscar(nodo.izquierdo)
            return _buscar(nodo.derecho)
        return _buscar(self.raiz)`,
    pregunta: '¿En qué orden deben insertarse los valores para que el ABB tenga altura mínima?',
    opciones: {
      A: 'Insertar los valores ordenados de forma que el árbol quede balanceado, ej: mediano primero',
      B: 'Insertar en orden creciente siempre',
      C: 'Insertar en orden decreciente siempre',
      D: 'El orden de inserción no afecta la altura del ABB',
    },
    correcta: 'A',
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
    codigo: `# Grafo no dirigido con lista de adyacencia
grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D"],
    "D": ["B", "C"]
}

# Grafo dirigido
grafo_dir = {
    "A": ["B"],
    "B": ["C"],
    "C": ["D"],
    "D": []
}

# Grafo ponderado
grafo_pond = {
    "A": [("B", 5), ("C", 3)],
    "B": [("A", 5), ("D", 2)],
    "C": [("A", 3), ("D", 1)],
    "D": [("B", 2), ("C", 1)]
}`,
    pregunta: '¿Cuándo conviene usar matriz de adyacencia en lugar de lista de adyacencia?',
    opciones: {
      A: 'Cuando el grafo es denso (muchas aristas) y se necesita consultar rápido si existe una arista',
      B: 'Cuando el grafo tiene pocos vértices y muchas aristas',
      C: 'Cuando el grafo es dirigido',
      D: 'Cuando se necesita recorrer todos los vecinos de un vértice',
    },
    correcta: 'A',
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

def bfs(grafo, inicio):
    visitados = set()
    cola = deque([inicio])
    visitados.add(inicio)
    while cola:
        vertice = cola.popleft()
        print(vertice, end=" ")
        for vecino in grafo[vertice]:
            if vecino not in visitados:
                visitados.add(vecino)
                cola.append(vecino)

def dfs_iterativo(grafo, inicio):
    visitados = set()
    pila = [inicio]
    while pila:
        vertice = pila.pop()
        if vertice not in visitados:
            print(vertice, end=" ")
            visitados.add(vertice)
            for vecino in grafo[vertice]:
                if vecino not in visitados:
                    pila.append(vecino)

# Grafo de ejemplo
g = {
    "A": ["B", "C"],
    "B": ["D"],
    "C": ["E"],
    "D": [],
    "E": []
}
# BFS desde A: A B C D E
# DFS desde A: A C E B D`,
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
