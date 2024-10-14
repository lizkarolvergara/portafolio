document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija() {
    const barra = document.querySelector('.navegation');
    const body = document.querySelector('body')

    window.addEventListener('scroll', function() {
        console.log(barra.getBoundingClientRect());

        if (barra.getBoundingClientRect().bottom) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegation__nav a');

    enlaces.forEach(enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();
            console.log("Clic en:", enlace.innerText); // Verifica el clic

            // Usar e.currentTarget en lugar de e.target para obtener el enlace correcto
            const seccionScroll = e.currentTarget.getAttribute('href');
            const seccion = document.querySelector(seccionScroll);

            if (seccion) {
                const offset = 90.4; // Altura a considerar
                const seccionTop = seccion.getBoundingClientRect().top + window.scrollY;

                window.scrollTo({
                    top: seccionTop - offset,
                    behavior: "smooth"
                });
            } else {
                console.error("Sección no encontrada:", seccionScroll);
            }
        });
    });
}


function crearGaleria() {
    const galeria = document.querySelector('.gallery__imgs');

    for (let i = 1; i <= 6; i++) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <img src="imgs/galeria/${i}.jpg" alt="Imagen galeria ${i}" loading="lazy">
        `;

        imagen.onclick = function() {
            mostrarImagen(i); 
        };

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
        <img src="imgs/galeria/${id}.jpg" alt="Imagen galeria ${id}" loading="lazy">
    `;

    // Crea el overlay con la imagen
    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    
    // Cierra el overlay al hacer clic en el overlay
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    // Botón para cerrar el modo
    const cerrarModal = document.createElement('p');
    cerrarModal.textContent = "X";
    cerrarModal.classList.add('btn-cerrar');
    
    cerrarModal.onclick = function(event) {
        event.stopPropagation(); // Previene el cierre al hacer clic en el botón
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    
    overlay.appendChild(cerrarModal);

    // Añadirlo al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}
