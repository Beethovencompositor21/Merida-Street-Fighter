class Personaje {
    constructor(nombre, vida, ataque, defensa, dinero) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMaxima = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.dinero = dinero;
        this.experiencia = 0;
        this.nivel = 1;
        this.inventario = [];
        this.armaEquipada = null;
        this.armaduraEquipada = null;
        this.descanso = false;
        this.escudoTemporal = 0; // Nuevo atributo para el escudo temporal
        this.contraataque = false; // Nuevo atributo para el contraataque
    }

    atacar(enemigo) {
        try {
            let danioBase = this.ataque;
            if (this.armaEquipada) {
                danioBase += this.armaEquipada.ataque;
            }
            let danio = Math.max(1, danioBase - enemigo.defensa);
            enemigo.vida -= danio;
            console.log(`⚔ ${this.nombre} ataca a ${enemigo.nombre} con ${this.armaEquipada ? this.armaEquipada.nombre : "sus puños"} y causa ${danio} de daño.`);
            return `⚔ ${this.nombre} ataca a ${enemigo.nombre} con ${this.armaEquipada ? this.armaEquipada.nombre : "sus puños"} y causa ${danio} de daño.`;
        } catch (error) {
            console.error("Error en el método atacar del personaje:", error);
        }
    }

    ataqueFuerte(enemigo) {
        try {
            let danioBase = this.ataque * 1.5;
            if (this.armaEquipada) {
                danioBase += this.armaEquipada.ataque;
            }
            let danio = Math.max(1, danioBase - enemigo.defensa);
            enemigo.vida -= danio;
            console.log(`⚡ ${this.nombre} usa Ataque Fuerte y causa ${danio} de daño a ${enemigo.nombre}.`);

            // Segundo golpe
            danio = Math.max(1, this.ataque - enemigo.defensa);
            enemigo.vida -= danio;
            console.log(`⚡ ${this.nombre} golpea de nuevo y causa ${danio} de daño a ${enemigo.nombre}.`);

            this.descanso = true; // El jugador entra en estado de descanso

            return `⚡ ${this.nombre} usa Ataque Fuerte y causa ${danio} de daño a ${enemigo.nombre}. ¡Y golpea de nuevo!`;
        } catch (error) {
            console.error("Error en el método ataqueFuerte del personaje:", error);
        }
    }

    defender() {
        try {
            this.defensa += 5;
            this.escudoTemporal = 10; // Añadir un escudo temporal que absorbe 10 puntos de daño
            this.contraataque = true; // Activar el contraataque
            console.log(`🛡️ ${this.nombre} se defiende y reduce el daño recibido en el próximo turno. ¡Escudo temporal activado!`);
            return `🛡️ ${this.nombre} se defiende y reduce el daño recibido en el próximo turno. ¡Escudo temporal activado!`;
        } catch (error) {
            console.error("Error en el método defender del personaje:", error);
        }
    }

    usarObjeto(objeto) {
        try {
            if (objeto.nombre.includes("Poción de Curación")) {
                this.vida += 20;
                if (this.vida > this.vidaMaxima) {
                    this.vida = this.vidaMaxima; // Asegura que la vida no exceda la vida máxima
                }
                console.log(`❤️ ${this.nombre} usa ${objeto.nombre} y recupera 20 puntos de vida.`);
                return `❤️ ${this.nombre} usa ${objeto.nombre} y recupera 20 puntos de vida.`;
            } else if (objeto.ataque) {
                this.equiparArma(objeto.nombre);
                console.log(`🔪 ${this.nombre} equipa ${objeto.nombre} y aumenta su ataque.`);
                return `🔪 ${this.nombre} equipa ${objeto.nombre} y aumenta su ataque.`;
            } else if (objeto.defensa) {
                this.equiparArmadura(objeto.nombre);
                console.log(`🛡️ ${this.nombre} equipa ${objeto.nombre} y aumenta su defensa.`);
                return `🛡️ ${this.nombre} equipa ${objeto.nombre} y aumenta su defensa.`;
            }
        } catch (error) {
            console.error("Error en el método usarObjeto del personaje:", error);
        }
    }

    curar() {
        try {
            this.vida += 20;
            if (this.vida > this.vidaMaxima) {
                this.vida = this.vidaMaxima; // Asegura que la vida no exceda la vida máxima
            }
            console.log(`❤️ ${this.nombre} se cura y recupera 20 puntos de vida.`);
            return `❤️ ${this.nombre} se cura y recupera 20 puntos de vida.`;
        } catch (error) {
            console.error("Error en el método curar del personaje:", error);
        }
    }

    recibirDanio(danio) {
        try {
            if (this.escudoTemporal > 0) {
                const danioAbsorbido = Math.min(danio, this.escudoTemporal);
                this.escudoTemporal -= danioAbsorbido;
                danio -= danioAbsorbido;
                console.log(`🛡️ Escudo temporal absorbe ${danioAbsorbido} de daño.`);
            }
            if (this.defendiendo) {
                danio = Math.max(1, danio / 2); // Reduce el daño a la mitad si el jugador está defendiendo
                this.defendiendo = false; // Reinicia el estado de defensa
            }
            this.vida -= danio;
            console.log(`💥 ${this.nombre} recibe ${danio} de daño.`);
            return `💥 ${this.nombre} recibe ${danio} de daño.`;
        } catch (error) {
            console.error("Error en el método recibirDanio del personaje:", error);
        }
    }

    subirNivel() {
        try {
            this.nivel++;
            this.vida += 10;
            this.vidaMaxima += 10;
            this.ataque += 5;
            this.defensa += 2;
            console.log(`⬆ ${this.nombre} ha subido a nivel ${this.nivel}!`);
            return `⬆ ${this.nombre} ha subido a nivel ${this.nivel}!`;
        } catch (error) {
            console.error("Error en el método subirNivel del personaje:", error);
        }
    }

    ganarExperiencia(cantidad) {
        try {
            this.experiencia += cantidad;
            console.log(`🌟 ${this.nombre} ha ganado ${cantidad} puntos de experiencia.`);
            if (this.experiencia >= 100) {
                this.experiencia -= 100;
                this.subirNivel();
            }
        } catch (error) {
            console.error("Error en el método ganarExperiencia del personaje:", error);
        }
    }

    agregarAlInventario(objeto) {
        try {
            this.inventario.push(objeto);
            console.log(`📦 ${objeto.nombre} añadido al inventario.`);
        } catch (error) {
            console.error("Error en el método agregarAlInventario del personaje:", error);
        }
    }

    equiparArma(nombreArma) {
        try {
            const armasDisponibles = {
                Espada: { nombre: "Espada", ataque: 5 },
                Arco: { nombre: "Arco", ataque: 7 },
                Hacha: { nombre: "Hacha", ataque: 6 }
            };
            if (armasDisponibles[nombreArma]) {
                this.armaEquipada = armasDisponibles[nombreArma];
                console.log(`🔪 ${this.nombre} ha equipado ${this.armaEquipada.nombre}.`);
                alert(`Has equipado ${this.armaEquipada.nombre}.`);
            } else {
                alert("Arma no disponible.");
            }
        } catch (error) {
            console.error("Error en el método equiparArma del personaje:", error);
        }
    }

    equiparArmadura(nombreArmadura) {
        try {
            let armadura = this.inventario.find(item => item.nombre === nombreArmadura);
            if (armadura) {
                this.armaduraEquipada = armadura;
                console.log(`🛡️ ${this.nombre} ha equipado ${armadura.nombre}.`);
                alert(`Has equipado ${armadura.nombre}.`);
            } else {
                alert("No tienes esta armadura en tu inventario.");
            }
        } catch (error) {
            console.error("Error en el método equiparArmadura del personaje:", error);
        }
    }

    contraataque(enemigo) {
        try {
            if (this.contraataque) {
                let danioBase = this.ataque;
                if (this.armaEquipada) {
                    danioBase += this.armaEquipada.ataque;
                }
                let danio = Math.max(1, danioBase - enemigo.defensa);
                enemigo.vida -= danio;
                console.log(`🌀 ${this.nombre} realiza un contraataque y causa ${danio} de daño a ${enemigo.nombre}.`);
                this.contraataque = false; // Desactivar el contraataque después de usarlo
                return `🌀 ${this.nombre} realiza un contraataque y causa ${danio} de daño a ${enemigo.nombre}.`;
            }
        } catch (error) {
            console.error("Error en el método contraataque del personaje:", error);
        }
    }
}
