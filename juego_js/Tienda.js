class Tienda {
    constructor() {
        this.articulos = [
            { nombre: "⚔️ Espada de Madera", ataque: 5, precio: 10, icono: "iconos/espada-madera.png" },
            { nombre: "👢 Zapatilla de Madre", ataque: 7, precio: 15, icono: "iconos/zapatilla.png" },
            { nombre: "🏹 Arco de luz", ataque: 12, precio: 30, icono: "iconos/arco.png" },
            { nombre: "❤️ Poción de Curación", curacion: 20, precio: 10, icono: "iconos/pocion.png" },
            { nombre: "💪 Marmita de Obélix", fuerza: 5, precio: 15, icono: "iconos/marmita.png" },
            { nombre: "🛡️ Escudo de Bronce", defensa: 3, precio: 20, icono: "iconos/escudo.png" },
            { nombre: "👕 Armadura de Cuero", defensa: 5, precio: 25, icono: "iconos/armadura.png" }
        ];
    }

    mostrarTienda() {
        try {
            document.body.innerHTML = `
                <div class="container">
                    <h1>🛍️ Tienda 🛍️</h1>
                    <p class="info">Dinero: <span id="dinero">${jugador.dinero}</span> monedas</p>
                    <div id="listaTienda" class="tienda-items"></div>
                    <button class="btn volver" onclick="mostrarLobby()">
                        <img src="iconos/volver.png" alt="Volver" width="20"> Volver
                    </button>
                </div>
            `;
            let listaTienda = document.getElementById("listaTienda");
            this.articulos.forEach((articulo) => {
                let boton = document.createElement("button");
                boton.className = "btn compra";
                let descripcion = "";
                if (articulo.ataque) {
                    descripcion = ` (+${articulo.ataque} ATQ)`;
                } else if (articulo.curacion) {
                    descripcion = ` (Curación: ${articulo.curacion})`;
                } else if (articulo.fuerza) {
                    descripcion = ` (Fuerza: ${articulo.fuerza})`;
                } else if (articulo.defensa) {
                    descripcion = ` (+${articulo.defensa} DEF)`;
                }
                boton.innerHTML = `
                    <img src="${articulo.icono}" alt="${articulo.nombre}" width="20">
                    ${articulo.nombre}${descripcion} - ${articulo.precio} monedas
                `;
                boton.onclick = () => this.comprarArticulo(articulo);
                listaTienda.appendChild(boton);
                listaTienda.appendChild(document.createElement("br"));
            });
        } catch (error) {
            console.error("Error al mostrar la tienda:", error);
        }
    }

    comprarArticulo(articulo) {
        try {
            if (jugador.dinero >= articulo.precio) {
                jugador.dinero -= articulo.precio;
                jugador.agregarAlInventario(articulo);
                alert(`✅ Has comprado ${articulo.nombre}.🙊`);
                document.getElementById('dinero').innerText = jugador.dinero;
                guardarPartida(jugador);
                this.mostrarTienda();
            } else {
                alert("❌ No tienes suficiente dinero.🔕");
            }
        } catch (error) {
            console.error("Error al comprar el artículo:", error);
        }
    }
}

const tienda = new Tienda();
