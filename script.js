document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const movieGrid = document.querySelector('.movie-grid');
    const movieCards = Array.from(document.querySelectorAll('.movie-card'));
  
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        
        // On filtre uniquement les cartes qui doivent être visibles
        const visibleCards = movieCards.filter(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            return title.includes(searchTerm);
        });
  
        // On vide la grille et on réinsère uniquement les cartes visibles
        movieGrid.innerHTML = ''; 
        visibleCards.forEach(card => movieGrid.appendChild(card));
    }
  
    searchInput.addEventListener('input', searchMovies);
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    function uniformiserHauteur() {
        const movieCards = document.querySelectorAll('.movie-card');
        let maxHeight = 0;
  
        // Réinitialiser la hauteur pour un recalcul propre
        movieCards.forEach(card => {
            card.style.height = 'auto';
        });
  
        // Trouver la hauteur maximale des cartes
        movieCards.forEach(card => {
            maxHeight = Math.max(maxHeight, card.offsetHeight);
        });
  
        // Appliquer la hauteur maximale trouvée
        movieCards.forEach(card => {
            card.style.height = maxHeight + 'px';
        });
    }
  
    function tronquerTitres() {
        const titles = document.querySelectorAll('.movie-card h3');
  
        titles.forEach(title => {
            const originalText = title.textContent;
            title.dataset.fullText = originalText; // Stocker le texte original
  
            if (title.scrollWidth > title.clientWidth) {
                let truncatedText = originalText;
  
                while (title.scrollWidth > title.clientWidth && truncatedText.length > 0) {
                    truncatedText = truncatedText.slice(0, -1);
                    title.textContent = truncatedText + '...';
                }
            }
  
            // Afficher le texte complet au survol
            title.addEventListener('mouseenter', function() {
                title.textContent = title.dataset.fullText;
            });
  
            title.addEventListener('mouseleave', function() {
                title.textContent = originalText.length > truncatedText.length ? truncatedText + '...' : originalText;
            });
        });
    }
  
    // Appliquer les ajustements au chargement et au redimensionnement
    uniformiserHauteur();
    tronquerTitres();
    window.addEventListener('resize', function() {
        uniformiserHauteur();
        tronquerTitres();
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const movieGrid = document.getElementById('movie-grid');

    // Les données des films, remplace-les par celles de ton choix
    const movies = [
        { title: '3 jours max', date: '25 oct. 2023', link: 'films/3joursmax.html', imgSrc: 'https://image.tmdb.org/t/p/original/qIExh8vD4d5EzkXTGtnZHY1cw0m.jpg' },
        { title: 'À fond', date: '11 nov. 2016', link: 'films/afond.html', imgSrc: 'https://image.tmdb.org/t/p/original/onCQ5IhUEFuantJuoJE2JtlPiAq.jpg' },
        { title: 'Ad Vitam', date: '10 jan. 2025', link: 'films/advitam.html', imgSrc: 'https://image.tmdb.org/t/p/original/dOpSxmD3FWfl6SK8SLXw9uwcO05.jpg' },
        { title: 'Balle Perdue', date: '19 jun. 2020', link: 'films/balleperdue.html', imgSrc: 'https://image.tmdb.org/t/p/original/nrJg7CB2FW35qXgGY0spq6EqDjD.jpg' },
        { title: 'Bref.', date: '2011 / 14 fév. 2025', link: 'series/bref.html', imgSrc: 'https://image.tmdb.org/t/p/original/alaRcixeZ1lLVb5NuvmJnAsfbyA.jpg' },
        { title: 'Inside TPMP', date: '26 fév. 2025', link: 'tv/insidetpmp.html', imgSrc: 'https://image.tmdb.org/t/p/original/o42ITCQS2ZDBoT3HIGXvBsD58Sd.jpg' },
        { title: 'L Amour Ouf', date: '16 oct. 2024', link: 'films/lamourouf.html', imgSrc: 'https://image.tmdb.org/t/p/original/ehp7uj7Y0afsVKtKVEZycv5oUYN.jpg' },
        { title: 'La 7ème compagnie au clair de lune', date: '7 déc. 1977', link: 'films/laseptiemecompagnieauclairdelune.html', imgSrc: 'https://image.tmdb.org/t/p/original/gltpQcyKr0xXg8bfcQy8gC02RSB.jpg' },
        { title: 'Lune de miel avec ma mère', date: '12 fév. 2025', link: 'films/lunedemielavecmamere.html', imgSrc: 'https://image.tmdb.org/t/p/original/bzW0afBIyWZ0bjCje8GPezvETy0.jpg' },
        { title: 'Mais où est donc passée la 7ème compagnie ?', date: '13 déc. 1973', link: 'films/maisouestdoncpasseelaseptiemecompagnie.html', imgSrc: 'https://image.tmdb.org/t/p/original/a2FADJYPqb7x3KDBxbDRwBsiHn4.jpg' },
        { title: 'TPMP ! Toute la vérité', date: '27 fév. 2025', link: 'tv/tpmp-tlv.html', imgSrc: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2/dbLHj43lGqow3tRnPvYnc5Xy6ao.jpg' },

    ];

    // Fonction pour créer et afficher les cartes
    function displayMovies(moviesList) {
        movieGrid.innerHTML = ''; // Vider la grille

        moviesList.forEach(movie => {
            const movieCard = document.createElement('a');
            movieCard.href = movie.link;

            const cardDiv = document.createElement('div');
            cardDiv.classList.add('movie-card');

            const posterDiv = document.createElement('div');
            posterDiv.classList.add('movie-poster');
            const img = document.createElement('img');
            img.src = movie.imgSrc;
            img.alt = movie.title;
            posterDiv.appendChild(img);

            const infoDiv = document.createElement('div');
            infoDiv.classList.add('movie-info');
            const h3 = document.createElement('h3');
            h3.textContent = movie.title;
            const p = document.createElement('p');
            p.classList.add('movie-date');
            p.textContent = movie.date;

            infoDiv.appendChild(h3);
            infoDiv.appendChild(p);

            cardDiv.appendChild(posterDiv);
            cardDiv.appendChild(infoDiv);
            movieCard.appendChild(cardDiv);

            movieGrid.appendChild(movieCard); // Ajouter la carte au DOM
        });
    }

    // Afficher les films au début
    displayMovies(movies);

    // Fonction de recherche
    function searchMovies() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTerm));
        displayMovies(filteredMovies); // Met à jour l'affichage des films
    }

    searchInput.addEventListener('input', searchMovies);
});





