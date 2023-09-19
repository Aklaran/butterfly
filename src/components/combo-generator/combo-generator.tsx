'use client';
import React from 'react';

import UserTrick from '@/models/user-trick/user-trick';
import Trick from '@/models/trick/trick';
import TrickAnnotationService from '@/services/trick-annotation-service';
import generateCombos from '@/services/combo-generation-service';

export default function ComboGenerator({
	tricks,
	userTricks,
}: {
	tricks: Trick[];
	userTricks: UserTrick[] | null;
}) {
	const annotationService = new TrickAnnotationService();
	const annotatedTricks = annotationService.annotateTricks(
		tricks,
		userTricks
	);

	const [generatedCombo, setGeneratedCombo] = React.useState('');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const combos = generateCombos(annotatedTricks, 3);

		if (combos.length === 0) {
			setGeneratedCombo(
				'Unable to generate any combos. Try reducing the length or adding more tricks!'
			);
		} else {
			setGeneratedCombo(combos[0].toString());
		}
	}

	return (
		<div className='wrapper'>
			<form onSubmit={handleSubmit}>
				<textarea value={generatedCombo} readOnly></textarea>
				<button>Generate!</button>
			</form>
		</div>
	);
}
