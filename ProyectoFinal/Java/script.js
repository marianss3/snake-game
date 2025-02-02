document.querySelectorAll("#color").forEach(boton => {
    boton.addEventListener("mousedown", function() {
        this.style.backgroundColor = "yellow"; 
    });

    boton.addEventListener("mouseup", function() {
        this.style.backgroundColor = "";
    });

    boton.addEventListener("mouseleave", function() {
        this.style.backgroundColor = ""; 
    });
});

let audio = new Audio ("Audio/chiptune-grooving-142242.mp3");
audio.loop = true;

function sonar(){
    audio.play();
}

function bajar(){
    audio.pause();
    audio.currentTime = 0;
}

function iniciarJuego() {
    window.location.href = "indexjuego.html"; 
}

