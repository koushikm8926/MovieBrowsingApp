import axios from 'axios';

// IMPORTANT: Replace this with a valid TMDB API Key if not using environment variables.
// Using the API Key provided by the user
const API_KEY = process.env.TMDB_API_KEY || '3f06ca16bb200606315e963bf2f1ef20';

const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});

export const fetchTrendingMovies = async () => {
  const response = await api.get('/trending/movie/day');
  return response.data.results;
};

export const fetchTopRatedMovies = async () => {
  const response = await api.get('/movie/top_rated');
  return response.data.results;
};

export const fetchUpcomingMovies = async () => {
  const response = await api.get('/movie/upcoming');
  return response.data.results;
};

export const searchMovies = async (query) => {
  const response = await api.get('/search/movie', {
    params: { query },
  });
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await api.get(`/movie/${movieId}`, {
    params: {
      append_to_response: 'videos',
    },
  });
  return response.data;
};

export default api;
