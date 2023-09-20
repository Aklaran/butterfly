export default interface UserTrickData {
	trickName: string;
	user: string;
	entryTransitions: { [index: string]: string[] };
	landingStances: string[];
	_id?: string;
	// eslint-disable-next-line semi
}
