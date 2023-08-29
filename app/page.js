'use client';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Movie from './components/Movie';
import { useSelector } from 'react-redux';

import useMovies from './hooks/useMovies';

export default function Home() {
	const { movies, getMovies } = useMovies();
	useEffect(() => {
		getMovies(1);
	}, []);

	const [page, setPage] = useState(1);
	const totalPages = useSelector((state) => state.movies.total_pages);

	return (
		<Container>
			<MovieGrid>
				{movies.map((mv) => {
					return (
						<Movie
							id={mv.id}
							key={mv.id}
							title={mv.title}
							img={mv.poster_path}
							url={`/${mv.id}`}
						/>
					);
				})}
			</MovieGrid>
		</Container>
	);
}

const MovieGrid = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	flex-wrap: wrap;
	padding: 2em;
	margin: 0 auto;
`;

const Container = styled.div`
	overflow-y: auto;
`;
