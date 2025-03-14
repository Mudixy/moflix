// Script pour générer les pages HTML statiques pour chaque film
// Exécutez ce script avec Node.js pour générer toutes les pages de films

const fs = require("fs")
const path = require("path")

// Charger les données des films
const moviesData = require("./data.js")
const movies = moviesData.getAllMovies()

// Lire le template
const template = fs.readFileSync("film-template.html", "utf8")

// Fonction pour générer une page HTML pour un film
function generateFilmPage(movie) {
  // Créer le contenu des catégories
  const categoriesHTML = movie.categories
    .map((category) => `<span class="movie-category">${category.charAt(0).toUpperCase() + category.slice(1)}</span>`)
    .join("\n              ")

  // Remplacer les placeholders dans le template
  const content = template
    .replace(/TITRE_DU_FILM/g, movie.title)
    .replace(/BACKDROP_URL/g, movie.backdrop)
    .replace(/POSTER_URL/g, movie.poster)
    .replace(/ANNEE_DU_FILM/g, movie.year)
    .replace(/DUREE_DU_FILM/g, movie.duration)
    .replace(/REALISATEUR_DU_FILM/g, movie.director)
    .replace(/NOTE_DU_FILM/g, movie.rating)
    .replace(/CATEGORIES_DU_FILM/g, categoriesHTML)
    .replace(/DESCRIPTION_DU_FILM/g, movie.description)
    .replace(/TRAILER_URL/g, movie.trailer)
    .replace(/VIDEO_URL/g, movie.videoUrl)
    .replace(/FILM_ID/g, movie.id)

  // Écrire le fichier HTML
  const filename = `film-${movie.title}.html`
  fs.writeFileSync(filename, content)
  console.log(`Page générée: ${filename}`)
}

// Générer une page pour chaque film
movies.forEach(generateFilmPage)
console.log("Toutes les pages de films ont été générées avec succès!")