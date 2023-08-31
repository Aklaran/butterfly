'use client';
import Link from 'next/link';
import React from 'react';

import UserTrickController from '@/controllers/user-trick-controller';
import Trick from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import { useQuery } from '@tanstack/react-query';

import TableItem from '../table-item/table-item';
import styles from './tricktionary.module.css';

interface TricktionaryProps {
	tricks: Trick[];
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const userTrickController = new UserTrickController();
	const annotationService = new TrickAnnotationService();

	const userTricksQuery = useQuery({
		queryKey: ['user-tricks'],
		queryFn: userTrickController.getAllUserTricks,
	});

	if (userTricksQuery.isLoading) {
		console.log('hold up usertricksquery is loading, chill');
		return <h1>loading...</h1>;
	}

	console.log(
		'finally, in Tricktionary, userTricks is:',
		userTricksQuery.data
	);

	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricksQuery.data
	);

	console.log('annotated tricks passed to view:', annotatedTricks);

	return (
		<div>
			<h1>THE BIG LIST</h1>
			<ul className={styles.wrapper}>
				{annotatedTricks.map((trick) => (
					<Link
						key={trick.trick.name}
						href={`/tricks/${trick.trick.name}`}
					>
						<TableItem
							label={trick.trick.name}
							isActive={trick.isActive()}
						/>
					</Link>
				))}
			</ul>
		</div>
	);
}
