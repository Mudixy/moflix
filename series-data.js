// Catalogue de séries TV
const series = [
    { // Bref.
        id: 60715,
        title: "Bref.",
        year: 2011,
        creator: "Kyan Khojandi, Bruno Muschio",
        rating: 8.1,
        categories: ["comédie", "drame"],
        poster:
          "https://image.tmdb.org/t/p/original/alaRcixeZ1lLVb5NuvmJnAsfbyA.jpg",
        backdrop:
          "https://image.tmdb.org/t/p/original/fcIlUK2WJYyqI9AvDWDyYeElZyV.jpg",
        description:
          "Un trentenaire au chômage, obsédé par une fille rencontrée en soirée, fait part de ses états d'âme et de ses réflexions sur les problèmes du quotidien.",
        trailer: "https://www.youtube.com/embed/b9EkMc79ZSU",
        seasons: [
          {
            number: 2,
            year: 2025,
            episodes: [
                { 
                number: 1, 
                title: "Bref, tout redémarre.", 
                duration: "39 min", 
                description: "À la suite d’une discussion avec lui-même, « Je », âgé 40 ans, fait le choix de reprendre sa vie en main.", 
                thumbnail: "https://image.tmdb.org/t/p/original/n4Tvf8nPmPz9yQmvVN2MM8LOJcj.jpg", 
                videoUrl: "https://maxfinishseveral.com/e/yl45lahvnmhc", 
                }, 
                { 
                number: 2, 
                title: "Bref, c'était trop tard.", 
                duration: "33 min", 
                description: "Des nouveautés dans la vie de « Je » (travail, colocataire, rencontres), permettent que les choses soient mises en place.", 
                thumbnail: "https://image.tmdb.org/t/p/original/sIrZ7dj5Zsldx8nxH6ZDDRqgZPi.jpg", 
                videoUrl: "https://maxfinishseveral.com/e/jeuq5nusihri", 
                }, 
                { 
                number: 3, 
                title: "Bref, c'est une question de point de vue.", 
                duration: "33 min", 
                description: "Un bouleversement vient chambouler sa famille. Comme à l’accoutumée, il scrute les attitudes de tout le monde.", 
                thumbnail: "https://image.tmdb.org/t/p/original/wIKnVYbd68j77iOM2mlfeOPVhXk.jpg", 
                videoUrl: "https://maxfinishseveral.com/e/oihuwikwwztw", 
                },
                { 
                number: 4, 
                title: "Bref, tout va bien.", 
                duration: "32 min", 
                description: "Les nouvelles intentions sont bénéfiques. Mais il arrive des fois, que le temps écoulé vous rattrape.", 
                thumbnail: "https://image.tmdb.org/t/p/original/xDney1wTZZQUZNugGqC3TGiaIbi.jpg", 
                videoUrl: "https://maxfinishseveral.com/e/wiuay396vmqk", 
                },
                { 
                number: 5, 
                title: "Bref, c'était sous mes yeux depuis le début.", 
                duration: "41 min", 
                description: "Plus rien ne va, tout s’écroule. Et si tous les efforts, n’avaient aucune utilité ?", 
                thumbnail: "https://image.tmdb.org/t/p/original/qIINLYKAhzsdDe0w0BNNqODRnmD.jpg", 
                videoUrl: "https://vidply.com/e/mppic3izcpn8",
                },
                { 
                number: 6, 
                title: "Bref, c'est du sérieux ?", 
                duration: "40 min", 
                description: "Ce qui s’est passé la veille, interroge. Est-ce que c’était important ?", 
                thumbnail: "https://image.tmdb.org/t/p/original/w8nFtQd6v9oruMl3bpuQ8aY4ylu.jpg", 
                videoUrl: "https://vidply.com/e/6ztcuv618wiy",
                },
            ]
          },
        ],
        featured: false,
    },
  ]
  
  // Fonction pour obtenir une série par son ID
  function getSerieById(id) {
    return series.find((serie) => serie.id === Number(id))
  }
  
// Fonction de recherche pour les séries
function initSearch() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  
  if (searchInput && searchButton) {
    // Fonction de recherche
    const performSearch = () => {
      const query = searchInput.value.trim();
      if (query) {
        // Rediriger vers la page de recherche générale
        window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
      }
    };
    
    // Écouteur pour le bouton de recherche
    searchButton.addEventListener("click", performSearch);
    
    // Écouteur pour la touche Entrée
    searchInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        performSearch();
      }
    });
  }
}

// Initialiser la recherche au chargement de la page
document.addEventListener("DOMContentLoaded", initSearch);

// Initialiser la recherche au chargement de la page
document.addEventListener("DOMContentLoaded", initSeriesSearch);

  // Fonction pour obtenir des séries similaires
  function getSimilarSeries(serieId, limit = 4) {
    const serie = getSerieById(serieId)
    if (!serie) return []
  
    // Trouver des séries avec des catégories similaires
    const similarSeries = series.filter(
      (s) =>
        s.id !== serie.id && // Exclure la série actuelle
        s.categories.some((category) => serie.categories.includes(category)), // Au moins une catégorie en commun
    )
  
    // Trier par nombre de catégories en commun
    similarSeries.sort((a, b) => {
      const aCommonCategories = a.categories.filter((category) => serie.categories.includes(category)).length
      const bCommonCategories = b.categories.filter((category) => serie.categories.includes(category)).length
      return bCommonCategories - aCommonCategories
    })
  
    // Retourner les premiers 'limit' séries
    return similarSeries.slice(0, limit)
  }
  
  // Fonction pour obtenir toutes les séries
  function getAllSeries() {
    return series
  }
  
  // Fonction pour obtenir les séries à l'affiche
  function getFeaturedSeries() {
    return series.filter((serie) => serie.featured)
  }
  
  // Fonction pour obtenir des séries par catégorie
  function getSeriesByCategory(category) {
    return series.filter((serie) => serie.categories.includes(category))
  }
  
  // Fonction pour rechercher des séries
  function searchSeries(search) {
    return getAllSeries().filter((serie) => serie.title.toLowerCase().includes(search.toLowerCase()))
  }
  
  