const background = document.getElementById('background');
const HSQ = document.getElementById('HSQ');
const frame = document.getElementById('frame');
const macyStar = document.getElementById('MacyS');

let scale = 1;
let isPanning = false;
let isZoomed = false;
let startX = 0;
let startY = 0;
let translateX = 0;
let translateY = 0;


function hideStartup() {
  const startup = document.getElementById('startup');
  startup.classList.add('fade-out');

  setTimeout(() => {
    startup.style.display = 'none';
  }, 3000); // Match transition time
}

// Trigger hide on first click
document.getElementById('startup').addEventListener('click', hideStartup);

setTimeout(hideStartup, 3000);









// // Handle zoom with mouse wheel
frame.addEventListener('wheel', (event) => {
  event.preventDefault();

  const rect = frame.getBoundingClientRect();

  // Mouse position relative to frame
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;

  // Position on the zoomed content (before scale)
  const offsetX = (mouseX - translateX) / scale;
  const offsetY = (mouseY - translateY) / scale;

  // Update scale
  const prevScale = scale;
  scale += event.deltaY * -0.001;
  scale = Math.min(Math.max(0.5, scale), 2);

  // Recalculate translate to keep mouse position stable
  translateX = mouseX - offsetX * scale;
  translateY = mouseY - offsetY * scale;

  updateTransform();
});



function updateTransform() {
  HSQ.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}













// // Start panning on left mouse down
// frame.addEventListener('mousedown', (event) => {
//   if (event.button !== 0) return;

//   isPanning = true;
//   startX = event.clientX;
//   startY = event.clientY;
//   frame.style.cursor = 'grabbing';
// });

// // Stop panning on mouse up
// document.addEventListener('mouseup', () => {
//   isPanning = false;
//   frame.style.cursor = 'default';
// });

// // Handle mouse drag
// window.addEventListener('mousemove', (event) => {
//   if (!isPanning) return;

//   const dx = event.clientX - startX;
//   const dy = event.clientY - startY;

//   startX = event.clientX;
//   startY = event.clientY;

//   translateX += dx;
//   translateY += dy;

//   updateTransform();
// });

// Apply translation + scale





// // Click-to-zoom on MacyS star
// macyStar.addEventListener('click', () => {
//   if (isZoomed) {
//     // Reset zoom and pan
//     scale = 1;
//     translateX = 0;
//     translateY = 0;
//     background.style.transition = 'transform 1s ease';
//     updateTransform();
//     isZoomed = false;
//   } else {
//     const starRect = macyStar.getBoundingClientRect();
//     const bgRect = background.getBoundingClientRect();

//     const offsetX = starRect.left - bgRect.left + starRect.width / 2;
//     const offsetY = starRect.top - bgRect.top + starRect.height / 2;

//     const centerX = 50+ window.innerWidth / 2;
//     const centerY = 50+ window.innerHeight / 2;

//     translateX = centerX - offsetX;
//     translateY = centerY - offsetY;
//     scale = 2.5;

//     background.style.transition = 'transform 1s ease';
//     updateTransform();
//     isZoomed = true;
//   }
// });
