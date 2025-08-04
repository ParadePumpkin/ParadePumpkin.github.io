// ---------------------
// PStar Rotation Logic
// ---------------------
const buttons = document.querySelectorAll('.button');
const pstar = document.getElementById('PStar');

buttons.forEach((button) => {
  button.addEventListener('mouseenter', () => {
    pstar.style.transform = 'rotate(32deg)';
  });

  button.addEventListener('mouseleave', () => {
    pstar.style.transform = 'rotate(64deg)';
  });
});

// ---------------------------
// Gallery Modal Interaction
// ---------------------------
const galleryItems = document.querySelectorAll('.gallery-item');
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modal-img');
const modalCaption = document.getElementById('modal-caption');
const closeBtn = document.getElementById('close-btn');

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.caption');

    modalImg.src = img.src;
    modalCaption.textContent = caption.textContent;

    modal.classList.remove('hidden');
  });
});

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
