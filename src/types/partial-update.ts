export type PartialUpdate =
	| { landingStances: string[] }
	| { entryTransitions: { [key: string]: string[] } };
