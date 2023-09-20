import React from 'react';

import Tricktionary from '@/components/tricktionary/tricktionary';
import {
	fetchAllTrickData,
	fetchAllUserTrickData,
} from '@/services/query-service';
import TrickAnnotationService from '@/services/trick-annotation-service';

export const dynamic = 'force-dynamic';

export default async function TricksList() {
	const tricks = await fetchAllTrickData();
	const userTricks = await fetchAllUserTrickData();
	const annotatedTricks = new TrickAnnotationService()
		.annotateTricks(tricks, userTricks)
		.map((at) => at.data);

	return <Tricktionary annotatedTrickData={annotatedTricks} />;
}
