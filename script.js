const API_KEY = 'd29e79bb675e164fc1f28decd659e21c'; 
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;

const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');

async function fetchMovies(url) {
  const response = await fetch(url);
  const data = await response.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-card');
    movieEl.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Nota: ${movie.vote_average}</p>
      <a href="detalhes.html?id=${movie.id}">Ver detalhes</a>
    `;
    moviesContainer.appendChild(movieEl);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`)
    .then(res => res.json())
    .then(data => displayMovies(data.results));
});

fetchMovies(API_URL);