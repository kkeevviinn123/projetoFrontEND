// Define a chave da API para autenticação nas requisições
const API_KEY = 'd29e79bb675e164fc1f28decd659e21c';

// Monta a URL padrão para buscar os filmes em cartaz
const API_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=pt-BR&page=1`;

// Referências aos elementos HTML onde os filmes serão exibidos e onde ocorre a busca
const moviesContainer = document.getElementById('moviesContainer');
const searchInput = document.getElementById('searchInput');

// Função assíncrona que faz a requisição para a API e exibe os filmes
async function fetchMovies(url) {
  const response = await fetch(url);              // Faz a requisição à URL informada
  const data = await response.json();             // Converte a resposta para JSON
  displayMovies(data.results);                    // Exibe os filmes na tela
}

// Função que recebe a lista de filmes e monta os cards dinamicamente
function displayMovies(movies) {
  moviesContainer.innerHTML = ''; // Limpa o conteúdo anterior
  movies.forEach(movie => {
    const movieEl = document.createElement('div');     // Cria um div para cada filme
    movieEl.classList.add('movie-card');               // Adiciona a classe CSS ao card
    movieEl.innerHTML = `                             
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>Nota: ${movie.vote_average}</p>
      <a href="detalhes.html?id=${movie.id}">Ver detalhes</a> <!-- Link para a página de detalhes -->
    `;
    moviesContainer.appendChild(movieEl); // Adiciona o card ao container principal
  });
}

// Evento de busca em tempo real: dispara quando o usuário digita no campo de busca
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase(); // Captura o texto digitado
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&language=pt-BR`)
    .then(res => res.json())                    // Converte a resposta para JSON
    .then(data => displayMovies(data.results)); // Atualiza a lista com os resultados da busca
});

// Ao carregar a página, exibe os filmes em cartaz por padrão
fetchMovies(API_URL);
