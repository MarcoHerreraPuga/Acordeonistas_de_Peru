// js/menu-mobile-simple.js - Script simplificado
console.log('📱 Menú móvil - Inicializando...');

// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco más para asegurar que el nav se cargó
    setTimeout(initMobileMenu, 500);
});

function initMobileMenu() {
    console.log('🔧 Configurando menú móvil...');
    
    const menuButton = document.getElementById('menu-movil');
    
    if (!menuButton) {
        console.error('❌ Botón del menú no encontrado');
        return;
    }
    
    console.log('✅ Botón encontrado, agregando evento...');
    
    // Agregar evento de forma directa
    menuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('🎯 Botón clickeado');
        toggleMobileMenu();
    });
    
    // Hacer el botón visible y clickeable
    menuButton.style.cssText = `
        cursor: pointer !important;
        z-index: 1000 !important;
        position: relative !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 44px !important;
        height: 44px !important;
        background: white !important;
        border-radius: 10px !important;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
        border: 1px solid #e5e7eb !important;
    `;
}

function toggleMobileMenu() {
    console.log('🔄 Alternando menú...');
    
    // Verificar si el menú ya existe
    const existingMenu = document.getElementById('mobile-simple-menu');
    if (existingMenu) {
        console.log('🗑️ Eliminando menú existente');
        existingMenu.remove();
        document.body.style.overflow = '';
        return;
    }
    
    // Crear el menú
    const menu = document.createElement('div');
    menu.id = 'mobile-simple-menu';
    menu.style.cssText = `
        position: fixed;
        top: 0;
        right: 0;
        width: 280px;
        height: 100%;
        background: white;
        z-index: 9999;
        box-shadow: -2px 0 10px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease;
        overflow-y: auto;
    `;
    
    // Contenido del menú
    menu.innerHTML = `
        <div style="padding: 20px; border-bottom: 1px solid #e5e7eb; background: #f8fafc;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="display: flex; align-items: center;">
                    <div style="width: 40px; height: 40px; border-radius: 50%; overflow: hidden; margin-right: 10px; background: white; padding: 3px;">
                        <img src="assets/logo_1.png" alt="Logo" style="width: 100%; height: 100%; object-fit: contain;"
                             onerror="this.src='https://via.placeholder.com/40x40?text=Logo'">
                    </div>
                    <div>
                        <div style="font-weight: bold; color: #374151; font-size: 14px;">Asociación de</div>
                        <div style="font-weight: bold; color: #374151; font-size: 14px;">Acordeonistas</div>
                    </div>
                </div>
                <button id="close-simple-menu" style="font-size: 24px; color: #6b7280; background: none; border: none; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
                    &times;
                </button>
            </div>
        </div>
        
        <div style="padding: 16px;">
            <a href="index.html" style="display: flex; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; color: #374151; text-decoration: none; background: #f3f4f6; transition: all 0.2s;">
                <i class="fas fa-home" style="margin-right: 12px; color: #3b82f6;"></i>
                <span style="font-weight: 500;">Inicio</span>
            </a>
            
            <a href="nuestro_equipo.html" style="display: flex; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; color: #374151; text-decoration: none; background: #f3f4f6; transition: all 0.2s;">
                <i class="fas fa-users" style="margin-right: 12px; color: #8b5cf6;"></i>
                <span style="font-weight: 500;">Nuestro Equipo</span>
            </a>
            
            <a href="sedes-programas.html" style="display: flex; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; color: #374151; text-decoration: none; background: #f3f4f6; transition: all 0.2s;">
                <i class="fas fa-map-marker-alt" style="margin-right: 12px; color: #10b981;"></i>
                <span style="font-weight: 500;">Sedes y Programas</span>
            </a>
            
            <a href="actividades.html" style="display: flex; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; color: #374151; text-decoration: none; background: #f3f4f6; transition: all 0.2s;">
                <i class="fas fa-newspaper" style="margin-right: 12px; color: #6366f1;"></i>
                <span style="font-weight: 500;">Novedades y Noticias</span>
            </a>
            
            <a href="avisos-legales.html" style="display: flex; align-items: center; padding: 12px 16px; margin-bottom: 8px; border-radius: 8px; color: #374151; text-decoration: none; background: #f3f4f6; transition: all 0.2s;">
                <i class="fas fa-file-contract" style="margin-right: 12px; color: #6b7280;"></i>
                <span style="font-weight: 500;">Avisos Legales</span>
            </a>
            
            <a href="donar.html" style="display: flex; align-items: center; justify-content: center; padding: 16px; margin-top: 24px; border-radius: 12px; color: white; text-decoration: none; background: linear-gradient(to right, #ec4899, #ef4444); font-weight: bold; transition: all 0.3s;">
                <i class="fas fa-heart" style="margin-right: 8px;"></i>
                DONAR AHORA
            </a>
        </div>
    `;
    
    // Agregar al documento
    document.body.appendChild(menu);
    
    // Bloquear scroll del body
    document.body.style.overflow = 'hidden';
    
    // Agregar overlay oscuro
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9998;
        animation: fadeIn 0.3s ease;
    `;
    document.body.appendChild(overlay);
    
    // Configurar eventos
    setTimeout(() => {
        // Botón cerrar
        const closeBtn = document.getElementById('close-simple-menu');
        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                removeMobileMenu();
            });
        }
        
        // Cerrar al hacer clic en overlay
        overlay.addEventListener('click', function() {
            removeMobileMenu();
        });
        
        // Enlaces del menú
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const href = this.getAttribute('href');
                removeMobileMenu();
                setTimeout(() => {
                    window.location.href = href;
                }, 300);
            });
        });
        
        // Cerrar con ESC
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                removeMobileMenu();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }, 10);
    
    console.log('✅ Menú móvil creado');
}

function removeMobileMenu() {
    const menu = document.getElementById('mobile-simple-menu');
    const overlay = document.querySelector('div[style*="background: rgba(0,0,0,0.5)"]');
    
    if (menu) {
        menu.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            menu.remove();
        }, 250);
    }
    
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            overlay.remove();
        }, 250);
    }
    
    document.body.style.overflow = '';
    console.log('✅ Menú móvil cerrado');
}

// Agregar estilos de animación
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); }
        to { transform: translateX(100%); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);