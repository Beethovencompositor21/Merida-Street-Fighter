function mostrarMenuPrincipal() {
    try {
        document.body.innerHTML = `
            <h1>🎮 Merida Street Fighter</h1>
            <button class="btn btn-cargar-partida" onclick="continuarPartida()">
                <img src="iconos/cargar.png" alt="Cargar Partida" width="20"> Cargar Partida
            </button>
            <button class="btn btn-eliminar-datos" onclick="eliminarDatos()">
                <img src="iconos/eliminar.png" alt="Eliminar Datos" width="20"> Eliminar Datos
            </button>
            <button class="btn btn-crear-personaje" onclick="creadorPersonaje.mostrarCreador()">
                <img src="iconos/crear.png" alt="Crear Personaje" width="20"> Crear Personaje
            </button>
            <a href="https://beethovencompositor21.github.io/Merida-Street-Fighter/" target="_blank">
                <button class="btn btn-repositorio">
                    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" class="icono-github">
                    Repositorio
                </button>
            </a>
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
