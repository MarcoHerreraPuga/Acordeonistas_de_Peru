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
    
    // Consola de bienvenida
    console.log('%c🎵 Asociación de Acordeonistas del Perú 🎵', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    console.log('%c¡Bienvenido al sitio oficial de la Asociación de Acordeonistas!', 'color: #666;');
});

// ============================================
// FUNCIONES INDEPENDIENTES
// ============================================

// MENÚ MÓVIL
function crearMenuMovilSimple() {
    const existingMenu = document.getElementById('mobile-simple-menu');
    if (existingMenu) {
        existingMenu.remove();
        return;
    }
    
    const menu = document.createElement('div');
    menu.id = 'mobile-simple-menu';
    menu.className = 'fixed top-20 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 min-w-48';
    
    const links = [
        { text: 'Inicio', href: '#inicio', icon: 'fas fa-home' },
        { text: 'Nosotros', href: '#nosotros', icon: 'fas fa-users' },
        { text: 'Historia', href: '#historia', icon: 'fas fa-history' },
        { text: 'Actividades', href: '#actividades', icon: 'fas fa-calendar-alt' },
        { text: 'Apoyar ❤️', href: '#donaciones', icon: 'fas fa-heart heartbeat-icon' }
    ];
    
    links.forEach(link => {
        const a = document.createElement('a');
        a.href = link.href;
        a.className = 'flex items-center py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition duration-200 border-b border-gray-100 last:border-b-0';
        a.innerHTML = `
            <i class="${link.icon} mr-3 text-gray-400 w-5 text-center"></i>
            <span class="font-medium">${link.text}</span>
        `;
        
        a.addEventListener('click', function(e) {
            e.preventDefault();
            const targetElement = document.querySelector(link.href);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
            menu.remove();
        });
        
        menu.appendChild(a);
    });
    
    document.body.appendChild(menu);
    
    setTimeout(() => {
        const closeMenu = function(e) {
            if (!menu.contains(e.target) && e.target.id !== 'menu-movil') {
                menu.remove();
                document.removeEventListener('click', closeMenu);
            }
        };
        document.addEventListener('click', closeMenu);
    }, 10);
    
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
        heroTitle.innerHTML = 'El Sonido que Une Generaciones';
        
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
        heroSubtitle.innerHTML = 'Explora la rica historia y el vibrante futuro del acordeón en el Perú con la Asociación de Acordeonistas.';
        
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
// CONFETTI (efecto adicional)
// ============================================

function createConfetti() {
    const confettiContainer = document.createElement('div');
    confettiContainer.className = 'hearts-rain';
    document.body.appendChild(confettiContainer);
    
    const confettiCount = 100;
    const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 0.5}s`;
        confetti.style.width = `${Math.random() * 10 + 5}px`;
        confetti.style.height = `${Math.random() * 10 + 5}px`;
        
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
    
    setTimeout(() => {
        confettiContainer.remove();
    }, 5000);
}

// ============================================
// INICIALIZAR TODO
// ============================================

// En tu función DOMContentLoaded, llama a esta nueva función:
// Agrega esta línea donde inicializas todas las funciones (al final de DOMContentLoaded)

// Reemplaza la línea que dice: setupHeartbeatButton();
// por:
