import { ObjectId } from 'mongodb';

export default class UserTrick {
	constructor(
		public trickName: string,
		public userID: string,
		public entryTransitions: { [index: string]: string },
		public landingStances: string[],
		public _id: ObjectId
	) {}
}
