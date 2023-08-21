import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useSpring, animated } from '@react-spring/web';

const POSTER_PATH = 'http://image.tmdb.org/t/p/w185';

const Movie = ({ url, img, title }) => {
	const springProps = useSpring({
		transform: 'scale(1)',
		from: { transform: 'scale(1)' },
		to: {
			transform: 'scale(1.06)',
		},
		reverse: true,
		config: { tension: 280, friction: 60 },
	});

	return (
		<Link href={url}>
			<AnimatedPoster
				style={springProps}
				src={`${POSTER_PATH}${img}`}
				alt={title}
			/>
		</Link>
	);
};

export default Movie;

const AnimatedPoster = styled(animated.img)`
	box-shadow: 0 0 30px white;

	&:hover {
		transform: scale(1.06);
		transition-duration: 300ms;
	}
`;
