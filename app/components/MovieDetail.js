'use client';
import React, { useEffect, Fragment } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useSpring, animated } from '@react-spring/web';
import { fetchMovie } from '../store/slices/moviesSlice';
import { useParams } from 'next/navigation';
import WatchListButton from '../components/WatchListButton';

const MovieDetail = ({ showAddToWatchList }) => {
	const springProps = useSpring({
		transform: 'scale(1)',
		from: { transform: 'scale(1)' },
		to: {
			transform: 'scale(1.06)',
		},
		reverse: true,
		config: { tension: 280, friction: 60 },
	});
	const { id } = useParams();
	const movie = useSelector((state) => state.movies.movie);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchMovie(id));
	}, [dispatch, id]);

	const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';
	const BACKDROP_PATH = 'http://image.tmdb.org/t/p/w1280';

	if (movie) {
		return (
			<Fragment>
				<BackdropContainer
					backdrop={`${BACKDROP_PATH}${movie.backdrop_path}`}
				/>
				<DetailInfo>
					<AnimatedPoster
						style={springProps}
						src={`${POSTER_PATH}${movie.poster_path}`}
						alt='poster'
					/>

					<div id='info'>
						<h1>{movie.title}</h1>
						<div id='infoAttr'>
							<p className='first'>{movie.release_date}</p>
							<p>
								{movie.vote_average}
								/10
							</p>
							{showAddToWatchList && (
								<WatchListButton movie={movie} />
							)}
						</div>
					</div>
				</DetailInfo>

				<Description>
					<p>{movie.overview}</p>
				</Description>
			</Fragment>
		);
	} else {
		return <h1>Loading...</h1>;
	}
};

export default MovieDetail;

const BackdropContainer = styled.div`
	position: relative;
	padding-top: 70vh;
	background: url(${({ backdrop }) => backdrop}) no-repeat;
	background-position: relative;
	object-fit: cover;
	justify-content: center;
	opacity: 0.8;
`;

const DetailInfo = styled.div`
	background: hsl(0, 0%, 93%);
	text-align: left;
	padding: 1.5em 1em 0 1em;
	display: flex;
	font-size: 1.2em;
	div#info {
		margin-left: 20px;
		width: 100%;
		height: 180px;
	}
	div#infoAttr {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		align-content: center;
		margin: 0.5em auto 1em 0;
		color: hsl(0, 100%, 59%);
		font-size: 0.7em;
	}
	div#infoAttr > p:not(.first) {
		display: inline-block;
		margin-left: 1.5em;
	}
	div#infoAttr > p:hover {
		color: hsl(0, 100%, 72%);
		cursor: pointer;
	}
	img {
		position: relative;
		top: -5rem;
	}
`;

const Description = styled.div`
	margin: 0 auto;
	padding: 1.3em;
	text-align: left;
	width: 100%;
	color: whitesmoke;
	background: black;
	text-shadow: 1px 1px black;
`;

const AnimatedPoster = styled(animated.img)`
	box-shadow: 0 0 30px white;
	object-fit: cover;
`;
