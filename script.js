// Mode sombre/clair
const themeSwitcher = document.getElementById('themeSwitcher');
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

themeSwitcher.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Menu mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const nav = document.querySelector('.nav');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    nav.classList.toggle('active');
});

// Fermer le menu quand un lien est cliqué
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        nav.classList.remove('active');
    });
});

// Galerie photo avec chargement dynamique
const galleryGrid = document.querySelector('.gallery-grid');
const loadMoreBtn = document.getElementById('loadMore');
let currentPage = 1;

// Images disponibles
const allImages = [
    { src: './img 3.jpg', alt: 'Photo de culte' },
    { src: './img 4.jpg', alt: 'Communauté en prière' },
    { src: './img 5.jpg', alt: 'Bâtiment de l\'église' },
    { src: './img 6.jpg', alt: 'Activités jeunesse' },
    // Ajoutez d'autres images ici
];

async function loadGalleryImages(page = 1) {
    const IMAGES_PER_PAGE = 4;
    const startIdx = (page - 1) * IMAGES_PER_PAGE;
    const endIdx = startIdx + IMAGES_PER_PAGE;
    
    const imagesToShow = allImages.slice(startIdx, endIdx);

    if (page === 1) {
        galleryGrid.innerHTML = '';
    }

    imagesToShow.forEach(image => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${image.src}" alt="${image.alt}" loading="lazy">
        `;
        galleryGrid.appendChild(galleryItem);
    });

    loadMoreBtn.style.display = endIdx < allImages.length ? 'block' : 'none';
    currentPage = page;
}

loadMoreBtn.addEventListener('click', () => {
    loadGalleryImages(currentPage + 1);
});

// Chargement initial
loadGalleryImages();

// Formulaire de contact avec Formspree
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    
    try {
        // Utilisation de Formspree (remplacez par votre email)
        const response = await fetch('https://formspree.io/f/egliseadventistesichem75@gmail.com', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (response.ok) {
            alert('Merci pour votre message! Nous vous contacterons bientôt.');
            contactForm.reset();
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
    }
});

// Animation au défilement
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.section, .schedule-card, .gallery-item').forEach(el => {
    observer.observe(el);
});

// Correction des liens des réseaux sociaux
document.querySelector('[aria-label="YouTube"]').href = "https://youtube.com/@egliseadventistesichemdedelmas";