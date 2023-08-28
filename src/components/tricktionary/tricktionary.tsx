'use client';
import React from 'react';

import Trick from '@/models/trick/trick';

import TrickTableItem from '../trick-table-item/trick-table-item';
import styles from './tricktionary.module.css';
import { useQuery } from '@tanstack/react-query';

interface TricktionaryProps {
	tricks: Trick[];
}

async function getTricks() {
	return fetch('http://localhost:3000/api/tricks').then((response) => {
		console.log('react queried some tricks');
		return response.json() as unknown as Trick[];
	});
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const tricksQuery = useQuery({
		queryKey: ['tricks'],
		queryFn: getTricks,
		initialData: tricks,
	});

	if (tricksQuery.isLoading) return <h1>loading...</h1>;
	if (tricksQuery.isError)
		return <pre>{JSON.stringify(tricksQuery.error)}</pre>;

	return (
		<ul className={styles.wrapper}>
			{tricksQuery.data.map((trick) => (
				<TrickTableItem trick={trick} key={trick.name} />
			))}
		</ul>
	);
}
