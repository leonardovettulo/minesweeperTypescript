let cantCol: number = 10; //Cantidad total de columnas
let cantFil: number = 10; //Cantidad total de filas
let cantMinas: number = 5; //Cantidad total de minas
let tablero: any[][] = [[]]; //Array de objetos
let cantidadOcultos: number = cantCol * cantFil - cantMinas; //Contador para saber cuando ganamos

let divPrincipal: any = document.getElementById("principal");

//document.getElementById("minas").innerHTML = cantidadOcultos;

//Boton Para comenzar un juego nuevo
let botonReset = document
    .getElementById("reset")
    .addEventListener("click", resetClick);

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

//Clase Timer para medir el tiempo
class Timer {
    id: number;
    constructor(public counter = 0, id: number = 0) {
        let intervalId = setInterval(() => {
            this.counter = this.counter + 1;
            console.log(this.counter);
            document.getElementById("timer").innerHTML = this.counter;
            if (this.counter === 999) clearInterval(intervalId);
        }, 1000);
        this.id = intervalId;
    }

    finTimer() {
        clearInterval(this.id);
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

//Funcion para generar el evento click y verificar si tocamos una mina, un numero o una caja vacia
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
            if (tablero[fil][col].status === -1) {
                console.error("perdiste");
                mostrarTodo();
                timer.finTimer();
                //Perdiste el juego
            } else if (tablero[fil][col].status !== 0) {
                cambiarStatus(fil, col);

                //Hay un numero revelar
            } else {
                cambiarStatus(fil, col);

                //Hay una caja vacia, expandir...
                verificarVecino(fil, col);
            }
        }
    }
}

//Funcion para ir expandiendo el rango visible. Lógica similar a la función asignarNumero

function verificarVecino(fil: number, col: number) {
    for (let offCol = -1; offCol <= 1; offCol++) {
        for (let offFil = -1; offFil <= 1; offFil++) {
            if (
                fil + offFil >= 0 &&
                fil + offFil < cantFil &&
                col + offCol >= 0 &&
                col + offCol < cantCol
            ) {
                if (tablero[fil + offFil][col + offCol].visible === "oculto") {
                    if (tablero[fil + offFil][col + offCol].status > 0) {
                        cambiarStatus(fil + offFil, col + offCol);
                    } else {
                        cambiarStatus(fil + offFil, col + offCol);
                        verificarVecino(fil + offFil, col + offCol);
                    }
                }
            }
        }
    }
}

//Funcion para cambiar status a visible y cambiar el formato de las cajas
function cambiarStatus(fil: number, col: number) {
    tablero[fil][col] = "visto";
    let id: string = fil.toString() + col.toString();
    //console.log(id);
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.textIndent = "0px";

    cantidadOcultos--;

    console.log(cantidadOcultos);
    if (cantidadOcultos === 0) {
        mostrarTodo();

        console.warn("Ganaste");
        timer.finTimer();
    }
}

//Funcion para mostrar todo cuando perdemos o ganamos
function mostrarTodo() {
    for (let fil: number = 0; fil < cantFil; fil++) {
        for (let col: number = 0; col < cantCol; col++) {
            document.getElementById(`${fil}${col}`).style.backgroundColor =
                "white";
            document.getElementById(`${fil}${col}`).style.textIndent = "0px";
            tablero[fil][col].visible = "visto";
        }
    }
}

///Función para juego nuevo
function resetClick(e) {
    crearTablero(cantCol, cantFil);
    crearMinas(cantMinas);
    asignarNumero();
    //console.log(tablero);
    divPrincipal.innerHTML = ""; //limpio el HTML
    cantidadOcultos = cantCol * cantFil - cantMinas; //Reseteo el contador
    imprimirTablero();
    timer.finTimer();
    document.getElementById("timer").innerHTML = "0";
    timer = new Timer(0);
}

let timer = new Timer(); //Creo un timer
crearTablero(cantCol, cantFil);
crearMinas(cantMinas);
asignarNumero();
imprimirTablero();
