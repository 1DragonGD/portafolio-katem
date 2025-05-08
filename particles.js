document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.createElement('div');
    particlesContainer.className = 'particles';
    document.body.appendChild(particlesContainer);

    const numParticles = 50;
    const particles = [];

    // Crear partículas
    for (let i = 0; i < numParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Tamaño aleatorio entre 5 y 15px
        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición inicial aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Velocidad y dirección aleatorias
        const speedX = (Math.random() - 0.5) * 0.5;
        const speedY = (Math.random() - 0.5) * 0.5;
        
        particles.push({
            element: particle,
            x: parseFloat(particle.style.left),
            y: parseFloat(particle.style.top),
            speedX,
            speedY
        });
        
        particlesContainer.appendChild(particle);
    }

    // Función para animar las partículas
    function animateParticles() {
        particles.forEach(particle => {
            // Actualizar posición
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Rebotar en los bordes
            if (particle.x < 0 || particle.x > 100) particle.speedX *= -1;
            if (particle.y < 0 || particle.y > 100) particle.speedY *= -1;
            
            // Aplicar nueva posición
            particle.element.style.left = `${particle.x}%`;
            particle.element.style.top = `${particle.y}%`;
        });
        
        requestAnimationFrame(animateParticles);
    }

    // Iniciar animación
    animateParticles();
}); 