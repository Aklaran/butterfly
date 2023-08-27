import React from 'react';

import Trick from '@/models/trick/trick';

import TrickTableItem from '../trick-table-item/trick-table-item';
import styles from './tricktionary.module.css';
import { useQuery } from '@tanstack/react-query';

interface TricktionaryProps {
	tricks: Trick[];
}

export default function Tricktionary({ tricks }: TricktionaryProps) {
	// const { data } = useQuery({
	// 	queryKey: ['tricks'],
	// 	queryFn: controller.getAllTricks,
	// 	initialData: tricks,
	// });

	return (
		<ul className={styles.wrapper}>
			{tricks.map((trick) => (
				<TrickTableItem trick={trick} key={trick.name} />
			))}
		</ul>
	);
}
