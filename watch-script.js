document.addEventListener('DOMContentLoaded', function() {
    // Données des films similaires
    const similarMovies = [
        {
            title: "Stunt Master",
            rating: 4.3,
            year: "2023",
            image: "placeholder.jpg"
        },
        {
            title: "Speed Chase",
            rating: 4.6,
            year: "2023",
            image: "placeholder.jpg"
        },
        {
            title: "The Last Jump",
            rating: 4.2,
            year: "2022",
            image: "placeholder.jpg"
        },
        {
            title: "Extreme Limits",
            rating: 4.7,
            year: "2023",
            image: "placeholder.jpg"
        }
    ];

    // Fonction pour créer une carte de film
    function createMovieCard(movie) {
        return `
            <div class="movie-card">
                <img src="${movie.image}" alt="${movie.title}">
                <div class="movie-info">
                    <h3>${movie.title}</h3>
                    <div class="movie-meta">
                        <div class="rating">
                            <i class="fas fa-star"></i>
                            <span>${movie.rating}</span>
                        </div>
                        <span class="year">${movie.year}</span>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialiser la section des films similaires
    const moviesGrid = document.querySelector('.movies-grid');
    if (moviesGrid) {
        moviesGrid.innerHTML = similarMovies.map(movie => createMovieCard(movie)).join('');
    }

    // Gestion du bouton like
    const likeButton = document.querySelector('.btn-like');
    if (likeButton) {
        likeButton.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            icon.classList.toggle('fas');
            icon.classList.toggle('far');
        });
    }

    // Gestion du bouton partage
    const shareButton = document.querySelector('.btn-share');
    if (shareButton) {
        shareButton.addEventListener('click', function() {
            // Créer l'URL à partager
            const shareUrl = window.location.href;
            
            // Vérifier si l'API de partage est disponible
            if (navigator.share) {
                navigator.share({
                    title: 'Thunder Stunt',
                    text: 'Check out this amazing movie!',
                    url: shareUrl
                })
                .catch(console.error);
            } else {
                // Fallback : copier l'URL dans le presse-papier
                navigator.clipboard.writeText(shareUrl)
                    .then(() => {
                        alert('Link copied to clipboard!');
                    })
                    .catch(console.error);
            }
        });
    }

    // Gestion de la qualité vidéo
    const videoIframe = document.querySelector('.video-container iframe');
    if (videoIframe) {
        // Ajouter des paramètres pour une meilleure qualité
        const currentSrc = videoIframe.src;
        if (currentSrc.includes('youtube')) {
            videoIframe.src = `${currentSrc}?rel=0&showinfo=0&controls=1&hd=1`;
        }
    }

    // Animation du scroll pour les sections
    function revealOnScroll() {
        const elements = document.querySelectorAll('.movie-card');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
});