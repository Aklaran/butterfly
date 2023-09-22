export default interface UserTrickUpdateRequest {
	action: 'add' | 'remove' | 'replace';
	field: 'landingStances' | 'entryTransitions' | 'notes';
	// TODO: Try out more typesafe alternative commented below
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	value: any;
	stance?: string; // Optional, only used if 'field' is 'entryTransitions'
	// eslint-disable-next-line semi
}
