import { Document, ObjectId, WithId } from 'mongodb';
import UserTrickData from './user-trick-data';

export default class UserTrickFactory {
	// FACTORY METHODS

	static CreateFromMongoDocument(doc: WithId<Document>): UserTrickData {
		const data: UserTrickData = {
			trickName: doc.trickName,
			user: doc.user,
			entryTransitions: doc.entryTransitions,
			landingStances: doc.landingStances,
			_id: doc._id,
		};
		return data;
	}

	static CreateEmpty(trickName: string, userID: ObjectId): UserTrickData {
		const entryTransitions = {
			unified: [],
			complete: [],
			hyper: [],
			semi: [],
			mega: [],
			turbo: [],
		};

		const data: UserTrickData = {
			trickName,
			user: userID,
			entryTransitions,
			landingStances: [],
		};

		return data;
	}
}
