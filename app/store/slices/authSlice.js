import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const isServer = typeof window === 'undefined';

// Async action creators using createAsyncThunk
export const signup = createAsyncThunk(
	'auth/signup',
	async (formProps, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${BASE_URL}/auth/signup`,
				formProps
			);

			!isServer && localStorage.setItem('token', response.data.token);
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
			!isServer && localStorage.setItem('token', response.data.token);
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
			!isServer && localStorage.setItem('token', response.data.token);
			return response.data;
		} catch (error) {
			return rejectWithValue(error);
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		authenticated: !isServer ? localStorage.getItem('token') : '',
		errorMessage: '',
		email: null,
	},
	reducers: {
		signout: (state) => {
			// TODO
			return state;
		},
	},
});

export const { signout } = authSlice.actions;

export default authSlice.reducer;
