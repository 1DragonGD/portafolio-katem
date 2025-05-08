document.addEventListener('DOMContentLoaded', function() {
    const encapsulamiento = document.querySelector('.encapsular1');
    const nav = document.querySelector('nav');
    const body = document.body;
    const header = document.querySelector('header');
    const overlay = document.querySelector('.menu-overlay');
    const botonRetorno = document.getElementById('boton-retorno');

    // Comprobar si los elementos existen
    if (!encapsulamiento || !nav || !overlay) {
        console.error('Elementos necesarios para el menú no encontrados');
        return;
    }

    console.log('Menu inicializado');

    // Función para manejar la apertura/cierre del menú
    function toggleMenu() {
        encapsulamiento.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        // Manejar visibilidad del botón de retorno en galeria.html
        if (botonRetorno) {
            if (overlay.classList.contains('active')) {
                botonRetorno.style.opacity = '0';
                botonRetorno.style.visibility = 'hidden';
            } else {
                botonRetorno.style.opacity = '1';
                botonRetorno.style.visibility = 'visible';
            }
        }
        
        // Solo actualizamos la posición del menú al hacer scroll
        updateMenuPosition();
    }

    // Función para actualizar la posición del menú según el scroll
    function updateMenuPosition() {
        if (nav.classList.contains('active')) {
            // Mantener el menú fijo en su posición
        } else {
            // Si el menú está cerrado, resetear el estilo
            nav.style.top = '0';
        }
    }

    // Asegurarnos de que el evento click se asigna correctamente
    encapsulamiento.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Actualizar posición del menú al hacer scroll
    window.addEventListener('scroll', function() {
        if (nav.classList.contains('active')) {
            updateMenuPosition();
        }
    });

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            encapsulamiento.classList.remove('active');
            nav.classList.remove('active');
            overlay.classList.remove('active');
            nav.style.top = '0';
            
            // Restaurar visibilidad del botón de retorno
            if (botonRetorno) {
                botonRetorno.style.opacity = '1';
                botonRetorno.style.visibility = 'visible';
            }
        });
    });

    // Cerrar el menú al hacer clic en el overlay
    overlay.addEventListener('click', function() {
        encapsulamiento.classList.remove('active');
        nav.classList.remove('active');
        overlay.classList.remove('active');
        nav.style.top = '0';
        
        // Restaurar visibilidad del botón de retorno
        if (botonRetorno) {
            botonRetorno.style.opacity = '1';
            botonRetorno.style.visibility = 'visible';
        }
    });

    // Cerrar el menú al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (nav.classList.contains('active')) {
            const isClickInsideNav = nav.contains(event.target);
            const isClickOnHamburger = encapsulamiento.contains(event.target);
            const isClickOnOverlay = overlay.contains(event.target) && event.target !== overlay;

            if (!isClickInsideNav && !isClickOnHamburger && !isClickOnOverlay) {
                encapsulamiento.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
                nav.style.top = '0';
                
                // Restaurar visibilidad del botón de retorno
                if (botonRetorno) {
                    botonRetorno.style.opacity = '1';
                    botonRetorno.style.visibility = 'visible';
                }
            }
        }
    });
}); 