// js/nav-loader.js - Versión simplificada
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cargando navegación...');
    
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            const header = document.querySelector('header');
            if (header) {
                header.innerHTML = data;
                console.log('✅ Navegación cargada');
            }
        })
        .catch(error => console.error('❌ Error:', error));
});