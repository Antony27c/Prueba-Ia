export interface PreguntaSimulacro {
  id: number;
  titulo: string;
  tema_titulo: string;
  teoria: string;
  codigo_teoria?: string;
  pregunta_teorica: string;
  respuesta_oficial: string;
  opciones: { A: string; B: string; C: string; D: string };
  correcta: 'A' | 'B' | 'C' | 'D';
  enunciado_practico: string;
  codigo_base: string;
  pistas: string[];
  solucion_codigo: string;
}

export const SIMULACRO: PreguntaSimulacro[] = [
  // ============================================================
  // Ejercicio 1 — TAD
  // ============================================================
  {
    id: 1,
    titulo: 'Ejercicio 1 · TAD · (0,5 pt)',
    tema_titulo: 'Tipos Abstractos de Datos (TAD)',
    teoria:
      'Un TAD (Tipo Abstracto de Datos) es un modelo matemático que define un tipo de dato junto con las operaciones que se pueden realizar sobre él, sin especificar los detalles de implementación. La interfaz describe qué operaciones se pueden realizar (el "qué"), mientras que la implementación define cómo se llevan a cabo esas operaciones (el "cómo"). Esta separación permite cambiar la implementación sin afectar al código que usa el TAD, siempre que la interfaz se mantenga igual. El TAD encapsula los datos y expone solo las operaciones relevantes.',
    codigo_teoria: `# Ejemplo: TAD Pila — solo se ve la interfaz
class Pila:
    def __init__(self):
        self._items = []          # atributo privado

    def push(self, x):            # pública
        self._items.append(x)

    def pop(self):                # pública
        return self._items.pop()

    def peek(self):               # pública
        return self._items[-1]

    def esta_vacia(self):         # pública
        return len(self._items) == 0

# El usuario usa la interfaz, ignora la implementación`,
    pregunta_teorica:
      '¿Qué es un TAD y por qué se dice que separa el QUÉ del CÓMO?',
    opciones: {
      A: 'Es una clase que define atributos privados y públicos, separando datos privados de métodos públicos',
      B: 'Es un modelo que define un tipo de dato y sus operaciones (interfaz = qué, implementación = cómo), permitiendo cambiar la implementación sin afectar al usuario',
      C: 'Es una interfaz gráfica que permite al usuario interactuar con el programa sin conocer el código fuente',
      D: 'Es una técnica de programación que separa el código en archivos .h y .cpp para ocultar la implementación',
    },
    correcta: 'B',
    respuesta_oficial:
      'Un TAD es un modelo matemático que define un tipo de dato junto con las operaciones que se pueden realizar sobre él, ocultando los detalles de implementación. La interfaz define QUÉ operaciones están disponibles, mientras que la implementación define CÓMO se llevan a cabo internamente. Esta separación permite modificar la implementación sin afectar al código que utiliza el TAD.',
    enunciado_practico:
      'Se te da la clase Cola ya implementada. Creá una cola, encolá los números 1, 2 y 3, desencolá uno y mostrá qué número se atendió primero.',
    codigo_base: `from collections import deque

class Cola:
    def __init__(self):
        self._items = deque()

    def encolar(self, x):
        self._items.append(x)

    def desencolar(self):
        return self._items.popleft()

    def frente(self):
        return self._items[0]

    def esta_vacia(self):
        return len(self._items) == 0

# TODO: crear la cola, encolar 1, 2, 3 y desencolar uno mostrando el resultado`,
    pistas: [
      'Recordá que una cola sigue el principio FIFO: el primero en entrar es el primero en salir.',
      'Creá una instancia de Cola con Cola(), usá encolar() tres veces y después desencolar().',
      'El método desencolar() devuelve el elemento que se saca; guardalo en una variable y mostralo con print().',
    ],
    solucion_codigo: `from collections import deque

class Cola:
    def __init__(self):
        self._items = deque()

    def encolar(self, x):
        self._items.append(x)

    def desencolar(self):
        return self._items.popleft()

    def frente(self):
        return self._items[0]

    def esta_vacia(self):
        return len(self._items) == 0

# Creo la cola
mi_cola = Cola()
# Encolo 1, 2, 3
mi_cola.encolar(1)
mi_cola.encolar(2)
mi_cola.encolar(3)
# Desencolo uno (sale el primero: 1)
atendido = mi_cola.desencolar()
# Muestro cuál se atendió primero
print("Se atendió primero:", atendido)  # 1`,
  },

  // ============================================================
  // Ejercicio 2 — Nodo · is vs ==
  // ============================================================
  {
    id: 2,
    titulo: 'Ejercicio 2 · Nodo · (0,5 pt)',
    tema_titulo: 'Nodo — is vs ==',
    teoria:
      'Un nodo es la unidad básica de las estructuras enlazadas. Cada nodo contiene un dato y una referencia al siguiente nodo. En Python, las variables almacenan referencias a objetos en memoria. El operador == compara el contenido (valor) de dos objetos, mientras que is compara la identidad (dirección de memoria). Dos objetos pueden tener el mismo valor (== True) pero ser objetos distintos en memoria (is False). Esto es fundamental al trabajar con nodos: dos nodos pueden contener el mismo dato pero ser nodos diferentes.',
    codigo_teoria: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

a = [1, 2, 3]
b = [1, 2, 3]
c = a

print(a == b)  # True  → mismo valor
print(a is b)  # False → distinto objeto en memoria
print(a is c)  # True  → misma referencia`,
    pregunta_teorica:
      '¿Cuál es la diferencia entre los operadores is y == en Python? ¿Por qué es importante al trabajar con nodos?',
    opciones: {
      A: '== compara el tipo de dato e is compara el valor; al trabajar con nodos conviene usar is para comparar datos',
      B: '== compara si dos variables tienen el mismo valor, e is compara si son el mismo objeto en memoria; al trabajar con nodos usamos == para datos e is para identidad',
      C: '== e is hacen exactamente lo mismo en Python, solo que is es más rápido; se usan indistintamente con nodos',
      D: '== compara la longitud de los objetos e is compara el tipo; con nodos solo se puede usar == porque is no funciona con objetos',
    },
    correcta: 'B',
    respuesta_oficial:
      '== compara si dos objetos tienen el mismo valor (mismo contenido), mientras que is compara si dos variables se refieren al mismo objeto en memoria (misma identidad). Al trabajar con nodos es importante porque dos nodos pueden contener el mismo dato (== True) pero ser nodos distintos (is False). Para saber si dos variables apuntan al mismo nodo se usa is; para comparar datos se usa ==.',
    enunciado_practico:
      'Implementá una clase Nodo con dato y siguiente. Creá dos nodos distintos que contengan el mismo valor numérico (10). Mostrá con print si tienen el mismo valor y si son el mismo objeto.',
    codigo_base: `# TODO: implementá la clase Nodo
# Debe tener __init__ con self.dato y self.siguiente

# TODO: creá dos nodos distintos con dato = 10

# TODO: mostrá si tienen el mismo valor (==)
# TODO: mostrá si son el mismo objeto (is)`,
    pistas: [
      'Un nodo es una clase simple con un constructor que recibe el dato e inicializa siguiente como None.',
      'Para comparar el valor de dos nodos usá nodo1.dato == nodo2.dato. Para comparar si son el mismo objeto usá nodo1 is nodo2.',
      'Creá dos variables distintas: nodo_a = Nodo(10) y nodo_b = Nodo(10). Aunque tengan el mismo dato, son objetos distintos.',
    ],
    solucion_codigo: `# Clase Nodo
class Nodo:
    def __init__(self, dato):
        self.dato = dato          # valor que almacena
        self.siguiente = None     # referencia al próximo

# Creo dos nodos distintos con el mismo dato
nodo_a = Nodo(10)
nodo_b = Nodo(10)

# Comparo valor con ==
print("Mismo valor:", nodo_a.dato == nodo_b.dato)   # True
# Comparo identidad con is
print("Mismo objeto:", nodo_a is nodo_b)             # False
print("¿nodo_a es nodo_a?", nodo_a is nodo_a)        # True`,
  },

  // ============================================================
  // Ejercicio 3 — Lista enlazada vs Lista de Python
  // ============================================================
  {
    id: 3,
    titulo: 'Ejercicio 3 · Lista Enlazada · (0,5 pt)',
    tema_titulo: 'Lista Enlazada vs Lista de Python',
    teoria:
      'Las listas de Python (list) son arreglos dinámicos: ocupan un bloque contiguo de memoria y permiten acceso aleatorio en O(1) por índice. Las listas enlazadas son estructuras donde cada elemento (nodo) contiene un dato y una referencia al siguiente, ocupando posiciones dispersas en memoria. La ventaja principal de la lista enlazada es la inserción y eliminación al inicio en O(1), mientras que en una list de Python cuesta O(n) por tener que desplazar elementos. La desventaja es que no tiene acceso aleatorio: acceder a la posición i requiere recorrer desde el inicio (O(n)).',
    codigo_teoria: `# Inserción al inicio: lista enlazada (O(1)) vs list (O(n))

class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None

    def insertar_al_inicio(self, dato):
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo      # O(1)

# Lista de Python
lista = [10, 20, 30]
lista.insert(0, 5)  # O(n) — desplaza todo`,
    pregunta_teorica:
      '¿Cuál es la ventaja de una lista enlazada sobre una lista de Python al insertar al inicio, y cuál es su desventaja principal?',
    opciones: {
      A: 'Ventaja: inserción al inicio O(1). Desventaja: no tiene acceso aleatorio (O(n) para acceder por índice)',
      B: 'Ventaja: ocupa menos memoria. Desventaja: no se puede recorrer secuencialmente',
      C: 'Ventaja: permite acceso aleatorio O(1). Desventaja: inserción al inicio es O(n)',
      D: 'Ventaja: se ordena sola al insertar. Desventaja: no permite eliminar elementos',
    },
    correcta: 'A',
    respuesta_oficial:
      'La ventaja principal es que la inserción al inicio en una lista enlazada es O(1) (solo crear nodo y ajustar cabeza), mientras que en list de Python es O(n) porque desplaza todos los elementos. La desventaja principal es que no tiene acceso aleatorio: acceder al elemento i requiere recorrer desde la cabeza (O(n)), mientras que list permite acceso O(1) por índice.',
    enunciado_practico:
      'Implementá una función insertar_al_inicio(cabeza, dato) para una lista enlazada simple (sin clase ListaEnlazada, solo usando nodos). La función recibe la cabeza actual y el dato, y devuelve la nueva cabeza.',
    codigo_base: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

# TODO: implementar insertar_al_inicio(cabeza, dato)
# Debe crear un nuevo nodo, enlazarlo con la cabeza actual
# y devolver el nuevo nodo como nueva cabeza

# TODO: crear lista 10 -> 20 -> 30
# TODO: insertar 5 al inicio
# TODO: recorrer y mostrar`,
    pistas: [
      'Una función que trabaja con nodos debe crear un nuevo Nodo(dato) y enlazar su siguiente a la cabeza actual.',
      'La función recibe la cabeza vieja y devuelve la nueva cabeza. El nuevo nodo apunta a la cabeza vieja.',
      'Primero creá Nodo(dato), luego hacé nuevo.siguiente = cabeza, y finalmente devolvé nuevo.',
    ],
    solucion_codigo: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

def insertar_al_inicio(cabeza, dato):
    nuevo = Nodo(dato)          # creo el nuevo nodo
    nuevo.siguiente = cabeza    # enlazo con la lista existente
    return nuevo                # nueva cabeza

# Creo lista: 10 -> 20 -> 30
cabeza = Nodo(10)
cabeza.siguiente = Nodo(20)
cabeza.siguiente.siguiente = Nodo(30)

# Inserto 5 al inicio
cabeza = insertar_al_inicio(cabeza, 5)

# Recorro y muestro
actual = cabeza
while actual:
    print(actual.dato, end=" -> ")
    actual = actual.siguiente
print("None")  # 5 -> 10 -> 20 -> 30 -> None`,
  },

  // ============================================================
  // Ejercicio 4 — Pila y Cola (LIFO / FIFO)
  // ============================================================
  {
    id: 4,
    titulo: 'Ejercicio 4 · Pila y Cola · (0,5 pt)',
    tema_titulo: 'Pila (LIFO) y Cola (FIFO)',
    teoria:
      'Una pila (stack) sigue el principio LIFO (Last In, First Out): el último elemento en entrar es el primero en salir. Las operaciones son push (apilar) y pop (desapilar). Ejemplo: pila de platos, botón "atrás" del navegador. Una cola (queue) sigue el principio FIFO (First In, First Out): el primer elemento en entrar es el primero en salir. Las operaciones son encolar y desencolar. Ejemplo: fila del banco. La diferencia fundamental es el orden de salida: en la pila sale el último, en la cola sale el primero.',
    codigo_teoria: `# PILA (LIFO) con lista
pila = []
pila.append("a")     # push
pila.append("b")
print(pila.pop())    # "b" — sale el último

# COLA (FIFO) con deque
from collections import deque
cola = deque()
cola.append("a")     # encolar
cola.append("b")
print(cola.popleft())  # "a" — sale el primero`,
    pregunta_teorica:
      'Explicá la diferencia fundamental entre una pila y una cola. Mencioná un ejemplo de uso de cada una.',
    opciones: {
      A: 'La pila es FIFO (sale el primero) y la cola es LIFO (sale el último); se usan igual en cualquier algoritmo',
      B: 'La pila usa listas y la cola usa arreglos; la pila se usa en navegadores y la cola en impresoras',
      C: 'La pila es LIFO (último en entrar, primero en salir) y la cola es FIFO (primero en entrar, primero en salir); la pila se usa en el call stack y la cola en BFS',
      D: 'No hay diferencia, ambas almacenan elementos en el orden en que se agregan y se sacan igual',
    },
    correcta: 'C',
    respuesta_oficial:
      'La pila sigue el principio LIFO (último en entrar, primero en salir). Ejemplos: pila de platos, botón "atrás" del navegador, call stack de funciones, DFS. La cola sigue el principio FIFO (primero en entrar, primero en salir). Ejemplos: fila del banco, cola de impresión, BFS.',
    enunciado_practico:
      'Usando una lista de Python como pila, implementá una función que reciba una cadena de paréntesis y determine si están balanceados. Ej: "(())" está balanceado, "(()" no.',
    codigo_base: `# TODO: implementar esta_balanceada(cadena)
# Usá una pila (lista) para rastrear paréntesis
# '(' → push, ')' → pop
# Al final, si la pila está vacía está balanceado
def esta_balanceada(cadena):
    pass

print(esta_balanceada("(())"))   # True
print(esta_balanceada("(()"))    # False
print(esta_balanceada(")("))     # False`,
    pistas: [
      'Una pila en Python es simplemente una lista. Para simular push usá append(), para pop usá pop().',
      'Cuando veas un (, agregalo a la pila. Cuando veas un ), sacá uno de la pila. Si intentás sacar de una pila vacía, hay un desbalance.',
      'Al final, si la pila quedó vacía significa que cada ( tuvo su ) correspondiente. Si quedaron elementos, hay ( sin cerrar.',
    ],
    solucion_codigo: `def esta_balanceada(cadena):
    pila = []                     # pila vacía
    for c in cadena:
        if c == '(':
            pila.append(c)        # push: apilo el paréntesis
        elif c == ')':
            if not pila:           # no hay ( para cerrar
                return False
            pila.pop()            # pop: cierro el paréntesis
    return len(pila) == 0         # vacía = balanceado

print(esta_balanceada("(())"))   # True
print(esta_balanceada("(()"))    # False
print(esta_balanceada(")("))     # False`,
  },

  // ============================================================
  // Ejercicio 5 — Tres requisitos de la recursividad
  // ============================================================
  {
    id: 5,
    titulo: 'Ejercicio 5 · Requisitos de la Recursividad · (0,5 pt)',
    tema_titulo: 'Requisitos de Toda Función Recursiva',
    teoria:
      'Toda función recursiva debe cumplir tres requisitos: (1) Tener al menos un caso base que detenga la recursión sin llamarse a sí misma. (2) Realizar una llamada recursiva que se acerque al caso base en cada paso (reducción del problema). (3) Asegurarse de que el caso base siempre se alcance (terminación garantizada). Sin caso base, la función se llama infinitamente hasta producir RecursionError. Sin la reducción, nunca se llega al caso base.',
    codigo_teoria: `# Función recursiva que cumple los 3 requisitos
def cuenta_regresiva(n):
    # 1. CASO BASE
    if n == 0:
        print("¡Fin!")
        return
    # 2. LLAMADA RECURSIVA (se acerca al caso base)
    print(n)
    cuenta_regresiva(n - 1)  # n-1 se acerca a 0
    # 3. TERMINACIÓN GARANTIZADA: n decrece hasta llegar a 0`,
    pregunta_teorica:
      '¿Cuáles son los tres requisitos que debe cumplir toda función recursiva? Explicá cada uno.',
    opciones: {
      A: 'Caso base, llamada recursiva y retorno de valor numérico; si falta alguno la función no compila',
      B: 'Caso base, llamada recursiva que reduzca el problema acercándose al caso base, y terminación garantizada; si falta el caso base se produce stack overflow',
      C: 'Caso base, iteración y condición de corte; si falta la iteración la función es infinita',
      D: 'Parámetro entero, caso base y retorno booleano; si falta el retorno la función no devuelve nada',
    },
    correcta: 'B',
    respuesta_oficial:
      'Los tres requisitos son: (1) Caso base: condición que detiene la recursión. Si no existe, se produce stack overflow. (2) Llamada recursiva que reduzca el problema: cada llamada debe acercarse al caso base. Si no se reduce, nunca se alcanza. (3) Terminación garantizada: debe asegurarse que el caso base siempre se alcance para todas las entradas válidas.',
    enunciado_practico:
      'Implementá una función recursiva suma_recursiva(n) que devuelva la suma de 1 hasta n. Identificá en tu código el caso base y la llamada recursiva.',
    codigo_base: `# TODO: implementar suma_recursiva(n)
# Devuelve 1 + 2 + ... + n (n >= 1)
def suma_recursiva(n):
    pass

print(suma_recursiva(5))   # 15
print(suma_recursiva(10))  # 55`,
    pistas: [
      'Pensá en el problema más chico: si n es 1, la suma de 1 hasta 1 es 1. Ese es tu caso base.',
      'La suma de 1 hasta n se puede expresar como n + suma de 1 hasta (n-1). Esa es la llamada recursiva.',
      'El caso base es if n == 1: return 1. La llamada recursiva es return n + suma_recursiva(n-1).',
    ],
    solucion_codigo: `def suma_recursiva(n):
    # Caso base: si n es 1, la suma es 1
    if n == 1:
        return 1
    # Llamada recursiva: n + suma de (n-1)
    # Se acerca al caso base porque n decrece hasta 1
    return n + suma_recursiva(n - 1)

print(suma_recursiva(5))   # 15 = 5+4+3+2+1
print(suma_recursiva(10))  # 55`,
  },

  // ============================================================
  // Ejercicio 6 — Recursividad vs Iteración + Fibonacci
  // ============================================================
  {
    id: 6,
    titulo: 'Ejercicio 6 · Recursividad vs Iteración · (0,5 pt)',
    tema_titulo: 'Recursividad vs Iteración y Fibonacci',
    teoria:
      'Tanto la recursividad como la iteración permiten resolver problemas repetitivos. La recursividad ofrece código más expresivo y cercano a la definición matemática, ideal para árboles y divide and conquer. Sin embargo, consume más memoria (cada llamada apila un frame) y puede ser más lenta. La iteración es más eficiente en memoria y velocidad. La implementación naive de Fibonacci es exponencial O(2^n) porque recalcula los mismos subproblemas. La memoización (programación dinámica) almacena resultados ya calculados, reduciendo a O(n).',
    codigo_teoria: `# Factorial: iterativo vs recursivo
def factorial_iter(n):       # O(n), eficiente
    r = 1
    for i in range(2, n+1):
        r *= i
    return r

def factorial_rec(n):        # expresivo pero usa pila
    if n <= 1:
        return 1
    return n * factorial_rec(n-1)

# Fibonacci naive O(2^n) — recalcula todo
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n-1) + fib_naive(n-2)

# Fibonacci con memoización O(n)
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]`,
    pregunta_teorica:
      'Compará recursividad e iteración. ¿Por qué Fibonacci naive es ineficiente y cómo se optimiza?',
    opciones: {
      A: 'La recursividad es siempre más rápida que la iteración. Fibonacci naive es O(n) y no necesita optimización',
      B: 'La iteración es más expresiva y la recursividad más eficiente en memoria. Fibonacci naive es O(log n)',
      C: 'La recursividad es más expresiva pero consume más memoria. Fibonacci naive es O(2^n) porque recalcula subproblemas; se optimiza con memoización (O(n))',
      D: 'Ambas son equivalentes en memoria y velocidad. Fibonacci naive es O(n²) y se optimiza con iteración',
    },
    correcta: 'C',
    respuesta_oficial:
      'La recursividad ofrece código más expresivo (ventaja) pero consume más memoria por la pila de llamadas y puede ser más lenta (desventaja). Fibonacci naive es O(2^n) porque cada llamada genera dos llamadas recursivas que recalcular los mismos valores. Se optimiza con memoización: guardar resultados ya calculados en un diccionario para reutilizarlos, reduciendo a O(n).',
    enunciado_practico:
      'Implementá la función fib(n) con memoización usando un diccionario. Probala con n=40 y n=100.',
    codigo_base: `# TODO: implementar fib_memo(n, memo=None)
# Usá un dict como memo, donde las claves son n
def fib_memo(n, memo=None):
    pass

print(fib_memo(40))   # 102334155
print(fib_memo(100))  # 354224848179261915075`,
    pistas: [
      'La memoización guarda resultados ya calculados. Si n está en memo, devolvelo directamente sin recalcular.',
      'El diccionario memo debe ser compartido entre llamadas. Inicializalo como None y crealo vacío si es None en la primera llamada.',
      'Estructura: if n in memo: return memo[n]; if n <= 1: return n; memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo); return memo[n]',
    ],
    solucion_codigo: `def fib_memo(n, memo=None):
    if memo is None:
        memo = {}               # dict vacío en la primera llamada
    if n in memo:
        return memo[n]          # ya calculado, lo devuelvo
    if n <= 1:
        return n                # caso base: fib(0)=0, fib(1)=1
    # Calculo y guardo antes de devolver
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]

print(fib_memo(40))   # 102334155 (instantáneo)
print(fib_memo(100))  # 354224848179261915075 (instantáneo)`,
  },

  // ============================================================
  // Ejercicio 7 — Caso base
  // ============================================================
  {
    id: 7,
    titulo: 'Ejercicio 7 · Caso Base · (0,5 pt)',
    tema_titulo: 'Caso Base en Recursividad',
    teoria:
      'El caso base es la condición que detiene las llamadas recursivas. Sin caso base, la función recursiva se llama infinitamente hasta desbordar la pila (stack overflow), produciendo RecursionError en Python. El caso base debe cubrir la entrada más pequeña o trivial del problema. Puede haber múltiples casos base (ej: fibonacci tiene n=0 y n=1). Cada llamada recursiva debe acercarse al caso base, y debe garantizarse que siempre se alcance.',
    codigo_teoria: `# SIN caso base → RecursionError
def infinita(n):
    return infinita(n - 1)  # nunca se detiene

# CON caso base
def cuenta_regresiva(n):
    if n == 0:          # ← caso base
        print("¡Fin!")
        return
    print(n)
    cuenta_regresiva(n - 1)`,
    pregunta_teorica:
      '¿Qué es el caso base en una función recursiva? ¿Qué sucede si no existe? ¿Puede haber más de uno?',
    opciones: {
      A: 'Es la llamada recursiva que reduce el problema; si no existe la función nunca termina; solo puede haber uno',
      B: 'Es la condición que detiene la recursión; si no existe se produce stack overflow; puede haber múltiples casos base',
      C: 'Es el valor que retorna la función; si no existe retorna None; siempre debe ser exactamente uno',
      D: 'Es el parámetro que recibe la función; si no existe no compila; puede haber hasta dos casos base',
    },
    correcta: 'B',
    respuesta_oficial:
      'El caso base es la condición que detiene la recursión, donde la función no se llama a sí misma y devuelve un resultado directo. Si no existe, la función se llama infinitamente hasta producir RecursionError (stack overflow). Puede haber múltiples casos base, como en fibonacci (n=0 y n=1). El caso base debe cubrir las entradas más pequeñas o triviales del problema.',
    enunciado_practico:
      'Implementá una función recursiva contar_pares(lista) que reciba una lista de enteros y devuelva la cantidad de números pares. Identificá el/los casos base.',
    codigo_base: `# TODO: implementar contar_pares(lista)
# Usá recursividad: procesá lista[0] y llamá con lista[1:]
def contar_pares(lista):
    pass

print(contar_pares([1, 2, 3, 4, 5, 6]))  # 3
print(contar_pares([7, 9, 11]))           # 0
print(contar_pares([]))                   # 0`,
    pistas: [
      'Pensá en el caso más simple: una lista vacía tiene 0 pares. Ese es tu caso base.',
      'Si la lista no está vacía, verificá si el primer elemento (lista[0]) es par. Si lo es, sumá 1; si no, sumá 0. Luego llamá recursivamente con el resto (lista[1:]).',
      'Un número es par si número % 2 == 0. Usá 1 if lista[0] % 2 == 0 else 0 para el primer elemento.',
    ],
    solucion_codigo: `def contar_pares(lista):
    # Caso base: lista vacía tiene 0 pares
    if not lista:
        return 0
    # Primer elemento: 1 si es par, 0 si no
    es_par = 1 if lista[0] % 2 == 0 else 0
    # Llamada recursiva con el resto de la lista
    return es_par + contar_pares(lista[1:])

print(contar_pares([1, 2, 3, 4, 5, 6]))  # 3
print(contar_pares([7, 9, 11]))           # 0
print(contar_pares([]))                   # 0`,
  },

  // ============================================================
  // Ejercicio 8 — with y modos de apertura
  // ============================================================
  {
    id: 8,
    titulo: 'Ejercicio 8 · with y Modos de Apertura · (0,5 pt)',
    tema_titulo: 'Manejo de Archivos — with y Modos',
    teoria:
      'La sentencia with (context manager) asegura que el archivo se cierre automáticamente al salir del bloque, incluso si ocurre una excepción. Sin with, hay que llamar manualmente a close(). Los modos de apertura: "r" (lectura, el archivo debe existir), "w" (escritura, sobrescribe el contenido), "a" (append, agrega al final conservando lo existente), "r+" (lectura y escritura). La diferencia entre "w" y "a" es clave: "w" borra el contenido previo, "a" lo conserva y agrega al final.',
    codigo_teoria: `# Con with: cierre automático
with open("datos.txt", "r") as f:
    contenido = f.read()
# f.close() automático al salir del bloque

# Sin with: cierre manual (riesgo de olvido)
f = open("datos.txt", "r")
contenido = f.read()
f.close()  # si olvido, el archivo queda abierto

# Modo "w": sobrescribe
with open("ej.txt", "w") as f:
    f.write("Nuevo contenido")
# El contenido anterior se perdió

# Modo "a": agrega al final
with open("ej.txt", "a") as f:
    f.write("Más contenido al final")`,
    pregunta_teorica:
      '¿Para qué sirve la sentencia with al abrir archivos? Explicá la diferencia entre los modos "r", "w" y "a".',
    opciones: {
      A: 'with evita que el archivo se cierre; "r" lee, "w" escribe al final y "a" sobrescribe',
      B: 'with asegura el cierre automático del archivo; "r" es solo lectura, "w" sobrescribe el contenido, "a" agrega al final conservando lo existente',
      C: 'with permite leer y escribir a la vez; "r" escribe, "w" lee y "a" agrega al principio',
      D: 'with acelera la lectura; "r" abre en binario, "w" en texto y "a" en append binario',
    },
    correcta: 'B',
    respuesta_oficial:
      'with asegura que el archivo se cierre automáticamente al salir del bloque, incluso si hay excepciones. "r" (read) abre solo lectura, el archivo debe existir. "w" (write) abre para escritura sobrescribiendo el contenido si existe o creando el archivo si no. "a" (append) abre para escritura al final, conservando el contenido existente y creando el archivo si no existe.',
    enunciado_practico:
      'Escribí un programa que: (1) cree un archivo "notas.txt" en modo "w" y escriba "Estudio Python\\n", (2) lo abra en modo "a" y agregue "Segunda línea\\n", (3) lo lea en modo "r" y muestre el contenido.',
    codigo_base: `# TODO: crear "notas.txt" con "w" y escribir "Estudio Python\\n"

# TODO: abrir en "a" y agregar "Segunda línea\\n"

# TODO: abrir en "r" y mostrar el contenido completo`,
    pistas: [
      'Usá tres bloques with separados, cada uno con su modo de apertura.',
      'El primer with usa "w" (crea y escribe), el segundo usa "a" (agrega al final), el tercero usa "r" (lee todo).',
      'Para leer todo el contenido usá f.read() dentro del with y mostralo con print().',
    ],
    solucion_codigo: `# 1. Crear y escribir (modo "w" — sobrescribe)
with open("notas.txt", "w") as f:
    f.write("Estudio Python\\n")

# 2. Agregar (modo "a" — conserva y agrega al final)
with open("notas.txt", "a") as f:
    f.write("Segunda línea\\n")

# 3. Leer y mostrar (modo "r" — solo lectura)
with open("notas.txt", "r") as f:
    contenido = f.read()
    print(contenido)
# Estudio Python
# Segunda línea`,
  },

  // ============================================================
  // Ejercicio 9 — try/except/finally
  // ============================================================
  {
    id: 9,
    titulo: 'Ejercicio 9 · try/except/finally · (0,5 pt)',
    tema_titulo: 'Manejo de Excepciones — try/except/finally',
    teoria:
      'try/except permite manejar errores en tiempo de ejecución sin que el programa se detenga. El try contiene código que podría fallar, y except captura la excepción específica. Se pueden encadenar varios except para distintos tipos de error. El bloque finally se ejecuta siempre (haya o no excepción), incluso si hay un return. Se usa para tareas de limpieza como cerrar archivos o liberar recursos. Excepciones comunes: FileNotFoundError (archivo no existe), PermissionError (sin permisos), ValueError (dato inválido).',
    codigo_teoria: `# Manejo de excepciones en archivos
try:
    with open("datos.txt", "r") as f:
        contenido = f.read()
        numero = int(contenido)
except FileNotFoundError:
    print("El archivo no existe")
except ValueError:
    print("El contenido no es un número")
except Exception as e:
    print(f"Error: {e}")

# finally siempre se ejecuta
try:
    print(1 / 0)  # ZeroDivisionError
except ZeroDivisionError:
    print("No se puede dividir por cero")
finally:
    print("Esto se imprime siempre")`,
    pregunta_teorica:
      'Explicá para qué sirven try/except y finally. Mencioná dos excepciones comunes al trabajar con archivos.',
    opciones: {
      A: 'try ejecuta código seguro, except captura errores de sintaxis; finally se ejecuta solo si hay error; excepciones: TypeError y KeyError',
      B: 'try contiene código que puede fallar, except captura y maneja la excepción sin detener el programa; finally se ejecuta siempre; excepciones comunes: FileNotFoundError y PermissionError',
      C: 'try abre archivos, except los cierra; finally los lee; excepciones: FileExistsError y IsADirectoryError',
      D: 'try define variables, except las modifica; finally las elimina; excepciones: IndexError y KeyError',
    },
    correcta: 'B',
    respuesta_oficial:
      'try/except permite manejar errores en tiempo de ejecución sin detener el programa. El código propenso a errores va en try, y si ocurre una excepción, se ejecuta el except correspondiente. finally se ejecuta siempre (haya o no excepción), usado para limpiar recursos (cerrar archivos, liberar conexiones). Excepciones comunes al trabajar con archivos: FileNotFoundError (archivo no encontrado) y PermissionError (permisos insuficientes).',
    enunciado_practico:
      'Escribí un programa que pida al usuario un nombre de archivo, intente abrirlo y leer su contenido. Si el archivo no existe, mostrá un mensaje amigable. Si ocurre otro error, mostrá el tipo de error. Usá finally para mostrar "Operación finalizada".',
    codigo_base: `# TODO: pedir nombre de archivo al usuario (input)
# TODO: try → abrir con "r" y mostrar contenido
# TODO: except FileNotFoundError → mensaje amigable
# TODO: except Exception → mostrar tipo de error
# TODO: finally → mostrar "Operación finalizada"
nombre = input("Ingresá el nombre del archivo: ")`,
    pistas: [
      'Usá try: para el bloque que puede fallar, con open() dentro.', 
      'Capturá primero FileNotFoundError (específico), después Exception (genérico para cualquier otro error).',
      'finally se ejecuta siempre, incluso si hay error. Poné print("Operación finalizada") ahí.',
    ],
    solucion_codigo: `nombre = input("Ingresá el nombre del archivo: ")

try:
    with open(nombre, "r") as f:
        print(f.read())
except FileNotFoundError:
    print(f"El archivo '{nombre}' no existe.")
except Exception as e:
    print(f"Error: {type(e).__name__} — {e}")
finally:
    print("Operación finalizada")`,
  },

  // ============================================================
  // Ejercicio 10 — Árbol binario + ABB
  // ============================================================
  {
    id: 10,
    titulo: 'Ejercicio 10 · Árbol Binario y ABB · (0,5 pt)',
    tema_titulo: 'Árbol Binario y Árbol Binario de Búsqueda (ABB)',
    teoria:
      'Un árbol binario es una estructura jerárquica donde cada nodo tiene como máximo dos hijos: izquierdo y derecho. Los recorridos principales son: Inorden (I → R → D, orden ascendente en ABB), Preorden (R → I → D, útil para copiar) y Postorden (I → D → R, útil para eliminar). Un ABB es un árbol binario con la propiedad adicional de que para cada nodo, todos los valores del subárbol izquierdo son menores y todos los del derecho son mayores. Esto permite búsqueda eficiente O(log n) en promedio.',
    codigo_teoria: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

# Inorden: I → R → D
def inorden(nodo):
    if nodo is None:
        return
    inorden(nodo.izquierdo)
    print(nodo.valor, end=" ")
    inorden(nodo.derecho)

# Inserción en ABB
def insertar_abb(raiz, valor):
    if raiz is None:
        return NodoArbol(valor)
    if valor < raiz.valor:
        raiz.izquierdo = insertar_abb(raiz.izquierdo, valor)
    else:
        raiz.derecho = insertar_abb(raiz.derecho, valor)
    return raiz`,
    pregunta_teorica:
      'Explicá los tres recorridos de un árbol binario (inorden, preorden, postorden). ¿Qué propiedad tiene un ABB y cuál es su ventaja?',
    opciones: {
      A: 'Inorden: R→I→D, Preorden: I→R→D, Postorden: I→D→R. ABB: los hijos son mayores que la raíz. Ventaja: ocupa menos memoria',
      B: 'Inorden: I→R→D (orden ascendente), Preorden: R→I→D (copiar), Postorden: I→D→R (eliminar). ABB: izquierdo < raíz < derecho. Ventaja: búsqueda O(log n)',
      C: 'Inorden: I→D→R, Preorden: D→R→I, Postorden: R→I→D. ABB: la raíz es el valor máximo. Ventaja: inserción O(1)',
      D: 'Los tres recorridos visitan los nodos en el mismo orden. ABB: no tiene propiedad especial. Ventaja: siempre está balanceado',
    },
    correcta: 'B',
    respuesta_oficial:
      'Inorden: izquierdo → raíz → derecho (recorre en orden ascendente). Preorden: raíz → izquierdo → derecho (útil para copiar el árbol). Postorden: izquierdo → derecho → raíz (útil para eliminar el árbol). Un ABB cumple que para cada nodo, todos los valores del subárbol izquierdo son menores y todos los del derecho son mayores. Su ventaja principal es la búsqueda eficiente en O(log n) promedio.',
    enunciado_practico:
      'Implementá la función insertar_en_abb(raiz, valor) que inserte en un ABB manteniendo la propiedad. Insertá [5, 3, 7, 2, 4, 6, 8] y mostrá el recorrido inorden.',
    codigo_base: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

def inorden(nodo):
    if nodo is None:
        return
    inorden(nodo.izquierdo)
    print(nodo.valor, end=" ")
    inorden(nodo.derecho)

# TODO: implementar insertar_en_abb(raiz, valor)

# TODO: insertar [5, 3, 7, 2, 4, 6, 8] y mostrar inorden`,
    pistas: [
      'La inserción en ABB es recursiva: si la raíz es None, devolvé un nuevo NodoArbol(valor).',
      'Si valor < raiz.valor, insertá a la izquierda con raiz.izquierdo = insertar_en_abb(raiz.izquierdo, valor).',
      'Si valor >= raiz.valor, insertá a la derecha con raiz.derecho = insertar_en_abb(raiz.derecho, valor). Siempre devolvé la raíz.',
    ],
    solucion_codigo: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

def inorden(nodo):
    if nodo is None:
        return
    inorden(nodo.izquierdo)
    print(nodo.valor, end=" ")
    inorden(nodo.derecho)

def insertar_en_abb(raiz, valor):
    if raiz is None:
        return NodoArbol(valor)      # árbol vacío: creo raíz
    if valor < raiz.valor:
        raiz.izquierdo = insertar_en_abb(raiz.izquierdo, valor)
    else:
        raiz.derecho = insertar_en_abb(raiz.derecho, valor)
    return raiz

# Inserto los valores
raiz = None
for v in [5, 3, 7, 2, 4, 6, 8]:
    raiz = insertar_en_abb(raiz, v)

# Inorden: orden ascendente
print("Inorden:", end=" ")
inorden(raiz)  # 2 3 4 5 6 7 8`,
  },

  // ============================================================
  // Ejercicio 11 — Grafos
  // ============================================================
  {
    id: 11,
    titulo: 'Ejercicio 11 · Grafos · (0,5 pt)',
    tema_titulo: 'Grafos — Conceptos y Recorridos',
    teoria:
      'Un grafo es una estructura compuesta por vértices y aristas. Puede ser dirigido (las aristas tienen dirección, ej: Twitter) o no dirigido (conexión bidireccional, ej: Facebook). Los recorridos principales son BFS (Breadth-First Search, usa cola FIFO, explora por niveles, encuentra camino más corto) y DFS (Depth-First Search, usa pila LIFO o recursividad, explora en profundidad, útil para backtracking). Las representaciones son matriz de adyacencia (O(N²) memoria, consulta O(1)) y lista de adyacencia (O(N+A) memoria, eficiente en grafos dispersos).',
    codigo_teoria: `from collections import deque

# BFS con cola (FIFO) — explora por niveles
def bfs(grafo, inicio):
    visitados = set()
    cola = deque([inicio])
    while cola:
        nodo = cola.popleft()
        if nodo not in visitados:
            print(nodo, end=" ")
            visitados.add(nodo)
            for v in grafo[nodo]:
                if v not in visitados:
                    cola.append(v)

# DFS con pila (LIFO) — explora en profundidad
def dfs(grafo, inicio):
    visitados = set()
    pila = [inicio]
    while pila:
        nodo = pila.pop()
        if nodo not in visitados:
            print(nodo, end=" ")
            visitados.add(nodo)
            for v in grafo[nodo]:
                if v not in visitados:
                    pila.append(v)

# Grafo no dirigido de ejemplo
grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D", "E"],
    "D": ["B", "C"],
    "E": ["C"],
}`,
    pregunta_teorica:
      'Explicá la diferencia entre un grafo dirigido y uno no dirigido. ¿Qué diferencia hay entre BFS y DFS?',
    opciones: {
      A: 'Dirigido: las aristas tienen dirección. No dirigido: las aristas son bidireccionales. BFS usa pila (LIFO) y DFS usa cola (FIFO)',
      B: 'Dirigido: las aristas son bidireccionales. No dirigido: las aristas tienen dirección. BFS y DFS usan ambas cola',
      C: 'Dirigido: las aristas tienen dirección (A→B ≠ B→A). No dirigido: conexión bidireccional. BFS usa cola (FIFO, explora por niveles), DFS usa pila (LIFO, explora en profundidad)',
      D: 'No hay diferencia entre dirigido y no dirigido. BFS y DFS son el mismo algoritmo con diferente nombre',
    },
    correcta: 'C',
    respuesta_oficial:
      'En un grafo dirigido las aristas tienen dirección (A→B no implica B→A). En un grafo no dirigido las aristas son bidireccionales (A conectado con B implica B conectado con A). BFS (Breadth-First Search) usa una cola FIFO y explora por niveles; es útil para encontrar el camino más corto. DFS (Depth-First Search) usa una pila LIFO o recursividad y explora en profundidad; es útil para backtracking y detección de ciclos.',
    enunciado_practico:
      'Dado el grafo no dirigido A-B, A-C, B-D, C-D, C-E: implementá BFS y DFS desde el nodo A y mostrá el orden de visita de cada uno.',
    codigo_base: `from collections import deque

# Grafo no dirigido
grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D", "E"],
    "D": ["B", "C"],
    "E": ["C"],
}

# TODO: implementar bfs(grafo, inicio)
def bfs(grafo, inicio):
    pass

# TODO: implementar dfs(grafo, inicio)
def dfs(grafo, inicio):
    pass

print("BFS:", end=" "); bfs(grafo, "A")
print()
print("DFS:", end=" "); dfs(grafo, "A")`,
    pistas: [
      'BFS usa una cola (deque) y va sacando del principio con popleft(). DFS usa una pila (lista común) y va sacando del final con pop().',
      'En ambos casos necesitás un conjunto visitados para no procesar el mismo nodo dos veces.',
      'La diferencia está en cómo se extrae el próximo nodo: BFS usa popleft() (FIFO), DFS usa pop() (LIFO).',
    ],
    solucion_codigo: `from collections import deque

grafo = {
    "A": ["B", "C"],
    "B": ["A", "D"],
    "C": ["A", "D", "E"],
    "D": ["B", "C"],
    "E": ["C"],
}

def bfs(grafo, inicio):
    visitados = set()
    cola = deque([inicio])
    while cola:
        nodo = cola.popleft()        # FIFO: saco del principio
        if nodo not in visitados:
            print(nodo, end=" ")
            visitados.add(nodo)
            for vecino in grafo[nodo]:
                if vecino not in visitados:
                    cola.append(vecino)

def dfs(grafo, inicio):
    visitados = set()
    pila = [inicio]
    while pila:
        nodo = pila.pop()            # LIFO: saco del final
        if nodo not in visitados:
            print(nodo, end=" ")
            visitados.add(nodo)
            for vecino in grafo[nodo]:
                if vecino not in visitados:
                    pila.append(vecino)

print("BFS:", end=" "); bfs(grafo, "A")   # A B C D E
print()
print("DFS:", end=" "); dfs(grafo, "A")   # A C E D B`,
  },
];
