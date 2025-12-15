const card = document.querySelector('.card');
const container = document.querySelector('.card-container');



//  1. Evento para rotar la tarjeta 
container.addEventListener('pointermove', (e) => {
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

// 2. Evento para mover el Reflejo de Luz 
card.addEventListener('pointermove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', x + 'px');
    card.style.setProperty('--mouse-y', y + 'px');
});

// 3. Evento para resetear la tarjeta
container.addEventListener('pointerleave', () => {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
});


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

// 5. Lógica de Redirección Condicional 

document.querySelectorAll('.course-item').forEach(item => {
    item.addEventListener('click', function() {
        const link = this.dataset.link; 
        if (link && link !== '#' && link !== '') { 
            window.open(link, '_blank', 'noopener,noreferrer'); 
        } else {
            console.log('No hay enlace disponible.');
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
            console.log('No hay enlace disponible.');
        }
    });
});

// --- 6. EFECTO DE FONDO MATRIX ---
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrixChars = '01';
const charsArray = matrixChars.split('');
const fontSize = 14;
let columns = canvas.width / fontSize; 
let drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#007bff'; 
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

let matrixInterval = setInterval(drawMatrix, 33);

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