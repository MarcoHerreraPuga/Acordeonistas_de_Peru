// js/quienes-somos.js - VERSIÓN CORREGIDA Y FUNCIONAL
// Controlador de contenido dinámico para la sección "Quiénes Somos"

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Quienes Somos - Inicializando...');
    
    // Contenido específico para cada botón
    const contenidos = {
        historia: {
            titulo: 'Nuestra Historia',
            icono: 'fas fa-landmark',
            color: 'from-blue-500 to-indigo-600',
            contenido: `
                <div class="space-y-4">
                    <p class="text-lg leading-relaxed text-gray-700">
                        <strong class="text-blue-600">Inspirados en la convicción de que el arte es un derecho</strong>, 
                        nacimos para rescatar la tradición del acordeón y convertirla en un motor de inclusión. 
                        Al igual que una sinfonía, nuestra organización armoniza el esfuerzo individual con la potencia del colectivo.
                    </p>
                    
                    <div class="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                        <p class="text-gray-700">
                            Desde nuestros inicios, hemos sido testigos de cómo el acordeón puede ser más que un instrumento musical: 
                            es una herramienta para unir generaciones, preservar nuestra identidad cultural y abrir puertas a un futuro 
                            lleno de oportunidades.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div class="p-3 bg-white border border-gray-200 rounded-lg">
                            <h4 class="font-bold text-gray-800 mb-1 flex items-center">
                                <i class="fas fa-calendar-alt text-blue-500 mr-2"></i>
                                Desde 1953
                            </h4>
                            <p class="text-sm text-gray-600">Promoviendo la cultura musical peruana</p>
                        </div>
                        <div class="p-3 bg-white border border-gray-200 rounded-lg">
                            <h4 class="font-bold text-gray-800 mb-1 flex items-center">
                                <i class="fas fa-award text-blue-500 mr-2"></i>
                                Reconocidos
                            </h4>
                            <p class="text-sm text-gray-600">Por el Ministerio de Cultura del Perú</p>
                        </div>
                    </div>
                </div>
            `
        },
        mision: {
            titulo: 'Misión',
            icono: 'fas fa-bullseye',
            color: 'from-green-500 to-emerald-600',
            contenido: `
                <div class="space-y-4">
                    <div class="p-5 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                        <p class="text-lg font-bold text-gray-800 leading-relaxed text-center italic">
                            "Nuestra misión es ser el modelo referente de transformación cultural a través del acordeón, 
                            brindando a menores en riesgo una formación musical de excelencia que actúe como motor de 
                            desarrollo integral, inclusión y esperanza para sus comunidades."
                        </p>
                    </div>
                    
                    <div class="space-y-3 mt-6">
                        <h4 class="font-bold text-lg text-green-700">Nos comprometemos a:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Proporcionar educación musical de alta calidad accesible para todos</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Fomentar el desarrollo personal y comunitario a través del arte</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Crear espacios seguros donde los jóvenes puedan expresarse y crecer</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-check-circle text-green-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Promover la inclusión social mediante la práctica musical colectiva</span>
                            </li>
                        </ul>
                    </div>
                </div>
            `
        },
        vision: {
            titulo: 'Visión',
            icono: 'fas fa-eye',
            color: 'from-purple-500 to-violet-600',
            contenido: `
                <div class="space-y-4">
                    <div class="p-5 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl border border-purple-100">
                        <p class="text-lg font-bold text-gray-800 leading-relaxed text-center italic">
                            "Consolidarnos como la red cultural líder y referente del país, reconocida por eliminar las barreras 
                            de exclusión mediante la práctica del acordeón; visualizamos un futuro donde cada menor en situación 
                            de riesgo alcance sus metas y transforme su realidad a través de la excelencia musical, el bienestar 
                            integral y el desarrollo de su máximo potencial."
                        </p>
                    </div>
                    
                    <div class="space-y-3 mt-6">
                        <h4 class="font-bold text-lg text-purple-700">Visualizamos un futuro donde:</h4>
                        <ul class="space-y-2">
                            <li class="flex items-start">
                                <i class="fas fa-star text-purple-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Cada menor en situación de riesgo alcance sus metas y transforme su realidad</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-star text-purple-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">La excelencia musical sea accesible para todos, sin importar su origen</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-star text-purple-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">El bienestar integral sea el resultado natural de la práctica artística</span>
                            </li>
                            <li class="flex items-start">
                                <i class="fas fa-star text-purple-500 mt-1 mr-3"></i>
                                <span class="text-gray-700">Las comunidades desarrollen su máximo potencial a través de la cultura</span>
                            </li>
                        </ul>
                    </div>
                    
                    <div class="mt-6 p-4 bg-violet-50 rounded-lg">
                        <p class="text-gray-700 text-center italic">
                            <i class="fas fa-quote-left text-violet-400 mr-2"></i>
                            Soñamos con un Perú donde el acordeón sea símbolo de unidad, progreso y orgullo nacional.
                            <i class="fas fa-quote-right text-violet-400 ml-2"></i>
                        </p>
                    </div>
                </div>
            `
        },
        valores: {
            titulo: 'Valores',
            icono: 'fas fa-heart',
            color: 'from-amber-500 to-orange-600',
            contenido: `
                <div class="space-y-6">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div class="p-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                            <div class="flex items-center mb-3">
                                <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center mr-3">
                                    <i class="fas fa-trophy text-amber-600"></i>
                                </div>
                                <h4 class="font-bold text-lg text-amber-700">Excelencia y Disciplina</h4>
                            </div>
                            <p class="text-gray-700">
                                El dominio del acordeón requiere rigor y constancia. Fomentamos en nuestros estudiantes 
                                la cultura del esfuerzo y la superación personal, valores que trascienden la música y 
                                se convierten en herramientas para toda la vida.
                            </p>
                        </div>
                        
                        <div class="p-5 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                            <div class="flex items-center mb-3">
                                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                                    <i class="fas fa-users text-orange-600"></i>
                                </div>
                                <h4 class="font-bold text-lg text-orange-700">Práctica Colectiva y Solidaridad</h4>
                            </div>
                            <p class="text-gray-700">
                                Al igual que los componentes de un acordeón trabajan en armonía, promovemos el aprendizaje 
                                grupal para fortalecer el sentido de comunidad, la empatía y el respeto mutuo entre los 
                                jóvenes de nuestros barrios.
                            </p>
                        </div>
                    </div>
                    
                    <div class="p-5 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl border-l-4 border-amber-500">
                        <h4 class="font-bold text-lg text-gray-800 mb-3">Nuestros Pilares Fundamentales:</h4>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="text-gray-700">Integridad y Transparencia</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="text-gray-700">Respeto a la Diversidad</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="text-gray-700">Compromiso Social</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-check text-green-500 mr-2"></i>
                                <span class="text-gray-700">Innovación Continua</span>
                            </div>
                        </div>
                    </div>
                </div>
            `
        },
        filosofia: {
            titulo: 'Nuestra Filosofía',
            icono: 'fas fa-brain',
            color: 'from-red-500 to-pink-600',
            contenido: `
                <div class="space-y-4">
                    <p class="text-lg leading-relaxed text-gray-700">
                        En la <strong class="text-red-600">Asociación de Acordeonistas del Perú</strong> estamos convencidos de que el arte es el motor capaz de rediseñar realidades. 
                        Alineamos nuestra labor con los derechos fundamentales del niño y los Objetivos de Desarrollo Sostenible, 
                        entendiendo que el progreso humano nace de la reducción de brechas y la creación de igualdad de oportunidades.
                    </p>
                    
                    <div class="p-5 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-100">
                        <h4 class="font-bold text-lg text-red-700 mb-3 flex items-center">
                            <i class="fas fa-lightbulb mr-2"></i>
                            Nuestro Enfoque
                        </h4>
                        <p class="text-gray-700">
                            Para nosotros, la cultura no es un lujo, sino un derecho democrático. Por ello, transformamos el aprendizaje 
                            del acordeón en un espacio de libertad y educación donde niños y jóvenes potencian sus capacidades para ser 
                            dueños de su propio destino y agentes de cambio.
                        </p>
                    </div>
                    
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        <div class="p-4 bg-white border border-gray-200 rounded-lg">
                            <h5 class="font-bold text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-handshake text-red-500 mr-2"></i>
                                Educación Transformadora
                            </h5>
                            <p class="text-sm text-gray-600">
                                Creemos en una educación que enseña a decidir y a actuar colectivamente para erradicar la violencia y la desigualdad.
                            </p>
                        </div>
                        <div class="p-4 bg-white border border-gray-200 rounded-lg">
                            <h5 class="font-bold text-gray-800 mb-2 flex items-center">
                                <i class="fas fa-globe-americas text-red-500 mr-2"></i>
                                Impacto Comunitario
                            </h5>
                            <p class="text-sm text-gray-600">
                                Utilizamos el poder del fuelle para cohesionar comunidades y proteger nuestro futuro.
                            </p>
                        </div>
                    </div>
                    
                    <div class="mt-6 p-4 bg-gray-50 rounded-lg border-l-4 border-gray-400">
                        <p class="text-gray-700 text-center italic">
                            <i class="fas fa-quote-left text-gray-400 mr-2"></i>
                            El acordeón no es solo un instrumento musical; es una herramienta para construir un Perú más justo, 
                            inclusivo y lleno de oportunidades para todos.
                            <i class="fas fa-quote-right text-gray-400 ml-2"></i>
                        </p>
                    </div>
                </div>
            `
        }
    };

    // Obtener elementos del DOM
    const botones = document.querySelectorAll('.nosotros-btn');
    const contenidoDinamico = document.getElementById('contenido-dinamico');
    const contenidoInicial = document.getElementById('contenido-inicial');
    const contenedorNosotros = document.getElementById('contenido-nosotros');
    
    if (!botones.length || !contenidoDinamico || !contenidoInicial) {
        console.warn('⚠️ Elementos de Quiénes Somos no encontrados');
        return;
    }
    
    console.log(`✅ Encontrados ${botones.length} botones de navegación`);

    // Función para mostrar contenido con animación
    function mostrarContenido(tipo) {
        const contenido = contenidos[tipo];
        
        if (!contenido) {
            console.error('❌ Contenido no encontrado:', tipo);
            return;
        }
        
        // Ocultar contenido inicial con animación
        contenidoInicial.style.opacity = '0';
        contenidoInicial.style.transform = 'translateY(20px)';
        contenidoInicial.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        setTimeout(() => {
            contenidoInicial.classList.add('hidden');
            
            // Mostrar y animar contenido dinámico
            contenidoDinamico.classList.remove('hidden');
            contenidoDinamico.innerHTML = `
                <div class="flex items-center mb-6">
                    <div class="w-12 h-12 rounded-lg bg-gradient-to-br ${contenido.color} flex items-center justify-center mr-4">
                        <i class="${contenido.icono} text-white text-xl"></i>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold text-gray-800">${contenido.titulo}</h3>
                </div>
                <div class="contenido-texto">
                    ${contenido.contenido}
                </div>
            `;
            
            // Aplicar animación de entrada
            contenidoDinamico.style.opacity = '0';
            contenidoDinamico.style.transform = 'translateY(20px)';
            
            // Animar entrada del contenido
            setTimeout(() => {
                contenidoDinamico.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                contenidoDinamico.style.opacity = '1';
                contenidoDinamico.style.transform = 'translateY(0)';
            }, 50);
            
        }, 300);
        
        // Destacar botón activo
        botones.forEach(boton => {
            boton.classList.remove('active');
            boton.style.border = '2px solid transparent';
            boton.style.transform = 'translateY(0) scale(1)';
        });
        
        const botonActivo = document.querySelector(`.nosotros-btn[data-content="${tipo}"]`);
        if (botonActivo) {
            botonActivo.classList.add('active');
            botonActivo.style.border = '2px solid rgba(255, 255, 255, 0.5)';
            botonActivo.style.transform = 'translateY(-3px) scale(1.05)';
        }
        
        // Destacar contenedor
        if (contenedorNosotros) {
            contenedorNosotros.classList.add('active');
            contenedorNosotros.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.1)';
            
            setTimeout(() => {
                contenedorNosotros.style.boxShadow = '';
            }, 1000);
        }
    }

    // Configurar eventos para cada botón
    botones.forEach(boton => {
        boton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tipo = this.getAttribute('data-content');
            console.log(`🎵 Mostrando contenido: ${tipo}`);
            
            // Efecto de click
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                mostrarContenido(tipo);
            }, 150);
        });
        
        // Efecto hover
        boton.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-3px) scale(1.05)';
                this.style.transition = 'transform 0.3s ease';
            }
        });
        
        boton.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0) scale(1)';
            }
        });
    });
    
    console.log('✅ Sistema de contenido dinámico configurado exitosamente');
    
    // Agregar estilos CSS para animaciones
    const estiloAnimaciones = document.createElement('style');
    estiloAnimaciones.textContent = `
        #contenido-nosotros {
            transition: box-shadow 0.5s ease;
        }
        
        .nosotros-btn {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        
        #contenido-dinamico {
            transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        #contenido-inicial {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        .nosotros-btn.active {
            animation: pulse-active 2s infinite;
        }
        
        @keyframes pulse-active {
            0% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
            70% { box-shadow: 0 0 0 10px rgba(255, 255, 255, 0); }
            100% { box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
    `;
    document.head.appendChild(estiloAnimaciones);
});