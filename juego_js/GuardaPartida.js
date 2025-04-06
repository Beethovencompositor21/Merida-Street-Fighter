function guardarPartida(jugador) {
    localStorage.setItem("partidaGuardada", JSON.stringify(jugador));
    console.log("💾 Partida guardada automáticamente.");
}

function cargarPartida() {
    let datosGuardados = localStorage.getItem("partidaGuardada");
    if (datosGuardados) {
        jugador = JSON.parse(datosGuardados);
        console.log("📂 Partida cargada con éxito.");
    } else {
        console.log("⚠️ No hay partida guardada.");
    }
}
