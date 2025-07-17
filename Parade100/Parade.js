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
  scale = Math.min(Math.max(2, scale), 4);

  // Recalculate translate to keep mouse position stable
  translateX = mouseX - offsetX * scale;
  translateY = mouseY - offsetY * scale;

  updateTransform();
});



function updateTransform() {
  HSQ.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
}





// ---------------------------
// Modal Interaction for .Balloon elements
// ---------------------------
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.getElementById('close-btn');

const balloons = document.querySelectorAll('.Balloon');
balloons.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.balloon-text');
    openModal(img.src, caption.textContent);
  });
});

function openModal(src, text) {
  modalImg.src = src;
  modalCaption.textContent = text;
  modal.classList.remove('hidden');
}

closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  modalImg.src = '';
  modalCaption.textContent = '';
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
});





