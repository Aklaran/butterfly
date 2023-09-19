'use client';
import React from 'react';

import { UserTrickData } from '@/models/user-trick/user-trick';
import { TrickData } from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import generateCombos, { Combo } from '@/services/combo-generation-service';
import { DataTable } from '@/app/combo-gen/data-table';
import { columns } from '@/app/combo-gen/columns';

export default function ComboGenerator({
	tricks,
	userTricks,
}: {
	tricks: TrickData[];
	userTricks: UserTrickData[] | null;
}) {
	const annotationService = new TrickAnnotationService();
	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricks
	);

	const [generatedCombos, setGeneratedCombos] = React.useState<Combo[]>([]);
	const [targetLength, setTargetLength] = React.useState(3);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const combos = generateCombos(annotatedTricks, targetLength);

		if (combos.length === 0) {
			// TODO: Add error toast or dialog
			console.error(
				'Unable to generate any combos. Try reducing the length or adding more tricks!'
			);
		} else {
			setGeneratedCombos(combos);
		}
	}

	return (
		<div>
			<div className='wrapper'>
				<form onSubmit={handleSubmit}>
					<button>Generate!</button>
				</form>
			</div>
			<div>
				<DataTable columns={columns} data={generatedCombos} />
			</div>
		</div>
	);
}
