import React from 'react';
import Link from 'next/link';

import styles from './page.module.css';

export default async function Home() {
	const pages = [
		{
			label: 'Tricktionary',
			route: '/tricks',
		},
		{
			label: 'Combo Generator',
			route: '/combo-gen',
		},
		{
			label: 'What is this?',
			route: '/about',
		},
	];

	return (
		<div className={styles.wrapper}>
			<ul className={styles.navList}>
				{pages.map(({ label, route }) => (
					<li key={route} className={styles.navItem}>
						<Link href={route} className={styles.link}>
							{label}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
