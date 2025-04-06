class Zona {
    constructor(nombre, descripcion, enemigos) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.enemigos = enemigos;
    }
}

const zonas = [
    new Zona("Bosque Encantado", "Un bosque lleno de vegetales agresivos.", [
        new Enemigo("Brocoli Feroz", 25, 5, 2, 5, null),
        new Enemigo("Lechuga impasible", 35, 8, 3, 10, null)
    ]),
    new Zona("Desierto Árido", "Un desierto caluroso como Extremadura en Verano.", [
        new Enemigo("Asfalto a 42 grados", 40, 9, 4, 15, null),
        new Enemigo("Cerveza caliente", 30, 7, 3, 8, null)
    ]),
    new Zona("Montaña Nevada", "Una montaña con mucho riesgo.", [
        new Enemigo("Frigo pie", 50, 10, 5, 20, null),
        new Enemigo("Yeti", 60, 12, 6, 25, null)
    ]),
    new Zona("Cueva Oscura", "Una cueva llena de informáticos lunáticos.", [
        new Enemigo("Estudiante de DAM", 45, 9, 4, 18, null),
        new Enemigo("Estudiante de DAW", 55, 11, 6, 22, null)
    ]),
    new Zona("Pantano Misterioso", "Un pantano lleno de criaturas desconocidas.", [
        new Enemigo("Caballero Negro", 90, 22, 12, 60, null),
        new Enemigo("Arquero Élfico", 65, 18, 7, 45, null)
    ])
];

function explorarZona(zona) {
    alert(`Estás explorando ${zona.nombre}. ${zona.descripcion}`);
    const enemigo = zona.enemigos[Math.floor(Math.random() * zona.enemigos.length)];
    alert(`Te encuentras con un ${enemigo.nombre}!`);
    iniciarCombate(enemigo);
    // Eliminar el enemigo derrotado de la lista de enemigos disponibles
    zona.enemigos = zona.enemigos.filter(e => e !== enemigo);
}

function mostrarMapa() {
    let mensaje = "Elige una zona para explorar:\n";
    zonas.forEach((zona, index) => {
        mensaje += `${index + 1}. ${zona.nombre}\n`;
    });
    const eleccion = prompt(mensaje);
    if (eleccion >= 1 && eleccion <= zonas.length) {
        explorarZona(zonas[eleccion - 1]);
    } else {
        alert("Selección inválida.");
    }
}
