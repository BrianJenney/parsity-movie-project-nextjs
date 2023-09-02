'use client';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export const Nav = () => {
	const renderLinks = () => {
		return (
			<>
				<li>
					<Link href='/signup'>Sign Up</Link>
				</li>
				<li>
					<Link href='/signin'>Sign In</Link>
				</li>
			</>
		);
	};

	return (
		<NavContainer>
			<div id='logo'>
				<Link href='/'>MovieFinder</Link>
			</div>
			<NavUl>{renderLinks()}</NavUl>
		</NavContainer>
	);
};

const NavContainer = styled.div`
	position: fixed;
	z-index: 999;
	background: hsl(0, 0%, 13%);
	color: whitesmoke;
	margin: 0;
	width: 100%;
	height: auto;
	padding: 1.5em;
	#logo {
		position: relative;
		float: left;
		width: 150px;
		height: auto;
	}
	a {
		color: #fff;
	}
`;

const NavUl = styled.ul`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	list-style: none;
	li:first-child {
		float: left;
	}
	li {
		margin-left: 0.8em;
		padding: 0.5em;
	}
	li a {
		color: whitesmoke;
	}
`;

const LinkButton = styled.button`
	background: none;
	border: none;
	cursor: pointer;
	color: whitesmoke;
	font-family: Oswald, sans-serif;
	font-size: 20px;
`;
