let canvas = document.getElementById("areaJuego");
let ctx = canvas.getContext("2d");
const VELOCIDAD = 20;



// Gato
let gatoX = 0;
let gatoY = 0;
const ANCHOGATO = 50;
const ALTURAGATO = 50;

//complementos
let puntos = 0;
let tiempo = 12;
let myInterval;
let usaInput = false; 
let juegoIniciado = false;

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

function jugar(){
    if(juegoIniciado == false){
        iniciarJuego();
    }
}
 
function iniciarJuego() {
    gatoX = (canvas.width / 2) - (ANCHOGATO / 2);
    gatoY = (canvas.height / 2) - (ALTURAGATO / 2);
    comidaX = 0;
    comidaY = 0;
    usaInput = true;
    juegoIniciado = true;
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
    setInput();
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

function cuentaRegresiva(){
    tiempo--;   
    mostrarEnSpan("lblTiempo",parseInt(tiempo));
    if (tiempo <= 0 && puntos < 6){
        alert("Perdiste")
        iniciarJuego();
    }
    else if (tiempo > 0 && puntos >= 6){
        mostrarEnSpan("lbl tiempo", "Ganaste")
    }
}

function restarTiempo(){
    tiempo--;
    mostrarEnSpan("lblTiempo",tiempo);

    if (puntos < 6 && tiempo <= 0){
        clearInterval(myInterval);
        alert("HAS PERDIDO :(");
        puntos = 0;
        tiempo = 12;
        usaInput = false;
        mostrarEnSpan("lblPuntos",puntos);
        mostrarEnSpan("lblTiempo",tiempo);
        mostrarEnSpan("mensaje", "PERDISTE!!");
    }

    if(puntos >= 6 && tiempo > 0){
        clearInterval(myInterval);
        alert("BRO GANASTE :D");
        puntos = 0;
        tiempo = 12;
        usaInput = false;
        mostrarEnSpan("lblPuntos",puntos);
        mostrarEnSpan("lblTiempo",tiempo);
        mostrarEnSpan("mensaje", "GANASTE!!");
    }
}

function reiniciarJuego(){
    clearInterval(myInterval);
    puntos = 0;
    tiempo = 12;
    mostrarEnSpan("lblPuntos",puntos);
    mostrarEnSpan("lblTiempo",tiempo);
    iniciarJuego();
}

function setInput(){

    if (usaInput == true){
        document.getElementById("botonAbajo").onclick = () => moverAbajo();
        document.getElementById("botonIzquierda").onclick = () => moverIzquierda();
        document.getElementById("botonDerecha").onclick = () => moverDerecha();
        document.getElementById("botonArriba").onclick = () => moverArriba();
    }
    
    if (usaInput == false){
        return 0;
    }
}

let inputs = document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && usaInput == true) moverArriba();
    if (event.key === "ArrowDown" && usaInput == true) moverAbajo();
    if (event.key === "ArrowLeft" && usaInput == true) moverIzquierda();
    if (event.key === "ArrowRight" && usaInput == true) moverDerecha();
});