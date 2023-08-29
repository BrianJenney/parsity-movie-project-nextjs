import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_KEY = '123456';

// Async thunks
export const fetchMovies = createAsyncThunk(
	'movies/fetchMovies',
	async (page = 1) => {
		const response = await axios.get(
			`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
		);
		return response.data;
	}
);

export const fetchMovie = createAsyncThunk('movies/fetchMovie', async (id) => {
	const response = await axios.get(
		`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&include_adult=false&include_video=false`
	);
	return response.data;
});

const moviesSlice = createSlice({
	name: 'movies',
	initialState: {
		movies: [],
		movie: {},
		user: null,
		status: 'idle',
		error: null,
	},
	reducers: {
		// Synchronous actions if needed
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchMovie.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovie.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.movie = action.payload;
			})
			.addCase(fetchMovie.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(fetchMovies.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchMovies.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.movies = [...state.movies, ...action.payload.results];
			})
			.addCase(fetchMovies.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default moviesSlice.reducer;
