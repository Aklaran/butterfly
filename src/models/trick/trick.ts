import { Document, ObjectId, WithId } from 'mongodb';

export interface TrickData {
	name: string;
	entryTransitions: { [index: string]: string[] };
	landingStances: string[];
	defaultLandingStance: string;
	_id?: ObjectId;
	numberOfFlips?: number;
	numberOfKicks?: number;
	degreesOfRotation?: number;
	axis?: string;
	variation?: string;
	aliases?: string[];
}

export default class Trick {
	constructor(public data: TrickData) {}

	// GETTERS

	get name() {
		return this.data.name;
	}
	get entryTransitions() {
		return this.data.entryTransitions;
	}
	get landingStances() {
		return this.data.landingStances;
	}

	// CLASS METHODS

	static FromMongoDocument(doc: WithId<Document>): Trick {
		return new Trick({
			name: doc.name,
			entryTransitions: doc.entryTransitions,
			landingStances: doc.landingStances,
			defaultLandingStance: doc.defaultLandingStance,
			_id: doc._id,
			numberOfFlips: doc.numberOfFlips,
			numberOfKicks: doc.numberOfKicks,
			degreesOfRotation: doc.degreesOfRotation,
			axis: doc.axis,
			variation: doc.variation,
			aliases: doc.aliases,
		});
	}
}
