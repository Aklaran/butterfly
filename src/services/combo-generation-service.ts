import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import { Combo } from '@/models/combo/combo';

export default function generateCombos(
	tricks: AnnotatedTrick[],
	targetLength: number
) {
	const activeTricks = tricks.filter((t) => t.isActive());
	const combos: Combo[] = [];

	console.time('Combo Generation'); // log exec time

	for (const trick of activeTricks) {
		for (const landingStance of trick.userTrickData!.landingStances) {
			const combo = intializeCombo(trick, landingStance);
			buildCombo(combo, combos, activeTricks, 1, targetLength);
		}
	}

	console.timeEnd('Combo Generation'); // log exec time
	console.log(
		`Successfully generated ${combos.length} combos!`,
		combos.map((c) => c.toString())
	);
	return combos;
}

function intializeCombo(trick: AnnotatedTrick, landingStance: string) {
	const firstStep = {
		trick: trick.name,
		entryTransition: 'start',
		exitStance: landingStance,
	};
	return Combo.FromSteps([firstStep]);
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
		combos.push(Combo.FromSteps([...currentCombo.steps])); // shallow clone
		return;
	}

	for (const trick of tricks) {
		const candidateTransitions =
			trick.userTrickData!.entryTransitions[
				currentCombo.lastLandingStance!
			];

		if (candidateTransitions) {
			for (const transition of candidateTransitions) {
				for (const landingStance of trick.userTrickData!
					.landingStances) {
					const step = {
						trick: trick.name,
						entryTransition: transition,
						exitStance: landingStance,
					};

					currentCombo.addStep(step);
					buildCombo(currentCombo, combos, tricks, depth + 1, length);

					currentCombo.removeLastStep();
				}
			}
		}
	}
}
