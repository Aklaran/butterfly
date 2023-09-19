export interface ComboData {
	steps: ComboStep[];
}

export interface ComboStep {
	trick: string;
	entryTransition: string;
	exitStance: string;
}

export class Combo {
	constructor(public data: ComboData = { steps: [] }) {}

	// GETTERS

	get steps() {
		return this.data.steps;
	}

	get length() {
		return this.data.steps.length;
	}

	get lastLandingStance() {
		return this.data.steps.length > 0
			? this.data.steps[this.data.steps.length - 1].exitStance
			: null;
	}

	get text() {
		return this.toString();
	}

	// CLASS METHODS

	static FromSteps(steps: ComboStep[]): Combo {
		return new Combo({ steps: [...steps] });
	}

	// INSTANCE METHODS

	addStep(step: ComboStep) {
		this.data.steps.push(step);
		console.log(this.data.steps);
		console.log(this.length);
	}

	removeLastStep() {
		this.data.steps.pop();
		console.log('After backtracking:', this.data.steps);
	}

	toString() {
		let result =
			this.data.steps[0].trick + ' ' + this.data.steps[0].exitStance;
		for (let i = 1; i < this.data.steps.length; i++) {
			const step = this.data.steps[i];
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
