import { Document, ObjectId, WithId } from 'mongodb';

export default class UserTrick {
	constructor(
		public trickName: string,
		public user: ObjectId,
		public entryTransitions: { [index: string]: string[] },
		public landingStances: string[],
		public _id: ObjectId | undefined
	) {}

	static FromMongoDocument(doc: WithId<Document>): UserTrick {
		const result = new UserTrick(
			doc.trickName,
			doc.user,
			doc.entryTransitions,
			doc.landingStances,
			doc._id
		);

		return result;
	}

	static CreateEmpty(trickName: string, userID: ObjectId) {
		const entryTransitions = {
			unified: [],
			complete: [],
			hyper: [],
			semi: [],
			mega: [],
			turbo: [],
		};

		return new UserTrick(
			trickName,
			userID,
			entryTransitions,
			[],
			undefined
		);
	}
}
