import { Document, ObjectId, WithId } from 'mongodb';

export default class UserTrick {
	constructor(
		public trickName: string,
		public userID: string,
		public entryTransitions: { [index: string]: string[] },
		public landingStances: string[],
		public _id: ObjectId
	) {}

	static FromMongoDocument(doc: WithId<Document>): UserTrick {
		const result = new UserTrick(
			doc.trickName,
			doc.userID,
			doc.entryTransitions,
			doc.landingStances,
			doc._id
		);

		return result;
	}
}
