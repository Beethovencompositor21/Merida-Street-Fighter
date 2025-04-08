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

function mostrarMenuPrincipal() {
    try {
        document.body.innerHTML = `
            <h1>🎮 Merida Street Fighter</h1>
            <button onclick="nuevaPartida()">Nueva Partida</button>
            <button onclick="continuarPartida()">Cargar Partida</button>
            <button onclick="eliminarDatos()">Eliminar Datos</button>
        `;
    } catch (error) {
        console.error("Error al mostrar el menú principal:", error);
    }
}

function nuevaPartida() {
    try {
        let nombre = prompt("Introduce el nombre de tu personaje:");
        if (nombre) {
            jugador = new Personaje(nombre, 100, 10, 5, 20);
            guardarPartida(jugador);
            alert(`¡Bienvenido, ${nombre}! Tu aventura comienza.`);
            mostrarLobby();
        } else {
            alert("⚠ Debes introducir un nombre válido.");
        }
    } catch (error) {
        console.error("Error al iniciar una nueva partida:", error);
    }
}

function continuarPartida() {
    try {
        let personajeCargado = cargarPartida();
        if (personajeCargado) {
            jugador = personajeCargado;
            alert(`Bienvenido de nuevo, ${jugador.nombre}!`);
            mostrarLobby();
        } else {
            alert("⚠ No hay una partida guardada.");
        }
    } catch (error) {
        console.error("Error al cargar la partida:", error);
    }
}

function eliminarDatos() {
    try {
        localStorage.removeItem("partida");
        console.log("🗑 Eliminando partida...");
        alert("Partida eliminada.");
        mostrarMenuPrincipal();
    } catch (error) {
        console.error("Error al eliminar los datos:", error);
    }
}
