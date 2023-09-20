'use client';
import Link from 'next/link';
import React from 'react';

import { DataTable } from '../ui/data-table';
import { columns } from './columns';
import AnnotatedTrick, {
	AnnotatedTrickData,
} from '@/models/annotated-trick/annotated-trick';

// FIXME: Can I invalidate React Cache on a trick mutation instead?
// FIXME: Doesn't rerender when navigating to the page with the back button
export const dynamic = 'force-dynamic';

interface TricktionaryProps {
	annotatedTrickData: AnnotatedTrickData[];
}

export default function Tricktionary({
	annotatedTrickData,
}: TricktionaryProps) {
	const annotatedTricks = annotatedTrickData.map((data) =>
		AnnotatedTrick.fromData(data)
	);

	return (
		<div>
			<h1 className='font-bold text-lg p-2 text-center'>Tricks</h1>
			<DataTable columns={columns} data={annotatedTricks} />
		</div>
	);
}
