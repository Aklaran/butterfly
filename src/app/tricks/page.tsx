import React from 'react';

import TrickTableItem from '@/components/trick-table-item/trick-table-item';
import TrickController from '@/controllers/trick-controller';

import styles from './page.module.css';

export default async function Tricktionary() {
	const controller = new TrickController();

	const tricks = await controller.getAllTricks();

	return (
		<ul className={styles.wrapper}>
			{tricks.map((trick) => (
				<TrickTableItem trick={trick} key={trick.name} />
			))}
		</ul>
	);
}
