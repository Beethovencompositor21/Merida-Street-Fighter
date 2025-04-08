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
                <p class="info">🧠 Experiencia necesaria para el próximo nivel: ${experienciaNecesaria}🧠</p>
                <div class="botones">
                    <button class="btn" onclick="tienda.mostrarTienda()">🛍️ Ir a la Tienda 🛍️</button>
                    <button class="btn" onclick="mostrarMapa()">🌍 Explorar Mapa 🌍</button>
                    <button class="btn" onclick="mostrarInventario()">🎒 Ver Inventario</button>
                    <button class="btn volver" onclick="mostrarMenuPrincipal()">🏠 Menú Principal</button>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al mostrar el lobby:", error);
    }
}
