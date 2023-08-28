'use client';
import React from 'react';

import Trick from '@/models/trick/trick';

import TrickTableItem from '../trick-table-item/trick-table-item';
import styles from './tricktionary.module.css';
import { useQuery } from '@tanstack/react-query';
import { useUserID } from '../providers/user-id-provider';
import UserTrick from '@/models/user-trick/user-trick';
import TrickController from '@/controllers/trick-controller';
import UserTrickController from '@/controllers/user-trick-controller';
import TrickAnnotationService from '@/services/trick-annotation-service';

interface TricktionaryProps {
	tricks: Trick[];
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const trickController = new TrickController();
	const userTrickController = new UserTrickController();
	const annotationService = new TrickAnnotationService();

	const tricksQuery = useQuery({
		queryKey: ['tricks'],
		queryFn: trickController.getAllTricks,
		initialData: tricks,
	});

	let annotatedTricks = annotationService.annotateTricks(tricks, undefined);

	// const userID = useUserID();

	const userTricksQuery = useQuery({
		queryKey: ['user-tricks'],
		queryFn: userTrickController.getAllUserTricks,
	});

	if (userTricksQuery.isLoading) {
		console.log('hold up usertricksquery is loading, chill');
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

	console.log(
		'finally, in Tricktionary, userTricks is:',
		userTricksQuery.data
	);

	annotatedTricks = annotationService.annotateTricks(
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
