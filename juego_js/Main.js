let jugador;
let indiceEnemigoActual = 0;
let enemigosEnCola = [...enemigosDisponibles];

document.addEventListener('DOMContentLoaded', () => {
    try {
        mostrarMenuPrincipal();
    } catch (error) {
        console.error("Error al cargar el menú principal:", error);
    }
});

function seleccionarEnemigo() {
    try {
        let mensaje = "Elige un enemigo:\n";
        enemigosDisponibles.forEach((enemigo, index) => {
            mensaje += `${index + 1}. ${enemigo.nombre} (Vida: ${enemigo.vida}, ATQ: ${enemigo.ataque}, DEF: ${enemigo.defensa})\n`;
        });
        let eleccion = prompt(mensaje);
        if (eleccion >= 1 && eleccion <= enemigosDisponibles.length) {
            enemigoActual = enemigosDisponibles[eleccion - 1];
            mostrarCampoDeBatalla(enemigoActual);
        } else {
            alert("Selección inválida.");
            mostrarLobby();
        }
    } catch (error) {
        console.error("Error al seleccionar el enemigo:", error);
    }
}

function iniciarCombate(enemigo, zona) {
    try {
        enemigoActual = enemigo;
        console.log("Iniciando combate con:", enemigoActual.nombre);
        mostrarCampoDeBatalla(enemigoActual);
    } catch (error) {
        console.error("Error al iniciar el combate:", error);
    }
}
