document.addEventListener('DOMContentLoaded', function() {
    // Registramos un mensaje para verificar que el script se está ejecutando
    console.log("Carrusel responsivo inicializado");
    
    // Función para manejar la lógica básica del carrusel tanto para escritorio como móvil
    function inicializarCarrusel(carruselSelector) {
        const carrusel = document.querySelector(carruselSelector);
        if (!carrusel) {
            console.warn("No se encontró el carrusel:", carruselSelector);
            return;
        }
        
        console.log("Inicializando carrusel:", carruselSelector);
        
        const imagenes = carrusel.querySelectorAll('.carrusel-imagen');
        const puntos = carrusel.querySelectorAll('.punto');
        const btnPrev = carrusel.querySelector('.carrusel-btn.prev');
        const btnNext = carrusel.querySelector('.carrusel-btn.next');
        
        let indiceActual = 0;
        let intervalo;
        
        // Función para mostrar una imagen específica
        function mostrarImagen(indice) {
            // Ocultar todas las imágenes
            imagenes.forEach(img => {
                img.classList.remove('activa');
                img.style.opacity = '0';
                img.style.position = 'absolute'; // Asegurar posicionamiento correcto
                img.style.width = '100%';
                img.style.height = '100%';
            });
            
            // Desactivar todos los puntos
            puntos.forEach(punto => {
                punto.classList.remove('activo');
            });
            
            // Mostrar la imagen seleccionada
            imagenes[indice].classList.add('activa');
            imagenes[indice].style.opacity = '1';
            
            // Activar el punto correspondiente
            puntos[indice].classList.add('activo');
            
            indiceActual = indice;
        }
        
        // Evento para botón "anterior"
        btnPrev.addEventListener('click', function() {
            const nuevoIndice = (indiceActual === 0) ? imagenes.length - 1 : indiceActual - 1;
            mostrarImagen(nuevoIndice);
            reiniciarAutomatico();
        });
        
        // Evento para botón "siguiente"
        btnNext.addEventListener('click', function() {
            const nuevoIndice = (indiceActual === imagenes.length - 1) ? 0 : indiceActual + 1;
            mostrarImagen(nuevoIndice);
            reiniciarAutomatico();
        });
        
        // Evento para los puntos
        puntos.forEach((punto, indice) => {
            punto.addEventListener('click', function() {
                mostrarImagen(indice);
                reiniciarAutomatico();
            });
        });
        
        // Configurar gestos táctiles
        let touchStartX = 0;
        let touchEndX = 0;
        
        carrusel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);
        
        carrusel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Deslizar a la izquierda, mostrar siguiente imagen
                const nuevoIndice = (indiceActual === imagenes.length - 1) ? 0 : indiceActual + 1;
                mostrarImagen(nuevoIndice);
                reiniciarAutomatico();
            }
            
            if (touchEndX > touchStartX + 50) {
                // Deslizar a la derecha, mostrar imagen anterior
                const nuevoIndice = (indiceActual === 0) ? imagenes.length - 1 : indiceActual - 1;
                mostrarImagen(nuevoIndice);
                reiniciarAutomatico();
            }
        }
        
        // Configuración del cambio automático
        function avanzarAutomatico() {
            const nuevoIndice = (indiceActual === imagenes.length - 1) ? 0 : indiceActual + 1;
            mostrarImagen(nuevoIndice);
        }
        
        function iniciarAutomatico() {
            intervalo = setInterval(avanzarAutomatico, 5000);
        }
        
        function reiniciarAutomatico() {
            clearInterval(intervalo);
            iniciarAutomatico();
        }
        
        // Pausar cambio automático al pasar el mouse sobre el carrusel
        carrusel.addEventListener('mouseenter', () => {
            clearInterval(intervalo);
        });
        
        carrusel.addEventListener('mouseleave', () => {
            iniciarAutomatico();
        });
        
        // Inicializar el carrusel mostrando la primera imagen
        mostrarImagen(0);
        
        // Iniciar cambio automático
        iniciarAutomatico();
        
        return {
            carrusel,
            imagenes,
            puntos,
            btnPrev,
            btnNext,
            mostrarImagen
        };
    }
    
    // Función para mejorar el carrusel en dispositivos móviles
    function mejorarCarruselMovil() {
        const carruselMovil = document.querySelector('.mobile-carousel');
        if (!carruselMovil) {
            console.warn("No se encontró el carrusel móvil");
            return;
        }
        
        console.log("Mejorando carrusel móvil");

        
        // Configurar ajustes visuales específicos para móvil
        const controles = carruselMovil.querySelector('.carrusel-controles');
        const btnPrev = carruselMovil.querySelector('.carrusel-btn.prev');
        const btnNext = carruselMovil.querySelector('.carrusel-btn.next');
        const puntos = carruselMovil.querySelectorAll('.punto');
        
        // Mostrar la imagen activa
        const imagenActiva = carruselMovil.querySelector('.carrusel-imagen.activa');
        if (imagenActiva) {
            imagenActiva.style.opacity = '1';
        }
    }
    
    // Función para mejorar el carrusel de escritorio
    function mejorarCarruselEscritorio() {
        const carruselDesktop = document.querySelector('.desktop-carousel');
        if (!carruselDesktop) {
            console.warn("No se encontró el carrusel de escritorio");
            return;
        }
        
        console.log("Mejorando carrusel de escritorio");
        
        // Asegurar que el carrusel de escritorio sea visible
        carruselDesktop.style.display = 'block';
        carruselDesktop.style.visibility = 'visible';
        carruselDesktop.style.opacity = '1';
        carruselDesktop.style.height = '500px'; // Altura para escritorio
        
        // Verificar que los controles sean visibles
        const controles = carruselDesktop.querySelector('.carrusel-controles');
        const btnPrev = carruselDesktop.querySelector('.carrusel-btn.prev');
        const btnNext = carruselDesktop.querySelector('.carrusel-btn.next');
        const puntos = carruselDesktop.querySelectorAll('.punto');
        
        if (btnPrev && btnNext) {
            [btnPrev, btnNext].forEach(btn => {
                btn.style.visibility = 'visible';
                btn.style.zIndex = '20';
                btn.style.display = 'flex';
            });
        }
        
        if (controles) {
            controles.style.visibility = 'visible';
            controles.style.zIndex = '15';
            controles.style.display = 'flex';
        }
        
        // Ajustar las imágenes del carrusel
        const imagenes = carruselDesktop.querySelectorAll('.carrusel-imagen');
        imagenes.forEach(img => {
            img.style.position = 'absolute';
            img.style.width = '100%';
            img.style.height = '100%';
        });
        
        // Mostrar la imagen activa
        const imagenActiva = carruselDesktop.querySelector('.carrusel-imagen.activa');
        if (imagenActiva) {
            imagenActiva.style.opacity = '1';
        }
    }
    
    // Función para cambiar entre carrusel de escritorio y móvil según el tamaño de pantalla
    function gestionarCarruselResponsivo() {
        const carruselDesktop = document.querySelector('.desktop-carousel');
        const contenedorMovil = document.querySelector('.mobile-carousel-container');
        const sectionImage = document.querySelector('.section-2 .section-image');
        
        console.log("Gestionando modo responsivo. Ancho de ventana:", window.innerWidth);
        
        if (window.innerWidth <= 768) {
            console.log("Activando modo móvil");
            
            // En móvil, ocultar carrusel de escritorio
            if (carruselDesktop) {
                carruselDesktop.style.display = 'none';
                carruselDesktop.style.visibility = 'hidden';
                carruselDesktop.style.opacity = '0';
                carruselDesktop.style.height = '0';
                carruselDesktop.style.overflow = 'hidden';
            }
            
            // Ajustar el contenedor de imagen para que no ocupe espacio
            if (sectionImage) {
                sectionImage.style.height = '0';
                sectionImage.style.width = '0';
                sectionImage.style.overflow = 'hidden';
                sectionImage.style.visibility = 'hidden';
                sectionImage.style.margin = '0';
                sectionImage.style.padding = '0';
            }
            
            // Asegurar que el contenedor móvil sea visible
            if (contenedorMovil) {
                console.log("Mostrando contenedor móvil");
                // Forzar visibilidad y mostrar fuera del section-image
                contenedorMovil.style.cssText = `
                    display: block !important;
                    visibility: visible !important;
                    opacity: 1 !important;
                    width: 90% !important;
                    height: auto !important;
                    margin: 20px auto !important;
                    position: relative !important;
                    z-index: 10 !important;
                    overflow: visible !important;
                `;
                
                // Mover el contenedor fuera del section-image si es necesario
                if (sectionImage && sectionImage.contains(contenedorMovil)) {
                    console.log("Reposicionando contenedor móvil");
                    const sectionContent = document.querySelector('.section-2 .section-content');
                    if (sectionContent) {
                        sectionContent.appendChild(contenedorMovil);
                    }
                }
                
                // Mejorar carrusel móvil
                mejorarCarruselMovil();
            }
            
        } else {
            console.log("Activando modo escritorio");
            // En escritorio, mostrar carrusel de escritorio y ocultar carrusel móvil
            if (carruselDesktop) {
                carruselDesktop.style.display = 'block';
                carruselDesktop.style.visibility = 'visible';
                carruselDesktop.style.opacity = '1';
                carruselDesktop.style.height = '500px';
                carruselDesktop.style.overflow = 'hidden';
            }
            
            if (contenedorMovil) {
                contenedorMovil.style.display = 'none';
                contenedorMovil.style.visibility = 'hidden';
                contenedorMovil.style.opacity = '0';
                contenedorMovil.style.height = '0';
                contenedorMovil.style.overflow = 'hidden';
            }
            
            if (sectionImage) {
                sectionImage.style.width = '75%'; // Restaurar el ancho original
                sectionImage.style.height = '500px'; // Restaurar la altura original
                sectionImage.style.visibility = 'visible';
                sectionImage.style.overflow = 'visible';
                sectionImage.style.margin = '';
                sectionImage.style.padding = '';
            }
            
            // Mejorar carrusel de escritorio
            mejorarCarruselEscritorio();
        }
    }
    
    // Inicializar ambos carruseles
    const carruselDesktop = inicializarCarrusel('.desktop-carousel');
    const carruselMovil = inicializarCarrusel('.mobile-carousel');
    
    // Configurar ajustes específicos iniciales
    mejorarCarruselEscritorio();
    mejorarCarruselMovil();
    
    // Gestionar modo responsivo inicial
    gestionarCarruselResponsivo();
    
    // Reinicializar cuando se cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        gestionarCarruselResponsivo();
    });
    
    // Ejecutar nuevamente después de pequeños retrasos para asegurar que los estilos se apliquen correctamente
    setTimeout(function() {
        gestionarCarruselResponsivo();
    }, 100);
    
    setTimeout(function() {
        gestionarCarruselResponsivo();
    }, 500);
    
    // Forzar la re-evaluación de la responsividad después de 1 segundo (para asegurar carga completa)
    setTimeout(function() {
        gestionarCarruselResponsivo();
    }, 1000);
}); 