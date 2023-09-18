import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import TrickStanceDetail from '@/components/trick-stance-detail/trick-stance-detail';

import styles from './page.module.css';
import { fetchTrick } from '@/services/query-service';

interface TrickDetailPageProps {
	params: ParsedUrlQuery;
}

export default async function TrickDetailPage({
	params,
}: TrickDetailPageProps) {
	const { trickName } = params;

	if (typeof trickName !== 'string') {
		throw new Error(
			`TrickDetailPage received invalid URL parameter: ${trickName}`
		);
	}

	const trick = await fetchTrick(trickName);
	console.log(trick);

	if (trick == undefined) {
		throw new Error(`TrickDetailPage failed to fetch trick: ${trickName}`);
	}

	return (
		<div className={styles.wrapper}>
			<h1>{trick.name}</h1>
			<p>Someday a description of the trick will live here</p>
			<TrickStanceDetail baseTrick={trick} />
		</div>
	);
}
