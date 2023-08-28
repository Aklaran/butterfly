import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import TrickController from '@/controllers/trick-controller';

export default async function TricksList() {
	const controller = new TrickController();
	const tricks = await controller.getAllTricks();
	console.log(tricks);

	return <Tricktionary tricks={tricks} />;
}
