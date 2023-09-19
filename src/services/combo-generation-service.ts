import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';

export default function generateCombos(
	tricks: AnnotatedTrick[],
	targetLength: number
) {
	const activeTricks = tricks.filter((t) => t.isActive());
	const combos: Combo[] = [];

	// TODO: Don't use ! for all UserTricks here
	for (const trick of activeTricks) {
		for (const landingStance of trick.userTrick!.landingStances) {
			const firstStep = new ComboStep(trick.name, 'start', landingStance);
			const combo = new Combo([firstStep]);
			buildCombo(combo, combos, activeTricks, 1, targetLength);
		}
	}

	console.log(
		`Successfully generated ${combos.length} combos!`,
		combos.map((c) => c.toString())
	);
	return combos;
}

function buildCombo(
	currentCombo: Combo,
	combos: Combo[],
	tricks: AnnotatedTrick[],
	depth: number,
	length: number
) {
	if (currentCombo.length === 0) {
		console.error(
			'buildCombo() failed - must start with a non-empty combo'
		);
		return;
	}
	if (depth === length) {
		console.log(`Completed combo: ${currentCombo.toString()}`);
		combos.push(new Combo([...currentCombo.steps])); // shallow clone
		return;
	}

	for (const trick of tricks) {
		const candidateTransitions =
			trick.userTrick!.entryTransitions[currentCombo.lastLandingStance!];

		if (candidateTransitions) {
			for (const transition of candidateTransitions) {
				for (const landingStance of trick.userTrick!.landingStances) {
					const step = new ComboStep(
						trick.name,
						transition,
						landingStance
					);

					currentCombo.addStep(step);
					buildCombo(currentCombo, combos, tricks, depth + 1, length);

					currentCombo.removeLastStep();
				}
			}
		}
	}
}

// function getRandomElement<T>(array: T[]): T {
// 	return array[(Math.random() * array.length) | 0];
// }

export class Combo {
	constructor(public steps: ComboStep[]) {}

	get length() {
		return this.steps.length;
	}

	get lastLandingStance() {
		return this.steps.length > 0
			? this.steps[this.steps.length - 1].exitStance
			: null;
	}

	addStep(step: ComboStep) {
		this.steps.push(step);
		console.log(this.steps);
		console.log(this.length);
	}

	removeLastStep() {
		this.steps.pop();
		console.log('After backtracking:', this.steps);
	}

	toString() {
		let result = this.steps[0].trick + ' ' + this.steps[0].exitStance;
		for (let i = 1; i < this.steps.length; i++) {
			const step = this.steps[i];
			result +=
				' - ' +
				step.entryTransition +
				' ' +
				step.trick +
				' ' +
				step.exitStance;
		}

		return result;
	}
}

export class ComboStep {
	constructor(
		public trick: string,
		public entryTransition: string,
		public exitStance: string
	) {}
}
