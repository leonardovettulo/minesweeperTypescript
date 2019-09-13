var cantCol = 10; //Cantidad total de columnas
var cantFil = 10; //Cantidad total de filas
var cantMinas = 10; //Cantidad total de minas
var tablero = [[]]; //Array de objetos
var divPrincipal = document.getElementById("principal");
//Clase para guardar las coordenadas de cada caja(casillero) del tablero
var Caja = /** @class */ (function () {
    function Caja(fil, col, status, visible) {
        this.col = col;
        this.fil = fil;
        this.status = status;
        this.visible = visible;
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
function imprimirTablero() {
    for (var fil = 0; fil < cantFil; fil++) {
        for (var col = 0; col < cantCol; col++) {
            //Creao un div por cada caja y le asigno un ID fila/columna
            var newDiv = document.createElement("div");
            newDiv.className = "caja";
            newDiv.id = "" + fil + col;
            //Cambio el caracter para visualizar mejor
            var textoTablero = tablero[fil][col].status.toString();
            if (textoTablero === "0") {
                textoTablero = "";
            }
            else if (textoTablero === "-1") {
                textoTablero = "XX";
            }
            var newDivText = document.createTextNode(textoTablero);
            newDiv.appendChild(newDivText);
            divPrincipal.appendChild(newDiv);
            click("" + fil + col); //Llamo a la funcion click para crear el eventHandler
        }
    }
}
//Funcion para generar el evento click y verificar si tocamos una mina, un numero o una caja vacia
function click(id) {
    var button = document
        .getElementById(id)
        .addEventListener("click", buttonClick);
    //Function for event listener
    function buttonClick(e) {
        //console.log(e);
        //Extraigo el numero de fila y columna del click
        var fil = parseInt(e.target.id.toString().split("")[0]);
        var col = parseInt(e.target.id.toString().split("")[1]);
        var cajaStatus = document.getElementById(id).getAttribute("status");
        if (tablero[fil][col].visible === "oculto") {
            //console.log(tablero[fil][col]);
            if (tablero[fil][col].status === -1) {
                console.error("perdiste");
                mostrarTodo();
                //Perdiste el juego
            }
            else if (tablero[fil][col].status !== 0) {
                //console.log("numero");
                document.getElementById(id).style.backgroundColor = "white";
                document.getElementById(id).style.textIndent = "0px";
                tablero[fil][col].visible = "visto";
                //Hay un numero revelar
            }
            else {
                //console.log("blanco");
                document.getElementById(id).style.backgroundColor = "white";
                document.getElementById(id).style.textIndent = "0px";
                tablero[fil][col].visible = "visto";
                //Hay una caja vacia, expandir...
                verificarVecino(fil, col);
            }
        }
    }
}
//Funcion para ir expandiendo el rango visible. Lógica similar a la función asignarNumero
function verificarVecino(fil, col) {
    for (var offCol = -1; offCol <= 1; offCol++) {
        for (var offFil = -1; offFil <= 1; offFil++) {
            if (fil + offFil >= 0 &&
                fil + offFil < cantFil &&
                col + offCol >= 0 &&
                col + offCol < cantCol) {
                if (tablero[fil + offFil][col + offCol].visible === "oculto") {
                    if (tablero[fil + offFil][col + offCol].status > 0) {
                        cambiarStatus(fil + offFil, col + offCol);
                    }
                    else {
                        cambiarStatus(fil + offFil, col + offCol);
                        verificarVecino(fil + offFil, col + offCol);
                    }
                }
            }
        }
    }
}
//Funcion para cambiar status a visible y cambiar el formato de las cajas
function cambiarStatus(fil, col) {
    tablero[fil][col] = "visto";
    var id = fil.toString() + col.toString();
    //console.log(id);
    document.getElementById(id).style.backgroundColor = "white";
    document.getElementById(id).style.textIndent = "0px";
}
//Funcion para mostrar todo cuando perdemos o ganamos
function mostrarTodo() {
    for (var fil = 0; fil < cantFil; fil++) {
        for (var col = 0; col < cantCol; col++) {
            document.getElementById("" + fil + col).style.backgroundColor =
                "white";
            document.getElementById("" + fil + col).style.textIndent = "0px";
            tablero[fil][col].visible = "visto";
        }
    }
}
crearTablero(cantCol, cantFil);
crearMinas(cantMinas);
asignarNumero();
imprimirTablero();
//previaTablero();
//console.log(tablero);
