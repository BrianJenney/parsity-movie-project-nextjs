'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

// Async action creators using createAsyncThunk
export const signup = createAsyncThunk(
	'auth/signup',
	async (formProps, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/auth/signup`,
				formProps
			);
			window.localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const signin = createAsyncThunk(
	'auth/signin',
	async (formProps, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/auth/signin`,
				formProps
			);
			window.localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

export const fetchUser = createAsyncThunk(
	'auth/fetchUser',
	async (_, { rejectWithValue }) => {
		const config = {
			headers: {
				Authorization: 'Bearer ' + window.localStorage.getItem('token'),
			},
		};
		try {
			const response = await axios.get(
				`${BASE_URL}/auth/current_user`,
				config
			);
			window.localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authenticated: window.localStorage.getItem('token') || '',
		errorMessage: '',
		email: null,
	},
	reducers: {
		signout: (state) => {
			window.localStorage.removeItem('token');
			state.authenticated = '';
			state.email = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(signup.fulfilled, (state, action) => {
				state.authenticated = action.payload.token;
				state.email = action.payload.email || null;
			})
			.addCase(signup.rejected, (state, action) => {
				state.errorMessage = action.payload;
			})
			.addCase(signin.fulfilled, (state, action) => {
				state.authenticated = action.payload.token;
				state.email = action.payload.email || null;
			})
			.addCase(signin.rejected, (state, action) => {
				state.errorMessage = action.payload;
			})
			.addCase(fetchUser.fulfilled, (state, action) => {
				state.authenticated = action.payload.token;
				state.email = action.payload.email || null;
			});
	},
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
