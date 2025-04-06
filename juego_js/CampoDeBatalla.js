function mostrarCampoDeBatalla(enemigo) {
    enemigoActual = enemigo;
    document.body.innerHTML = `
        <h1>Combate</h1>
        <div class="combate-container fade-in">
            <div class="personaje">
                <h2>${jugador.nombre}</h2>
                <div class="vida-barra-container">
                    <div class="vida-barra" id="vida-jugador" style="width: ${jugador.vida / jugador.vidaMaxima * 100}%;"></div>
                    <div class="vida-texto">${jugador.vida}/${jugador.vidaMaxima}</div>
                </div>
                <p>Ataque: ${jugador.ataque + (jugador.armaEquipada ? jugador.armaEquipada.ataque : 0)}</p>
            </div>
            <div class="enemigo">
                <h2>${enemigo.nombre}</h2>
                <div class="vida-barra-container">
                    <div class="vida-barra" id="vida-enemigo" style="width: ${enemigo.vida / enemigo.vidaMaxima * 100}%;"></div>
                    <div class="vida-texto">${enemigo.vida}/${enemigo.vidaMaxima}</div>
                </div>
                <p>Ataque: ${enemigo.ataque}</p>
            </div>
            <div class="acciones-combate">
                <button class="btn-accion" onclick="realizarAccion('atacar')">Atacar</button>
                <button class="btn-accion" onclick="realizarAccion('defender')">Defender</button>
                <button class="btn-accion" onclick="realizarAccion('huir')">Huir</button>
                ${jugador.habilidades.map(habilidad => `
                    <button class="btn-accion" onclick="realizarAccion('${habilidad.nombre}')">${habilidad.nombre}</button>
                `).join('')}
                ${jugador.inventario.map((item, index) => `
                    <button class="btn-accion" onclick="realizarAccion('usarObjeto_${index}')">Usar ${item.nombre}</button>
                `).join('')}
            </div>
        </div>
    `;
}

function actualizarVida() {
    document.getElementById('vida-jugador').style.width = `${jugador.vida / jugador.vidaMaxima * 100}%`;
    document.querySelector('.personaje .vida-texto').innerText = `${jugador.vida}/${jugador.vidaMaxima}`;
    document.getElementById('vida-enemigo').style.width = `${enemigoActual.vida / enemigoActual.vidaMaxima * 100}%`;
    document.querySelector('.enemigo .vida-texto').innerText = `${enemigoActual.vida}/${enemigoActual.vidaMaxima}`;
}
