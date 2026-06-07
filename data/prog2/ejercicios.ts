export interface Ejercicio {
  id: number;
  tp: string;
  tema: string;
  punto?: number;
  punto_titulo?: string;
  dificultad: "facil" | "intermedio" | "dificil";
  enunciado: string;
  codigo_base?: string;
  pista?: string;
  solucion: string;
}

export const EJERCICIOS: Ejercicio[] = [
  // ===== TP01 — Variables y tipos =====
  {
    id: 1,
    tp: 'TP01',
    tema: 'Variables y tipos',
    dificultad: 'facil',
    enunciado: 'Completá el siguiente programa para que pida el nombre del usuario, su edad, y muestre un mensaje como "Hola Ana, tenés 20 años". Usá input(), f-strings y casting donde sea necesario.',
    codigo_base: `# Completá el programa
nombre = input("Ingresá tu nombre: ")
edad = input("Ingresá tu edad: ")
// ???
// ???
print(// ???)`,
    solucion: `nombre = input("Ingresá tu nombre: ")
edad = input("Ingresá tu edad: ")
edad = int(edad)
print(f"Hola {nombre}, tenés {edad} años")`,
  },
  {
    id: 2,
    tp: 'TP01',
    tema: 'Variables y tipos',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que calcule el consumo eléctrico de un hogar. Pedí al usuario la cantidad de electrodomésticos, y para cada uno: nombre, potencia en watts y horas de uso diario. Mostrá el consumo total diario en kWh y el costo mensual (30 días) si el precio por kWh es $150. Usá funciones para organizar el código.',
    pista: 'Recordá que 1000 watts = 1 kW. Consumo diario = (potencia * horas) / 1000.',
    solucion: `def calcular_consumo_diario(potencia, horas):
    return (potencia * horas) / 1000

def main():
    cantidad = int(input("Cantidad de electrodomésticos: "))
    total_kwh = 0
    for i in range(cantidad):
        nombre = input(f"Nombre {i+1}: ")
        potencia = float(input(f"Potencia de {nombre} (W): "))
        horas = float(input(f"Horas/día de {nombre}: "))
        consumo = calcular_consumo_diario(potencia, horas)
        total_kwh += consumo
        print(f"{nombre}: {consumo:.2f} kWh/día")
    print(f"\\nTotal diario: {total_kwh:.2f} kWh")
    print(f"Total mensual: {total_kwh * 30:.2f} kWh")
    print(f"Costo mensual: \${total_kwh * 30 * 150:.2f}")

main()`,
  },
  {
    id: 3,
    tp: 'TP01',
    tema: 'Variables y tipos',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de liquidación de sueldo que pida: nombre, sueldo básico, cantidad de horas extras y valor por hora extra. Calculá: sueldo bruto (básico + extras), descuento de jubilación (11%), descuento de obra social (3%), descuento de sindicato (2%), y sueldo neto. Mostrá un recibo detallado con todos los valores formateados con dos decimales y alineados.',
    solucion: `def liquidar_sueldo():
    nombre = input("Nombre del empleado: ")
    basico = float(input("Sueldo básico: $"))
    horas_extras = int(input("Horas extras: "))
    valor_extra = float(input("Valor por hora extra: $"))

    extras = horas_extras * valor_extra
    bruto = basico + extras
    jubilacion = bruto * 0.11
    obra_social = bruto * 0.03
    sindicato = bruto * 0.02
    descuentos = jubilacion + obra_social + sindicato
    neto = bruto - descuentos

    print("\\n" + "="*40)
    print(f"RECIBO DE SUELDO - {nombre}")
    print("="*40)
    print(f"Sueldo básico:      \${basico:>8.2f}")
    print(f"Horas extras:       \${extras:>8.2f}")
    print(f"Sueldo bruto:       \${bruto:>8.2f}")
    print(f"Jubilación (11%):   \${jubilacion:>8.2f}")
    print(f"Obra social (3%):   \${obra_social:>8.2f}")
    print(f"Sindicato (2%):     \${sindicato:>8.2f}")
    print(f"Total descuentos:   \${descuentos:>8.2f}")
    print("-"*40)
    print(f"SUELDO NETO:        \${neto:>8.2f}")
    print("="*40)

liquidar_sueldo()`,
  },

  // ===== TP02 — Condicionales =====
  {
    id: 4,
    tp: 'TP02',
    tema: 'Condicionales',
    dificultad: 'facil',
    enunciado: 'Completá el programa para que clasifique un número ingresado por el usuario como "positivo", "negativo" o "cero".',
    codigo_base: `numero = float(input("Ingresá un número: "))
// ???
if // ???:
    print("Positivo")
// ???
    print("Negativo")
// ???
    print("Cero")`,
    solucion: `numero = float(input("Ingresá un número: "))
if numero > 0:
    print("Positivo")
elif numero < 0:
    print("Negativo")
else:
    print("Cero")`,
  },
  {
    id: 5,
    tp: 'TP02',
    tema: 'Condicionales',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que clasifique a una persona según su edad. Pedí el nombre y la edad. Validá que la edad sea un número entero positivo entre 0 y 120. Clasificá como: Bebé (0-2), Niño (3-12), Adolescente (13-17), Adulto (18-65), Adulto Mayor (66-120). Si la edad no está en el rango, mostrá "Edad no válida".',
    pista: 'Usá un if anidado o varias condiciones con elif. Validá primero que la edad esté en el rango permitido.',
    solucion: `nombre = input("Nombre: ")
edad = int(input("Edad: "))

if edad < 0 or edad > 120:
    print("Edad no válida")
elif edad <= 2:
    print(f"{nombre} es Bebé")
elif edad <= 12:
    print(f"{nombre} es Niño")
elif edad <= 17:
    print(f"{nombre} es Adolescente")
elif edad <= 65:
    print(f"{nombre} es Adulto")
else:
    print(f"{nombre} es Adulto Mayor")`,
  },
  {
    id: 6,
    tp: 'TP02',
    tema: 'Condicionales',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de descuentos por monto de compra. Pedí el monto total de la compra. Aplicá estos descuentos escalonados:\n- $0 - $5000: sin descuento\n- $5001 - $15000: 5%\n- $15001 - $30000: 10%\n- $30001 - $50000: 15%\n- Más de $50000: 20%\n- Si el día es miércoles o jueves, sumá un 2% adicional al descuento.\n- Si el método de pago es "efectivo", sumá un 3% adicional.\nMostrá el monto original, el descuento total aplicado y el monto final.',
    solucion: `def calcular_descuento(monto, dia, metodo_pago):
    if monto <= 5000:
        desc = 0
    elif monto <= 15000:
        desc = 5
    elif monto <= 30000:
        desc = 10
    elif monto <= 50000:
        desc = 15
    else:
        desc = 20

    if dia.lower() in ["miércoles", "miercoles", "jueves"]:
        desc += 2
    if metodo_pago.lower() == "efectivo":
        desc += 3

    return desc

def main():
    monto = float(input("Monto total de la compra: $"))
    dia = input("Día de la semana: ")
    metodo = input("Método de pago: ")

    desc_porcentaje = calcular_descuento(monto, dia, metodo)
    desc_aplicado = monto * desc_porcentaje / 100

    print(f"\\nMonto original:  \${monto:>8.2f}")
    print(f"Descuento ({desc_porcentaje}%): -\${desc_aplicado:>8.2f}")
    print(f"Monto final:     \${monto - desc_aplicado:>8.2f}")

main()`,
  },

  // ===== TP03 — Bucles y colecciones =====
  {
    id: 7,
    tp: 'TP03',
    tema: 'Bucles y colecciones',
    dificultad: 'facil',
    enunciado: 'Completá el programa para que muestre la tabla de multiplicar de un número ingresado por el usuario, del 1 al 10.',
    codigo_base: `numero = int(input("Ingresá un número: "))
// ???
    // ???
    print(f"{numero} x {i} = {numero * i}")`,
    solucion: `numero = int(input("Ingresá un número: "))
for i in range(1, 11):
    print(f"{numero} x {i} = {numero * i}")`,
  },
  {
    id: 8,
    tp: 'TP03',
    tema: 'Bucles y colecciones',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que pida al usuario la cantidad de números a ingresar, luego solicite esa cantidad de números uno por uno. Al final, mostrá: suma total, promedio, valor máximo y valor mínimo. No uses sum(), max() ni min() — implementá los cálculos manualmente.',
    pista: 'Inicializá maximo con un número muy chico y minimo con uno muy grande. Actualizalos en cada iteración.',
    solucion: `cantidad = int(input("Cantidad de números: "))
suma = 0
maximo = float('-inf')
minimo = float('inf')

for i in range(cantidad):
    num = float(input(f"Número {i+1}: "))
    suma += num
    if num > maximo:
        maximo = num
    if num < minimo:
        minimo = num

promedio = suma / cantidad
print(f"\\nSuma: {suma}")
print(f"Promedio: {promedio}")
print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")`,
  },
  {
    id: 9,
    tp: 'TP03',
    tema: 'Bucles y colecciones',
    dificultad: 'dificil',
    enunciado: 'Analizá una lista de números sin usar sum(), max() ni min(). Pedí números hasta que el usuario ingrese "fin". Al terminar: mostrá la suma, el promedio (con 2 decimales), el máximo, el mínimo, la cantidad de pares e impares, y si la lista está ordenada ascendentemente. Implementá todo manualmente con bucles.',
    solucion: `numeros = []
print("Ingresá números (escribí 'fin' para terminar):")
while True:
    entrada = input()
    if entrada.lower() == "fin":
        break
    numeros.append(float(entrada))

if not numeros:
    print("No se ingresaron números")
else:
    suma = 0
    maximo = numeros[0]
    minimo = numeros[0]
    pares = 0
    ordenado = True

    for i, num in enumerate(numeros):
        suma += num
        if num > maximo:
            maximo = num
        if num < minimo:
            minimo = num
        if num % 2 == 0:
            pares += 1
        if i > 0 and numeros[i] < numeros[i-1]:
            ordenado = False

    promedio = suma / len(numeros)
    impares = len(numeros) - pares

    print(f"\\nSuma: {suma}")
    print(f"Promedio: {promedio:.2f}")
    print(f"Máximo: {maximo}")
    print(f"Mínimo: {minimo}")
    print(f"Pares: {pares}")
    print(f"Impares: {impares}")
    print(f"Ordenada: {'Sí' if ordenado else 'No'}")`,
  },

  // ===== TP04 — Funciones =====
  {
    id: 10,
    tp: 'TP04',
    tema: 'Funciones',
    dificultad: 'facil',
    enunciado: 'Completá la función es_multiplo que reciba dos números y retorne True si el primero es múltiplo del segundo, o False en caso contrario.',
    codigo_base: `def es_multiplo(numero, divisor):
    # ???
    return // ???

print(es_multiplo(10, 2))  # True
print(es_multiplo(10, 3))  # False`,
    solucion: `def es_multiplo(numero, divisor):
    if divisor == 0:
        return False
    return numero % divisor == 0

print(es_multiplo(10, 2))  # True
print(es_multiplo(10, 3))  # False`,
  },
  {
    id: 11,
    tp: 'TP04',
    tema: 'Funciones',
    dificultad: 'intermedio',
    enunciado: 'Escribí una función llamada analizar_numeros que reciba una lista de números y retorne un diccionario con: el mínimo, el máximo y el promedio. No uses las funciones built-in sum(), max() ni min(). Luego, escribí un programa que use esta función con una lista ingresada por el usuario.',
    pista: 'Iterá con un for sobre la lista, acumulando suma y actualizando min/max manualmente.',
    solucion: `def analizar_numeros(lista):
    if not lista:
        return {"minimo": None, "maximo": None, "promedio": None}
    minimo = lista[0]
    maximo = lista[0]
    suma = 0
    for num in lista:
        suma += num
        if num < minimo:
            minimo = num
        if num > maximo:
            maximo = num
    promedio = suma / len(lista)
    return {"minimo": minimo, "maximo": maximo, "promedio": promedio}

def main():
    entrada = input("Ingresá números separados por espacio: ")
    numeros = [float(x) for x in entrada.split()]
    resultado = analizar_numeros(numeros)
    print(f"Mínimo: {resultado['minimo']}")
    print(f"Máximo: {resultado['maximo']}")
    print(f"Promedio: {resultado['promedio']:.2f}")

main()`,
  },
  {
    id: 12,
    tp: 'TP04',
    tema: 'Funciones',
    dificultad: 'dificil',
    enunciado: 'Implementá una función pedir_calificacion() que pida al usuario una nota numérica (0-10) y valide que sea un número válido. Si el usuario ingresa algo que no es un número, debe mostrar "Error: debe ingresar un número" y volver a pedir. Si está fuera del rango, mostrar "Error: la nota debe estar entre 0 y 10" y volver a pedir. La función debe retornar la nota válida como float. Luego, usala para pedir 5 notas, calcular el promedio y mostrar si está aprobado (>=6) o desaprobado.',
    solucion: `def pedir_calificacion():
    while True:
        entrada = input("Ingresá una nota (0-10): ")
        try:
            nota = float(entrada)
            if 0 <= nota <= 10:
                return nota
            else:
                print("Error: la nota debe estar entre 0 y 10")
        except ValueError:
            print("Error: debe ingresar un número")

def main():
    notas = []
    for i in range(5):
        nota = pedir_calificacion()
        notas.append(nota)

    promedio = sum(notas) / len(notas)
    print(f"\\nNotas: {notas}")
    print(f"Promedio: {promedio:.2f}")
    if promedio >= 6:
        print("Estado: Aprobado")
    else:
        print("Estado: Desaprobado")

main()`,
  },

  // ===== TP05 — POO =====
  {
    id: 13,
    tp: 'TP05',
    tema: 'POO',
    dificultad: 'facil',
    enunciado: 'Completá la clase Libro. Debe tener __init__ que reciba título, autor y año. Además debe tener un método descripcion() que retorne un string como "Cien Años de Soledad - Gabriel García Márquez (1967)".',
    codigo_base: `class Libro:
    def __init__(self, titulo, autor, año):
        self.titulo = titulo
        self.autor = autor
        // ???
    
    def descripcion(self):
        return // ???

libro = Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967)
print(libro.descripcion())`,
    solucion: `class Libro:
    def __init__(self, titulo, autor, año):
        self.titulo = titulo
        self.autor = autor
        self.año = año

    def descripcion(self):
        return f"{self.titulo} - {self.autor} ({self.año})"

libro = Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967)
print(libro.descripcion())`,
  },
  {
    id: 14,
    tp: 'TP05',
    tema: 'POO',
    dificultad: 'intermedio',
    enunciado: 'Creá la clase CuentaBancaria con: __init__(titular, saldo_inicial=0), depositar(monto), extraer(monto) (validando que haya saldo suficiente), mostrar_saldo() que imprima el saldo con formato "$ X.XX", y una propiedad saldo_formateado que retorne el saldo como string con formato. Probá la clase con operaciones de depósito y extracción.',
    pista: 'Usá type hints y manejá el caso de extraer más de lo que hay con un mensaje de error.',
    solucion: `class CuentaBancaria:
    def __init__(self, titular: str, saldo_inicial: float = 0):
        self.titular = titular
        self._saldo = saldo_inicial

    def depositar(self, monto: float) -> None:
        if monto <= 0:
            print("El monto debe ser positivo")
            return
        self._saldo += monto
        print(f"Depósito de \${monto:.2f} realizado")

    def extraer(self, monto: float) -> None:
        if monto <= 0:
            print("El monto debe ser positivo")
            return
        if monto > self._saldo:
            print("Saldo insuficiente")
            return
        self._saldo -= monto
        print(f"Extracción de \${monto:.2f} realizada")

    def mostrar_saldo(self) -> None:
        print(f"Saldo: \${self._saldo:.2f}")

    @property
    def saldo_formateado(self) -> str:
        return f"$ {self._saldo:.2f}"

# Prueba
c = CuentaBancaria("Ana", 1000)
c.depositar(500)
c.extraer(200)
c.mostrar_saldo()
print(c.saldo_formateado)`,
  },
  {
    id: 15,
    tp: 'TP05',
    tema: 'POO',
    dificultad: 'dificil',
    enunciado: 'Implementá la clase Vehiculo completa. Debe tener: marca, modelo, año, velocidad_actual (privada), encendido (booleano privado). Métodos: encender(), apagar(), acelerar(km_h) (solo si está encendido), frenar(km_h), y __str__ que muestre todos los datos. Además, implementá una clase Auto que herede de Vehiculo y agregue cantidad_puertas y tipo_combustible, sobrescribiendo __str__ para agregar estos datos.',
    solucion: `class Vehiculo:
    def __init__(self, marca: str, modelo: str, año: int):
        self.marca = marca
        self.modelo = modelo
        self.año = año
        self._velocidad = 0
        self._encendido = False

    def encender(self):
        if self._encendido:
            print("Ya está encendido")
        else:
            self._encendido = True
            print("Vehículo encendido")

    def apagar(self):
        if not self._encendido:
            print("Ya está apagado")
        else:
            self._encendido = False
            self._velocidad = 0
            print("Vehículo apagado")

    def acelerar(self, km_h: float):
        if not self._encendido:
            print("No se puede acelerar: vehículo apagado")
            return
        self._velocidad += km_h
        print(f"Acelerando a {self._velocidad} km/h")

    def frenar(self, km_h: float):
        if self._velocidad - km_h < 0:
            self._velocidad = 0
        else:
            self._velocidad -= km_h
        print(f"Velocidad actual: {self._velocidad} km/h")

    def __str__(self):
        estado = "encendido" if self._encendido else "apagado"
        return f"{self.marca} {self.modelo} ({self.año}) - {estado} - {self._velocidad} km/h"

class Auto(Vehiculo):
    def __init__(self, marca, modelo, año, puertas: int, combustible: str):
        super().__init__(marca, modelo, año)
        self.puertas = puertas
        self.combustible = combustible

    def __str__(self):
        base = super().__str__()
        return f"{base} - {self.puertas} puertas - {self.combustible}"`,
  },

  // ===== TP06 — Listas enlazadas =====
  {
    id: 16,
    tp: 'TP06',
    tema: 'Listas enlazadas',
    dificultad: 'facil',
    enunciado: 'Completá el programa para crear la clase Nodo y conectar tres nodos formando una lista simple: nodo1 -> nodo2 -> nodo3 -> None. Luego recorré la lista mostrando los valores.',
    codigo_base: `class Nodo:
    def __init__(self, dato):
        // ???
        // ???

nodo1 = Nodo("A")
nodo2 = Nodo("B")
nodo3 = Nodo("C")

// ???
// ???

actual = nodo1
while actual:
    print(actual.dato, end=" -> ")
    // ???`,
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

nodo1 = Nodo("A")
nodo2 = Nodo("B")
nodo3 = Nodo("C")

nodo1.siguiente = nodo2
nodo2.siguiente = nodo3

actual = nodo1
while actual:
    print(actual.dato, end=" -> ")
    actual = actual.siguiente
print("None")`,
  },
  {
    id: 17,
    tp: 'TP06',
    tema: 'Listas enlazadas',
    dificultad: 'intermedio',
    enunciado: 'Implementá la clase ListaEnlazada con los métodos esta_vacia() que retorne True si la lista no tiene elementos, e insertar_inicio(dato) que agregue un nuevo nodo al principio de la lista. Incluí también el método recorrer() que muestre los elementos.',
    pista: 'insertar_inicio debe crear un nuevo nodo, enlazar su siguiente a la cabeza actual, y actualizar la cabeza al nuevo nodo.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None

    def esta_vacia(self):
        return self.cabeza is None

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
  },
  {
    id: 18,
    tp: 'TP06',
    tema: 'Listas enlazadas',
    dificultad: 'dificil',
    enunciado: 'Implementá una lista enlazada completa con los métodos: insertar_inicio(dato), insertar_fin(dato), eliminar(dato), contar() que retorne la cantidad de nodos, y buscar(dato) que retorne True si el dato existe. Incluí la clase Nodo y ListaEnlazada.',
    solucion: `class Nodo:
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

    def insertar_fin(self, dato):
        nuevo = Nodo(dato)
        if self.cabeza is None:
            self.cabeza = nuevo
            return
        actual = self.cabeza
        while actual.siguiente:
            actual = actual.siguiente
        actual.siguiente = nuevo

    def eliminar(self, dato):
        if self.cabeza is None:
            return
        if self.cabeza.dato == dato:
            self.cabeza = self.cabeza.siguiente
            return
        actual = self.cabeza
        while actual.siguiente:
            if actual.siguiente.dato == dato:
                actual.siguiente = actual.siguiente.siguiente
                return
            actual = actual.siguiente

    def contar(self):
        cont = 0
        actual = self.cabeza
        while actual:
            cont += 1
            actual = actual.siguiente
        return cont

    def buscar(self, dato):
        actual = self.cabeza
        while actual:
            if actual.dato == dato:
                return True
            actual = actual.siguiente
        return False

    def recorrer(self):
        actual = self.cabeza
        while actual:
            print(actual.dato, end=" -> ")
            actual = actual.siguiente
        print("None")`,
  },

  // ===== TP07 — Pilas y colas =====
  {
    id: 19,
    tp: 'TP07',
    tema: 'Pilas y colas',
    dificultad: 'facil',
    enunciado: 'Completá los métodos push() y pop() de una Pila implementada con nodos enlazados. push() agrega un elemento al tope, pop() quita y retorna el elemento del tope.',
    codigo_base: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Pila:
    def __init__(self):
        self.tope = None

    def push(self, dato):
        // ???
        // ???

    def pop(self):
        if self.esta_vacia():
            return None
        // ???
        // ???

    def esta_vacia(self):
        return self.tope is None

pila = Pila()
pila.push(1)
pila.push(2)
print(pila.pop())  # 2
print(pila.pop())  # 1`,
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Pila:
    def __init__(self):
        self.tope = None

    def push(self, dato):
        nuevo = Nodo(dato)
        nuevo.siguiente = self.tope
        self.tope = nuevo

    def pop(self):
        if self.esta_vacia():
            return None
        dato = self.tope.dato
        self.tope = self.tope.siguiente
        return dato

    def esta_vacia(self):
        return self.tope is None

pila = Pila()
pila.push(1)
pila.push(2)
print(pila.pop())  # 2
print(pila.pop())  # 1`,
  },
  {
    id: 20,
    tp: 'TP07',
    tema: 'Pilas y colas',
    dificultad: 'intermedio',
    enunciado: 'Implementá una Cola usando nodos enlazados con los métodos: enqueue(dato) que agrega al final, dequeue() que quita y retorna el frente, y es_vacia() que retorna True si no hay elementos. La cola debe tener referencia tanto al frente como al final.',
    pista: 'Mantené dos referencias: frente (para dequeue) y final (para enqueue). Encolar al final es más eficiente que recorrer toda la lista.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Cola:
    def __init__(self):
        self.frente = None
        self.final = None

    def es_vacia(self):
        return self.frente is None

    def enqueue(self, dato):
        nuevo = Nodo(dato)
        if self.es_vacia():
            self.frente = nuevo
            self.final = nuevo
        else:
            self.final.siguiente = nuevo
            self.final = nuevo

    def dequeue(self):
        if self.es_vacia():
            return None
        dato = self.frente.dato
        self.frente = self.frente.siguiente
        if self.frente is None:
            self.final = None
        return dato`,
  },
  {
    id: 21,
    tp: 'TP07',
    tema: 'Pilas y colas',
    dificultad: 'dificil',
    enunciado: 'Implementá una simulación de atención de clientes usando una cola. Cada cliente tiene nombre y tipo ("preferencial" o "regular"). Los clientes preferenciales tienen prioridad y deben ser atendidos antes que los regulares. Usá dos colas (una preferencial y una regular). El programa debe: registrar clientes, atender al siguiente según prioridad, y mostrar el estado de la cola. Implementá con nodos enlazados.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Cola:
    def __init__(self):
        self.frente = None
        self.final = None

    def es_vacia(self):
        return self.frente is None

    def encolar(self, dato):
        nuevo = Nodo(dato)
        if self.es_vacia():
            self.frente = nuevo
            self.final = nuevo
        else:
            self.final.siguiente = nuevo
            self.final = nuevo

    def desencolar(self):
        if self.es_vacia():
            return None
        dato = self.frente.dato
        self.frente = self.frente.siguiente
        if self.frente is None:
            self.final = None
        return dato

    def __len__(self):
        cont = 0
        actual = self.frente
        while actual:
            cont += 1
            actual = actual.siguiente
        return cont

class SistemaAtencion:
    def __init__(self):
        self.preferencial = Cola()
        self.regular = Cola()

    def registrar_cliente(self, nombre, tipo):
        cliente = {"nombre": nombre, "tipo": tipo}
        if tipo == "preferencial":
            self.preferencial.encolar(cliente)
        else:
            self.regular.encolar(cliente)
        print(f"Cliente {nombre} ({tipo}) registrado")

    def atender_siguiente(self):
        if not self.preferencial.es_vacia():
            cliente = self.preferencial.desencolar()
        elif not self.regular.es_vacia():
            cliente = self.regular.desencolar()
        else:
            print("No hay clientes en espera")
            return
        print(f"Atendiendo a {cliente['nombre']} ({cliente['tipo']})")

    def mostrar_estado(self):
        pref = len(self.preferencial)
        reg = len(self.regular)
        print(f"\\nClientes en espera: {pref + reg}")
        print(f"Preferenciales: {pref}")
        print(f"Regulares: {reg}")`,
  },

  // ===== TP08 — Recursividad =====
  {
    id: 22,
    tp: 'TP08',
    tema: 'Recursividad',
    dificultad: 'facil',
    enunciado: 'Completá la función factorial recursiva. Recordá que 0! = 1 y n! = n * (n-1)!',
    codigo_base: `def factorial(n):
    # Caso base
    if n // ???:
        return // ???
    # Caso recursivo
    return // ???

print(factorial(5))  # 120`,
    solucion: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120`,
  },
  {
    id: 23,
    tp: 'TP08',
    tema: 'Recursividad',
    dificultad: 'intermedio',
    enunciado: 'Implementá una función recursiva potencia(base, exponente) que calcule base^exponente sin usar el operador **. Resolvelo con recursión. Considerá que cualquier número elevado a 0 da 1.',
    pista: 'La potencia se define como base * potencia(base, exponente-1). El caso base es exponente == 0 que retorna 1.',
    solucion: `def potencia(base, exponente):
    if exponente == 0:
        return 1
    if exponente < 0:
        return 1 / potencia(base, -exponente)
    return base * potencia(base, exponente - 1)

print(potencia(2, 3))    # 8
print(potencia(5, 0))    # 1
print(potencia(2, -2))   # 0.25`,
  },
  {
    id: 24,
    tp: 'TP08',
    tema: 'Recursividad',
    dificultad: 'dificil',
    enunciado: 'Implementá una función recursiva buscar_en_lista(lista, valor, indice=0) que busque un valor en una lista usando recursión (sin bucles for ni while). Debe retornar el índice donde se encuentra el valor, o -1 si no existe.',
    solucion: `def buscar_en_lista(lista, valor, indice=0):
    if indice >= len(lista):
        return -1
    if lista[indice] == valor:
        return indice
    return buscar_en_lista(lista, valor, indice + 1)

print(buscar_en_lista([1, 5, 3, 8, 2], 3))   # 2
print(buscar_en_lista([1, 5, 3, 8, 2], 10))  # -1`,
  },

  // ===== INTEGRADOR — Punto 1: Variables y tipos de datos =====
  {
    id: 25,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 1,
    punto_titulo: 'Variables y tipos de datos',
    dificultad: 'facil',
    enunciado: 'Completá el programa para que pida el nombre del usuario, su edad, y muestre "Hola [nombre], tenés [edad] años". Usá input(), int() y f-strings.',
    codigo_base: `nombre = input("Ingresá tu nombre: ")
edad = input("Ingresá tu edad: ")
// ???
print(// ???)`,
    solucion: `nombre = input("Ingresá tu nombre: ")
edad = int(input("Ingresá tu edad: "))
print(f"Hola {nombre}, tenés {edad} años")`,
  },
  {
    id: 26,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 1,
    punto_titulo: 'Variables y tipos de datos',
    dificultad: 'intermedio',
    enunciado: 'Implementá una calculadora de consumo eléctrico. Pedí nombre de electrodoméstico, potencia en watts y horas de uso diario. Validá que potencia y horas sean números positivos. Calculá el consumo diario en kWh y el costo mensual (30 días) si 1 kWh cuesta $150. Mostrá los resultados con 2 decimales.',
    pista: 'Consumo diario en kWh = (potencia * horas) / 1000. Usá while para validar datos.',
    solucion: `def pedir_positivo(mensaje):
    while True:
        try:
            valor = float(input(mensaje))
            if valor > 0:
                return valor
            print("Debe ser un número positivo")
        except ValueError:
            print("Debe ingresar un número")

def main():
    nombre = input("Nombre del electrodoméstico: ")
    potencia = pedir_positivo("Potencia (W): ")
    horas = pedir_positivo("Horas de uso diario: ")
    consumo_diario = (potencia * horas) / 1000
    costo_mensual = consumo_diario * 30 * 150
    print(f"\\n{nombre}: {consumo_diario:.2f} kWh/día")
    print(f"Costo mensual: \${costo_mensual:.2f}")

main()`,
  },
  {
    id: 27,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 1,
    punto_titulo: 'Variables y tipos de datos',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de liquidación de sueldo. Pedí: nombre, sueldo básico, cantidad de horas extras y valor por hora extra. Calculá: sueldo bruto (básico + extras), descuento jubilatorio (11%), descuento obra social (3%), descuento sindical (2%), total descuentos y sueldo neto. Mostrá un recibo detallado con todos los valores alineados y con 2 decimales.',
    solucion: `def liquidar():
    nombre = input("Nombre del empleado: ")
    basico = float(input("Sueldo básico: $"))
    horas_extra = int(input("Horas extras: "))
    valor_extra = float(input("Valor por hora extra: $"))

    extras = horas_extra * valor_extra
    bruto = basico + extras
    jubilacion = bruto * 0.11
    obra_social = bruto * 0.03
    sindicato = bruto * 0.02
    descuentos = jubilacion + obra_social + sindicato
    neto = bruto - descuentos

    print("\\n" + "="*40)
    print(f"RECIBO - {nombre}")
    print("="*40)
    print(f"Básico:         \${basico:>8.2f}")
    print(f"Extras:         \${extras:>8.2f}")
    print(f"Bruto:          \${bruto:>8.2f}")
    print(f"Jubilación:     \${jubilacion:>8.2f}")
    print(f"Obra social:    \${obra_social:>8.2f}")
    print(f"Sindicato:      \${sindicato:>8.2f}")
    print(f"Descuentos:     \${descuentos:>8.2f}")
    print("-"*40)
    print(f"NETO:           \${neto:>8.2f}")

liquidar()`,
  },

  // ===== INTEGRADOR — Punto 2: Estructuras condicionales =====
  {
    id: 28,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 2,
    punto_titulo: 'Estructuras condicionales',
    dificultad: 'facil',
    enunciado: 'Completá el programa para que clasifique un número ingresado como "Positivo", "Negativo" o "Cero".',
    codigo_base: `numero = float(input("Ingresá un número: "))
if // ???:
    print("Positivo")
// ???
    print("Negativo")
// ???
    print("Cero")`,
    solucion: `numero = float(input("Ingresá un número: "))
if numero > 0:
    print("Positivo")
elif numero < 0:
    print("Negativo")
else:
    print("Cero")`,
  },
  {
    id: 29,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 2,
    punto_titulo: 'Estructuras condicionales',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que clasifique a una persona según su edad. Pedí nombre y edad. Validá que la edad no sea negativa. Clasificá como: Bebé (0-2), Niño (3-12), Adolescente (13-17), Adulto (18-65), Adulto Mayor (66-120). Si la edad es mayor a 120, mostrá "Edad no válida".',
    pista: 'Usá if/elif/else. Primero validá que no sea negativa, luego clasificá por rangos.',
    solucion: `nombre = input("Nombre: ")
edad = int(input("Edad: "))

if edad < 0:
    print("Edad no válida")
elif edad <= 2:
    print(f"{nombre} es Bebé")
elif edad <= 12:
    print(f"{nombre} es Niño")
elif edad <= 17:
    print(f"{nombre} es Adolescente")
elif edad <= 65:
    print(f"{nombre} es Adulto")
elif edad <= 120:
    print(f"{nombre} es Adulto Mayor")
else:
    print("Edad no válida")`,
  },
  {
    id: 30,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 2,
    punto_titulo: 'Estructuras condicionales',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de descuentos por monto de compra. Pedí el monto total. Aplicá: $0-$5000: 0%, $5001-$15000: 5%, $15001-$30000: 10%, $30001-$50000: 15%, más de $50000: 20%. Si el día es miércoles o jueves, sumá 2% adicional. Mostrá monto original, descuento total y monto final.',
    solucion: `def calcular_descuento(monto, dia):
    if monto <= 5000:
        desc = 0
    elif monto <= 15000:
        desc = 5
    elif monto <= 30000:
        desc = 10
    elif monto <= 50000:
        desc = 15
    else:
        desc = 20
    if dia.lower() in ["miércoles", "miercoles", "jueves"]:
        desc += 2
    return desc

monto = float(input("Monto total: $"))
dia = input("Día de la semana: ")
desc = calcular_descuento(monto, dia)
total_desc = monto * desc / 100
print(f"Original: \${monto:.2f}")
print(f"Descuento ({desc}%): -\${total_desc:.2f}")
print(f"Final: \${monto - total_desc:.2f}")`,
  },

  // ===== INTEGRADOR — Punto 3: Bucles y colecciones =====
  {
    id: 31,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 3,
    punto_titulo: 'Bucles y colecciones',
    dificultad: 'facil',
    enunciado: 'Completá el programa para mostrar la tabla de multiplicar de un número del 1 al 10 usando for y range().',
    codigo_base: `numero = int(input("Ingresá un número: "))
// ???
    print(f"{numero} x {i} = {numero * i}")`,
    solucion: `numero = int(input("Ingresá un número: "))
for i in range(1, 11):
    print(f"{numero} x {i} = {numero * i}")`,
  },
  {
    id: 32,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 3,
    punto_titulo: 'Bucles y colecciones',
    dificultad: 'intermedio',
    enunciado: 'Pedí al usuario la cantidad de números a ingresar, luego solicitá cada número. Al final mostrá: suma total, promedio, valor máximo y valor mínimo. No uses sum(), max() ni min().',
    pista: 'Inicializá maximo con float("-inf") y minimo con float("inf").',
    solucion: `cantidad = int(input("Cantidad de números: "))
suma = 0
maximo = float("-inf")
minimo = float("inf")

for i in range(cantidad):
    num = float(input(f"Número {i+1}: "))
    suma += num
    if num > maximo:
        maximo = num
    if num < minimo:
        minimo = num

promedio = suma / cantidad
print(f"Suma: {suma}")
print(f"Promedio: {promedio:.2f}")
print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")`,
  },
  {
    id: 33,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 3,
    punto_titulo: 'Bucles y colecciones',
    dificultad: 'dificil',
    enunciado: 'Analizá una lista de números sin usar sum(), max() ni min(). Pedí números hasta que el usuario ingrese "fin". Mostrá: suma, promedio (2 decimales), máximo, mínimo, cantidad de pares e impares, y si la lista está ordenada ascendentemente. Todo con bucles manuales.',
    solucion: `numeros = []
print("Ingresá números (escribí 'fin' para terminar):")
while True:
    entrada = input()
    if entrada.lower() == "fin":
        break
    numeros.append(float(entrada))

if not numeros:
    print("No se ingresaron números")
else:
    suma = 0
    maximo = numeros[0]
    minimo = numeros[0]
    pares = 0
    ordenado = True

    for i, num in enumerate(numeros):
        suma += num
        if num > maximo:
            maximo = num
        if num < minimo:
            minimo = num
        if num % 2 == 0:
            pares += 1
        if i > 0 and numeros[i] < numeros[i-1]:
            ordenado = False

    promedio = suma / len(numeros)
    impares = len(numeros) - pares
    print(f"Suma: {suma}")
    print(f"Promedio: {promedio:.2f}")
    print(f"Máximo: {maximo}")
    print(f"Mínimo: {minimo}")
    print(f"Pares: {pares}")
    print(f"Impares: {impares}")
    print(f"Ordenada: {'Sí' if ordenado else 'No'}")`,
  },

  // ===== INTEGRADOR — Punto 4: Funciones =====
  {
    id: 34,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 4,
    punto_titulo: 'Funciones',
    dificultad: 'facil',
    enunciado: 'Completá la función es_multiplo que reciba dos números y retorne True si el primero es múltiplo del segundo, o False en caso contrario.',
    codigo_base: `def es_multiplo(numero, divisor):
    if // ???:
        return // ???
    return // ???

print(es_multiplo(10, 2))  # True
print(es_multiplo(10, 3))  # False`,
    solucion: `def es_multiplo(numero, divisor):
    if numero % divisor == 0:
        return True
    return False

print(es_multiplo(10, 2))  # True
print(es_multiplo(10, 3))  # False`,
  },
  {
    id: 35,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 4,
    punto_titulo: 'Funciones',
    dificultad: 'intermedio',
    enunciado: 'Escribí una función analizar_lista(lista) que reciba una lista de números y retorne una tupla con (minimo, maximo, promedio). No uses sum(), max() ni min(). Luego usala con una lista ingresada por el usuario.',
    pista: 'Iterá con un for y actualizá las variables manualmente.',
    solucion: `def analizar_lista(lista):
    if not lista:
        return (None, None, None)
    minimo = lista[0]
    maximo = lista[0]
    suma = 0
    for num in lista:
        suma += num
        if num < minimo:
            minimo = num
        if num > maximo:
            maximo = num
    promedio = suma / len(lista)
    return (minimo, maximo, promedio)

entrada = input("Números separados por espacio: ")
numeros = [float(x) for x in entrada.split()]
minimo, maximo, promedio = analizar_lista(numeros)
print(f"Mínimo: {minimo}, Máximo: {maximo}, Promedio: {promedio:.2f}")`,
  },
  {
    id: 36,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 4,
    punto_titulo: 'Funciones',
    dificultad: 'dificil',
    enunciado: 'Implementá una función pedir_calificacion() que pida una nota (0-10). Validá que sea un número (si no, mostrá "Error: debe ingresar un número" y repetí) y que esté entre 0 y 10 (si no, mostrá "Error: la nota debe estar entre 0 y 10" y repetí). Usala para pedir 5 notas y mostrar el promedio. Aprobado si >= 6.',
    solucion: `def pedir_calificacion():
    while True:
        entrada = input("Nota (0-10): ")
        try:
            nota = float(entrada)
            if 0 <= nota <= 10:
                return nota
            print("Error: la nota debe estar entre 0 y 10")
        except ValueError:
            print("Error: debe ingresar un número")

notas = [pedir_calificacion() for _ in range(5)]
promedio = sum(notas) / len(notas)
print(f"Promedio: {promedio:.2f}")
print("Aprobado" if promedio >= 6 else "Desaprobado")`,
  },

  // ===== INTEGRADOR — Punto 5: POO =====
  {
    id: 37,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 5,
    punto_titulo: 'POO',
    dificultad: 'facil',
    enunciado: 'Completá la clase Libro. Debe tener __init__ con título, autor y año, y un método descripcion() que retorne un string formateado.',
    codigo_base: `class Libro:
    def __init__(self, titulo, autor, año):
        self.titulo = titulo
        // ???
        // ???

    def descripcion(self):
        return // ???

libro = Libro("1984", "George Orwell", 1949)
print(libro.descripcion())`,
    solucion: `class Libro:
    def __init__(self, titulo, autor, año):
        self.titulo = titulo
        self.autor = autor
        self.año = año

    def descripcion(self):
        return f"{self.titulo} - {self.autor} ({self.año})"

libro = Libro("1984", "George Orwell", 1949)
print(libro.descripcion())`,
  },
  {
    id: 38,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 5,
    punto_titulo: 'POO',
    dificultad: 'intermedio',
    enunciado: 'Creá la clase CuentaBancaria con __init__(titular, saldo_inicial=0), depositar(monto), extraer(monto) que valide que haya saldo suficiente, y mostrar_saldo(). Probá con depósitos y extracciones.',
    pista: 'Usá un atributo privado _saldo. Validá que no se pueda extraer más del saldo disponible.',
    solucion: `class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self._saldo = saldo_inicial

    def depositar(self, monto):
        if monto > 0:
            self._saldo += monto
            print(f"Depósito de \${monto:.2f} realizado")
        else:
            print("El monto debe ser positivo")

    def extraer(self, monto):
        if monto > self._saldo:
            print("Saldo insuficiente")
        elif monto > 0:
            self._saldo -= monto
            print(f"Extracción de \${monto:.2f} realizada")
        else:
            print("El monto debe ser positivo")

    def mostrar_saldo(self):
        print(f"Saldo: \${self._saldo:.2f}")

c = CuentaBancaria("Ana", 1000)
c.depositar(500); c.extraer(200); c.mostrar_saldo()`,
  },
  {
    id: 39,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 5,
    punto_titulo: 'POO',
    dificultad: 'dificil',
    enunciado: 'Creá la clase Vehiculo con marca, modelo, año, _velocidad (privada, 0) y _encendido (privado, False). Métodos: encender(), apagar(), acelerar(km_h) (solo si encendido), frenar(km_h) y __str__(). Luego creá Auto que herede de Vehiculo agregando puertas y combustible.',
    solucion: `class Vehiculo:
    def __init__(self, marca, modelo, año):
        self.marca = marca
        self.modelo = modelo
        self.año = año
        self._velocidad = 0
        self._encendido = False

    def encender(self):
        if self._encendido:
            print("Ya está encendido")
        else:
            self._encendido = True
            print("Vehículo encendido")

    def apagar(self):
        if not self._encendido:
            print("Ya está apagado")
        else:
            self._encendido = False
            self._velocidad = 0
            print("Vehículo apagado")

    def acelerar(self, km_h):
        if not self._encendido:
            print("No se puede: vehículo apagado")
        else:
            self._velocidad += km_h
            print(f"Velocidad: {self._velocidad} km/h")

    def frenar(self, km_h):
        self._velocidad = max(0, self._velocidad - km_h)
        print(f"Velocidad: {self._velocidad} km/h")

    def __str__(self):
        estado = "encendido" if self._encendido else "apagado"
        return f"{self.marca} {self.modelo} ({self.año}) - {estado} - {self._velocidad} km/h"

class Auto(Vehiculo):
    def __init__(self, marca, modelo, año, puertas, combustible):
        super().__init__(marca, modelo, año)
        self.puertas = puertas
        self.combustible = combustible

    def __str__(self):
        return super().__str__() + f" - {self.puertas} puertas - {self.combustible}"`,
  },

  // ===== INTEGRADOR — Punto 6: Listas enlazadas =====
  {
    id: 40,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 6,
    punto_titulo: 'Listas enlazadas',
    dificultad: 'facil',
    enunciado: 'Completá la clase Nodo y conectá tres nodos formando una lista simple: nodo1 -> nodo2 -> nodo3 -> None. Recorré mostrando los valores.',
    codigo_base: `class Nodo:
    def __init__(self, dato):
        // ???
        // ???

nodo1 = Nodo("X")
nodo2 = Nodo("Y")
nodo3 = Nodo("Z")

// ???
// ???

actual = nodo1
while actual:
    print(actual.dato, end=" -> ")
    // ???`,
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

nodo1 = Nodo("X")
nodo2 = Nodo("Y")
nodo3 = Nodo("Z")

nodo1.siguiente = nodo2
nodo2.siguiente = nodo3

actual = nodo1
while actual:
    print(actual.dato, end=" -> ")
    actual = actual.siguiente
print("None")`,
  },
  {
    id: 41,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 6,
    punto_titulo: 'Listas enlazadas',
    dificultad: 'intermedio',
    enunciado: 'Implementá ListaEnlazada con esta_vacia() que retorne True si no hay nodos, e insertar_inicio(dato) que agregue al principio. Incluí recorrer().',
    pista: 'insertar_inicio crea un nuevo nodo, su siguiente apunta a la cabeza actual, y la cabeza se actualiza al nuevo nodo.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class ListaEnlazada:
    def __init__(self):
        self.cabeza = None

    def esta_vacia(self):
        return self.cabeza is None

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
  },
  {
    id: 42,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 6,
    punto_titulo: 'Listas enlazadas',
    dificultad: 'dificil',
    enunciado: 'Implementá ListaEnlazada completa con: insertar_inicio(dato), insertar_fin(dato), eliminar(dato), contar() que retorne cantidad de nodos, y buscar(dato) que retorne True si existe. Incluí Nodo y recorrer().',
    solucion: `class Nodo:
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

    def insertar_fin(self, dato):
        nuevo = Nodo(dato)
        if self.cabeza is None:
            self.cabeza = nuevo
            return
        actual = self.cabeza
        while actual.siguiente:
            actual = actual.siguiente
        actual.siguiente = nuevo

    def eliminar(self, dato):
        if self.cabeza is None:
            return
        if self.cabeza.dato == dato:
            self.cabeza = self.cabeza.siguiente
            return
        actual = self.cabeza
        while actual.siguiente:
            if actual.siguiente.dato == dato:
                actual.siguiente = actual.siguiente.siguiente
                return
            actual = actual.siguiente

    def contar(self):
        cont = 0
        actual = self.cabeza
        while actual:
            cont += 1
            actual = actual.siguiente
        return cont

    def buscar(self, dato):
        actual = self.cabeza
        while actual:
            if actual.dato == dato:
                return True
            actual = actual.siguiente
        return False

    def recorrer(self):
        actual = self.cabeza
        while actual:
            print(actual.dato, end=" -> ")
            actual = actual.siguiente
        print("None")`,
  },

  // ===== INTEGRADOR — Punto 7: Pilas y colas =====
  {
    id: 43,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 7,
    punto_titulo: 'Pilas y colas',
    dificultad: 'facil',
    enunciado: 'Completá push() y pop() de una Pila con nodos. push() agrega al tope, pop() quita y retorna el tope.',
    codigo_base: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Pila:
    def __init__(self):
        self.tope = None

    def push(self, dato):
        // ???
        // ???

    def pop(self):
        if self.tope is None:
            return None
        // ???
        // ???

pila = Pila()
pila.push(10); pila.push(20)
print(pila.pop())  # 20`,
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Pila:
    def __init__(self):
        self.tope = None

    def push(self, dato):
        nuevo = Nodo(dato)
        nuevo.siguiente = self.tope
        self.tope = nuevo

    def pop(self):
        if self.tope is None:
            return None
        dato = self.tope.dato
        self.tope = self.tope.siguiente
        return dato

pila = Pila()
pila.push(10); pila.push(20)
print(pila.pop())  # 20`,
  },
  {
    id: 44,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 7,
    punto_titulo: 'Pilas y colas',
    dificultad: 'intermedio',
    enunciado: 'Implementá una Cola con nodos enlazados: enqueue(dato) agrega al final, dequeue() quita y retorna el frente, es_vacia(). Mantené referencias a frente y final.',
    pista: 'Encolar al final es O(1) si mantenés referencia al final. Desencolar siempre desde el frente.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Cola:
    def __init__(self):
        self.frente = None
        self.final = None

    def es_vacia(self):
        return self.frente is None

    def enqueue(self, dato):
        nuevo = Nodo(dato)
        if self.es_vacia():
            self.frente = nuevo
            self.final = nuevo
        else:
            self.final.siguiente = nuevo
            self.final = nuevo

    def dequeue(self):
        if self.es_vacia():
            return None
        dato = self.frente.dato
        self.frente = self.frente.siguiente
        if self.frente is None:
            self.final = None
        return dato`,
  },
  {
    id: 45,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 7,
    punto_titulo: 'Pilas y colas',
    dificultad: 'dificil',
    enunciado: 'Implementá una simulación de atención al cliente con Cola. Cada cliente tiene nombre y tipo ("preferencial" o "regular"). Usá dos colas (preferencial y regular). El programa debe: (1) registrar clientes, (2) atender siguiente (prioridad preferencial), (3) mostrar estado. Implementá con nodos enlazados.',
    solucion: `class Nodo:
    def __init__(self, dato):
        self.dato = dato
        self.siguiente = None

class Cola:
    def __init__(self):
        self.frente = None
        self.final = None

    def es_vacia(self):
        return self.frente is None

    def encolar(self, dato):
        nuevo = Nodo(dato)
        if self.es_vacia():
            self.frente = nuevo
            self.final = nuevo
        else:
            self.final.siguiente = nuevo
            self.final = nuevo

    def desencolar(self):
        if self.es_vacia():
            return None
        dato = self.frente.dato
        self.frente = self.frente.siguiente
        if self.frente is None:
            self.final = None
        return dato

    def __len__(self):
        cont = 0
        actual = self.frente
        while actual:
            cont += 1
            actual = actual.siguiente
        return cont

class Simulacion:
    def __init__(self):
        self.pref = Cola()
        self.reg = Cola()

    def registrar(self, nombre, tipo):
        c = {"nombre": nombre, "tipo": tipo}
        if tipo == "preferencial":
            self.pref.encolar(c)
        else:
            self.reg.encolar(c)
        print(f"{nombre} ({tipo}) registrado")

    def atender(self):
        if not self.pref.es_vacia():
            c = self.pref.desencolar()
        elif not self.reg.es_vacia():
            c = self.reg.desencolar()
        else:
            print("No hay clientes")
            return
        print(f"Atendiendo a {c['nombre']}")

    def estado(self):
        print(f"Preferencial: {len(self.pref)}, Regular: {len(self.reg)}")`,
  },

  // ===== INTEGRADOR — Punto 8: Recursividad =====
  {
    id: 46,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 8,
    punto_titulo: 'Recursividad',
    dificultad: 'facil',
    enunciado: 'Completá la función factorial recursiva. 0! = 1, n! = n * (n-1)!',
    codigo_base: `def factorial(n):
    if // ???:
        return // ???
    return // ???

print(factorial(5))  # 120`,
    solucion: `def factorial(n):
    if n == 0:
        return 1
    return n * factorial(n - 1)

print(factorial(5))  # 120`,
  },
  {
    id: 47,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 8,
    punto_titulo: 'Recursividad',
    dificultad: 'intermedio',
    enunciado: 'Implementá una función recursiva potencia(base, exponente) que calcule base^exponente sin usar **. Considerá exponente 0 y exponentes negativos.',
    pista: 'Potencia se define como base * potencia(base, exponente-1). Caso base: exponente == 0 retorna 1.',
    solucion: `def potencia(base, exponente):
    if exponente == 0:
        return 1
    if exponente < 0:
        return 1 / potencia(base, -exponente)
    return base * potencia(base, exponente - 1)

print(potencia(2, 3))    # 8
print(potencia(5, 0))    # 1
print(potencia(2, -2))   # 0.25`,
  },
  {
    id: 48,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 8,
    punto_titulo: 'Recursividad',
    dificultad: 'dificil',
    enunciado: 'Implementá una función recursiva buscar_en_lista(lista, valor, indice=0) que busque un valor en una lista sin bucles (solo recursión). Retorná el índice o -1 si no existe.',
    solucion: `def buscar_en_lista(lista, valor, indice=0):
    if indice >= len(lista):
        return -1
    if lista[indice] == valor:
        return indice
    return buscar_en_lista(lista, valor, indice + 1)

print(buscar_en_lista([4, 7, 2, 9], 2))   # 2
print(buscar_en_lista([4, 7, 2, 9], 5))   # -1`,
  },

  // ===== INTEGRADOR — Punto 9: Árboles y Grafos =====
  {
    id: 49,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 9,
    punto_titulo: 'Árboles y Grafos',
    dificultad: 'facil',
    enunciado: 'Completá el método buscar(dato) de un ABB ya implementado. Recibe un valor y retorna True si existe en el árbol o False si no.',
    codigo_base: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

class ABB:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        if not self.raiz:
            self.raiz = NodoArbol(valor)
            return
        actual = self.raiz
        while True:
            if valor < actual.valor:
                if actual.izquierdo:
                    actual = actual.izquierdo
                else:
                    actual.izquierdo = NodoArbol(valor)
                    return
            elif valor > actual.valor:
                if actual.derecho:
                    actual = actual.derecho
                else:
                    actual.derecho = NodoArbol(valor)
                    return
            else:
                return

    def buscar(self, dato):
        actual = self.raiz
        while actual:
            // ???
            // ???
            // ???
        return False

abb = ABB()
for v in [5, 3, 7, 2, 8]:
    abb.insertar(v)
print(abb.buscar(3))  # True
print(abb.buscar(4))  # False`,
    solucion: `class NodoArbol:
    def __init__(self, valor):
        self.valor = valor
        self.izquierdo = None
        self.derecho = None

class ABB:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        if not self.raiz:
            self.raiz = NodoArbol(valor)
            return
        actual = self.raiz
        while True:
            if valor < actual.valor:
                if actual.izquierdo:
                    actual = actual.izquierdo
                else:
                    actual.izquierdo = NodoArbol(valor)
                    return
            elif valor > actual.valor:
                if actual.derecho:
                    actual = actual.derecho
                else:
                    actual.derecho = NodoArbol(valor)
                    return
            else:
                return

    def buscar(self, dato):
        actual = self.raiz
        while actual:
            if dato == actual.valor:
                return True
            elif dato < actual.valor:
                actual = actual.izquierdo
            else:
                actual = actual.derecho
        return False

abb = ABB()
for v in [5, 3, 7, 2, 8]:
    abb.insertar(v)
print(abb.buscar(3))  # True
print(abb.buscar(4))  # False`,
  },
  {
    id: 50,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 9,
    punto_titulo: 'Árboles y Grafos',
    dificultad: 'intermedio',
    enunciado: 'Implementá la clase GrafoLista con: agregar_vertice(vertice), agregar_arista(origen, destino) y mostrar(). Creá un grafo con 4 ciudades (Buenos Aires, Córdoba, Rosario, Mendoza) y 3 conexiones. Mostrá el grafo.',
    pista: 'Usá un diccionario como lista de adyacencia. Cada vértice tiene una lista de vecinos.',
    solucion: `class GrafoLista:
    def __init__(self):
        self.vertices = {}

    def agregar_vertice(self, vertice):
        if vertice not in self.vertices:
            self.vertices[vertice] = []

    def agregar_arista(self, origen, destino):
        if origen in self.vertices and destino in self.vertices:
            self.vertices[origen].append(destino)
            self.vertices[destino].append(origen)

    def mostrar(self):
        for v, vecinos in self.vertices.items():
            print(f"{v}: {', '.join(vecinos)}")

g = GrafoLista()
for c in ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"]:
    g.agregar_vertice(c)
g.agregar_arista("Buenos Aires", "Córdoba")
g.agregar_arista("Buenos Aires", "Rosario")
g.agregar_arista("Córdoba", "Mendoza")
g.mostrar()`,
  },
  {
    id: 51,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 9,
    punto_titulo: 'Árboles y Grafos',
    dificultad: 'dificil',
    enunciado: 'Implementá dos programas:\n\n(1) ABB completo con insertar(), buscar() recursivo e inorden() que muestre los valores ordenados.\n(2) Verificador de paréntesis balanceados usando Pila con nodos (sin usar listas de Python).\n\nIncluí comentarios explicando cada decisión de implementación.',
    solucion: `# ========== 1. ABB COMPLETO ==========

class NodoABB:
    def __init__(self, valor):
        self.valor = valor
        self.izq = None  # subárbol izquierdo (menores)
        self.der = None  # subárbol derecho (mayores)

class ABB:
    def __init__(self):
        self.raiz = None

    def insertar(self, valor):
        """Inserta un valor en el ABB.
        Usa iteración para evitar desbordamiento de pila en árboles grandes."""
        if self.raiz is None:
            self.raiz = NodoABB(valor)
            return
        actual = self.raiz
        while True:
            if valor < actual.valor:
                if actual.izq is None:
                    actual.izq = NodoABB(valor)
                    return
                actual = actual.izq
            elif valor > actual.valor:
                if actual.der is None:
                    actual.der = NodoABB(valor)
                    return
                actual = actual.der
            else:
                return  # valor duplicado, no se inserta

    def buscar(self, valor):
        """Búsqueda recursiva. Retorna True si existe."""
        def _buscar(nodo):
            if nodo is None:
                return False
            if nodo.valor == valor:
                return True
            if valor < nodo.valor:
                return _buscar(nodo.izq)
            return _buscar(nodo.der)
        return _buscar(self.raiz)

    def inorden(self):
        """Recorrido inorden: izquierdo - raíz - derecho.
        Muestra los valores ordenados ascendentemente."""
        def _inorden(nodo):
            if nodo is None:
                return
            _inorden(nodo.izq)
            print(nodo.valor, end=" ")
            _inorden(nodo.der)
        _inorden(self.raiz)
        print()

# ========== 2. VERIFICADOR DE PARÉNTESIS ==========

class NodoPila:
    def __init__(self, dato):
        self.dato = dato
        self.sig = None  # apunta al nodo inferior en la pila

class Pila:
    """Pila implementada con nodos enlazados.
    push: O(1), pop: O(1). Sin límite de tamaño."""
    def __init__(self):
        self.tope = None

    def push(self, dato):
        nuevo = NodoPila(dato)
        nuevo.sig = self.tope  # el nuevo apunta al antiguo tope
        self.tope = nuevo      # el nuevo pasa a ser el tope

    def pop(self):
        if self.tope is None:
            return None
        dato = self.tope.dato
        self.tope = self.tope.sig  # baja el tope
        return dato

    def esta_vacia(self):
        return self.tope is None

def verificar_parentesis(expresion):
    """Verifica si los paréntesis están balanceados.
    Usa una Pila: cada ( abre, cada ) cierra."""
    pila = Pila()
    for c in expresion:
        if c == "(":
            pila.push(c)
        elif c == ")":
            if pila.esta_vacia():
                return False  # ) sin ( previo
            pila.pop()
    return pila.esta_vacia()  # True si todos los ( se cerraron

# Pruebas
print("=== ABB ===")
abb = ABB()
for v in [8, 3, 10, 1, 6, 14, 4, 7, 13]:
    abb.insertar(v)
print("Inorden:", end=" "); abb.inorden()
print("Buscar 6:", abb.buscar(6))
print("Buscar 9:", abb.buscar(9))

print("\\n=== Paréntesis ===")
print(verificar_parentesis("(())"))     # True
print(verificar_parentesis("(()"))      # False
print(verificar_parentesis(")(("))      # False`,
  },
];
