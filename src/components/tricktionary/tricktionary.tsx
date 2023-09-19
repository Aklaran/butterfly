import Link from 'next/link';
import React from 'react';

import Trick from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';

import TableItem from '../table-item/table-item';
import styles from './tricktionary.module.css';
import { fetchAllUserTricks } from '@/services/query-service';

// FIXME: Can I invalidate React Cache on a trick mutation instead?
// FIXME: Doesn't rerender when navigating to the page with the back button
export const dynamic = 'force-dynamic';

interface TricktionaryProps {
	tricks: Trick[];
}

export default async function Tricktionary({ tricks }: TricktionaryProps) {
	const annotationService = new TrickAnnotationService();

	const userTricks = await fetchAllUserTricks();

	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricks ?? null
	);

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
