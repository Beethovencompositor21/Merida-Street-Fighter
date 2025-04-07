class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.musicaFondo = document.getElementById('musica-fondo');
        this.musicaFondo.volume = 0.5; // Ajustar el volumen
        this.sonidoClic = document.getElementById('sonido-clic');
        this.sonidoClic.volume = 0.5; // Ajustar el volumen
    }

    reproducirMusica() {
        this.musicaFondo.play().catch(error => {
            console.error("Error al reproducir la música:", error);
        });
    }

    pausarMusica() {
        this.musicaFondo.pause();
    }

    reproducirSonidoClic() {
        this.sonidoClic.currentTime = 0; // Reiniciar el sonido
        this.sonidoClic.play().catch(error => {
            console.error("Error al reproducir el sonido de clic:", error);
        });
    }
}

const audioManager = new AudioManager();

// Reproducir música de fondo después de una interacción del usuario
document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', function() {
        audioManager.reproducirMusica();
        // Remover el evento después de la primera interacción
        document.body.removeEventListener('click', arguments.callee);
    });

    // Añadir el sonido de clic a todos los botones
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            audioManager.reproducirSonidoClic();
        });
    });
});
