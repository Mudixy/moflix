console.log("Le script est chargé !");

    // Fonction pour créer une carte de film
    function createMovieCard(movie) {
        return `
            <div class="movie-card">
                <div class="discount">${movie.discount}</div>
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                </div>
            </div>
        `;
    }

    // Gérer le menu de navigation responsive
    const navLinks = document.querySelector('.nav-links');
    const menuButton = document.createElement('button');
    menuButton.classList.add('menu-button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    if (window.innerWidth <= 768) {
        document.querySelector('nav').insertBefore(menuButton, navLinks);
        
        menuButton.addEventListener('click', () => {
            navLinks.classList.toggle('show');
        });
    }

    // Animation du header au scroll
    let lastScroll = 0;
    const header = document.querySelector('header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });

    document.addEventListener('DOMContentLoaded', function() {
        const searchInput = document.getElementById('searchInput');
        const movieCards = document.querySelectorAll('.movie-card');
    
        function searchMovies() {
            const searchTerm = searchInput.value.toLowerCase().trim();
    
            movieCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                
                // Si le titre contient le terme recherché, afficher la carte, sinon la cacher
                if (title.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }
    
        // Écouter l'événement input sur la barre de recherche
        searchInput.addEventListener('input', searchMovies);
    });