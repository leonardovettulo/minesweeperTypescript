# minesweeperTypescript
Minesweeper using only Typescript/Javascript and HTML &amp; CSS

Versión minimalista de minesweeper.

Hay dos elementos principales: caja y tablero. El tablero es una array 2D de objetos Caja.
Las coordenadas del array nos indican la posición de cada caja. Dentro de la caja guardamos la posición (no fue utilizada) el status (si tiene una mina o un número o vacío) y la visibilidad (visto, oculto).
Faltó agregar (por falta de tiempo) la funcionalidad de colocar un flag a las posiciones en las que el usuario cree que hay una mina. Eso podría implementarse utilizando otro estado de la visibilidad de la caja.

Funciones principales:

*** crearMinas:
//Función para crear minas aleatoreamente en filas y columnas
//Recibe como argumento la cantidad de minas, que puede ser elegido desde la variable global cantMinas


*** asignarNumero
//Función para asignar el número de minas vecinas
//Para cada caja, verificamos si es una mina, y si no verificamos todas las vecinas
//Si la vecina no es una mina o no esta fuera de tablero adicionamos en 1 el contador de status

*** click
//Funcion para generar el evento click y verificar si tocamos una mina, un numero o una caja vacia

*** verificarVecino
//Funcion para ir expandiendo el rango visible. 
//Lógica similar a la función asignarNumero
