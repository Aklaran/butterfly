import Trick from '../trick/trick';
import UserTrick from '../user-trick/user-trick';

export default class AnnotatedTrick {
	constructor(
		public readonly trick: Trick,
		public userTrick: UserTrick | undefined
	) {
		this.trick = trick;
		this.userTrick = userTrick;
	}

	// INSTANCE METHODS

	isEntryTransitionActive(
		entryStance: string,
		entryTransition: string
	): boolean {
		if (this.userTrick == undefined) return false;

		return this.userTrick.entryTransitions[entryStance].includes(
			entryTransition
		);
	}

	isLandingStanceActive(landingStance: string): boolean {
		if (this.userTrick == undefined) return false;

		return this.userTrick.landingStances.includes(landingStance);
	}

	isActive(): boolean {
		if (this.userTrick == undefined) return false;

		const hasOneActiveEntryStance = this.hasActiveEntry();

		console.log('one active entry:', hasOneActiveEntryStance);

		const hasAnActiveLandingStance = this.hasActiveLanding();

		console.log('one active landing:', hasAnActiveLandingStance);

		return hasOneActiveEntryStance && hasAnActiveLandingStance;
	}

	// PRIVATE METHODS

	private hasActiveEntry(): boolean {
		if (this.userTrick == undefined) return false;

		return Object.keys(this.userTrick.entryTransitions).some(
			(transitionsFromStance) => {
				return transitionsFromStance.length > 0;
			}
		);
	}

	private hasActiveLanding(): boolean {
		if (this.userTrick == undefined) return false;

		return this.userTrick.landingStances.length > 0;
	}
}
