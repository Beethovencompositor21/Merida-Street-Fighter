function mostrarCampoDeBatalla(enemigo) {
    try {
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
                    <button class="btn-accion" onclick="realizarAccion('atacar')">
                        <img src="iconos/atacar.png" alt="Atacar" width="20"> Atacar
                    </button>
                    <button class="btn-accion" onclick="realizarAccion('defender')">
                        <img src="iconos/defender.png" alt="Defender" width="20"> Defender
                    </button>
                    <button class="btn-accion" onclick="realizarAccion('huir')">
                        <img src="iconos/huir.png" alt="Huir" width="20"> Huir
                    </button>
                    <button class="btn-accion" onclick="realizarAccion('Curación')">
                        <img src="iconos/curacion.png" alt="Curación" width="20"> Curación
                    </button>
                    <button class="btn-accion" onclick="realizarAccion('Ataque Fuerte')">
                        <img src="iconos/ataque-fuerte.png" alt="Ataque Fuerte" width="20"> Ataque Fuerte
                    </button>
                    ${jugador.inventario.map((item, index) => `
                        <button class="btn-accion" onclick="realizarAccion('usarObjeto_${index}')">
                            <img src="iconos/${item.nombre.toLowerCase().replace(/ /g, '-')}.png" alt="${item.nombre}" width="20"> Usar ${item.nombre}
                        </button>
                    `).join('')}
                </div>
                <div class="explicacion">
                    <p>🌟 Sistema de Experiencia y Niveles 🌟</p>
                    <p>-Gana experiencia derrotando enemigos. Cuando alcances los puntos de experiencia necesarios, subirás de nivel.</p>
                    <p>-Cada nivel te proporcionará más vida, ataque y defensa.</p>
                    <p>💰 Recompensas 💰</p>
                    <p>-Al derrotar a un enemigo, recibirás monedas y experiencia.</p>
                    <p>-Usa las monedas para comprar objetos en la tienda.</p>
                    <p>-Recuerda que puedes usar pociones de curación para restaurar vida.</p>
                    <p>⚔️ Estrategia ⚔️</p>
                    <p>-Ataca a los enemigos para reducir su vida.</p>
                    <p>-La vida máxima en cada combate se definirá según el resultado del combate anterior, tu verás...</p>
                    <p>-Defiéndete para reducir el daño recibido.</p>
                    <p>-Usa objetos estratégicamente para mejorar tus habilidades.</p>
                    <p>-Recuerda que puedes huir del combate si es necesario.</p>
                    <p>-El ataque fuerte golpea dos veces ¡PERO OJO! No podrás atacar en el siguiente turno.</p>
                    <p>-Ahora que ya sabes de que va la cosa ¡¡¡¡A LUCHARRR!!!!!</p>
                    <p>¡Buena suerte en tu aventura!</p>
                </div>
            </div>
        `;
    } catch (error) {
        console.error("Error al mostrar el campo de batalla:", error);
    }
}
