function mostrarCampoDeBatalla(enemigo) {
    document.body.innerHTML = `
        <h1>Combate</h1>
        <div class="combate-container fade-in">
            <div class="personaje">
                <h2>${jugador.nombre}</h2>
                <div class="vida-barra-container">
                    <div class="vida-barra" id="vida-jugador" style="width: ${jugador.vida / jugador.vidaMaxima * 100}%;"></div>
                    <div class="vida-texto">${jugador.vida}/${jugador.vidaMaxima}</div>
                </div>
                <div class="experiencia-barra-container">
                    <div class="experiencia-barra" id="experiencia-jugador" style="width: ${(jugador.experiencia / (jugador.nivel * 100)) * 100}%;"></div>
                    <div class="experiencia-texto">Experiencia: ${jugador.experiencia}/${jugador.nivel * 100}</div>
                </div>
                <p class="ataque">Ataque: ${jugador.ataque + (jugador.armaEquipada ? jugador.armaEquipada.ataque : 0)}</p>
                <p class="defensa">Defensa: ${jugador.defensa + (jugador.armaduraEquipada ? jugador.armaduraEquipada.defensa : 0)}</p>
                <p>Nivel: ${jugador.nivel}</p>
            </div>
            <div class="enemigo">
                <h2>${enemigo.nombre}</h2>
                <div class="vida-barra-container">
                    <div class="vida-barra" id="vida-enemigo" style="width: ${enemigo.vida / enemigo.vidaMaxima * 100}%;"></div>
                    <div class="vida-texto">${enemigo.vida}/${enemigo.vidaMaxima}</div>
                </div>
                <p>Ataque: ${enemigo.ataque}</p>
                <p>Defensa: ${enemigo.defensa}</p>
                <p>Recompensa: ${enemigo.recompensa} monedas</p>
            </div>
            <div class="acciones-combate">
                <button class="btn-accion" onclick="realizarAccion('atacar')">Atacar</button>
                <button class="btn-accion" onclick="realizarAccion('defender')">Defender</button>
                <button class="btn-accion" onclick="realizarAccion('huir')">Huir</button>
                <button class="btn-accion" onclick="realizarAccion('Curación')">Curación</button>
                <button class="btn-accion" onclick="realizarAccion('Ataque Fuerte')">Ataque Fuerte</button>
                ${jugador.inventario.map((item, index) => `
                    <button class="btn-accion" onclick="realizarAccion('usarObjeto_${index}')">Usar ${item.nombre}</button>
                `).join('')}
            </div>
            <div class="explicacion">
                <p>🌟 Sistema de Experiencia y Niveles 🌟</p>
                <p>Gana experiencia derrotando enemigos. Cuando alcances los puntos de experiencia necesarios, subirás de nivel.</p>
                <p>Cada nivel te proporcionará más vida, ataque y defensa.</p>
            </div>
        </div>
    `;
}
