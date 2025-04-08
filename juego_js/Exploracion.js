class Zona {
    constructor(nombre, descripcion, enemigos) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.enemigos = enemigos;
    }
}

const zonas = [
    new Zona("🌳 Bosque Encantado", "Un bosque lleno de criaturas mágicas y peligros desconocidos.", enemigosDisponibles),
    new Zona("🌑 Cueva Oscura", "Una cueva llena de trampas y enemigos poderosos.", enemigosDisponibles),
    new Zona("🏜 Desierto Árido", "Un desierto vasto y peligroso, lleno de criaturas hostiles.", enemigosDisponibles),
    new Zona("⛰️ Montaña Nevada", "Una montaña cubierta de nieve con enemigos resistentes al frío.", enemigosDisponibles)
];

function explorarZona(zona) {
    try {
        alert(`Estás explorando el ${zona.nombre}. ${zona.descripcion}`);
        const enemigo = zona.enemigos[Math.floor(Math.random() * zona.enemigos.length)];
        alert(`Te encuentras con un ${enemigo.nombre}!`);
        iniciarCombate(enemigo, zona);
    } catch (error) {
        console.error("Error al explorar la zona:", error);
    }
}

function mostrarMapa() {
    try {
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
    } catch (error) {
        console.error("Error al mostrar el mapa:", error);
    }
}
