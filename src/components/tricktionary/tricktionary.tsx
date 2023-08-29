'use client';
import React from 'react';

import Trick from '@/models/trick/trick';

import TrickTableItem from '../trick-table-item/trick-table-item';
import styles from './tricktionary.module.css';
import { useQuery } from '@tanstack/react-query';
import UserTrickController from '@/controllers/user-trick-controller';
import TrickAnnotationService from '@/services/trick-annotation-service';

interface TricktionaryProps {
	tricks: Trick[];
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const userTrickController = new UserTrickController();
	const annotationService = new TrickAnnotationService();

	// const userID = useUserID();

	const userTricksQuery = useQuery({
		queryKey: ['fooquerykee'],
		queryFn: userTrickController.getAllUserTricks,
	});

	if (userTricksQuery.isLoading) {
		console.log('hold up usertricksquery is loading, chill');
		return <div>loading...</div>;
	}

	console.log(
		'finally, in Tricktionary, userTricks is:',
		userTricksQuery.data
	);

	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricksQuery.data
	);

	return (
		<div>
			<ul className={styles.wrapper}>
				{annotatedTricks.map((trick) => (
					<TrickTableItem trick={trick} key={trick.name} />
				))}
			</ul>
		</div>
	);
}
