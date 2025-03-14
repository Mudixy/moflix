  // Fonction pour obtenir les films à l'affiche
  function getFeaturedMovies() {
    return movies.filter(movie => movie.featured);
  }
  
  // Fonction pour obtenir tous les films
  function getAllMovies() {
    return movies;
  }
  
  // Fonction pour obtenir un film par son ID
  function getMovieById(id) {
    return movies.find(movie => movie.id === Number(id));
  }
  
  // Fonction pour obtenir des films par catégorie
  function getMoviesByCategory(category) {
    return movies.filter(movie => movie.categories.includes(category));
  }
  
  // Fonction pour obtenir des films par année
  function getMoviesByYear(year) {
    return movies.filter(movie => movie.year === Number(year));
  }
  
  // Fonction pour rechercher des films
  function searchMovies(query) {
    query = query.toLowerCase();
    return movies.filter(movie => 
      movie.title.toLowerCase().includes(query) || 
      movie.director.toLowerCase().includes(query) || 
      movie.categories.some(category => category.toLowerCase().includes(query))
    );
  }
  
  // Fonction pour obtenir des films similaires
  function getSimilarMovies(movieId, limit = 4) {
    const movie = getMovieById(movieId);
    if (!movie) return [];
  
    // Trouver des films avec des catégories similaires
    const similarMovies = movies.filter(m => 
      m.id !== movie.id && // Exclure le film actuel
      m.categories.some(category => movie.categories.includes(category)) // Au moins une catégorie en commun
    );
  
    // Trier par nombre de catégories en commun
    similarMovies.sort((a, b) => {
      const aCommonCategories = a.categories.filter(category => movie.categories.includes(category)).length;
      const bCommonCategories = b.categories.filter(category => movie.categories.includes(category)).length;
      return bCommonCategories - aCommonCategories;
    });
  
    // Retourner les premiers 'limit' films
    return similarMovies.slice(0, limit);
  }
  
  // Fonction pour obtenir toutes les années uniques
  function getAllYears() {
    const years = movies.map(movie => movie.year);
    return [...new Set(years)].sort((a, b) => b - a); // Trier par ordre décroissant
  }
  
  // Fonction pour obtenir toutes les catégories uniques
  function getAllCategories() {
    const categories = movies.flatMap(movie => movie.categories);
    return [...new Set(categories)].sort();
  }
  