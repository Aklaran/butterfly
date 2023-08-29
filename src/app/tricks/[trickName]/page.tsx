// import { ParsedUrlQuery } from 'querystring';
// import React from 'react';

// import TrickController from '@/controllers/trick-controller';

// import styles from './page.module.css';

// interface TrickDetailPageProps {
// 	params: ParsedUrlQuery;
// }

// export default async function TrickDetailPage({
// 	params,
// }: TrickDetailPageProps) {
// 	const controller = new TrickController();

// 	const { trickName } = params;

// 	if (typeof trickName !== 'string') {
// 		throw new Error(
// 			`TrickDetailPage received invalid URL parameter: ${trickName}`
// 		);
// 	}
// 	const trick = await controller.getTrick(trickName);

// 	return (
// 		<div className={styles.wrapper}>
// 			<h1>{trick.name}</h1>
// 			<h2>landing stances:</h2>
// 			<ul>
// 				{trick.landingStances.map((stance) => (
// 					<li key={stance}>{stance}</li>
// 				))}
// 			</ul>
// 		</div>
// 	);
// }
