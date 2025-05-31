// Attendre que le DOM soit chargé
document.addEventListener("DOMContentLoaded", () => {
    // Initialiser le mode sombre
    initDarkMode()
  
    // Initialiser le menu mobile
    initMobileMenu()
  
    // Initialiser la recherche
    initSearch()
  
    // Déterminer la page actuelle
    const currentPage = getCurrentPage()
  
    // Initialiser la page appropriée
    switch (currentPage) {
      case "index":
        initHomePage()
        break
      case "catalogue":
        initCataloguePage()
        break
      case "film":
        initMovieDetailPage()
        break
    }
  })
  
  // Fonction pour déterminer la page actuelle
  function getCurrentPage() {
    const path = window.location.pathname
    if (path.includes("catalogue.html")) {
      return "catalogue"
    } else if (path.includes("film.html")) {
      return "film"
    } else {
      return "index"
    }
  }
  
  // Fonction pour initialiser le mode sombre
  function initDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle")
    if (darkModeToggle) {
      // Vérifier si le mode sombre est activé dans le localStorage
      const isDarkMode = localStorage.getItem("darkMode") === "true"
      if (isDarkMode) {
        document.body.classList.add("dark-mode")
        const icon = darkModeToggle.querySelector("i")
        if (icon) {
          icon.className = "fas fa-sun"
        }
      }
  
      // Ajouter l'écouteur d'événement pour le toggle
      darkModeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode")
        const isDarkMode = document.body.classList.contains("dark-mode")
        localStorage.setItem("darkMode", isDarkMode)
  
        // Changer l'icône
        const icon = darkModeToggle.querySelector("i")
        if (icon) {
          icon.className = isDarkMode ? "fas fa-sun" : "fas fa-moon"
        }
      })
    }
  }
  
  // Fonction pour initialiser le menu mobile
  function initMobileMenu() {
    const menuToggle = document.querySelector(".menu-toggle")
    const navLinks = document.querySelector(".nav-links")
  
    if (menuToggle && navLinks) {
      menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active")
      })
    }
  }
  
  // Fonction pour initialiser la recherche
  function initSearch() {
    const searchInput = document.getElementById("searchInput")
    const searchButton = document.getElementById("searchButton")
  
    if (searchInput && searchButton) {
      // Fonction de recherche
      const performSearch = () => {
        const query = searchInput.value.trim()
        if (query) {
          window.location.href = `catalogue.html?search=${encodeURIComponent(query)}`
        }
      }
  
      // Écouteur pour le bouton de recherche
      searchButton.addEventListener("click", performSearch)
  
      // Écouteur pour la touche Entrée
      searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
          performSearch()
        }
      })
    }
  }
  
  // Fonction pour initialiser la page d'accueil
  function initHomePage() {
    // Afficher les films à l'affiche
    const featuredMoviesContainer = document.getElementById("featuredMovies")
    if (featuredMoviesContainer) {
      const featuredMovies = getFeaturedMovies()
      displayMovies(featuredMovies, featuredMoviesContainer)
    }
  
    // Ajouter des écouteurs d'événements pour les cartes de catégories
    const categoryCards = document.querySelectorAll(".category-card")
    categoryCards.forEach((card) => {
      card.addEventListener("click", function () {
        const category = this.dataset.category
        window.location.href = `catalogue.html?category=${category}`
      })
    })
  }
  
  // Fonction pour initialiser la page de catalogue
  function initCataloguePage() {
    // Récupérer les paramètres de l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const categoryParam = urlParams.get("category")
    const searchParam = urlParams.get("search")
    const yearParam = urlParams.get("year")
  
    // Mettre à jour les filtres
    updateFilters(categoryParam, yearParam)
  
    // Afficher les films filtrés
    displayFilteredMovies(categoryParam, searchParam, yearParam)
  
    // Ajouter des écouteurs d'événements pour les filtres
    const categoryFilter = document.getElementById("categoryFilter")
    const yearFilter = document.getElementById("yearFilter")
    const sortFilter = document.getElementById("sortFilter")
  
    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => {
        applyFilters()
      })
    }
  
    if (yearFilter) {
      yearFilter.addEventListener("change", () => {
        applyFilters()
      })
    }
  
    if (sortFilter) {
      sortFilter.addEventListener("change", () => {
        applyFilters()
      })
    }
  }
  
  // Fonction pour mettre à jour les filtres
  function updateFilters(category, year) {
    const categoryFilter = document.getElementById("categoryFilter")
    const yearFilter = document.getElementById("yearFilter")
  
    // Mettre à jour le filtre de catégorie
    if (categoryFilter) {
      // Obtenir toutes les catégories
      const categories = getAllCategories()
  
      // Vider le filtre de catégorie sauf la première option
      while (categoryFilter.options.length > 1) {
        categoryFilter.remove(1)
      }
  
      // Ajouter les catégories
      categories.forEach((cat) => {
        const option = document.createElement("option")
        option.value = cat
        option.textContent = cat.charAt(0).toUpperCase() + cat.slice(1)
        categoryFilter.appendChild(option)
      })
  
      // Mettre à jour la valeur sélectionnée
      if (category) {
        categoryFilter.value = category
      }
    }
  
    // Remplir et mettre à jour le filtre d'année
    if (yearFilter) {
      // Obtenir toutes les années
      const years = getAllYears()
  
      // Vider le filtre d'année sauf la première option
      while (yearFilter.options.length > 1) {
        yearFilter.remove(1)
      }
  
      // Ajouter les années
      years.forEach((y) => {
        const option = document.createElement("option")
        option.value = y
        option.textContent = y
        yearFilter.appendChild(option)
      })
  
      // Mettre à jour la valeur sélectionnée
      if (year) {
        yearFilter.value = year
      }
    }
  }
  
  // Fonction pour appliquer les filtres
  function applyFilters() {
    const categoryFilter = document.getElementById("categoryFilter")
    const yearFilter = document.getElementById("yearFilter")
    const sortFilter = document.getElementById("sortFilter")
  
    const category = categoryFilter ? categoryFilter.value : ""
    const year = yearFilter ? yearFilter.value : ""
    const sort = sortFilter ? sortFilter.value : ""
  
    // Construire l'URL avec les paramètres
    let url = "catalogue.html"
    const params = []
  
    if (category) {
      params.push(`category=${category}`)
    }
  
    if (year) {
      params.push(`year=${year}`)
    }
  
    if (sort) {
      params.push(`sort=${sort}`)
    }
  
    if (params.length > 0) {
      url += "?" + params.join("&")
    }
  
    // Rediriger vers l'URL avec les filtres
    window.location.href = url
  }
  
  // Fonction pour afficher les films filtrés
  function displayFilteredMovies(category, search, year) {
    const catalogueContainer = document.getElementById("movieCatalogue")
    if (!catalogueContainer) return
  
    let filteredMovies = getAllMovies()
  
    // Appliquer les filtres
    if (category) {
      filteredMovies = getMoviesByCategory(category)
    }
  
    if (search) {
      filteredMovies = searchMovies(search)
    }
  
    if (year) {
      filteredMovies = getMoviesByYear(Number(year))
    }
  
    // Appliquer le tri
    const sortFilter = document.getElementById("sortFilter")
    if (sortFilter) {
      const sortValue = sortFilter.value
  
      switch (sortValue) {
        case "title":
          filteredMovies.sort((a, b) => a.title.localeCompare(b.title))
          break
        case "year":
          filteredMovies.sort((a, b) => b.year - a.year)
          break
        case "rating":
          filteredMovies.sort((a, b) => b.rating - a.rating)
          break
      }
    }
  
    // Afficher les films
    displayMovies(filteredMovies, catalogueContainer)
  }
  
  // Fonction pour initialiser la page de détail du film
  function initMovieDetailPage() {
    // Récupérer l'ID du film depuis l'URL
    const urlParams = new URLSearchParams(window.location.search)
    const movieId = urlParams.get("id")
  
    if (!movieId) {
      // Rediriger vers la page de catalogue si aucun ID n'est fourni
      window.location.href = "catalogue.html"
      return
    }
  
    // Récupérer les détails du film
    const movie = getMovieById(movieId)
  
    if (!movie) {
      // Rediriger vers la page de catalogue si le film n'existe pas
      window.location.href = "catalogue.html"
      return
    }
  
    // Afficher les détails du film
    displayMovieDetails(movie)
  
    // Afficher les films similaires
    displaySimilarMovies(movie.id)
  }
  
  // Fonction pour afficher les détails d'un film
  function displayMovieDetails(movie) {
    const movieDetailContainer = document.getElementById("movieDetail")
    if (!movieDetailContainer) return
  
    // Mettre à jour le titre de la page
    document.title = `${movie.title} - CinéStream`
  
    // Créer le HTML pour les catégories
    const categoriesHTML = movie.categories
      .map((category) => `<span class="movie-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>`)
      .join("")
  
    movieDetailContainer.innerHTML = `
      <div class="movie-backdrop" style="background-image: url('${movie.backdrop}')">
        <div class="movie-poster-detail">
          <img src="${movie.poster}" alt="${movie.title}">
        </div>
      </div>
      <div class="movie-info-detail">
        <h1 class="movie-title-detail">${movie.title}</h1>
        <div class="movie-meta">
          <span>${movie.year}</span>
          <span>•</span>
          <span>${movie.duration}</span>
          <span>•</span>
          <span>Réalisé par ${movie.director}</span>
          <span>•</span>
          <div class="movie-rating-detail">
            <i class="fas fa-star"></i>
            <span>${movie.rating}/10</span>
          </div>
        </div>
        <div class="movie-categories">
          ${categoriesHTML}
        </div>
        <div class="movie-description">
          <p>${movie.description}</p>
        </div>
        <div class="movie-actions">
          <a href="#" class="watch-button" data-video="${movie.videoUrl}">
            <i class="fas fa-play"></i>
            Regarder
          </a>
          <a href="#" class="trailer-button" data-trailer="${movie.trailer}">
            <i class="fas fa-film"></i>
            Bande-annonce
          </a>
        </div>
      </div>
    `
  
    // Ajouter un écouteur d'événement pour le bouton de bande-annonce
    const trailerButton = movieDetailContainer.querySelector(".trailer-button")
    if (trailerButton) {
      trailerButton.addEventListener("click", function (e) {
        e.preventDefault()
        const trailerUrl = this.dataset.trailer
        openTrailer(trailerUrl)
      })
    }
  
    // Ajouter un écouteur d'événement pour le bouton de lecture
    const watchButton = movieDetailContainer.querySelector(".watch-button")
    if (watchButton) {
      watchButton.addEventListener("click", function (e) {
        e.preventDefault()
        const videoUrl = this.dataset.video
        openVideoPlayer(videoUrl)
      })
    }
  }
  
  // Fonction pour afficher les films similaires
  function displaySimilarMovies(movieId) {
    const relatedMoviesContainer = document.getElementById("relatedMovies")
    if (!relatedMoviesContainer) return
  
    const similarMovies = getSimilarMovies(movieId)
    displayMovies(similarMovies, relatedMoviesContainer)
  }
  
  // Fonction pour afficher les films dans un conteneur
  function displayMovies(movies, container) {
    // Vider le conteneur
    container.innerHTML = ""
  
    if (movies.length === 0) {
      container.innerHTML = '<div class="no-results">Aucun film trouvé</div>'
      return
    }
  
    // Créer une carte pour chaque film
    movies.forEach((movie) => {
      const movieCard = document.createElement("div")
      movieCard.className = "movie-card"
      movieCard.innerHTML = `
        <div class="movie-poster">
          <img src="${movie.poster}" alt="${movie.title}">
          <div class="movie-rating">${movie.rating}/10</div>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${movie.title}</h3>
          <p class="movie-year">${movie.year}</p>
        </div>
      `
  
      // Ajouter un écouteur d'événement pour rediriger vers la page HTML statique du film
      movieCard.addEventListener("click", () => {
        window.location.href = `film-${movie.id}.html`
      })
  
      container.appendChild(movieCard)
    })
  }
  
  // Fonction pour ouvrir la bande-annonce
  function openTrailer(trailerUrl) {
    // Créer un élément modal pour la bande-annonce
    const trailerModal = document.createElement("div")
    trailerModal.className = "trailer-modal"
    trailerModal.innerHTML = `
      <div class="close-trailer">&times;</div>
      <div class="trailer-container">
        <iframe src="${trailerUrl}" frameborder="0" allowfullscreen></iframe>
      </div>
    `
  
    // Ajouter le modal au body
    document.body.appendChild(trailerModal)
  
    // Afficher le modal
    setTimeout(() => {
      trailerModal.style.display = "flex"
    }, 100)
  
    // Ajouter un écouteur d'événement pour fermer le modal
    const closeButton = trailerModal.querySelector(".close-trailer")
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        trailerModal.style.display = "none"
        setTimeout(() => {
          trailerModal.remove()
        }, 300)
      })
    }
  
    // Fermer le modal en cliquant en dehors de la vidéo
    trailerModal.addEventListener("click", (e) => {
      if (e.target === trailerModal) {
        trailerModal.style.display = "none"
        setTimeout(() => {
          trailerModal.remove()
        }, 300)
      }
    })
  }
  
  // Fonction pour ouvrir le lecteur vidéo
  function openVideoPlayer(videoUrl) {
    // Créer un élément modal pour le lecteur vidéo
    const videoModal = document.createElement("div")
    videoModal.className = "video-modal"
    videoModal.innerHTML = `
      <div class="close-video">&times;</div>
      <div class="video-container">
        <iframe src="${videoUrl}" frameborder="0" allowfullscreen allow="autoplay; encrypted-media"></iframe>
      </div>
    `
  
    // Ajouter le modal au body
    document.body.appendChild(videoModal)
  
    // Afficher le modal
    setTimeout(() => {
      videoModal.style.display = "flex"
    }, 100)
  
    // Ajouter un écouteur d'événement pour fermer le modal
    const closeButton = videoModal.querySelector(".close-video")
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        videoModal.style.display = "none"
        setTimeout(() => {
          videoModal.remove()
        }, 300)
      })
    }
  
    // Fermer le modal en cliquant en dehors de la vidéo
    videoModal.addEventListener("click", (e) => {
      if (e.target === videoModal) {
        videoModal.style.display = "none"
        setTimeout(() => {
          videoModal.remove()
        }, 300)
      }
    })
  
    // Ajouter un écouteur d'événement pour la touche Échap
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && videoModal.style.display === "flex") {
        videoModal.style.display = "none"
        setTimeout(() => {
          videoModal.remove()
        }, 300)
      }
    })
  }
  
  // Mock data for demonstration purposes. Replace with actual data fetching.
  function getFeaturedMovies() {
    return [
      { id: "27205", title: "Inception", poster: "https://image.tmdb.org/t/p/original/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg", rating: 8.8, year: 2010 },
      { id: "706503", title: "Balle Perdue", poster: "https://image.tmdb.org/t/p/original/nrJg7CB2FW35qXgGY0spq6EqDjD.jpg", rating: 6.6, year: 2020 },
      { id: "948276", title: "Balle Perdue 2", poster: "https://image.tmdb.org/t/p/original/A84Usw0jwhh5RPAKZV7gwP532Fl.jpg", rating: 6.5, year: 2022 },
    ]
  }
  
  function getAllCategories() {
    return ["action", "animation", "aventure", "comédie", "crime", "documentaire", "drame", "familial", "romance", "science-fiction", "thriller"]
  }
  
  function getAllYears() {
    return ["2000", "2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022", "2023", "2024", "2025"]
  }
  
  function getAllMovies() {
    return [
      {
        id: "967582",
        title: "3 jours max",
        poster: "https://image.tmdb.org/t/p/original/qIExh8vD4d5EzkXTGtnZHY1cw0m.jpg",
        rating: 5.3,
        year: 2023,
        categories: ["action", "comédie"],
      },
      {
        id: "613377",
        title: "30 jours max",
        poster: "https://image.tmdb.org/t/p/original/okepE7ytt7bWyFdD77Et273sAtt.jpg",
        rating: 5.5,
        year: 2020,
        categories: ["action", "comédie"],
      },
      {
        id: "1261501",
        title: "Ad Vitam",
        poster: "https://image.tmdb.org/t/p/original/dOpSxmD3FWfl6SK8SLXw9uwcO05.jpg",
        rating: 6.3,
        year: 2025,
        categories: ["thriller", "crime", "drame", "action"],
      },
      {
        id: "915935",
        title: "Anatomie d'une chute",
        poster: "https://image.tmdb.org/t/p/original/vwpB79T0KGxqZSx0wormGC58OZB.jpg",
        rating: 7.5,
        year: 2023,
        categories: ["thriller", "crime", "mystère"],
      },
      {
        id: "706503",
        title: "Balle Perdue",
        poster: "https://image.tmdb.org/t/p/original/nrJg7CB2FW35qXgGY0spq6EqDjD.jpg",
        rating: 6.6,
        year: 2020,
        categories: ["action", "thriller", "crime"],
      },
      {
        id: "948276",
        title: "Balle Perdue 2",
        poster: "https://image.tmdb.org/t/p/original/A84Usw0jwhh5RPAKZV7gwP532Fl.jpg",
        rating: 6.5,
        year: 2022,
        categories: ["action", "thriller", "crime"],
      },
      {
        id: "13",
        title: "Forrest Gump",
        poster: "https://image.tmdb.org/t/p/original/A0Th0x8QIzP0njrFAJnYQ5ouIoB.jpg",
        rating: 8.5,
        year: 1994,
        categories: ["comédie", "drame", "romance"],
      },
      {
        id: "27205",
        title: "Inception",
        poster: "https://image.tmdb.org/t/p/original/aej3LRUga5rhgkmRP6XMFw3ejbl.jpg",
        rating: 8.8,
        year: 2010,
        categories: ["action", "science-fiction"],
      },
      {
        id: "77338",
        title: "Intouchables",
        poster: "https://image.tmdb.org/t/p/original/gdUJ6ECIHNE5M2HImGaBOfb8jR2.jpg",
        rating: 8.3,
        year: 2011,
        categories: ["comédie", "drame"],
      },
      {
        id: "1440406",
        title: "Inside TPMP : les coulisses du talk n°1",
        poster: "https://image.tmdb.org/t/p/original/o42ITCQS2ZDBoT3HIGXvBsD58Sd.jpg",
        rating: 0.0,
        year: 2025,
        categories: ["documentaire"],
      },
      {
        id: "959604",
        title: "L'Amour ouf",
        poster: "https://image.tmdb.org/t/p/original/1fiu6XuDYdCQ4rxhmxJ9shoyafQ.jpg",
        rating: 7.3,
        year: 2024,
        categories: ["romance", "crime", "drame"],
      },
      {
        id: "137106",
        title: "La Grande Aventure LEGO",
        poster: "https://image.tmdb.org/t/p/original/dMzloXrcyNgNY3YPquJpKTntbK.jpg",
        rating: 7.4,
        year: 2014,
        categories: ["comédie", "familial", "animation"],
      },
      {
        id: "280217",
        title: "La Grande Aventure LEGO 2",
        poster: "https://image.tmdb.org/t/p/original/d2d6a2eJGNMFxpkrXYpKY9MYH6T.jpg",
        rating: 6.7,
        year: 2019,
        categories: ["comédie", "familial", "animation"],
      },
      {
        id: "1084736",
        title: "Le Comte de Monte-Cristo",
        poster: "https://image.tmdb.org/t/p/original/g7kiprYdXxaYCZABWQwTWAgRYjl.jpg",
        rating: 8.0,
        year: 2024,
        categories: ["action", "aventure", "drame"],
      },
      {
        id: "1255788",
        title: "Le Jardinier",
        poster: "https://image.tmdb.org/t/p/original/qxqwLXgd4vjouSsxKXbGhQyjwoa.jpg",
        rating: 6.3,
        year: 2025,
        categories: ["action", "comédie"],
      },
      {
        id: "578",
        title: "Les Dents de la mer",
        poster: "https://image.tmdb.org/t/p/original/wuRf6gkX0JUJsu1MeECPubhMRdd.jpg",
        rating: 7.7,
        year: 1975,
        categories: ["horreur", "thriller", "aventure"],
      },
      {
        id: "1261622",
        title: "Lune de miel avec ma mère",
        poster: "https://image.tmdb.org/t/p/original/bzW0afBIyWZ0bjCje8GPezvETy0.jpg",
        rating: 5.5,
        year: 2025,
        categories: ["comédie"],
      },
      {
        id: "777443",
        title: "The Electric State",
        poster: "https://image.tmdb.org/t/p/original/1TZ9Er1xEAKizzKKqYVgJIhNkN2.jpg",
        rating: 7.4,
        year: 2025,
        categories: ["aventure", "drame", "science-fiction"],
      },
      {
        id: "44269",
        title: "Tout ce qui brille",
        poster: "https://image.tmdb.org/t/p/original/fzhdn6roB62p7AwkbisWxtysZSH.jpg",
        rating: 6.7,
        year: 2010,
        categories: ["comédie"],
      },
      {
        id: "1152014",
        title: "Un p'tit truc en plus",
        poster: "https://image.tmdb.org/t/p/original/uIlJ1wOlEt5K3NowJQDG4qscQAC.jpg",
        rating: 7.1,
        year: 2024,
        categories: ["comédie"],
      },
      {
        id: "277834",
        title: "Vaïana, la légende du bout du monde",
        poster: "https://image.tmdb.org/t/p/original/u9rrmuYW9jCmFn3zN0RX9vhzRKp.jpg",
        rating: 7.6,
        year: 2016,
        categories: ["aventure", "animation", "familial", "comédie"],
      },
      {
        id: "1241982",
        title: "Vaïana 2",
        poster: "https://image.tmdb.org/t/p/original/usdwoEwm68cdeMOvGFPwSk9nLTr.jpg",
        rating: 7.4,
        year: 2024,
        categories: ["aventure", "animation", "familial", "comédie"],
      },
    ]
  }
  
  function getMoviesByCategory(category) {
    return getAllMovies().filter((movie) => movie.categories.includes(category))
  }
  
  function searchMovies(search) {
    return getAllMovies().filter((movie) => movie.title.toLowerCase().includes(search.toLowerCase()))
  }
  
  function getMoviesByYear(year) {
    return getAllMovies().filter((movie) => movie.year === year)
  }
  
  function getMovieById(id) {
    return getAllMovies().find((movie) => movie.id === id)
  }
  
  function getSimilarMovies(movieId) {
    // In a real application, you would use the movie's categories or other metadata
    // to find similar movies.  For this example, we'll just return a few other movies.
    const allMovies = getAllMovies()
    return allMovies.filter((movie) => movie.id !== movieId).slice(0, 3)
  }  