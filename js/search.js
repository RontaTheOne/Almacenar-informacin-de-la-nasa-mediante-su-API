let searchbutton = document.querySelector("#search");

searchbutton.addEventListener("click", () => {
  console.log("Busqueda realizada");
  enviar_api();
});

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
