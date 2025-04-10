class CreadorPersonaje {
    constructor() {
        this.nombre = "";
        this.apariencia = "Humano";
        this.colorCabello = "Castaño";
        this.tipoArmadura = "Cuero";
        this.estadisticas = {
            vida: 100,
            ataque: 10,
            defensa: 5,
            puntosDisponibles: 15
        };
        this.armaBasica = null;
    }

    mostrarCreador() {
        try {
            document.body.innerHTML = `
                <div class="container">
                    <h1>Creador de Personajes</h1>
                    <div class="personaje-imagen">
                        <img id="imagenPersonaje" src="imagenes/humano.png" alt="Personaje">
                    </div>
                    <label for="nombre">Nombre:</label>
                    <input type="text" id="nombre" placeholder="Introduce el nombre">

                    <label for="apariencia">Apariencia (Modifica tus estadísticas):</label>
                    <select id="apariencia" class="select-style">
                        <option value="Humano" ${this.apariencia === 'Humano' ? 'selected' : ''}>Humano</option>
                        <option value="Elfo" ${this.apariencia === 'Elfo' ? 'selected' : ''}>Elfo</option>
                        <option value="Enano" ${this.apariencia === 'Enano' ? 'selected' : ''}>Enano</option>
                    </select>

                    <label for="colorCabello">Color de Cabello:</label>
                    <select id="colorCabello" class="select-style">
                        <option value="Castaño" ${this.colorCabello === 'Castaño' ? 'selected' : ''}>Castaño</option>
                        <option value="Rubio" ${this.colorCabello === 'Rubio' ? 'selected' : ''}>Rubio</option>
                        <option value="Pelirrojo" ${this.colorCabello === 'Pelirrojo' ? 'selected' : ''}>Pelirrojo</option>
                        <option value="Negro" ${this.colorCabello === 'Negro' ? 'selected' : ''}>Negro</option>
                    </select>

                    <label for="tipoArmadura">Tipo de Armadura:</label>
                    <select id="tipoArmadura" class="select-style">
                        <option value="Cuero" ${this.tipoArmadura === 'Cuero' ? 'selected' : ''}>Cuero</option>
                        <option value="Malla" ${this.tipoArmadura === 'Malla' ? 'selected' : ''}>Malla</option>
                        <option value="Placas" ${this.tipoArmadura === 'Placas' ? 'selected' : ''}>Placas</option>
                    </select>

                    <label for="estadisticas">Estadísticas (Puntos disponibles: ${this.estadisticas.puntosDisponibles}) (tras elegir personaje)</label>
                    <div class="stat-container">
                        <div>
                            <label>Vida: ${this.estadisticas.vida}</label>
                            <button ${this.estadisticas.puntosDisponibles <= 0 ? 'disabled' : ''} onclick="creadorPersonaje.modificarEstadistica('vida', 5)">+</button>
                        </div>
                        <div>
                            <label>Ataque: ${this.estadisticas.ataque}</label>
                            <button ${this.estadisticas.puntosDisponibles <= 0 ? 'disabled' : ''} onclick="creadorPersonaje.modificarEstadistica('ataque', 1)">+</button>
                        </div>
                        <div>
                            <label>Defensa: ${this.estadisticas.defensa}</label>
                            <button ${this.estadisticas.puntosDisponibles <= 0 ? 'disabled' : ''} onclick="creadorPersonaje.modificarEstadistica('defensa', 1)">+</button>
                        </div>
                    </div>

                    <label for="arma">Arma Básica:</label>
                    <select id="arma" class="select-style">
                        <option value="Espada">Espada</option>
                        <option value="Arco">Arco</option>
                        <option value="Hacha">Hacha</option>
                    </select>

                    <button class="btn-crear" onclick="creadorPersonaje.crearPersonaje()">
                        <img src="iconos/crear.png" alt="Crear Personaje" width="20"> Crear Personaje
                    </button>
                </div>
            `;

            document.getElementById('apariencia').addEventListener('change', () => {
                this.apariencia = document.getElementById('apariencia').value;
                this.actualizarImagenPersonaje();
                this.asignarCaracteristicasIniciales();
                this.actualizarEstadisticas();
            });

            document.getElementById('colorCabello').addEventListener('change', () => {
                this.colorCabello = document.getElementById('colorCabello').value;
            });

            document.getElementById('tipoArmadura').addEventListener('change', () => {
                this.tipoArmadura = document.getElementById('tipoArmadura').value;
            });
        } catch (error) {
            console.error("Error al mostrar el creador de personajes:", error);
        }
    }

    modificarEstadistica(estadistica, valor) {
        try {
            if (this.estadisticas.puntosDisponibles >= valor) {
                this.estadisticas[estadistica] += valor;
                this.estadisticas.puntosDisponibles -= valor;
                this.actualizarEstadisticas();
            } else {
                alert("No tienes suficientes puntos disponibles.");
            }
        } catch (error) {
            console.error("Error al modificar la estadística:", error);
        }
    }

    crearPersonaje() {
        try {
            this.nombre = document.getElementById('nombre').value;
            const armaSeleccionada = document.getElementById('arma').value;

            if (this.nombre && this.estadisticas.puntosDisponibles === 0) {
                jugador = new Personaje(
                    this.nombre,
                    this.estadisticas.vida,
                    this.estadisticas.ataque,
                    this.estadisticas.defensa,
                    20
                );

                // Equipar el arma seleccionada
                const armasDisponibles = {
                    Espada: { nombre: "Espada", ataque: 5 },
                    Arco: { nombre: "Arco", ataque: 7 },
                    Hacha: { nombre: "Hacha", ataque: 6 }
                };

                if (armasDisponibles[armaSeleccionada]) {
                    jugador.equiparArma(armasDisponibles[armaSeleccionada]);
                } else {
                    alert("Arma no disponible.");
                }

                mostrarLobby(); // Redirige al lobby después de crear el personaje
            } else {
                alert("Debes distribuir todos los puntos disponibles y proporcionar un nombre.");
            }
        } catch (error) {
            console.error("Error al crear el personaje:", error);
        }
    }

    asignarCaracteristicasIniciales() {
        try {
            switch (this.apariencia) {
                case 'Humano':
                    this.estadisticas.vida = 100;
                    this.estadisticas.ataque = 10;
                    this.estadisticas.defensa = 7;
                    break;
                case 'Elfo':
                    this.estadisticas.vida = 90;
                    this.estadisticas.ataque = 17;
                    this.estadisticas.defensa = 5;
                    break;
                case 'Enano':
                    this.estadisticas.vida = 120;
                    this.estadisticas.ataque = 8;
                    this.estadisticas.defensa = 15;
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error al asignar características iniciales:", error);
        }
    }

    actualizarImagenPersonaje() {
        try {
            const imagenPersonaje = document.getElementById('imagenPersonaje');
            switch (this.apariencia) {
                case 'Humano':
                    imagenPersonaje.src = 'imagenes/humano.png';
                    break;
                case 'Elfo':
                    imagenPersonaje.src = 'imagenes/elfo.png';
                    break;
                case 'Enano':
                    imagenPersonaje.src = 'imagenes/enano.png';
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error("Error al actualizar la imagen del personaje:", error);
        }
    }

    actualizarEstadisticas() {
        try {
            document.querySelector('label[for="estadisticas"]').innerText = `Estadísticas (Puntos disponibles: ${this.estadisticas.puntosDisponibles}) (tras elegir personaje)`;
            document.querySelector('.stat-container div:nth-child(1) label').innerText = `Vida(5): ${this.estadisticas.vida}`;
            document.querySelector('.stat-container div:nth-child(2) label').innerText = `Ataque(1): ${this.estadisticas.ataque}`;
            document.querySelector('.stat-container div:nth-child(3) label').innerText = `Defensa(1): ${this.estadisticas.defensa}`;
        } catch (error) {
            console.error("Error al actualizar las estadísticas:", error);
        }
    }
}

const creadorPersonaje = new CreadorPersonaje();
