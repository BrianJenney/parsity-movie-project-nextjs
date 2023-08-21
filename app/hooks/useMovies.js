import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies } from '../store/slices/moviesSlice';

const useMovies = () => {
	const dispatch = useDispatch();

	return {
		movies: useSelector((state) => state.movies.movies),
		getMovies: (page) => dispatch(fetchMovies(page)),
	};
};

export default useMovies;
