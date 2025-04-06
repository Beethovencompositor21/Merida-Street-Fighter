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
    }

    atacar(enemigo) {
        let danioBase = this.ataque;
        if (this.armaEquipada) {
            danioBase += this.armaEquipada.ataque;
        }
        let danio = Math.max(1, danioBase - enemigo.defensa);
        enemigo.vida -= danio;
        console.log(`⚔ ${this.nombre} ataca a ${enemigo.nombre} con ${this.armaEquipada ? this.armaEquipada.nombre : "sus puños"} y causa ${danio} de daño.`);
        return `⚔ ${this.nombre} ataca a ${enemigo.nombre} con ${this.armaEquipada ? this.armaEquipada.nombre : "sus puños"} y causa ${danio} de daño.`;
    }

    ataqueFuerte(enemigo) {
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
    }

    defender() {
        this.defensa += 5;
        console.log(`🛡️ ${this.nombre} se defiende y reduce el daño recibido en el próximo turno.`);
        return `🛡️ ${this.nombre} se defiende y reduce el daño recibido en el próximo turno.`;
    }

    usarObjeto(objeto) {
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
    }

    curar() {
        this.vida += 20;
        if (this.vida > this.vidaMaxima) {
            this.vida = this.vidaMaxima; // Asegura que la vida no exceda la vida máxima
        }
        console.log(`❤️ ${this.nombre} se cura y recupera 20 puntos de vida.`);
        return `❤️ ${this.nombre} se cura y recupera 20 puntos de vida.`;
    }

    recibirDanio(danio) {
        if (this.defendiendo) {
            danio = Math.max(1, danio / 2); // Reduce el daño a la mitad si el jugador está defendiendo
            this.defendiendo = false; // Reinicia el estado de defensa
        }
        this.vida -= danio;
        console.log(`💥 ${this.nombre} recibe ${danio} de daño.`);
        return `💥 ${this.nombre} recibe ${danio} de daño.`;
    }

    subirNivel() {
        this.nivel++;
        this.vida += 10;
        this.vidaMaxima += 10;
        this.ataque += 5;
        this.defensa += 2;
        console.log(`⬆ ${this.nombre} ha subido a nivel ${this.nivel}!`);
        return `⬆ ${this.nombre} ha subido a nivel ${this.nivel}!`;
    }

    agregarAlInventario(objeto) {
        this.inventario.push(objeto);
        console.log(`📦 ${objeto.nombre} añadido al inventario.`);
    }

    equiparArma(nombreArma) {
        let arma = this.inventario.find(item => item.nombre === nombreArma);
        if (arma) {
            this.armaEquipada = arma;
            console.log(`🔪 ${this.nombre} ha equipado ${arma.nombre}.`);
            alert(`Has equipado ${arma.nombre}.`);
        } else {
            alert("No tienes esta arma en tu inventario.");
        }
    }

    equiparArmadura(nombreArmadura) {
        let armadura = this.inventario.find(item => item.nombre === nombreArmadura);
        if (armadura) {
            this.armaduraEquipada = armadura;
            console.log(`🛡️ ${this.nombre} ha equipado ${armadura.nombre}.`);
            alert(`Has equipado ${armadura.nombre}.`);
        } else {
            alert("No tienes esta armadura en tu inventario.");
        }
    }

    ganarExperiencia(cantidad) {
        this.experiencia += cantidad;
        console.log(`🌟 ${this.nombre} ha ganado ${cantidad} puntos de experiencia.`);
        if (this.experiencia >= 100) {
            this.experiencia -= 100;
            this.subirNivel();
        }
    }
}
