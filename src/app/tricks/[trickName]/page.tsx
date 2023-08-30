import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import TrickController from '@/controllers/trick-controller';

import styles from './page.module.css';
import UserTrickController from '@/controllers/user-trick-controller';
import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import TableItem from '@/components/table-item/table-item';

interface TrickDetailPageProps {
	params: ParsedUrlQuery;
}

export default async function TrickDetailPage({
	params,
}: TrickDetailPageProps) {
	const trickController = new TrickController();
	const userTrickController = new UserTrickController();

	const { trickName } = params;

	if (typeof trickName !== 'string') {
		throw new Error(
			`TrickDetailPage received invalid URL parameter: ${trickName}`
		);
	}

	const trick = (await trickController.getAllTricks()).find((trick) => {
		return trick.name == trickName;
	});

	if (trick == undefined) {
		throw new Error(`TrickDetailPage failed to fetch trick: ${trickName}`);
	}

	const userTrick = (await userTrickController.getAllUserTricks()).find(
		(trick) => {
			return trick.trickName == trickName;
		}
	);

	const annotatedTrick = new AnnotatedTrick(trick, userTrick);

	return (
		<div className={styles.wrapper}>
			<h1>{annotatedTrick.trick.name}</h1>
			<h2>landing stances:</h2>
			<ul>
				{annotatedTrick.trick.landingStances.map((stance) => (
					<li key={stance}>
						<TableItem
							label={stance}
							isActive={annotatedTrick.isLandingStanceActive(
								stance
							)}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
