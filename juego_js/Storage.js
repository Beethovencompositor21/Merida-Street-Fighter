// Función para guardar la partida
function guardarPartida(jugador) {
    try {
        if (jugador) {
            console.log("💾 Guardando partida automáticamente...");
            // Crear un objeto con los datos del jugador
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
            // Guardar los datos en el almacenamiento local
            localStorage.setItem("partida", JSON.stringify(datos));
            console.log("✅ Partida guardada con éxito.");
        } else {
            console.warn("⚠ No se pudo guardar la partida: jugador no definido.");
        }
    } catch (error) {
        console.error("Error al guardar la partida:", error);
    }
}

// Función para cargar la partida
function cargarPartida() {
    try {
        const data = localStorage.getItem("partida");
        if (data) {
            console.log("📂 Cargando partida...");
            // Convertir los datos JSON en un objeto
            const datos = JSON.parse(data);
            // Crear un nuevo objeto Personaje con los datos cargados
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
    } catch (error) {
        console.error("Error al cargar la partida:", error);
    }
}
