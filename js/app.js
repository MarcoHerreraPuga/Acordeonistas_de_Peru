document.addEventListener('DOMContentLoaded', function() {
    
    // Navegación suave para enlaces internos
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

    // Botón de donación
    document.getElementById('btn-donacion')?.addEventListener('click', function() {
        alert('¡Gracias por tu interés en apoyarnos! Serás redirigido al formulario de donación.');
        // Aquí normalmente redirigirías a un formulario de pago
        // window.location.href = 'formulario-donacion.html';
    });

    // Efecto de scroll para header
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

    // Menú móvil simple (tres puntos) - VERSIÓN ORIGINAL
    document.getElementById('menu-movil')?.addEventListener('click', function() {
        // Menú simple emergente
        crearMenuMovilSimple();
    });
    
    // Efecto de carga para imágenes
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
    });
    
    // Efecto de hover en tarjetas de actividades
    const activityCards = document.querySelectorAll('#actividades .bg-white');
    activityCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Función para crear menú móvil simple (tres puntos)
    function crearMenuMovilSimple() {
        // Verificar si ya existe un menú móvil
        const existingMenu = document.getElementById('mobile-simple-menu');
        if (existingMenu) {
            existingMenu.remove();
            return;
        }
        
        // Crear menú simple
        const menu = document.createElement('div');
        menu.id = 'mobile-simple-menu';
        menu.className = 'fixed top-20 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 min-w-48';
        
        // Enlaces del menú
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
        
        // Cerrar menú al hacer clic fuera
        setTimeout(() => {
            const closeMenu = function(e) {
                if (!menu.contains(e.target) && e.target.id !== 'menu-movil') {
                    menu.remove();
                    document.removeEventListener('click', closeMenu);
                }
            };
            document.addEventListener('click', closeMenu);
        }, 10);
        
        // Cerrar menú con tecla ESC
        const closeOnEsc = function(e) {
            if (e.key === 'Escape') {
                menu.remove();
                document.removeEventListener('keydown', closeOnEsc);
            }
        };
        document.addEventListener('keydown', closeOnEsc);
    }

// ============================================
// BOTÓN FLOTANTE "APOYAR" PARA MÓVIL
// ============================================

function setupFloatingDonationButton() {
    const floatingBtn = document.getElementById('floating-donation-btn');
    const floatingHeartBtn = floatingBtn?.querySelector('.floating-heartbeat-btn');
    const floatingHeartIcon = floatingBtn?.querySelector('.floating-heart-icon');
    
    if (floatingHeartBtn && floatingHeartIcon) {
        // Efecto al pasar el mouse (touch en móvil)
        floatingHeartBtn.addEventListener('mouseenter', function() {
            // Aumentar velocidad del latido
            floatingHeartIcon.style.animation = 'floating-heartbeat 0.8s infinite';
        });
        
        floatingHeartBtn.addEventListener('mouseleave', function() {
            // Volver a la velocidad normal
            floatingHeartIcon.style.animation = 'floating-heartbeat 1.5s infinite';
        });
        
        // Efecto al hacer clic/toque
        floatingHeartBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear efecto de explosión de corazones
            createFloatingHeartExplosion(this);
            
            // Sonido de corazón (muy sutil)
            playHeartSound();
            
            // Efecto de clic visual
            this.style.animation = 'click-effect 0.3s';
            
            // Navegar a la sección después del efecto
            setTimeout(() => {
                const targetElement = document.querySelector('#donaciones');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Restaurar animación
                this.style.animation = 'float-pulse 3s infinite';
            }, 300);
        });
        
        // Efecto táctil para móvil
        floatingHeartBtn.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.9)';
        });
        
        floatingHeartBtn.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    }

    // Agrega esto también:
    function hideOriginalDonationButtonOnMobile() {
        const originalDonationButton = document.querySelector('.heartbeat-btn');
        
        if (window.innerWidth < 768 && originalDonationButton) {
            originalDonationButton.style.display = 'none';
        }
        
        // También escuchar cambios de tamaño
        window.addEventListener('resize', function() {
            if (window.innerWidth < 768 && originalDonationButton) {
                originalDonationButton.style.display = 'none';
            } else if (originalDonationButton) {
                originalDonationButton.style.display = '';
            }
        });
    }
    
    // Esconder el botón cuando el usuario está en la sección de donaciones
    function hideButtonWhenInDonations() {
        const donationsSection = document.getElementById('donaciones');
        if (!donationsSection || !floatingBtn) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Ocultar botón cuando está en la sección de donaciones
                    floatingBtn.style.opacity = '0.5';
                    floatingBtn.style.pointerEvents = 'none';
                    floatingBtn.style.transform = 'scale(0.8)';
                } else {
                    // Mostrar botón cuando no está en la sección
                    floatingBtn.style.opacity = '1';
                    floatingBtn.style.pointerEvents = 'auto';
                    floatingBtn.style.transform = 'scale(1)';
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(donationsSection);
    }
    
    // Iniciar observador
    hideButtonWhenInDonations();
    
    // Ocultar botón cuando se hace scroll hacia abajo, mostrar cuando se hace scroll hacia arriba
    let lastScrollTop = 0;
    let isScrolling;
    
    window.addEventListener('scroll', function() {
        if (window.innerWidth >= 768) return; // Solo en móvil
        
        const st = window.pageYOffset || document.documentElement.scrollTop;
        
        if (st > lastScrollTop) {
            // Scrolling down - ocultar botón
            floatingBtn.style.transform = 'translateY(100px)';
            floatingBtn.style.opacity = '0';
        } else {
            // Scrolling up - mostrar botón
            floatingBtn.style.transform = 'translateY(0)';
            floatingBtn.style.opacity = '1';
        }
        
        lastScrollTop = st <= 0 ? 0 : st;
        
        // Clear timeout
        clearTimeout(isScrolling);
        
        // Set a timeout to run after scrolling ends
        isScrolling = setTimeout(function() {
            floatingBtn.style.transform = 'translateY(0)';
            floatingBtn.style.opacity = '1';
        }, 150);
    });
}

// Función para crear explosión de corazones para el botón flotante
function createFloatingHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '❣️'];
    
    // Crear 6 corazones para la explosión
    for (let i = 0; i < 6; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '24px';
        heart.style.zIndex = '10000';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '1';
        heart.style.userSelect = 'none';
        
        document.body.appendChild(heart);
        
        // Animación de explosión
        const angle = (i / 6) * Math.PI * 2;
        const distance = 80 + Math.random() * 60;
        const duration = 1000 + Math.random() * 500;
        
        const finalX = centerX + Math.cos(angle) * distance;
        const finalY = centerY + Math.sin(angle) * distance;
        
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentX = centerX + (finalX - centerX) * easeOut;
            const currentY = centerY + (finalY - centerY) * easeOut;
            const currentScale = 1 - progress * 0.5;
            const currentOpacity = 1 - progress;
            
            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
            heart.style.transform = `scale(${currentScale}) rotate(${progress * 720}deg)`;
            heart.style.opacity = currentOpacity;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (heart.parentNode) {
                    document.body.removeChild(heart);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
}


    // ============================================
// EFECTOS ESPECIALES PARA EL BOTÓN "APOYAR"
// ============================================

function setupHeartbeatButton() {
    const heartbeatBtn = document.querySelector('.heartbeat-btn');
    const heartbeatIcon = document.querySelector('.heartbeat-icon');
    
    if (heartbeatBtn && heartbeatIcon) {
        // Efecto al pasar el mouse
        heartbeatBtn.addEventListener('mouseenter', function() {
            // Aumentar velocidad del latido
            heartbeatIcon.style.animation = 'heartbeat 0.8s infinite';
            
            // Agregar partículas de corazón (opcional)
            if (window.innerWidth > 768) {
                createHeartParticles(this);
            }
        });
        
        heartbeatBtn.addEventListener('mouseleave', function() {
            // Volver a la velocidad normal
            heartbeatIcon.style.animation = 'heartbeat 1.5s infinite';
        });
        
        // Efecto al hacer clic
        heartbeatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Crear efecto visual
            createHeartExplosion(this);
            
            // Sonido de corazón (opcional, muy sutil)
            playHeartSound();
            
            // Navegar a la sección después del efecto
            setTimeout(() => {
                const targetElement = document.querySelector('#donaciones');
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }, 300);
        });
    }
}

// Función para crear partículas de corazón al hacer hover
function createHeartParticles(element) {
    const rect = element.getBoundingClientRect();
    const hearts = ['❤️', '💖', '💗', '💓', '💞'];
    
    // Crear 3 partículas
    for (let i = 0; i < 3; i++) {
        const particle = document.createElement('div');
        particle.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        particle.style.position = 'fixed';
        particle.style.left = (rect.left + rect.width / 2) + 'px';
        particle.style.top = (rect.top + rect.height / 2) + 'px';
        particle.style.fontSize = '14px';
        particle.style.zIndex = '1000';
        particle.style.pointerEvents = 'none';
        particle.style.opacity = '1';
        particle.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(particle);
        
        // Animación aleatoria
        const angle = Math.random() * Math.PI * 2;
        const distance = 30 + Math.random() * 30;
        const finalX = (rect.left + rect.width / 2) + Math.cos(angle) * distance;
        const finalY = (rect.top + rect.height / 2) + Math.sin(angle) * distance - 20;
        
        // Animar
        setTimeout(() => {
            particle.style.left = finalX + 'px';
            particle.style.top = finalY + 'px';
            particle.style.opacity = '0';
            particle.style.transform = 'scale(0.5)';
        }, 10);
        
        // Remover después de la animación
        setTimeout(() => {
            if (particle.parentNode) {
                document.body.removeChild(particle);
            }
        }, 1010);
    }
}

// Función para crear explosión de corazones al hacer clic
function createHeartExplosion(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const hearts = ['❤️', '💖', '💗', '💓', '💞', '💕', '❣️'];
    
    // Crear 8 corazones para la explosión
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.position = 'fixed';
        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.fontSize = '20px';
        heart.style.zIndex = '1000';
        heart.style.pointerEvents = 'none';
        heart.style.opacity = '1';
        
        document.body.appendChild(heart);
        
        // Animación de explosión
        const angle = (i / 8) * Math.PI * 2;
        const distance = 60 + Math.random() * 40;
        const duration = 800 + Math.random() * 400;
        
        const finalX = centerX + Math.cos(angle) * distance;
        const finalY = centerY + Math.sin(angle) * distance;
        
        // Usar requestAnimationFrame para animación suave
        let startTime = null;
        
        function animate(currentTime) {
            if (!startTime) startTime = currentTime;
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            const currentX = centerX + (finalX - centerX) * easeOut;
            const currentY = centerY + (finalY - centerY) * easeOut;
            const currentScale = 1 - progress * 0.5;
            const currentOpacity = 1 - progress;
            
            heart.style.left = currentX + 'px';
            heart.style.top = currentY + 'px';
            heart.style.transform = `scale(${currentScale}) rotate(${progress * 360}deg)`;
            heart.style.opacity = currentOpacity;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                if (heart.parentNode) {
                    document.body.removeChild(heart);
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Función para sonido de corazón (muy sutil, opcional)
function playHeartSound() {
    try {
        // Solo reproducir en desktop para no molestar en móvil
        if (window.innerWidth > 768) {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // Frecuencia que suena como latido de corazón
            oscillator.frequency.value = 110; // Más grave, como latido
            oscillator.type = 'sine';
            
            // Patrón de latido: dos pulsos rápidos
            const now = audioContext.currentTime;
            gainNode.gain.setValueAtTime(0, now);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.05);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.1);
            gainNode.gain.linearRampToValueAtTime(0.1, now + 0.15);
            gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
            
            oscillator.start(now);
            oscillator.stop(now + 0.25);
        }
    } catch (e) {
        // Silenciar error si el audio no está disponible
    }
}

// ============================================
// EFECTO DE LETRAS INDIVIDUALES PARA EL SUBTÍTULO
// ============================================

function setupHeroSubtitleEffect() {
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (!heroSubtitle) return;
    
    const originalText = heroSubtitle.textContent;
    const letters = originalText.split('');
    
    // Envolver cada letra en un span
    heroSubtitle.innerHTML = '';
    
    letters.forEach((letter, index) => {
        const span = document.createElement('span');
        span.textContent = letter === ' ' ? ' ' : letter;
        span.style.transition = `all 0.2s ${index * 0.01}s`;
        heroSubtitle.appendChild(span);
    });
    
    // Efecto de brillo aleatorio en las letras
    setInterval(() => {
        if (!heroSubtitle.matches(':hover')) return;
        
        const spans = heroSubtitle.querySelectorAll('span');
        const randomSpan = spans[Math.floor(Math.random() * spans.length)];
        
        if (randomSpan && randomSpan.textContent.trim() !== '') {
            randomSpan.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.5)';
            randomSpan.style.transform = 'translateY(-2px)';
            
            setTimeout(() => {
                randomSpan.style.textShadow = '';
                randomSpan.style.transform = '';
            }, 500);
        }
    }, 300);
}



// Y en tu DOMContentLoaded, agrega esta llamada:
// Busca esta línea en tu archivo JS (al final de DOMContentLoaded):
//onsole.log('%cDesarrollado con HTML, Tailwind CSS y JavaScript', 'color: #8b5cf6; font-style: italic;');


    
    // Consola de bienvenida
    setupFloatingDonationButton();
    hideOriginalDonationButtonOnMobile();

    console.log('%c🎵 Asociación de Acordeonistas del Perú 🎵', 'color: #3b82f6; font-size: 18px; font-weight: bold;');
    console.log('%c¡Bienvenido al sitio oficial de la Asociación de Acordeonistas!', 'color: #666;');
    
    setupHeartbeatButton();
    setupHeroSubtitleEffect();
});