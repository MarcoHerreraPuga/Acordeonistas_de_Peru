// js/nav-loader.js - Versión CORREGIDA
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Iniciando carga de navegación...');
    
    // Esperar un momento para asegurar que el DOM esté listo
    setTimeout(function() {
        const header = document.querySelector('header');
        
        if (!header) {
            console.error('❌ ERROR: No se encontró el elemento <header>');
            createHeaderManually();
            return;
        }
        
        console.log('✅ Header encontrado, cargando navegación...');
        
        // Cargar la navegación
        fetch('nav.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(data => {
                // Insertar la navegación DENTRO del header (no reemplazar todo)
                header.innerHTML = data;
                console.log('✅ Navegación cargada exitosamente');
                
                // Inicializar menú móvil después de cargar
                initMobileMenuAfterLoad();
            })
            .catch(error => {
                console.error('❌ Error cargando navegación:', error);
                createFallbackNav();
            });
    }, 100);
});

function createFallbackNav() {
    console.log('⚠️ Creando navegación de respaldo...');
    const header = document.querySelector('header');
    if (!header) return;
    
    header.innerHTML = `
        <nav class="container mx-auto px-4 py-3 flex justify-between items-center">
            <!-- Logo -->
            <a href="index.html" class="flex items-center space-x-3">
                <img src="assets/logo_1.png" alt="Logo" class="w-12 h-12">
                <div class="flex flex-col">
                    <span class="font-bold text-gray-800">Asociación de</span>
                    <span class="font-bold text-gray-800">Acordeonistas del Perú</span>
                </div>
            </a>
            
            <!-- Botón hamburguesa para móvil -->
            <button id="menu-movil" class="md:hidden text-2xl text-gray-800 hover:text-blue-700">
                <i class="fas fa-bars"></i>
            </button>
            
            <!-- Navegación desktop -->
            <div class="hidden md:flex space-x-6 items-center">
                <a href="index.html" class="font-semibold text-gray-800 hover:text-blue-600">Inicio</a>
                <a href="nuestro_equipo.html" class="font-semibold text-gray-800 hover:text-blue-600">Nuestro Equipo</a>
                <a href="sedes-programas.html" class="font-semibold text-gray-800 hover:text-blue-600">Sedes</a>
                <a href="actividades.html" class="font-semibold text-gray-800 hover:text-blue-600">Novedades</a>
                <a href="donar.html" class="bg-red-600 text-white px-6 py-2 rounded-full font-bold">DONAR</a>
            </div>
        </nav>
    `;
    
    initMobileMenuAfterLoad();
}

function initMobileMenuAfterLoad() {
    console.log('📱 Inicializando menú móvil después de carga...');
    
    // Esperar un momento para que el DOM se actualice
    setTimeout(function() {
        const menuButton = document.getElementById('menu-movil');
        
        if (menuButton) {
            console.log('✅ Botón del menú encontrado, configurando...');
            
            // Agregar evento de clic
            menuButton.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                console.log('🎯 Botón clickeado - ejecutando toggleMobileMenu');
                toggleMobileMenu();
            });
            
            // Asegurar que sea clickeable
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
            
            console.log('✅ Menú móvil configurado correctamente');
        } else {
            console.error('❌ ERROR: Botón del menú NO encontrado después de cargar nav.html');
            console.log('🔍 Buscando botón en el DOM completo...');
            console.log('Elementos con id:', document.querySelectorAll('[id]'));
            
            // Crear botón si no existe
            createMobileMenuButton();
        }
    }, 200);
}

function createMobileMenuButton() {
    console.log('🔨 Creando botón del menú manualmente...');
    
    const nav = document.querySelector('nav');
    if (!nav) return;
    
    const menuButton = document.createElement('button');
    menuButton.id = 'menu-movil';
    menuButton.className = 'md:hidden text-2xl text-gray-800 hover:text-blue-700';
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    nav.appendChild(menuButton);
    
    // Configurar el evento
    setTimeout(() => {
        menuButton.addEventListener('click', toggleMobileMenu);
    }, 100);
}

// Función para alternar el menú móvil
function toggleMobileMenu() {
    console.log('🔄 Ejecutando toggleMobileMenu...');
    
    // Verificar si ya existe un menú
    const existingMenu = document.getElementById('mobile-simple-menu');
    if (existingMenu) {
        console.log('🗑️ Menú existe, eliminando...');
        removeMobileMenu();
        return;
    }
    
    console.log('➕ Creando nuevo menú móvil...');
    
    // Crear overlay
    const overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
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
    
    // Crear menú
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
        box-shadow: -2px 0 20px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
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
                        <div style="font-weight: bold; color: #374151; font-size: 14px;">Acordeonistas del Perú</div>
                    </div>
                </div>
                <button id="close-mobile-menu" style="font-size: 24px; color: #6b7280; background: none; border: none; cursor: pointer; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center;">
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
    
    // Agregar al DOM
    document.body.appendChild(overlay);
    document.body.appendChild(menu);
    document.body.style.overflow = 'hidden';
    
    // Configurar eventos
    const closeBtn = document.getElementById('close-mobile-menu');
    if (closeBtn) {
        closeBtn.addEventListener('click', removeMobileMenu);
    }
    
    overlay.addEventListener('click', removeMobileMenu);
    
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
    
    console.log('✅ Menú móvil creado exitosamente');
}

function removeMobileMenu() {
    console.log('❌ Eliminando menú móvil...');
    
    const menu = document.getElementById('mobile-simple-menu');
    const overlay = document.querySelector('.menu-overlay');
    
    if (menu) {
        menu.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => menu.remove(), 250);
    }
    
    if (overlay) {
        overlay.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => overlay.remove(), 250);
    }
    
    document.body.style.overflow = '';
}

// Crear header manualmente si es necesario
function createHeaderManually() {
    console.log('🔨 Creando header manualmente...');
    const header = document.createElement('header');
    header.className = 'sticky top-0 z-50 bg-white shadow-md';
    document.body.insertBefore(header, document.body.firstChild);
}

// Agregar estilos de animación si no existen
if (!document.getElementById('mobile-menu-animations')) {
    const style = document.createElement('style');
    style.id = 'mobile-menu-animations';
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
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
}