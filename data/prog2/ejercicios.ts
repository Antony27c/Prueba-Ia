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
    solucion: `nombre = input("Ingresá tu nombre: ")  # Ingresa dato
edad = input("Ingresá tu edad: ")  # Ingresa dato
edad = int(edad)  # Convierte a entero
print(f"Hola {nombre}, tenés {edad} años")  # Muestra`,
  },
  {
    id: 2,
    tp: 'TP01',
    tema: 'Variables y tipos',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que calcule el consumo eléctrico de un hogar. Pedí al usuario la cantidad de electrodomésticos, y para cada uno: nombre, potencia en watts y horas de uso diario. Mostrá el consumo total diario en kWh y el costo mensual (30 días) si el precio por kWh es $150. Usá funciones para organizar el código.',
    pista: 'Recordá que 1000 watts = 1 kW. Consumo diario = (potencia * horas) / 1000.',
    solucion: `def calcular_consumo_diario(potencia, horas):  # calcular consumo diario
    return (potencia * horas) / 1000  # Retorna

def main():  # Función principal
    cantidad = int(input("Cantidad de electrodomésticos: "))  # Ingresa entero
    total_kwh = 0  # Cero inicial
    for i in range(cantidad):  # Bucle for
        nombre = input(f"Nombre {i+1}: ")  # Ingresa dato
        potencia = float(input(f"Potencia de {nombre} (W): "))  # Ingresa decimal
        horas = float(input(f"Horas/día de {nombre}: "))  # Ingresa decimal
        consumo = calcular_consumo_diario(potencia, horas)
        total_kwh += consumo  # Acumula
        print(f"{nombre}: {consumo:.2f} kWh/día")  # Muestra
    print(f"\\nTotal diario: {total_kwh:.2f} kWh")  # Muestra
    print(f"Total mensual: {total_kwh * 30:.2f} kWh")  # Muestra
    print(f"Costo mensual: \${total_kwh * 30 * 150:.2f}")  # Muestra

main()`,
  },
  {
    id: 3,
    tp: 'TP01',
    tema: 'Variables y tipos',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de liquidación de sueldo que pida: nombre, sueldo básico, cantidad de horas extras y valor por hora extra. Calculá: sueldo bruto (básico + extras), descuento de jubilación (11%), descuento de obra social (3%), descuento de sindicato (2%), y sueldo neto. Mostrá un recibo detallado con todos los valores formateados con dos decimales y alineados.',
    solucion: `def liquidar_sueldo():  # liquidar sueldo
    nombre = input("Nombre del empleado: ")  # Ingresa dato
    basico = float(input("Sueldo básico: $"))  # Ingresa decimal
    horas_extras = int(input("Horas extras: "))  # Ingresa entero
    valor_extra = float(input("Valor por hora extra: $"))  # Ingresa decimal

    extras = horas_extras * valor_extra
    bruto = basico + extras
    jubilacion = bruto * 0.11
    obra_social = bruto * 0.03
    sindicato = bruto * 0.02
    descuentos = jubilacion + obra_social + sindicato
    neto = bruto - descuentos

    print("\\n" + "="*40)  # Muestra
    print(f"RECIBO DE SUELDO - {nombre}")  # Muestra
    print("="*40)  # Muestra
    print(f"Sueldo básico:      \${basico:>8.2f}")  # Muestra
    print(f"Horas extras:       \${extras:>8.2f}")  # Muestra
    print(f"Sueldo bruto:       \${bruto:>8.2f}")  # Muestra
    print(f"Jubilación (11%):   \${jubilacion:>8.2f}")  # Muestra
    print(f"Obra social (3%):   \${obra_social:>8.2f}")  # Muestra
    print(f"Sindicato (2%):     \${sindicato:>8.2f}")  # Muestra
    print(f"Total descuentos:   \${descuentos:>8.2f}")  # Muestra
    print("-"*40)  # Muestra
    print(f"SUELDO NETO:        \${neto:>8.2f}")  # Muestra
    print("="*40)  # Muestra

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
    solucion: `numero = float(input("Ingresá un número: "))  # Ingresa decimal
if numero > 0:  # Condición
    print("Positivo")  # Muestra
elif numero < 0:  # Sino si
    print("Negativo")  # Muestra
else:  # Sino
    print("Cero")  # Muestra`,
  },
  {
    id: 5,
    tp: 'TP02',
    tema: 'Condicionales',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que clasifique a una persona según su edad. Pedí el nombre y la edad. Validá que la edad sea un número entero positivo entre 0 y 120. Clasificá como: Bebé (0-2), Niño (3-12), Adolescente (13-17), Adulto (18-65), Adulto Mayor (66-120). Si la edad no está en el rango, mostrá "Edad no válida".',
    pista: 'Usá un if anidado o varias condiciones con elif. Validá primero que la edad esté en el rango permitido.',
    solucion: `nombre = input("Nombre: ")  # Ingresa dato
edad = int(input("Edad: "))  # Ingresa entero

if edad < 0 or edad > 120:  # Condición
    print("Edad no válida")  # Muestra
elif edad <= 2:  # Sino si
    print(f"{nombre} es Bebé")  # Muestra
elif edad <= 12:  # Sino si
    print(f"{nombre} es Niño")  # Muestra
elif edad <= 17:  # Sino si
    print(f"{nombre} es Adolescente")  # Muestra
elif edad <= 65:  # Sino si
    print(f"{nombre} es Adulto")  # Muestra
else:  # Sino
    print(f"{nombre} es Adulto Mayor")  # Muestra`,
  },
  {
    id: 6,
    tp: 'TP02',
    tema: 'Condicionales',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de descuentos por monto de compra. Pedí el monto total de la compra. Aplicá estos descuentos escalonados:\n- $0 - $5000: sin descuento\n- $5001 - $15000: 5%\n- $15001 - $30000: 10%\n- $30001 - $50000: 15%\n- Más de $50000: 20%\n- Si el día es miércoles o jueves, sumá un 2% adicional al descuento.\n- Si el método de pago es "efectivo", sumá un 3% adicional.\nMostrá el monto original, el descuento total aplicado y el monto final.',
    solucion: `def calcular_descuento(monto, dia, metodo_pago):  # calcular descuento
    if monto <= 5000:  # Condición
        desc = 0  # Cero inicial
    elif monto <= 15000:  # Sino si
        desc = 5
    elif monto <= 30000:  # Sino si
        desc = 10
    elif monto <= 50000:  # Sino si
        desc = 15
    else:  # Sino
        desc = 20

    if dia.lower() in ["miércoles", "miercoles", "jueves"]:  # Condición
        desc += 2  # Acumula
    if metodo_pago.lower() == "efectivo":  # Condición
        desc += 3  # Acumula

    return desc  # Retorna

def main():  # Función principal
    monto = float(input("Monto total de la compra: $"))  # Ingresa decimal
    dia = input("Día de la semana: ")  # Ingresa dato
    metodo = input("Método de pago: ")  # Ingresa dato

    desc_porcentaje = calcular_descuento(monto, dia, metodo)
    desc_aplicado = monto * desc_porcentaje / 100

    print(f"\\nMonto original:  \${monto:>8.2f}")  # Muestra
    print(f"Descuento ({desc_porcentaje}%): -\${desc_aplicado:>8.2f}")  # Muestra
    print(f"Monto final:     \${monto - desc_aplicado:>8.2f}")  # Muestra

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
    solucion: `numero = int(input("Ingresá un número: "))  # Ingresa entero
for i in range(1, 11):  # Bucle for
    print(f"{numero} x {i} = {numero * i}")  # Muestra`,
  },
  {
    id: 8,
    tp: 'TP03',
    tema: 'Bucles y colecciones',
    dificultad: 'intermedio',
    enunciado: 'Escribí un programa que pida al usuario la cantidad de números a ingresar, luego solicite esa cantidad de números uno por uno. Al final, mostrá: suma total, promedio, valor máximo y valor mínimo. No uses sum(), max() ni min() — implementá los cálculos manualmente.',
    pista: 'Inicializá maximo con un número muy chico y minimo con uno muy grande. Actualizalos en cada iteración.',
    solucion: `cantidad = int(input("Cantidad de números: "))  # Ingresa entero
suma = 0  # Cero inicial
maximo = float('-inf')  # Convierte a decimal
minimo = float('inf')  # Convierte a decimal

for i in range(cantidad):  # Bucle for
    num = float(input(f"Número {i+1}: "))  # Ingresa decimal
    suma += num  # Acumula
    if num > maximo:  # Condición
        maximo = num
    if num < minimo:  # Condición
        minimo = num

promedio = suma / cantidad
print(f"\\nSuma: {suma}")  # Muestra
print(f"Promedio: {promedio}")  # Muestra
print(f"Máximo: {maximo}")  # Muestra
print(f"Mínimo: {minimo}")  # Muestra`,
  },
  {
    id: 9,
    tp: 'TP03',
    tema: 'Bucles y colecciones',
    dificultad: 'dificil',
    enunciado: 'Analizá una lista de números sin usar sum(), max() ni min(). Pedí números hasta que el usuario ingrese "fin". Al terminar: mostrá la suma, el promedio (con 2 decimales), el máximo, el mínimo, la cantidad de pares e impares, y si la lista está ordenada ascendentemente. Implementá todo manualmente con bucles.',
    solucion: `numeros = []  # Lista vacía
print("Ingresá números (escribí 'fin' para terminar):")  # Muestra
while True:  # Bucle while
    entrada = input()  # Ingresa dato
    if entrada.lower() == "fin":  # Condición
        break
    numeros.append(float(entrada))  # Agrega elemento

if not numeros:  # Si negativo/vacío
    print("No se ingresaron números")  # Muestra
else:  # Sino
    suma = 0  # Cero inicial
    maximo = numeros[0]
    minimo = numeros[0]
    pares = 0  # Cero inicial
    ordenado = True  # True

    for i, num in enumerate(numeros):  # Bucle for
        suma += num  # Acumula
        if num > maximo:  # Condición
            maximo = num
        if num < minimo:  # Condición
            minimo = num
        if num % 2 == 0:  # Condición
            pares += 1  # Acumula
        if i > 0 and numeros[i] < numeros[i-1]:  # Condición
            ordenado = False  # False

    promedio = suma / len(numeros)
    impares = len(numeros) - pares

    print(f"\\nSuma: {suma}")  # Muestra
    print(f"Promedio: {promedio:.2f}")  # Muestra
    print(f"Máximo: {maximo}")  # Muestra
    print(f"Mínimo: {minimo}")  # Muestra
    print(f"Pares: {pares}")  # Muestra
    print(f"Impares: {impares}")  # Muestra
    print(f"Ordenada: {'Sí' if ordenado else 'No'}")  # Muestra`,
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
    solucion: `def es_multiplo(numero, divisor):  # es multiplo
    if divisor == 0:  # Condición
        return False  # Retorna
    return numero % divisor == 0  # Retorna

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
    solucion: `def analizar_numeros(lista):  # analizar numeros
    if not lista:  # Si negativo/vacío
        return {"minimo": None, "maximo": None, "promedio": None}  # Retorna
    minimo = lista[0]
    maximo = lista[0]
    suma = 0  # Cero inicial
    for num in lista:  # Bucle for
        suma += num  # Acumula
        if num < minimo:  # Condición
            minimo = num
        if num > maximo:  # Condición
            maximo = num
    promedio = suma / len(lista)
    return {"minimo": minimo, "maximo": maximo, "promedio": promedio}  # Retorna

def main():  # Función principal
    entrada = input("Ingresá números separados por espacio: ")  # Ingresa dato
    numeros = [float(x) for x in entrada.split()]
    resultado = analizar_numeros(numeros)
    print(f"Mínimo: {resultado['minimo']}")  # Muestra
    print(f"Máximo: {resultado['maximo']}")  # Muestra
    print(f"Promedio: {resultado['promedio']:.2f}")  # Muestra

main()`,
  },
  {
    id: 12,
    tp: 'TP04',
    tema: 'Funciones',
    dificultad: 'dificil',
    enunciado: 'Implementá una función pedir_calificacion() que pida al usuario una nota numérica (0-10) y valide que sea un número válido. Si el usuario ingresa algo que no es un número, debe mostrar "Error: debe ingresar un número" y volver a pedir. Si está fuera del rango, mostrar "Error: la nota debe estar entre 0 y 10" y volver a pedir. La función debe retornar la nota válida como float. Luego, usala para pedir 5 notas, calcular el promedio y mostrar si está aprobado (>=6) o desaprobado.',
    solucion: `def pedir_calificacion():  # pedir calificacion
    while True:  # Bucle while
        entrada = input("Ingresá una nota (0-10): ")  # Ingresa dato
        try:  # Intenta
            nota = float(entrada)  # Convierte a decimal
            if 0 <= nota <= 10:  # Condición
                return nota  # Retorna
            else:  # Sino
                print("Error: la nota debe estar entre 0 y 10")  # Muestra
        except ValueError:  # Captura error
            print("Error: debe ingresar un número")  # Muestra

def main():  # Función principal
    notas = []  # Lista vacía
    for i in range(5):  # Bucle for
        nota = pedir_calificacion()
        notas.append(nota)  # Agrega elemento

    promedio = sum(notas) / len(notas)
    print(f"\\nNotas: {notas}")  # Muestra
    print(f"Promedio: {promedio:.2f}")  # Muestra
    if promedio >= 6:  # Condición
        print("Estado: Aprobado")  # Muestra
    else:  # Sino
        print("Estado: Desaprobado")  # Muestra

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
    solucion: `class Libro:  # Libro
    def __init__(self, titulo, autor, año):  # Constructor
        self.titulo = titulo  # Atributo instancia
        self.autor = autor  # Atributo instancia
        self.año = año

    def descripcion(self):  # descripcion
        return f"{self.titulo} - {self.autor} ({self.año})"  # Retorna

libro = Libro("Cien Años de Soledad", "Gabriel García Márquez", 1967)
print(libro.descripcion())  # Muestra`,
  },
  {
    id: 14,
    tp: 'TP05',
    tema: 'POO',
    dificultad: 'intermedio',
    enunciado: 'Creá la clase CuentaBancaria con: __init__(titular, saldo_inicial=0), depositar(monto), extraer(monto) (validando que haya saldo suficiente), mostrar_saldo() que imprima el saldo con formato "$ X.XX", y una propiedad saldo_formateado que retorne el saldo como string con formato. Probá la clase con operaciones de depósito y extracción.',
    pista: 'Usá type hints y manejá el caso de extraer más de lo que hay con un mensaje de error.',
    solucion: `class CuentaBancaria:  # Cuenta bancaria
    def __init__(self, titular: str, saldo_inicial: float = 0):  # Constructor
        self.titular = titular  # Atributo instancia
        self._saldo = saldo_inicial  # Atributo instancia

    def depositar(self, monto: float) -> None:  # depositar
        if monto <= 0:  # Condición
            print("El monto debe ser positivo")  # Muestra
            return
        self._saldo += monto  # Acumula
        print(f"Depósito de \${monto:.2f} realizado")  # Muestra

    def extraer(self, monto: float) -> None:  # extraer
        if monto <= 0:  # Condición
            print("El monto debe ser positivo")  # Muestra
            return
        if monto > self._saldo:  # Condición
            print("Saldo insuficiente")  # Muestra
            return
        self._saldo -= monto  # Decrementa
        print(f"Extracción de \${monto:.2f} realizada")  # Muestra

    def mostrar_saldo(self) -> None:  # mostrar saldo
        print(f"Saldo: \${self._saldo:.2f}")  # Muestra

    @property
    def saldo_formateado(self) -> str:  # saldo formateado
        return f"$ {self._saldo:.2f}"  # Retorna

# Prueba
c = CuentaBancaria("Ana", 1000)
c.depositar(500)
c.extraer(200)
c.mostrar_saldo()
print(c.saldo_formateado)  # Muestra`,
  },
  {
    id: 15,
    tp: 'TP05',
    tema: 'POO',
    dificultad: 'dificil',
    enunciado: 'Implementá la clase Vehiculo completa. Debe tener: marca, modelo, año, velocidad_actual (privada), encendido (booleano privado). Métodos: encender(), apagar(), acelerar(km_h) (solo si está encendido), frenar(km_h), y __str__ que muestre todos los datos. Además, implementá una clase Auto que herede de Vehiculo y agregue cantidad_puertas y tipo_combustible, sobrescribiendo __str__ para agregar estos datos.',
    solucion: `class Vehiculo:  # Vehículo
    def __init__(self, marca: str, modelo: str, año: int):  # Constructor
        self.marca = marca  # Atributo instancia
        self.modelo = modelo  # Atributo instancia
        self.año = año
        self._velocidad = 0  # Atributo instancia
        self._encendido = False  # Atributo instancia

    def encender(self):  # encender
        if self._encendido:  # Condición
            print("Ya está encendido")  # Muestra
        else:  # Sino
            self._encendido = True  # Atributo instancia
            print("Vehículo encendido")  # Muestra

    def apagar(self):  # apagar
        if not self._encendido:  # Si negativo/vacío
            print("Ya está apagado")  # Muestra
        else:  # Sino
            self._encendido = False  # Atributo instancia
            self._velocidad = 0  # Atributo instancia
            print("Vehículo apagado")  # Muestra

    def acelerar(self, km_h: float):  # acelerar
        if not self._encendido:  # Si negativo/vacío
            print("No se puede acelerar: vehículo apagado")  # Muestra
            return
        self._velocidad += km_h  # Acumula
        print(f"Acelerando a {self._velocidad} km/h")  # Muestra

    def frenar(self, km_h: float):  # frenar
        if self._velocidad - km_h < 0:  # Condición
            self._velocidad = 0  # Atributo instancia
        else:  # Sino
            self._velocidad -= km_h  # Decrementa
        print(f"Velocidad actual: {self._velocidad} km/h")  # Muestra

    def __str__(self):  # Representación textual
        estado = "encendido" if self._encendido else "apagado"
        return f"{self.marca} {self.modelo} ({self.año}) - {estado} - {self._velocidad} km/h"  # Retorna

class Auto(Vehiculo):  # Auto (hereda Vehiculo)
    def __init__(self, marca, modelo, año, puertas: int, combustible: str):  # Constructor
        super().__init__(marca, modelo, año)  # Llama al padre
        self.puertas = puertas  # Atributo instancia
        self.combustible = combustible  # Atributo instancia

    def __str__(self):  # Representación textual
        base = super().__str__()
        return f"{base} - {self.puertas} puertas - {self.combustible}"  # Retorna`,
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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

nodo1 = Nodo("A")
nodo2 = Nodo("B")
nodo3 = Nodo("C")

nodo1.siguiente = nodo2
nodo2.siguiente = nodo3

actual = nodo1
while actual:  # Bucle while
    print(actual.dato, end=" -> ")  # Muestra
    actual = actual.siguiente
print("None")  # Muestra`,
  },
  {
    id: 17,
    tp: 'TP06',
    tema: 'Listas enlazadas',
    dificultad: 'intermedio',
    enunciado: 'Implementá la clase ListaEnlazada con los métodos esta_vacia() que retorne True si la lista no tiene elementos, e insertar_inicio(dato) que agregue un nuevo nodo al principio de la lista. Incluí también el método recorrer() que muestre los elementos.',
    pista: 'insertar_inicio debe crear un nuevo nodo, enlazar su siguiente a la cabeza actual, y actualizar la cabeza al nuevo nodo.',
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class ListaEnlazada:  # Lista enlazada simple
    def __init__(self):  # Constructor
        self.cabeza = None  # Atributo instancia

    def esta_vacia(self):  # Verifica si vacía
        return self.cabeza is None  # Retorna

    def insertar_inicio(self, dato):  # Inserta al inicio
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo  # Atributo instancia

    def recorrer(self):  # Recorre elementos
        actual = self.cabeza
        while actual:  # Bucle while
            print(actual.dato, end=" -> ")  # Muestra
            actual = actual.siguiente
        print("None")  # Muestra`,
  },
  {
    id: 18,
    tp: 'TP06',
    tema: 'Listas enlazadas',
    dificultad: 'dificil',
    enunciado: 'Implementá una lista enlazada completa con los métodos: insertar_inicio(dato), insertar_fin(dato), eliminar(dato), contar() que retorne la cantidad de nodos, y buscar(dato) que retorne True si el dato existe. Incluí la clase Nodo y ListaEnlazada.',
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class ListaEnlazada:  # Lista enlazada simple
    def __init__(self):  # Constructor
        self.cabeza = None  # Atributo instancia

    def insertar_inicio(self, dato):  # Inserta al inicio
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo  # Atributo instancia

    def insertar_fin(self, dato):  # Inserta al final
        nuevo = Nodo(dato)
        if self.cabeza is None:  # Condición
            self.cabeza = nuevo  # Atributo instancia
            return
        actual = self.cabeza
        while actual.siguiente:  # Bucle while
            actual = actual.siguiente
        actual.siguiente = nuevo

    def eliminar(self, dato):  # Elimina elemento
        if self.cabeza is None:  # Condición
            return
        if self.cabeza.dato == dato:  # Condición
            self.cabeza = self.cabeza.siguiente  # Atributo instancia
            return
        actual = self.cabeza
        while actual.siguiente:  # Bucle while
            if actual.siguiente.dato == dato:  # Condición
                actual.siguiente = actual.siguiente.siguiente
                return
            actual = actual.siguiente

    def contar(self):  # Cuenta elementos
        cont = 0  # Cero inicial
        actual = self.cabeza
        while actual:  # Bucle while
            cont += 1  # Acumula
            actual = actual.siguiente
        return cont  # Retorna

    def buscar(self, dato):  # Busca elemento
        actual = self.cabeza
        while actual:  # Bucle while
            if actual.dato == dato:  # Condición
                return True  # Retorna
            actual = actual.siguiente
        return False  # Retorna

    def recorrer(self):  # Recorre elementos
        actual = self.cabeza
        while actual:  # Bucle while
            print(actual.dato, end=" -> ")  # Muestra
            actual = actual.siguiente
        print("None")  # Muestra`,
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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Pila:  # Pila LIFO
    def __init__(self):  # Constructor
        self.tope = None  # Atributo instancia

    def push(self, dato):  # Apila elemento
        nuevo = Nodo(dato)
        nuevo.siguiente = self.tope
        self.tope = nuevo  # Atributo instancia

    def pop(self):  # Desapila elemento
        if self.esta_vacia():  # Condición
            return None  # Retorna
        dato = self.tope.dato
        self.tope = self.tope.siguiente  # Atributo instancia
        return dato  # Retorna

    def esta_vacia(self):  # Verifica si vacía
        return self.tope is None  # Retorna

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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Cola:  # Cola FIFO
    def __init__(self):  # Constructor
        self.frente = None  # Atributo instancia
        self.final = None  # Atributo instancia

    def es_vacia(self):  # Verifica si vacía
        return self.frente is None  # Retorna

    def enqueue(self, dato):  # Encola elemento
        nuevo = Nodo(dato)
        if self.es_vacia():  # Condición
            self.frente = nuevo  # Atributo instancia
            self.final = nuevo  # Atributo instancia
        else:  # Sino
            self.final.siguiente = nuevo
            self.final = nuevo  # Atributo instancia

    def dequeue(self):  # Desencola elemento
        if self.es_vacia():  # Condición
            return None  # Retorna
        dato = self.frente.dato
        self.frente = self.frente.siguiente  # Atributo instancia
        if self.frente is None:  # Condición
            self.final = None  # Atributo instancia
        return dato  # Retorna`,
  },
  {
    id: 21,
    tp: 'TP07',
    tema: 'Pilas y colas',
    dificultad: 'dificil',
    enunciado: 'Implementá una simulación de atención de clientes usando una cola. Cada cliente tiene nombre y tipo ("preferencial" o "regular"). Los clientes preferenciales tienen prioridad y deben ser atendidos antes que los regulares. Usá dos colas (una preferencial y una regular). El programa debe: registrar clientes, atender al siguiente según prioridad, y mostrar el estado de la cola. Implementá con nodos enlazados.',
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Cola:  # Cola FIFO
    def __init__(self):  # Constructor
        self.frente = None  # Atributo instancia
        self.final = None  # Atributo instancia

    def es_vacia(self):  # Verifica si vacía
        return self.frente is None  # Retorna

    def encolar(self, dato):  # encolar
        nuevo = Nodo(dato)
        if self.es_vacia():  # Condición
            self.frente = nuevo  # Atributo instancia
            self.final = nuevo  # Atributo instancia
        else:  # Sino
            self.final.siguiente = nuevo
            self.final = nuevo  # Atributo instancia

    def desencolar(self):  # desencolar
        if self.es_vacia():  # Condición
            return None  # Retorna
        dato = self.frente.dato
        self.frente = self.frente.siguiente  # Atributo instancia
        if self.frente is None:  # Condición
            self.final = None  # Atributo instancia
        return dato  # Retorna

    def __len__(self):  # Cantidad de elementos
        cont = 0  # Cero inicial
        actual = self.frente
        while actual:  # Bucle while
            cont += 1  # Acumula
            actual = actual.siguiente
        return cont  # Retorna

class SistemaAtencion:  # Sistema atención
    def __init__(self):  # Constructor
        self.preferencial = Cola()  # Atributo instancia
        self.regular = Cola()  # Atributo instancia

    def registrar_cliente(self, nombre, tipo):  # registrar cliente
        cliente = {"nombre": nombre, "tipo": tipo}
        if tipo == "preferencial":  # Condición
            self.preferencial.encolar(cliente)
        else:  # Sino
            self.regular.encolar(cliente)
        print(f"Cliente {nombre} ({tipo}) registrado")  # Muestra

    def atender_siguiente(self):  # atender siguiente
        if not self.preferencial.es_vacia():  # Si negativo/vacío
            cliente = self.preferencial.desencolar()
        elif not self.regular.es_vacia():  # Sino si
            cliente = self.regular.desencolar()
        else:  # Sino
            print("No hay clientes en espera")  # Muestra
            return
        print(f"Atendiendo a {cliente['nombre']} ({cliente['tipo']})")  # Muestra

    def mostrar_estado(self):  # mostrar estado
        pref = len(self.preferencial)
        reg = len(self.regular)
        print(f"\\nClientes en espera: {pref + reg}")  # Muestra
        print(f"Preferenciales: {pref}")  # Muestra
        print(f"Regulares: {reg}")  # Muestra`,
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
    solucion: `def factorial(n):  # factorial
    if n == 0:  # Condición
        return 1  # Retorna
    return n * factorial(n - 1)  # Retorna

print(factorial(5))  # 120`,
  },
  {
    id: 23,
    tp: 'TP08',
    tema: 'Recursividad',
    dificultad: 'intermedio',
    enunciado: 'Implementá una función recursiva potencia(base, exponente) que calcule base^exponente sin usar el operador **. Resolvelo con recursión. Considerá que cualquier número elevado a 0 da 1.',
    pista: 'La potencia se define como base * potencia(base, exponente-1). El caso base es exponente == 0 que retorna 1.',
    solucion: `def potencia(base, exponente):  # potencia
    if exponente == 0:  # Condición
        return 1  # Retorna
    if exponente < 0:  # Condición
        return 1 / potencia(base, -exponente)  # Retorna
    return base * potencia(base, exponente - 1)  # Retorna

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
    solucion: `def buscar_en_lista(lista, valor, indice=0):  # buscar en lista
    if indice >= len(lista):  # Condición
        return -1  # Retorna
    if lista[indice] == valor:  # Condición
        return indice  # Retorna
    return buscar_en_lista(lista, valor, indice + 1)  # Retorna

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
    solucion: `nombre = input("Ingresá tu nombre: ")  # Ingresa dato
edad = int(input("Ingresá tu edad: "))  # Ingresa entero
print(f"Hola {nombre}, tenés {edad} años")  # Muestra`,
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
    solucion: `def pedir_positivo(mensaje):  # pedir positivo
    while True:  # Bucle while
        try:  # Intenta
            valor = float(input(mensaje))  # Ingresa decimal
            if valor > 0:  # Condición
                return valor  # Retorna
            print("Debe ser un número positivo")  # Muestra
        except ValueError:  # Captura error
            print("Debe ingresar un número")  # Muestra

def main():  # Función principal
    nombre = input("Nombre del electrodoméstico: ")  # Ingresa dato
    potencia = pedir_positivo("Potencia (W): ")
    horas = pedir_positivo("Horas de uso diario: ")
    consumo_diario = (potencia * horas) / 1000
    costo_mensual = consumo_diario * 30 * 150
    print(f"\\n{nombre}: {consumo_diario:.2f} kWh/día")  # Muestra
    print(f"Costo mensual: \${costo_mensual:.2f}")  # Muestra

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
    solucion: `def liquidar():  # Liquida sueldo
    nombre = input("Nombre del empleado: ")  # Ingresa dato
    basico = float(input("Sueldo básico: $"))  # Ingresa decimal
    horas_extra = int(input("Horas extras: "))  # Ingresa entero
    valor_extra = float(input("Valor por hora extra: $"))  # Ingresa decimal

    extras = horas_extra * valor_extra
    bruto = basico + extras
    jubilacion = bruto * 0.11
    obra_social = bruto * 0.03
    sindicato = bruto * 0.02
    descuentos = jubilacion + obra_social + sindicato
    neto = bruto - descuentos

    print("\\n" + "="*40)  # Muestra
    print(f"RECIBO - {nombre}")  # Muestra
    print("="*40)  # Muestra
    print(f"Básico:         \${basico:>8.2f}")  # Muestra
    print(f"Extras:         \${extras:>8.2f}")  # Muestra
    print(f"Bruto:          \${bruto:>8.2f}")  # Muestra
    print(f"Jubilación:     \${jubilacion:>8.2f}")  # Muestra
    print(f"Obra social:    \${obra_social:>8.2f}")  # Muestra
    print(f"Sindicato:      \${sindicato:>8.2f}")  # Muestra
    print(f"Descuentos:     \${descuentos:>8.2f}")  # Muestra
    print("-"*40)  # Muestra
    print(f"NETO:           \${neto:>8.2f}")  # Muestra

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
    solucion: `numero = float(input("Ingresá un número: "))  # Ingresa decimal
if numero > 0:  # Condición
    print("Positivo")  # Muestra
elif numero < 0:  # Sino si
    print("Negativo")  # Muestra
else:  # Sino
    print("Cero")  # Muestra`,
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
    solucion: `nombre = input("Nombre: ")  # Ingresa dato
edad = int(input("Edad: "))  # Ingresa entero

if edad < 0:  # Condición
    print("Edad no válida")  # Muestra
elif edad <= 2:  # Sino si
    print(f"{nombre} es Bebé")  # Muestra
elif edad <= 12:  # Sino si
    print(f"{nombre} es Niño")  # Muestra
elif edad <= 17:  # Sino si
    print(f"{nombre} es Adolescente")  # Muestra
elif edad <= 65:  # Sino si
    print(f"{nombre} es Adulto")  # Muestra
elif edad <= 120:  # Sino si
    print(f"{nombre} es Adulto Mayor")  # Muestra
else:  # Sino
    print("Edad no válida")  # Muestra`,
  },
  {
    id: 30,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 2,
    punto_titulo: 'Estructuras condicionales',
    dificultad: 'dificil',
    enunciado: 'Implementá un sistema de descuentos por monto de compra. Pedí el monto total. Aplicá: $0-$5000: 0%, $5001-$15000: 5%, $15001-$30000: 10%, $30001-$50000: 15%, más de $50000: 20%. Si el día es miércoles o jueves, sumá 2% adicional. Mostrá monto original, descuento total y monto final.',
    solucion: `def calcular_descuento(monto, dia):  # calcular descuento
    if monto <= 5000:  # Condición
        desc = 0  # Cero inicial
    elif monto <= 15000:  # Sino si
        desc = 5
    elif monto <= 30000:  # Sino si
        desc = 10
    elif monto <= 50000:  # Sino si
        desc = 15
    else:  # Sino
        desc = 20
    if dia.lower() in ["miércoles", "miercoles", "jueves"]:  # Condición
        desc += 2  # Acumula
    return desc  # Retorna

monto = float(input("Monto total: $"))  # Ingresa decimal
dia = input("Día de la semana: ")  # Ingresa dato
desc = calcular_descuento(monto, dia)
total_desc = monto * desc / 100
print(f"Original: \${monto:.2f}")  # Muestra
print(f"Descuento ({desc}%): -\${total_desc:.2f}")  # Muestra
print(f"Final: \${monto - total_desc:.2f}")  # Muestra`,
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
    solucion: `numero = int(input("Ingresá un número: "))  # Ingresa entero
for i in range(1, 11):  # Bucle for
    print(f"{numero} x {i} = {numero * i}")  # Muestra`,
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
    solucion: `cantidad = int(input("Cantidad de números: "))  # Ingresa entero
suma = 0  # Cero inicial
maximo = float("-inf")  # Convierte a decimal
minimo = float("inf")  # Convierte a decimal

for i in range(cantidad):  # Bucle for
    num = float(input(f"Número {i+1}: "))  # Ingresa decimal
    suma += num  # Acumula
    if num > maximo:  # Condición
        maximo = num
    if num < minimo:  # Condición
        minimo = num

promedio = suma / cantidad
print(f"Suma: {suma}")  # Muestra
print(f"Promedio: {promedio:.2f}")  # Muestra
print(f"Máximo: {maximo}")  # Muestra
print(f"Mínimo: {minimo}")  # Muestra`,
  },
  {
    id: 33,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 3,
    punto_titulo: 'Bucles y colecciones',
    dificultad: 'dificil',
    enunciado: 'Analizá una lista de números sin usar sum(), max() ni min(). Pedí números hasta que el usuario ingrese "fin". Mostrá: suma, promedio (2 decimales), máximo, mínimo, cantidad de pares e impares, y si la lista está ordenada ascendentemente. Todo con bucles manuales.',
    solucion: `numeros = []  # Lista vacía
print("Ingresá números (escribí 'fin' para terminar):")  # Muestra
while True:  # Bucle while
    entrada = input()  # Ingresa dato
    if entrada.lower() == "fin":  # Condición
        break
    numeros.append(float(entrada))  # Agrega elemento

if not numeros:  # Si negativo/vacío
    print("No se ingresaron números")  # Muestra
else:  # Sino
    suma = 0  # Cero inicial
    maximo = numeros[0]
    minimo = numeros[0]
    pares = 0  # Cero inicial
    ordenado = True  # True

    for i, num in enumerate(numeros):  # Bucle for
        suma += num  # Acumula
        if num > maximo:  # Condición
            maximo = num
        if num < minimo:  # Condición
            minimo = num
        if num % 2 == 0:  # Condición
            pares += 1  # Acumula
        if i > 0 and numeros[i] < numeros[i-1]:  # Condición
            ordenado = False  # False

    promedio = suma / len(numeros)
    impares = len(numeros) - pares
    print(f"Suma: {suma}")  # Muestra
    print(f"Promedio: {promedio:.2f}")  # Muestra
    print(f"Máximo: {maximo}")  # Muestra
    print(f"Mínimo: {minimo}")  # Muestra
    print(f"Pares: {pares}")  # Muestra
    print(f"Impares: {impares}")  # Muestra
    print(f"Ordenada: {'Sí' if ordenado else 'No'}")  # Muestra`,
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
    solucion: `def es_multiplo(numero, divisor):  # es multiplo
    if numero % divisor == 0:  # Condición
        return True  # Retorna
    return False  # Retorna

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
    solucion: `def analizar_lista(lista):  # analizar lista
    if not lista:  # Si negativo/vacío
        return (None, None, None)  # Retorna
    minimo = lista[0]
    maximo = lista[0]
    suma = 0  # Cero inicial
    for num in lista:  # Bucle for
        suma += num  # Acumula
        if num < minimo:  # Condición
            minimo = num
        if num > maximo:  # Condición
            maximo = num
    promedio = suma / len(lista)
    return (minimo, maximo, promedio)  # Retorna

entrada = input("Números separados por espacio: ")  # Ingresa dato
numeros = [float(x) for x in entrada.split()]
minimo, maximo, promedio = analizar_lista(numeros)
print(f"Mínimo: {minimo}, Máximo: {maximo}, Promedio: {promedio:.2f}")  # Muestra`,
  },
  {
    id: 36,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 4,
    punto_titulo: 'Funciones',
    dificultad: 'dificil',
    enunciado: 'Implementá una función pedir_calificacion() que pida una nota (0-10). Validá que sea un número (si no, mostrá "Error: debe ingresar un número" y repetí) y que esté entre 0 y 10 (si no, mostrá "Error: la nota debe estar entre 0 y 10" y repetí). Usala para pedir 5 notas y mostrar el promedio. Aprobado si >= 6.',
    solucion: `def pedir_calificacion():  # pedir calificacion
    while True:  # Bucle while
        entrada = input("Nota (0-10): ")  # Ingresa dato
        try:  # Intenta
            nota = float(entrada)  # Convierte a decimal
            if 0 <= nota <= 10:  # Condición
                return nota  # Retorna
            print("Error: la nota debe estar entre 0 y 10")  # Muestra
        except ValueError:  # Captura error
            print("Error: debe ingresar un número")  # Muestra

notas = [pedir_calificacion() for _ in range(5)]
promedio = sum(notas) / len(notas)
print(f"Promedio: {promedio:.2f}")  # Muestra
print("Aprobado" if promedio >= 6 else "Desaprobado")  # Muestra`,
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
    solucion: `class Libro:  # Libro
    def __init__(self, titulo, autor, año):  # Constructor
        self.titulo = titulo  # Atributo instancia
        self.autor = autor  # Atributo instancia
        self.año = año

    def descripcion(self):  # descripcion
        return f"{self.titulo} - {self.autor} ({self.año})"  # Retorna

libro = Libro("1984", "George Orwell", 1949)
print(libro.descripcion())  # Muestra`,
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
    solucion: `class CuentaBancaria:  # Cuenta bancaria
    def __init__(self, titular, saldo_inicial=0):  # Constructor
        self.titular = titular  # Atributo instancia
        self._saldo = saldo_inicial  # Atributo instancia

    def depositar(self, monto):  # depositar
        if monto > 0:  # Condición
            self._saldo += monto  # Acumula
            print(f"Depósito de \${monto:.2f} realizado")  # Muestra
        else:  # Sino
            print("El monto debe ser positivo")  # Muestra

    def extraer(self, monto):  # extraer
        if monto > self._saldo:  # Condición
            print("Saldo insuficiente")  # Muestra
        elif monto > 0:  # Sino si
            self._saldo -= monto  # Decrementa
            print(f"Extracción de \${monto:.2f} realizada")  # Muestra
        else:  # Sino
            print("El monto debe ser positivo")  # Muestra

    def mostrar_saldo(self):  # mostrar saldo
        print(f"Saldo: \${self._saldo:.2f}")  # Muestra

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
    solucion: `class Vehiculo:  # Vehículo
    def __init__(self, marca, modelo, año):  # Constructor
        self.marca = marca  # Atributo instancia
        self.modelo = modelo  # Atributo instancia
        self.año = año
        self._velocidad = 0  # Atributo instancia
        self._encendido = False  # Atributo instancia

    def encender(self):  # encender
        if self._encendido:  # Condición
            print("Ya está encendido")  # Muestra
        else:  # Sino
            self._encendido = True  # Atributo instancia
            print("Vehículo encendido")  # Muestra

    def apagar(self):  # apagar
        if not self._encendido:  # Si negativo/vacío
            print("Ya está apagado")  # Muestra
        else:  # Sino
            self._encendido = False  # Atributo instancia
            self._velocidad = 0  # Atributo instancia
            print("Vehículo apagado")  # Muestra

    def acelerar(self, km_h):  # acelerar
        if not self._encendido:  # Si negativo/vacío
            print("No se puede: vehículo apagado")  # Muestra
        else:  # Sino
            self._velocidad += km_h  # Acumula
            print(f"Velocidad: {self._velocidad} km/h")  # Muestra

    def frenar(self, km_h):  # frenar
        self._velocidad = max(0, self._velocidad - km_h)  # Atributo instancia
        print(f"Velocidad: {self._velocidad} km/h")  # Muestra

    def __str__(self):  # Representación textual
        estado = "encendido" if self._encendido else "apagado"
        return f"{self.marca} {self.modelo} ({self.año}) - {estado} - {self._velocidad} km/h"  # Retorna

class Auto(Vehiculo):  # Auto (hereda Vehiculo)
    def __init__(self, marca, modelo, año, puertas, combustible):  # Constructor
        super().__init__(marca, modelo, año)  # Llama al padre
        self.puertas = puertas  # Atributo instancia
        self.combustible = combustible  # Atributo instancia

    def __str__(self):  # Representación textual
        return super().__str__() + f" - {self.puertas} puertas - {self.combustible}"  # Retorna`,
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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

nodo1 = Nodo("X")
nodo2 = Nodo("Y")
nodo3 = Nodo("Z")

nodo1.siguiente = nodo2
nodo2.siguiente = nodo3

actual = nodo1
while actual:  # Bucle while
    print(actual.dato, end=" -> ")  # Muestra
    actual = actual.siguiente
print("None")  # Muestra`,
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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class ListaEnlazada:  # Lista enlazada simple
    def __init__(self):  # Constructor
        self.cabeza = None  # Atributo instancia

    def esta_vacia(self):  # Verifica si vacía
        return self.cabeza is None  # Retorna

    def insertar_inicio(self, dato):  # Inserta al inicio
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo  # Atributo instancia

    def recorrer(self):  # Recorre elementos
        actual = self.cabeza
        while actual:  # Bucle while
            print(actual.dato, end=" -> ")  # Muestra
            actual = actual.siguiente
        print("None")  # Muestra`,
  },
  {
    id: 42,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 6,
    punto_titulo: 'Listas enlazadas',
    dificultad: 'dificil',
    enunciado: 'Implementá ListaEnlazada completa con: insertar_inicio(dato), insertar_fin(dato), eliminar(dato), contar() que retorne cantidad de nodos, y buscar(dato) que retorne True si existe. Incluí Nodo y recorrer().',
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class ListaEnlazada:  # Lista enlazada simple
    def __init__(self):  # Constructor
        self.cabeza = None  # Atributo instancia

    def insertar_inicio(self, dato):  # Inserta al inicio
        nuevo = Nodo(dato)
        nuevo.siguiente = self.cabeza
        self.cabeza = nuevo  # Atributo instancia

    def insertar_fin(self, dato):  # Inserta al final
        nuevo = Nodo(dato)
        if self.cabeza is None:  # Condición
            self.cabeza = nuevo  # Atributo instancia
            return
        actual = self.cabeza
        while actual.siguiente:  # Bucle while
            actual = actual.siguiente
        actual.siguiente = nuevo

    def eliminar(self, dato):  # Elimina elemento
        if self.cabeza is None:  # Condición
            return
        if self.cabeza.dato == dato:  # Condición
            self.cabeza = self.cabeza.siguiente  # Atributo instancia
            return
        actual = self.cabeza
        while actual.siguiente:  # Bucle while
            if actual.siguiente.dato == dato:  # Condición
                actual.siguiente = actual.siguiente.siguiente
                return
            actual = actual.siguiente

    def contar(self):  # Cuenta elementos
        cont = 0  # Cero inicial
        actual = self.cabeza
        while actual:  # Bucle while
            cont += 1  # Acumula
            actual = actual.siguiente
        return cont  # Retorna

    def buscar(self, dato):  # Busca elemento
        actual = self.cabeza
        while actual:  # Bucle while
            if actual.dato == dato:  # Condición
                return True  # Retorna
            actual = actual.siguiente
        return False  # Retorna

    def recorrer(self):  # Recorre elementos
        actual = self.cabeza
        while actual:  # Bucle while
            print(actual.dato, end=" -> ")  # Muestra
            actual = actual.siguiente
        print("None")  # Muestra`,
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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Pila:  # Pila LIFO
    def __init__(self):  # Constructor
        self.tope = None  # Atributo instancia

    def push(self, dato):  # Apila elemento
        nuevo = Nodo(dato)
        nuevo.siguiente = self.tope
        self.tope = nuevo  # Atributo instancia

    def pop(self):  # Desapila elemento
        if self.tope is None:  # Condición
            return None  # Retorna
        dato = self.tope.dato
        self.tope = self.tope.siguiente  # Atributo instancia
        return dato  # Retorna

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
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Cola:  # Cola FIFO
    def __init__(self):  # Constructor
        self.frente = None  # Atributo instancia
        self.final = None  # Atributo instancia

    def es_vacia(self):  # Verifica si vacía
        return self.frente is None  # Retorna

    def enqueue(self, dato):  # Encola elemento
        nuevo = Nodo(dato)
        if self.es_vacia():  # Condición
            self.frente = nuevo  # Atributo instancia
            self.final = nuevo  # Atributo instancia
        else:  # Sino
            self.final.siguiente = nuevo
            self.final = nuevo  # Atributo instancia

    def dequeue(self):  # Desencola elemento
        if self.es_vacia():  # Condición
            return None  # Retorna
        dato = self.frente.dato
        self.frente = self.frente.siguiente  # Atributo instancia
        if self.frente is None:  # Condición
            self.final = None  # Atributo instancia
        return dato  # Retorna`,
  },
  {
    id: 45,
    tp: 'INTEGRADOR',
    tema: 'Examen Integrador',
    punto: 7,
    punto_titulo: 'Pilas y colas',
    dificultad: 'dificil',
    enunciado: 'Implementá una simulación de atención al cliente con Cola. Cada cliente tiene nombre y tipo ("preferencial" o "regular"). Usá dos colas (preferencial y regular). El programa debe: (1) registrar clientes, (2) atender siguiente (prioridad preferencial), (3) mostrar estado. Implementá con nodos enlazados.',
    solucion: `class Nodo:  # Nodo para estructuras enlazadas
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.siguiente = None  # Atributo instancia

class Cola:  # Cola FIFO
    def __init__(self):  # Constructor
        self.frente = None  # Atributo instancia
        self.final = None  # Atributo instancia

    def es_vacia(self):  # Verifica si vacía
        return self.frente is None  # Retorna

    def encolar(self, dato):  # encolar
        nuevo = Nodo(dato)
        if self.es_vacia():  # Condición
            self.frente = nuevo  # Atributo instancia
            self.final = nuevo  # Atributo instancia
        else:  # Sino
            self.final.siguiente = nuevo
            self.final = nuevo  # Atributo instancia

    def desencolar(self):  # desencolar
        if self.es_vacia():  # Condición
            return None  # Retorna
        dato = self.frente.dato
        self.frente = self.frente.siguiente  # Atributo instancia
        if self.frente is None:  # Condición
            self.final = None  # Atributo instancia
        return dato  # Retorna

    def __len__(self):  # Cantidad de elementos
        cont = 0  # Cero inicial
        actual = self.frente
        while actual:  # Bucle while
            cont += 1  # Acumula
            actual = actual.siguiente
        return cont  # Retorna

class Simulacion:  # Simulación
    def __init__(self):  # Constructor
        self.pref = Cola()  # Atributo instancia
        self.reg = Cola()  # Atributo instancia

    def registrar(self, nombre, tipo):  # registrar
        c = {"nombre": nombre, "tipo": tipo}
        if tipo == "preferencial":  # Condición
            self.pref.encolar(c)
        else:  # Sino
            self.reg.encolar(c)
        print(f"{nombre} ({tipo}) registrado")  # Muestra

    def atender(self):  # atender
        if not self.pref.es_vacia():  # Si negativo/vacío
            c = self.pref.desencolar()
        elif not self.reg.es_vacia():  # Sino si
            c = self.reg.desencolar()
        else:  # Sino
            print("No hay clientes")  # Muestra
            return
        print(f"Atendiendo a {c['nombre']}")  # Muestra

    def estado(self):  # estado
        print(f"Preferencial: {len(self.pref)}, Regular: {len(self.reg)}")  # Muestra`,
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
    solucion: `def factorial(n):  # factorial
    if n == 0:  # Condición
        return 1  # Retorna
    return n * factorial(n - 1)  # Retorna

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
    solucion: `def potencia(base, exponente):  # potencia
    if exponente == 0:  # Condición
        return 1  # Retorna
    if exponente < 0:  # Condición
        return 1 / potencia(base, -exponente)  # Retorna
    return base * potencia(base, exponente - 1)  # Retorna

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
    solucion: `def buscar_en_lista(lista, valor, indice=0):  # buscar en lista
    if indice >= len(lista):  # Condición
        return -1  # Retorna
    if lista[indice] == valor:  # Condición
        return indice  # Retorna
    return buscar_en_lista(lista, valor, indice + 1)  # Retorna

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
    solucion: `class NodoArbol:  # Nodo para árbol binario
    def __init__(self, valor):  # Constructor
        self.valor = valor  # Atributo instancia
        self.izquierdo = None  # Atributo instancia
        self.derecho = None  # Atributo instancia

class ABB:  # Árbol Binario de Búsqueda
    def __init__(self):  # Constructor
        self.raiz = None  # Atributo instancia

    def insertar(self, valor):  # insertar
        if not self.raiz:  # Si negativo/vacío
            self.raiz = NodoArbol(valor)  # Atributo instancia
            return
        actual = self.raiz
        while True:  # Bucle while
            if valor < actual.valor:  # Condición
                if actual.izquierdo:  # Condición
                    actual = actual.izquierdo
                else:  # Sino
                    actual.izquierdo = NodoArbol(valor)
                    return
            elif valor > actual.valor:  # Sino si
                if actual.derecho:  # Condición
                    actual = actual.derecho
                else:  # Sino
                    actual.derecho = NodoArbol(valor)
                    return
            else:  # Sino
                return

    def buscar(self, dato):  # Busca elemento
        actual = self.raiz
        while actual:  # Bucle while
            if dato == actual.valor:  # Condición
                return True  # Retorna
            elif dato < actual.valor:  # Sino si
                actual = actual.izquierdo
            else:  # Sino
                actual = actual.derecho
        return False  # Retorna

abb = ABB()
for v in [5, 3, 7, 2, 8]:  # Bucle for
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
    solucion: `class GrafoLista:  # Grafo lista adyacencia
    def __init__(self):  # Constructor
        self.vertices = {}  # Atributo instancia

    def agregar_vertice(self, vertice):  # agregar vertice
        if vertice not in self.vertices:  # Condición
            self.vertices[vertice] = []

    def agregar_arista(self, origen, destino):  # agregar arista
        if origen in self.vertices and destino in self.vertices:  # Condición
            self.vertices[origen].append(destino)  # Agrega elemento
            self.vertices[destino].append(origen)  # Agrega elemento

    def mostrar(self):  # Muestra contenido
        for v, vecinos in self.vertices.items():  # Bucle for
            print(f"{v}: {', '.join(vecinos)}")  # Muestra

g = GrafoLista()
for c in ["Buenos Aires", "Córdoba", "Rosario", "Mendoza"]:  # Bucle for
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

class NodoABB:  # Nodo para ABB
    def __init__(self, valor):  # Constructor
        self.valor = valor  # Atributo instancia
        self.izq = None  # subárbol izquierdo (menores)
        self.der = None  # subárbol derecho (mayores)

class ABB:  # Árbol Binario de Búsqueda
    def __init__(self):  # Constructor
        self.raiz = None  # Atributo instancia

    def insertar(self, valor):  # insertar
        """Inserta un valor en el ABB.
        Usa iteración para evitar desbordamiento de pila en árboles grandes."""
        if self.raiz is None:  # Condición
            self.raiz = NodoABB(valor)  # Atributo instancia
            return
        actual = self.raiz
        while True:  # Bucle while
            if valor < actual.valor:  # Condición
                if actual.izq is None:  # Condición
                    actual.izq = NodoABB(valor)
                    return
                actual = actual.izq
            elif valor > actual.valor:  # Sino si
                if actual.der is None:  # Condición
                    actual.der = NodoABB(valor)
                    return
                actual = actual.der
            else:  # Sino
                return  # valor duplicado, no se inserta

    def buscar(self, valor):  # Busca elemento
        """Búsqueda recursiva. Retorna True si existe."""
        def _buscar(nodo):  #  buscar
            if nodo is None:  # Condición
                return False  # Retorna
            if nodo.valor == valor:  # Condición
                return True  # Retorna
            if valor < nodo.valor:  # Condición
                return _buscar(nodo.izq)  # Retorna
            return _buscar(nodo.der)  # Retorna
        return _buscar(self.raiz)  # Retorna

    def inorden(self):  # inorden
        """Recorrido inorden: izquierdo - raíz - derecho.
        Muestra los valores ordenados ascendentemente."""
        def _inorden(nodo):  #  inorden
            if nodo is None:  # Condición
                return
            _inorden(nodo.izq)
            print(nodo.valor, end=" ")  # Muestra
            _inorden(nodo.der)
        _inorden(self.raiz)
        print()  # Muestra

# ========== 2. VERIFICADOR DE PARÉNTESIS ==========

class NodoPila:  # Nodo para pila enlazada
    def __init__(self, dato):  # Constructor
        self.dato = dato  # Atributo instancia
        self.sig = None  # apunta al nodo inferior en la pila

class Pila:  # Pila LIFO
    """Pila implementada con nodos enlazados.
    push: O(1), pop: O(1). Sin límite de tamaño."""
    def __init__(self):  # Constructor
        self.tope = None  # Atributo instancia

    def push(self, dato):  # Apila elemento
        nuevo = NodoPila(dato)
        nuevo.sig = self.tope  # el nuevo apunta al antiguo tope
        self.tope = nuevo      # el nuevo pasa a ser el tope

    def pop(self):  # Desapila elemento
        if self.tope is None:  # Condición
            return None  # Retorna
        dato = self.tope.dato
        self.tope = self.tope.sig  # baja el tope
        return dato  # Retorna

    def esta_vacia(self):  # Verifica si vacía
        return self.tope is None  # Retorna

def verificar_parentesis(expresion):  # verificar parentesis
    """Verifica si los paréntesis están balanceados.
    Usa una Pila: cada ( abre, cada ) cierra."""
    pila = Pila()
    for c in expresion:  # Bucle for
        if c == "(":  # Condición
            pila.push(c)
        elif c == ")":  # Sino si
            if pila.esta_vacia():  # Condición
                return False  # ) sin ( previo
            pila.pop()  # Quita último
    return pila.esta_vacia()  # True si todos los ( se cerraron

# Pruebas
print("=== ABB ===")  # Muestra
abb = ABB()
for v in [8, 3, 10, 1, 6, 14, 4, 7, 13]:  # Bucle for
    abb.insertar(v)
print("Inorden:", end=" "); abb.inorden()  # Muestra
print("Buscar 6:", abb.buscar(6))  # Muestra
print("Buscar 9:", abb.buscar(9))  # Muestra

print("\\n=== Paréntesis ===")  # Muestra
print(verificar_parentesis("(())"))     # True
print(verificar_parentesis("(()"))      # False
print(verificar_parentesis(")(("))      # False`,
  },
];
