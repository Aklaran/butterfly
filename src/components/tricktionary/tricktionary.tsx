'use client';
import React from 'react';

import Trick from '@/models/trick/trick';

import TrickTableItem from '../trick-table-item/trick-table-item';
import styles from './tricktionary.module.css';
import { useQuery } from '@tanstack/react-query';
import { useUserID } from '../providers/user-id-provider';
import UserTrick from '@/models/user-trick/user-trick';

interface TricktionaryProps {
	tricks: Trick[];
}

async function getTricks() {
	return fetch(`${process.env.NEXT_PUBLIC_API_URL}/tricks`).then(
		(response) => {
			return response.json() as unknown as Trick[];
		}
	);
}

async function getUserTricks() {
	return fetch(`${process.env.NEXT_PUBLIC_API_URL}/user-tricks`).then(
		(response) => {
			console.log('react queried some USER tricks');

			return response.json() as unknown as UserTrick[];
		}
	);
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const tricksQuery = useQuery({
		queryKey: ['tricks'],
		queryFn: getTricks,
		initialData: tricks,
	});

	const userID = useUserID();
	console.log(userID);

	const userTricksQuery = useQuery({
		queryKey: ['user-tricks'],
		queryFn: getUserTricks,
	});
	console.log(`user tricks query gives: ${userTricksQuery.data}`);

	if (userTricksQuery.isLoading) return <h1>loading...</h1>;
	if (userTricksQuery.isError)
		return <pre>{JSON.stringify(tricksQuery.error)}</pre>;

	return (
		<div>
			<ul className={styles.wrapper}>
				{tricksQuery.data.map((trick) => (
					<TrickTableItem trick={trick} key={trick.name} />
				))}
			</ul>
			{userTricksQuery.data?.map((value) => (
				<p>{value.userID}</p>
			))}
		</div>
	);
}
