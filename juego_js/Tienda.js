class Tienda {
    constructor() {
        this.articulos = [
            { nombre: "⚔️ Espada de Madera", ataque: 5, precio: 10 },
            { nombre: "👢 Zapatilla de Madre", ataque: 7, precio: 15 },
            { nombre: "🏹 Arco de luz", ataque: 12, precio: 30 },
            { nombre: "❤️ Poción de Curación", curacion: 20, precio: 10 },
            { nombre: "💪 Marmita de Obélix", fuerza: 5, precio: 15 },
            { nombre: "🛡️ Escudo de Bronce", defensa: 3, precio: 20 },
            { nombre: "👕 Armadura de Cuero", defensa: 5, precio: 25 }
        ];
    }

    mostrarTienda() {
        document.body.innerHTML = `
            <div class="container">
                <h1>🛍️ Tienda 🛍️</h1>
                <p class="info">Dinero: <span id="dinero">${jugador.dinero}</span> monedas</p>
                <div id="listaTienda" class="tienda-items"></div>
                <button class="btn volver" onclick="mostrarLobby()">Volver</button>
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
            boton.innerText = `${articulo.nombre}${descripcion} - ${articulo.precio} monedas`;
            boton.onclick = () => this.comprarArticulo(articulo);
            listaTienda.appendChild(boton);
            listaTienda.appendChild(document.createElement("br"));
        });
    }

    comprarArticulo(articulo) {
        if (jugador.dinero >= articulo.precio) {
            jugador.dinero -= articulo.precio;
            jugador.agregarAlInventario(articulo);
            alert(`✅ Has comprado ${articulo.nombre}.`);
            document.getElementById('dinero').innerText = jugador.dinero;
            guardarPartida(jugador);
            this.mostrarTienda();
        } else {
            alert("❌ No tienes suficiente dinero.");
        }
    }
}

const tienda = new Tienda();
