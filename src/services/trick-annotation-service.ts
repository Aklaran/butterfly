import AnnotatedTrick from '@/models/annotated-trick/annotated-trick';
import Trick from '@/models/trick/trick';
import UserTrick from '@/models/user-trick/user-trick';

export default class TrickAnnotationService {
	constructor() {}

	annotateTricks(
		tricks: Trick[],
		userTricks: UserTrick[] | undefined
	): AnnotatedTrick[] {
		const result = tricks.map((trick) => {
			const userTrick = userTricks?.find(
				(userTrick) => userTrick.trickName == trick.name
			);

			return new AnnotatedTrick(trick, userTrick);
		});

		return result;
	}

	// TODO:  updateAnnotations()
}
