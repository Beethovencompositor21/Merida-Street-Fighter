class Enemigo {
    constructor(nombre, vida, ataque, defensa, recompensa, habilidadEspecial) {
        this.nombre = nombre;
        this.vida = vida;
        this.vidaMaxima = vida;
        this.ataque = ataque;
        this.defensa = defensa;
        this.recompensa = recompensa;
        this.habilidadEspecial = habilidadEspecial;
    }

    atacar(personaje) {
        try {
            let danio = Math.max(1, this.ataque - personaje.defensa);
            personaje.vida -= danio;
            console.log(`⚔ ${this.nombre} ataca a ${personaje.nombre} y causa ${danio} de daño.`);
            return `⚔ ${this.nombre} ataca a ${personaje.nombre} y causa ${danio} de daño.`;
        } catch (error) {
            console.error("Error en el método atacar del enemigo:", error);
        }
    }

    usarHabilidadEspecial(personaje) {
        try {
            if (this.habilidadEspecial) {
                this.habilidadEspecial(personaje);
            }
        } catch (error) {
            console.error("Error al usar la habilidad especial del enemigo:", error);
        }
    }
}

const enemigosDisponibles = [
    new Enemigo("🧟 Goblin", 40, 8, 2, 10, (personaje) => {
        personaje.vida -= 10;
        console.log(`🐺 ${this.nombre} usa Garra Salvaje y causa 10 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("👤 Orco", 60, 12, 5, 20, (personaje) => {
        personaje.vida -= 15;
        console.log(`💥 ${this.nombre} usa Golpe Brutal y causa 15 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🐉 Dragón", 100, 20, 10, 50, (personaje) => {
        personaje.vida -= 25;
        console.log(`🔥 ${this.nombre} usa Aliento de Fuego y causa 25 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("💀 Esqueleto", 35, 7, 3, 15, (personaje) => {
        personaje.vida -= 8;
        console.log(`💀 ${this.nombre} usa Golpe Fantasmal y causa 8 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo(" Troll", 70, 15, 6, 30, (personaje) => {
        personaje.vida -= 20;
        console.log(`🌱 ${this.nombre} usa Golpe de Roca y causa 20 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("👹 Ogro", 80, 18, 8, 40, (personaje) => {
        personaje.vida -= 30;
        console.log(`🏹 ${this.nombre} usa Lanzamiento de Roca y causa 30 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🧙‍♂️ Mago Oscuro", 50, 10, 4, 25, (personaje) => {
        personaje.vida -= 12;
        console.log(`🔮 ${this.nombre} usa Maldición Oscura y causa 12 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🏇 Caballero Negro", 90, 22, 12, 60, (personaje) => {
        personaje.vida -= 35;
        console.log(`🏇️ ${this.nombre} usa Carga de Caballería y causa 35 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🏹 Arquero Élfico", 65, 18, 7, 45, (personaje) => {
        personaje.vida -= 25;
        console.log(`🏹️ ${this.nombre} usa Flecha Precisa y causa 25 de daño a ${personaje.nombre}.`);
    })
];
