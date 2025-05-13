document.addEventListener('DOMContentLoaded', () => {
    // Datos de ejemplo para las imágenes
    const imagenesPorCategoria = {
        anime: [
            { src: 'Katemdibujos/Anime/imagen_anime1.png', alt: 'Dibujo Anime 1' },
            { src: 'Katemdibujos/Anime/imagen_anime2.png', alt: 'Dibujo Anime 2' },
            { src: 'Katemdibujos/Anime/imagen_anime3.png', alt: 'Dibujo Anime 3' },
            { src: 'Katemdibujos/Anime/imagen_anime4.png', alt: 'Dibujo Anime 4' },
            { src: 'Katemdibujos/Anime/imagen_anime5.png', alt: 'Dibujo Anime 5' },
            { src: 'Katemdibujos/Anime/imagen_anime6.png', alt: 'Dibujo Anime 6' },
            { src: 'Katemdibujos/Anime/imagen_anime7.png', alt: 'Dibujo Anime 7' }
        ],
        chibi: [
            { src: 'Katemdibujos/Chibi/imagen_chibi1.png', alt: 'Dibujo Chibi 1' },
            { src: 'Katemdibujos/Chibi/imagen_chibi2.png', alt: 'Dibujo Chibi 2' },
            { src: 'Katemdibujos/Chibi/imagen_chibi3.png', alt: 'Dibujo Chibi 3' },
            { src: 'Katemdibujos/Chibi/imagen_chibi4.jpg', alt: 'Dibujo Chibi 4' },
            { src: 'Katemdibujos/Chibi/imagen_chibi5.jpg', alt: 'Dibujo Chibi 5' }
        ],
        fondos: [
            { src: 'Katemdibujos/Fondos de Pantalla/imagen_fondo1.png', alt: 'Dibujo Fondo 1' },
            { src: 'Katemdibujos/Fondos de Pantalla/imagen_fondo2.png', alt: 'Dibujo Fondo 2' },
            { src: 'Katemdibujos/Fondos de Pantalla/imagen_fondo3.png', alt: 'Dibujo Fondo 3' },
            { src: 'Katemdibujos/Fondos de Pantalla/imagen_fondo4.png', alt: 'Dibujo Fondo 4' },
            { src: 'Katemdibujos/Fondos de Pantalla/imagen_fondo5.png', alt: 'Dibujo Fondo 5' }
        ],
        cubito: [
            { src: 'Katemdibujos/Cubito/imagen_cubito1.png', alt: 'Dibujo Cubito 1' },
            { src: 'Katemdibujos/Cubito/imagen_cubito2.png', alt: 'Dibujo Cubito 2' },
            { src: 'Katemdibujos/Cubito/imagen_cubito3.png', alt: 'Dibujo Cubito 3' },
            { src: 'Katemdibujos/Cubito/imagen_cubito4.png', alt: 'Dibujo Cubito 4' },
            { src: 'Katemdibujos/Cubito/imagen_cubito5.png', alt: 'Dibujo Cubito 5' },
            { src: 'Katemdibujos/Cubito/imagen_cubito6.png', alt: 'Dibujo Cubito 6' }
        ],
        personalizado: [
            { src: 'Katemdibujos/Personalizado/imagen_personalizado1.jpg', alt: 'Dibujo Personalizado 1' },
            { src: 'Katemdibujos/Personalizado/imagen_personalizado2.png', alt: 'Dibujo Personalizado 2' },
            { src: 'Katemdibujos/Personalizado/imagen_personalizado3.png', alt: 'Dibujo Personalizado 3' },
            { src: 'Katemdibujos/Personalizado/imagen_personalizado4.png', alt: 'Dibujo Personalizado 4' },
        ]
    };

    // Elementos del DOM
    const galeriaContainer = document.querySelector('.galeria-container');
    const botonRetorno = document.getElementById('boton-retorno');
    const header = document.querySelector('header');
    const tituloCategoria = document.getElementById('titulo-categoria');
    
    // Elementos del modal
    const modalImagen = document.getElementById('modal-imagen');
    const modalContenido = document.querySelector('.modal-contenido');
    const zoomContenedor = document.querySelector('.zoom-contenedor');
    const imagenAmpliada = document.getElementById('imagen-ampliada');
    const botonCerrarModal = document.getElementById('boton-cerrar-modal');
    const zoomIndicador = document.getElementById('zoom-indicador');
    
    // Variables para controlar el zoom y desplazamiento
    let escalaActual = 1;
    const escalaMinima = 0.5;  // 50% del tamaño original
    const escalaMaxima = 4;    // 400% del tamaño original (aumentado para más zoom)
    const factorZoomIn = 1.15;  // Incremento más pronunciado al acercar (15% en lugar de 10%)
    const factorZoomOut = 0.87; // Reducción más pronunciada al alejar (13% en lugar de 10%)
    let posicionX = 0;
    let posicionY = 0;
    let arrastrando = false;
    let ultimaPos = { x: 0, y: 0 };
    let limitesDeslizamiento = { minX: 0, maxX: 0, minY: 0, maxY: 0 };
    let dimensionesOriginales = { width: 0, height: 0 };
    
    // Función para abrir el modal con la imagen seleccionada
    function abrirModal(rutaImagen, altImagen, tipo) {
        // Resetear variables de zoom y desplazamiento
        escalaActual = 1;
        posicionX = 0;
        posicionY = 0;
        actualizarZoomIndicador();
        zoomContenedor.classList.remove('con-zoom');
        zoomContenedor.classList.remove('zoom-alto');
        
        // Cargar la imagen primero para asegurar que se muestre con el tamaño correcto
        const img = new Image();
        img.src = rutaImagen;
        
        img.onload = () => {
            // Guardar dimensiones originales para cálculos posteriores
            dimensionesOriginales = {
                width: img.naturalWidth,
                height: img.naturalHeight
            };
            
            // Asignar la imagen al elemento del DOM después de cargada
            imagenAmpliada.src = rutaImagen;
            imagenAmpliada.alt = altImagen;
            
            // Resetear clases y estilos
            imagenAmpliada.className = '';
            imagenAmpliada.removeAttribute('style');
            aplicarTransformacion();
            
            // Calcular relación de aspecto de la imagen
            const imgRatio = img.naturalWidth / img.naturalHeight;
            
            // Añadir clase específica según la relación de aspecto o usar el tipo proporcionado
            if (tipo) {
                imagenAmpliada.classList.add(tipo);
            } else if (imgRatio > 1.5) {
                imagenAmpliada.classList.add('horizontal');
            } else if (imgRatio < 0.8) {
                imagenAmpliada.classList.add('vertical');
            }
            
            // Mostrar el modal
            modalImagen.classList.add('activo');
            
            // Forzar el scrollbar visible antes de aplicar overflow:hidden
            if (!document.body.classList.contains('scrollbar-forzado')) {
                document.body.classList.add('scrollbar-forzado');
            }
            
            // Añadir clase no-scroll para prevenir desplazamiento
            document.documentElement.classList.add('no-scroll');
            
            // Calcular límites de desplazamiento iniciales
            setTimeout(calcularLimitesDeslizamiento, 100);
        };
        
        // Manejar errores de carga
        img.onerror = () => {
            console.error(`Error al cargar la imagen: ${rutaImagen}`);
            // Opcionalmente mostrar un mensaje de error en el modal
        };
    }
    
    // Función para cerrar el modal
    function cerrarModal() {
        modalImagen.classList.remove('activo');
        
        // Resetear zoom y posición
        escalaActual = 1;
        posicionX = 0;
        posicionY = 0;
        aplicarTransformacion();
        actualizarZoomIndicador();
        
        // Quitar todas las clases de zoom
        imagenAmpliada.classList.remove('con-zoom');
        zoomContenedor.classList.remove('con-zoom');
        zoomContenedor.classList.remove('zoom-alto');
        
        // Restaurar scroll con una transición suave
        setTimeout(() => {
            document.documentElement.classList.remove('no-scroll');
            
            // Limpiar la fuente de la imagen después de la transición de cierre
            setTimeout(() => {
                imagenAmpliada.src = '';
                imagenAmpliada.className = '';
                imagenAmpliada.removeAttribute('style');
                zoomIndicador.classList.remove('visible');
            }, 300);
        }, 50);
    }
    
    // Función para aplicar transformación (zoom y desplazamiento)
    function aplicarTransformacion() {
        imagenAmpliada.style.transform = `translate(${posicionX}px, ${posicionY}px) scale(${escalaActual})`;
    }
    
    // Función para actualizar el indicador de zoom
    function actualizarZoomIndicador() {
        const porcentaje = Math.round(escalaActual * 100);
        zoomIndicador.textContent = `Zoom: ${porcentaje}%`;
        
        // Mostrar indicador cuando el zoom no está en 100%
        if (escalaActual !== 1) {
            zoomIndicador.classList.add('visible');
        } else {
            zoomIndicador.classList.remove('visible');
        }
    }
    
    // Función para calcular los límites de desplazamiento
    function calcularLimitesDeslizamiento() {
        if (!imagenAmpliada.complete) return;
        
        // Obtener las dimensiones reales actuales de la imagen y el contenedor
        const imgRect = imagenAmpliada.getBoundingClientRect();
        const containerRect = zoomContenedor.getBoundingClientRect();
        
        // Obtener el estilo computado del contenedor para considerar el padding
        const estiloContenedor = window.getComputedStyle(zoomContenedor);
        const paddingLeft = parseFloat(estiloContenedor.paddingLeft);
        const paddingRight = parseFloat(estiloContenedor.paddingRight);
        const paddingTop = parseFloat(estiloContenedor.paddingTop);
        const paddingBottom = parseFloat(estiloContenedor.paddingBottom);
        
        // Calcular los bordes internos del contenedor (donde debe detenerse la imagen)
        const contenedorIzquierda = containerRect.left + paddingLeft;
        const contenedorDerecha = containerRect.right - paddingRight;
        const contenedorArriba = containerRect.top + paddingTop;
        const contenedorAbajo = containerRect.bottom - paddingBottom;
        
        // Ancho y alto visibles del contenedor (área disponible para mostrar la imagen)
        const anchoContenedorVisible = contenedorDerecha - contenedorIzquierda;
        const altoContenedorVisible = contenedorAbajo - contenedorArriba;
        
        // Dimensiones de la imagen con el zoom actual
        const anchoImagenActual = imgRect.width;
        const altoImagenActual = imgRect.height;
        const anchoImagenZoom = anchoImagenActual * escalaActual;
        const altoImagenZoom = altoImagenActual * escalaActual;
        
        // Calcular la posición actual del centro de la imagen
        const centroImgX = imgRect.left + (anchoImagenActual / 2);
        const centroImgY = imgRect.top + (altoImagenActual / 2);
        
        // Calcular la posición del centro del contenedor
        const centroContenedorX = (contenedorIzquierda + contenedorDerecha) / 2;
        const centroContenedorY = (contenedorArriba + contenedorAbajo) / 2;
        
        // Calcular los límites de desplazamiento (qué tanto puede moverse la imagen)
        // Si la imagen ampliada es más grande que el contenedor visible
        if (anchoImagenZoom > anchoContenedorVisible) {
            // La mitad de la diferencia entre el ancho de la imagen ampliada y el contenedor
            const excesoHorizontal = (anchoImagenZoom - anchoContenedorVisible) / 2;
            
            // Ajustar los límites basados en la posición actual de la imagen
            // Considerar la diferencia entre el centro de la imagen y el centro del contenedor
            const desplazamientoActualX = centroImgX - centroContenedorX;
            
            // Calcular límites para que la imagen no muestre espacios vacíos
            limitesDeslizamiento.minX = -excesoHorizontal - desplazamientoActualX;
            limitesDeslizamiento.maxX = excesoHorizontal - desplazamientoActualX;
        } else {
            // La imagen es más pequeña o igual al contenedor, centrar
            limitesDeslizamiento.minX = 0;
            limitesDeslizamiento.maxX = 0;
        }
        
        if (altoImagenZoom > altoContenedorVisible) {
            // La mitad de la diferencia entre el alto de la imagen ampliada y el contenedor
            const excesoVertical = (altoImagenZoom - altoContenedorVisible) / 2;
            
            // Ajustar los límites basados en la posición actual de la imagen
            // Considerar la diferencia entre el centro de la imagen y el centro del contenedor
            const desplazamientoActualY = centroImgY - centroContenedorY;
            
            // Calcular límites para que la imagen no muestre espacios vacíos
            limitesDeslizamiento.minY = -excesoVertical - desplazamientoActualY;
            limitesDeslizamiento.maxY = excesoVertical - desplazamientoActualY;
        } else {
            // La imagen es más pequeña o igual al contenedor, centrar
            limitesDeslizamiento.minY = 0;
            limitesDeslizamiento.maxY = 0;
        }
        
        // Pequeño margen de seguridad para prevenir problemas de redondeo
        const margenSeguridad = 0.5;
        if (limitesDeslizamiento.minX !== 0) limitesDeslizamiento.minX += margenSeguridad;
        if (limitesDeslizamiento.maxX !== 0) limitesDeslizamiento.maxX -= margenSeguridad;
        if (limitesDeslizamiento.minY !== 0) limitesDeslizamiento.minY += margenSeguridad;
        if (limitesDeslizamiento.maxY !== 0) limitesDeslizamiento.maxY -= margenSeguridad;
    }
    
    // Función para verificar y ajustar los límites de desplazamiento en tiempo real
    function verificarLimites() {
        // Obtener las dimensiones actuales después de aplicar zoom y desplazamiento
        const imgRect = imagenAmpliada.getBoundingClientRect();
        const containerRect = zoomContenedor.getBoundingClientRect();
        
        // Considerar el padding aplicado al contenedor
        const estiloContenedor = window.getComputedStyle(zoomContenedor);
        const paddingLeft = parseFloat(estiloContenedor.paddingLeft);
        const paddingRight = parseFloat(estiloContenedor.paddingRight);
        const paddingTop = parseFloat(estiloContenedor.paddingTop);
        const paddingBottom = parseFloat(estiloContenedor.paddingBottom);
        
        // Bordes internos del contenedor (donde debe detenerse la imagen)
        const contenedorIzquierda = containerRect.left + paddingLeft;
        const contenedorDerecha = containerRect.right - paddingRight;
        const contenedorArriba = containerRect.top + paddingTop;
        const contenedorAbajo = containerRect.bottom - paddingBottom;
        
        // Comprobar si alguna parte de la imagen sale del contenedor
        // y ajustar la posición si es necesario
        let ajusteX = 0;
        let ajusteY = 0;
        
        // Verificar borde izquierdo
        if (imgRect.left > contenedorIzquierda && escalaActual > 1) {
            ajusteX = contenedorIzquierda - imgRect.left;
        }
        
        // Verificar borde derecho
        if (imgRect.right < contenedorDerecha && escalaActual > 1) {
            ajusteX = contenedorDerecha - imgRect.right;
        }
        
        // Verificar borde superior
        if (imgRect.top > contenedorArriba && escalaActual > 1) {
            ajusteY = contenedorArriba - imgRect.top;
        }
        
        // Verificar borde inferior
        if (imgRect.bottom < contenedorAbajo && escalaActual > 1) {
            ajusteY = contenedorAbajo - imgRect.bottom;
        }
        
        // Si la imagen es más pequeña que el contenedor, centrarla
        if (imgRect.width * escalaActual <= (contenedorDerecha - contenedorIzquierda)) {
            // Centrar horizontalmente
            const centroContenedorX = (contenedorIzquierda + contenedorDerecha) / 2;
            const centroImagenX = (imgRect.left + imgRect.right) / 2;
            ajusteX = centroContenedorX - centroImagenX;
        }
        
        if (imgRect.height * escalaActual <= (contenedorAbajo - contenedorArriba)) {
            // Centrar verticalmente
            const centroContenedorY = (contenedorArriba + contenedorAbajo) / 2;
            const centroImagenY = (imgRect.top + imgRect.bottom) / 2;
            ajusteY = centroContenedorY - centroImagenY;
        }
        
        // Aplicar los ajustes si son necesarios
        if (ajusteX !== 0 || ajusteY !== 0) {
            posicionX += ajusteX;
            posicionY += ajusteY;
            aplicarTransformacion();
            return true; // Se realizaron ajustes
        }
        
        return false; // No se necesitaron ajustes
    }
    
    // Event listeners para zoom con rueda del mouse
    zoomContenedor.addEventListener('wheel', (e) => {
        if (!modalImagen.classList.contains('activo')) return;
        
        e.preventDefault();
        
        // Calcular el factor de zoom basado en la dirección de la rueda - más pronunciado
        const factor = e.deltaY < 0 ? factorZoomIn : factorZoomOut;
        
        // Guardar posición anterior
        const oldScale = escalaActual;
        
        // Calcular nueva escala dentro de límites
        escalaActual = Math.max(escalaMinima, Math.min(escalaMaxima, escalaActual * factor));
        
        // Si la escala no cambió (llegó a límites), no hacer nada más
        if (oldScale === escalaActual) return;
        
        // Obtener posición del cursor relativa a la imagen
        const rect = imagenAmpliada.getBoundingClientRect();
        const cursorX = e.clientX - rect.left;
        const cursorY = e.clientY - rect.top;
        
        // Calcular desplazamiento para que el zoom se centre en la posición del cursor
        const factorRealZoom = escalaActual / oldScale;
        posicionX = posicionX + (cursorX - rect.width / 2) * (1 - factorRealZoom);
        posicionY = posicionY + (cursorY - rect.height / 2) * (1 - factorRealZoom);
        
        // Aplicar la transformación primero
        aplicarTransformacion();
        
        // Verificar y ajustar límites inmediatamente después del zoom
        verificarLimites();
        
        // Añadir o quitar clase al contenedor según el zoom
        if (escalaActual > 1) {
            zoomContenedor.classList.add('con-zoom');
            
            // Añadir clase específica para zoom alto (>200%)
            if (escalaActual > 2) {
                zoomContenedor.classList.add('zoom-alto');
            } else {
                zoomContenedor.classList.remove('zoom-alto');
            }
        } else {
            zoomContenedor.classList.remove('con-zoom');
            zoomContenedor.classList.remove('zoom-alto');
            
            // Si volvemos a escala 1, centrar la imagen
            posicionX = 0;
            posicionY = 0;
            aplicarTransformacion();
        }
        
        actualizarZoomIndicador();
        
        // Añadir clase si hay zoom
        if (escalaActual !== 1) {
            imagenAmpliada.classList.add('con-zoom');
        } else {
            imagenAmpliada.classList.remove('con-zoom');
        }
    }, { passive: false });
    
    // Event listeners para desplazamiento con clic derecho
    imagenAmpliada.addEventListener('mousedown', (e) => {
        if (e.button === 2 && escalaActual > 1) { // Solo capturar clic derecho y cuando hay zoom
            e.preventDefault();
            arrastrando = true;
            imagenAmpliada.classList.add('arrastrando');
            ultimaPos = { x: e.clientX, y: e.clientY };
            calcularLimitesDeslizamiento();
        }
    });
    
    document.addEventListener('mousemove', (e) => {
        if (arrastrando) {
            // Calcular el desplazamiento desde la última posición
            const deltaX = e.clientX - ultimaPos.x;
            const deltaY = e.clientY - ultimaPos.y;
            
            // Aplicar el desplazamiento
            posicionX += deltaX;
            posicionY += deltaY;
            
            // Aplicar la transformación
            aplicarTransformacion();
            
            // Verificar y ajustar límites después de aplicar el desplazamiento
            const seAjustaron = verificarLimites();
            
            // Solo actualizar la posición del cursor si no estamos en el límite
            if (!seAjustaron) {
                ultimaPos = { x: e.clientX, y: e.clientY };
            } else {
                // Si se ajustaron los límites, recalcular la posición del cursor
                // para evitar "saltos" al llegar a los bordes
                const imgRect = imagenAmpliada.getBoundingClientRect();
                const centroX = imgRect.left + imgRect.width / 2;
                const centroY = imgRect.top + imgRect.height / 2;
                
                // Ajustar la posición del cursor según la dirección del movimiento
                if (deltaX !== 0) {
                    ultimaPos.x = e.clientX - (deltaX > 0 ? 1 : -1);
                }
                
                if (deltaY !== 0) {
                    ultimaPos.y = e.clientY - (deltaY > 0 ? 1 : -1);
                }
            }
        }
    });
    
    document.addEventListener('mouseup', () => {
        if (arrastrando) {
            arrastrando = false;
            imagenAmpliada.classList.remove('arrastrando');
        }
    });
    
    // Desactivar menú contextual en la imagen para permitir el clic derecho para arrastrar
    imagenAmpliada.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        return false;
    });
    
    // Doble clic para resetear zoom
    imagenAmpliada.addEventListener('dblclick', () => {
        escalaActual = 1;
        posicionX = 0;
        posicionY = 0;
        aplicarTransformacion();
        actualizarZoomIndicador();
        imagenAmpliada.classList.remove('con-zoom');
        zoomContenedor.classList.remove('con-zoom');
        zoomContenedor.classList.remove('zoom-alto');
    });
    
    // Event listener para el botón de retorno
    botonRetorno.addEventListener('click', () => {
        window.location.href = 'proyectos.html';
    });
    
    // Event listener para cerrar el modal
    botonCerrarModal.addEventListener('click', (e) => {
        e.stopPropagation(); // Evitar propagación del clic
        cerrarModal();
    });
    
    // Cerrar el modal al hacer clic fuera de la imagen (en el fondo oscuro)
    modalImagen.addEventListener('click', (e) => {
        // Solo cerrar si el clic fue directamente en el modal (no en sus hijos)
        if (e.target === modalImagen) {
            cerrarModal();
        }
    });
    
    // Prevenir que los clics en modalContenido cierren el modal
    modalContenido.addEventListener('click', (e) => {
        e.stopPropagation();
    });
    
    // Cerrar el modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalImagen.classList.contains('activo')) {
            cerrarModal();
        }
    });
    
    // Redistribuir imágenes cuando se redimensiona la ventana
    window.addEventListener('resize', () => {
        // Recalcular límites si hay una imagen ampliada
        if (modalImagen.classList.contains('activo')) {
            // Verificar y ajustar límites para mantener la imagen dentro del contenedor
            setTimeout(() => {
                verificarLimites();
            }, 100);
        }
        
        const urlParams = new URLSearchParams(window.location.search);
        const categoria = urlParams.get('categoria');
        if (categoria) {
            cargarImagenes(categoria);
        }
    });

    // Función para cargar las imágenes
    function cargarImagenes(categoria) {
        galeriaContainer.innerHTML = '';
        const imagenes = imagenesPorCategoria[categoria];
        
        if (!imagenes) return;
        
        // Actualizar el título de la categoría
        tituloCategoria.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);

        // Primero, obtener las dimensiones de todas las imágenes
        const imagePromises = imagenes.map((imagen, index) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.src = imagen.src;
                img.onload = () => {
                    const ratio = img.naturalWidth / img.naturalHeight;
                    resolve({
                        src: imagen.src,
                        alt: imagen.alt,
                        ratio,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        index,
                        tipo: ratio > 1.5 ? 'horizontal' : 
                              ratio > 1.05 && ratio <= 1.5 ? 'minihorizontal' : 
                              ratio < 0.8 ? 'vertical' : 'normal'
                    });
                };
                
                // Manejar errores de carga
                img.onerror = () => {
                    console.error(`Error al cargar la imagen: ${imagen.src}`);
                    resolve({
                        src: imagen.src,
                        alt: imagen.alt,
                        ratio: 1,
                        width: 300,
                        height: 300,
                        index,
                        tipo: 'normal',
                        error: true
                    });
                };
            });
        });

        // Después de obtener todas las dimensiones, ordenar y crear los elementos
        Promise.all(imagePromises).then(imagenesConDatos => {
            // Ordenar las imágenes: primero minihorizontales, luego verticales, normales y por último horizontales
            imagenesConDatos.sort((a, b) => {
                const orden = { 'horizontal': 1, 'vertical': 2, 'minihorizontal': 0, 'normal': 3 };
                return orden[a.tipo] - orden[b.tipo] || a.index - b.index;
            });
            
            // Crear y añadir elementos al DOM
            imagenesConDatos.forEach(imagenData => {
                const divImagen = document.createElement('div');
                divImagen.className = `galeria-imagen ${imagenData.tipo}`;
                
                const img = document.createElement('img');
                img.src = imagenData.src;
                img.alt = imagenData.alt;
                img.dataset.originalWidth = imagenData.width;
                img.dataset.originalHeight = imagenData.height;
                
                // Si es vertical, ajustar solo el contenedor, no la imagen
                if (imagenData.tipo === 'vertical') {
                    img.onload = () => {
                        const containerWidth = divImagen.offsetWidth;
                        const alturaCalculada = containerWidth / imagenData.ratio;
                        divImagen.style.height = `${alturaCalculada}px`;
                    };
                }
                
                // Añadir evento click para abrir el modal
                divImagen.addEventListener('click', () => {
                    abrirModal(imagenData.src, imagenData.alt, imagenData.tipo);
                });
                
                divImagen.appendChild(img);
                galeriaContainer.appendChild(divImagen);
            });
        });
    }

    // Obtener la categoría de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const categoria = urlParams.get('categoria');
    
    if (categoria && imagenesPorCategoria[categoria]) {
        cargarImagenes(categoria);
    } else {
        // Redirigir a proyectos.html si no hay categoría válida
        window.location.href = 'proyectos.html';
    }
});