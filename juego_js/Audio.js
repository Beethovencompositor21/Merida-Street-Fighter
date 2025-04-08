class AudioManager {
    constructor() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.musicaFondo = document.getElementById('musica-fondo');
            this.musicaFondo.volume = 0.4; // Ajustar el volumen
        } catch (error) {
            console.error("Error al inicializar el AudioManager:", error);
        }
    }

    reproducirMusica() {
        try {
            this.musicaFondo.play().catch(error => {
                console.error("Error al reproducir la música:", error);
            });
        } catch (error) {
            console.error("Error en la función reproducirMusica:", error);
        }
    }

    pausarMusica() {
        try {
            this.musicaFondo.pause();
        } catch (error) {
            console.error("Error en la función pausarMusica:", error);
        }
    }
}

const audioManager = new AudioManager();
const audioClick = new Audio("Click.mp3");

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function() {
        audioManager.reproducirMusica();
        document.body.removeEventListener('click', arguments.callee);
    });
});
