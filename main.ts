let cantCol: number = 10; //Cantidad total de columnas
let cantFil: number = 10; //Cantidad total de filas
let cantMinas: number = 5; //Cantidad total de minas
let tablero: any[][] = [[]]; //Array de objetos

let divPrincipal = document.getElementById("principal");

//Clase para guardar las coordenadas de cada caja(casillero) del tablero
class Caja {
    fil: number;
    col: number;
    status: string;

    constructor(fil: number, col: number, status: string) {
        this.col = col;
        this.fil = fil;
        this.status = status;
    }
}

//let caja = new Caja(1, 2, "hola");

//Función para inicializar el tablero y crear los objetos
function crearTablero(cantCol: number, cantFil: number) {
    tablero = [];
    for (let fil: number = 0; fil < cantFil; fil++) {
        tablero[fil] = [];
        for (let col: number = 0; col < cantCol; col++) {
            tablero[fil][col] = new Caja(fil, col, "0");
        }
    }
}

//Función para imprimir el tablero en HTML (vista previa)
function previaTablero() {
    let imprimir: string = "";
    for (let fil: number = 0; fil < cantFil; fil++) {
        imprimir += "<br>";
        for (let col: number = 0; col < cantCol; col++) {
            imprimir += "&emsp;";
            imprimir += tablero[fil][col].status;
        }
    }
    divPrincipal.innerHTML = imprimir;
}

crearTablero(cantCol, cantFil);
previaTablero();

console.log(tablero);
