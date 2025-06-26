const background = document.getElementById('background');
const frame = document.getElementById('frame');
const macyStar = document.getElementById('MacyS');

let scale = 1;
let isPanning = false;
let isZoomed = false;
let startX = 50;
let startY = 50;
let translateX = 0;
let translateY = 0;

// Handle zoom with mouse wheel
frame.addEventListener('wheel', (event) => {
  event.preventDefault();

  scale += event.deltaY * -0.001;
  scale = Math.min(Math.max(0.3, scale), 4); // Clamp zoom range

  updateTransform();
});

// Start panning on left mouse down
frame.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return;

  isPanning = true;
  startX = event.clientX;
  startY = event.clientY;
  frame.style.cursor = 'grabbing';
});

// Stop panning on mouse up
document.addEventListener('mouseup', () => {
  isPanning = false;
  frame.style.cursor = 'default';
});

// Handle mouse drag
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

// Apply translation + scale
function updateTransform() {
  background.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}

// Click-to-zoom on MacyS star
macyStar.addEventListener('click', () => {
  if (isZoomed) {
    // Reset zoom and pan
    scale = 1;
    translateX = 0;
    translateY = 0;
    background.style.transition = 'transform 1s ease';
    updateTransform();
    isZoomed = false;
  } else {
    const starRect = macyStar.getBoundingClientRect();
    const bgRect = background.getBoundingClientRect();

    const offsetX = starRect.left - bgRect.left + starRect.width / 2;
    const offsetY = starRect.top - bgRect.top + starRect.height / 2;

    const centerX = 50+ window.innerWidth / 2;
    const centerY = 50+ window.innerHeight / 2;

    translateX = centerX - offsetX;
    translateY = centerY - offsetY;
    scale = 2.5;

    background.style.transition = 'transform 1s ease';
    updateTransform();
    isZoomed = true;
  }
});
