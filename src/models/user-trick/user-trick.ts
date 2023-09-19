import { Document, ObjectId, WithId } from 'mongodb';

export interface UserTrickData {
	trickName: string;
	user: ObjectId;
	entryTransitions: { [index: string]: string[] };
	landingStances: string[];
	_id?: ObjectId;
}

export default class UserTrick {
	constructor(public data: UserTrickData) {}

	// GETTERS

	get trickName() {
		return this.data.trickName;
	}
	get user() {
		return this.data.user;
	}
	get entryTransitions() {
		return this.data.entryTransitions;
	}
	get landingStances() {
		return this.data.landingStances;
	}

	// CLASS METHODS

	static FromMongoDocument(doc: WithId<Document>): UserTrick {
		const data: UserTrickData = {
			trickName: doc.trickName,
			user: doc.user,
			entryTransitions: doc.entryTransitions,
			landingStances: doc.landingStances,
			_id: doc._id,
		};
		return new UserTrick(data);
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

		const data: UserTrickData = {
			trickName,
			user: userID,
			entryTransitions,
			landingStances: [],
		};

		return new UserTrick(data);
	}
}
