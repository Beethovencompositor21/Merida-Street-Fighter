function guardarPartida(jugador) {
    if (jugador) {
        console.log("💾 Guardando partida automáticamente...");
        const datos = {
            nombre: jugador.nombre,
            vida: jugador.vida,
            ataque: jugador.ataque,
            defensa: jugador.defensa,
            dinero: jugador.dinero,
            nivel: jugador.nivel,
            experiencia: jugador.experiencia,
            inventario: jugador.inventario,
            armaEquipada: jugador.armaEquipada,
            armaduraEquipada: jugador.armaduraEquipada
        };
        localStorage.setItem("partida", JSON.stringify(datos));
        console.log("✅ Partida guardada con éxito.");
    } else {
        console.warn("⚠ No se pudo guardar la partida: jugador no definido.");
    }
}

function cargarPartida() {
    const data = localStorage.getItem("partida");
    if (data) {
        console.log("📂 Cargando partida...");
        const datos = JSON.parse(data);
        const personajeCargado = new Personaje(
            datos.nombre,
            datos.vida,
            datos.ataque,
            datos.defensa,
            datos.dinero
        );
        personajeCargado.nivel = datos.nivel;
        personajeCargado.experiencia = datos.experiencia;
        personajeCargado.inventario = datos.inventario || [];
        personajeCargado.armaEquipada = datos.armaEquipada || null;
        personajeCargado.armaduraEquipada = datos.armaduraEquipada || null;
        console.log("✅ Partida cargada con éxito.");
        return personajeCargado;
    } else {
        console.warn("⚠ No hay partida guardada.");
        return null;
    }
}
