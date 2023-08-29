import { Document, ObjectId, WithId } from 'mongodb';

export default class Trick {
	constructor(
		public name: string,
		public entryTransitions: { [index: string]: string[] },
		public landingStances: string[],
		public defaultLandingStance: string,
		public _id?: ObjectId,
		public numberOfFlips?: number,
		public numberOfKicks?: number,
		public degreesOfRotation?: number,
		public axis?: string,
		public variation?: string,
		public aliases?: string[]
	) {}

	static FromMongoDocument(doc: WithId<Document>): Trick {
		return new Trick(
			doc.name,
			doc.entryTransitions,
			doc.landingStances,
			doc.defaultLandingStance,
			doc._id,
			doc.numberOfFlips,
			doc.numberOfKicks,
			doc.degreesOfRotation,
			doc.axis,
			doc.variation,
			doc.aliases
		);
	}
}
