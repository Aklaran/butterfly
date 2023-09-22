import { Document, ObjectId, WithId } from 'mongodb';
import UserTrickData from './user-trick-data';

export default class UserTrickFactory {
	// FACTORY METHODS

	static CreateFromMongoDocument(doc: WithId<Document>): UserTrickData {
		const data: UserTrickData = {
			trickName: doc.trickName,
			user: doc.user.toString(),
			entryTransitions: doc.entryTransitions,
			landingStances: doc.landingStances,
			notes: doc.notes,
			_id: doc._id.toString(),
		};
		return data;
	}

	static ToMongoDocument(data: UserTrickData): WithId<Document> {
		const doc: WithId<Document> = {
			trickName: data.trickName,
			user: new ObjectId(data.user),
			entryTransitions: data.entryTransitions,
			landingStances: data.landingStances,
			notes: data.notes,
			_id: new ObjectId(data._id),
		};
		return doc;
	}

	static CreateEmpty(trickName: string, userID: string): UserTrickData {
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
			notes: '',
		};

		return data;
	}
}
