// Establece la fecha y hora de la cuenta regresiva
var countDownDate = new Date("Aug 30, 2024 00:00:00").getTime();

// Actualiza la cuenta regresiva cada segundo
var countdownfunction = setInterval(function() {

    // Obtiene la fecha y hora actual
    var now = new Date().getTime();

    // Encuentra la distancia entre ahora y la fecha de la cuenta regresiva
    var distance = countDownDate - now;

    // Calcula el tiempo para días, horas, minutos y segundos
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Muestra el resultado en los elementos con id="days", "hours", "minutes" y "seconds"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Si la cuenta regresiva termina, escribe algún texto 
    if (distance < 0) {
        clearInterval(countdownfunction);
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
    }
}, 1000);



// Primero, necesitamos cargar la API de YouTube en nuestra página.
// Creamos un nuevo elemento de script y establecemos su fuente en la URL de la API de YouTube.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";

// Luego, obtenemos el primer elemento de script en la página.
var firstScriptTag = document.getElementsByTagName('script')[0];

// Insertamos nuestro nuevo script antes del primer script en la página.
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// Declaramos una variable para nuestro reproductor de YouTube. Esta será inicializada más tarde.
var player;

// Esta función se llamará automáticamente cuando la API de YouTube esté lista.
function onYouTubeIframeAPIReady() {
    // Creamos un nuevo reproductor de YouTube.
    // Le damos un tamaño, le decimos qué video reproducir inicialmente y le damos algunas funciones de manejo de eventos.
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        videoId: 'gVUs4oFKJmY',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

// Esta función se llamará cuando el reproductor esté listo.
// Hacemos que el reproductor reproduzca el video automáticamente.
function onPlayerReady(event) {
    event.target.playVideo();
}

// Aquí obtenemos todos los enlaces de video en la página.
var videoLinks = document.querySelectorAll('.lista__videos__link a');

// Para cada enlace, agregamos un manejador de eventos de clic.
videoLinks.forEach(function(link) {
    link.addEventListener('click', function(e) {
        // Evitamos que el enlace haga su acción predeterminada (que es navegar a otra página).
        e.preventDefault();

        // Obtenemos el ID del video del atributo "data-video-id" del enlace.
        var videoId = this.getAttribute('data-video-id');

        // Si el reproductor existe y tiene una función "loadVideoById", cargamos el nuevo video.
        if (player && player.loadVideoById) {
            player.loadVideoById(videoId);
        }
    });
});

// Esta función se llamará cuando el estado del reproductor cambie.
// Por ejemplo, cuando el video termine de reproducirse.
function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
        console.log('El video terminó de reproducirse');
    }
}