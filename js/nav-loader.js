// acordeonistas/js/nav-loader.js
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Cargando navegación universal...');
    
    // Cargar la navegación
    fetch('nav.html')
        .then(response => response.text())
        .then(data => {
            console.log('✅ Navegación cargada correctamente');
            
            // Insertar navegación en el header
            const header = document.querySelector('header');
            if (header) {
                header.innerHTML = data;
                console.log('✅ Header actualizado con navegación');
            }
            
            // Configurar todo después de cargar el nav
            setupMobileMenu();
            setupNavigation();
            setupDonationButton();
            setupHeartbeatEffects();
            setupFloatingButtons();
        })
        .catch(error => console.error('❌ Error cargando navegación:', error));
});




// Configurar menú móvil (igual que antes)
function setupMobileMenu() {
    console.log('🔄 Configurando menú móvil...');
    
    const menuButton = document.getElementById('menu-movil');
    
    if (!menuButton) {
        console.error('❌ Botón del menú móvil no encontrado');
        return;
    }
    
    console.log('✅ Botón del menú encontrado');
    
    // Remover event listeners anteriores para evitar duplicados
    menuButton.replaceWith(menuButton.cloneNode(true));
    const newMenuButton = document.getElementById('menu-movil');
    
    // Agregar event listener DIRECTO y SIMPLE
    newMenuButton.addEventListener('click', function(e) {
        console.log('🎯 Botón del menú clickeado');
        e.preventDefault();
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Agregar estilos para hacerlo más visible
    newMenuButton.style.cursor = 'pointer';
    newMenuButton.style.zIndex = '1000';
    newMenuButton.style.position = 'relative';
}


function toggleMobileMenu() {
    console.log('🔄 Alternando menú móvil...');
    
    // Eliminar menú existente si hay
    const existingMenu = document.getElementById('mobile-menu-universal');
    if (existingMenu) {
        console.log('🗑️ Eliminando menú existente');
        existingMenu.remove();
        return;
    }
    
    console.log('➕ Creando nuevo menú móvil');
    
    // Crear el menú móvil
    const menu = document.createElement('div');
    menu.id = 'mobile-menu-universal';
    menu.className = 'fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm';
    menu.style.cssText = `
        display: flex;
        justify-content: flex-end;
    `;
    
    // Contenido del menú
    const menuContent = document.createElement('div');
    menuContent.className = 'w-3/4 max-w-sm h-full bg-white shadow-2xl overflow-y-auto';
    menuContent.style.cssText = `
        animation: slideIn 0.3s ease-out;
    `;
    
    // Encabezado del menú
    const menuHeader = document.createElement('div');
    menuHeader.className = 'flex justify-between items-center p-4 border-b border-gray-200';
    menuHeader.innerHTML = `
        <div class="flex items-center">
            <div class="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img src="assets/logo_1.png" alt="Logo" class="w-full h-full object-contain"
                     onerror="this.src='https://via.placeholder.com/40x40?text=Logo'">
            </div>
            <span class="font-bold text-gray-800">Menú</span>
        </div>
        <button id="close-mobile-menu" class="text-2xl text-gray-500 hover:text-red-500 w-10 h-10 flex items-center justify-center">
            &times;
        </button>
    `;
    
    // Lista del menú
    const menuList = document.createElement('div');
    menuList.className = 'p-2';
    
    // Elementos del menú - VERSIÓN MEJORADA
    const menuItems = [
        { 
            text: '🏠 Inicio', 
            href: 'index.html',
            color: 'text-blue-600'
        },
        { 
            text: '👥 Nuestro Equipo', 
            href: 'nuestro_equipo.html',
            color: 'text-purple-600'
        },
        { 
            text: '📍 Sedes y Programas', 
            href: 'sedes-programas.html',
            color: 'text-green-600'
        },
        { 
            text: '🎯 Actividades', 
            href: 'actividades.html',
            color: 'text-indigo-600'
        },
        { 
            text: '⚖️ Avisos Legales', 
            href: 'avisos-legales.html',
            color: 'text-gray-700'
        },
        { 
            text: '❤️ Donar', 
            href: 'donar.html',
            color: 'text-white bg-gradient-to-r from-pink-500 to-red-500 rounded-lg font-bold',
            special: true
        }
    ];
    
    // Crear elementos del menú
    menuItems.forEach(item => {
        const menuItem = document.createElement('a');
        menuItem.href = item.href;
        menuItem.className = `flex items-center p-4 my-1 rounded-lg transition duration-200 ${
            item.special ? 
            'bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold shadow-lg' : 
            'hover:bg-blue-50 text-gray-700'
        }`;
        
        if (!item.special) {
            menuItem.classList.add(item.color);
        }
        
        menuItem.innerHTML = `
            <span class="text-lg">${item.text}</span>
        `;
        
        // Evento para navegación
        menuItem.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Si es donar, agregar efectos
            if (item.href.includes('donar.html')) {
                createHeartsRain();
                showDonationModal();
                
                setTimeout(() => {
                    window.location.href = item.href;
                }, 1500);
            } else {
                window.location.href = item.href;
            }
            
            // Cerrar menú
            menu.remove();
        });
        
        menuList.appendChild(menuItem);
    });
    
    // Agregar secciones rápidas para la página actual
    const currentPage = window.location.pathname.split('/').pop();
    const quickLinks = getQuickLinksForPage(currentPage);
    
    if (quickLinks.length > 0) {
        const quickLinksHeader = document.createElement('div');
        quickLinksHeader.className = 'px-4 pt-6 pb-2 text-sm font-semibold text-gray-500 uppercase';
        quickLinksHeader.textContent = 'Ir rápidamente a:';
        menuList.appendChild(quickLinksHeader);
        
        quickLinks.forEach(link => {
            const quickLink = document.createElement('a');
            quickLink.href = `${currentPage}#${link.id}`;
            quickLink.className = 'flex items-center px-4 py-3 text-sm text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition duration-200 rounded-lg';
            quickLink.innerHTML = `
                <i class="${link.icon} mr-3 text-blue-500 w-5 text-center"></i>
                <span>${link.text}</span>
            `;
            
            quickLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.getElementById(link.id);
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                menu.remove();
            });
            
            menuList.appendChild(quickLink);
        });
    }
    
    // Pie del menú
    const menuFooter = document.createElement('div');
    menuFooter.className = 'p-4 border-t border-gray-200 text-center text-xs text-gray-500';
    menuFooter.innerHTML = `
        <p>Asociación de Acordeonistas del Perú</p>
        <p class="mt-1">© ${new Date().getFullYear()} - Todos los derechos reservados</p>
    `;
    
    // Ensamblar el menú
    menuContent.appendChild(menuHeader);
    menuContent.appendChild(menuList);
    menuContent.appendChild(menuFooter);
    menu.appendChild(menuContent);
    
    // Agregar al documento
    document.body.appendChild(menu);
    
    // Configurar botón de cerrar
    const closeButton = document.getElementById('close-mobile-menu');
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            menu.remove();
        });
    }
    
    // Cerrar al hacer clic fuera del contenido
    menu.addEventListener('click', function(e) {
        if (e.target === menu) {
            menu.remove();
        }
    });
    
    // Cerrar con tecla ESC
    const closeOnEsc = function(e) {
        if (e.key === 'Escape') {
            menu.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        #mobile-menu-universal {
            transition: opacity 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    console.log('✅ Menú móvil creado exitosamente');
}

// Obtener enlaces rápidos según la página actual
function getQuickLinksForPage(page) {
    const quickLinksMap = {
        'index.html': [
            { id: 'nosotros', text: '¿Quiénes Somos?', icon: 'fas fa-users' },
            { id: 'politicas', text: 'Políticas de Protección', icon: 'fas fa-shield-alt' },
            { id: 'actividades', text: 'Actividades', icon: 'fas fa-trophy' },
            { id: 'donaciones', text: 'Donaciones', icon: 'fas fa-heart' }
        ],
        'nuestro_equipo.html': [
            { id: 'equipo-directivo', text: 'Equipo Directivo', icon: 'fas fa-user-friends' },
            { id: 'socios-adherentes', text: 'Socios Adherentes', icon: 'fas fa-handshake' },
            { id: 'comentarios', text: 'Comentarios', icon: 'fas fa-comments' },
            { id: 'historia-acordeon', text: 'Historia del Acordeón', icon: 'fas fa-book' }
        ],
        'sedes-programas.html': [
            { id: 'nucleos-formacion', text: 'Núcleos de Formación', icon: 'fas fa-school' },
            { id: 'impacto-social', text: 'Impacto Social', icon: 'fas fa-heart' },
            { id: 'como-ayudar', text: '¿Cómo Ayudar?', icon: 'fas fa-hands-helping' },
            { id: 'sede-principal', text: 'Sede Principal', icon: 'fas fa-building' }
        ],
        'actividades.html': [
            { id: 'actividades', text: 'Actividades', icon: 'fas fa-trophy' },
            { id: 'galeria', text: 'Galería', icon: 'fas fa-images' },
            { id: 'catalogo', text: 'Catálogo', icon: 'fas fa-file-pdf' }
        ],
        'avisos-legales.html': [
            { id: 'privacidad', text: 'Política de Privacidad', icon: 'fas fa-lock' },
            { id: 'terminos-donaciones', text: 'Términos de Donaciones', icon: 'fas fa-file-contract' },
            { id: 'proteccion-menor', text: 'Protección al Menor', icon: 'fas fa-child' },
            { id: 'descargas', text: 'Documentos', icon: 'fas fa-download' }
        ]
    };
    
    return quickLinksMap[page] || [];
}



// Configurar navegación
function setupNavigation() {
    // Configurar navegación suave para enlaces internos
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href^="#"]');
        if (link && link.getAttribute('href') !== '#') {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }
    });
}

// Configurar botón de donación CON EFECTOS
function setupDonationButton() {
    const donationButton = document.querySelector('.heartbeat-btn');
    
    if (!donationButton) return;
    
    // Asegurar que tenga las clases correctas
    donationButton.classList.add('flex', 'flex-col', 'items-center', 'justify-center');
    
    // Crear contenedor interno si no existe
    let container = donationButton.querySelector('.donation-btn-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'donation-btn-container flex flex-col items-center justify-center w-full h-full p-2';
        
        // Reorganizar el contenido existente
        const icon = donationButton.querySelector('.heartbeat-icon');
        const text = donationButton.querySelector('span');
        
        if (icon) {
            container.appendChild(icon.cloneNode(true));
            icon.remove();
        } else {
            const newIcon = document.createElement('i');
            newIcon.className = 'fas fa-heart heartbeat-icon text-3xl mb-2';
            container.appendChild(newIcon);
        }
        
        if (text) {
            container.appendChild(text.cloneNode(true));
            text.remove();
        } else {
            const newText = document.createElement('span');
            newText.className = 'relative z-10 text-lg font-bold';
            newText.textContent = 'DONAR';
            container.appendChild(newText);
        }
        
        donationButton.innerHTML = '';
        donationButton.appendChild(container);
    }
    
    // Agregar efectos al botón donar
    donationButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Efecto visual inmediato
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Efectos especiales
        createHeartsRain();
        showDonationModal();
        
        // Navegar después del efecto
        setTimeout(() => {
            window.location.href = 'donar.html';
        }, 1500);
    });
    
    // Efectos hover
    donationButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) translateY(-5px)';
        this.style.boxShadow = '0 25px 50px rgba(239, 68, 68, 0.5)';
    });
    
    donationButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) translateY(0)';
        this.style.boxShadow = '';
    });
}

// Configurar efectos heartbeat
function setupHeartbeatEffects() {
    const heartbeatIcon = document.querySelector('.heartbeat-icon');
    if (heartbeatIcon) {
        heartbeatIcon.style.animation = 'heartbeat 1.5s infinite';
    }
}

// ============================================
// FUNCIONES DE EFECTOS ESPECIALES
// ============================================

// Lluvia de corazones
function createHeartsRain() {
    // Crear contenedor para corazones
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-rain';
    document.body.appendChild(heartsContainer);
    
    // Crear corazones
    const heartCount = 30;
    const colors = ['#ef4444', '#f87171', '#fca5a5', '#fecaca'];
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'heart-particle';
        heart.innerHTML = '❤️';
        heart.style.left = `${Math.random() * 100}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 2}s`;
        heart.style.animationDelay = `${Math.random() * 1}s`;
        heart.style.fontSize = `${Math.random() * 20 + 20}px`;
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];
        
        heartsContainer.appendChild(heart);
        
        // Remover corazón después de la animación
        setTimeout(() => {
            heart.remove();
        }, 5000);
    }
    
    // Remover contenedor después de 5 segundos
    setTimeout(() => {
        heartsContainer.remove();
    }, 5000);
}

// Modal de agradecimiento
function showDonationModal() {
    // Crear modal si no existe
    let modal = document.querySelector('.donation-modal');
    
    if (!modal) {
        modal = document.createElement('div');
        modal.className = 'donation-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-heart">❤️</div>
                <h3 class="text-2xl font-bold text-gray-800 mb-4">¡Gracias por tu Apoyo!</h3>
                <p class="text-gray-600 mb-6">
                    Tu contribución ayuda a preservar la cultura del acordeón en Perú.
                    Serás redirigido a las opciones de donación.
                </p>
                <button class="close-modal bg-gradient-to-r from-pink-500 to-red-500 text-white px-6 py-2 rounded-full font-semibold hover:from-pink-600 hover:to-red-600 transition duration-300">
                    Continuar
                </button>
            </div>
        `;
        document.body.appendChild(modal);
        
        // Botón para cerrar modal
        const closeButton = modal.querySelector('.close-modal');
        closeButton.addEventListener('click', () => {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        });
        
        // Cerrar al hacer click fuera
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                setTimeout(() => {
                    modal.remove();
                }, 300);
            }
        });
    }
    
    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Auto-cerrar después de 4 segundos
    setTimeout(() => {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            setTimeout(() => {
                modal.remove();
            }, 300);
        }
    }, 4000);
}

// Función de navegación universal
function navigateTo(url) {
    // Si es un enlace a otra página
    if (!url.includes('#')) {
        // Si es donar.html, aplicar efectos
        if (url.includes('donar.html')) {
            createHeartsRain();
            showDonationModal();
            
            setTimeout(() => {
                window.location.href = url;
            }, 1500);
            return;
        }
        window.location.href = url;
        return;
    }
    
    // Si es un enlace con ancla
    const [page, anchor] = url.split('#');
    const currentPage = window.location.pathname.split('/').pop();
    
    if (page === currentPage || page === '') {
        // Misma página, solo scroll
        const target = document.getElementById(anchor);
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    } else {
        // Otra página, navegar primero
        window.location.href = url;
    }
}

// Configurar botones flotantes (móviles)
function setupFloatingButtons() {
    // Botón flotante "Donar" para móvil
    const floatingDonationBtn = document.querySelector('.floating-heartbeat-btn');
    if (floatingDonationBtn) {
        floatingDonationBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Efectos
            createHeartsRain();
            showDonationModal();
            
            // Navegar después del efecto
            setTimeout(() => {
                window.location.href = 'donar.html';
            }, 1500);
        });
    }
    
    // Botón flotante "Volver al inicio" para móvil
    const floatingHomeBtn = document.querySelector('.floating-home-btn');
    if (floatingHomeBtn) {
        floatingHomeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'index.html';
        });
    }
}

// Llamar a setupFloatingButtons después de cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    setupFloatingButtons();
});