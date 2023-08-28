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

interface TricktionaryProps {
	tricks: Trick[];
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	const trickController = new TrickController();
	const userTrickController = new UserTrickController();

	const tricksQuery = useQuery({
		queryKey: ['tricks'],
		queryFn: trickController.getAllTricks,
		initialData: tricks,
	});

	//const userID = useUserID();

	// React.useEffect(() => {
	// 	console.log(userID);

	// 	// const userTricksQuery = useQuery({
	// 	// 	queryKey: ['user-tricks'],
	// 	// 	queryFn: userTrickController.getAllUserTricks,
	// 	// });
	// 	// console.log(`user tricks query gives: ${userTricksQuery.data}`);
	// }, []);

	return (
		<div>
			<ul className={styles.wrapper}>
				{tricksQuery.data.map((trick) => (
					<TrickTableItem trick={trick} key={trick.name} />
				))}
			</ul>
			{/* {userTricksQuery.data?.map((value) => (
				<p key={value.userID}>{value.userID}</p>
			))} */}
		</div>
	);
}
