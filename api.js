let fotos = document.querySelector('#fotos');
let titulo = document.querySelector('#titulo');
let jugadores = document.querySelector('#jugadores');
let listaDeJugadores = document.querySelector('#listaDeJugadores');

let API_KEY = 'fe9acb8707cf09c5175af185c9c0c9b4'; 
let liga = 39; 
let temporada = 2023;  

jugadores.addEventListener('click', function() {
    fetch(`https://v3.football.api-sports.io/players?league=${liga}&season=${temporada}&page=1`, {
        headers: {
            'x-apisports-key': API_KEY
        }
    })
    .then(response => response.json())
    .then(info => {
        let jugadoresArray = info.response.map(j => j.player);
        let jugadorAleatorio = jugadoresArray[Math.floor(Math.random() * jugadoresArray.length)];

        fotos.src = jugadorAleatorio.photo;
        fotos.alt = jugadorAleatorio.name;
        titulo.textContent = jugadorAleatorio.name;

        listaDeJugadores.innerHTML = "";
        let item = document.createElement('li');
        item.textContent = `${jugadorAleatorio.name} - ${jugadorAleatorio.nationality} (${jugadorAleatorio.birth.date})`;
        listaDeJugadores.appendChild(item);
    })
    .catch(error => {
        console.error("Error al hacer la petición:", error);
        alert('Error al cargar el futbolista. Intenta nuevamente.');
    });
});