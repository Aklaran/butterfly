'use client';
import Trick from '@/models/trick';
import React from 'react';

export default function ComboGenerator({ tricks }: { tricks: Trick[] }) {
	const [generatedCombo, setGeneratedCombo] = React.useState('');

	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setGeneratedCombo(generateCombo(tricks, 3));
	}

	return (
		<div className="wrapper">
			<form onSubmit={handleSubmit}>
				<textarea value={generatedCombo} readOnly></textarea>
				<button>Generate!</button>
			</form>
		</div>
	);
}

class ComboStep {
	constructor(
		public trick: string,
		public entryTransition: string,
		public exitStance: string
	) {}
}

function getRandomElement<T>(array: T[]): T {
	return array[(Math.random() * array.length) | 0];
}

function getRandomKey(dict: { [index: string]: string }): string {
	const keys = Object.keys(dict);
	return dict[keys[(keys.length * Math.random()) << 0]];
}

function generateCombo(tricks: Trick[], length: number): string {
	console.log(tricks);

	const combo: ComboStep[] = [];
	const randomTrick = getRandomElement(tricks);
	combo.push(
		new ComboStep(
			randomTrick.name,
			'start',
			getRandomElement(randomTrick.landingStances)
		)
	);

	console.log(combo);

	while (combo.length < length) {
		const lastLanding = combo[combo.length - 1].exitStance;
		console.log('lastlanding', lastLanding);

		const candidates = tricks.filter((trick) => {
			return Object.keys(trick.entryTransitions).includes(lastLanding);
		});

		console.log('candidates', candidates);

		const nextTrick = getRandomElement(candidates);
		combo.push(
			new ComboStep(
				nextTrick.name,
				nextTrick.entryTransitions[lastLanding],
				getRandomElement(nextTrick.landingStances)
			)
		);

		console.log(combo);
	}
}
