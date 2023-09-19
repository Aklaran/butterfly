import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import TrickStanceDetail from '@/components/trick-stance-detail/trick-stance-detail';

import { fetchTrick } from '@/services/query-service';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

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

	const session = await getServerSession(authOptions);

	return (
		<div>
			<h1>{trick.name}</h1>
			<p>Someday a description of the trick will live here</p>
			{session ? (
				<TrickStanceDetail baseTrick={trick} />
			) : (
				<Link href={'/api/auth/signin'}>
					Sign in to claim this trick!
				</Link>
			)}
		</div>
	);
}
