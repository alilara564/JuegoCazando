let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const VELOCIDAD = 20;

let imagenGato = new Image();
imagenGato.src = "gato.png";

let imagenComida = new Image();
imagenComida.src = "comida.png";


// Gato
let gatoX = 0;
let gatoY = 0;
const ANCHOGATO = 100;
const ALTURAGATO = 100;

//complementos
let puntos = 0;
let tiempo = 15;
let myInterval;
let usaInput = false; 
let juegoIniciado = false;

// Comida
let comidaX = 50;
let comidaY = 50;
const ANCHOCOMIDA = 90;
const ALTURACOMIDA = 90;
 
function graficar(x, y, ancho, alto, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, ancho, alto);
};
 
/*function graficarGato() {
    graficar(gatoX, gatoY, ANCHOGATO, ALTURAGATO, "#000000");
};*/

function graficarGato() {
    ctx.drawImage(imagenGato, gatoX, gatoY, ANCHOGATO, ALTURAGATO);
};

function graficarComida() {
    ctx.drawImage(imagenComida, comidaX, comidaY, ANCHOCOMIDA, ALTURACOMIDA);
}
 
/*function graficarComida() {
    graficar(comidaX, comidaY, ANCHOCOMIDA, ALTURACOMIDA, "#ff0000");
};*/

function jugar(){
    if(juegoIniciado == false){
        iniciarJuego();
    }
}
 
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY = (canvas.height / 2) - (ALTURAGATO / 2);
    comidaX = 250;
    comidaY = 250;
    juegoIniciado = true;
    usaInput = true;
    graficarGato();
    graficarComida();
    actualizarFotograma();
    myInterval = setInterval(restarTiempo,1000)
}

function limpiarCanvas(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function actualizarFotograma(){
    limpiarCanvas();
    graficarGato();
    graficarComida();
    detectarColision();
    limitarMovimiento();
}

function moverIzquierda(){
    gatoX -= VELOCIDAD;
    actualizarFotograma();
}

function moverDerecha(){
    gatoX += VELOCIDAD;
    actualizarFotograma();
}

function moverArriba(){
    gatoY -= VELOCIDAD;
    actualizarFotograma();
}

function moverAbajo(){
    gatoY += VELOCIDAD;
    actualizarFotograma();
}

function detectarColision(){
    if (
        gatoX < comidaX + ANCHOCOMIDA &&
        gatoX + ANCHOGATO > comidaX &&
        gatoY < comidaY + ALTURACOMIDA &&
        gatoY + ALTURAGATO > comidaY
    ) {
        sumarPuntos();
        resetPositionComida();
        restarTiempo();
    }
}

function limitarMovimiento() {
    // Límite izquierdo
    if (gatoX < 0) {
        gatoX = 0;
    }

    // Límite derecho
    if (gatoX + ANCHOGATO > canvas.width) {
        gatoX = canvas.width - ANCHOGATO;
    }

    // Límite superior
    if (gatoY < 0) {
        gatoY = 0;
    }

    // Límite inferior
    if (gatoY + ALTURAGATO > canvas.height) {
        gatoY = canvas.height - ALTURAGATO;
    }
}

function resetPositionComida(){
    comidaX = generarAleatorio(100,400)
    comidaY = generarAleatorio(100,400)
}

function sumarPuntos(){
    puntos ++;
    mostrarEnSpan("lblPuntos",puntos);
}

function restarTiempo(){
    tiempo -= 1;
    //mostrarEnSpan("lblTiempo",tiempo);
}

function restarTiempo(){
    tiempo--;
    mostrarEnSpan("lblTiempo",tiempo);

    if (puntos < 6 && tiempo <= 0){
        clearInterval(myInterval);
        alert("HAS PERDIDO :(");
        puntos = 0;
        tiempo = 15;
        usaInput = false;
        mostrarEnSpan("lblPuntos",puntos);
        mostrarEnSpan("lblTiempo",tiempo);
        mostrarEnSpan("mensaje", "PERDISTE!!");
    }

    if(puntos >= 6 && tiempo >= 0){
        clearInterval(myInterval);
        alert("BRO GANASTE :D");
        puntos = 0;
        tiempo = 15;
        usaInput = false;
        mostrarEnSpan("lblPuntos",puntos);
        mostrarEnSpan("lblTiempo",tiempo);
        mostrarEnSpan("mensaje", "GANASTE!!");
    }
}

function reiniciarJuego(){
    clearInterval(myInterval);
    puntos = 0;
    tiempo = 15;
    usaInput = true;
    mostrarEnSpan("lblPuntos",puntos);
    mostrarEnSpan("lblTiempo",tiempo);
    iniciarJuego();
}


document.getElementById("botonAbajo").onclick = () => moverAbajo();
document.getElementById("botonIzquierda").onclick = () => moverIzquierda();
document.getElementById("botonDerecha").onclick = () => moverDerecha();
document.getElementById("botonArriba").onclick = () => moverArriba();
 
let inputs = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && usaInput == true) moverArriba();
    if (event.key === "ArrowDown" && usaInput == true) moverAbajo();
    if (event.key === "ArrowLeft" && usaInput == true) moverIzquierda();
    if (event.key === "ArrowRight" && usaInput == true) moverDerecha();
});