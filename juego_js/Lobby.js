function mostrarLobby() {
    const nivelSiguiente = jugador.nivel * 100;
    const experienciaNecesaria = nivelSiguiente - jugador.experiencia;

    document.body.innerHTML = `
        <div class="container">
            <h1>🏡 Inicio 🏡</h1>
            <p class="info">🧝🏼‍♂️ Personaje: ${jugador.nombre} (Nivel ${jugador.nivel}) 🧝🏼‍♂️</p>
            <p class="info">❤️ Vida: ${jugador.vida} ❤️</p>
            <p class="info">💰 Dinero: ${jugador.dinero} monedas 💰</p>
            <p class="info">🌟 Experiencia: ${jugador.experiencia} / ${nivelSiguiente}</p>
            <p class="info">🌟 Experiencia necesaria para el próximo nivel: ${experienciaNecesaria}</p>
            <div class="botones">
                <button class="btn" onclick="tienda.mostrarTienda()">🛍️ Ir a la Tienda 🛍️</button>
                <button class="btn" onclick="mostrarMapa()">🌍 Explorar Mapa 🌍</button>
                <button class="btn" onclick="mostrarInventario()">🎒 Ver Inventario</button>
                <button class="btn volver" onclick="mostrarMenuPrincipal()">🏠 Menú Principal</button>
            </div>
        </div>
    `;
}


function mostrarMapa() {
    const escenarios = [
        { nombre: "Bosque Encantado", descripcion: "Un bosque lleno de criaturas mágicas y peligros desconocidos.", enemigos: enemigosDisponibles },
        { nombre: "Cueva Oscura", descripcion: "Una cueva llena de trampas y enemigos poderosos.", enemigos: enemigosDisponibles },
        { nombre: "Desierto Árido", descripcion: "Un desierto vasto y peligroso, lleno de criaturas hostiles.", enemigos: enemigosDisponibles },
        { nombre: "Montaña Nevada", descripcion: "Una montaña cubierta de nieve con enemigos resistentes al frío.", enemigos: enemigosDisponibles }
    ];

    const escenario = escenarios[Math.floor(Math.random() * escenarios.length)];
    alert(`Estás explorando el ${escenario.nombre}. ${escenario.descripcion}`);

    // Iniciar combate con un enemigo del escenario
    const enemigo = escenario.enemigos[Math.floor(Math.random() * escenario.enemigos.length)];
    iniciarCombate(enemigo);
}
