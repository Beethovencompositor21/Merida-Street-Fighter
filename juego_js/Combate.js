class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
    }

    turnoJugador() {
        return this.personaje.atacar(this.enemigo);
    }

    turnoEnemigo() {
        return this.enemigo.atacar(this.personaje);
    }

    haTerminado() {
        return this.personaje.vida <= 0 || this.enemigo.vida <= 0;
    }

    eventoAleatorio() {
        const eventos = [
            () => console.log("🌧️ ¡Una lluvia repentina reduce la visibilidad!"),
            () => console.log("🌪️ ¡Un viento fuerte sopla a través del campo de batalla!"),
            () => console.log("🌩️ ¡Un rayo cae cerca, iluminando todo!")
        ];
        const evento = eventos[Math.floor(Math.random() * eventos.length)];
        evento();
    }
}

let enemigoActual;
let zonaActual;

function iniciarCombate(enemigo, zona) {
    enemigoActual = enemigo;
    zonaActual = zona;
    mostrarCampoDeBatalla(enemigoActual);
}

function realizarAccion(accion) {
    if (jugador.descanso) {
        alert("Estás en descanso. No puedes realizar ninguna acción este turno.");
        jugador.descanso = false;
        enemigoActual.atacar(jugador);
        actualizarVida();
        if (jugador.vida <= 0) {
            alert("¡Has sido derrotado!");
            mostrarMenuPrincipal();
        }
        return;
    }

    switch (accion) {
        case 'atacar':
            alert(jugador.atacar(enemigoActual));
            document.body.classList.add('shake');
            setTimeout(() => {
                document.body.classList.remove('shake');
                actualizarVida();
                if (enemigoActual.vida > 0) {
                    alert(enemigoActual.atacar(jugador));
                    actualizarVida();
                    if (jugador.vida <= 0) {
                        alert("¡Has sido derrotado!");
                        mostrarMenuPrincipal();
                    }
                } else {
                    alert(`¡Has vencido a ${enemigoActual.nombre}!`);

                    // Aumentar la experiencia otorgada
                    const experienciaGanada = 20; // Puedes ajustar este valor
                    jugador.ganarExperiencia(experienciaGanada);

                    jugador.dinero += enemigoActual.recompensa;
                    guardarPartida(jugador);

                    // Eliminar el enemigo derrotado de la lista de enemigos de la zona
                    zonaActual.enemigos = zonaActual.enemigos.filter(e => e !== enemigoActual);

                    mostrarLobby();
                }
            }, 500);
            break;
        case 'defender':
            alert(jugador.defender());
            actualizarVida();
            break;
        case 'huir':
            alert("Huyendo...");
            mostrarLobby();
            break;
        case 'Curación':
            alert(jugador.curar());
            actualizarVida();
            break;
        case 'Ataque Fuerte':
            alert(jugador.ataqueFuerte(enemigoActual));
            document.body.classList.add('shake');
            setTimeout(() => {
                document.body.classList.remove('shake');
                actualizarVida();
                if (enemigoActual.vida > 0) {
                    alert(enemigoActual.atacar(jugador));
                    actualizarVida();
                    if (jugador.vida > 0) {
                        alert(enemigoActual.atacar(jugador));
                        actualizarVida();
                        if (jugador.vida <= 0) {
                            alert("¡Has sido derrotado!");
                            mostrarMenuPrincipal();
                        }
                    }
                } else {
                    alert(`¡Has vencido a ${enemigoActual.nombre}!`);

                    // Aumentar la experiencia otorgada
                    const experienciaGanada = 20; // Puedes ajustar este valor
                    jugador.ganarExperiencia(experienciaGanada);

                    jugador.dinero += enemigoActual.recompensa;
                    guardarPartida(jugador);

                    // Eliminar el enemigo derrotado de la lista de enemigos de la zona
                    zonaActual.enemigos = zonaActual.enemigos.filter(e => e !== enemigoActual);

                    mostrarLobby();
                }
            }, 500);
            break;
        default:
            if (accion.startsWith('usarObjeto_')) {
                const index = parseInt(accion.split('_')[1]);
                const objeto = jugador.inventario[index];
                alert(jugador.usarObjeto(objeto));
                if (objeto.ataque) {
                    jugador.ataque += objeto.ataque;
                    document.querySelector('.personaje .ataque').innerText = `Ataque: ${jugador.ataque + (jugador.armaEquipada ? jugador.armaEquipada.ataque : 0)}`;
                } else if (objeto.defensa) {
                    jugador.defensa += objeto.defensa;
                    document.querySelector('.personaje .defensa').innerText = `Defensa: ${jugador.defensa + (jugador.armaduraEquipada ? jugador.armaduraEquipada.defensa : 0)}`;
                }
                jugador.inventario.splice(index, 1);
                actualizarVida();
                mostrarCampoDeBatalla(enemigoActual); // Actualizar la pantalla de combate
            }
            break;
    }

    const combate = new Combate(jugador, enemigoActual);
    if (!combate.haTerminado()) {
        combate.eventoAleatorio();
    }
}

function actualizarVida() {
    document.getElementById('vida-jugador').style.width = `${jugador.vida / jugador.vidaMaxima * 100}%`;
    document.querySelector('.personaje .vida-texto').innerText = `${jugador.vida}/${jugador.vidaMaxima}`;
    document.getElementById('vida-enemigo').style.width = `${enemigoActual.vida / enemigoActual.vidaMaxima * 100}%`;
    document.querySelector('.enemigo .vida-texto').innerText = `${enemigoActual.vida}/${enemigoActual.vidaMaxima}`;
    actualizarExperiencia();
}

function actualizarExperiencia() {
    const nivelSiguiente = jugador.nivel * 100;
    const progreso = (jugador.experiencia / nivelSiguiente) * 100;
    document.getElementById('experiencia-jugador').style.width = `${progreso}%`;
    document.querySelector('.personaje .experiencia-texto').innerText = `Experiencia: ${jugador.experiencia}/${nivelSiguiente}`;
}

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
