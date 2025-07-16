document.addEventListener("DOMContentLoaded", () => {
    //BOTONES CON EVENTOS
    const searchButton = document.querySelector("#search button");

    //IMPRIME EN CONSOLA EL FUNCIONAMINETO DE LOS BOTONES
    searchButton.addEventListener("click", () => {
        console.log("Botón de búsqueda presionado");
        enviar_api();
    });
});

//CONSUME API
async function enviar_api() {
    const key = 'Lx7IoG8ld0ORL8ML0BNgfJ4QvZ1jkBEp8b7Cf7dj';
    const date = document.getElementById('date').value; // Asegúrate de tener un elemento HTML con el id 'date'
    const ruta = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${key}&date=${date}`);
    
    try {
      let data = await ruta.json();
      console.log(data);
      mostrar(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
}
//MUESTRA DATOS DE LA API EN LA PAGINA
function mostrar(data) {
    const titulo = document.querySelector('#titulo');
  titulo.innerHTML = data.title; // Usa '=' en lugar de '+=' para evitar que los valores anteriores se acumulen
  
  const fecha = document.querySelector('#fecha');
  fecha.innerHTML = data.date;
  
  const descripcion = document.querySelector('#descripcion');
  descripcion.innerHTML = data.explanation;
  
  const media = document.querySelector('#media');
  if (data.media_type === 'video') {
    media.innerHTML = `<iframe class="embed-responsive-item" src="${data.url}"></iframe>`;
  } else {
    media.innerHTML = `<img src="${data.url}" class="img-fluid" alt="${data.url}">`;
  }
}

//GUARDA LOS DATOS QUE SE MUESTRAN DE LA API EN LA BASE DE DATOS

$(document).ready(function () {
    $("#Guardarbtn").click(function () {
        console.log("Botón de guardar presionado");
        guardar();
    });

    function guardar() {
        // Obtén los datos que deseas guardar (aquí es solo un ejemplo)
        const dataToSave = {
            title: document.getElementById('titulo').innerHTML,
            date: document.getElementById('fecha').innerHTML,
            explanation: document.getElementById('descripcion').innerHTML,
            url:document.getElementById('media').innerHTML
        };

        // Realiza una solicitud AJAX para enviar los datos al servidor
        $.ajax({
            type: "POST",
            url: "logica.php", // Nombre de tu script PHP para guardar datos
            data: dataToSave,
            success: function (response) {
                console.log("Datos guardados exitosamente:", response);
            },
            error: function (error) {
                console.error("Error al intentar guardar datos:", error);
            }
        });
    }
});