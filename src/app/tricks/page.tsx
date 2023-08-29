import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import TrickController from '@/controllers/trick-controller';

export const dynamic = 'force-dynamic';

export default async function TricksList() {
	const controller = new TrickController();
	const tricks = await controller.getAllTricks();

	return <Tricktionary tricks={tricks} />;
}
