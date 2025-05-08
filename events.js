const botonDesplazar = document.getElementById('boton-desplazar');
const main = document.querySelector('main');
const verProyectosBtn = document.querySelector('.ver-proyectos-btn');

botonDesplazar.addEventListener('click', () => {
    main.scrollIntoView({ behavior: 'smooth' });
});

verProyectosBtn.addEventListener('click', () => {
    window.location.href = 'proyectos.html';
});