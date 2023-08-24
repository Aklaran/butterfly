import { ObjectId } from 'mongodb';

export default class Trick {
	constructor(
		public name: string,
		public entryTransitions: { [index: string]: string },
		public landingStances: string[],
		public id: ObjectId
	) {}
}
