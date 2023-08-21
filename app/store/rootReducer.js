import { combineReducers } from 'redux';
import moviesReducer from './slices/moviesSlice';
import authReducer from './slices/authSlice';
import watchListReducer from './slices/watchListSlice';

const rootReducer = combineReducers({
	movies: moviesReducer,
	auth: authReducer,
	watchList: watchListReducer,
});

export default rootReducer;
