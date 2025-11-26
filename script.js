const card = document.querySelector('.card');
const container = document.querySelector('.card-container');

// --- 1. Evento para la Inclinación 3D (Tilt) ---
container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    const factor = 20;
    const rotateX = (mouseY / factor);
    const rotateY = -(mouseX / factor);
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

// --- 2. Evento para mover el Reflejo de Luz ---
card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
});

// --- 3. Evento para resetear la tarjeta cuando el ratón sale ---
container.addEventListener('mouseleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

// --- 4. Smooth Scroll para el menú ---
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const offsetTop = targetElement.offsetTop - document.querySelector('.main-nav').offsetHeight;
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// --- 5. Lógica de Redirección Condicional para Cursos y Proyectos ---

// Para Cursos
document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', function() {
        const link = this.dataset.link; 
        if (link && link !== '#' && link !== '') { 
            window.open(link, '_blank', 'noopener,noreferrer'); 
        } else {
            console.log('No hay enlace disponible para este curso/certificación aún.');
        }
    });
});

// Para Proyectos
document.querySelectorAll('.project-card').forEach(item => {
    item.addEventListener('click', function() {
        const link = this.dataset.link;
        if (link && link !== '#' && link !== '') {
            window.open(link, '_blank', 'noopener,noreferrer'); 
        } else {
            console.log('No hay enlace disponible para este proyecto aún.');
        }
    });
});


// ==========================================
// --- 6. EFECTO DE FONDO MATRIX (0s y 1s) ---
// ==========================================

const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Ajustar el canvas al tamaño de la pantalla
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Caracteres binarios
const matrixChars = '01';
const charsArray = matrixChars.split('');

const fontSize = 14;
let columns = canvas.width / fontSize; 

// Array para las posiciones Y de las gotas
let drops = [];
for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    // Fondo negro translúcido para dejar estela
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Color del texto (Azul del tema)
    ctx.fillStyle = '#007bff'; 
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        
        // Dibujar caracter
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reiniciar gota si sale de pantalla (con aleatoriedad)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        // Mover gota
        drops[i]++;
    }
}

// Iniciar animación (aprox 30 FPS)
let matrixInterval = setInterval(drawMatrix, 33);

// Ajustar canvas si se cambia el tamaño de ventana
window.addEventListener('resize', () => {
    clearInterval(matrixInterval);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    columns = canvas.width / fontSize;
    drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }
    matrixInterval = setInterval(drawMatrix, 33);
});