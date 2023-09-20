import Trick, { TrickData } from '../trick/trick';
import UserTrickData from '../user-trick/user-trick-data';

export interface AnnotatedTrickData {
	trick: Trick;
	userTrickData: UserTrickData;
	name: string;
}

export default class AnnotatedTrick {
	private _data: AnnotatedTrickData;

	constructor(trickData: TrickData, userTrickData: UserTrickData) {
		const trick = new Trick(trickData);
		this._data = {
			trick,
			userTrickData,
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
		return this._data.userTrickData;
	}

	get name() {
		return this._data.name;
	}

	// CLASS METHODS
	static fromData(data: AnnotatedTrickData) {
		return new AnnotatedTrick(data.trick.data, data.userTrickData);
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
