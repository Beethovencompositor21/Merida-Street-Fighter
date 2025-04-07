let jugador;

let indiceEnemigoActual = 0;
let enemigosEnCola = [...enemigosDisponibles];

document.addEventListener('DOMContentLoaded', () => {
    mostrarMenuPrincipal();
});

function seleccionarEnemigo() {
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
}

function iniciarCombate(enemigo, zona) {
    enemigoActual = enemigo;
    console.log("Iniciando combate con:", enemigoActual.nombre);
    mostrarCampoDeBatalla(enemigoActual);
}

function mostrarMenuPrincipal() {
    document.body.innerHTML = `
        <h1>🎮 Merida Street Fighter</h1>
        <button onclick="nuevaPartida()">Nueva Partida</button>
        <button onclick="continuarPartida()">Cargar Partida</button>
        <button onclick="eliminarDatos()">Eliminar Datos</button>
    `;
}

function nuevaPartida() {
    let nombre = prompt("Introduce el nombre de tu personaje:");
    if (nombre) {
        jugador = new Personaje(nombre, 100, 10, 5, 20);
        guardarPartida(jugador);
        alert(`¡Bienvenido, ${nombre}! Tu aventura comienza.`);
        mostrarLobby();
    } else {
        alert("⚠ Debes introducir un nombre válido.");
    }
}

function continuarPartida() {
    let personajeCargado = cargarPartida();
    if (personajeCargado) {
        jugador = personajeCargado;
        alert(`Bienvenido de nuevo, ${jugador.nombre}!`);
        mostrarLobby();
    } else {
        alert("⚠ No hay una partida guardada.");
    }
}

function eliminarDatos() {
    localStorage.removeItem("partida");
    console.log("🗑 Eliminando partida...");
    alert("Partida eliminada.");
    mostrarMenuPrincipal();
}

function mostrarLobby() {
    const nivelSiguiente = jugador.nivel * 100;
    const experienciaFaltante = nivelSiguiente - jugador.experiencia;

    document.body.innerHTML = `
        <div class="container">
            <h1>🏡 Inicio 🏡</h1>
            <p class="info">🧝🏼‍♂️ Personaje: ${jugador.nombre} (Nivel ${jugador.nivel}) 🧝🏼‍♂️</p>
            <p class="info">❤️ Vida: ${jugador.vida} ❤️</p>
            <p class="info">💰 Dinero: ${jugador.dinero} monedas 💰</p>
            <p class="info">🌟 Experiencia: ${jugador.experiencia} / ${nivelSiguiente}</p>
            <p class="info">🌟 Experiencia faltante para el próximo nivel: ${experienciaFaltante}</p>
            <div class="botones">
                <button class="btn" onclick="tienda.mostrarTienda()">🛍️ Ir a la Tienda 🛍️</button>
                <button class="btn" onclick="mostrarMapa()">🌍 Explorar Mapa 🌍</button>
                <button class="btn" onclick="mostrarInventario()">🎒 Ver Inventario</button>
                <button class="btn volver" onclick="mostrarMenuPrincipal()">🏠 Menú Principal</button>
            </div>
        </div>
    `;
}
