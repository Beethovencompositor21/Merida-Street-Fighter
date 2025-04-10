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

    // Método para atacar al personaje
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

    // Método para usar la habilidad especial del enemigo
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

// Definir los enemigos disponibles con sus habilidades especiales
const enemigosDisponibles = [
    new Enemigo("🧟 Goblin", 50, 10, 3, 15, (personaje) => {
        personaje.vida -= 15;
        console.log(`🐺 ${this.nombre} usa Garra Salvaje y causa 15 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("👤 Orco", 70, 15, 5, 25, (personaje) => {
        personaje.vida -= 20;
        console.log(`💥 ${this.nombre} usa Golpe Brutal y causa 20 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🐉 Dragón", 120, 25, 10, 60, (personaje) => {
        personaje.vida -= 30;
        console.log(`🔥 ${this.nombre} usa Aliento de Fuego y causa 30 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("💀 Esqueleto", 40, 8, 4, 20, (personaje) => {
        personaje.vida -= 10;
        console.log(`💀 ${this.nombre} usa Golpe Fantasmal y causa 10 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo(" Troll", 80, 18, 7, 35, (personaje) => {
        personaje.vida -= 25;
        console.log(`🌱 ${this.nombre} usa Golpe de Roca y causa 25 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("👹 Ogro", 100, 20, 8, 45, (personaje) => {
        personaje.vida -= 35;
        console.log(`🏹 ${this.nombre} usa Lanzamiento de Roca y causa 35 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🧙‍♂️ Mago Oscuro", 60, 15, 5, 30, (personaje) => {
        personaje.vida -= 20;
        console.log(`🔮 ${this.nombre} usa Maldición Oscura y causa 20 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🏇 Caballero Negro", 110, 25, 12, 70, (personaje) => {
        personaje.vida -= 40;
        console.log(`🏇️ ${this.nombre} usa Carga de Caballería y causa 40 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🏹 Arquero Élfico", 75, 20, 8, 50, (personaje) => {
        personaje.vida -= 25;
        console.log(`🏹️ ${this.nombre} usa Flecha Precisa y causa 25 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🌳 Ent", 90, 12, 6, 40, (personaje) => {
        personaje.vida -= 15;
        console.log(`🌳 ${this.nombre} usa Raíces Enredaderas y causa 15 de daño a ${personaje.nombre}.`);
    }),
    new Enemigo("🌊 Sirena", 65, 10, 5, 35, (personaje) => {
        personaje.vida -= 10;
        console.log(`🌊 ${this.nombre} usa Canto Hipnótico y causa 10 de daño a ${personaje.nombre}.`);
    })
];
