// Función para mostrar el lobby del juego
function mostrarLobby() {
    try {
        const nivelSiguiente = jugador.nivel * 100;
        const experienciaNecesaria = nivelSiguiente - jugador.experiencia;

        document.body.innerHTML = `
            <div class="container">
                <h1>🏡 Inicio 🏡</h1>
                <p class="info">🧝🏼‍♂️ Personaje: ${jugador.nombre} (Nivel ${jugador.nivel}) 🧝🏼‍♂️</p>
                <p class="info">❤️ Vida: ${jugador.vida} ❤️</p>
                <p class="info">💰 Dinero: ${jugador.dinero} monedas 💰</p>
                <p class="info">🧠 Experiencia: ${jugador.experiencia} / ${nivelSiguiente}</p>

                <div class="botones">
                    <button class="btn" onclick="tienda.mostrarTienda()">
                        <img src="iconos/tienda.png" alt="Tienda" width="20"> Ir a la Tienda
                    </button>
                    <button class="btn" onclick="mostrarMapa()">
                        <img src="iconos/mapa.png" alt="Mapa" width="20"> Explorar Mapa
                    </button>
                    <button class="btn" onclick="mostrarInventario()">
                        <img src="iconos/inventario.png" alt="Inventario" width="20"> Ver Inventario
                    </button>
                    <button class="btn volver" onclick="mostrarMenuPrincipal()">
                        <img src="iconos/menu.png" alt="Menú" width="20"> Menú Principal
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al mostrar el lobby:", error);
    }
}
