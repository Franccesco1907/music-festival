document.addEventListener('DOMContentLoaded', () => { 
    initApp();
});

function initApp() {
  createGallery();
}

function createGallery() {
  const gallery = document.querySelector('.gallery-images');
  
  for (let i = 1; i <= 12; i++) {
    const image = document.createElement('picture')
    image.innerHTML = `
      <source srcset="build/img/thumb/${i}.avif" type="image/avif">
      <source srcset="build/img/thumb/${i}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galería ${i}">
    `;
    image.onclick = () => {
      showImage(i)
    }
    gallery.appendChild(image);
  }

}

function showImage(id) {
  const image = document.createElement('picture');
  image.innerHTML = `
      <source srcset="build/img/grande/${id}.avif" type="image/avif">
      <source srcset="build/img/grande/${id}.webp" type="image/webp">
      <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galería ${id}">
  `;
  // Crea el Overlay con la imagen
  const overlay = document.createElement('div');
  overlay.appendChild(image);
  overlay.classList.add('overlay');
  overlay.onclick = () => {
    const body = document.querySelector('body');
    body.classList.remove('no-scroll');
    overlay.remove();
  }

  // Botón para cerrar el Modal
  const closeModal = document.createElement('p');
  closeModal.textContent = 'X';
  closeModal.classList.add('btn-close');
  closeModal.onclick = () => {
    const body = document.querySelector('body');
    body.classList.remove('no-scroll');
    overlay.remove();
  }
  overlay.appendChild(closeModal);

  // Añade el Overlay al HTML
  const body = document.querySelector('body');
  body.appendChild(overlay);
  body.classList.add('no-scroll')
}