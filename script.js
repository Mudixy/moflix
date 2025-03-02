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



