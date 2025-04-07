function mostrarMenuPrincipal() {
    document.body.innerHTML = `
        <h1>🎮 Merida Street Fighter</h1>
        <button onclick="nuevaPartida()">Nueva Partida</button>
        <button onclick="continuarPartida()">Cargar Partida</button>
        <button onclick="eliminarDatos()">Eliminar Datos</button>
    `;
}

function nuevaPartida() {
    const nombre = prompt("Introduce el nombre de tu personaje:");
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
    const personajeCargado = cargarPartida();
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
