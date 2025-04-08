function mostrarInventario() {
    try {
        document.body.innerHTML = `
            <h1>Inventario</h1>
            <div id="listaInventario"></div>
            <button onclick="mostrarLobby()">Volver</button>
        `;
        let listaInventario = document.getElementById("listaInventario");
        if (jugador.inventario.length === 0) {
            listaInventario.innerHTML = "<p>(Vacío)</p>";
        } else {
            jugador.inventario.forEach((item, index) => {
                let botonUsar = document.createElement("button");
                botonUsar.innerText = ` ${item.nombre}`;
                botonUsar.onclick = () => {
                    if (item.nombre.includes("Poción de Curación")) {
                        jugador.curar();
                        jugador.inventario.splice(index, 1);
                        mostrarInventario();
                    }
                };

                listaInventario.appendChild(document.createTextNode(`${item.nombre}`));
                listaInventario.appendChild(document.createElement("br"));
                listaInventario.appendChild(botonUsar);
                listaInventario.appendChild(document.createElement("br"));
            });
        }
    } catch (error) {
        console.error("Error al mostrar el inventario:", error);
    }
}
