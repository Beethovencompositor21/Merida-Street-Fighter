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
                    <button class="btn" onclick="tienda.mostrarTienda()">🛍️ Ir a la Tienda 🛍️</button>
                    <button class="btn" onclick="mostrarMapa()">🌍 Explorar Mapa 🌍</button>
                    <button class="btn" onclick="mostrarInventario()">🎒 Ver Inventario</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al mostrar el lobby:", error);
    }
}
