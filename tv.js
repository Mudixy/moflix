// Données des chaînes TV (affiches externes)
const tvChannels = [
  {
    title: "Canal+",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/d/d2/Canal%2B_logo_2013.svg/800px-Canal%2B_logo_2013.svg.png",
    url: "https://example.com/player/canalplus"
  },
  {
    title: "Canal+ Sport",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f6/Canal%2B_Sport_logo_2013.svg/800px-Canal%2B_Sport_logo_2013.svg.png",
    url: "https://example.com/player/canalplus-sport"
  },
  {
    title: "Canal+ Sport 360",
    image: "https://upload.wikimedia.org/wikipedia/fr/1/11/C%2B_Sport_360.png",
    url: "https://play.frembed.site/api/player.php?id=5"
  },
  {
    title: "Canal+ Foot",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f0/Canal%2B_Foot_logo_2022.svg/800px-Canal%2B_Foot_logo_2022.svg.png",
    url: "https://example.com/player/canalplus-foot"
  },
  {
    title: "Eurosport 1",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0c/Eurosport_1_logo_2015.svg/800px-Eurosport_1_logo_2015.svg.png",
    url: "https://example.com/player/eurosport1"
  },
  {
    title: "Eurosport 2",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Eurosport_2_logo_2015.svg/800px-Eurosport_2_logo_2015.svg.png",
    url: "https://example.com/player/eurosport2"
  },
  {
    title: "RMC Sport 1",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/3/3e/RMC_Sport_1_logo_2016.svg/800px-RMC_Sport_1_logo_2016.svg.png",
    url: "https://example.com/player/rmc1"
  },
  {
    title: "RMC Sport 2",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/f/f2/RMC_Sport_2_logo_2016.svg/800px-RMC_Sport_2_logo_2016.svg.png",
    url: "https://example.com/player/rmc2"
  },
  {
    title: "RMC Sport 3",
    image: "https://upload.wikimedia.org/wikipedia/fr/thumb/8/8a/RMC_Sport_3_logo_2016.svg/800px-RMC_Sport_3_logo_2016.svg.png",
    url: "https://example.com/player/rmc3"
  }
];

function displayTvChannels() {
  const container = document.getElementById("tv-list");
  container.innerHTML = "";

  tvChannels.forEach(channel => {
    const card = document.createElement("a");
    card.classList.add("movie-card");
    card.href = `tv-view.html?title=${encodeURIComponent(channel.title)}&url=${encodeURIComponent(channel.url)}`;
    card.innerHTML = `
      <img src="${channel.image}" alt="${channel.title}">
      <h3>${channel.title}</h3>
    `;
    container.appendChild(card);
  });
}


// Fonction pour afficher les chaînes sur tv.html
function displayTvChannels() {
  const container = document.getElementById("tv-list");
  tvChannels.forEach(channel => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const link = document.createElement("a");
    link.href = `tv-view.html?title=${encodeURIComponent(channel.title)}&url=${encodeURIComponent(channel.url)}`;

    const img = document.createElement("img");
    img.src = channel.poster_url;
    img.alt = channel.title;
    img.className = "movie-poster"; // adapte la classe déjà en place

    const title = document.createElement("h3");
    title.textContent = channel.title;
    title.className = "movie-title";

    link.appendChild(img);
    link.appendChild(title);
    card.appendChild(link);
    container.appendChild(card);
  });
}

function fermerBandeau() {
    document.getElementById("bandeau").style.display = "none";
  }