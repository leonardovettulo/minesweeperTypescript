let cantCol: number = 10; //Cantidad total de columnas
let cantFil: number = 10; //Cantidad total de filas
let cantMinas: number = 10; //Cantidad total de minas
let tablero: any[][] = [[]]; //Array de objetos

let divPrincipal: any = document.getElementById("principal");

//Clase para guardar las coordenadas de cada caja(casillero) del tablero
class Caja {
    fil: number;
    col: number;
    status: number; //si es una mina el valor es -1, sino el numbero indica la cantidad de minas alrededor
    visible: string;

    constructor(fil: number, col: number, status: number, visible: string) {
        this.col = col;
        this.fil = fil;
        this.status = status;
        this.visible = visible;
    }
}

//let caja = new Caja(1, 2, "hola");

//Función para inicializar el tablero y crear los objetos
function crearTablero(cantCol: number, cantFil: number) {
    tablero = [];
    for (let fil: number = 0; fil < cantFil; fil++) {
        tablero[fil] = [];
        for (let col: number = 0; col < cantCol; col++) {
            tablero[fil][col] = new Caja(fil, col, 0, "oculto");
        }
    }
}

// //Función para imprimir el tablero en HTML (vista previa)
// function previaTablero() {
//     let imprimir: string = "";
//     for (let fil: number = 0; fil < cantFil; fil++) {
//         imprimir += "<br>";
//         for (let col: number = 0; col < cantCol; col++) {
//             imprimir += "&emsp;";
//             imprimir += tablero[fil][col].status;
//         }
//     }
//     divPrincipal.innerHTML = imprimir;
// }

//Función para crear minas aleatoreamente en filas y columnas
//Recibe como argumento la cantidad de minas, que puede ser elegido desde la variable global cantMinas
function crearMinas(cantMinas: number) {
    while (cantMinas > 0) {
        let filRand = Math.floor(Math.random() * cantFil);
        let colRand = Math.floor(Math.random() * cantCol);
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
    for (let fil: number = 0; fil < cantFil; fil++) {
        for (let col: number = 0; col < cantCol; col++) {
            if (tablero[fil][col].status === -1) {
                for (let offCol = -1; offCol <= 1; offCol++) {
                    for (let offFil = -1; offFil <= 1; offFil++) {
                        //console.log(fil + offFil, col + offCol);

                        if (
                            //Debo verificar que no quede fuera del tablero y que no sea una mina (-1)
                            fil + offFil >= 0 &&
                            fil + offFil < cantFil &&
                            col + offCol >= 0 &&
                            col + offCol < cantCol &&
                            tablero[fil + offFil][col + offCol].status !== -1
                        ) {
                            tablero[fil + offFil][col + offCol].status++;
                        }
                    }
                }
            }
        }
    }
}

function imprimirTablero() {
    for (let fil: number = 0; fil < cantFil; fil++) {
        for (let col: number = 0; col < cantCol; col++) {
            //Creao un div por cada caja y le asigno un ID fila/columna
            let newDiv = document.createElement("div");
            newDiv.className = "caja";
            newDiv.id = `${fil}${col}`;

            //Cambio el caracter para visualizar mejor
            let textoTablero = tablero[fil][col].status.toString();
            if (textoTablero === "0") {
                textoTablero = "";
            } else if (textoTablero === "-1") {
                textoTablero = "XX";
            }

            let newDivText = document.createTextNode(textoTablero);
            newDiv.appendChild(newDivText);

            divPrincipal.appendChild(newDiv);
            click(`${fil}${col}`); //Llamo a la funcion click para crear el eventHandler
        }
    }
}

function click(id: string) {
    let button = document
        .getElementById(id)
        .addEventListener("click", buttonClick);

    //Function for event listener
    function buttonClick(e) {
        //console.log(e);
        //Extraigo el numero de fila y columna del click
        let fil = parseInt(e.target.id.toString().split("")[0]);
        let col = parseInt(e.target.id.toString().split("")[1]);

        let cajaStatus = document.getElementById(id).getAttribute("status");

        if (tablero[fil][col].visible === "oculto") {
            //console.log(tablero[fil][col]);
            if (tablero[fil][col].status === -1) {
                console.error("perdiste");
                //Perdiste el juego
            } else if (tablero[fil][col].status !== 0) {
                console.log("numero");
                //Hay un numero revelar
            } else {
                console.log("blanco");
                //Hay una caja vacia, expandir...
            }
        }
    }
}

crearTablero(cantCol, cantFil);
crearMinas(cantMinas);
asignarNumero();
imprimirTablero();

//previaTablero();

//console.log(tablero);
