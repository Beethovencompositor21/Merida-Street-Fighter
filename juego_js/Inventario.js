// Función para mostrar el inventario del jugador
function mostrarInventario() {
    try {
        document.body.innerHTML = `
            <h1>Inventario</h1>
            <div id="listaInventario" class="inventario-container"></div>
            <button class="btn" onclick="mostrarLobby()">
                <img src="iconos/volver.png" alt="Volver" width="20"> Volver
            </button>
        `;
        let listaInventario = document.getElementById("listaInventario");
        if (jugador.inventario.length === 0) {
            listaInventario.innerHTML = "<p>(Vacío)</p>";
        } else {
            jugador.inventario.forEach((item, index) => {
                let botonUsar = document.createElement("button");
                botonUsar.className = "btn";
                botonUsar.innerHTML = `
                    <img src="iconos/${item.nombre.toLowerCase().replace(/ /g, '-')}.png" alt="${item.nombre}" width="20">
                    ${item.nombre}
                `;
                botonUsar.onclick = () => {
                    if (item.nombre.includes("Poción de Curación")) {
                        jugador.curar();
                        jugador.inventario.splice(index, 1);
                        mostrarInventario();
                    } else if (item.ataque) {
                        jugador.equiparArma(item);
                        jugador.inventario.splice(index, 1);
                        mostrarInventario();
                    } else if (item.defensa) {
                        jugador.equiparArmadura(item);
                        jugador.inventario.splice(index, 1);
                        mostrarInventario();
                    } else {
                        alert("Objeto no equipable.");
                    }
                };

                listaInventario.appendChild(botonUsar);
                listaInventario.appendChild(document.createElement("br"));
            });
        }
    } catch (error) {
        console.error("Error al mostrar el inventario:", error);
    }
}
