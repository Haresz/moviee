import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apikey = '77d81048';
const url = `http://www.omdbapi.com/?apikey=${apikey}`;

const genres = [
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Sci-Fi',
  'Sport',
  'Thriller',
  'War',
  'Western',
];

// Thunk to fetch movies by genre
export const fetchMoviesByGenre = createAsyncThunk(
  'movies/fetchMoviesByGenre',
  async (_, { rejectWithValue }) => {
    try {
      const moviesByGenre = {};
      for (const genre of genres) {
        const { data } = await axios.get(url, {
          params: { s: genre, type: 'movie', y: 2024, r: 'json' },
        });

        if (data.Response === 'True') {
          const movieDetails = await Promise.all(
            data.Search.map(async (movie) => {
              const response = await axios.get(url, {
                params: { i: movie.imdbID, plot: 'short' },
              });

              if (response.data.Response === 'True') {
                return response.data;
              }
              return null;
            }),
          );
          moviesByGenre[genre] = movieDetails.filter((movie) => movie !== null);
        } else {
          console.error(`Error for genre ${genre}: ${data.Error}`);
        }
      }
      return moviesByGenre;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

// Slice for managing movies state
const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: {},
    loading: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMoviesByGenre.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.movies = action.payload;
        state.loading = false;
      })
      .addCase(fetchMoviesByGenre.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default moviesSlice.reducer;
