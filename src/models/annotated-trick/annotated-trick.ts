import Trick, { TrickData } from '../trick/trick';
import UserTrick, { UserTrickData } from '../user-trick/user-trick';

export interface AnnotatedTrickData {
	trick: Trick;
	userTrick: UserTrick;
	name: string;
}

export default class AnnotatedTrick {
	private _data: AnnotatedTrickData;

	constructor(trickData: TrickData, userTrickData: UserTrickData) {
		const trick = new Trick(trickData);
		const userTrick = new UserTrick(userTrickData);
		this._data = {
			trick,
			userTrick,
			name: trick.name,
		};
	}

	// GETTERS

	get data() {
		return this._data;
	}

	get trick() {
		return this._data.trick;
	}

	get userTrick() {
		return this._data.userTrick;
	}

	get name() {
		return this._data.name;
	}

	// CLASS METHODS
	static fromData(data: AnnotatedTrickData) {
		return new AnnotatedTrick(data.trick.data, data.userTrick.data);
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
