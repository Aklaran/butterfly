import Trick from '@/models/trick';
import TrickCard from '@/components/trick-card';
import React from 'react';
import { getTricks } from './api/tricks/route';

export default async function Home() {
	const tricks = await getTricks();

	return (
		<ul>
			{tricks.map((trick: Trick) => (
				<TrickCard key={trick.id.toString()} trick={trick} />
			))}
		</ul>
	);
}
