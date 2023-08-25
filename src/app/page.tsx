import Trick from '@/models/trick/trick';
import TrickCard from '@/components/trick-card';
import React from 'react';
import { getTricks } from './api/tricks/route';
import ComboGenerator from '@/components/combo-generator/combo-generator';

export default async function Home() {
	const tricks = await getTricks();

	return (
		<div className="wrapper">
			<ul>
				{tricks.map((trick: Trick) => (
					<TrickCard key={trick._id.toString()} trick={trick} />
				))}
			</ul>
			<ComboGenerator tricks={tricks} />
		</div>
	);
}
