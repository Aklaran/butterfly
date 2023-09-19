'use client';
import React from 'react';

import { UserTrickData } from '@/models/user-trick/user-trick';
import { TrickData } from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import generateCombos, { Combo } from '@/services/combo-generation-service';
import { DataTable } from '@/components/ui/data-table/data-table';
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

	const [numPossibleCombos, setNumPossibleCombos] = React.useState(0);
	const [generatedCombos, setGeneratedCombos] = React.useState<Combo[]>([]);
	const [targetLength, setTargetLength] = React.useState(3);

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const combos = generateCombos(annotatedTricks, targetLength);
		// TODO: inject interface ComboSelector
		const selector = new RandomComboSelector(combos);
		const selectedCombos = selector.take(5);

		if (combos.length === 0) {
			// TODO: Add error toast or dialog
			console.error(
				'Unable to generate any combos. Try reducing the length or adding more tricks!'
			);
		} else {
			setNumPossibleCombos(combos.length);
			setGeneratedCombos(selectedCombos);
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
				<h1 className='text-lg font-bold'>
					Combos (showing 5 of {numPossibleCombos} possible)
				</h1>
				<DataTable columns={columns} data={generatedCombos} />
			</div>
		</div>
	);
}

class RandomComboSelector {
	constructor(public combos: Combo[]) {}

	take(n: number) {
		const randomCombos: Combo[] = Array.from({ length: n }, () =>
			this.getRandomElement(this.combos)
		);
		return randomCombos;
	}

	private getRandomElement<T>(array: T[]): T {
		return array[(Math.random() * array.length) | 0];
	}
}
