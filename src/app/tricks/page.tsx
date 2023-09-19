import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import { fetchAllTricks } from '@/services/query-service';

export const dynamic = 'force-dynamic';

export default async function TricksList() {
	const tricks = await fetchAllTricks();

	if (tricks === null) {
		return 'Uh oh, there are no tricks...';
	}

	return <Tricktionary tricks={tricks} />;
}
