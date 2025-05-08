document.addEventListener('DOMContentLoaded', () => {
    // Seleccionar todos los elementos que queremos animar
    const animatedElements = [
        ...document.querySelectorAll('.introduccion .texto, .introduccion .imagen'),
        ...document.querySelectorAll('main h1'),
        ...document.querySelectorAll('section'),
        ...document.querySelectorAll('div'),
        ...document.querySelectorAll('.contact-header')
    ];
    
    // Agregar clase inicial a todos los elementos animables
    animatedElements.forEach(element => {
        element.classList.add('animate-hidden');
    });
    
    // Función para verificar si un elemento está visible en el viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
            rect.bottom >= 0
        );
    }
    
    // Función para animar elementos visibles
    function animateVisibleElements() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element) && element.classList.contains('animate-hidden')) {
                element.classList.remove('animate-hidden');
                element.classList.add('animate-visible');
                
                // Si es la sección de contacto, animar sus elementos
                if (element.classList.contains('contact-header')) {
                    animateContactSection();
                }
            }
        });
    }
    
    // Función para animar la sección de contacto
    function animateContactSection() {
        const contactItems = document.querySelectorAll('.contact-item');
        const contactImage = document.querySelector('.contact-image');
        const socialLinks = document.querySelectorAll('.social-link');
        
        // Animar elementos de contacto de abajo hacia arriba
        contactItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animate-visible');
            }, index * 120); // Reducido de 200ms a 120ms
        });
        
        // Animar imagen después de los elementos de contacto
        setTimeout(() => {
            contactImage.classList.add('animate-visible');
        }, contactItems.length * 120); // Reducido de 200ms a 120ms
        
        // Animar enlaces sociales al final
        setTimeout(() => {
            socialLinks.forEach((link, index) => {
                setTimeout(() => {
                    link.classList.add('animate-visible');
                }, index * 100); // Reducido de 150ms a 100ms
            });
        }, (contactItems.length * 120) + 150); // Reducido de 300ms a 150ms
    }
    
    // Ejecutar animación inicial después de un pequeño retraso
    setTimeout(() => {
        animateVisibleElements();
    }, 50); // Reducido de 100ms a 50ms
    
    // Agregar listener para animar al hacer scroll
    window.addEventListener('scroll', animateVisibleElements);
}); 