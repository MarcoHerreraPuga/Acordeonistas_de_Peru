document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM completamente cargado');

    // 1. NAVEGACIÓN SUAVE
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. BOTÓN DE DONACIÓN
    document.getElementById('btn-donacion')?.addEventListener('click', function() {
        alert('¡Gracias por tu interés en apoyarnos! Serás redirigido al formulario de donación.');
    });

    // 3. EFECTO DE SCROLL PARA HEADER
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.classList.add('shadow-lg');
                header.style.backdropFilter = 'blur(10px)';
                header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            } else {
                header.classList.remove('shadow-lg');
                header.style.backdropFilter = 'none';
                header.style.backgroundColor = 'white';
            }
        }
    });

    // 4. MENÚ MÓVIL SIMPLE
    document.getElementById('menu-movil')?.addEventListener('click', function() {
        crearMenuMovilSimple();
    });
    
    // 5. EFECTO DE CARGA PARA IMÁGENES
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // 6. EFECTO HOVER EN TARJETAS DE ACTIVIDADES
    const activityCards = document.querySelectorAll('#actividades .bg-white');
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // 7. INICIALIZAR TODAS LAS FUNCIONALIDADES
    setupFloatingDonationButton();
    setupEnhancedDonationButton();
    setupHeroTitleEffect();
    setupSociosGallery();
    setupGallery();
    setupCatalogoButton();
    checkPdfAvailability();
    setupQuienesSomos();
    
    // 8. CORREGIR BOTÓN DONAR - Centrar contenido
    setupDonationButton();
    
    // Consola de bienvenida
    console.log('%c🎵 Asociación de Acordeonistas del Perú 🎵', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    console.log('%c¡Bienvenido al sitio oficial de la Asociación de Acordeonistas!', 'color: #666;');
});

// ============================================
// FUNCIONES INDEPENDIENTES
// ============================================

// FUNCIÓN ESPECÍFICA PARA CORREGIR BOTÓN DONAR
function setupDonationButton() {
    const donationButton = document.querySelector('.heartbeat-btn');
    
    if (!donationButton) return;
    
    // Asegurar que el botón tenga las clases correctas
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
    
    // Agregar efecto de click
    donationButton.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Efecto visual
        this.style.transform = 'scale(1.1)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 200);
        
        // Navegar a la sección de donaciones
        const targetElement = document.querySelector('#donaciones');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
}

// MENÚ MÓVIL

function crearMenuMovilSimple() {
    const existingMenu = document.getElementById('mobile-simple-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.id = 'mobile-simple-menu';
    menu.className = 'fixed top-20 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 min-w-56';
    
    const menuItems = [
        { 
            text: 'Inicio', 
            href: '#inicio', 
            icon: 'fas fa-home',
            submenu: [
                { text: '¿Quiénes Somos?', href: '#nosotros', icon: 'fas fa-users' },
                { text: 'Políticas de Protección', href: '#politicas', icon: 'fas fa-shield-alt' },
                { text: 'Transparencia y Acreditaciones', href: '#transparencia', icon: 'fas fa-file-contract' },
                { text: 'Registros Institucionales', href: '#registros', icon: 'fas fa-archive' },
                { text: 'Ética y Cumplimiento', href: '#etica', icon: 'fas fa-handshake' }
            ]
        },
        { 
            text: 'Nuestro Equipo', 
            href: '#equipo', 
            icon: 'fas fa-user-friends',
            submenu: [
                { text: 'Nuestro Equipo', href: '#equipo', icon: 'fas fa-user-friends' },
                { text: 'Socios Adherentes', href: '#socios', icon: 'fas fa-handshake' },
                { text: 'Comentarios', href: '#comentarios', icon: 'fas fa-comments' },
                { text: 'Historia del Acordeón', href: '#historia-acordeon', icon: 'fas fa-book' }
            ]
        },
        { 
            text: 'Sedes y Programas', 
            href: '#sedes-programas', 
            icon: 'fas fa-map-marked-alt',
            submenu: [
                { text: 'Núcleos de Formación', href: '#sedes-programas', icon: 'fas fa-map-marker-alt' },
                { text: 'Impacto Social', href: '#impacto', icon: 'fas fa-heart' },
                { text: '¿Cómo Ayudar?', href: '#como-ayudar', icon: 'fas fa-hands-helping' },
                { text: 'Nuestra Sede Principal', href: '#sedes-locales', icon: 'fas fa-building' }
            ]
        },
        { 
            text: 'Actividades', 
            href: '#actividades', 
            icon: 'fas fa-calendar-alt',
            submenu: [
                { text: 'Actividades y Logros', href: '#actividades', icon: 'fas fa-trophy' },
                { text: 'Galería de Momentos', href: '#galeria', icon: 'fas fa-images' }
            ]
        },
        { 
            text: 'Avisos Legales', 
            href: '#avisos-legales', 
            icon: 'fas fa-gavel',
            submenu: [
                { text: 'Política de Privacidad', href: '#privacidad', icon: 'fas fa-lock' },
                { text: 'Términos de Donaciones', href: '#terminos-donaciones', icon: 'fas fa-file-contract' },
                { text: 'Protección al Menor', href: '#proteccion-menor', icon: 'fas fa-child' }
            ]
        },
        { text: 'Dona ❤️', href: '#donaciones', icon: 'fas fa-heart heartbeat-icon' }
    ];
    
    // Función para crear elementos del menú
    function createMenuItem(item) {
        if (item.submenu) {
            // Crear contenedor para menú desplegable
            const container = document.createElement('div');
            container.className = 'border-b border-gray-100';
            
            // Botón principal
            const mainButton = document.createElement('div');
            mainButton.className = 'flex items-center justify-between py-3 px-4 text-gray-700 hover:bg-blue-50 transition duration-200 cursor-pointer';
            mainButton.innerHTML = `
                <div class="flex items-center">
                    <i class="${item.icon} mr-3 text-gray-400 w-5 text-center"></i>
                    <span class="font-medium">${item.text}</span>
                </div>
                <i class="fas fa-chevron-down text-xs text-gray-400"></i>
            `;
            
            // Submenú (inicialmente oculto)
            const submenuContainer = document.createElement('div');
            submenuContainer.className = 'bg-gray-50 pl-8 hidden';
            submenuContainer.id = `submenu-${item.text.toLowerCase().replace(/\s+/g, '-')}`;
            
            item.submenu.forEach(subItem => {
                const subLink = document.createElement('a');
                subLink.href = subItem.href;
                subLink.className = 'flex items-center py-2 px-4 text-gray-600 hover:text-blue-600 hover:bg-blue-100 transition duration-200';
                subLink.innerHTML = `
                    <i class="${subItem.icon} mr-3 text-gray-400 w-5 text-center"></i>
                    <span class="text-sm">${subItem.text}</span>
                `;
                
                subLink.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetElement = document.querySelector(subItem.href);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                    menu.remove();
                });
                
                submenuContainer.appendChild(subLink);
            });
            
            // Toggle para mostrar/ocultar submenú
            mainButton.addEventListener('click', function() {
                const submenu = document.getElementById(`submenu-${item.text.toLowerCase().replace(/\s+/g, '-')}`);
                const icon = this.querySelector('.fa-chevron-down');
                
                if (submenu.classList.contains('hidden')) {
                    submenu.classList.remove('hidden');
                    icon.classList.remove('fa-chevron-down');
                    icon.classList.add('fa-chevron-up');
                } else {
                    submenu.classList.add('hidden');
                    icon.classList.remove('fa-chevron-up');
                    icon.classList.add('fa-chevron-down');
                }
            });
            
            container.appendChild(mainButton);
            container.appendChild(submenuContainer);
            menu.appendChild(container);
        } else {
            // Enlace normal
            const a = document.createElement('a');
            a.href = item.href;
            a.className = 'flex items-center py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 border-b border-gray-100 last:border-b-0';
            a.innerHTML = `
                <i class="${item.icon} mr-3 text-gray-400 w-5 text-center"></i>
                <span class="font-medium">${item.text}</span>
            `;
            
            a.addEventListener('click', function(e) {
                e.preventDefault();
                const targetElement = document.querySelector(item.href);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                menu.remove();
            });
            
            menu.appendChild(a);
        }
    }
    
    // Crear todos los elementos del menú
    menuItems.forEach(createMenuItem);
    
    document.body.appendChild(menu);
    
    // Cerrar al hacer click fuera
    setTimeout(() => {
        const closeMenu = function(e) {
            if (!menu.contains(e.target) && e.target.id !== 'menu-movil') {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        document.addEventListener('click', closeMenu);
    }, 10);
    
    // Cerrar con ESC
    const closeOnEsc = function(e) {
        if (e.key === 'Escape') {
            menu.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);
}

// BOTÓN FLOTANTE
function setupFloatingDonationButton() {
    const floatingBtn = document.getElementById('floating-donation-btn');
    const floatingHeartBtn = floatingBtn?.querySelector('.floating-heartbeat-btn');
    const floatingHeartIcon = floatingBtn?.querySelector('.floating-heart-icon');
    
    if (!floatingBtn || !floatingHeartBtn || !floatingHeartIcon) return;
    
    // Efectos hover
    floatingHeartBtn.addEventListener('mouseenter', function() {
        floatingHeartIcon.style.animation = 'floating-heartbeat 0.8s infinite';
    });
    
    floatingHeartBtn.addEventListener('mouseleave', function() {
        floatingHeartIcon.style.animation = 'floating-heartbeat 1.5s infinite';
    });
    
    // Click
    floatingHeartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Navegar a donaciones
        const targetElement = document.querySelector('#donaciones');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Ocultar en desktop
    if (window.innerWidth >= 769) {
        floatingBtn.style.display = 'none';
    }
    
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 769) {
            floatingBtn.style.display = 'none';
        } else {
            floatingBtn.style.display = 'block';
        }
    });
}

// BOTÓN APOYAR CON CORAZÓN
function setupHeartbeatButton() {
    const heartbeatBtn = document.querySelector('.heartbeat-btn');
    const heartbeatIcon = document.querySelector('.heartbeat-icon');
    
    if (!heartbeatBtn || !heartbeatIcon) return;
    
    heartbeatBtn.addEventListener('mouseenter', function() {
        heartbeatIcon.style.animation = 'heartbeat 0.8s infinite';
    });
    
    heartbeatBtn.addEventListener('mouseleave', function() {
        heartbeatIcon.style.animation = 'heartbeat 1.5s infinite';
    });
    
    heartbeatBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetElement = document.querySelector('#donaciones');
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
    
    // Ocultar en móvil
    if (window.innerWidth < 768) {
        heartbeatBtn.style.display = 'none';
    }
}

// EFECTO HERO TITLE Y SUBTITLE
function setupHeroTitleEffect() {
    // Efecto para el título principal
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle) {
        // Restaurar el texto original (por si se había modificado)
        heroTitle.innerHTML = '"El Sonido que Une al Perú"';
        
        // Agregar efecto hover al título
        heroTitle.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        heroTitle.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
    
    if (heroSubtitle) {
        // Restaurar el texto original del subtítulo
        heroSubtitle.innerHTML = 'No Solo enseñamos a tocar el acordeón, construimos proyecto de vida. A través de la vibración del fuelle, brindamos a miles de niños y jóvenes la oportunidad de soñar con un futuro distinto.';
        
        // Efecto hover para el subtítulo - letras individuales
        const originalText = heroSubtitle.textContent;
        const words = originalText.split(' ');
        
        // Envolver cada palabra en un span
        heroSubtitle.innerHTML = '';
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'hero-word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.transition = 'all 0.3s ease';
            wordSpan.style.marginRight = '5px';
            
            // Opcional: envolver cada letra en un span para efecto más detallado
            const letters = word.split('');
            letters.forEach((letter, letterIndex) => {
                const letterSpan = document.createElement('span');
                letterSpan.className = 'hero-letter';
                letterSpan.textContent = letter;
                letterSpan.style.display = 'inline-block';
                letterSpan.style.transition = 'all 0.2s ease';
                wordSpan.appendChild(letterSpan);
            });
            
            // Agregar un espacio después de cada palabra (excepto la última)
            if (wordIndex < words.length - 1) {
                const space = document.createElement('span');
                space.textContent = ' ';
                space.style.marginRight = '0';
                wordSpan.appendChild(space);
            }
            
            heroSubtitle.appendChild(wordSpan);
        });
        
        // Efecto hover en el subtítulo completo
        heroSubtitle.addEventListener('mouseenter', function() {
            const letters = this.querySelectorAll('.hero-letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(-3px)';
                    letter.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
                }, index * 10);
            });
        });
        
        heroSubtitle.addEventListener('mouseleave', function() {
            const letters = this.querySelectorAll('.hero-letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.style.transform = 'translateY(0)';
                    letter.style.textShadow = '';
                }, index * 10);
            });
        });
        
        // Efecto aleatorio en letras (opcional)
        setInterval(() => {
            if (heroSubtitle.matches(':hover')) {
                const letters = heroSubtitle.querySelectorAll('.hero-letter');
                if (letters.length > 0) {
                    const randomLetter = letters[Math.floor(Math.random() * letters.length)];
                    if (randomLetter.textContent.trim() !== '') {
                        randomLetter.style.transform = 'translateY(-4px) scale(1.1)';
                        randomLetter.style.textShadow = '0 0 12px rgba(255, 255, 255, 0.7)';
                        
                        setTimeout(() => {
                            if (heroSubtitle.matches(':hover')) {
                                randomLetter.style.transform = 'translateY(-3px)';
                                randomLetter.style.textShadow = '0 0 8px rgba(255, 255, 255, 0.5)';
                            }
                        }, 300);
                    }
                }
            }
        }, 800);
    }
}

// ============================================
// BOTÓN PARA ABRIR CATÁLOGO PDF
// ============================================

function setupCatalogoButton() {
    const catalogoBtn = document.getElementById('btn-catalogo');
    
    if (!catalogoBtn) {
        console.log('Botón de catálogo no encontrado');
        return;
    }
    
    catalogoBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Ruta al archivo PDF
        const pdfPath = '/assets/Catalogo.pdf';
        
        // Abrir PDF en nueva pestaña
        window.open(pdfPath, '_blank');
        
        // Mostrar mensaje de éxito
        showNotification('¡Catálogo abierto en nueva pestaña!', 'success');
    });
    
    // Efectos visuales adicionales
    catalogoBtn.addEventListener('mouseenter', function() {
        if (this.querySelector('i')) {
            this.querySelector('i').style.transform = 'rotate(15deg)';
        }
        this.style.boxShadow = '0 10px 25px rgba(128, 90, 213, 0.5)';
    });
    
    catalogoBtn.addEventListener('mouseleave', function() {
        if (this.querySelector('i')) {
            this.querySelector('i').style.transform = 'rotate(0deg)';
        }
        this.style.boxShadow = '';
    });
}

function checkPdfAvailability() {
    const pdfPath = 'assets/Catalogo.pdf';
    const catalogoBtn = document.getElementById('btn-catalogo');
    
    if (!catalogoBtn) return;
    
    // Verificar si el PDF existe al cargar la página
    fetch(pdfPath, { method: 'HEAD' })
        .then(response => {
            if (!response.ok) {
                // PDF no encontrado - Cambiar estilo del botón
                catalogoBtn.innerHTML = '<i class="fas fa-exclamation-triangle mr-2"></i> Catálogo no disponible';
                catalogoBtn.className = catalogoBtn.className.replace('from-purple-600 to-indigo-600', 'from-gray-400 to-gray-500');
                catalogoBtn.classList.remove('hover:from-purple-700', 'hover:to-indigo-700');
                catalogoBtn.classList.add('hover:from-gray-500', 'hover:to-gray-600');
                catalogoBtn.style.cursor = 'not-allowed';
                catalogoBtn.disabled = true;
                
                console.warn('Catálogo PDF no encontrado en:', pdfPath);
            } else {
                console.log('Catálogo PDF disponible:', pdfPath);
            }
        })
        .catch(error => {
            console.error('Error verificando PDF:', error);
        });
}

// ============================================
// GALERÍA DE SOCIOS
// ============================================

function setupSociosGallery() {
    console.log('Inicializando galería de socios...');
    
    const modal = document.getElementById('socio-modal');
    const modalImage = document.getElementById('modal-image');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalClose = document.getElementById('modal-close');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    const socioCards = document.querySelectorAll('.socio-card');
    
    if (!modal || !modalImage || socioCards.length === 0) {
        console.log('Elementos de galería de socios no encontrados');
        return;
    }
    
    console.log(`Encontradas ${socioCards.length} tarjetas de socio`);
    
    let currentIndex = 0;
    const totalSocios = socioCards.length;
    
    // FUNCIÓN PARA ABRIR EL MODAL
    function openModal(index) {
        if (index < 0 || index >= totalSocios) return;
        
        currentIndex = index;
        const card = socioCards[index];
        
        // Obtener imagen
        const cardImg = card.querySelector('img');
        if (cardImg && cardImg.src) {
            modalImage.src = cardImg.src;
            modalImage.alt = cardImg.alt || `Socio ${index + 1}`;
        }
        
        // Obtener información
        const cardTitle = card.querySelector('h3')?.textContent || 'Socio Adherente';
        const cardDescription = card.querySelector('p.text-gray-600')?.textContent || '';
        
        if (modalTitle) modalTitle.textContent = cardTitle;
        if (modalDescription) modalDescription.textContent = cardDescription;
        
        // Mostrar modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }
    
    // CERRAR MODAL
    function closeModal() {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
        document.body.style.overflow = '';
        if (modalImage) modalImage.src = '';
    }
    
    // NAVEGACIÓN
    function navigate(direction) {
        const newIndex = (currentIndex + direction + totalSocios) % totalSocios;
        openModal(newIndex);
    }
    
    // CONFIGURAR EVENTOS EN TARJETAS
    socioCards.forEach((card, index) => {
        // Click en toda la tarjeta
        card.addEventListener('click', function(e) {
            // Evitar si se hace click en un botón
            if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
                return;
            }
            openModal(index);
        });
        
        // Click específico en botón de zoom
        const zoomBtn = card.querySelector('.fa-expand-alt')?.closest('div');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openModal(index);
            });
        }
    });
    
    // CONTROLES DEL MODAL
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modalPrev) {
        modalPrev.addEventListener('click', function() {
            navigate(-1);
        });
    }
    
    if (modalNext) {
        modalNext.addEventListener('click', function() {
            navigate(1);
        });
    }
    
    // CERRAR CON TECLA ESC
    document.addEventListener('keydown', function(e) {
        if (modal && !modal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(1);
                    break;
            }
        }
    });
    
    // CERRAR AL HACER CLICK FUERA
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
    
    console.log('Galería de socios configurada exitosamente');
}

// ============================================
// GALERÍA DE MOMENTOS - VERSIÓN SIMPLIFICADA Y FUNCIONAL
// ============================================

function setupGallery() {
    console.log('Inicializando galería de momentos...');
    
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImage = document.getElementById('gallery-modal-image');
    const galleryModalTitle = document.getElementById('gallery-modal-title');
    const galleryModalDescription = document.getElementById('gallery-modal-description');
    const galleryModalIndex = document.getElementById('gallery-modal-index');
    const galleryModalClose = document.getElementById('gallery-modal-close');
    const galleryModalPrev = document.getElementById('gallery-modal-prev');
    const galleryModalNext = document.getElementById('gallery-modal-next');
    const galleryModalDownload = document.getElementById('gallery-modal-download');
    
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageCounter = document.getElementById('image-counter');
    const btnMasFotos = document.getElementById('btn-mas-fotos');
    
    if (!galleryModal || !galleryModalImage || galleryItems.length === 0) {
        console.log('Elementos de galería de momentos no encontrados');
        return;
    }
    
    console.log(`Encontradas ${galleryItems.length} imágenes en la galería`);
    
    if (imageCounter) {
        imageCounter.textContent = galleryItems.length;
    }
    
    let currentGalleryIndex = 0;
    const totalGalleryImages = galleryItems.length;
    
    // FUNCIÓN PARA ABRIR EL MODAL DE GALERÍA
    function openGalleryModal(index) {
        if (index < 0 || index >= totalGalleryImages) return;
        
        currentGalleryIndex = index;
        const item = galleryItems[index];
        
        // Obtener imagen
        const itemImg = item.querySelector('img');
        if (itemImg && itemImg.src) {
            galleryModalImage.src = itemImg.src;
            galleryModalImage.alt = itemImg.alt || `Momento ${index + 1}`;
        }
        
        // Obtener información del overlay
        const overlayTitle = item.querySelector('h3')?.textContent || 'Momento Especial';
        const overlayDesc = item.querySelector('p.text-sm')?.textContent || 'Evento de la Asociación';
        
        // Establecer información
        if (galleryModalTitle) galleryModalTitle.textContent = overlayTitle;
        if (galleryModalDescription) galleryModalDescription.textContent = overlayDesc;
        if (galleryModalIndex) galleryModalIndex.textContent = `${index + 1} / ${totalGalleryImages}`;
        
        // Configurar botón de descarga
        if (galleryModalDownload && itemImg) {
            galleryModalDownload.onclick = function(e) {
                e.stopPropagation();
                downloadImage(itemImg.src, `momento_${index + 1}.jpg`);
            };
        }
        
        // Mostrar modal
        galleryModal.classList.remove('hidden');
        galleryModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
        
        console.log(`Galería modal abierto: imagen ${index + 1}`);
    }
    
    // FUNCIÓN PARA CERRAR EL MODAL DE GALERÍA
    function closeGalleryModal() {
        galleryModal.classList.remove('flex');
        galleryModal.classList.add('hidden');
        document.body.style.overflow = '';
        if (galleryModalImage) galleryModalImage.src = '';
    }
    
    // FUNCIÓN PARA NAVEGAR EN GALERÍA
    function navigateGallery(direction) {
        const newIndex = (currentGalleryIndex + direction + totalGalleryImages) % totalGalleryImages;
        openGalleryModal(newIndex);
    }
    
    // FUNCIÓN PARA DESCARGAR IMAGEN
    function downloadImage(url, filename) {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Mostrar notificación
        showNotification('Imagen descargada', 'success');
    }
    
    // FUNCIÓN DE NOTIFICACIÓN GENERAL
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-[10001] px-6 py-3 rounded-lg shadow-xl text-white font-semibold transition-all duration-300 transform translate-x-full ${
            type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check' : 'exclamation'}-circle mr-2"></i>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
    
    // CONFIGURAR EVENTOS EN LAS IMÁGENES DE GALERÍA
    galleryItems.forEach((item, index) => {
        // Click en toda la tarjeta
        item.addEventListener('click', function(e) {
            // Evitar si se hace click en el botón de zoom específicamente
            if (e.target.closest('.fa-expand-alt') || e.target.classList.contains('fa-expand-alt')) {
                return;
            }
            openGalleryModal(index);
        });
        
        // Click en botón de zoom
        const zoomBtn = item.querySelector('.fa-expand-alt')?.closest('div');
        if (zoomBtn) {
            zoomBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                openGalleryModal(index);
            });
        }
    });
    
    // CONTROLES DEL MODAL DE GALERÍA
    if (galleryModalClose) {
        galleryModalClose.addEventListener('click', closeGalleryModal);
    }
    
    if (galleryModalPrev) {
        galleryModalPrev.addEventListener('click', function() {
            navigateGallery(-1);
        });
    }
    
    if (galleryModalNext) {
        galleryModalNext.addEventListener('click', function() {
            navigateGallery(1);
        });
    }
    
    // CERRAR CON TECLA ESC (solo para galería)
    document.addEventListener('keydown', function(e) {
        if (galleryModal && !galleryModal.classList.contains('hidden')) {
            switch(e.key) {
                case 'Escape':
                    closeGalleryModal();
                    break;
                case 'ArrowLeft':
                    navigateGallery(-1);
                    break;
                case 'ArrowRight':
                    navigateGallery(1);
                    break;
            }
        }
    });
    
    // CERRAR AL HACER CLICK FUERA (solo galería)
    if (galleryModal) {
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });
    }
    
    // BOTÓN "CARGAR MÁS FOTOS"
    if (btnMasFotos) {
        btnMasFotos.addEventListener('click', function() {
            // Efecto visual
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Simular carga de más fotos
            showNotification('Próximamente agregaremos más momentos', 'info');
        });
    }
    
    console.log('Galería de momentos configurada exitosamente');
}

// ============================================
// EFECTOS MEJORADOS PARA BOTÓN APOYAR
// ============================================

function setupEnhancedDonationButton() {
    const donationButton = document.querySelector('.heartbeat-btn');
    const floatingDonationButton = document.querySelector('.floating-heartbeat-btn');
    
    if (donationButton) {
        // Efecto hover mejorado
        donationButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
            this.style.boxShadow = '0 25px 50px rgba(239, 68, 68, 0.5)';
        });
        
        donationButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) translateY(0)';
            this.style.boxShadow = '';
        });
        
        // Efecto click - lluvia de corazones
        donationButton.addEventListener('click', function(e) {
            e.preventDefault();
            createHeartsRain();
            showDonationModal();
            
            // Navegar a la sección de donaciones después de un breve delay
            setTimeout(() => {
                const targetElement = document.querySelector('#donaciones');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 1500);
        });
    }
    
    if (floatingDonationButton) {
        // Efectos para el botón flotante
        floatingDonationButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.3)';
            this.style.boxShadow = '0 20px 40px rgba(239, 68, 68, 0.6)';
        });
        
        floatingDonationButton.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '';
        });
        
        floatingDonationButton.addEventListener('click', function(e) {
            e.preventDefault();
            createHeartsRain();
            showDonationModal();
            
            setTimeout(() => {
                const targetElement = document.querySelector('#donaciones');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 1500);
        });
    }
}

// ============================================
// LLUVIA DE CORAZONES
// ============================================

function createHeartsRain() {
    // Crear contenedor para corazones
    const heartsContainer = document.createElement('div');
    heartsContainer.className = 'hearts-rain';
    document.body.appendChild(heartsContainer);
    
    // Crear corazones
    const heartCount = 50;
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

// ============================================
// MODAL DE AGRADECIMIENTO
// ============================================

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

// ============================================
// SECCIÓN "QUIÉNES SOMOS" - CONTENIDO DINÁMICO
// ============================================

function setupQuienesSomos() {
    console.log('Configurando sección Quiénes Somos...');
    
    const botones = document.querySelectorAll('.nosotros-btn');
    const contenidoDinamico = document.getElementById('contenido-dinamico');
    const contenidoInicial = document.getElementById('contenido-inicial');
    const contenedorNosotros = document.getElementById('contenido-nosotros');
    const seccionNosotros = document.getElementById('nosotros');
    
    if (!botones.length || !contenidoDinamico || !contenidoInicial) {
        console.log('Elementos de Quiénes Somos no encontrados');
        return;
    }
    
    // Contenido para cada botón
    const contenidos = {
        historia: {
            titulo: 'Nuestra Historia',
            icono: 'fas fa-landmark',
            color: 'from-blue-500 to-indigo-600',
            texto: `
                <p>Inspirados en la convicción de que el arte es un derecho, nacimos para rescatar la tradición del acordeón y convertirla en un motor de inclusión.</p>
                <p>Al igual que una sinfonía, nuestra organización armoniza el esfuerzo individual con la potencia del colectivo, creando melodías de transformación social que resuenan en cada comunidad que tocamos.</p>
                <p>Desde nuestros inicios, hemos sido testigos de cómo el acordeón puede ser más que un instrumento musical: es una herramienta para unir generaciones, preservar nuestra identidad cultural y abrir puertas a un futuro lleno de oportunidades.</p>
            `
        },
        mision: {
            titulo: 'Misión',
            icono: 'fas fa-bullseye',
            color: 'from-green-500 to-emerald-600',
            texto: `
                <p><strong>"Nuestra misión es ser el modelo referente de transformación cultural a través del acordeón, brindando a menores en riesgo una formación musical de excelencia que actúe como motor de desarrollo integral, inclusión y esperanza para sus comunidades."</strong></p>
                <p>Nos comprometemos a:</p>
                <ul>
                    <li>Proporcionar educación musical de alta calidad accesible para todos</li>
                    <li>Fomentar el desarrollo personal y comunitario a través del arte</li>
                    <li>Crear espacios seguros donde los jóvenes puedan expresarse y crecer</li>
                    <li>Promover la inclusión social mediante la práctica musical colectiva</li>
                </ul>
            `
        },
        vision: {
            titulo: 'Visión',
            icono: 'fas fa-eye',
            color: 'from-purple-500 to-violet-600',
            texto: `
                <p><strong>"Consolidarnos como la red cultural líder y referente del país, reconocida por eliminar las barreras de exclusión mediante la práctica del acordeón."</strong></p>
                <p>Visualizamos un futuro donde:</p>
                <ul>
                    <li>Cada menor en situación de riesgo alcance sus metas y transforme su realidad</li>
                    <li>La excelencia musical sea accesible para todos, sin importar su origen</li>
                    <li>El bienestar integral sea el resultado natural de la práctica artística</li>
                    <li>Las comunidades desarrollen su máximo potencial a través de la cultura</li>
                </ul>
                <p>Soñamos con un Perú donde el acordeón sea símbolo de unidad, progreso y orgullo nacional.</p>
            `
        },
        valores: {
            titulo: 'Valores',
            icono: 'fas fa-heart',
            color: 'from-amber-500 to-orange-600',
            texto: `
                <div class="space-y-6">
                    <div>
                        <h4 class="font-bold text-lg text-amber-700 mb-2">🎯 Excelencia y Disciplina</h4>
                        <p>El dominio del acordeón requiere rigor y constancia. Fomentamos en nuestros estudiantes la cultura del esfuerzo y la superación personal, valores que trascienden la música y se convierten en herramientas para toda la vida.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg text-amber-700 mb-2">🤝 Práctica Colectiva y Solidaridad</h4>
                        <p>Al igual que los componentes de un acordeón trabajan en armonía, promovemos el aprendizaje grupal para fortalecer el sentido de comunidad, la empatía y el respeto mutuo entre los jóvenes de nuestros barrios.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg text-amber-700 mb-2">💡 Innovación y Tradición</h4>
                        <p>Respetamos nuestras raíces mientras exploramos nuevas formas de expresión. Combinamos técnicas tradicionales con enfoques contemporáneos para mantener vivo el legado del acordeón.</p>
                    </div>
                    
                    <div>
                        <h4 class="font-bold text-lg text-amber-700 mb-2">🌱 Crecimiento Integral</h4>
                        <p>Creemos en el desarrollo holístico de nuestros miembros, cultivando no solo habilidades musicales, sino también valores éticos, autoestima y sentido de pertenencia.</p>
                    </div>
                </div>
            `
        },
        filosofia: {
            titulo: 'Nuestra Filosofía',
            icono: 'fas fa-brain',
            color: 'from-red-500 to-pink-600',
            texto: `
                <p>En la <strong>Asociación de Acordeonistas del Perú</strong> estamos convencidos de que el arte es el motor capaz de rediseñar realidades. Alineamos nuestra labor con:</p>
                
                <ul class="my-4">
                    <li>Los derechos fundamentales del niño</li>
                    <li>Los Objetivos de Desarrollo Sostenible de la ONU</li>
                    <li>La reducción de brechas sociales y culturales</li>
                    <li>La creación de igualdad de oportunidades</li>
                </ul>
                
                <p>Para nosotros, la cultura no es un lujo, sino un derecho democrático. Por ello, transformamos el aprendizaje del acordeón en:</p>
                
                <div class="grid md:grid-cols-2 gap-4 my-6">
                    <div class="bg-red-50 p-4 rounded-lg">
                        <h5 class="font-bold text-red-700 mb-2">🎶 Espacio de Libertad</h5>
                        <p class="text-sm">Donde niños y jóvenes potencian sus capacidades para ser dueños de su propio destino</p>
                    </div>
                    <div class="bg-pink-50 p-4 rounded-lg">
                        <h5 class="font-bold text-pink-700 mb-2">📚 Herramienta Educativa</h5>
                        <p class="text-sm">Que enseña a decidir y a actuar colectivamente para erradicar la violencia</p>
                    </div>
                </div>
                
                <p class="mt-4">Creemos en una educación que utiliza el poder del fuelle para cohesionar comunidades y proteger nuestro futuro. El acordeón es nuestro instrumento para tejer una sociedad más justa, inclusiva y armoniosa.</p>
            `
        }
    };
    
    // Función para mostrar contenido
    function mostrarContenido(tipo) {
        const contenido = contenidos[tipo];
        
        if (!contenido) return;
        
        // Ocultar contenido inicial
        contenidoInicial.classList.add('hidden');
        
        // Mostrar y llenar contenido dinámico
        contenidoDinamico.classList.remove('hidden');
        contenidoDinamico.innerHTML = `
            <div class="flex items-center mb-6">
                <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${contenido.color} flex items-center justify-center mr-4">
                    <i class="${contenido.icono} text-white text-xl"></i>
                </div>
                <h3 class="text-2xl md:text-3xl font-bold text-gray-800">${contenido.titulo}</h3>
            </div>
            <div class="contenido-texto">
                ${contenido.texto}
            </div>
        `;
        
        // Activar contenedor
        if (contenedorNosotros) {
            contenedorNosotros.classList.add('active');
        }
    }
    
    // Configurar eventos para cada botón
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            const tipo = this.getAttribute('data-content');
            
            // Remover clase active de todos los botones
            botones.forEach(b => {
                b.classList.remove('active');
                b.style.border = '2px solid transparent';
            });
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            this.style.border = '2px solid rgba(255, 255, 255, 0.5)';
            
            // Mostrar contenido
            mostrarContenido(tipo);
            
            return false;
        });
        
        // Efecto hover
        boton.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            }
        });
        
        boton.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    // Configurar botón por defecto (Historia)
    if (botones.length > 0) {
        const primerBoton = botones[0];
        primerBoton.classList.add('active');
        primerBoton.style.border = '2px solid rgba(255, 255, 255, 0.5)';
        // Mostrar contenido inicialmente
        mostrarContenido('historia');
    }
    
    console.log('Sección Quiénes Somos configurada exitosamente');
}