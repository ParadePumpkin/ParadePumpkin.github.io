const background = document.getElementById('background');
const frame = document.getElementById('frame');

let scale = 1;
let isPanning = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;

frame.addEventListener('wheel', (event) => {
    event.preventDefault();

    scale += event.deltaY * -0.001;
    scale = Math.min(Math.max(0.5, scale), 5);

    updateTransform();
});

// Only respond to middle mouse (button === 1)
frame.addEventListener('mousedown', (event) => {
    if (event.button !== 1) return; // middle mouse only

    isPanning = true;
    startX = event.clientX;
    startY = event.clientY;
    frame.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (event) => {
    if (!isPanning) return;

    const dx = event.clientX - startX;
    const dy = event.clientY - startY;

    startX = event.clientX;
    startY = event.clientY;

    translateX += dx;
    translateY += dy;

    updateTransform();
});

window.addEventListener('mouseup', (event) => {
    if (event.button === 1) {
        isPanning = false;
        frame.style.cursor = 'default';
    }
});

function updateTransform() {
    background.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}
