const background = document.getElementById('background');
const HSQ = document.getElementById('HSQ');
const frame = document.getElementById('everything');
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
  }, 2000); // Match transition time
}

// Trigger hide on first click
document.getElementById('startup').addEventListener('click', hideStartup);

setTimeout(hideStartup, 3000);


// ---------------------------
//Scroll and Zoom Behavior
// ---------------------------


frame.addEventListener('wheel', function (e) {
  if (e.ctrlKey) {
    e.preventDefault(); // Prevent browser zoom

    const zoomFactor = 0.1;
    if (e.deltaY < 0) {
      scale += zoomFactor;
    } else {
      scale = Math.max(0.5, scale - zoomFactor); // Prevent negative scaling
    }

    frame.style.transform = `scale(${scale})`;
    frame.style.transformOrigin = '0 0';
  }
}, { passive: false });



// ---------------------------
// Modal Interaction for .Balloon and .Event elements
// ---------------------------
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.getElementById('close-btn');

const balloons = document.querySelectorAll('.Balloon');
const events = document.querySelectorAll('.Event');

function openModal(src, text) {
  modalImg.src = src;
  modalCaption.textContent = text;
  modal.classList.remove('hidden');
}

// Handle .Balloon clicks
balloons.forEach(item => {
  item.addEventListener('click', () => {
    const startup = document.getElementById('startup');
    if (startup && startup.style.display !== 'none') return; // Prevent click if startup is visible

    const img = item.querySelector('img');
    const caption = item.querySelector('.balloon-text');
    openModal(img.src, caption.textContent);
  });
});

// Handle .Event clicks
events.forEach(item => {
  item.addEventListener('click', () => {
    const startup = document.getElementById('startup');
    if (startup && startup.style.display !== 'none') return;

    const img = item.querySelector('img');
    const caption = item.querySelector('.Event-text');
    openModal(img.src, caption.textContent);
  });
});


// Close modal on close button click
closeBtn.addEventListener('click', () => {
  modal.classList.add('hidden');
  modalImg.src = '';
  modalCaption.textContent = '';
});

// Close modal on outside click
modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeBtn.click();
  }
});





