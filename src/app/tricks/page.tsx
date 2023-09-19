import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import { fetchAllTrickData } from '@/services/query-service';

export const dynamic = 'force-dynamic';

export default async function TricksList() {
	const tricks = await fetchAllTrickData();

	return <Tricktionary tricks={tricks} />;
}
