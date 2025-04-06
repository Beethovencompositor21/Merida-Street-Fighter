class AudioManager {
    constructor() {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.sonidos = this.cargarSonidos();
        this.musicaFondo = new Audio('musica/fondo.mp3');
        this.musicaFondo.loop = true; // Repetir la música
        this.musicaFondo.volume = 0.5; // Ajustar el volumen
    }

    cargarSonidos() {
        return {
            ataque: new Audio('sonidos/ataque.mp3'),
            defensa: new Audio('sonidos/defensa.mp3'),
            curacion: new Audio('sonidos/curacion.mp3'),
            // Añade más sonidos según sea necesario
        };
    }

    reproducirSonido(nombre) {
        if (this.sonidos[nombre]) {
            this.sonidos[nombre].currentTime = 0; // Reiniciar el sonido
            this.sonidos[nombre].play();
        }
    }

    reproducirMusica() {
        this.musicaFondo.play();
    }

    pausarMusica() {
        this.musicaFondo.pause();
    }
}

const audioManager = new AudioManager();
