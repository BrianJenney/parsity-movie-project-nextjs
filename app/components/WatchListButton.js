'use client';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMovieToWatchList } from '../store/slices/watchListSlice';

const WatchListButton = ({ movie }) => {
	const dispatch = useDispatch();
	const authenticated = useSelector((state) => state.auth.authenticated);

	if (authenticated) {
		return (
			<button onClick={() => dispatch(addMovieToWatchList(movie))}>
				Add to Watchlist
			</button>
		);
	} else {
		return null;
	}
};

export default WatchListButton;
