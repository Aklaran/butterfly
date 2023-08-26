import React from 'react';

import Trick from '@/models/trick/trick';

import styles from './trick-table-item.module.css';

export default function TrickTableItem({
	trick,
	key,
}: {
	trick: Trick;
	key: string;
}) {
	return (
		<li key={key} className={styles.wrapper}>
			<p>{trick.name}</p>
			<input type='checkbox' />
		</li>
	);
}
