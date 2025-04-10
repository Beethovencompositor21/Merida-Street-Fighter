function mostrarMenuPrincipal() {
    try {
        document.body.innerHTML = `
            <h1>🎮 Merida Street Fighter</h1>
            <button onclick="continuarPartida()">Cargar Partida</button>
            <button onclick="eliminarDatos()">Eliminar Datos</button>
            <button onclick="creadorPersonaje.mostrarCreador()">Crear Personaje</button>
        `;
    } catch (error) {
        console.error("Error al mostrar el menú principal:", error);
    }
}

function continuarPartida() {
    try {
        const personajeCargado = cargarPartida();
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
