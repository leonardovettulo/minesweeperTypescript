var cantCol = 10; //Cantidad total de columnas
var cantFil = 10; //Cantidad total de filas
var cantMinas = 5; //Cantidad total de minas
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
            tablero[fil][col] = new Caja(fil, col, "0");
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
crearTablero(cantCol, cantFil);
previaTablero();
console.log(tablero);
