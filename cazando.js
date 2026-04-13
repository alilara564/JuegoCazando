let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const VELOCIDAD = 15;

let inputs = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") moverArriba();
    if (event.key === "ArrowDown") moverAbajo();
    if (event.key === "ArrowLeft") moverIzquierda();
    if (event.key === "ArrowRight") moverDerecha();
});

// Gato
let gatoX = 0;
let gatoY = 0;
const ANCHOGATO = 50;
const ALTURAGATO = 50;
 
// Comida
let comidaX = 50;
let comidaY = 50;
const ANCHOCOMIDA = 30;
const ALTURACOMIDA = 30;
 
function graficar(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
};
 
function graficarGato() {
    graficar(gatoX, gatoY, ANCHOGATO, ALTURAGATO, "#000000");
};
 
function graficarComida() {
    graficar(comidaX, comidaY, ANCHOCOMIDA, ALTURACOMIDA, "#ff0000");
};
 
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY = (canvas.height / 2) - (ALTURAGATO / 2);
    comidaX = canvas.width - ANCHOCOMIDA;
    comidaY = canvas.height - ALTURACOMIDA;
    graficarGato();
    graficarComida();
}
 
/*function mover(direccion) {
    if (direccion === "arriba") gatoY -= VELOCIDAD;
    if (direccion === "abajo") gatoY += VELOCIDAD;
    if (direccion === "izquierda") gatoX -= VELOCIDAD;
    if (direccion === "derecha") gatoX += VELOCIDAD;
    limpiarCanvas();
    graficarGato();
    graficarComida();
}*/

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarFotograma(){
    limpiarCanvas();
    graficarGato();
    graficarComida();
}



function moverIzquierda(){
    gatoX -= VELOCIDAD;
    actualizarFotograma();
    //frthjkhck
    //gfuilhlih
    //dtdifilgioh
    //duydiuilhi
}

function moverDerecha(){
    gatoX += VELOCIDAD;
    actualizarFotograma();
    //frthjkhck
    //gfuilhlih
    //dtdifilgioh
    //duydiuilhi
}

function moverArriba(){
    gatoY -= VELOCIDAD;
    actualizarFotograma();
    //frthjkhck
    //gfuilhlih
    //dtdifilgioh
    //duydiuilhi
}

function moverAbajo(){
    gatoY += VELOCIDAD;
    actualizarFotograma();
    //frthjkhck
    //gfuilhlih
    //dtdifilgioh
    //duydiuilhi
}
 
document.getElementById("botonArriba").onclick = () => moverArriba();
document.getElementById("botonAbajo").onclick = () => moverAbajo();
document.getElementById("botonIzquierda").onclick = () => moverIzquierda();
document.getElementById("botonDerecha").onclick = () => moverDerecha();
 
 
iniciarJuego();
actualizarFotograma()