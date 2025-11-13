// JavaScript to render a Netflix-like grid of movies, include user-added movies from localStorage, and a search filter

const movies = [
  { title: "Inception", img: "https://m.media-amazon.com/images/I/51k0qa6z6QL._AC_.jpg", year: 2010 },
  { title: "Interstellar", img: "https://m.media-amazon.com/images/I/81gja7qQ0wL._AC_SL1500_.jpg", year: 2014 },
  { title: "The Dark Knight", img: "https://m.media-amazon.com/images/I/51EbJjlL2oL._AC_.jpg", year: 2008 },
  { title: "Joker", img: "https://m.media-amazon.com/images/I/71o8Q3v4GfL._AC_SL1188_.jpg", year: 2019 },
  { title: "The Matrix", img: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg", year: 1999 },
  { title: "Jurassic Park", img: "https://m.media-amazon.com/images/I/81r0d5GQEwL._AC_SL1500_.jpg", year: 1993 },
  { title: "Tenet", img: "https://m.media-amazon.com/images/I/71d1mJbQpGL._AC_SL1200_.jpg", year: 2020 },
  { title: "Mad Max: Fury Road", img: "https://m.media-amazon.com/images/I/81U3b3+2UrL._AC_SL1500_.jpg", year: 2015 },
  { title: "Titanic", img: "https://m.media-amazon.com/images/I/51a0c6wK88L._AC_.jpg", year: 1997 },
  { title: "Avengers: Endgame", img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_UF894,1000_QL80_.jpg", year: 2019 },
  { title: "Spider-Man: No Way Home", img: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg", year: 2021 },
  { title: "Batman Begins", img: "https://m.media-amazon.com/images/I/91KkWf50SoL._AC_UF894,1000_QL80_.jpg", year: 2005 }
];

// load any movies added via the secret add-movie page (stored in localStorage)
const USER_KEY = 'brglobal_user_movies';
const userMovies = (() => {
  try { return JSON.parse(localStorage.getItem(USER_KEY) || '[]'); } catch (e) { return []; }
})();

// Merge user-added movies first so newly added appear at top
const allMovies = [...userMovies, ...movies];

const container = document.getElementById('movieContainer');
const searchInput = document.getElementById('search');

function createCard(movie) {
  const card = document.createElement('div');
  card.className = 'movie-card';

  card.innerHTML = `
    <img src="${movie.img}" alt="${escapeHtml(movie.title)} poster">
    <div class="overlay">
      <div class="play-btn" title="Play"></div>
    </div>
    <div class="card-meta">
      <p class="title">${escapeHtml(movie.title)}</p>
      <p class="year">${movie.year || ''}</p>
    </div>
  `;

  // simple click to alert (placeholder for real player)
  card.addEventListener('click', () => {
    alert(`Now playing: ${movie.title}`);
  });

  return card;
}

function render(list) {
  if (!container) return;
  container.innerHTML = '';
  list.forEach(m => container.appendChild(createCard(m)));
}

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":"&#39;"})[s]);
}

// initial render (use combined list)
render(allMovies);

// search filter (searches the merged movie list)
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim().toLowerCase();
    if (!q) return render(allMovies);
    const filtered = allMovies.filter(m => (m.title || '').toLowerCase().includes(q));
    render(filtered);
  });
}

