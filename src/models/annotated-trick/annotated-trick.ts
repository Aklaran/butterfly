import Trick from '../trick/trick';
import UserTrick from '../user-trick/user-trick';

export interface AnnotatedTrickData {
	trick: Trick;
	userTrick: UserTrick | undefined;
	name: string;
}

export default class AnnotatedTrick {
	private data: AnnotatedTrickData;

	constructor(trick: Trick, userTrick: UserTrick | undefined) {
		this.data = {
			trick,
			userTrick,
			name: trick.name,
		};
	}

	// GETTERS

	get trick() {
		return this.data.trick;
	}

	get userTrick() {
		return this.data.userTrick;
	}

	get name() {
		return this.data.name;
	}

	// INSTANCE METHODS

	isEntryTransitionActive = (
		entryStance: string,
		entryTransition: string
	): boolean => {
		if (this.userTrick == undefined) return false;

		if (this.userTrick.entryTransitions[entryStance] == undefined)
			return false;

		return this.userTrick.entryTransitions[entryStance].includes(
			entryTransition
		);
	};

	isLandingStanceActive = (landingStance: string): boolean => {
		if (this.userTrick == undefined) return false;

		return this.userTrick.landingStances.includes(landingStance);
	};

	isActive(): boolean {
		if (this.userTrick == undefined) return false;

		const hasOneActiveEntryStance = this.hasActiveEntry();
		const hasAnActiveLandingStance = this.hasActiveLanding();
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
