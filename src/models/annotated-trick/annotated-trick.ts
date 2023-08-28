import Trick from '../trick/trick';
import UserTrick from '../user-trick/user-trick';

class ActiveItem {
	constructor(public name: string, public isActive: boolean) {}
}

type EntryTransitions = {
	[index: string]: string[];
};

type ActiveEntryTransitions = {
	[index: string]: ActiveItem[];
};

export default class AnnotatedTrick {
	constructor(
		public name: string,
		public entryTransitions: ActiveEntryTransitions,
		public landingStances: ActiveItem[],
		public defaultLandingStance: string,
		public numberOfFlips?: number,
		public numberOfKicks?: number,
		public degreesOfRotation?: number,
		public axis?: string,
		public variation?: string,
		public aliases?: string[]
	) {}

	static fromTricks(trick: Trick, userTrick: UserTrick | undefined) {
		if (userTrick == undefined) {
			return AnnotatedTrick.fromBaseTrick(trick);
		}

		return new AnnotatedTrick(
			trick.name,
			AnnotatedTrick.markObjectActive(
				trick.entryTransitions,
				userTrick.entryTransitions
			),
			AnnotatedTrick.markArrayActive(
				trick.landingStances,
				userTrick.landingStances
			),
			trick.defaultLandingStance,
			trick.numberOfFlips,
			trick.numberOfKicks,
			trick.degreesOfRotation,
			trick.axis,
			trick.variation,
			trick.aliases
		);
	}

	private static fromBaseTrick(trick: Trick): AnnotatedTrick {
		return new AnnotatedTrick(
			trick.name,
			AnnotatedTrick.markObjectActive(trick.entryTransitions, {}),
			AnnotatedTrick.markArrayActive(trick.landingStances, []),
			trick.defaultLandingStance,
			trick.numberOfFlips,
			trick.numberOfKicks,
			trick.degreesOfRotation,
			trick.axis,
			trick.variation,
			trick.aliases
		);
	}

	private static markObjectActive(
		baseEntries: EntryTransitions,
		userEntries: EntryTransitions
	): ActiveEntryTransitions {
		const result: ActiveEntryTransitions = {};
		Object.keys(baseEntries).forEach((entryStance) => {
			const baseTransitions = baseEntries[entryStance];
			const userTransitions = userEntries[entryStance];
			result[entryStance] = AnnotatedTrick.markArrayActive(
				baseTransitions,
				userTransitions
			);
		});

		return result;
	}

	private static markArrayActive(
		baseEntries: string[],
		userEntries: string[]
	): ActiveItem[] {
		return baseEntries.map((baseEntry) => {
			return userEntries?.includes(baseEntry)
				? new ActiveItem(baseEntry, true)
				: new ActiveItem(baseEntry, false);
		});
	}

	// INSTANCE METHODS

	isActive() {
		const hasOneActiveEntryStance = Object.keys(this.entryTransitions).some(
			(stance) => {
				this.entryTransitions[stance].some((item) => {
					item.isActive;
				});
			}
		);

		const hasOneActiveLandingStance = this.landingStances.some((stance) => {
			stance.isActive;
		});

		return hasOneActiveEntryStance && hasOneActiveLandingStance;
	}
}
