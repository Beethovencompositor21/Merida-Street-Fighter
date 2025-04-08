class Combate {
    constructor(personaje, enemigo) {
        this.personaje = personaje;
        this.enemigo = enemigo;
    }

    turnoJugador() {
        try {
            return this.personaje.atacar(this.enemigo);
        } catch (error) {
            console.error("Error en el turno del jugador:", error);
        }
    }

    turnoEnemigo() {
        try {
            return this.enemigo.atacar(this.personaje);
        } catch (error) {
            console.error("Error en el turno del enemigo:", error);
        }
    }

    haTerminado() {
        return this.personaje.vida <= 0 || this.enemigo.vida <= 0;
    }

    eventoAleatorio() {
        const eventos = [
            () => this.aplicarEvento("🌧️ ¡Una lluvia repentina reduce la visibilidad!", -2, 2),
            () => this.aplicarEvento("🌪️ ¡Un viento fuerte sopla a través del campo de batalla!", -2, 2),
            () => this.aplicarEvento("🌩️ ¡Un rayo cae cerca, iluminando todo!", 3, -3),
            () => this.aplicarEvento("🌟 ¡Una estrella fugaz cruza el cielo, dando suerte al personaje!", 10, 0),
            () => this.aplicarEvento("🌋 ¡El suelo tiembla y se abre una grieta!", -10, 0),
            () => this.aplicarEvento("🌀 ¡Un remolino aparece y confunde al enemigo!", 0, -3)
        ];
        try {
            const evento = eventos[Math.floor(Math.random() * eventos.length)];
            evento();
            actualizarVida();
        } catch (error) {
            console.error("Error al ejecutar el evento aleatorio:", error);
        }
    }

    aplicarEvento(mensaje, modificadorAtaque, modificadorDefensa) {
        console.log(mensaje);
        alert(mensaje);
        this.personaje.ataque += modificadorAtaque;
        this.enemigo.defensa += modificadorDefensa;
    }
}

let enemigoActual;
let zonaActual;

function iniciarCombate(enemigo, zona) {
    try {
        if (!zona || !zona.enemigos) {
            throw new Error("La zona o la lista de enemigos no está definida.");
        }
        enemigoActual = enemigo;
        zonaActual = zona;
        mostrarCampoDeBatalla(enemigoActual);
    } catch (error) {
        console.error("Error al iniciar el combate:", error);
    }
}

function realizarAccion(accion) {
    try {
        if (jugador.descanso) {
            alert("Estás en descanso. No puedes realizar ninguna acción este turno.");
            jugador.descanso = false;
            enemigoActual.atacar(jugador);
            actualizarVida();
            if (jugador.vida <= 0) {
                alert("¡Has sido derrotado... AL HOYO 🕳️");
                mostrarMenuPrincipal();
            }
            return;
        }

        switch (accion) {
            case 'atacar':
                ejecutarAccionDeAtaque();
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
                ejecutarAccionDeAtaqueFuerte();
                break;
            default:
                if (accion.startsWith('usarObjeto_')) {
                    usarObjeto(accion);
                }
                break;
        }

        const combate = new Combate(jugador, enemigoActual);
        if (!combate.haTerminado()) {
            combate.eventoAleatorio();
        }
    } catch (error) {
        console.error("Error al realizar la acción:", error);
    }
}

function ejecutarAccionDeAtaque() {
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
            finalizarCombate();
        }
    }, 500);
}

function ejecutarAccionDeAtaqueFuerte() {
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
            finalizarCombate();
        }
    }, 500);
}

function usarObjeto(accion) {
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
    mostrarCampoDeBatalla(enemigoActual);
}

function finalizarCombate() {
    const experienciaGanada = 20;
    jugador.ganarExperiencia(experienciaGanada);
    actualizarExperiencia();
    jugador.dinero += enemigoActual.recompensa;
    guardarPartida(jugador);

    if (zonaActual && zonaActual.enemigos) {
        zonaActual.enemigos = zonaActual.enemigos.filter(e => e !== enemigoActual);
    }

    alert(`¡Has vencido a ${enemigoActual.nombre}!`);
    mostrarLobby();
}

function actualizarVida() {
    try {
        document.getElementById('vida-jugador').style.width = `${jugador.vida / jugador.vidaMaxima * 100}%`;
        document.querySelector('.personaje .vida-texto').innerText = `${jugador.vida}/${jugador.vidaMaxima}`;
        document.getElementById('vida-enemigo').style.width = `${enemigoActual.vida / enemigoActual.vidaMaxima * 100}%`;
        document.querySelector('.enemigo .vida-texto').innerText = `${enemigoActual.vida}/${enemigoActual.vidaMaxima}`;
        actualizarExperiencia();
    } catch (error) {
        console.error("Error al actualizar la vida:", error);
    }
}

function actualizarExperiencia() {
    try {
        const nivelSiguiente = jugador.nivel * 100;
        const progreso = (jugador.experiencia / nivelSiguiente) * 100;
        document.getElementById('experiencia-jugador').style.width = `${progreso}%`;
        document.querySelector('.personaje .experiencia-texto').innerText = `Experiencia: ${jugador.experiencia}/${nivelSiguiente}`;
    } catch (error) {
        console.error("Error al actualizar la experiencia:", error);
    }
}
