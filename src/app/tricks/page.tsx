import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import { getTricks } from '../api/tricks/route';

export default async function TricksList() {
	const tricks = await getTricks();

	return <Tricktionary tricks={tricks} />;
}
