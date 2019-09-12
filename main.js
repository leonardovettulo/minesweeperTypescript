var cantCol = 10; //Cantidad total de columnas
var cantFil = 10; //Cantidad total de filas
var cantMinas = 10; //Cantidad total de minas
var tablero = [[]]; //Array de objetos
var divPrincipal = document.getElementById("principal");
//Clase para guardar las coordenadas de cada caja(casillero) del tablero
var Caja = /** @class */ (function () {
    function Caja(fil, col, status) {
        this.col = col;
        this.fil = fil;
        this.status = status;
    }
    return Caja;
}());
//let caja = new Caja(1, 2, "hola");
//Función para inicializar el tablero y crear los objetos
function crearTablero(cantCol, cantFil) {
    tablero = [];
    for (var fil = 0; fil < cantFil; fil++) {
        tablero[fil] = [];
        for (var col = 0; col < cantCol; col++) {
            tablero[fil][col] = new Caja(fil, col, 0);
        }
    }
}
//Función para imprimir el tablero en HTML (vista previa)
function previaTablero() {
    var imprimir = "";
    for (var fil = 0; fil < cantFil; fil++) {
        imprimir += "<br>";
        for (var col = 0; col < cantCol; col++) {
            imprimir += "&emsp;";
            imprimir += tablero[fil][col].status;
        }
    }
    divPrincipal.innerHTML = imprimir;
}
//Función para crear minas aleatoreamente en filas y columnas
//Recibe como argumento la cantidad de minas, que puede ser elegido desde la variable global cantMinas
function crearMinas(cantMinas) {
    while (cantMinas > 0) {
        var filRand = Math.floor(Math.random() * cantFil);
        var colRand = Math.floor(Math.random() * cantCol);
        if (tablero[filRand][colRand].status != -1) {
            tablero[filRand][colRand].status = -1;
            cantMinas--;
            //console.log(cantMinas);
        }
    }
}
//Función para asignar el número de minas vecinas
//Para cada caja, verificamos si es una mina, y si no verificamos todas las vecinas
//Si la vecina no es una mina o no esta fuera de tablero adicionamos en 1 el contador de status
function asignarNumero() {
    for (var fil = 0; fil < cantFil; fil++) {
        for (var col = 0; col < cantCol; col++) {
            if (tablero[fil][col].status === -1) {
                for (var offCol = -1; offCol <= 1; offCol++) {
                    for (var offFil = -1; offFil <= 1; offFil++) {
                        //console.log(fil + offFil, col + offCol);
                        if (
                        //Debo verificar que no quede fuera del tablero y que no sea una mina (-1)
                        fil + offFil >= 0 &&
                            fil + offFil < cantFil &&
                            col + offCol >= 0 &&
                            col + offCol < cantCol &&
                            tablero[fil + offFil][col + offCol].status !== -1) {
                            tablero[fil + offFil][col + offCol].status++;
                        }
                    }
                }
            }
        }
    }
}
crearTablero(cantCol, cantFil);
crearMinas(cantMinas);
asignarNumero();
previaTablero();
//console.log(tablero);
