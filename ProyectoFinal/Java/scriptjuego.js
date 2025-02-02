document.querySelectorAll("#color").forEach(boton => {
    boton.addEventListener("mousedown", function() {
        this.style.backgroundColor = "white"; 
    });

    boton.addEventListener("mouseup", function() {
        this.style.backgroundColor = "";
    });

    boton.addEventListener("mouseleave", function() {
        this.style.backgroundColor = ""; 
    });
});

let audio = new Audio ("Audio/8-bit-game-158815.mp3");
audio.loop = true;

function sonar(){
    audio.play();
}

function bajar(){
    audio.pause();
    audio.currentTime = 0;
}
function volver(){
    window.location.href = "index.html"; 
}

const juego = document.querySelector(".juego");
const puntosElement = document.querySelector(".puntos");
const recordElement = document.querySelector(".record");

let perdiste = false;
let comidaX, comidaY;
let serpienteX =5, serpienteY =10;
let velocidadX = 0, velocidadY = 0;
let serpientecuerpo = [];
let setIntervalId;
let puntos = 0;
let record = localStorage.getItem("record") || 0;
recordElement.innerHTML = `record: ${record}`;

const cambiarposicioncomida = () => {
    comidaX = Math.floor(Math.random() * 30) + 1;
    comidaY = Math.floor(Math.random() * 20) + 1;
}

const malo = () => {
    clearInterval(setIntervalId);
    alert("Que malo, ya perdiste");
    location.reload();
}

const cambiardireccion = (e) => {
    if(e.key === "ArrowUp" && velocidadY != 1){
        velocidadX = 0;
        velocidadY = -1;
    } else if(e.key === "ArrowDown" && velocidadY != -1){
        velocidadX = 0;
        velocidadY = 1;
    } else if(e.key === "ArrowLeft" && velocidadX != 1){
        velocidadX = -1;
        velocidadY = 0;
    } else if(e.key === "ArrowRight" && velocidadX != - 1){
        velocidadX = 1;
        velocidadY = 0;
    }
    iniciarJuego();
}

const iniciarJuego = ()=> {
    if(perdiste) return malo ();

    let htmlMarkup = `<div class= "comida" style="grid-area: ${comidaY} / ${comidaX}"></div>`;

    if(serpienteX === comidaX && serpienteY === comidaY){
        cambiarposicioncomida();
        serpientecuerpo.push([comidaX, comidaY]);
        puntos++;

        record = puntos >= record ? puntos : record;
        localStorage.setItem("record", record);
        puntosElement.innerHTML = `puntos: ${puntos}`;

        recordElement.innerHTML = `record: ${record}`;
    }


    for(let i = serpientecuerpo.length - 1; i > 0; i--){
        serpientecuerpo[i] = serpientecuerpo[i - 1];
    }
        
    serpientecuerpo[0] = [serpienteX, serpienteY];

    serpienteX += velocidadX;
    serpienteY += velocidadY;

    if(serpienteX <=0 || serpienteX > 30 || serpienteY <=0 || serpienteY > 20){
        perdiste = true;
    }

    for(let i = 0; i < serpientecuerpo.length; i++) {
        let clase = i === 0? "cabeza" : "cuerpo";
        htmlMarkup += `<div class="${clase}" style="grid-area: ${serpientecuerpo[i][1]} / ${serpientecuerpo[i][0]}"></div>`;
        if(i !== 0 && serpientecuerpo[0][1] === serpientecuerpo[i][1] && serpientecuerpo[0][0] === serpientecuerpo[i][0]){
            perdiste = true;
        }
    }
    juego.innerHTML = htmlMarkup;
}



cambiarposicioncomida();
setIntervalId = setInterval(iniciarJuego, 250);
document.addEventListener("keydown", cambiardireccion);