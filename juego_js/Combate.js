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
            () => {
                console.log("🌧️ ¡Una lluvia repentina reduce la visibilidad!");
                this.personaje.ataque -= 2;
                this.enemigo.defensa += 2;
                alert("🌧️ ¡Una lluvia repentina reduce la visibilidad! Tu ataque disminuye y la defensa del enemigo aumenta.");
            },
            () => {
                console.log("🌪️ ¡Un viento fuerte sopla a través del campo de batalla!");
                this.personaje.defensa -= 2;
                this.enemigo.ataque += 2;
                alert("🌪️ ¡Un viento fuerte sopla a través del campo de batalla! Tu defensa disminuye y el ataque del enemigo aumenta.");
            },
            () => {
                console.log("🌩️ ¡Un rayo cae cerca, iluminando todo!");
                this.personaje.ataque += 3;
                this.enemigo.defensa -= 3;
                alert("🌩️ ¡Un rayo cae cerca, iluminando todo! Tu ataque aumenta y la defensa del enemigo disminuye.");
            },
            () => {
                console.log("🌟 ¡Una estrella fugaz cruza el cielo, dando suerte al personaje!");
                this.personaje.vida += 10;
                alert("🌟 ¡Una estrella fugaz cruza el cielo, dando suerte al personaje! Tu vida aumenta.");
            },
            () => {
                console.log("🌋 ¡El suelo tiembla y se abre una grieta!");
                this.enemigo.vida -= 10;
                alert("🌋 ¡El suelo tiembla y se abre una grieta! La vida del enemigo disminuye.");
            },
            () => {
                console.log("🌀 ¡Un remolino aparece y confunde al enemigo!");
                this.enemigo.ataque -= 3;
                alert("🌀 ¡Un remolino aparece y confunde al enemigo! El ataque del enemigo disminuye.");
            }
        ];
        try {
            const evento = eventos[Math.floor(Math.random() * eventos.length)];
            evento();
            actualizarVida();
        } catch (error) {
            console.error("Error al ejecutar el evento aleatorio:", error);
        }
    }
}

let enemigoActual;
let zonaActual;

function iniciarCombate(enemigo, zona) {
    try {
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
                alert("¡Has sido derrotado......AL HOYO 🕳️");
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
                        const experienciaGanada = 20;
                        jugador.ganarExperiencia(experienciaGanada);
                        actualizarExperiencia();
                        jugador.dinero += enemigoActual.recompensa;
                        guardarPartida(jugador);
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
                        const experienciaGanada = 20;
                        jugador.ganarExperiencia(experienciaGanada);
                        actualizarExperiencia();
                        jugador.dinero += enemigoActual.recompensa;
                        guardarPartida(jugador);
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
                    mostrarCampoDeBatalla(enemigoActual);
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
