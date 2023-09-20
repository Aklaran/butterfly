import { ObjectId } from 'mongodb';

export default interface UserTrickData {
	trickName: string;
	user: ObjectId;
	entryTransitions: { [index: string]: string[] };
	landingStances: string[];
	_id?: ObjectId;
	// eslint-disable-next-line semi
}
