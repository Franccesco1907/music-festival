document.addEventListener('DOMContentLoaded', () => { 
    initApp();
});

function initApp() {
  fixedNavigation();
  createGallery();
  scrollNav();
}

function fixedNavigation() {
  const bar = document.querySelector('.header');
  const aboutFestival = document.querySelector('.about-festival');
  const body = document.querySelector('body');
  window.addEventListener('scroll', () => {
    if ( aboutFestival.getBoundingClientRect().bottom < 0 ) {
      bar.classList.add('fixed');
      body.classList.add('body-scroll');
    } else {
      bar.classList.remove('fixed');
      body.classList.remove('body-scroll');
    }
  });
}

function scrollNav() {
  const links = document.querySelectorAll('.navigation-main a');
  links.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const sectionScroll = e.target.attributes.href.value;
      const section = document.querySelector(sectionScroll);
      section.scrollIntoView({
        behavior: 'smooth'
      });
    });
  })
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