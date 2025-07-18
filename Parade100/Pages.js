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






// ---------------------
//Wiki Editing
// ---------------------



const addBtn = document.getElementById('add-button');
const deleteBtn = document.getElementById('delete-button');
let selectedItem = null;

// Click to select an item (for deletion)
document.addEventListener('click', (e) => {
  const item = e.target.closest('.gallery-item');
  if (!item) return;

  if (selectedItem) {
    selectedItem.classList.remove('selected');
  }
  selectedItem = item;
  selectedItem.classList.add('selected');
});

// ADD: Create a new gallery item
addBtn.addEventListener('click', async () => {
  const newId = `item-${Date.now()}`; // unique ID based on timestamp
  const defaultCaption = "New Balloon";
  const defaultImage = "Contents/default.png"; // Replace with a real default image path

  // Save to Firestore
  await db.collection("gallery").doc(newId).set({
    caption: defaultCaption,
    imageUrl: defaultImage,
  });

  // Add to DOM
  const container = document.createElement('div');
  container.className = 'gallery-item';
  container.setAttribute('data-id', newId);

  const img = document.createElement('img');
  img.src = defaultImage;
  container.appendChild(img);

  const caption = document.createElement('div');
  caption.className = 'caption';
  caption.textContent = defaultCaption;
  container.appendChild(caption);

  container.addEventListener('click', () => {
    openEditModal(newId, defaultImage, defaultCaption);
  });

  document.getElementById('gallery-container').appendChild(container); // Make sure your gallery items are inside this container
});

// DELETE: Remove from DOM and Firestore
deleteBtn.addEventListener('click', async () => {
  if (!selectedItem) return;

  const id = selectedItem.getAttribute('data-id');

  // Remove from Firestore
  await db.collection("gallery").doc(id).delete();

  // Remove from DOM
  selectedItem.remove();
  selectedItem = null;
});





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
