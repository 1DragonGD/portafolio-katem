document.addEventListener('DOMContentLoaded', () => {
    // Forzar el scrollbar visible para evitar saltos en la interfaz
    if (!document.body.classList.contains('scrollbar-forzado')) {
        document.body.classList.add('scrollbar-forzado');
    }

    // Escuchar eventos que podrían requerir la clase no-scroll
    // Por ejemplo, cuando se abre un modal
    document.addEventListener('keydown', (e) => {
        // Si se presiona Escape, asegurarse de que se restaure el scroll
        if (e.key === 'Escape' && document.documentElement.classList.contains('no-scroll')) {
            document.documentElement.classList.remove('no-scroll');
        }
    });
}); 