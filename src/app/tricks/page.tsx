import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import Trick from '@/models/trick/trick';

async function getTricks() {
	return fetch(`${process.env.API_URL}/tricks`).then((response) => {
		return response.json() as unknown as Trick[];
	});
}

export default async function TricksList() {
	const tricks = await getTricks();
	console.log(tricks);

	return <Tricktionary tricks={tricks} />;
}
