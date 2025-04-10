class AudioManager {
    constructor() {
        try {
            // Inicializa el contexto de audio y el elemento de audio para la música de fondo
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.musicaFondo = document.getElementById('musica-fondo');
            this.musicaFondo.volume = 0.4; // Ajustar el volumen de la música de fondo
        } catch (error) {
            console.error("Error al inicializar el AudioManager:", error);
        }
    }

    // Método para reproducir la música de fondo
    reproducirMusica() {
        try {
            this.musicaFondo.play().catch(error => {
                console.error("Error al reproducir la música:", error);
            });
        } catch (error) {
            console.error("Error en la función reproducirMusica:", error);
        }
    }

    // Método para pausar la música de fondo
    pausarMusica() {
        try {
            this.musicaFondo.pause();
        } catch (error) {
            console.error("Error en la función pausarMusica:", error);
        }
    }
}

// Crear una instancia del AudioManager
const audioManager = new AudioManager();

// Reproducir la música de fondo cuando se hace clic en el cuerpo del documento
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function() {
        audioManager.reproducirMusica();
        document.body.removeEventListener('click', arguments.callee);
    });
});
