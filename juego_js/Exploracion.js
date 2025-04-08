class Zona {
    constructor(nombre, descripcion, enemigos) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.enemigos = enemigos;
    }
}

const zonas = [
    new Zona("🌳 Emeritus Arboledus", "Un bosque lleno de criaturas mágicas y peligros desconocidos.", enemigosDisponibles),
    new Zona("🌑 Cueva Oscura", "Una cueva llena de trampas y enemigos poderosos.", enemigosDisponibles),
    new Zona("🏜 Desierto Árido", "Un desierto vasto y peligroso, lleno de criaturas hostiles.", enemigosDisponibles),
    new Zona("⛰️ Montaña Nevada", "Una montaña cubierta de nieve con enemigos resistentes al frío.", enemigosDisponibles),
    new Zona("🌊 Lago Misterioso", "Un lago profundo y misterioso, habitado por criaturas acuáticas.", enemigosDisponibles),
    new Zona("🏰 Castillo Abandonado", "Un castillo antiguo y abandonado, lleno de secretos y peligros.", enemigosDisponibles)
];

function explorarZona(zona) {
    alert(`Estás explorando el ${zona.nombre}. ${zona.descripcion}`);
    const enemigo = zona.enemigos[Math.floor(Math.random() * zona.enemigos.length)];
    alert(`Te encuentras con un ${enemigo.nombre}!`);
    iniciarCombate(enemigo, zona);
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
