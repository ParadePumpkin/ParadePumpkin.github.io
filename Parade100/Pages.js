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




// Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const modal = document.getElementById('modal');
const captionInput = document.getElementById('caption-edit');
let currentId = null;

function openModal(id, currentCaption) {
  currentId = id;
  captionInput.value = currentCaption;
  modal.classList.add('visible');
}

function closeModal() {
  modal.classList.remove('visible');
}

async function saveCaption() {
  if (!currentId) return;
  const newCaption = captionInput.value;
  await db.collection("gallery").doc(currentId).set({ caption: newCaption });
  document.querySelector(`.Balloon[data-id='${currentId}'] .caption`).textContent = newCaption;
  closeModal();
}

async function loadCaptions() {
  const balloons = document.querySelectorAll('.Balloon');
  for (const balloon of balloons) {
    const id = balloon.getAttribute('data-id');
    const captionEl = balloon.querySelector('.caption');
    const doc = await db.collection("gallery").doc(id).get();
    if (doc.exists) {
      captionEl.textContent = doc.data().caption;
    } else {
      captionEl.textContent = "Click to edit";
    }

    balloon.onclick = () => openModal(id, captionEl.textContent);
  }
}

document.addEventListener('DOMContentLoaded', loadCaptions);












// // ---------------------------
// // Gallery Modal Interaction
// // ---------------------------
// const galleryItems = document.querySelectorAll('.gallery-item');
// const modal = document.getElementById('modal');
// const modalImg = document.getElementById('modal-img');
// const modalCaption = document.getElementById('modal-caption');
// const closeBtn = document.getElementById('close-btn');

// galleryItems.forEach(item => {
//   item.addEventListener('click', () => {
//     const img = item.querySelector('img');
//     const caption = item.querySelector('.caption');

//     modalImg.src = img.src;
//     modalCaption.textContent = caption.textContent;

//     modal.classList.remove('hidden');
//   });
// });

// closeBtn.addEventListener('click', () => {
//   modal.classList.add('hidden');
//   modalImg.src = '';
//   modalCaption.textContent = '';
// });

// modal.addEventListener('click', (e) => {
//   if (e.target === modal) {
//     closeBtn.click();
//   }
// });
