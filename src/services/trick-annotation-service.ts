import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import { TrickData } from '@/models/trick/trick';
import UserTrickData from '@/models/user-trick/user-trick-data';

export default class TrickAnnotationService {
	constructor() {}

	annotateTricks(
		tricks: TrickData[],
		userTricks: UserTrickData[] | null
	): AnnotatedTrick[] {
		const result = tricks.map((trick) => {
			const userTrick = userTricks?.find(
				(userTrick) => userTrick.trickName == trick.name
			);

			return new AnnotatedTrick(trick, userTrick!);
		});

		return result;
	}

	// TODO:  updateAnnotations()
}
