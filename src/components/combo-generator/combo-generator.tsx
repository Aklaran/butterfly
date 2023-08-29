// 'use client';
// import React from 'react';

// import Trick from '@/models/trick/trick';

// export default function ComboGenerator({ tricks }: { tricks: Trick[] }) {
// 	const [generatedCombo, setGeneratedCombo] = React.useState('');

// 	function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
// 		e.preventDefault();
// 		setGeneratedCombo(generateCombo(tricks, 3));
// 	}

// 	return (
// 		<div className='wrapper'>
// 			<form onSubmit={handleSubmit}>
// 				<textarea value={generatedCombo} readOnly></textarea>
// 				<button>Generate!</button>
// 			</form>
// 		</div>
// 	);
// }

// class ComboStep {
// 	constructor(
// 		public trick: string,
// 		public entryTransition: string,
// 		public exitStance: string
// 	) {}
// }

// function getRandomElement<T>(array: T[]): T {
// 	return array[(Math.random() * array.length) | 0];
// }

// function generateCombo(tricks: Trick[], length: number): string {
// 	const combo: ComboStep[] = [];
// 	const randomTrick = getRandomElement(tricks);
// 	combo.push(
// 		new ComboStep(
// 			randomTrick.name,
// 			'start',
// 			getRandomElement(randomTrick.landingStances)
// 		)
// 	);

// 	while (combo.length < length) {
// 		const lastLanding = combo[combo.length - 1].exitStance;

// 		const candidates = tricks.filter((trick) => {
// 			return Object.keys(trick.entryTransitions).includes(lastLanding);
// 		});

// 		const nextTrick = getRandomElement(candidates);
// 		combo.push(
// 			new ComboStep(
// 				nextTrick.name,
// 				nextTrick.entryTransitions[lastLanding],
// 				getRandomElement(nextTrick.landingStances)
// 			)
// 		);

// 		console.log(combo);
// 	}

// 	let result = combo[0].trick + ' ' + combo[0].exitStance;
// 	for (let i = 1; i < combo.length; i++) {
// 		const step = combo[i];
// 		result +=
// 			' - ' +
// 			step.entryTransition +
// 			' ' +
// 			step.trick +
// 			' ' +
// 			step.exitStance;
// 	}

// 	return result;
// }
